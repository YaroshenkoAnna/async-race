import { BaseElement } from "./baseElement.js";
import styles from "../styles/components/basic.module.css";
import { InfoPanel, GameButtons } from "./statusAndControls.js";
import { ModalContainer } from "./modal.js";

const Header = new BaseElement("header");

const H1 = new BaseElement("h1", [styles.title], {}, "Simon says");
Header.appendChildren(H1);

export const Main = new BaseElement("main", [styles.main]);
Main.appendChildren(InfoPanel, GameButtons);

export const Wrapper = new BaseElement("div", [styles.wrapper]);
Wrapper.appendChildren(ModalContainer, Header, Main);
