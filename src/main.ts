import { Navigation } from "./components/navigation/navigation";
import { GaragePage } from "./pages/garage-page";
import { Winners } from "./pages/winners-page";
import "./style.scss";
import { BaseElement } from "./utils/base-element";
import { GarageStore } from "./store/garage-store";

const container = new BaseElement({ tag: "div" });
document.body.append(container.node);
const garage = new GaragePage(new GarageStore(), container);
const winners = new Winners(new GarageStore());
const navigation = new Navigation(container, garage, winners);

container.appendChildren(navigation, garage);
