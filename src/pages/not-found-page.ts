import { BaseElement } from "../utils/base-element";

export class NotFoundPage extends BaseElement<"div"> {
  constructor() {
    super({ tag: "div" });

    const title = new BaseElement({
      tag: "h1",
      text: "404",
    });
    const message = new BaseElement({
      tag: "p",
      text: "Page not found",
    });

    this.appendChildren(title, message);
  }
}
