import styles from "./header.module.css";
import { BaseElement } from "../common/baseElement.js";

export const Header = new BaseElement("header");

const H1 = new BaseElement("h1", [styles.title], {}, "Simon says");
Header.appendChildren(H1);
