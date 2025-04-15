import type { Route } from "./types";
import { userStore } from "../stores/user-store";
import type { PageFactory } from "../factories/page-factory";
import type { Router } from "./router";
import { BaseElement } from "../utils/base-element";

export function createAppRoutes(factory: PageFactory): Route[] {
  return [
    {
      path: "/login",
      page: async (router: Router) => {
        if (userStore.isAuthenticated) {
          router.navigate("/main", true);
          return new BaseElement({ tag: "main" });
        }

        return factory.createLoginPage(router);
      },
    },
    {
      path: "/main",
      page: async (router: Router) => {
        if (!userStore.isAuthenticated) {
          router.navigate("/login", true);
          return new BaseElement({ tag: "main" });
        }

        return factory.createMainPage();
      },
    },
    {
      path: "/info",
      page: () => Promise.resolve(factory.createInfoPage()),
    },
    {
      path: "/error",
      page: () => Promise.resolve(factory.createErrorPage()),
    },
  ];
}
