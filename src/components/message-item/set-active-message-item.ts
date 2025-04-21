import { MessageItem } from "./message-item";

let activeMessageItem: MessageItem | null = null;

export function setActiveMessageItem(item: MessageItem | null) {
  if (activeMessageItem && activeMessageItem !== item) {
    activeMessageItem.deactivate();
  }
  activeMessageItem = item;
}
