import { Navigation } from "../components/navigation/navigation";
import { BaseElement } from "../utils/base-element";
import { Form } from "../components/form/form";
import { Button } from "../components/button/button";
import { CarCard } from "../components/car-card/car-card";

export class GaragePage {
  private outlet: BaseElement<"div">;
  private title: BaseElement<"h1">;
  private pageNumber: BaseElement<"h2">;

  constructor(outlet: BaseElement<"div">) {
    this.outlet = outlet;
    this.title = new BaseElement<"h1">({ tag: "h1", text: "Garage (5)" });
    this.pageNumber = new BaseElement<"h2">({ tag: "h2", text: "Page #1" });
    this.render();
  }

  private render() {
    const navigation = new Navigation();
    const createForm = new Form({
      buttonText: "Create",
      callback: () => {
        console.log("Create");
      },
    });
    const updateForm = new Form({
      buttonText: "Update",
      callback: () => {
        console.log("Update");
      },
    });

    const carCard = new CarCard("Car 1", "#caf7ca");

    const controls = this.renderControls();
    const pagination = this.renderPagination();
    this.outlet.appendChildren(
      navigation,
      createForm,
      updateForm,
      controls,
      this.title,
      this.pageNumber,
      carCard,
      pagination,
    );
  }

  private renderControls() {
    const controls = new BaseElement<"div">({ tag: "div" });
    const raceButton = new Button({
      text: "Race",
      callback: () => {
        console.log("race");
      },
    });
    const resetButton = new Button({
      text: "Reset",
      callback: () => {
        console.log("reset");
      },
    });
    const generateButton = new Button({
      text: "Generate cars",
      callback: () => {
        console.log("generate");
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
        console.log("prev");
      },
    });
    const nextButton = new Button({
      text: "Next",
      callback: () => {
        console.log("next");
      },
    });
    pagination.appendChildren(previousButton, nextButton);
    return pagination;
  }
}
