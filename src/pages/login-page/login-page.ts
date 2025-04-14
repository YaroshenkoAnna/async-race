import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { BaseElement } from "../../utils/base-element";
import styles from "./login-page.module.scss";

export class LoginPage extends BaseElement<"main"> {
  private form = new BaseElement({ tag: "form" });
  private fieldset = new BaseElement({
    tag: "fieldset",
    classNames: [styles.fieldset],
  });
  private legend = new BaseElement({ tag: "legend", text: "Authorization" });
  public nameInput = new Input({
    type: "text",
    attributes: { id: "name", placeholder: "Enter your name" },
  });
  public passwordInput = new Input({
    type: "password",
    attributes: { id: "password", placeholder: "Enter password" },
  });
  public submitButton = new Button({
    text: "Submit",
    attributes: { type: "submit" },
    callback: () => {},
  });
  public infoButton = new Button({
    text: "Info",
    callback: () => {
      globalThis.location.hash = "/info";
    },
  });

  constructor() {
    super({
      tag: "main",
      classNames: [styles.main],
    });

    this.render();
  }

  private render(): void {
    this.appendChildren(this.form);
    this.form.appendChildren(this.fieldset);
    this.fieldset.appendChildren(
      this.legend,
      this.nameInput,
      this.passwordInput,
      this.submitButton,
      this.infoButton
    );
  }
}
