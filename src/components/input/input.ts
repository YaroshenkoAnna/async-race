import { BaseElement } from "../../utils/base-element";
import type { BaseElementOptions } from "../../utils/base-element";

type InputOptions = {
  type: string;
};

export class Input extends BaseElement<"input"> {
  constructor(options: BaseElementOptions & InputOptions) {
    super({ tag: "input" });

    this.setType(options.type);
  }

  public getValue(): string {
    return this._element.value;
  }

  public setValue(value: string): void {
    this._element.value = value;
  }

  private setType(type: string): void {
    this._element.setAttribute("type", type);
  }
}
