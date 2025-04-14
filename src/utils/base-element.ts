import { BaseElementCommon } from "./base-element-common";

export interface BaseElementOptions {
  classNames?: string[];
  text?: string;
  attributes?: Record<string, string | undefined>;
}

export type Tags = keyof HTMLElementTagNameMap;

export interface TagOption<T extends Tags> extends BaseElementOptions {
  tag: T;
}

export class BaseElement<T extends Tags> extends BaseElementCommon {
  protected override _element: HTMLElementTagNameMap[T];

  constructor(options: TagOption<T>) {
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
