const COLOR_MAX_VALUE = 16_777_215;

export const getRandomColor = () =>
  `#${Math.floor(Math.random() * COLOR_MAX_VALUE).toString(16)}`;
