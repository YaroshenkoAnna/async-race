import { BaseElement } from "../../utils/base-element";

class MainPage extends BaseElement<"main"> {
  constructor() {
    super({
      tag: "main",
    });

    this.setText("Main page");
  }
}

export const mainPage = new MainPage();
