export type Tags = keyof HTMLElementTagNameMap;

export type TagOption<T extends Tags> = {
  tag: T;
};

export type BaseElementOptions = {
  classNames?: string[];
  text?: string;
  attributes?: Record<string, string | undefined>;
};

export type Subscription = () => void;

export class BaseElement<T extends Tags> {
  public children: BaseElement<Tags>[] = [];
  protected readonly _element: HTMLElementTagNameMap[T];
  protected readonly _subscriptions: Subscription[] = [];

  constructor(options: TagOption<T> & BaseElementOptions) {
    this._element = document.createElement(options.tag);
    if (options) {
      this.addClasses(options.classNames);
      this.setText(options.text);
      this.setAttributes(options.attributes);
    }
    this.children = [];
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
        this.children = [...this.children, child];
      } else {
        if (child instanceof Node) {
          this._element.append(child);
        }
      }
    }
  }

  public deleteChildren(): void {
    this.children.map((child) => {
      child.deleteElement();
    });
    this.children = [];

    while (this._element.firstChild) {
      const child = this._element.firstChild;
      child.remove();
    }
  }

  public deleteElement(): void {
    this.deleteChildren();
    this.unsubscribeAll();
    this._element.remove();
  }

  public sub(...subscriptions: Subscription[]): void {
    subscriptions.forEach((subscription) => {
      this._subscriptions.push(subscription);
    });
  }

  public unsubscribeAll(): void {
    this._subscriptions.forEach((subscription) => {
      subscription();
    });
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
