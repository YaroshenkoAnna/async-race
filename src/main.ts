import { GaragePage } from "./pages/garage-page";
import "./style.scss";
import { BaseElement } from "./utils/base-element";

const container = new BaseElement({ tag: "div" });
document.body.append(container.node);

new GaragePage(container);
