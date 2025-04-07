import type { BaseElement } from "../utils/base-element";
import { winners } from "../main";
import { garage } from "../main";
import type { Router } from "./router";

export interface Route<T extends BaseElement<"div"> = BaseElement<"div">> {
  path: string;
  page: (router: Router) => Promise<T>;
}

export const APP_ROUTES = [
  {
    path: "/garage",
    page: (): Promise<BaseElement<"div">> => Promise.resolve(garage),
  },
  {
    path: "/winners",
    page: (): Promise<BaseElement<"div">> => Promise.resolve(winners),
  },
] as const satisfies Route[];
