import styles from "./wrapper.module.css";
import { BaseElement } from "../common/baseElement.js";
import { Header } from "../header/header.js";
import { Main } from "../main/main.js";

export const Wrapper = new BaseElement("div", [styles.wrapper]);

Wrapper.appendChildren(Header, Main);
