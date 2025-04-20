import { BaseElement } from "../../utils/base-element";
import styles from "./message-list.module.scss";
import { Message } from "../../stores/types";
import { MessageItem } from "../message-item/message-item";

export class MessageList extends BaseElement<"ul"> {
  constructor(
    messages: Message[],
    currentUser: string,
    unreadDividerIndex: number | null = null,
    onEdit?: (id: string, oldText: string) => void,
    onDelete?: (id: string) => void
  ) {
    super({ tag: "ul", classNames: [styles.list] });

    this.render(messages, currentUser, unreadDividerIndex, onEdit, onDelete);
  }

  private render(
    messages: Message[],
    currentUser: string,
    unreadDividerIndex: number | null,
    onEdit?: (id: string, oldText: string) => void,
    onDelete?: (id: string) => void
  ) {
    if (!messages.length) {
      this.appendChildren(
        new BaseElement({ tag: "div", text: "This is the beginning of your conversation." })
      );
      return;
    }

    messages.forEach((msg, index) => {
      if (unreadDividerIndex !== null && index === unreadDividerIndex) {
        this.appendChildren(
          new BaseElement({ tag: "hr", classNames: [styles.divider] })
        );
      }

      this.appendChildren(new MessageItem(msg, currentUser, onEdit, onDelete));
    });

    setTimeout(() => {
      this.node.scrollTop = this.node.scrollHeight;
    }, 0);
  }
}
