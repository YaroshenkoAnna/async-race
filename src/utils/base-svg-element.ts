import { BaseElementCommon } from "./base-element-common";

type SVGElementOptions = {
  href: string;
  attributes?: Record<string, string | undefined>;
  classNames?: string[];
};

export class BaseSVGElement extends BaseElementCommon {
  protected override _element: SVGElement;
  constructor(options: SVGElementOptions) {
    super();
    this._element = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );
    if (options.classNames) {
      this.addClasses(options.classNames);
    }
    this.setAttributes(options.attributes);
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", options.href);
    this.appendChildren(use);
  }
}
