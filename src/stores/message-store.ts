import { Observable } from "../core/observable";
import { Message } from "./types";

export class MessageStore {
  private messages: Record<string, Observable<Message[]>> = {};

  public getMessages$(withUser: string): Observable<Message[]> {
    if (!this.messages[withUser]) {
      this.messages[withUser] = new Observable<Message[]>([]);
    }
    return this.messages[withUser];
  }

  public setMessages(withUser: string, messages: Message[]): void {
    this.getMessages$(withUser).set(messages);
  }

  public addMessage(withUser: string, message: Message): void {
    const messages = this.getMessages$(withUser).value;
    this.getMessages$(withUser).set([...messages, message]);
  }

  public updateStatus(messageId: string, status: Partial<Message["status"]>) {
    for (const user in this.messages) {
      const msgs = this.messages[user].value;
      const index = msgs.findIndex((m) => m.id === messageId);
      if (index !== -1) {
        const updated = [...msgs];
        updated[index] = {
          ...updated[index],
          status: { ...updated[index].status, ...status },
        };
        this.messages[user].set(updated);
        return;
      }
    }
  }

  public updateText(messageId: string, newText: string, status: Message["status"]) {
    for (const user in this.messages) {
      const msgs = this.messages[user].value;
      const index = msgs.findIndex((m) => m.id === messageId);
      if (index !== -1) {
        const updated = [...msgs];
        updated[index] = {
          ...updated[index],
          text: newText,
          status: { ...updated[index].status, ...status },
        };
        this.messages[user].set(updated);
        return;
      }
    }
  }
}

export const messageStore = new MessageStore();