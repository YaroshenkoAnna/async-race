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

  public get value(): string {
    return this._element.value;
  }

  public set value(value: string) {
    this._element.value = value;
  }
  public disable(): void {
    this._element.setAttribute("disabled", "true");
  }
  public enable(): void {
    this._element.removeAttribute("disabled");
  }

  private setType(type: string): void {
    this._element.setAttribute("type", type);
  }
}
