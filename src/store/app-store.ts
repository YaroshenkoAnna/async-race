import { Observable } from "../utils/observable";
import { Storage } from "./storage";

const SOUND_KEY = "soundDisabled";

class AppStore {
  public soundDisabled = new Observable<boolean>(
    Storage.load<"soundDisabled">(SOUND_KEY) ?? true,
  );

  private sounds: HTMLAudioElement[] = [];

  constructor() {
    this.soundDisabled.subscribe((disabled) => {
      Storage.save(SOUND_KEY, disabled);
      this.handleSoundState(disabled);
    });

    this.handleSoundState(this.soundDisabled.value);
  }

  public toggleSound(): void {
    this.soundDisabled.set(!this.soundDisabled.value);
  }

  public registerSound(audio: HTMLAudioElement): void {
    this.sounds.push(audio);
    audio.muted = this.soundDisabled.value;
  }

  private handleSoundState(disabled: boolean): void {
    this.sounds.forEach((audio) => {
      audio.muted = disabled;
      audio.volume = disabled ? 0 : 1;
    });
  }
}

export const appStore = new AppStore();
