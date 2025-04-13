
import type { Route } from "./routes";
import type { BaseElement } from "../utils/base-element";

export class Router {
  private defaultRoute: string = "/garage";
  private routes: Route[];
  private outlet: BaseElement<"div">;

  constructor(routes: Route[], outlet: BaseElement<"div">) {
    this.routes = routes;
    this.outlet = outlet;

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

    const route = this.routes.find((route) => route.path === path);

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