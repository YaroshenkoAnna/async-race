import { Observable } from "../utils/observable";
import { CarService } from "../api/car-service";
import type { Car } from "../types/types";

export class GarageStore {
  public cars$ = new Observable<Car[]>([]);
  public total$ = new Observable<number>(0);
  public currentPage = 1;

  constructor() {}

  public async addCar(name: string, color: string) {
    try {
      await CarService.createCar(name, color);
      await this.loadCars(this.currentPage);
    } catch (error) {
      console.error("Failed to add car:", error);
    }
  }

  public async removeCar(id: number) {
    await CarService.deleteCar(id).catch((error) => {
      console.error("Error adding car", error);
    });
    await this.loadCars(this.currentPage);
  }

  public async updateCar(carOptions: Car) {
    await CarService.updateCar(carOptions);
    await this.loadCars(this.currentPage);
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
    const { cars, total } = await CarService.getCars(page);
    this.cars$.set(cars);
    this.total$.set(total);
    this.currentPage = page;
  }
}
