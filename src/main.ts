import { Navigation } from "./components/navigation/navigation";
import { GaragePage } from "./pages/garage-page";
import { Winners } from "./pages/winners-page";
import "./style.scss";
import { BaseElement } from "./utils/base-element";
import { GarageStore } from "./store/garage-store";

const container = new BaseElement({ tag: "div" });
document.body.append(container.node);
const garageStore = new GarageStore();
const garage = new GaragePage(garageStore);
const winners = new Winners(garageStore);
const navigation = new Navigation(container, garage, winners);

container.appendChildren(navigation, garage);
