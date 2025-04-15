import { Observable } from "../core/observable";
import { FormValidator } from "../validation/form-validator";

export class FormViewModel {
  private login$ = new Observable<string>("");
  private password$ = new Observable<string>("");
  public isFormValid$ = new Observable<boolean>(false);

  private validator = new FormValidator();

  constructor() {
    this.login$.subscribe(() => this.validate());
    this.password$.subscribe(() => this.validate());
  }

  public setLogin(value: string) {
    this.login$.set(value);
  }

  public setPassword(value: string) {
    this.password$.set(value);
  }

  public getLoginErrors() {
    this.validator.validateLogin(this.login$.value);
    return this.validator.loginErrors;
  }

  public getPasswordErrors() {
    this.validator.validatePassword(this.password$.value);
    return this.validator.passwordErrors;
  }

  private validate() {
    console.log("Validating form...");
    const isValid = this.validator.validateForm(
      this.login$.value,
      this.password$.value
    );
    this.isFormValid$.set(isValid);
  }
}
