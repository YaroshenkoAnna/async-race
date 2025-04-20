import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { BaseElement } from "../../utils/base-element";
import styles from "./main-page.module.scss";
import { getRouter } from "../../router/router";
import { User } from "../../stores/types";
import { UserStore } from "../../stores/user-store";
import { Contact } from "../../components/contact/contact";
import { Status } from "../../components/contact/contact";
import { LoginViewModel } from "../../view-model/login-view-model";

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
    },
  });

  private userStore: UserStore;

  constructor(userStore: UserStore, loginVM: LoginViewModel) {
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

    this.search.addListener("input", (e: Event) => {
      const input = (e.target as HTMLInputElement).value;
      this.userStore.filter(input);
    });
  }

  private renderContacts(online: User[], offline: User[]): void {
    this.usersList.deleteChildren();
    online.forEach((user) => {
      this.usersList.appendChildren(new Contact(user.login, Status.Online));
    });

    offline.forEach((user) => {
      this.usersList.appendChildren(new Contact(user.login, Status.Offline));
    });
  }
}
