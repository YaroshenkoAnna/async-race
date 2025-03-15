import type { Route } from "../types/route";

export const APP_ROUTES = [
  {
    path: "/",
    page: (router) =>
      import("../pages/options/options-page").then(
        (m) => new m.OptionsPage(router)
      ),
  },
  {
    path: "/wheel",
    page: () =>
      import("../pages/wheel/wheel-page").then((m) => new m.WheelPage()),
  },
] as const satisfies Route[];
