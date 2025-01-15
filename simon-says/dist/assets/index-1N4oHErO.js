true&&(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
}());

class BaseElement {
  constructor(tag, classes = [], attributes = {}, text = "", isSVG = false) {
    const namespace = "http://www.w3.org/2000/svg";
    this._elem = isSVG
      ? document.createElementNS(namespace, tag)
      : document.createElement(tag);
    this.addClasses(classes);
    this.setAttributes(attributes);
    if (text) {
      this._elem.textContent = text;
    }
  }

  addClasses(classes) {
    this._elem.classList.add(...classes);
  }

  removeClasses(removedClass) {
    this._elem.classList.remove(...removedClass);
  }

  toggleClass(toggledClass) {
    this._elem.classList.toggle(toggledClass);
  }

  setText(text) {
    this._elem.textContent = text;
  }

  getText() {
    return this._elem.textContent;
  }

  setAttributes(atr) {
    Object.entries(atr).forEach(([key, val]) =>
      this._elem.setAttribute(key, val)
    );
  }

  getAttribute(atr) {
    return this._elem.getAttribute(atr);
  }

  addEventListener(event, callback) {
    this._elem.addEventListener(event, callback);
  }

  removeEventListener(event, callback) {
    this._elem.removeEventListener(event, callback);
  }

  appendChildren(...children) {
    children.forEach((child) => {
      this._elem.appendChild(child._elem);
    });
  }

  children() {
    return this._elem.children;
  }

  disabled() {
    this._elem.disabled = true;
  }

  undisabled() {
    this._elem.disabled = false;
  }
}

const wrapper = "_wrapper_1d2cn_1";
const title = "_title_1d2cn_15";
const main = "_main_1d2cn_27";
const styles$3 = {
	wrapper: wrapper,
	title: title,
	main: main
};

const container$1 = "_container_o151b_1";
const gameButtons = "_gameButtons_o151b_9";
const button$1 = "_button_o151b_13";
const input = "_input_o151b_31";
const info = "_info_o151b_46";
const icon = "_icon_o151b_50";
const difficulty = "_difficulty_o151b_58";
const blocked = "_blocked_o151b_71";
const wrong$1 = "_wrong_o151b_76";
const hidden$1 = "_hidden_o151b_101";
const active$1 = "_active_o151b_105";
const inactive = "_inactive_o151b_111";
const styles$2 = {
	container: container$1,
	gameButtons: gameButtons,
	button: button$1,
	input: input,
	info: info,
	icon: icon,
	difficulty: difficulty,
	blocked: blocked,
	wrong: wrong$1,
	hidden: hidden$1,
	active: active$1,
	inactive: inactive
};

const keyboard = "_keyboard_1gasj_1";
const easy$1 = "_easy_1gasj_14";
const medium$1 = "_medium_1gasj_18";
const hard$1 = "_hard_1gasj_22";
const button = "_button_1gasj_26";
const active = "_active_1gasj_67";
const wrong = "_wrong_1gasj_76";
const styles$1 = {
	keyboard: keyboard,
	easy: easy$1,
	medium: medium$1,
	hard: hard$1,
	button: button,
	active: active,
	wrong: wrong
};

const easy = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const medium = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const hard = easy.concat(medium);

const virtualKeyboardData = { easy, medium, hard };

const container = "_container_bce8f_1";
const hidden = "_hidden_bce8f_14";
const modal = "_modal_bce8f_18";
const styles = {
	container: container,
	hidden: hidden,
	modal: modal
};

const ModalContainer = new BaseElement("div", [
  styles.container,
  styles.hidden,
]);

const Modal = new BaseElement(
  "div",
  [styles.modal],
  {},
  "Congratulations! You have completed all levels!"
);
ModalContainer.appendChildren(Modal);
const ModalButton = new BaseElement(
  "button",
  [styles$2.button],
  {},
  "Close"
);
ModalButton.addEventListener("click", closeModal);
Modal.appendChildren(ModalButton);

function showModal() {
  ModalContainer.removeClasses([styles.hidden]);
}

function closeModal() {
  ModalContainer.addClasses([styles.hidden]);
}

const sounds = {
  lostSound: new Audio("./ou.mp3"),
  winSound: new Audio("./uhu.mp3"),
};

const setVolume = (volume) => {
  Object.values(sounds).forEach((sound) => {
    sound.volume = volume;
  });
};

setVolume(0.1);

