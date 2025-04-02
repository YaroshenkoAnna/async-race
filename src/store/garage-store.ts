import { Observable } from "../utils/observable";
import { CarService } from "../api/car-service";
import type { Car, Winner } from "../types/types";
import { getRandomColor } from "../utils/get-random-color";
import { getRandomElement } from "../utils/get-random-element";

export class GarageStore {
  public cars$ = new Observable<Car[]>([]);
  public total$ = new Observable<number>(0);
  public winners$ = new Observable<Winner[]>([]);
  public currentPage = 1;

  constructor() {}

  public async addCar(name: string, color: string) {
    try {
      await CarService.createCar(name, color);
      await this.loadCars(this.currentPage);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to add car:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  }

  public async removeCar(id: number) {
    try {
      await CarService.deleteCar(id);
      await CarService.deleteWinner(id);
      await this.loadCars(this.currentPage);
      await this.loadWinners();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error deleting car:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  }

  public async updateCar(carOptions: Car) {
    try {
      await CarService.updateCar(carOptions);
      await this.loadCars(this.currentPage);
      const winner = await CarService.getWinner(carOptions.id);
      if (winner) {
        await CarService.updateWinner(carOptions.id, {
          wins: winner.wins,
          time: winner.time,
        });
        await this.loadWinners();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error updating car:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  }

  public async loadWinners() {
    try {
      const winners = await CarService.getWinners();
      this.winners$.set(winners);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error loading winners:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  }

  public async goToNextPage() {
    const nextPage = this.currentPage + 1;
    await this.loadCars(nextPage);
  }

  public async goToPreviousPage() {
    const previousPage = Math.max(1, this.currentPage - 1);
    await this.loadCars(previousPage);
  }

  public async loadCars(page: number): Promise<void> {
    try {
      const { cars, total } = await CarService.getCars(page);
      this.cars$.set(cars);
      this.total$.set(total);
      this.currentPage = page;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error loading cars:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  }

  public addWinner(id: number, time: number) {
    const currentWinner = this.winners$.value.find(
      (winner) => winner.id === id,
    );
    if (currentWinner) {
      currentWinner.time = Math.min(currentWinner.time, time);
    } else {
      this.winners$.set([...this.winners$.value, { id, time, wins: 1 }]);
    }
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
      await this.loadCars(this.currentPage);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error generating cars:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  }
}
