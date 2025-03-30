import { Observable } from "../utils/observable";
import { CarService } from "../api/car-service";
import type { Car } from "../types/types";
import { getRandomColor } from "../utils/get-random-color";
import { getRandomElement } from "../utils/get-random-element";

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

    const carPromises = Array.from({ length: 100 }, async () => {
      const name = `${getRandomElement(carBrands)} ${getRandomElement(carModels)}`;
      const color = getRandomColor();
      return CarService.createCar(name, color);
    });

    try {
      await Promise.all(carPromises);
      await this.loadCars(this.currentPage);
    } catch (error) {
      console.error("Error generating cars:", error);
    }
  }
}
