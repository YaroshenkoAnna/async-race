import { Navigation } from "./components/navigation/navigation";
import { GaragePage } from "./pages/garage-page";
import { Winners } from "./pages/winners-page";
import "./style.scss";
import { BaseElement } from "./utils/base-element";
import { GarageStore } from "./store/garage-store";
import { Router } from "./router/router";
import { APP_ROUTES } from "./router/routes";

const root = new BaseElement({ tag: "div" });
const content = new BaseElement({ tag: "div" });

document.body.append(root.node);

export const garage = new GaragePage(new GarageStore(), content);
export const winners = new Winners(new GarageStore());
const navigation = new Navigation(content, garage, winners);
root.appendChildren(navigation, content);

new Router(APP_ROUTES, content);
