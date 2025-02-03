import { BaseElement } from "./baseElement";
import styles from "../styles/burgerMenu.module.scss";

export class BurgerMenu extends BaseElement {
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
