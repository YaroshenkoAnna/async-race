import { BaseElement } from "../../utils/base-element";
import { Button } from "../button/button";
import styles from "./confirmation-modal.module.scss";

export class ConfirmationModal extends BaseElement<"div"> {
  constructor({ onDelete, onCancel }: { onDelete: () => void, onCancel: () => void }) {
    super({ tag: "div", classNames: [styles.modal] });

    const message = new BaseElement({ tag: "p", text: "Delete this message?" });
    const btnContainer = new BaseElement({ tag: "div", classNames: [styles.buttons] });

    const cancelBtn = new Button({
      text: "Cancel",
      callback: onCancel,
    });

    const deleteBtn = new Button({
      text: "Delete",
      callback: onDelete,
    });

    btnContainer.appendChildren(cancelBtn, deleteBtn);
    this.appendChildren(message, btnContainer);
  }
}