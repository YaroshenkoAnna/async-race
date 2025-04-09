import { Observable } from "../utils/observable";
import { CarService } from "../api/car-service";
import type { Car, Winner } from "../types/types";
import { getRandomColor } from "../utils/get-random-color";
import { getRandomElement } from "../utils/get-random-element";
import type { PageType } from "./page-type";
export class GarageStore {
  public cars$ = new Observable<Car[]>([]);
  public total$ = new Observable<number>(0);
  public winners$ = new Observable<Winner[]>([]);
  public winnersCount$ = new Observable<number>(0);
  public winnersSortKey: "id" | "wins" | "time" = "time";
  public winnersSortOrder: "ASC" | "DESC" = "ASC";
  public sortAllWinners = false;

  public pageLimits: Record<PageType, number> = {
    garage: 7,
    winners: 10,
  };

  private currentPage: Record<PageType, number> = {
    garage: 1,
    winners: 1,
  };

  private readonly pageLoaders: Record<
    PageType,
    (page: number, limit: number) => Promise<void>
  > = {
    garage: this.loadCars.bind(this),
    winners: this.loadWinners.bind(this),
  };

  public async next(type: PageType) {
    const nextPage = this.currentPage[type] + 1;
    this.currentPage[type] = nextPage;
    await this.pageLoaders[type](nextPage, this.pageLimits[type]);
  }

  public async previous(type: PageType) {
    const previousPage = Math.max(1, this.currentPage[type] - 1);
    this.currentPage[type] = previousPage;
    await this.pageLoaders[type](previousPage, this.pageLimits[type]);
  }

  public getCurrentPage(type: PageType): number {
    return this.currentPage[type];
  }

  public async addCar(name: string, color: string) {
    try {
      await CarService.createCar(name, color);
      await this.loadCars(this.currentPage.garage);
    } catch (error: unknown) {
      this.handleError(error, "Failed to add car");
    }
  }

  public async removeCar(id: number) {
    try {
      await CarService.deleteCar(id);
      await CarService.deleteWinner(id);
      await this.loadCars(this.currentPage.garage);
      await this.reloadCurrentWinnersPage();
    } catch (error: unknown) {
      this.handleError(error, "Error deleting car");
    }
  }

  public async updateCar(carOptions: Car) {
    try {
      await CarService.updateCar(carOptions);
      await this.loadCars(this.currentPage.garage);
      const winner = await CarService.getWinner(carOptions.id);
      if (winner) {
        await CarService.updateWinner(carOptions.id, {
          wins: winner.wins,
          time: winner.time,
        });
        await this.reloadCurrentWinnersPage();
      }
    } catch (error: unknown) {
      this.handleError(error, "Error updating car");
    }
  }

  public async loadWinners(
    page: number,
    limit: number,
    sort: "id" | "wins" | "time" = this.winnersSortKey,
    order: "ASC" | "DESC" = this.winnersSortOrder,
    all: boolean = this.sortAllWinners,
  ) {
    this.winnersSortKey = sort;
    this.winnersSortOrder = order;
    this.sortAllWinners = all;
    try {
      let items: Winner[] = [];
      let total: number;

      if (all) {
        const allItems = await CarService.getAllWinners(sort, order);
        total = allItems.length;
        items = allItems.slice((page - 1) * limit, page * limit);
      } else {
        const result = await CarService.getWinners(page, limit, sort, order);
        items = result.items;
        total = result.total;
      }
      this.winners$.set([...items]);
      this.winnersCount$.set(total);
      this.currentPage.winners = page;
    } catch (error: unknown) {
      this.handleError(error, "Error loading winners");
    }
  }

  public async loadCars(page: number): Promise<void> {
    try {
      const { cars, total } = await CarService.getCars(page);
      this.cars$.set(cars);
      this.total$.set(total);
      this.currentPage.garage = page;
    } catch (error: unknown) {
      this.handleError(error, "Error loading cars");
    }
  }

  public async addWinner(id: number, time: number) {
    try {
      const existingWinner = await CarService.getWinner(id);

      await (existingWinner
        ? CarService.updateWinner(id, {
            time: Math.min(existingWinner.time, time),
            wins: existingWinner.wins + 1,
          })
        : CarService.createWinner({ id, wins: 1, time }));
      await this.reloadCurrentWinnersPage();
      //  await this.loadWinners(this.currentPage.winners, this.pageLimits.winners);
    } catch (error) {
      this.handleError(error, "Error adding/updating winner");
    }
  }

  public async reloadCurrentWinnersPage() {
    const page = this.getCurrentPage("winners");
    const limit = this.pageLimits.winners;
    await this.loadWinners(
      page,
      limit,
      this.winnersSortKey,
      this.winnersSortOrder,
      this.sortAllWinners,
    );
  }

  public getWinners() {
    return [...this.winners$.value];
  }

  public async generateRandomCars() {
    const carBrands = [
      "Ford",
      "BMW",
      "Audi",
      "Mercedes",
      "Tesla",
      "Toyota",
      "Honda",
      "Nissan",
      "Lexus",
      "Porsche",
    ];
    const carModels = [
      "X1",
      "X3",
      "X5",
      "A4",
      "A6",
      "C-Class",
      "E-Class",
      "Model S",
      "Model 3",
      "Camry",
      "Civic",
      "Altima",
      "RX",
      "911",
      "Macan",
    ];

    const carPromises = Array.from({ length: 100 }, () => {
      const name = `${getRandomElement(carBrands)} ${getRandomElement(carModels)}`;
      const color = getRandomColor();
      return CarService.createCar(name, color);
    });

    try {
      await Promise.all(carPromises);
      await this.loadCars(this.currentPage.garage);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error generating cars:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  }

  private handleError(error: unknown, message: string) {
    if (error instanceof Error) {
      console.error(`${message}:`, error.message);
    } else {
      console.error(`${message}: Unknown error`, error);
    }
  }
}
