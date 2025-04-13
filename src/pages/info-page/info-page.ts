import { BaseElement } from "../../utils/base-element";

class InfoPage extends BaseElement<"main"> {
  constructor() {
    super({
      tag: "main",
    });

    this.setText("Info page");
  }
}

export const infoPage = new InfoPage();
