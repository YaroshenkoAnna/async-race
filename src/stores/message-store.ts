import { Observable } from "../core/observable";
import { Message } from "./types";

export class MessageStore {
  private messages: Record<string, Observable<Message[]>> = {};
  private unreadCounts: Record<string, Observable<number>> = {};
  private currentUserLogin: string = "";

  public setCurrentUserLogin(login: string) {
    this.currentUserLogin = login;
  }

  public getMessages$(withUser: string): Observable<Message[]> {
    if (!this.messages[withUser]) {
      this.messages[withUser] = new Observable<Message[]>([]);
    }
    return this.messages[withUser];
  }

  public setMessages(withUser: string, messages: Message[]): void {
    this.getMessages$(withUser).set(messages);
    const anyForMe = messages.some((m) => m.to === this.currentUserLogin);
    if (anyForMe) {
      this.updateUnreadCount(withUser);
    }
  }

  public addMessage(withUser: string, message: Message): void {
    const messages = this.getMessages$(withUser).value;
    this.getMessages$(withUser).set([...messages, message]);
    if (message.to === this.currentUserLogin) {
      this.updateUnreadCount(message.from);
    }
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
        this.updateUnreadCount(user);
        return;
      }
    }
  }

  public updateText(
    messageId: string,
    newText: string,
    status: Message["status"]
  ) {
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
        this.updateUnreadCount(user);
        return;
      }
    }
  }

  public getUnreadCount$(withUser: string): Observable<number> {
    if (!this.unreadCounts[withUser]) {
      this.unreadCounts[withUser] = new Observable<number>(0);
    }
    return this.unreadCounts[withUser];
  }

  private updateUnreadCount(user: string): void {
    const all = this.getMessages$(user).value;
    const count = all.filter(
      (m) =>
        !m.status.isReaded && m.from === user && m.to === this.currentUserLogin
    ).length;
    console.log(`[updateUnreadCount] for ${user} → ${count}`);
    this.getUnreadCount$(user).set(count);
  }
}

export const messageStore = new MessageStore();
