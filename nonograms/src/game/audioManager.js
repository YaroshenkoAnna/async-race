export class SoundManager {
  constructor() {
    this.sounds = {
      click: new Audio("./audios/click.mp3"),
      win: new Audio("./audios/win.mp3"),
      cancel: new Audio("./audios/cancel.mp3"),
      cross: new Audio("./audios/cross.mp3"),
    };
    this.isMuted = false;
    this.currentSound = null;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.currentSound) {
      this.currentSound.pause();
      this.currentSound.currentTime = 0;
    }
  }

  async play(soundName) {
    if (!this.isMuted && this.sounds[soundName]) {
      if (this.currentSound) {
        try {
          await this.currentSound.pause();
          this.currentSound.currentTime = 0;
        } catch (error) {
          console.warn("", error.message);
        }
      }

      this.currentSound = this.sounds[soundName];
      this.currentSound.play().catch((error) => {
        if (error.name !== "AbortError") {
          console.error(`error: ${error.message}`);
        }
      });
    }
  }

  setVolume(volume) {
    Object.values(this.sounds).forEach((sound) => {
      sound.volume = volume;
    });
  }
}