const playSound = (sound) => {
  sound.play();
};

class Game {
  constructor() {
    this.difficulty = "easy";
    this.keyboardMap;
    this.sequence = [];
    this.isInputBlocked = true;
    this.keyboard;
    this.clickCounter = 0;
    this.enteredSymbols = "";
    this.round = 0;
    this.repeat = 0;
    this.isKeyPressed = false;
    this.activeButton = null;
    this.activeInputType = null;
  }

  setDifficulty(difficulty) {
    this.difficulty = difficulty;
  }

  setKeyboardMap(keyboardMap) {
    this.keyboardMap = keyboardMap;
  }

  initGame() {
    this.round = 1;
    RoundIndicator.setText(`Round: ${game.round}`);
    this.playSequence(this.generateSequence(2));
  }

  generateSequence(length) {
    this.repeat = 0;
    this.sequence = [];
    let maxNumber = this.keyboardMap.values.length;
    for (let i = 0; i < length; i++) {
      const randomNumber = getRandomInt(0, maxNumber);
      if (i > 0 && this.sequence[i - 1] === randomNumber) {
        i--;
      } else {
        this.sequence.push(randomNumber);
      }
    }
    return this.sequence;
  }

  playSequence(sequence) {
    InputDisplay.removeClasses([styles$2.wrong]);
    InputDisplay.setText("");
    this.clickCounter = 0;
    this.enteredSymbols = "";
    this.blockClicks();
    this.isInputBlocked = true;
    setTimeout(() => {
      sequence.forEach((num, index) => {
        setTimeout(() => {
          this.keyboardMap.keys[num].addClasses([styles$1.active]);
          setTimeout(() => {
            this.keyboardMap.keys[num].removeClasses([styles$1.active]);
          }, 600);
        }, index * 800);
      });
    }, 1500);
    const totalDuration = sequence.length * 800 + 1500;
    setTimeout(() => {
      this.unblockClicks();
      this.keyboard.removeClasses([styles$2.inactive]);
      this.isInputBlocked = false;
    }, totalDuration);
    console.log(sequence.map((n) => this.keyboardMap.values[n]));
  }

  repeatSequence() {
    if (this.repeat == 1) return;
    this.playSequence(this.sequence);
    this.repeat++;
  }

  blockClicks() {
    document.body.classList.add(styles$2.inactive);
  }

  unblockClicks() {
    document.body.classList.remove(styles$2.inactive);
  }

  checkSequence(event) {
    const isKeyboardEvent = event.type === "keydown" || event.type === "keyup";
    const isMouseEvent = event.type === "mousedown" || event.type === "mouseup";

    function isSymbolsInvalid() {
      if (
        (isKeyboardEvent && event.type === "keydown") ||
        (isKeyboardEvent && event.type === "keyup")
      ) {
        const key = event.code;
        if (!/^(Key[A-Z]|Digit[0-9])$/.test(key)) return true;
      }
    }
    if (
      this.isInputBlocked ||
      this.isKeyPressed ||
      isSymbolsInvalid() ||
      (this.activeInputType &&
        ((this.activeInputType === "keyboard" && isMouseEvent) ||
          (this.activeInputType === "mouse" && isKeyboardEvent)))
    ) {
      return;
    } else {
      this.activeInputType = isKeyboardEvent ? "keyboard" : "mouse";
      const regex = /(?<=Key|Digit)\w+/;
      let currentButton =
        this.keyboardMap.keys[this.sequence[this.clickCounter]];

      if (
        (isMouseEvent && event.type === "mousedown") ||
        (isKeyboardEvent &&
          this.keyboardMap.values.includes(event.code.match(regex)[0]))
      ) {
        this.isKeyPressed = true;
        this.clickCounter++;
        const symbol = isKeyboardEvent
          ? event.code.match(regex)[0]
          : event.target.textContent;
        this.enteredSymbols += symbol;
        InputDisplay.setText(this.enteredSymbols);

        const clickedButton = isMouseEvent
          ? event.target
          : document.getElementById(event.code.match(regex)[0]);
        clickedButton.classList.add(styles$1.active);
        if (
          symbol == currentButton.getText() &&
          this.clickCounter === this.sequence.length &&
          this.round === 5
        ) {
          clickedButton.classList.remove(styles$1.active);
        }

        const releaseHandler = (releaseEvent) => {
          const releaseType = releaseEvent.type;
          const isCorrectEvent =
            (isKeyboardEvent &&
              releaseType === "keyup" &&
              releaseEvent.code === event.code) ||
            (isMouseEvent && releaseType === "mouseup");

          if (isCorrectEvent) {
            this.activeInputType = null;
            clickedButton.classList.remove(styles$1.active);
            document.removeEventListener("mouseup", releaseHandler);
            releaseEvent.target.removeEventListener(
              releaseType,
              releaseHandler
            );
            this.isKeyPressed = false;
          }
        };

        if (isKeyboardEvent) {
          if (this.currentReleaseHandler) {
            window.removeEventListener("keyup", this.currentReleaseHandler);
          }
          this.currentReleaseHandler = releaseHandler.bind(this);
          window.addEventListener("keyup", this.currentReleaseHandler);
        } else if (isMouseEvent) {
          if (this.currentReleaseHandler) {
            document.removeEventListener("mouseup", this.currentReleaseHandler);
          }
          this.currentReleaseHandler = releaseHandler.bind(this);
          document.addEventListener("mouseup", this.currentReleaseHandler);
        }

        if (symbol !== currentButton.getText()) {
          InputDisplay.addClasses([styles$2.wrong]);
          playSound(sounds.lostSound);
          this.isInputBlocked = true;
          return;
        }
      }

      if (this.clickCounter === this.sequence.length) {
        this.isInputBlocked = true;
        playSound(sounds.winSound);
        if (this.round == 5) {
          RepeatButton.addClasses([styles$2.blocked]);
          RepeatButton.disabled;
          showModal();
          return;
        }
        toggleRepeatNext();
      }
    }
  }

