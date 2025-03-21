import styles from "./options-page.module.scss";
import buttonStyles from "../../components/button/button.module.scss";
import { BaseElement } from "../../utils/base-element";
import { Title } from "../../components/title/title";
import { Button } from "../../components/button/button";
import { Option } from "../../components/option/option";
import { ValidationErrorModal } from "../../components/modal/validation-error-modal";
import { OptionalInputModal } from "../../components/modal/optional-input-modal";
import { optionStore } from "../../store/option-store";
import { guard } from "./guard";
import { saveFile } from "../../utils/save-file";
import { loadFile } from "../../utils/load-file";
import type { OptionData } from "../../types";
import { Storage } from "../../store/storage";

export class OptionsPage extends BaseElement<"main"> {
  constructor() {
    super({ tag: "main", classNames: [styles.optionsPage] });

    const optionsList = new BaseElement<"ul">({
      tag: "ul",
      classNames: [styles.options],
    });

    const optionsCleared = Storage.load("optionsCleared");
    if (optionStore.value.length === 0 && !optionsCleared) {
      optionStore.addOption({ title: "" });
    }

    const storedOptions = optionStore.value;
    if (storedOptions.length > 0) {
      storedOptions.forEach((item) => {
        const option = new Option(item);
        optionsList.appendChildren(option);
      });
    }

    const addOptionButton = new Button({
      text: "Add Option",
      callback: (): void => {
        optionStore.addOption({ title: "" });
      },
      classNames: [buttonStyles["control-button"]],
    });

    this.sub(
      optionStore.subscribe((items) => {
        optionsList.deleteChildren();
        items.forEach((item) => {
          const option = new Option(item);
          optionsList.appendChildren(option);
        });
      }),
    );

    const pasteListButton = new Button({
      text: "Paste List",
      callback: (): void => {
        const modal = new OptionalInputModal();
        modal.open();
      },
      classNames: [buttonStyles["control-button"]],
    });

    const clearListButton = new Button({
      text: "Clear List",
      callback: (): void => {
        Storage.save("optionsCleared", true);
        optionsList.deleteChildren();
        optionStore.reset();
      },
      classNames: [buttonStyles["control-button"]],
    });

    const saveListButton = new Button({
      text: "Save List to File",
      callback: (): void => {
        const storedOptions = optionStore.value;
        saveFile(storedOptions, "options.json");
      },
      classNames: [buttonStyles["control-button"]],
    });

    const loadListButton = new Button({
      text: "Load List from File",
      callback: (): void => {
        loadFile<OptionData[]>((data) => {
          optionStore.set(data);
        });
      },
      classNames: [buttonStyles["control-button"]],
    });

    const startButton = new Button({
      text: "Start",
      callback: (): void => {
        if (guard(optionStore.value)) {
          globalThis.location.hash = "/wheel";
          this.unsubscribeAll();
        } else {
          const modal = new ValidationErrorModal();
          modal.open();
        }
      },
      classNames: [buttonStyles["control-button"]],
    });

    this.appendChildren(
      new Title(),
      optionsList,
      addOptionButton,
      pasteListButton,
      clearListButton,
      saveListButton,
      loadListButton,
      startButton,
    );
  }
}
