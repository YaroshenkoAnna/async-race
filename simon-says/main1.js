import { BaseElement } from "./src/components/elements/baseElement.js";
import styles from "./src/assets/styles/components/basic.module.css";
import {
  InfoPanel,
  GameButtons,
} from "./src/assets/scripts/statusAndControls.js";

const Header = new BaseElement("header");

const H1 = new BaseElement("h1", [styles.title], {}, "Simon says");
Header.appendChildren(H1);

const Main = new BaseElement("main", [styles.main]);
Main.appendChildren(InfoPanel, GameButtons);

const Wrapper = new BaseElement("div", [styles.wrapper]);
Wrapper.appendChildren(Header, Main);

document.body.appendChild(Wrapper._elem);
