export class EngineService {
  private static BASE_URL = "http://localhost:3000/engine";

  static async startEngine(id: number) {
    const response = await fetch(`${this.BASE_URL}?id=${id}&status=started`, {
      method: "PATCH",
    });
    if (!response.ok) throw new Error("Failed to start engine");
    return response.json();
  }

  static async stopEngine(id: number) {
    const response = await fetch(`${this.BASE_URL}?id=${id}&status=stopped`, {
      method: "PATCH",
    });
    if (!response.ok) throw new Error("Failed to stop engine");
  }

  static async drive(id: number) {
    const response = await fetch(`${this.BASE_URL}?id=${id}&status=drive`, {
      method: "PATCH",
    });
    if (!response.ok) {
      if (response.status === 500) throw new Error("Engine failure");
      throw new Error("Failed to drive");
    }
    return response.json();
  }
}
