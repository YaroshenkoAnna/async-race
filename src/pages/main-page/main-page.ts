import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { BaseElement } from "../../utils/base-element";
import styles from "./main-page.module.scss";
import { getRouter } from "../../router/router";
import { Message, User } from "../../stores/types";
import { UserStore } from "../../stores/user-store";
import { Contact } from "../../components/contact/contact";
import { Status } from "../../components/contact/contact";
import { LoginViewModel } from "../../view-model/login-view-model";
import { MessageService } from "../../services/message-service";
import { messageStore } from "../../stores/message-store";
import { MessageList } from "../../components/message-list/message-list";
import { ConfirmationModal } from "../../components/confirmation-modal/confirmation-modal";
export class MainPage extends BaseElement<"main"> {
  private header = new BaseElement({
    tag: "section",
    classNames: [styles.header],
  });
  private content = new BaseElement({
    tag: "section",
    classNames: [styles.content],
  });

  private contacts = new BaseElement({
    tag: "aside",
    classNames: [styles.contacts],
  });
  private dialog = new BaseElement({
    tag: "section",
    classNames: [styles.dialog],
  });

  private currentUser = new BaseElement({
    tag: "label",
  });

  private title = new BaseElement({
    tag: "h1",
    classNames: [styles.title],
    text: "Fun Chat",
  });

  private buttonsContainer = new BaseElement({
    tag: "div",
    classNames: [styles["buttons-container"]],
  });
  private infoButton = new Button({
    text: "Info",
    classNames: [styles.button],
    callback: () => {
      getRouter().navigate("/info");
    },
  });
  private logoutButton: Button;

  private search = new Input({
    type: "text",
    classNames: [styles.search],
    attributes: { placeholder: "Search" },
  });

  private usersList = new BaseElement({
    tag: "ul",
    classNames: [styles.list],
  });

  private dialogHeader = new BaseElement({
    tag: "div",
    classNames: [styles["dialog-header"]],
  });

  private dialogBody = new BaseElement({
    tag: "div",
    classNames: [styles["dialog-body"]],
  });

  private dialogInput = new BaseElement({
    tag: "form",
    classNames: [styles["dialog-input"]],
  });

  private selectedUser = new BaseElement({
    tag: "label",
    text: "Selected user",
  });

  private status = new BaseElement({
    tag: "label",
    text: "Status",
  });

  private info = new BaseElement({
    tag: "label",
    classNames: [styles.info],
    text: "Write your first message",
  });

  private messageInput = new BaseElement({
    tag: "textarea",
    classNames: [styles["message-input"]],
    attributes: { placeholder: "Type your message" },
  });

  private sendButton = new Button({
    text: "Send",
    attributes: { type: "submit" },
    callback: (event) => {
      event.preventDefault();
      this.sendMessage();
    },
  });

  private selectedLogin: string | null = null;

  private userStore: UserStore;

  private messageService: MessageService;
  private currentUserLogin: string;
  private unreadSubscriptions: Record<string, () => void> = {};

  private editingMessageId: string | null = null;
  private hideUnreadDivider = false;

  constructor(
    userStore: UserStore,
    loginVM: LoginViewModel,
    messageService: MessageService
  ) {
    super({
      tag: "main",
      classNames: [styles.main],
    });

    this.logoutButton = new Button({
      text: "Logout",
      classNames: [styles.button],
      callback: () => {
        loginVM.logout();
      },
    });

    this.userStore = userStore;

    const currentUser = this.userStore.currentUser$?.value;
    if (currentUser?.login) {
      messageStore.setCurrentUserLogin(currentUser.login);
    }

    this.userStore.activeUsers$.subscribe((active) => {
      const offline = this.userStore.inactiveUsers$.value;
      this.renderContacts(active, offline);
    });

    this.userStore.inactiveUsers$.subscribe((inactive) => {
      const online = this.userStore.activeUsers$.value;
      this.renderContacts(online, inactive);
    });

    this.currentUser.setText(
      `User: ${this.userStore?.currentUser$?.value?.login}`
    ),
      (this.messageService = messageService);
    this.currentUserLogin = currentUser?.login ?? "";

    this.renderContacts(
      this.userStore.activeUsers$.value,
      this.userStore.inactiveUsers$.value
    );
    this.render();
  }

  private render(): void {
    this.appendChildren(this.header, this.content);
    this.content.appendChildren(this.contacts, this.dialog);
    this.header.appendChildren(
      this.currentUser,
      this.title,
      this.buttonsContainer
    );
    this.buttonsContainer.appendChildren(this.infoButton, this.logoutButton);
    this.contacts.appendChildren(this.search, this.usersList);
    this.dialog.appendChildren(
      this.dialogHeader,
      this.dialogBody,
      this.dialogInput
    );
    this.dialogHeader.appendChildren(this.selectedUser, this.status);
    this.dialogBody.appendChildren(this.info);
    this.dialogInput.appendChildren(this.messageInput, this.sendButton);

    this.messageInput.addListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    this.search.addListener("input", (e: Event) => {
      const input = (e.target as HTMLInputElement).value;
      this.userStore.filter(input);
    });
  }

