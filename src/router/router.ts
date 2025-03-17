import type { Route } from "../types/route";
import type { BaseElement } from "../utils/base-element";

export class Router {
  private defaultRoute: string = "/";
  private routes: Route[];
  private outlet: BaseElement<"div">;
  private navigate: (path: string) => void;
  constructor(routes: Route[], outlet: BaseElement<"div">) {
    this.navigate = (path: string): void => {
      globalThis.location.hash = path;
    };
    globalThis.addEventListener("hashchange", () => {
      this.loadRoute();
    });
    this.routes = routes;
    this.outlet = outlet;

    if (globalThis.location.hash === "") {
      this.navigate(this.defaultRoute);
    } else {
      this.loadRoute();
    }
  }

  private loadRoute(): void {
    const path = globalThis.location.hash.slice(1);

    if (!path) {
      this.navigate(this.defaultRoute);
      return;
    }
    const route =
      this.routes.find((route) => route.path === path) ||
      this.routes.find((route) => route.path === "404");

    if (route) {
      this.outlet.deleteChildren();

      route
        .page(this)
        .then((page) => {
          this.outlet.appendChildren(page);
        })
        .catch((error) => {
          console.error("Failed to load route page:", error);
        });
    }
  }
}
