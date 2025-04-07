import { BaseElement } from "../utils/base-element";
import { Form } from "../components/form/form";
import { Button } from "../components/button/button";
import { CarCard } from "../components/car-card/car-card";
import type { GarageStore } from "../store/garage-store";
import { RaceManager } from "../store/race-manager";
import { isCar, type Car, isId } from "../types/types";
import { Modal } from "../components/modal/modal";
import { CarService } from "../api/car-service";
import { Controls } from "../components/controls/controls";

export class GaragePage extends BaseElement<"div"> {
  private selectedCarId: number | null = null;
  private outlet: BaseElement<"div">;
  private title: BaseElement<"h1">;
  private pageNumber: BaseElement<"h2">;
  private store: GarageStore;
  private carListContainer: BaseElement<"div">;
  private createForm: Form;
  private updateForm: Form;
  private controls: Controls;
  private activeCars: Set<number> = new Set();

  constructor(store: GarageStore, outlet: BaseElement<"div">) {
    super({ tag: "div" });
    this.store = store;
    this.outlet = outlet;
    this.title = new BaseElement<"h1">({ tag: "h1", text: `Garage (0)` });
    this.pageNumber = new BaseElement<"h2">({ tag: "h2", text: "Page #1" });
    this.carListContainer = new BaseElement({ tag: "div" });
    this.store.total$.subscribe((total) => {
      this.title.setText(`Garage (${total})`);
    });
    this.controls = new Controls({
      onRace: () => {
        void this.startRace();
      },
      onReset: () => this.resetAll(),
      onGenerate: () => {
        void this.store.generateRandomCars();
      },
    });
    this.createForm = this.renderCreateForm();
    this.updateForm = this.renderUpdateForm();
    this.render();
    this.bindStore();
  }

  private handleSelectCar(id: number) {
    this.selectedCarId = id;
    this.controls.disable();
  }

  private render() {
    this.updateForm.disable();
    const pagination = this.renderPagination();

    this.appendChildren(
      this.createForm,
      this.updateForm,
      this.controls,
      this.title,
      this.pageNumber,
      this.carListContainer,
      pagination,
    );
  }

  private renderCreateForm() {
    return new Form({
      buttonText: "Create",
      callback: async (name, color) => {
        try {
          await this.store.addCar(name, color);
        } catch (error) {
          console.error("Error while adding car:", error);
        }
      },
    });
  }

  private renderUpdateForm() {
    return new Form({
      buttonText: "Update",
      callback: async (name, color) => {
        if (this.selectedCarId === null) {
          console.error("No car selected!");
          return;
        }
        try {
          await this.store.updateCar({
            id: this.selectedCarId,
            name,
            color,
          });
          this.updateForm.disable();
          this.createForm.enable();
          this.selectedCarId = null;
          this.controls.enable();
        } catch (error) {
          console.error("Error while updating car:", error);
        }
      },
    });
  }

  private async startRace() {
    this.updateForm.disable();
    this.createForm.disable();
    this.controls.disable();
    this.controls.setResetEnabled(true);

    const cars: { id: number; element: HTMLElement }[] = [];

    for (const carCard of this.carListContainer.children) {
      if (
        carCard instanceof CarCard &&
        carCard.car.node instanceof HTMLElement
      ) {
        carCard.buttons.forEach((button) => button.disable());
        cars.push({ id: carCard.id, element: carCard.car.node });
      }
    }

    try {
      const winner = await RaceManager.startRace(cars);
      if (winner) {
        const winningCar = await CarService.getCar(winner.id);
        if (winningCar) {
          await this.store.addWinner(winner.id, winner.time);
          this.outlet.appendChildren(new Modal(winningCar.name, winner.time));
        }
      }
    } catch (error) {
      console.error("Race error:", error);
    }
  }

