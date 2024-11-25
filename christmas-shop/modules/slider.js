const arrowRight = document.querySelector("#arrow-right");
const arrowLeft = document.querySelector("#arrow-left");
const sliderRow = document.querySelector(".slider__wraper");
const element = document.querySelector(".section");
const computedStyle = window.getComputedStyle(element);
let clickNumber = 0;

const totalSliderWidth = sliderRow.clientWidth;
let width;
let numberOfClicks;

export function slider() {
  arrowRight.addEventListener("click", moveSlider);
  arrowLeft.addEventListener("click", moveSlider);
}

function moveSlider(event) {
  width = window.innerWidth;
  numberOfClicks = width < 769 ? 6 : 3;
  let padding = parseFloat(computedStyle.paddingLeft);
  let moveWidth = (totalSliderWidth + padding * 2 - width) / numberOfClicks;
  console.log(sliderRow.paddingLeft);
  if (event.target.closest("#arrow-right")) {
    clickNumber++;
    sliderRow.style.translate = -moveWidth * clickNumber + "px";
  } else {
    clickNumber--;
    sliderRow.style.translate = -moveWidth * clickNumber + "px";
  }
  checkActiveButtons();
}

function checkActiveButtons() {
  if (clickNumber === 0) {
    arrowLeft.classList.add("slider__arrow_inactive");
  } else if (clickNumber === numberOfClicks) {
    arrowRight.classList.add("slider__arrow_inactive");
  } else {
    arrowLeft.classList.remove("slider__arrow_inactive");
    arrowRight.classList.remove("slider__arrow_inactive");
  }
}
