import styles from "./options-page.module.scss";
import buttonStyles from "../../components/button/button.module.scss";
import { BaseElement } from "../../utils/base-element";
import { title } from "../../components/title/title";
import { Button } from "../../components/button/button";
import { counter } from "../../utils/counter";
import { Option } from "../../components/option/option";
//import { ValidationErrorModal } from "../../components/modal/validation-error-modal";
import { OptionalInputModal } from "../../components/modal/optional-input-modal";
import { optionStore } from "../../store/option-store";

export class OptionsPage extends BaseElement<"main"> {
  constructor() {
    super({ tag: "main", classNames: [styles.optionsPage] });

    const optionsList = new BaseElement<"ul">({
      tag: "ul",
      classNames: [styles.options],
    });

    this.sub(
      optionStore.subscribe((items) => {
        console.log("Options updated:", items);
        optionsList.deleteChildren();
        items.forEach((item) => {
          const option = new Option(item);
          optionsList.appendChildren(option);
        });
      }),
    );

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
        optionStore.addOption({ title: "", weight: 0 });
      },
      classNames: [buttonStyles["control-button"]],
    });

    this.sub(
      optionStore.subscribe((items) => {
        console.log(items);
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
        optionsList.deleteChildren();
        counter.reset();
        optionStore.reset();
      },
      classNames: [buttonStyles["control-button"]],
    });

    const saveListButton = new Button({
      text: "Save List to File",
      callback: (): void => {},
      classNames: [buttonStyles["control-button"]],
    });

    const loadListButton = new Button({
      text: "Load List from File",
      callback: (): void => {},
      classNames: [buttonStyles["control-button"]],
    });

    const startButton = new Button({
      text: "Start",
      callback: (): void => {
        // const modal = new ValidationErrorModal();
        globalThis.location.hash = "/wheel";
        this.unsubscribeAll();
        // modal.open();
      },
      classNames: [buttonStyles["control-button"]],
    });

    this.appendChildren(
      title,
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
