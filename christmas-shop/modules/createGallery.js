import { createElement } from "./createElement.js";

const gallery = document.querySelector(".section__gallery");

export function createGallery(arrGifts) {
  gallery.textContent = "";
  arrGifts.forEach((gift, index) => {
    const card = createElement({
      tag: "div",
      classes: ["card"],
      parent: gallery,
    });

    const category = gift.category.split(" ")[1].toLowerCase();
    card.setAttribute("data-number", `${category}_${index}`);

    const image = createElement({
      tag: "img",
      classes: ["card__image"],
      parent: card,
    });

    image.src = `./images/${category}.png`;
    image.alt = category;

    const container = createElement({
      tag: "div",
      classes: ["card__container"],
      parent: card,
    });

    createElement({
      tag: "h4",
      text: gift.category,
      classes: ["card__category", `card__category_${category}`],
      parent: container,
    });

    createElement({
      tag: "h3",
      text: gift.name,
      classes: ["card__title"],
      parent: container,
    });
  });
}
