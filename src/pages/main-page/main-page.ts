import { BaseElement } from "../../utils/base-element";

export class MainPage extends BaseElement<"main"> {
  constructor() {
    super({
      tag: "main",
    });

    
    this.setText("Main page");
  }
}