  private renderContacts(online: User[], offline: User[]): void {
    for (const unsub of Object.values(this.unreadSubscriptions)) {
      unsub();
    }
    this.unreadSubscriptions = {};
    this.usersList.deleteChildren();

    const renderContact = (user: User, status: Status) => {
      const unread$ = messageStore.getUnreadCount$(user.login);

      let contact = new Contact(user.login, status, unread$.value, () =>
        this.selectUser(user, status)
      );
      this.usersList.appendChildren(contact);

      const unsub = unread$.subscribe((count) => {
        const updated = new Contact(user.login, status, count, () =>
          this.selectUser(user, status)
        );

        const index = Array.from(this.usersList.node.children).indexOf(
          contact.node
        );
        if (index !== -1) {
          this.usersList.node.children[index].replaceWith(updated.node);
          contact = updated;
        } else {
          console.warn(
            `[replaceWith] Contact node not found for ${user.login}`
          );
        }
      });

      this.unreadSubscriptions[user.login] = unsub;
    };

    online.forEach((user) => renderContact(user, Status.Online));
    offline.forEach((user) => renderContact(user, Status.Offline));

    const all = [...online, ...offline];
    const found = all.find((u) => u.login === this.selectedLogin);
    if (found) {
      const newStatus = online.includes(found) ? Status.Online : Status.Offline;
      this.status.setText(`Status: ${newStatus}`);
    }
  }

  private selectedMessagesSubscription: (() => void) | null = null;

  private selectUser(user: User, status: Status): void {
    this.selectedLogin = user.login;
    this.selectedUser.setText(`Selected: ${user.login}`);
    this.status.setText(`Status: ${status}`);
    this.hideUnreadDivider = false;

    if (this.selectedMessagesSubscription) {
      this.selectedMessagesSubscription();
    }

    const messages$ = messageStore.getMessages$(user.login);

    this.selectedMessagesSubscription = messages$.subscribe((messages) => {
      this.updateMessages(messages);
    });

    if (messages$.value.length === 0) {
      this.messageService.fetchHistory(user.login);
    } else {
      this.updateMessages(messages$.value);
    }
  }

  private updateMessages(messages: Message[]) {
    this.dialogBody.deleteChildren();

    const unreadDividerIndex = messages.findIndex(
      (m) => m.to === this.currentUserLogin && !m.status.isReaded
    );

    const list = new MessageList(
      messages,
      this.currentUserLogin,
      unreadDividerIndex >= 0 ? unreadDividerIndex : null,
      this.editMessage.bind(this),
      this.deleteMessage.bind(this)
    );

    if (unreadDividerIndex >= 0) {
      const unreadMessages = messages.slice(unreadDividerIndex);
      unreadMessages.forEach((msg) => {
        if (!msg.status.isReaded && msg.to === this.currentUserLogin) {
          this.messageService.markAsRead(msg.id);
        }
      });
    }

    this.dialogBody.appendChildren(list);
  }

  private sendMessage(): void {
    const text = (this.messageInput.node as HTMLTextAreaElement).value;
    if (!this.selectedLogin || !text) return;

    this.hideUnreadDivider = true;

    if (this.editingMessageId) {
      this.messageService.editMessage(this.editingMessageId, text).then(() => {
        this.editingMessageId = null;
        this.sendButton.setText("Send");
        (this.messageInput.node as HTMLTextAreaElement).value = "";
      });
      return;
    }

    const message = {
      id: `temp-${Date.now()}`,
      from: this.currentUserLogin,
      to: this.selectedLogin,
      text,
      datetime: Date.now(),
      status: {
        isDelivered: false,
        isReaded: false,
        isEdited: false,
        isDeleted: false,
      },
    };

    messageStore.addMessage(this.selectedLogin, message);

    this.messageService.send(this.selectedLogin, text).then(() => {
      (this.messageInput.node as HTMLTextAreaElement).value = "";
    });
  }

  private editMessage(id: string, oldText: string): void {
    this.messageInput.setText("");
    this.editingMessageId = id;
    (this.messageInput.node as HTMLTextAreaElement).value = oldText;
    this.sendButton.setText("Edit");
  }

  private deleteMessage(id: string): void {
    this.messageService.deleteMessage(id).then(() => {
      messageStore.removeMessage(id);
    });
  }
}
