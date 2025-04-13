import { errorPage } from "../pages/error-page/error-page";
import { infoPage } from "../pages/info-page/info-page";
import { loginPage } from "../pages/login-page/login-page";
import { mainPage } from "../pages/main-page/main-page";
import type { BaseElement } from "../utils/base-element";
import type { Router } from "./router";

export interface Route<T extends BaseElement<"main"> = BaseElement<"main">> {
  path: string;
  page: (router: Router) => Promise<T>;
}

export const APP_ROUTES = [
  {
    path: "/info",
    page: (): Promise<BaseElement<"main">> => Promise.resolve(infoPage),
  },
  {
    path: "/login",
    page: (): Promise<BaseElement<"main">> => Promise.resolve(loginPage),
  },
  {
    path: "/main",
    page: (): Promise<BaseElement<"main">> => Promise.resolve(mainPage),
  },
  {
    path: "/error",
    page: (): Promise<BaseElement<"main">> => Promise.resolve(errorPage),
  },
] as const satisfies Route[];
