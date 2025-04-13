import { BaseElement } from "../../utils/base-element";

class ErrorPage extends BaseElement<"main"> {
  constructor() {
    super({
      tag: "main",
    });

    this.setText("Error 404");
  }
}

export const errorPage = new ErrorPage();
