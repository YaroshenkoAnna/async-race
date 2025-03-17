import type { Route } from "../types/route";

export class Router {
  private defaultRoute: string = "/";
  private routes: Route[];
  private outlet: HTMLElement;
  constructor(routes: Route[], outlet: HTMLElement) {
    globalThis.addEventListener("hashchange", () => {
      this.loadRoute();
    });
    this.routes = routes;
    this.outlet = outlet;
  }
  public navigate(path: string): void {
    globalThis.location.hash = path;
    this.loadRoute();
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
      while (this.outlet.firstChild) {
        this.outlet.removeChild(this.outlet.firstChild);
      }
      route
        .page(this)
        .then((page) => {
          this.outlet.append(page.node);
        })
        .catch((error) => {
          console.error("Failed to load route page:", error);
        });
    }
  }
}
