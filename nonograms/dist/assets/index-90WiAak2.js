true&&(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
}());

class BaseElement {
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

  removeChild(child) {
    if (child instanceof BaseElement) {
      this._node.removeChild(child.getNode());
    } else if (child instanceof HTMLElement) {
      this._node.removeChild(child);
    }
  }

  clearChildren() {
    while (this._node.firstChild) {
      this._node.removeChild(this._node.firstChild);
    }
  }
}

const pagurian = [
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  [0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
  [0, 0, 1, 1, 1, 0, 0, 1, 1, 1],
  [0, 1, 1, 0, 1, 1, 0, 0, 0, 1],
  [0, 1, 0, 0, 0, 0, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 0, 1, 1, 1],
  [1, 1, 0, 1, 0, 1, 0, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 1, 0, 0],
];

const basketball = [
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
  [1, 0, 1, 1, 1, 0, 0, 0, 1, 1],
  [0, 1, 0, 1, 1, 1, 0, 1, 1, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 0, 1],
  [1, 1, 1, 1, 0, 0, 1, 0, 1, 0],
  [1, 1, 0, 0, 1, 0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
  [1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 1, 1, 0, 0, 1, 1, 0, 0, 1],
];

const ox = [
  [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
  [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
  [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
  [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
];

const bug = [
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
];

const cat = [
  [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
  [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
  [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
  [1, 1, 1, 0, 1, 0, 0, 1, 1, 1],
  [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
];

const monster = [
  [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
  [0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
];

const kite = [
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
  [0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
];

const wolf = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  [1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1],
  [1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1],
  [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
  [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const frog = [
  [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
];

const christmasDeco = [
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1],
  [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
];

const alien = [
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
];

const computer = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1],
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1],
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
];

const dog = [
  [0, 0, 0, 1, 1],
  [1, 0, 0, 1, 1],
  [1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0],
];

const clock = [
  [0, 1, 1, 1, 0],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [0, 1, 1, 1, 0],
];

const bomb = [
  [0, 0, 1, 1, 0],
  [0, 1, 0, 0, 1],
  [1, 1, 1, 0, 0],
  [1, 0, 1, 0, 0],
  [1, 1, 1, 0, 0],
];

const heart = [
  [0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [0, 1, 1, 1, 0],
  [0, 0, 1, 0, 0],
];

const camel = [
  [0, 1, 0, 0, 0],
  [1, 1, 1, 0, 1],
  [1, 1, 1, 1, 0],
  [1, 0, 1, 0, 0],
  [1, 0, 1, 0, 0],
];

const dino = [
  [0, 0, 0, 1, 1],
  [0, 0, 0, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 1, 1, 0],
  [1, 1, 0, 1, 0],
];

const nanogramMatrices = {
  pagurian,
  basketball,
  ox,
  bug,
  cat,
  monster,
  kite,
  wolf,
  frog,
  christmasDeco,
  alien,
  computer,
  dog,
  clock,
  camel,
  dino,
  heart,
  bomb,
};

const puzzleData = [];

for (const name in nanogramMatrices) {
  const size = nanogramMatrices[name].length;
  const puzzle = {
    name: name,
    solution: nanogramMatrices[name],
    size: size,
    difficulty: size === 5 ? "easy" : size === 10 ? "medium" : "hard",
  };

  puzzleData.push(puzzle);
}

puzzleData.sort((a, b) => {
  const difficulties = { easy: 1, medium: 2, hard: 3 };
  if (difficulties[a.difficulty] !== difficulties[b.difficulty])
    return difficulties[a.difficulty] - difficulties[b.difficulty];
  return a.name > b.name ? 1 : -1;
});

const selector = "_selector_11ers_33";
const styles$8 = {
	selector: selector
};

class LevelSelector extends BaseElement {
  constructor(levels, key, callback) {
    super({
      tag: "select",
      classes: [styles$8.selector],
      attributes: { name: key },
    });
    this.levels = levels;
    this.key = key;
    this.filterKeyArray = this.createFilterKeyArray(this.key, puzzleData);
    this.createOptions(this.filterKeyArray);
    this.addListener("change", callback);
  }

  createFilterKeyArray(key) {
    return Array.from(new Set(this.levels.map((el) => el[key])));
  }

  createOptions(filterKeyArray) {
    filterKeyArray.forEach((el) => {
      const option = new BaseElement({
        tag: "option",
        attributes: { value: el },
        text: el,
      });

      this.append(option);
    });
  }

  createFilterData() {
    return this.filterKeyArray.map((key) =>
      this.levels.filter((el) => el[this.key] === key),
    );
  }

  getCurrentValueIndex() {
    return this.getNode().selectedIndex;
  }

  setValue(value) {
    this.getNode().value = value;
  }

  getValue() {
    return this.getNode().value;
  }

  getSelectedValue() {
    return this.getNode().value;
  }
}

const timer$1 = "_timer_ppuom_33";
const styles$7 = {
	timer: timer$1
};

function formatTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000) % 60;
  const minutes = Math.floor(milliseconds / 60000);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

class Timer extends BaseElement {
  constructor() {
    super({ tag: "div", text: "00:00", classes: [styles$7.timer] });
    this.timeInterval;
    this.difference;
    this.savedTime = 0;
  }

  start() {
    const startTime = Date.now() - this.savedTime;
    this.timeInterval = setInterval(() => {
      this.difference = Date.now() - startTime;

      this.setText(formatTime(this.difference));
    }, 1000);
  }

  stop() {
    clearInterval(this.timeInterval);
  }

  reset() {
    this.stop();
    this.setText("00:00");
    this.difference = 0;
    this.savedTime = 0;
  }

  getCurrentTime() {
    return this.difference;
  }

  setTime(time) {
    this.setText(formatTime(time));
  }
}

class Button extends BaseElement {
  constructor({ text: text, classes = [], callback: callback }) {
    super({ tag: "button", classes });
    this.setText(text);

    if (callback) {
      this.addListener("click", callback);
    }
  }
}

const gameControls$1 = "_gameControls_nhagv_33";
const button$1 = "_button_nhagv_39";
const save = "_save_nhagv_64";
const random = "_random_nhagv_68";
const score = "_score_nhagv_72";
const theme = "_theme_nhagv_76";
const reset = "_reset_nhagv_84";
const load = "_load_nhagv_88";
const sound = "_sound_nhagv_92";
const styles$6 = {
	gameControls: gameControls$1,
	button: button$1,
	save: save,
	random: random,
	score: score,
	theme: theme,
	"continue": "_continue_nhagv_80",
	reset: reset,
	load: load,
	sound: sound
};

class GameControls extends BaseElement {
  isMute = false;
  theme = "LIGHT";
  constructor(gameManager) {
    super({ tag: "div", classes: [styles$6.gameControls] });
    this.gameManager = gameManager;
    this.render();
    this.storage = gameManager.storage;
    this.modal = gameManager.modal;
  }

  render() {
    const randomGameButton = new Button({
      classes: [styles$6.button, styles$6.random],
      text: "Random Game",
      callback: () => {
        this.gameManager.loadRandom();
      },
    });

    const resetButton = new Button({
      classes: [styles$6.button, styles$6.reset],
      text: "Reset Game",
      callback: () => {
        this.gameManager.currentGameField.reset();
      },
    });

    const saveGameButton = new Button({
      classes: [styles$6.button, styles$6.save],
      text: "Save Game",
      callback: () => {
        if (
          !this.gameManager.currentGameField ||
          this.gameManager.currentGameField.isSolutionShowed
        ) {
          return;
        }
        this.storage.saveGame({
          filled: this.gameManager.currentGameField.cellsMap.map((row) =>
            row.map((cell) => (cell.isFilled ? 1 : 0)),
          ),
          crosses: this.gameManager.currentGameField.cellsMap.map((row) =>
            row.map((cell) => (cell.hasCross ? 1 : 0)),
          ),
          time: this.gameManager.timer.getCurrentTime(),
          difficulty: this.gameManager.currentGameField.dataObj.difficulty,
          name: this.gameManager.currentGameField.dataObj.name,
          field: this.gameManager.currentGameField.dataObj,
        });
      },
    });

    const loadGameButton = new Button({
      classes: [styles$6.button, styles$6.load],
      text: "Continue Last Game",
      callback: () => {
        const savedData = this.storage.loadGame();
        if (!savedData) {
          return;
        }
        this.gameManager.loadGame(savedData);
      },
    });

    const showScores = new Button({
      classes: [styles$6.button, styles$6.score],
      text: "Show Score",
      callback: () => {
        const results = this.storage.loadLeaderboard();
        this.modal.createRating(results);
      },
    });

    const themeButton = new Button({
      classes: [styles$6.button, styles$6.theme],
      text: "Theme: LIGHT",
      callback: () => {
        document.documentElement.setAttribute("data-theme", "light");

        if (this.theme === "LIGHT") {
          this.theme = "DARK";
        } else {
          this.theme = "LIGHT";
        }
        themeButton.setText(`Theme: ${this.theme}`);
        document.documentElement.setAttribute(
          "data-theme",
          this.theme === "LIGHT" ? "light" : "dark",
        );
      },
    });
    const soundButton = new Button({
      classes: [styles$6.button, styles$6.sound],
      text: "Sound: ON",
      callback: () => {
        this.gameManager.soundManager.toggleMute();
        if (this.isMute) {
          soundButton.setText("Sound: ON");
          this.isMute = false;
        } else {
          soundButton.setText("Sound: OFF");
          this.isMute = true;
        }
      },
    });

    this.append(
      randomGameButton,
      resetButton,
      saveGameButton,
      loadGameButton,
      showScores,
      themeButton,
      soundButton,
    );
  }
}

class StorageManager {
  constructor(uniqueKey) {
    this.uniqueKey = uniqueKey;
    this.savedGameKey = this.uniqueKey + "_savedGame";
    this.leaderboardKey = this.uniqueKey + "_leaderboard";
  }

  saveGame(gameState) {
    localStorage.setItem(this.savedGameKey, JSON.stringify(gameState));
  }

  loadGame() {
    const savedData = localStorage.getItem(this.savedGameKey);
    return savedData ? JSON.parse(savedData) : null;
  }

  saveLeaderboard(leaderboard) {
    localStorage.setItem(this.leaderboardKey, JSON.stringify(leaderboard));
  }

  loadLeaderboard() {
    const savedData = localStorage.getItem(this.leaderboardKey);
    return savedData ? JSON.parse(savedData) : [];
  }
}

const cell = "_cell_11svv_33";
const bt2 = "_bt2_11svv_45";
const bb2 = "_bb2_11svv_49";
const bl2 = "_bl2_11svv_53";
const br2 = "_br2_11svv_57";
const filled = "_filled_11svv_61";
const c5 = "_c5_11svv_65";
const c10 = "_c10_11svv_70";
const c15 = "_c15_11svv_75";
const styles$5 = {
	cell: cell,
	bt2: bt2,
	bb2: bb2,
	bl2: bl2,
	br2: br2,
	filled: filled,
	c5: c5,
	c10: c10,
	c15: c15
};

class Cell extends BaseElement {
  hasCross = false;
  isFilled = false;
  constructor(columnNumber, rowNumber, size, gameField) {
    super({ tag: "div", classes: [styles$5.cell] });
    this.columnNumber = columnNumber;
    this.rowNumber = rowNumber;
    this.gameField = gameField;

    this.addBoldBorders(columnNumber, rowNumber, size);
    this.addClasses([styles$5[`c${size}`]]);
    this.eventHandlers = {
      click: this.toggleCellFill.bind(this),
      contextmenu: this.toggleCross.bind(this),
    };

    this.addListener("click", this.eventHandlers.click);
    this.addListener("contextmenu", this.eventHandlers.contextmenu);
  }

  addBoldBorders(col, row) {
    const boldBorderEvery = 5;

    const addBorderClass = (condition, style) => {
      if (condition) this.addClasses([style]);
    };
    addBorderClass((col + 1) % boldBorderEvery === 0, styles$5.br2);
    addBorderClass(col % boldBorderEvery === 0, styles$5.bl2);

    addBorderClass((row + 1) % boldBorderEvery === 0, styles$5.bb2);
    addBorderClass(row % boldBorderEvery === 0, styles$5.bt2);
  }

  toggleCellFill(event) {
    if (this.gameField.isFirstClick) {
      this.gameField.timer.start();
      this.gameField.isFirstClick = false;
    }
    if (event) {
      if (this.isFilled) {
        this.gameField.soundManager.play("cancel");
      } else {
        this.gameField.soundManager.play("click");
      }
    }
    this.hasCross = false;
    this.setText("");
    this.isFilled = !this.isFilled;
    this.toggleClass(styles$5.filled);
    if (this.gameField.isSolutionShowed) return;
    this.gameField.checkVictory();
  }

  toggleCross(event) {
    if (event) {
      event.preventDefault();
      if (this.hasCross) {
        this.gameField.soundManager.play("cancel");
      } else {
        this.gameField.soundManager.play("cross");
      }
    }
    this.isFilled = false;
    this.removeClasses([styles$5.filled]);

    if (this.hasCross) {
      this.hasCross = false;
      this.setText("");
    } else {
      this.hasCross = true;
      this.setText("×");
    }
    this.gameField.checkVictory();
  }

  clearData() {
    this.isFilled = false;
    this.hasCross = false;
    this.setText("");
    this.removeClasses([styles$5.filled]);
  }
}

const field = "_field_12g95_33";
const row$1 = "_row_12g95_45";
const cells = "_cells_12g95_50";
const solution = "_solution_12g95_56";
const s5 = "_s5_12g95_66";
const s10 = "_s10_12g95_71";
const s15 = "_s15_12g95_76";
const styles$4 = {
	field: field,
	row: row$1,
	cells: cells,
	solution: solution,
	s5: s5,
	s10: s10,
	s15: s15
};

const hint = "_hint_7qy14_33";
const h5 = "_h5_7qy14_45";
const h10 = "_h10_7qy14_50";
const h15 = "_h15_7qy14_55";
const hints = "_hints_7qy14_60";
const vertical = "_vertical_7qy14_64";
const horizontal = "_horizontal_7qy14_70";
const row = "_row_7qy14_76";
const styles$3 = {
	hint: hint,
	h5: h5,
	h10: h10,
	h15: h15,
	hints: hints,
	vertical: vertical,
	horizontal: horizontal,
	row: row
};

class Hints extends BaseElement {
  constructor(dataObj, className) {
    super({ tag: "div", classes: [styles$3.hints] });
    this.dataObj = dataObj;
    this.className = className;
    this.addClasses([styles$3[className]]);
    this.calculateHints();
  }

  calculateHints() {
    const solution = this.dataObj.solution;
    const isVertical = this.className === "vertical";

    for (let i = 0; i < solution.length; i++) {
      const hintArr = [];
      let counter = 0;

      for (let j = 0; j < solution.length; j++) {
        const cell = isVertical ? solution[i][j] : solution[j][i];

        if (cell) {
          counter++;
        }
        if ((!cell && counter) || (j === solution.length - 1 && cell)) {
          hintArr.push(counter);
          counter = 0;
        }
      }

      this.createHints(hintArr);
    }
  }

  createHints(arr) {
    const hintRow = new BaseElement({ tag: "div", classes: [styles$3.row] });
    this.append(hintRow);
    arr.forEach((el) => {
      const hint = new BaseElement({
        tag: "div",
        classes: [styles$3.hint],
        text: el,
      });
      hint.addClasses([styles$3[`h${this.dataObj.size}`]]);

      hintRow.append(hint);
    });
  }
}

class GameField extends BaseElement {
  maximalResultsLength = 5;
  isSolutionShowed = false;

  constructor(dataObj, gameManager) {
    super({ tag: "div", classes: [styles$4.field] });
    this.dataObj = dataObj;
    this.cells = new BaseElement({
      tag: "div",
      classes: [styles$4.cells],
    });
    this.cells.addClasses([styles$4[`c${dataObj.size}`]]);
    this.cellsMap = [];
    this.append(this.generateSolutionSection(), this.cells);
    this.generateRows(dataObj.size);
    this.generateHints();
    this.addListener("contextmenu", (e) => e.preventDefault());
    this.timer = gameManager.timer;
    this.isFirstClick = true;
    this.gameManager = gameManager;
    this.soundManager = gameManager.soundManager;
    this.storage = gameManager.storage;
    this.modal = gameManager.modal;
  }

  generateRows(length) {
    for (let i = 0; i < length; i++) {
      const row = new BaseElement({ tag: "div", classes: [styles$4.row] });
      this.cells.append(row);
      this.cellsMap.push([]);
      this.generateCells(row, length, i);
    }
  }

  generateCells(parent, length, rowNumber) {
    for (let i = 0; i < length; i++) {
      const cell = new Cell(i, rowNumber, length, this);

      this.cellsMap[rowNumber].push(cell);
      parent.append(cell);
    }
  }

  generateHints() {
    const verticalHints = new Hints(this.dataObj, "vertical");
    const horizontalHints = new Hints(this.dataObj, "horizontal");
    this.append(verticalHints, horizontalHints);
  }

  generateSolutionSection() {
    const solution = new Button({
      text: "Show solution",
      classes: [styles$4.solution],
      callback: this.showSolution.bind(this),
    });
    solution.addClasses([styles$4[`s${this.dataObj.size}`]]);
    return solution;
  }

  checkVictory() {
    const isCorrect = this.dataObj.solution.every((row, rowIndex) =>
      row.every(
        (cell, colIndex) => cell == this.cellsMap[rowIndex][colIndex].isFilled,
      ),
    );

    if (isCorrect) {
      this.handleVictory();
    }
  }

  handleVictory() {
    this.blockGameEvents();
    this.timer.stop();
    this.cellsMap.flat().forEach((cell) => cell.setText(""));

    const result = {
      time: this.timer.difference,
      name: this.dataObj.name,
      difficulty: this.dataObj.difficulty,
    };
    const results = this.storage.loadLeaderboard();
    if (results.length >= this.maximalResultsLength) {
      results.shift();
    }
    results.push(result);
    this.storage.saveLeaderboard(results);
    this.modal.createWinModal(this.timer.difference);
    this.soundManager.play("win");
    this.isSolutionShowed = true;
  }

  showSolution() {
    this.reset();
    this.isSolutionShowed = true;

    const flatCellsMap = this.cellsMap.flat();
    this.dataObj.solution.flat().forEach((cell, index) => {
      if (cell) {
        flatCellsMap[index].toggleCellFill();
      }
    });

    this.blockGameEvents();
    this.timer.stop();
  }

  reset() {
    this.cellsMap.flat().forEach((cell) => cell.clearData());
    this.timer.reset();
    this.isFirstClick = true;
    this.unblockGameEvents();
    this.isSolutionShowed = false;
  }

  blockGameEvents() {
    this.cellsMap.flat().forEach((cell) => {
      cell.removeListener("click", cell.eventHandlers.click);
      cell.removeListener("contextmenu", cell.eventHandlers.contextmenu);
    });
  }

  unblockGameEvents() {
    this.cellsMap.flat().forEach((cell) => {
      cell.addListener("click", cell.eventHandlers.click);
      cell.addListener("contextmenu", cell.eventHandlers.contextmenu);
    });
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

class GameManager {
  constructor(
    wrapper,
    timer,
    storage,
    selectors,
    difficultySelector,
    level,
    soundManager,
    modal,
  ) {
    this.wrapper = wrapper;
    this.timer = timer;
    this.storage = storage;
    this.selectors = selectors;
    this.currentGameField = null;
    this.difficultySelector = difficultySelector;
    this.level = level;
    this.soundManager = soundManager;
    this.modal = modal;
  }

  startNewGame(levelData) {
    if (this.currentGameField) {
      this.wrapper.removeChild(this.currentGameField);
    }

    this.timer.reset();
    this.currentGameField = new GameField(levelData, this);
    this.wrapper.append(this.currentGameField);
  }

  loadRandom() {
    const currentName = this.level.getValue();
    const difficulties = this.difficultySelector.filterKeyArray;
    const difficulty = difficulties[getRandomNumber(0, difficulties.length)];
    this.difficultySelector.setValue(difficulty);
    this.updateGameSelector(difficulty, () => {});
    const names = this.level.filterKeyArray;
    let name;
    do {
      name = names[getRandomNumber(0, names.length)];
    } while (name === currentName);

    this.level.setValue(name);
    this.startNewGame(this.getCurrentData(this.level));
  }

  loadGame(data) {
    this.difficultySelector.setValue(data.difficulty);
    this.updateGameSelector(data.difficulty, () => {
      this.level.setValue(data.name);

      this.startNewGame(data.field);
      this.timer.setTime(data.time);
      this.timer.savedTime = data.time;

      data.filled.forEach((row, i) => {
        row.forEach((el, j) => {
          if (el) {
            this.currentGameField.cellsMap[i][j].toggleCellFill();
          }
        });
      });

      data.crosses.forEach((row, i) => {
        row.forEach((el, j) => {
          if (el) {
            this.currentGameField.cellsMap[i][j].toggleCross();
          }
        });
      });
    });
  }

  updateGameSelector(difficulty, callback = null) {
    const filteredLevels = puzzleData.filter(
      (el) => el.difficulty === difficulty,
    );

    const newGameSelector = new LevelSelector(filteredLevels, "name", () => {
      this.startNewGame(this.getCurrentData(newGameSelector));
    });

    this.selectors.replaceChild(newGameSelector);
    this.level = newGameSelector;
    if (callback) callback();
  }

  getCurrentData(selector) {
    const data = selector.createFilterData()[selector.getCurrentValueIndex()];
    return Array.isArray(data) ? data[0] : data;
  }
}

class SoundManager {
  constructor() {
    this.sounds = {
      click: new Audio("./audios/click.mp3"),
      win: new Audio("./audios/win.mp3"),
      cancel: new Audio("./audios/cancel.mp3"),
      cross: new Audio("./audios/cross.mp3"),
    };
    this.isMuted = false;
    this.currentSound = null;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.currentSound) {
      this.currentSound.pause();
      this.currentSound.currentTime = 0;
    }
  }

  async play(soundName) {
    if (!this.isMuted && this.sounds[soundName]) {
      if (this.currentSound) {
        try {
          await this.currentSound.pause();
          this.currentSound.currentTime = 0;
        } catch (error) {
          console.warn("", error.message);
        }
      }

      this.currentSound = this.sounds[soundName];
      this.currentSound.play().catch((error) => {
        if (error.name !== "AbortError") {
          console.error(`error: ${error.message}`);
        }
      });
    }
  }

  setVolume(volume) {
    Object.values(this.sounds).forEach((sound) => {
      sound.volume = volume;
    });
  }
}

const modal$1 = "_modal_wfbqx_33";
const button = "_button_wfbqx_63";
const container$2 = "_container_wfbqx_74";
const table = "_table_wfbqx_81";
const item$2 = "_item_wfbqx_85";
const styles$2 = {
	modal: modal$1,
	button: button,
	container: container$2,
	table: table,
	item: item$2
};

class Modal extends BaseElement {
  constructor() {
    super({ tag: "dialog", classes: [styles$2.modal] });

    this.addListener("close", () => {
      this.clearChildren();
    });
  }

  createButton() {
    return new Button({
      text: "OK",
      classes: [styles$2.button],
      callback: () => this.getNode().close(),
    });
  }

  createWinModal(time) {
    const winTime = Math.ceil(time / 1000);
    const message = new BaseElement({
      tag: "p",
      classes: [styles$2.message],
      text: `Great! You have solved the nonogram in ${winTime} seconds!`,
    });

    this.append(message, this.createButton());
    this.getNode().showModal();
  }

  createRating(results) {
    const container = new BaseElement({
      tag: "div",
      classes: [styles$2.container],
    });
    const title = new BaseElement({
      tag: "h2",
      classes: [styles$2.title],
      text: "Rating",
    });

    const table = new BaseElement({ tag: "table", classes: [styles$2.table] });
    const thead = new BaseElement({
      tag: "thead",
      classes: [styles$2.tableTitles],
    });
    const tbody = new BaseElement({ tag: "tbody" });

    const headers = ["#", "Time", "Puzzle", "Difficulty"];
    const trHead = new BaseElement({
      tag: "tr",
    });
    headers.forEach((header) => {
      trHead.append(
        new BaseElement({
          tag: "th",
          classes: [styles$2.item],
          text: header,
        }),
      );
    });
    thead.append(trHead);
    table.append(thead, tbody);

    if (results.length === 0) {
      const emptyMessage = new BaseElement({
        tag: "p",
        classes: [styles$2.message],
        text: "No results yet!",
      });
      container.append(title, emptyMessage, this.createButton());
    } else {
      results.sort((a, b) => a.time - b.time);

      results.forEach((res, index) => {
        const tr = new BaseElement({ tag: "tr", classes: [styles$2.item] });
        tbody.append(tr);

        [index + 1, formatTime(res.time), res.name, res.difficulty].forEach(
          (text) => {
            tr.append(
              new BaseElement({ tag: "td", classes: [styles$2.item], text }),
            );
          },
        );
      });

      container.append(title, table, this.createButton());
    }

    this.append(container);
    this.getNode().showModal();
  }
}

const container$1 = "_container_1mpks_46";
const wrapper$1 = "_wrapper_1mpks_54";
const selectors$1 = "_selectors_1mpks_62";
const title$1 = "_title_1mpks_68";
const burgerMenu$2 = "_burgerMenu_1mpks_83";
const active$1 = "_active_1mpks_95";
const item$1 = "_item_1mpks_95";
const styles$1 = {
	container: container$1,
	wrapper: wrapper$1,
	selectors: selectors$1,
	title: title$1,
	burgerMenu: burgerMenu$2,
	active: active$1,
	item: item$1
};

const burgerMenu$1 = "_burgerMenu_3t56o_33";
const active = "_active_3t56o_47";
const item = "_item_3t56o_52";
const showed = "_showed_3t56o_79";
const styles = {
	burgerMenu: burgerMenu$1,
	active: active,
	item: item,
	showed: showed
};

class BurgerMenu extends BaseElement {
  constructor(buttons) {
    super({ tag: "div", classes: [styles.burgerMenu] });

    this.resizeHandler = this.showHideBurgerMenu.bind(this);
    this.addListener("click", (event) => {
      this.showHideBurgerMenu(event);
    });
    this.buttons = buttons;
    this.createElements(2);
  }

  createElements(numberOfElements) {
    for (let i = 0; i < numberOfElements; i++) {
      const span = new BaseElement({
        tag: "span",
        classes: [styles.item],
      });
      this.append(span);
    }
  }

  showHideBurgerMenu(event) {
    if (!this.getNode().classList.contains(styles.active)) {
      if (this.checkConditions(event)) {
        this.showMenu();
      }
    } else {
      if (this.checkConditions(event)) {
        console.log("hide");
        this.hideMenu();
      }
    }
  }

  checkConditions(event) {
    return (
      (event.type == "resize" && window.innerWidth > 768) ||
      event.type == "click"
    );
  }

  showMenu() {
    this.addClasses([styles.active]);
    this.buttons.addClasses([styles.showed]);
    this.buttons.addListener("click", this.resizeHandler);
    window.addEventListener("resize", this.resizeHandler);
  }
  hideMenu() {
    this.removeClasses([styles.active]);
    this.buttons.removeClasses([styles.showed]);
    this.buttons.removeListener("click", this.resizeHandler);
    window.removeEventListener("resize", this.resizeHandler);
  }
}

const uniqueKey = "nonograms345567";
const container = new BaseElement({ tag: "div", classes: [styles$1.container] });
document.body.appendChild(container.getNode());
const title = new BaseElement({
  tag: "h1",
  classes: [styles$1.title],
  text: "Nonograms",
});
const wrapper = new BaseElement({ tag: "div", classes: [styles$1.wrapper] });
container.append(title, wrapper);

const storageManager = new StorageManager(uniqueKey);
const soundManager = new SoundManager();
const timer = new Timer();
const modal = new Modal();

const selectors = new BaseElement({ tag: "div", classes: [styles$1.selectors] });

wrapper.append(selectors, timer, modal);

const difficultySelector = new LevelSelector(puzzleData, "difficulty", () => {
  updateGameSelector();
});

let gameSelector = createGameSelector(difficultySelector);

selectors.append(difficultySelector, gameSelector);
const gameManager = new GameManager(
  wrapper,
  timer,
  storageManager,
  selectors,
  difficultySelector,
  gameSelector,
  soundManager,
  modal,
);
gameManager.startNewGame(getCurrentData(gameSelector)[0]);

const gameControls = new GameControls(gameManager);
const burgerMenu = new BurgerMenu(gameControls);

wrapper.append(burgerMenu, gameControls);

function updateGameSelector() {
  gameSelector = createGameSelector(difficultySelector);
  selectors.replaceChild(gameSelector);
  gameManager.startNewGame(getCurrentData(gameSelector)[0]);
}

function createGameSelector(obj) {
  const currentData = getCurrentData(obj);

  return new LevelSelector(currentData, "name", () => {
    gameManager.startNewGame(getCurrentData(gameSelector)[0]);
  });
}

function getCurrentData(obj) {
  return obj.createFilterData()[obj.getCurrentValueIndex()];
}
//# sourceMappingURL=index-90WiAak2.js.map
