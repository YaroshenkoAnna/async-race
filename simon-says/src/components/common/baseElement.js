export class BaseElement {
  constructor(tag, classes = [], attributes = {}, innerContent = "") {
    this._elem = document.createElement(tag);
    this.addClasses(classes);
    this.setAttributes(attributes);
    this._elem.innerHTML = innerContent;
  }

  addClasses(classes) {
    this._elem.classList.add(...classes);
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
