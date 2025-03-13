export type Tags = keyof HTMLElementTagNameMap;

export type TagOption<T extends Tags> = {
  tag: T;
};

export type BaseElementOptions = {
  classNames?: string[];
  text?: string;
  attributes?: Record<string, string | undefined>;
};

export class BaseElement<T extends Tags> {
  protected readonly _element: HTMLElementTagNameMap[T];

  constructor(options: TagOption<T> & BaseElementOptions) {
    this._element = document.createElement(options.tag);
    if (options) {
      this.addClasses(options.classNames);
      this.setText(options.text);
      this.setAttributes(options.attributes);
    }
  }

  public get node(): HTMLElementTagNameMap[T] {
    return this._element;
  }
  public addClasses(classNames: string[] | undefined): void {
    if (!classNames) return;
    if (classNames.length > 0) {
      this._element.classList.add(...classNames);
    }
  }

  public removeClasses(classNames: string[] | undefined): void {
    if (!classNames) return;
    if (classNames.length > 0) {
      this._element.classList.remove(...classNames);
    }
  }

  public toggleClass(className: string | undefined): void {
    if (!className) return;
    this._element.classList.toggle(className);
  }

  public setText(text: string | undefined): void {
    if (!text) return;
    this._element.textContent = text;
  }

  public setAttributes(
    attributes: Record<string, string | undefined> | undefined,
  ): void {
    if (!attributes) return;
    for (const [key, value] of Object.entries(attributes)) {
      if (value) this._element.setAttribute(key, value);
    }
  }

  public getAttribute(attributeName: string): string | null {
    return this._element.getAttribute(attributeName);
  }

  public removeAttribute(attributeName: string): void {
    this._element.removeAttribute(attributeName);
  }

  public appendChildren(...children: Array<BaseElement<Tags> | Node>): void {
    for (const child of children) {
      if (child instanceof BaseElement) {
        this._element.append(child.node);
      } else {
        if (child instanceof Node) {
          this._element.append(child);
        }
      }
    }
  }

  public deleteChildren(): void {
    while (this._element.firstChild) {
      this._element.firstChild.remove();
    }
  }

  public deleteElement(): void {
    this.deleteChildren();
    this._element.remove();
  }

  public addListener(
    event: string,
    listener: EventListener,
    options: boolean = false,
  ): void {
    this._element.addEventListener(event, listener, options);
  }

  public removeListener(
    event: string,
    listener: EventListener,
    options: boolean = false,
  ): void {
    this._element.removeEventListener(event, listener, options);
  }
}
