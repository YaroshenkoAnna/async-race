import styles from "./main.module.css";
import { BaseElement } from "../elements/baseElement.js";
import { Keyboard } from "../keyboard/keyboard.js";
import { Info } from "../utilits/utilits.js";
import { GameButtons } from "../utilits/utilits.js";

export const Main = new BaseElement("main", [styles.main]);
Main.appendChildren(Info, Keyboard, GameButtons);
