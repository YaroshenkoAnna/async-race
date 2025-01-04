import styles from "./main.module.css";
import { BaseElement } from "../common/baseElement.js";
import { Keyboard } from "../keyboard/keyboard.js";

export const Main = new BaseElement("main", [styles.main]);
Main.appendChildren(Keyboard);
