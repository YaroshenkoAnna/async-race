import type { BaseElement } from "../utils/base-element";
import type { Router } from "../router/router";

export interface Route<T extends BaseElement<"main"> = BaseElement<"main">> {
  path: string;
  page: (router: Router ) => Promise<T>;
}
