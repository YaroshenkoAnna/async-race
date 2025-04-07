import type { Car, Winner } from "../types/types";

declare global {
  interface Response {
    json<T>(): Promise<T>;
  }
}

export class CarService {
  private static BASE_URL = "http://localhost:3000";

  public static getCar(id: number): Promise<Car | null> {
    return fetch(`${this.BASE_URL}/garage/${id}`).then((response) =>
      response.ok ? response.json() : null,
    );
  }

  public static async getCars(page: number, limit = 7) {
    const response = await fetch(
      `${this.BASE_URL}/garage?_page=${page}&_limit=${limit}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch cars");
    }
    const cars: Car[] = await response.json();
    const total = Number(response.headers.get("X-Total-Count")) || 0;
    return { cars, total };
  }

  public static async createCar(name: string, color: string): Promise<void> {
    await fetch(`${this.BASE_URL}/garage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, color }),
    });
  }

  public static async deleteCar(id: number): Promise<void> {
    await fetch(`${this.BASE_URL}/garage/${id}`, { method: "DELETE" });
  }

  public static async updateCar(carOptions: Car): Promise<void> {
    await fetch(`${this.BASE_URL}/garage/${carOptions.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: carOptions.name, color: carOptions.color }),
    });
  }

  public static async getWinners(
    page: number,
    limit = 10,
    sort?: "id" | "wins" | "time",
    order?: "ASC" | "DESC",
  ): Promise<{ items: Winner[]; total: number }> {
    const parameters = new URLSearchParams({
      _page: String(page),
      _limit: String(limit),
    });

    if (sort) parameters.set("_sort", sort);
    if (order) parameters.set("_order", order);

    const response = await fetch(
      `${this.BASE_URL}/winners?${parameters.toString()}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch winners");
    }

    const items = await response.json<Winner[]>();
    const total = Math.max(
      Number(response.headers.get("X-Total-Count")) || 0,
      items.length,
    );
    return { items, total };
  }

  public static async getWinner(id: number): Promise<Winner | null> {
    const response = await fetch(`${this.BASE_URL}/winners/${id}`);
    return response.ok ? response.json() : null;
  }

  public static async createWinner(winner: Winner): Promise<void> {
    await fetch(`${this.BASE_URL}/winners`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(winner),
    });
  }

  public static async updateWinner(
    id: number,
    winner: Partial<Winner>,
  ): Promise<void> {
    await fetch(`${this.BASE_URL}/winners/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(winner),
    });
  }

  public static async deleteWinner(id: number): Promise<void> {
    await fetch(`${this.BASE_URL}/winners/${id}`, { method: "DELETE" });
  }

  public static async getAllWinners(
    sort?: "id" | "wins" | "time",
    order?: "ASC" | "DESC",
  ): Promise<Winner[]> {
    const parameters = new URLSearchParams();
    if (sort) parameters.set("_sort", sort);
    if (order) parameters.set("_order", order);

    const response = await fetch(
      `${this.BASE_URL}/winners?${parameters.toString()}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch all winners");
    }
    return await response.json<Winner[]>();
  }
}
