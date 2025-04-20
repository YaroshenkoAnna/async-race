import { BaseElement } from "../../utils/base-element";
import styles from "./message-item.module.scss";
import { Message } from "../../stores/types";
import { Button } from "../button/button";

export class MessageItem extends BaseElement<"li"> {
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

    const controls = new BaseElement({
      tag: "div",
      classNames: [styles.controls],
    });

    if (isSender) {
      const editBtn = new Button({
        text: "✏️",
        classNames: [styles.button],
        callback: () => onEdit?.(message.id, message.text),
      });
      const deleteBtn = new Button({
        text: "🗑️",
        classNames: [styles.button],
        callback: () => onDelete?.(message.id),
      });
      controls.appendChildren(editBtn, deleteBtn);
    }

    this.appendChildren(info, text, status, controls);
  }
}
