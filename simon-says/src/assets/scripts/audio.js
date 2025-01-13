export const sounds = {
  lostSound: new Audio("./src/assets/audio/ou.mp3"),
  winSound: new Audio("./src/assets/audio/uhu.mp3"),
};

const setVolume = (volume) => {
  Object.values(sounds).forEach((sound) => {
    sound.volume = volume;
  });
};

setVolume(0.2);

export const playSound = (sound) => {
  sound.play();
};
