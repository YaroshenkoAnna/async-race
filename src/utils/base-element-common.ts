export type BaseElementOptions = {
  classNames?: string[];
  text?: string;
  attributes?: Record<string, string | undefined>;
};

export type Subscription = () => void;

export abstract class BaseElementCommon {
  public children: BaseElementCommon[] = [];
  protected _subscriptions: Subscription[] = [];
  protected abstract _element: HTMLElement | SVGElement;

  public get node(): HTMLElement | SVGElement {
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

  public appendChildren(...children: Array<BaseElementCommon | Node>): void {
    for (const child of children) {
      if (child instanceof BaseElementCommon) {
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
