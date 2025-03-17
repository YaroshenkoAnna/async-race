import { Observable } from "../utils/observable";
import { Storage } from "./storage";

const SOUND_KEY = "soundEnabled";

class AppStore {
  public soundEnabled = new Observable<boolean>(
    Storage.load<"soundEnabled">(SOUND_KEY) ?? true,
  );

  constructor() {
    this.soundEnabled.subscribe((enabled) => Storage.save(SOUND_KEY, enabled));
  }

  public toggleSound(): void {
    this.soundEnabled.set(!this.soundEnabled.value);
  }
}

export const appStore = new AppStore();
