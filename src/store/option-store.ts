import { Observable } from "../utils/observable";
import type { OptionData } from "../types/index";
import { DEFAULT_ID } from "../constants/numbers";
import { Storage } from "./storage";

const STORAGE_KEY = "options";

class OptionStore extends Observable<OptionData[]> {
  private idCounter: number = DEFAULT_ID;

  constructor() {
    super(Storage.load("options") ?? []);

    const maxId = this.value.reduce(
      (max, item) => Math.max(max, item.id),
      DEFAULT_ID,
    );
    this.idCounter = maxId + 1;

    this.subscribe((options) => Storage.save(STORAGE_KEY, options));
  }

  public addOption(option: Omit<OptionData, "id">): void {
    const newOption: OptionData = { id: this.idCounter++, ...option };
    this.update((options) => [...options, newOption]);
  }

  public updateOption(
    id: number,
    updatedData: Partial<Omit<OptionData, "id">>,
  ): void {
    this.silentUpdate((options) =>
      options.map((option) =>
        option.id === id ? { ...option, ...updatedData } : option,
      ),
    );
    Storage.save(STORAGE_KEY, this.value);
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
}

export const optionStore = new OptionStore();
