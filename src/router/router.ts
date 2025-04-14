import type { Route } from "./routes";
import type { BaseElement } from "../utils/base-element";

export class Router {
  private routes: Route[];
  private outlet: BaseElement<"div">;
  private defaultRoute: string;
  private errorRoute: string;

  constructor(
    routes: Route[],
    outlet: BaseElement<"div">,
    defaultRoute: string,
    errorRoute: string
  ) {
    this.routes = routes;
    this.outlet = outlet;
    this.defaultRoute = defaultRoute;
    this.errorRoute = errorRoute;

    globalThis.addEventListener("hashchange", () => {
      void this.loadRoute();
    });

    if (globalThis.location.hash === "") {
      this.navigate(this.defaultRoute);
    } else {
      void this.loadRoute();
    }
  }

  private async loadRoute(): Promise<void> {
    const path = globalThis.location.hash.slice(1);

    const route =
      this.routes.find((route) => route.path === path) ||
      this.routes.find((route) => route.path === this.errorRoute);

    if (route) {
      const page = await route.page(this);

      this.outlet.node.replaceChildren(page.node);
    } else {
      console.error(`Route for path ${path} not found.`);
    }
  }

  private navigate(path: string): void {
    globalThis.location.hash = path;
  }
}
