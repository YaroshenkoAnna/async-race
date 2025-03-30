import { Navigation } from "../components/navigation/navigation";
import { BaseElement } from "../utils/base-element";
import { Form } from "../components/form/form";
import { Button } from "../components/button/button";
import { CarCard } from "../components/car-card/car-card";
import { GarageStore } from "../store/garage-store";
import { isCar, type Car, isId } from "../types/types";

export class GaragePage {
  private selectedCarId: number | null = null;
  private selectedCarName: string = "";
  private selectedCarColor: string = "";
  private outlet: BaseElement<"div">;
  private title: BaseElement<"h1">;
  private pageNumber: BaseElement<"h2">;
  private garageStore: GarageStore;
  private carListContainer: BaseElement<"div">;

  constructor(outlet: BaseElement<"div">) {
    this.outlet = outlet;
    this.garageStore = new GarageStore();
    this.title = new BaseElement<"h1">({ tag: "h1", text: `Garage (0)` });
    this.pageNumber = new BaseElement<"h2">({ tag: "h2", text: "Page #1" });
    this.carListContainer = new BaseElement({ tag: "div" });
    this.garageStore.total$.subscribe((total) => {
      this.title.setText(`Garage (${total})`);
    });

    this.render();
    this.bindStore();
  }

  private handleSelectCar(id: number, name: string, color: string) {
    this.selectedCarId = id;
    this.selectedCarName = name;
    this.selectedCarColor = color;
  }

  private render() {
    const navigation = new Navigation();
    const createForm = this.createForm();
    const updateForm = this.updateForm();
    const controls = this.renderControls();
    const pagination = this.renderPagination();

    this.outlet.appendChildren(
      navigation,
      createForm,
      updateForm,
      controls,
      this.title,
      this.pageNumber,
      this.carListContainer,
      pagination,
    );
  }

  private createForm() {
    return new Form({
      buttonText: "Create",
      callback: async (name, color) => {
        try {
          await this.garageStore.addCar(name, color);
        } catch (error) {
          console.error("Error while adding car:", error);
        }
      },
    });
  }

  private updateForm() {
    return new Form({
      buttonText: "Update",
      callback: async (name, color) => {
        if (this.selectedCarId === null) {
          console.error("No car selected!");
          return;
        }
        try {
          await this.garageStore.updateCar({
            id: this.selectedCarId,
            name,
            color,
          });
        } catch (error) {
          console.error("Error while updating car:", error);
        }
      },
    });
  }

  private renderControls() {
    const controls = new BaseElement<"div">({ tag: "div" });
    const raceButton = new Button({
      text: "Race",
      callback: () => console.log("race"),
    });
    const resetButton = new Button({
      text: "Reset",
      callback: () => console.log("reset"),
    });
    const generateButton = new Button({
      text: "Generate cars",
      callback: () => {
        this.garageStore.generateRandomCars().catch((error) => {
          console.error("Error generating cars:", error);
        });
      },
    });
    controls.appendChildren(raceButton, resetButton, generateButton);
    return controls;
  }

  private renderPagination() {
    const pagination = new BaseElement<"div">({ tag: "div" });
    const previousButton = new Button({
      text: "Prev",
      callback: () => {
        this.garageStore.goToPreviousPage().catch((error) => {
          console.error("Error going to the previous page:", error);
        });
      },
    });
    const nextButton = new Button({
      text: "Next",
      callback: () => {
        this.garageStore.goToNextPage().catch((error) => {
          console.error("Error going to the next page:", error);
        });
      },
    });
    pagination.appendChildren(previousButton, nextButton);
    return pagination;
  }

  private bindStore() {
    this.garageStore.cars$.subscribe((cars) => this.renderCarList(cars));
    this.garageStore.total$.subscribe((total) => {
      this.pageNumber.setText(
        `Page #${this.garageStore.currentPage} / Total cars: ${total}`,
      );
    });
    this.garageStore.loadCars(1).catch((error) => {
      console.error("Error loading cars:", error);
    });
  }

  private renderCarList(cars: Car[]) {
    this.carListContainer.deleteChildren();

    cars.forEach((car) => {
      const carCard = new CarCard(car.id, car.name, car.color);
      carCard.addListener("carSelected", (event: Event) => {
        if (event instanceof CustomEvent && isCar(event.detail)) {
          const selectedId = event.detail.id;
          this.handleSelectCar(selectedId, car.name, car.color);
        }
      });

      carCard.addListener("carRemoved", (event: Event) => {
        void (async () => {
          if (event instanceof CustomEvent && isId(event.detail)) {
            const carId = event.detail.id;
            try {
              await this.garageStore.removeCar(carId);
            } catch (error) {
              console.error("Error while removing car:", error);
            }
          }
        })();
      });

      this.carListContainer.appendChildren(carCard);
    });

    this.outlet.appendChildren(this.carListContainer);
  }
}
