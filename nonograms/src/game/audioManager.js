export const SoundManager = {
  sounds: {
    click: new Audio("./audios/click.mp3"),
    win: new Audio("./audios/win.mp3"),
    cancel: new Audio("./audios/cancel.mp3"),
    cross: new Audio("./audios/cross.mp3"),
  },
  isMuted: false,
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      Object.values(this.sounds).forEach((sound) => {
        sound.pause();
        sound.currentTime = 0;
      });
    }
  },

  play(soundName) {
    if (!this.isMuted && this.sounds[soundName]) {
      const soundClone = this.sounds[soundName].cloneNode();

      soundClone
        .play()
        .catch((error) =>
          console.error(`Ошибка воспроизведения: ${error.message}`),
        );
    }
  },
};
