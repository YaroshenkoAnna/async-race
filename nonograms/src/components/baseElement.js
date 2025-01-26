export class BaseElement {
  constructor({ tag, classes = [], attributes = {}, text = "" }) {
    const node = document.createElement(tag);
    this._node = node;
    if (classes.length > 0) {
      this.addClasses(classes);
    }
    this.setAttributes(attributes);
    node.textContent = text;
  }

  setText(text) {
    this._node.textContent = text;
  }

  addClasses(classes) {
    this._node.classList.add(...classes);
  }

  removeClasses(classes) {
    this._node.classList.remove(...classes);
  }

  toggleClass(toggledClass) {
    this._node.classList.toggle(toggledClass);
  }

  setAttributes(atr) {
    Object.entries(atr).forEach(([key, val]) =>
      this._node.setAttribute(key, val),
    );
  }

  append(...children) {
    children.forEach((child) => {
      this._node.appendChild(child._node);
    });
  }

  getNode() {
    return this._node;
  }

  addListener(event, listener, options = false) {
    this._node.addEventListener(event, listener, options);
  }

  removeListener(event, listener, options = false) {
    this._node.removeEventListener(event, listener, options);
  }

  replaceChild(newChild) {
    let addNode;
    if (newChild instanceof BaseElement) {
      addNode = newChild.getNode();
    }
    this._node.replaceChild(addNode, this._node.lastElementChild);
  }
}
