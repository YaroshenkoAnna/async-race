export class BaseElement {
  constructor(
    tag,
    classes = [],
    attributes = {},
    innerContent = "",
    isSVG = false
  ) {
    const namespace = "http://www.w3.org/2000/svg";
    this._elem = isSVG
      ? document.createElementNS(namespace, tag)
      : document.createElement(tag);
    this.addClasses(classes);
    this.setAttributes(attributes);
    if (innerContent) this.setInnerHTML(innerContent);
  }

  addClasses(classes) {
    this._elem.classList.add(...classes);
  }

  removeClass(removedClass) {
    this._elem.classList.remove(removedClass);
  }

  toggleClass(toggledClass) {
    this._elem.classList.toggle(toggledClass);
  }

  setInnerHTML(innerContent) {
    this._elem.innerHTML = innerContent;
  }

  getInnerHTML() {
    return this._elem.innerHTML;
  }

  setAttributes(atr) {
    Object.entries(atr).forEach(([key, val]) =>
      this._elem.setAttribute(key, val)
    );
  }

  getAttribute(atr) {
    return this._elem.getAttribute(atr);
  }

  addEventListener(event, callback) {
    this._elem.addEventListener(event, callback);
  }

  appendChildren(...children) {
    children.forEach((child) => {
      this._elem.appendChild(child._elem);
    });
  }
}
