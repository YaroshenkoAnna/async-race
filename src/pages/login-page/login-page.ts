import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { BaseElement } from "../../utils/base-element";
import { FormViewModel } from "../../view-model/form-view-model";
import { LoginViewModel } from "../../view-model/login-view-model";
import styles from "./login-page.module.scss";
import { getRouter } from "../../router/router";

export class LoginPage extends BaseElement<"main"> {
  private formVM: FormViewModel;
  private loginVM: LoginViewModel;
  private form = new BaseElement({ tag: "form", classNames: [styles.form] });
  private fieldset = new BaseElement({
    tag: "fieldset",
    classNames: [styles.fieldset],
  });
  private legend = new BaseElement({ tag: "legend", text: "Authorization" });
  private loginContainer = new BaseElement({
    tag: "div",
    classNames: [styles["input-container"]],
  });
  private loginLabel = new BaseElement({
    tag: "label",
    classNames: [styles.label],
    text: "Login",
  });
  private passwordLabel = new BaseElement({
    tag: "label",
    classNames: [styles.label],
    text: "Password",
  });

  private passwordContainer = new BaseElement({
    tag: "div",
    classNames: [styles["input-container"]],
  });
  public loginInput = new Input({
    type: "text",
    classNames: [styles.input],
    attributes: { id: "name", placeholder: "Enter your name" },
  });

  public passwordInput = new Input({
    type: "password",
    classNames: [styles.input],
    attributes: { id: "password", placeholder: "Enter password" },
  });
  public submitButton = new Button({
    text: "Submit",
    attributes: { type: "submit" },
    callback: () => this.onSubmit(),
  });
  public infoButton = new Button({
    text: "Info",
    callback: () => {
      getRouter().navigate("/info");
    },
  });

  constructor(loginVM: LoginViewModel, formVM: FormViewModel) {
    super({
      tag: "main",
      classNames: [styles.main],
    });

    this.formVM = formVM;
    this.loginVM = loginVM;

    this.render();
    this.bind();
  }

  private render(): void {
    this.appendChildren(this.form);
    this.form.appendChildren(this.fieldset, this.submitButton, this.infoButton);
    this.fieldset.appendChildren(
      this.legend,
      this.loginContainer,
      this.passwordContainer
    );
    this.loginContainer.appendChildren(this.loginLabel, this.loginInput);
    this.passwordContainer.appendChildren(
      this.passwordLabel,
      this.passwordInput
    );
  }

  private bind() {
    this.formVM.isFormValid$.subscribe((isValid) => {
      this.submitButton.setDisabled?.(!isValid);
    });

    this.loginInput.observe((value) => {
      this.formVM.setLogin(value);
      this.loginInput.showErrors(this.formVM.getLoginErrors());
    });

    this.passwordInput.observe((value) => {
      this.formVM.setPassword(value);
      this.passwordInput.showErrors(this.formVM.getPasswordErrors());
    });
  }

  private async onSubmit() {
    await this.loginVM.submit(this.loginInput.value, this.passwordInput.value);
  }
}
