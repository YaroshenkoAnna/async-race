export class BaseElement {
  constructor({tag, classes = [], attributes = {}}) {
    this._elem = document.createElement(tag);
    this.addClasses(classes);
    this.setAttributes(attributes);
  }

  addClasses(classes) {
    this._elem.classList.add(...classes);
  }

  removeClasses(classes) {
    this._elem.classList.remove(...classes);
  }

  setAttributes(atr) {
    Object.entries(atr).forEach(([key, val]) =>
      this._elem.setAttribute(key, val),
    );
  }

  appendChildren(...children) {
    children.forEach((child) => {
      if (child instanceof BaseElement) {
        this._elem.appendChild(child._elem);
      } else {
        this._elem.textContent = child;
      }
    });
  }
}
