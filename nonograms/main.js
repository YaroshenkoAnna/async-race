import { BaseElement } from "./src/components/baseElement.js";
import { LevelSelector } from "./src/components/levelSelector.js";
import { puzzleData } from "./src/data/puzzleData.js";
const parent = document.body;

const selectors = new BaseElement({ tag: "div" });
parent.appendChild(selectors.getNode());
const difficultySelector = new LevelSelector(puzzleData, "difficulty", () => {
  selectors.replaceChild(generateGameSelector());
});
selectors.append(difficultySelector, generateGameSelector());

function generateGameSelector() {
  const currentDifficultyData =
    difficultySelector.createFilterData()[
      difficultySelector.getCurrentValueIndex()
    ];
  return new LevelSelector(currentDifficultyData, "name");
}