  startNextRound() {
    this.round++;
    this.playSequence(this.generateSequence(this.round * 2));
    toggleRepeatNext();
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const game = new Game();

class KeyboardButton extends BaseElement {
  constructor(classes, attributes = {}, text = "", callback) {
    super("button", [...classes, styles$1.button], attributes, text);
    this.addEventListener("mousedown", callback);
  }
}

class KeyboardElement extends BaseElement {
  constructor(classes = [], difficulty) {
    super("div", [...classes, styles$1.keyboard, styles$2.inactive]);
    this.difficulty = difficulty;
    this._generateButtons(difficulty);
  }

  _generateButtons(difficulty) {
    const keyboardMap = {};
    keyboardMap.keys = [];
    virtualKeyboardData[difficulty].forEach((key) => {
      const Button = new KeyboardButton(
        [],
        { id: `${key}` },
        `${key}`,
        (event) => {
          game.checkSequence(event);
        }
      );
      this.appendChildren(Button);
      keyboardMap.keys.push(Button);
      keyboardMap.values = virtualKeyboardData[difficulty];
    });
    game.setKeyboardMap(keyboardMap);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  generateKeyboard("easy");
});

function generateKeyboard(difficulty) {
  const Keyboard = new KeyboardElement([styles$1[difficulty]], difficulty);

  if (Main.children().length === 3) {
    Main._elem.removeChild(Main._elem.lastChild);
  }
  Main.appendChildren(Keyboard);

  game.keyboard = Keyboard;
}

window.addEventListener("keydown", (event) => {
  game.checkSequence(event);
});
window.addEventListener("keyup", (event) => {
  game.checkSequence(event);
});

// classes

class Button extends BaseElement {
  constructor(classes, attributes = {}, text = "", callback) {
    super("button", [...classes, styles$2.button], attributes, text);
    this.addEventListener("click", callback);
  }
}

// layout

const InfoPanel = new BaseElement("div", [styles$2.container]);

const RoundIndicator = new BaseElement(
  "div",
  [styles$2.button, styles$2.info, styles$2.hidden, styles$2.inactive],
  {},
  `Round: 1`
);

const InputDisplay = new BaseElement(
  "div",
  [styles$2.input, styles$2.hidden],
  {},
  ""
);

const DifficultyIndicator = new BaseElement("div", [
  styles$2.button,
  styles$2.info,
  styles$2.hidden,
  styles$2.inactive,
]);
for (let i = 0; i < 3; i++) {
  const Icon = new BaseElement(
    "svg",
    [styles$2.icon],
    { width: 30, height: 30 },
    "",
    true
  );
  if (i === 0) {
    Icon.addClasses([styles$2.active]);
  }

  const Use = new BaseElement(
    "use",
    [],
    { href: "./sprite.svg#icon" },
    "",
    true
  );
  Icon.appendChildren(Use);
  DifficultyIndicator.appendChildren(Icon);
}

const EasyDifficulty = new Button(
  [styles$2.info, styles$2.difficulty, styles$2.active],
  {},
  "Easy",
  (event) => changeDifficulty(event.target, "easy")
);
const MediumDifficulty = new Button(
  [styles$2.info, styles$2.difficulty],
  {},
  "Medium",
  (event) => changeDifficulty(event.target, "medium")
);

const HardDifficulty = new Button(
  [styles$2.info, styles$2.difficulty],
  {},
  "Hard",
  (event) => changeDifficulty(event.target, "hard")
);

InfoPanel.appendChildren(
  RoundIndicator,
  InputDisplay,
  DifficultyIndicator,
  EasyDifficulty,
  MediumDifficulty,
  HardDifficulty
);

const GameButtons = new BaseElement("div", [
  styles$2.container,
  styles$2.gameButtons,
]);

const PlayButton = new Button([], {}, "Start", startGame);

const RepeatButton = new Button(
  [styles$2.hidden],
  {},
  "Repeat the sequence",
  () => {
    game.repeatSequence();
    RepeatButton.disabled;
    RepeatButton.addClasses([styles$2.blocked]);
  }
);
const NewGameButton = new Button([styles$2.hidden], {}, "New game", startNewGame);
const NextButton = new Button([styles$2.hidden], {}, "Next", () => {
  game.startNextRound();
  RepeatButton.removeClasses([styles$2.blocked]);
  RepeatButton.undisabled;
  RoundIndicator.setText(`Round: ${game.round}`);
});
GameButtons.appendChildren(PlayButton, NewGameButton, RepeatButton, NextButton);

// interaction with controls

const DifficultyButtons = [
  EasyDifficulty._elem,
  MediumDifficulty._elem,
  HardDifficulty._elem,
];

const startScreenElem = [
  EasyDifficulty,
  MediumDifficulty,
  HardDifficulty,
  PlayButton,
];

const gameScreenElem = [
  DifficultyIndicator,
  RoundIndicator,
  InputDisplay,
  NewGameButton,
  RepeatButton,
  NextButton,
];

function changeDifficultyIndicator(difficulty) {
  const children = Array.from(DifficultyIndicator.children());
  children.forEach((child) => child.classList.add(styles$2.active));
  if (difficulty == "medium") {
    children[children.length - 1].classList.remove(styles$2.active);
  }
  if (difficulty == "easy") {
    children
      .slice(-2)
      .forEach((child) => child.classList.remove(styles$2.active));
  }
}

function showStartScreen() {
  startScreenElem.forEach((obj) => obj.removeClasses([styles$2.hidden]));
  game.keyboard.addClasses([styles$2.inactive]);
  gameScreenElem.forEach((obj) => obj.addClasses([styles$2.hidden]));
}

function showGameScreen() {
  startScreenElem.forEach((obj) => obj.addClasses([styles$2.hidden]));
  RepeatButton.undisabled;
  RepeatButton.removeClasses([styles$2.blocked]);
  gameScreenElem.forEach((obj) => {
    if (obj === NextButton) {
      return;
    }
    obj.removeClasses([styles$2.hidden]);
  });
}

function changeDifficulty(node, difficulty) {
  game.setDifficulty(difficulty);
  changeDifficultyIndicator(difficulty);
  node.classList.add(styles$2.active);
  DifficultyButtons.forEach((button) => {
    if (button !== node) {
      button.classList.remove(styles$2.active);
    }
  });
  generateKeyboard(difficulty);
}

function startGame() {
  showGameScreen();
  game.initGame();
}

function startNewGame() {
  showStartScreen();
}

function toggleRepeatNext() {
  [RepeatButton, NextButton].forEach((button) =>
    button.toggleClass(styles$2.hidden)
  );
}

const Header = new BaseElement("header");

const H1 = new BaseElement("h1", [styles$3.title], {}, "Simon says");
Header.appendChildren(H1);

const Main = new BaseElement("main", [styles$3.main]);
Main.appendChildren(InfoPanel, GameButtons);

const Wrapper = new BaseElement("div", [styles$3.wrapper]);
Wrapper.appendChildren(ModalContainer, Header, Main);

document.body.appendChild(Wrapper._elem);
//# sourceMappingURL=index-1N4oHErO.js.map
