import styles from "./modal.module.scss";
import { BaseElement } from "../../utils/base-element";
import { Modal } from "./modal";
import { Button } from "../button/button";
import { PLACEHOLDER_SAMPLE_CODE } from "../../constants/texts";
import { parseInputToArray } from "../../utils/parsing";
import { filterValidOptions } from "../../utils/filter-valid-options";
import type { ParsedOptions } from "../../types/index";
import { generateOptions } from "../../utils/generate-options";

export class OptionalInputModal extends Modal {
  private parent: BaseElement<"ul">;
  constructor(parent: BaseElement<"ul">) {
    super();
    this.renderContent();
    this.parent = parent;
  }

  private renderContent(): void {
    const form = new BaseElement<"form">({
      tag: "form",
      classNames: [styles.form],
    });
    const container = this.render();
    container.appendChildren(form);
    const textArea = new BaseElement<"textarea">({
      tag: "textarea",
      classNames: [styles.textarea],
      attributes: {
        rows: "12",
        cols: "64",
        name: "table",
        placeholder: PLACEHOLDER_SAMPLE_CODE,
      },
    });

    const buttonsContainer = new BaseElement<"div">({
      tag: "div",
      classNames: [styles["buttons-container"]],
    });

    const cancelButton = new Button({
      text: "Cancel",
      callback: (event: Event): void => {
        event.preventDefault();
        this.close();
      },
      classNames: [styles["modal-button"]],
    });

    const confirmButton = new Button({
      text: "Confirm",
      callback: (event): void => {
        this.onConfirm(event, textArea.node.value);
      },
      classNames: [styles["modal-button"]],
    });

    buttonsContainer.appendChildren(cancelButton, confirmButton);
    form.appendChildren(textArea, buttonsContainer);
  }

  private onConfirm(event: Event, inputText: string): void {
    event.preventDefault();
    this.close();
    const parsedArray: string[] = parseInputToArray(inputText);
    if (parsedArray.length === 0) return;
    const validOptions: ParsedOptions[] | [] = filterValidOptions(parsedArray);
    console.log(validOptions);
    if (validOptions.length === 0) return;
    generateOptions(this.parent, validOptions);
  }
}
