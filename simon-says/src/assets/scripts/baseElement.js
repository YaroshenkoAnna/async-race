export class BaseElement {
  constructor(tag, classes = [], attributes = {}, text = "", isSVG = false) {
    const namespace = "http://www.w3.org/2000/svg";
    this._elem = isSVG
      ? document.createElementNS(namespace, tag)
      : document.createElement(tag);
    this.addClasses(classes);
    this.setAttributes(attributes);
    if (text) {
      this._elem.textContent = text;
    }
  }

  addClasses(classes) {
    this._elem.classList.add(...classes);
  }

  removeClasses(removedClass) {
    this._elem.classList.remove(...removedClass);
  }

  toggleClass(toggledClass) {
    this._elem.classList.toggle(toggledClass);
  }

  setText(text) {
    this._elem.textContent = text;
  }

  getText() {
    return this._elem.textContent;
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

  removeEventListener(event, callback) {
    this._elem.removeEventListener(event, callback);
  }

  appendChildren(...children) {
    children.forEach((child) => {
      this._elem.appendChild(child._elem);
    });
  }

  children() {
    return this._elem.children;
  }

  disabled() {
    this._elem.disabled = true;
  }

  undisabled() {
    this._elem.disabled = false;
  }
}
