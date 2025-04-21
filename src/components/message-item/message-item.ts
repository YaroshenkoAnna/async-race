import { BaseElement } from "../../utils/base-element";
import styles from "./message-item.module.scss";
import { Message } from "../../stores/types";
import { Button } from "../button/button";
import { setActiveMessageItem } from "./set-active-message-item";

export class MessageItem extends BaseElement<"li"> {
  private modal: BaseElement<"div"> | null = null;
  private controls: BaseElement<"div">;
  private isControlsVisible = false;

  constructor(
    message: Message,
    currentUser: string,
    onEdit?: (id: string, oldText: string) => void,
    onDelete?: (id: string) => void
  ) {
    super({ tag: "li", classNames: [styles.message] });

    const time = new Date(message.datetime).toLocaleTimeString();
    const isSender = message.from === currentUser;

    this.addClasses(isSender ? [styles.own] : [styles.foreign]);

    const text = new BaseElement({
      tag: "div",
      classNames: [styles.text],
      text: message.text,
    });

    const info = new BaseElement({
      tag: "div",
      classNames: [styles.info],
      text: `${message.from} • ${time}${message.status.isEdited ? " • edited" : ""}`,
    });

    const status = new BaseElement({
      tag: "span",
      classNames: [styles.status],
      text: isSender
        ? message.status.isReaded
          ? "✓✓"
          : message.status.isDelivered
            ? "✓"
            : ""
        : "",
    });

    this.controls = new BaseElement({
      tag: "div",
      classNames: [styles.controls],
    });

    if (isSender) {
      const editBtn = new Button({
        text: "✏️",
        classNames: [styles.button],
        callback: () => {
          onEdit?.(message.id, message.text);
          this.hideControls();
        },
      });
      const deleteBtn = new Button({
        text: "🗑️",
        classNames: [styles.button],
        callback: () => {
          this.showConfirm(() => onDelete?.(message.id));
          this.hideControls();
        },
      });
      this.controls.appendChildren(editBtn, deleteBtn);
    }

    this.addListener("click", (e) => {
      e.stopPropagation();
      setActiveMessageItem(this);
      this.toggleControls();
    });

    document.addEventListener("click", () => this.hideControls());

    this.appendChildren(info, status, text);
  }

  public deactivate() {
    this.hideControls();
    this.modal?.deleteElement();
  }

  private toggleControls() {
    if (this.isControlsVisible) {
      this.hideControls();
    } else {
      this.showControls();
    }
  }

  private showControls() {
    if (!this.isControlsVisible) {
      this.appendChildren(this.controls);
      this.isControlsVisible = true;
    }
  }

  private hideControls() {
    if (this.isControlsVisible) {
      this.controls.deleteElement();
      this.modal?.deleteElement();
      this.isControlsVisible = false;
    }
  }

  private showConfirm(onConfirm: () => void) {
    if (this.modal) {
      this.modal.deleteElement();
    }

    this.modal = new BaseElement({
      tag: "div",
      classNames: [styles.confirmModal],
    });

    const text = new BaseElement({ tag: "p", text: "Delete this message?" });

    const confirmBtn = new Button({
      text: "Delete",
      classNames: [styles.confirmButton],
      callback: () => {
        onConfirm();
        this.modal?.deleteElement();
      },
    });

    const cancelBtn = new Button({
      text: "Cancel",
      classNames: [styles.cancelButton],
      callback: () => {
        this.modal?.deleteElement();
      },
    });

    this.modal.appendChildren(text, confirmBtn, cancelBtn);
    this.appendChildren(this.modal);
  }
}
