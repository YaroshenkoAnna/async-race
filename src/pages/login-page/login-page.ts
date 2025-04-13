import { BaseElement } from "../../utils/base-element";

class LoginPage extends BaseElement<"main"> {
  constructor() {
    super({
      tag: "main",
    });

    this.setText("Login page");
  }
}

export const loginPage = new LoginPage();
