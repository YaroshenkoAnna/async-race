import { Observable } from "../utils/observable";
import type { OptionData } from "../types/index";
import { DEFAULT_ID } from "../constants/numbers";

class OptionStore extends Observable<OptionData[]> {
  private idCounter: number = DEFAULT_ID;
  constructor(initialOptions: OptionData[] = []) {
    super(initialOptions);
  }

  public addOption(option: Omit<OptionData, "id">): void {
    const newOption: OptionData = {
      id: this.idCounter++,
      ...option,
    };
    this.update((options) => {
      return [...options, newOption];
    });
  }

  public updateOption(
    id: number,
    updatedData: Partial<Omit<OptionData, "id">>
  ): void {
    this.update((options) =>
      options.map((option) =>
        option.id === id ? { ...option, ...updatedData } : option
      )
    );
  }
  public removeOption(id: number): void {
    this.update((options) => options.filter((option) => option.id !== id));
    if (this.value.length === 0) {
      this.idCounter = DEFAULT_ID;
    }
  }

  public reset(): void {
    this.idCounter = DEFAULT_ID;
    this.set([]);
  }

  /* public load(options: OptionData[]): void {
    this.reset();
    options.map(() => {
      this.addOption();
    });
    this.idCounter = Number(options.at(-1)?.id) + 1;
  } */
}

export const optionStore = new OptionStore();
