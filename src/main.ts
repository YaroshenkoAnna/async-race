import { BaseElement } from "./utils/base-element";
import { Footer } from "./components/footer/footer";
import { ConnectionOverlay } from "./components/connection-overlay/connection-overlay";
import { LoginPage } from "./pages/login-page/login-page";
import { MainPage } from "./pages/main-page/main-page";
import { InfoPage } from "./pages/info-page/info-page";
import { ErrorPage } from "./pages/error-page/error-page";
import { SocketClient } from "./network/socket-client";
import { AuthService } from "./services/auth-service";
import { FormViewModel } from "./view-model/form-view-model";
import { LoginViewModel } from "./view-model/login-view-model";
import { initRouter } from "./router/router";
import { DEFAULT_ROUTE, ERROR_ROUTE } from "./router/constants";
import type { Route } from "./router/types";
import { userStore } from "./stores/user-store";
import styles from "./styles.module.scss";
import { UserService } from "./services/user-service";

const container = new BaseElement({
  tag: "div",
  classNames: [styles.container],
});
document.body.append(container.node, new Footer().node);

const socket = new SocketClient();
const authService = new AuthService(socket);
const formVM = new FormViewModel();
const loginVM = new LoginViewModel(authService);

const routes: Route[] = [
  {
    path: "/login",
    page: async (router) => {
      if (userStore.isAuthenticated) {
        router.navigate("/main", true);
        return new MainPage(userStore);
      }
      loginVM.setRouter(router);
      return new LoginPage(loginVM, formVM);
    },
  },
  {
    path: "/main",
    page: async (router) => {
      if (!userStore.isAuthenticated) {
        router.navigate("/login", true);
        return new LoginPage(loginVM, formVM);
      }
      return await new MainPage(userStore);
    },
  },
  {
    path: "/info",
    page: () => Promise.resolve(new InfoPage(DEFAULT_ROUTE)),
  },
  {
    path: "/error",
    page: () => Promise.resolve(new ErrorPage()),
  },
];

initRouter(routes, container, DEFAULT_ROUTE, ERROR_ROUTE);

let overlay: ConnectionOverlay | null = null;

socket.isConnected$.subscribeAndGet((isConnected) => {
  if (!isConnected && !overlay) {
    overlay = new ConnectionOverlay();
    document.body.append(overlay.node);
  } else if (isConnected && overlay) {
    overlay.deleteElement();
    overlay = null;
    const userService = new UserService(socket);
  }
});