  private resetAll() {
    this.controls.enable();
    this.controls.setResetEnabled(true);
    const cars: { id: number; element: HTMLElement }[] = [];

    for (const carCard of this.carListContainer.children) {
      if (
        carCard instanceof CarCard &&
        carCard.car.node instanceof HTMLElement
      ) {
        carCard.buttons.forEach((button) => {
          if (button !== carCard.backButton) {
            button.enable();
          }
        });

        cars.push({ id: carCard.id, element: carCard.car.node });
      }
    }

    RaceManager.resetAll(cars);
    this.activeCars.clear();
    this.controls.setResetEnabled(false);
  }

  private renderPagination() {
    const pagination = new BaseElement<"div">({ tag: "div" });
    const previousButton = new Button({
      text: "Prev",
      callback: () => {
        this.store.previous("garage").catch((error) => {
          console.error("Error going to the previous page:", error);
        });
      },
    });
    const nextButton = new Button({
      text: "Next",
      callback: () => {
        this.store.next("garage").catch((error) => {
          console.error("Error going to the next page:", error);
        });
      },
    });

    this.store.cars$.subscribe(() => {
      const currentPage = this.store.getCurrentPage("garage");
      const total = this.store.total$.value;
      const totalPages = Math.ceil(total / this.store.pageLimits.garage);

      if (currentPage === 1) {
        previousButton.disable();
      } else {
        previousButton.enable();
      }

      if (currentPage === totalPages) {
        nextButton.disable();
      } else {
        nextButton.enable();
      }
    });

    pagination.appendChildren(previousButton, nextButton);
    return pagination;
  }

  private bindStore() {
    this.store.cars$.subscribe((cars) => this.renderCarList(cars));
    this.store.total$.subscribe((total) => {
      this.pageNumber.setText(
        `Page #${this.store.getCurrentPage("garage")} / Total cars: ${total}`,
      );
    });
    this.store.loadCars(this.store.getCurrentPage("garage")).catch((error) => {
      console.error("Error loading cars:", error);
    });
  }

  private renderCarList(cars: Car[]) {
    this.carListContainer.deleteChildren();

    cars.forEach((car) => {
      const carCard = new CarCard(car.id, car.name, car.color);
      carCard.addListener("carSelected", (event: Event) => {
        if (event instanceof CustomEvent && isCar(event.detail)) {
          this.createForm.disable();
          this.updateForm.enable();
          this.handleSelectCar(event.detail.id);
        }
      });

      carCard.addListener("carRemoved", (event: Event) => {
        void (async () => {
          if (event instanceof CustomEvent && isId(event.detail)) {
            const carId = event.detail.id;
            try {
              await this.store.removeCar(carId);
            } catch (error) {
              console.error("Error while removing car:", error);
            }
          }
        })();
      });

      carCard.addListener("carMoveStarted", (event: Event) => {
        void (async () => {
          if (event instanceof CustomEvent && isId(event.detail)) {
            const carId = event.detail.id;
            this.activeCars.add(carId);
            this.controls.setResetEnabled(true);
            try {
              const carElement = carCard.car.node;
              if (carElement instanceof HTMLElement) {
                await RaceManager.moveCar(
                  { id: carId, element: carElement },
                  this.outlet.node.clientWidth - carElement.offsetWidth,
                );
              } else {
                console.error("Car element is not a valid HTMLElement.");
              }
            } catch (error) {
              console.error("Error while starting car:", error);
            }
          }
        })();
      });

      carCard.addListener("carMoveReset", (event: Event) => {
        (() => {
          if (event instanceof CustomEvent && isId(event.detail)) {
            const carId = event.detail.id;
            if (carCard.car.node instanceof HTMLElement) {
              RaceManager.resetCarPosition(carId, carCard.car.node);
            }
            this.activeCars.delete(carId);
            if (this.activeCars.size === 0) {
              this.controls.setResetEnabled(false);
            }
          }
        })();
      });

      this.carListContainer.appendChildren(carCard);
    });
  }
}
