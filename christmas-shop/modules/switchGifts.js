import { gifts } from "./gifts.js";
import { work } from "./gifts.js";
import { health } from "./gifts.js";
import { harmony } from "./gifts.js";
import { createGallery } from "./createGallery.js";
import { getRandomElements } from "./getRandomElements.js";

export function switchGifts(event) {
  if (!event.target.classList.contains("section__switch")) {
    return;
  }
  const activeSwitch = document.querySelector(".section__switch_active");
  activeSwitch.classList.remove("section__switch_active");
  event.target.classList.add("section__switch_active");

  const categories = {
    all: gifts,
    work: work,
    health: health,
    harmony: harmony,
  };

  const currentArray = categories[event.target.id];
  if (currentArray) {
    createGallery(getRandomElements(currentArray));
  }
}
