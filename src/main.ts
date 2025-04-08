import { Navigation } from "./components/navigation/navigation";
import { GaragePage } from "./pages/garage-page";
import { Winners } from "./pages/winners-page";
import "./style.scss";
import { BaseElement } from "./utils/base-element";
import { GarageStore } from "./store/garage-store";
import { Router } from "./router/router";
import { APP_ROUTES } from "./router/routes";
import { NotFoundPage } from "./pages/not-found-page";

const root = new BaseElement({ tag: "div" });
const content = new BaseElement({ tag: "div" });

document.body.append(root.node);
const store = new GarageStore();

export const garage = new GaragePage(store, content);
export const winners = new Winners(store);
export const notFoundPage = new NotFoundPage();

const navigation = new Navigation();
root.appendChildren(navigation, content);

new Router(APP_ROUTES, content);
