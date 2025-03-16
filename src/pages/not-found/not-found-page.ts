import { BaseElement } from "../../utils/base-element";
import { Button } from "../../components/button/button";

export class NotFoundPage extends BaseElement<"main"> {
  constructor() {
    super({ tag: "main" });

    const title = new BaseElement<"h1">({
      tag: "h1",
      text: "Something went wrong",
    });
    const button = new Button({
      text: "Go back",
      callback: (): void => {
        globalThis.location.hash = "/";
      },
    });
    this.appendChildren(title, button);
  }
}
