import { BaseElement } from "../../utils/base-element";
import { BaseElementOptions } from "../../utils/base-element";
import { Observable } from "../../core/observable";
import styles from "./input.module.scss";

interface InputOptions extends BaseElementOptions {
  type: string;
}

export class Input extends BaseElement<"input"> {
  private value$ = new Observable<string>("");
  private errorMessage = new BaseElement({
    tag: "label",
    classNames: [styles["error-message"]],
  });

  constructor(options: InputOptions) {
    super({
      tag: "input",
      classNames: options.classNames,
      text: options.text,
      attributes: options.attributes,
    });

    this.setType(options.type);
    this.addListener("input", () => {
      this.value$.set(this.value);
    });
  }

  public get value(): string {
    return this._element.value;
  }

  public set value(value: string) {
    this._element.value = value;
    this.value$.set(value);
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

  public observe(callback: (val: string) => void) {
    return this.value$.subscribeAndGet(callback);
  }

  public showErrors(errors: string[]) {
    this.errorMessage.deleteElement();
    this._element.classList.toggle(styles.error, errors.length > 0);
    if (errors.length > 0) {
      this._element.parentElement?.appendChild(this.errorMessage.node);
      this.errorMessage.setText(errors.join("\n"));
    }
  }
}
