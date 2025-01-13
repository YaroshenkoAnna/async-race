export const sounds = {
  lostSound: new Audio("./ou.mp3"),
  winSound: new Audio("./uhu.mp3"),
};

const setVolume = (volume) => {
  Object.values(sounds).forEach((sound) => {
    sound.volume = volume;
  });
};

setVolume(0.1);

export const playSound = (sound) => {
  sound.play();
};
