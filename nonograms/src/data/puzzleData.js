import { nanogramMatrices } from "./nanogramMatrices.js";

export const puzzleData = [];

for (const name in nanogramMatrices) {
  const size = nanogramMatrices[name].length;
  const puzzle = {
    name: name,
    solution: nanogramMatrices[name],
    size: size,
    difficulty: size === 5 ? "easy" : size === 10 ? "medium" : "hard",
  };

  puzzleData.push(puzzle);
}

puzzleData.sort((a, b) => {
  const difficulties = { easy: 1, medium: 2, hard: 3 };
  if (difficulties[a.difficulty] !== difficulties[b.difficulty])
    return difficulties[a.difficulty] - difficulties[b.difficulty];
  return a.name > b.name ? 1 : -1;
});
