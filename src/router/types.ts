import { BaseElement } from "../utils/base-element";
import type { Router } from "./router";

export interface Route<T extends BaseElement<"main"> = BaseElement<"main">> {
  path: string;
  page: (router: Router) => Promise<T>;
}

