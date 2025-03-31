import { Navigation } from "./components/navigation/navigation";
import { GaragePage } from "./pages/garage-page";
import { Winners } from "./pages/winners-page";
import "./style.scss";
import { BaseElement } from "./utils/base-element";

const container = new BaseElement({ tag: "div" });
document.body.append(container.node);

const garage = new GaragePage();
const winners = new Winners();
const navigation = new Navigation(container, garage, winners);

container.appendChildren(navigation, garage);
