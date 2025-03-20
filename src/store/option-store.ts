import { Observable } from "../utils/observable";
import type { OptionData } from "../types/index";
import { DEFAULT_ID } from "../constants/numbers";
import { Storage } from "./storage";

const STORAGE_KEY = "options";

class OptionStore extends Observable<OptionData[]> {
  private idCounter: number = DEFAULT_ID;

  constructor() {
    super(Storage.load("options") ?? []);
    this.countId();
    this.subscribe((options) => Storage.save(STORAGE_KEY, options));
  }

  public addOption(option: Omit<OptionData, "id">): void {
    const newOption: OptionData = { id: this.countId(), ...option };
    this.idCounter++;
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

  public countId(): number {
    const maxId =
      this.value.length > 0
        ? this.value.reduce((max, item) => Math.max(max, item.id), DEFAULT_ID)
        : DEFAULT_ID - 1;
    this.idCounter = maxId + 1;
    return this.idCounter;
  }
}

export const optionStore = new OptionStore();
