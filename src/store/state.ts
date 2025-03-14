import { Observable } from "../utils/observable";
import type { OptionData } from "../types/index";
import {
  DEFAULT_ID,
  DEFAULT_TITLE,
  DEFAULT_WEIGHT,
} from "../constants/numbers";

export class OptionStore extends Observable<OptionData[]> {
  private idCounter: number = DEFAULT_ID;
  constructor(initialOptions: OptionData[] = []) {
    super(initialOptions);
  }

  public addOption(id?: string, title?: string, weight?: number): void {
    const newOption: OptionData = {
      id: id || `#${this.idCounter++}`,
      title: title ?? DEFAULT_TITLE,
      weight: weight ?? DEFAULT_WEIGHT,
    };
    this.update((options: OptionData[]): OptionData[] => {
      return [...options, newOption];
    });
  }

  public updateOption(
    id: string,
    updatedData: Partial<Omit<OptionData, "id">>,
  ): void {
    this.update((options) =>
      options.map((option) =>
        option.id === id ? { ...option, ...updatedData } : option,
      ),
    );
  }
  public removeOption(id: string): void {
    this.update((options) => options.filter((option) => option.id !== id));
  }

  public reset(): void {
    this.idCounter = DEFAULT_ID;
    this.set([]);
  }

  public load(options: OptionData[]): void {
    this.reset();
    options.map((option) => {
      this.addOption(option.id, option.title, option.weight);
    });
    this.idCounter = Number(options.at(-1)?.id.replace("#", "")) + 1;
  }
}
