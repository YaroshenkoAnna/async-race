export function getRandomElements(arr, number = arr.length) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, number);
}
