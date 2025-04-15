import { LoginPage } from "../pages/login-page/login-page";
import { MainPage } from "../pages/main-page/main-page";
import { InfoPage } from "../pages/info-page/info-page";
import { ErrorPage } from "../pages/error-page/error-page";

import { LoginViewModel } from "../view-model/login-view-model";
import { FormViewModel } from "../view-model/form-view-model";
import { AuthService } from "../services/auth-service";
import { Router } from "../router/router";
import { SocketClient } from "../network/socket-client";
import { DEFAULT_ROUTE } from "../router/constants";

export class PageFactory {
  private formVM = new FormViewModel();
  private socket = new SocketClient();
  private authService = new AuthService(this.socket);

  public createLoginPage(router: Router) {
    const vm = new LoginViewModel(this.authService);
    vm.setRouter(router);
    return new LoginPage(vm, this.formVM);
  }

  public createMainPage() {
    return new MainPage();
  }

  public createInfoPage() {
    return new InfoPage(DEFAULT_ROUTE);
  }

  public createErrorPage() {
    return new ErrorPage();
  }

  public getSocket() {
    return this.socket;
  }
}
