import { EngineService } from "../api/engine-service";

export class RaceManager {
  private static animationFrameIds: Map<number, number> = new Map();
  private static isAnimating: Map<number, boolean> = new Map();
  private static isEngineRunning: Map<number, boolean> = new Map();

  static stopAnimation(carId: number) {
    this.isAnimating.set(carId, false);
    if (this.animationFrameIds.has(carId)) {
      cancelAnimationFrame(this.animationFrameIds.get(carId)!);
      this.animationFrameIds.delete(carId);
    }
  }

  static resetCarPosition(carId: number, carElement: HTMLElement) {
    this.isAnimating.set(carId, false);
    this.isEngineRunning.set(carId, false);
    carElement.style.transform = `translateX(0px)`;
  }

  static async moveCar(
    car: { id: number; element: HTMLElement },
    distance: number,
  ): Promise<number> {
    const response = await EngineService.startEngine(car.id);
    if (
      typeof response !== "object" ||
      response === null ||
      !("distance" in response) ||
      !("velocity" in response) ||
      typeof response.distance !== "number" ||
      typeof response.velocity !== "number"
    ) {
      throw new Error("Invalid response from engine service");
    }

    const time = distance / response.velocity;
    this.isAnimating.set(car.id, true);
    this.isEngineRunning.set(car.id, true);

    await Promise.all([
      this.animateCar(car.id, car.element, time, distance),
      this.monitorDriveStatus(car.id),
    ]);

    return time;
  }

  static async startRace(
    cars: { id: number; element: HTMLElement }[],
  ): Promise<number> {
    const raceResults = cars.map(({ id, element }) =>
      this.moveCar(
        { id, element },
        element.parentElement!.clientWidth - element.offsetWidth,
      )
        .then(() => id)
        .catch(() => null),
    );

    const winnerId = await Promise.race(raceResults.filter(Boolean));
    return winnerId!;
  }

  static resetAll(cars: { id: number; element: HTMLElement }[]): void {
    cars.forEach(({ id, element }) => {
      this.resetCarPosition(id, element);
    });
  }

  private static async monitorDriveStatus(carId: number) {
    try {
      try {
        await EngineService.drive(carId);
      } catch (error: unknown) {
        while (this.isAnimating.get(carId)) {
          if (error instanceof Error && error.message === "Engine failure") {
            this.stopAnimation(carId);
            await EngineService.stopEngine(carId);
            break;
          }
          if (
            error instanceof Error &&
            error.message.includes("Failed to drive")
          ) {
            break;
          }
        }

        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error(` Unexpected error for car ${carId}:`, error);
    }
  }

  private static async animateCar(
    carId: number,
    car: HTMLElement,
    time: number,
    distance: number,
  ) {
    const startTime = performance.now();

    return new Promise<void>((resolve) => {
      const animate = (currentTime: number) => {
        if (!this.isAnimating.get(carId)) return;

        const elapsedTime = (currentTime - startTime) / 1000;
        const progress = Math.min(elapsedTime / time, 1);
        car.style.transform = `translateX(${progress * distance}px)`;

        if (progress < 1) {
          const frameId = requestAnimationFrame(animate);
          this.animationFrameIds.set(carId, frameId);
        } else {
          this.isAnimating.set(carId, false);
          this.isEngineRunning.set(carId, false);
          resolve();
        }
      };

      const frameId = requestAnimationFrame(animate);
      this.animationFrameIds.set(carId, frameId);
    });
  }
}
