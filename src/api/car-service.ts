import type { Car } from "../types/types";

declare global {
  interface Response {
    json<T>(): Promise<T>;
  }
}

export class CarService {
  private static BASE_URL = "http://localhost:3000/garage";

  public static async getCars(page: number, limit = 7) {
    const response = await fetch(
      `${this.BASE_URL}?_page=${page}&_limit=${limit}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch cars");
    }
    const cars: Car[] = await response.json();

    const total = Number(response.headers.get("X-Total-Count")) || 0;
    return { cars, total };
  }

  public static async createCar(name: string, color: string): Promise<void> {
    await fetch(this.BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, color }),
    });
  }

  public static async deleteCar(id: number): Promise<void> {
    await fetch(`${this.BASE_URL}/${id}`, {
      method: "DELETE",
    });
  }

  public static async updateCar(carOptions: Car): Promise<void> {
    await fetch(`${this.BASE_URL}/${carOptions.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: carOptions.name, color: carOptions.color }),
    });
  }
}
