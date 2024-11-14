import { gifts } from "./gifts.js";

export function modal() {
  const modalWindow = document.querySelector("dialog");
  const gallery = document.querySelector(".section__gallery");
  const modalCard = document.querySelector(".card_modal");
  const image = modalCard.querySelector("img");
  const name = modalCard.querySelector(".card__title");
  const description = modalCard.querySelector(".card__description");
  const categoryName = modalCard.querySelector(".card__category");
  const livePower = modalCard.querySelector("#live .card__power");
  const createPower = modalCard.querySelector("#create .card__power");
  const lovePower = modalCard.querySelector("#love .card__power");
  const dreamPower = modalCard.querySelector("#dream .card__power");
  const liveStars = modalCard.querySelectorAll("#live .card__star");
  const createStars = modalCard.querySelectorAll("#create .card__star");
  const dreamStars = modalCard.querySelectorAll("#dream .card__star");
  const loveStars = modalCard.querySelectorAll("#love .card__star");

  modalWindow.addEventListener("click", (event) => {
    if (
      !event.target.closest(".card_modal") ||
      event.target.closest(".card__cross")
    ) {
      modalWindow.close();
    }
  });

  modalWindow.addEventListener("close", removeDataFromModal);

  gallery.addEventListener("click", (event) => {
    if (event.target.closest(".card")) {
      createModal(event.target.closest(".card").getAttribute("data-number"));
    }
  });

  function createModal(number) {
    categoryName.textContent = gifts[number].category;
    const category = gifts[number].category.split(" ")[1].toLowerCase();
    categoryName.classList.add(`card__category_${category}`);
    image.src = `./images/${category}.png`;
    name.textContent = gifts[number].name;
    description.textContent = gifts[number].description;
    livePower.textContent = gifts[number].superpowers.live;
    paintStars(livePower.textContent, liveStars);
    createPower.textContent = gifts[number].superpowers.create;
    paintStars(createPower.textContent, createStars);
    lovePower.textContent = gifts[number].superpowers.love;
    paintStars(lovePower.textContent, loveStars);
    dreamPower.textContent = gifts[number].superpowers.dream;
    paintStars(dreamPower.textContent, dreamStars);
    modalWindow.showModal();
    document.querySelector("body").classList.add("enabled-scroll");
  }

  function removeDataFromModal() {
    document.querySelector("body").classList.remove("enabled-scroll");
    categoryName.classList.remove(`card__category_work`);
    categoryName.classList.remove(`card__category_health`);
    categoryName.classList.remove(`card__category_harmony`);
    document
      .querySelectorAll(".card__star")
      .forEach((star) => star.classList.remove("card__star_active"));
  }

  function paintStars(power, stars) {
    const numberPaintedStars = +power[1];
    stars.forEach((star, number) => {
      if (number < numberPaintedStars) {
        star.classList.add("card__star_active");
      }
    });
  }
}
