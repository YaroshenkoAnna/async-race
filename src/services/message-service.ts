import { SocketClient } from "../network/socket-client";
import { createUniqueId } from "../network/helpers/create-unique-id";
import { Message } from "../stores/types";
import { messageStore } from "../stores/message-store";

export class MessageService {
  constructor(private client: SocketClient) {
    this.subscribeToMessages();
  }

  public send(to: string, text: string): Promise<Message> {
    const id = createUniqueId();
    return this.sendRequest<Message>("MSG_SEND", { message: { to, text } }, id);
  }

  public fetchHistory(withUser: string): Promise<Message[]> {
    const id = createUniqueId();
    return this.sendRequest<{ messages: Message[] }>("MSG_FROM_USER", { user: { login: withUser } }, id)
      .then(res => {
        messageStore.setMessages(withUser, res.messages);
        return res.messages;
      });
  }

  public markAsRead(messageId: string): Promise<void> {
    const id = createUniqueId();
    return this.sendRequest("MSG_READ", { message: { id: messageId } }, id).then(() => {});
  }

  public deleteMessage(messageId: string): Promise<void> {
    const id = createUniqueId();
    return this.sendRequest("MSG_DELETE", { message: { id: messageId } }, id).then(() => {});
  }

  public editMessage(messageId: string, text: string): Promise<void> {
    const id = createUniqueId();
    return this.sendRequest("MSG_EDIT", { message: { id: messageId, text } }, id).then(() => {});
  }

  private subscribeToMessages() {
    this.client.on("MSG_SEND", (res) => {
      const msg: Message = res.payload.message;
      messageStore.addMessage(msg.from, msg);
    });

    this.client.on("MSG_DELIVER", (res) => {
      messageStore.updateStatus(res.payload.message.id, { isDelivered: true });
    });

    this.client.on("MSG_READ", (res) => {
      messageStore.updateStatus(res.payload.message.id, { isReaded: true });
    });

    this.client.on("MSG_DELETE", (res) => {
      messageStore.updateStatus(res.payload.message.id, { isDeleted: true });
    });

    this.client.on("MSG_EDIT", (res) => {
      const { id, text, status } = res.payload.message;
      messageStore.updateText(id, text, status);
    });
  }

  private sendRequest<T = any>(
    type: string,
    payload: any,
    id: string
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const unsub = this.client.on(type, (res) => {
        if (res.id === id) {
          unsub();
          resolve(res.payload);
        }
      });

      const errUnsub = this.client.on("ERROR", (res) => {
        if (res.id === id) {
          errUnsub();
          reject(res.payload.error);
        }
      });

      this.client.send({ id, type, payload });
    });
  }
}