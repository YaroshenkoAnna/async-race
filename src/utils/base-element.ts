import { BaseElementCommon } from "./base-element-common";

export type Tags = keyof HTMLElementTagNameMap;

export type TagOption<T extends Tags> = {
  tag: T;
};

export type BaseElementOptions = {
  classNames?: string[];
  text?: string;
  attributes?: Record<string, string | undefined>;
};

export class BaseElement<T extends Tags> extends BaseElementCommon {
  protected override _element: HTMLElementTagNameMap[T];

  constructor(options: TagOption<T> & BaseElementOptions) {
    super();
    this._element = document.createElement(options.tag);
    if (options) {
      this.addClasses(options.classNames);
      this.setText(options.text);
      this.setAttributes(options.attributes);
    }
  }

  public setText(text: string | undefined): void {
    if (!text) return;
    this._element.textContent = text;
  }
}
