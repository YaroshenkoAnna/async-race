import styles from "../styles/components/modal.module.css";
import { BaseElement } from "./baseElement.js";
import { Wrapper } from "./layoutContainers.js";

const ModalContainer = new BaseElement("div", [styles.container]);

const Modal = new BaseElement(
  "div",
  [styles.modal],
  {},
  "Congratulations! You have completed all levels!"
);

ModalContainer.appendChildren(Modal);

export function showModal() {
  Wrapper.appendChildren(ModalContainer);
}
