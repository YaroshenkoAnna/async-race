import { Observable } from "../utils/observable";
import { Storage } from "./storage";

const URL_KEY = "lastUrl";
const SOUND_KEY = "soundEnabled";

class AppStore {
  public currentUrl = new Observable<string>(
    Storage.load<"lastUrl">(URL_KEY) || globalThis.location.hash || "#/",
  );
  public soundEnabled = new Observable<boolean>(
    Storage.load<"soundEnabled">(SOUND_KEY) ?? true,
  );

  constructor() {
    this.currentUrl.subscribe((url) => Storage.save(URL_KEY, url));

    this.soundEnabled.subscribe((enabled) => Storage.save(SOUND_KEY, enabled));
  }

  public setUrl(url: string): void {
    this.currentUrl.set(url);
    globalThis.location.hash = url;
  }

  public toggleSound(): void {
    this.soundEnabled.set(!this.soundEnabled.value);
  }
}

export const appStore = new AppStore();
