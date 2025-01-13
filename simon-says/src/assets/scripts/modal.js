import controlsStyles from "../styles/components/statusAndControls.module.css";
import styles from "../styles/components/modal.module.css";
import { Button } from "./statusAndControls.js";
import { BaseElement } from "./baseElement.js";

export const ModalContainer = new BaseElement("div", [
  styles.container,
  styles.hidden,
]);

const Modal = new BaseElement(
  "div",
  [styles.modal],
  {},
  "Congratulations! You have completed all levels!"
);
ModalContainer.appendChildren(Modal);
const ModalButton = new BaseElement(
  "button",
  [controlsStyles.button],
  {},
  "Close"
);
ModalButton.addEventListener("click", closeModal);
Modal.appendChildren(ModalButton);

export function showModal() {
  ModalContainer.removeClasses([styles.hidden]);
}

function closeModal() {
  ModalContainer.addClasses([styles.hidden]);
}
