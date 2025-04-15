export class FormValidator {
  public passwordErrors: string[] = [];
  public loginErrors: string[] = [];

  public validateForm(login: string, password: string): boolean {
    return this.validateLogin(login) && this.validatePassword(password);
  }

  public validatePassword(password: string): boolean {
    this.passwordErrors = [];
    const minPasswordLength = 8;
    const maxPasswordLength = 20;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    const rules = [
      {
        condition: password.length < minPasswordLength,
        message: `Password must be at least ${minPasswordLength} characters.`,
      },
      {
        condition: password.length > maxPasswordLength,
        message: `Password must be no more than ${maxPasswordLength} characters.`,
      },
      {
        condition: !hasLowerCase || !hasUpperCase || !hasNumber,
        message:
          "Password must contain at least one uppercase, one lowercase letter  and one number.",
      },
    ];

    for (const rule of rules) {
      if (rule.condition) {
        this.passwordErrors.push(rule.message);
      }
    }

    return this.passwordErrors.length === 0;
  }

  public validateLogin(login: string): boolean {
    this.loginErrors = [];
    const minLoginLength = 4;
    const maxLoginLength = 15;

    if (login.length < minLoginLength) {
      this.loginErrors.push(
        `Login must be at least ${minLoginLength} characters.`
      );
    }

    if (login.length > maxLoginLength) {
      this.loginErrors.push(
        `Login must be no more than ${maxLoginLength} characters.`
      );
    }

    return this.loginErrors.length === 0;
  }
}
