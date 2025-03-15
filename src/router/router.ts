import { Route } from "../types/route";

export class Router {
  private notFoundCallback?: () => void;
  private defaultRoute: string = "/";
  private routes: Route[];
  constructor(routes: Route[]) {
    globalThis.addEventListener("hashchange", () => {
      this.loadRoute();
    });
    this.routes = routes;
  }
  public navigate(path: string): void {
    globalThis.location.hash = path;
    this.loadRoute();
  }

  public setNotFound(callback: () => void): void {
    this.notFoundCallback = callback;
  }

  private loadRoute(): void {
    const path = globalThis.location.hash.slice(1);
    if (!path) {
      this.navigate(this.defaultRoute);
      return;

      
    }

    const route = this.routes.find((route) => route.path === path);
    if (route) {
      route.page(this).then((page) => {
        document.body.removeChild(document.body.firstChild as Node);
        document.body.appendChild(page.node);
      });
    } else if (this.notFoundCallback) {
      this.notFoundCallback();
    }
  }
}
