import type { Route } from "../types/route";
import type { BaseElement } from "../utils/base-element";

export const APP_ROUTES = [
  {
    path: "/",
    page: (): Promise<BaseElement<"main">> =>
      import("../pages/options/options-page").then((m) => new m.OptionsPage()),
  },
  {
    path: "/wheel",
    page: (): Promise<BaseElement<"main">> =>
      import("../pages/wheel/wheel-page").then((m) => new m.WheelPage()),
  },
  {
    path: "404",
    page: (): Promise<BaseElement<"main">> =>
      import("../pages/not-found/not-found-page").then(
        (m) => new m.NotFoundPage(),
      ),
  },
] as const satisfies Route[];
