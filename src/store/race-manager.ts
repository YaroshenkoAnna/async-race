import { EngineService } from "../api/engine-service";

export class RaceManager {
  static async moveCar(
    car: {
      id: number;
      element: HTMLElement;
    },
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
    await this.animateCar(car.element, time, distance);
    return time;
  }

  /*  static async startRace(cars: { id: number; element: HTMLElement }[]) {
    const results = await Promise.allSettled(
      cars.map(async (car) => {
        const time = await this.moveCar(car);
        await EngineService.drive(car.id);
        return { id: car.id, time };
      })
    );

    const winners = results
      .filter(
        (
          resource
        ): resource is PromiseFulfilledResult<{ id: number; time: number }> =>
          resource.status === "fulfilled"
      )
      .sort((a, b) => a.value.time - b.value.time);

    return winners.length > 0 ? winners[0].value : null;
  } */

  static async resetRace(cars: { id: number; element: HTMLElement }[]) {
    await Promise.all(cars.map(({ id }) => EngineService.stopEngine(id)));
    cars.forEach(({ element }) => (element.style.transform = "translateX(0)"));
  }

  private static async animateCar(
    car: HTMLElement,
    time: number,
    distance: number,
  ) {
    const startTime = performance.now();
    return new Promise<void>((resolve) => {
      const animate = (currentTime: number) => {
        const elapsedTime = (currentTime - startTime) / 1000;
        const progress = Math.min(elapsedTime / time, 1);
        car.style.transform = `translateX(${progress * distance}px)`;
        if (progress < 1) requestAnimationFrame(animate);
        else resolve();
      };
      requestAnimationFrame(animate);
    });
  }
}
