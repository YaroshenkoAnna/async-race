import { BaseElement } from "./utils/base-element";
import { Router } from "./router/router";
import { APP_ROUTES } from "./router/routes";
import styles from "./styles.module.scss";
import { InfoPage } from "./pages/info-page/info-page";
import { ErrorPage } from "./pages/error-page/error-page";
import { MainPage } from "./pages/main-page/main-page";
import { LoginPage } from "./pages/login-page/login-page";

const container = new BaseElement({
  tag: "div",
  classNames: [styles.container],
});
document.body.appendChild(container.node);

const defaultRoute = "/login";
const errorRoute = "/error";

export const infoPage = new InfoPage(defaultRoute);
export const errorPage = new ErrorPage();
export const mainPage = new MainPage();
export const loginPage = new LoginPage();

const router = new Router(APP_ROUTES, container, defaultRoute, errorRoute);