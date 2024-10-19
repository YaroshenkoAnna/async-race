import { gifts } from "./gifts.js";
import { work } from "./gifts.js";
import { health } from "./gifts.js";
import { harmony } from "./gifts.js";
import { createGallery } from "./createGallery.js";

export function switchGifts(event) {
  if (!event.target.classList.contains("section__switch")) {
    return;
  }
  const activeSwitch = document.querySelector(".section__switch_active");
  activeSwitch.classList.remove("section__switch_active");
  event.target.classList.add("section__switch_active");

  switch (event.target.id) {
    case "all":
      createGallery(gifts);
      break;

    case "work":
      createGallery(work);
      break;

    case "health":
      createGallery(health);
      break;

    case "harmony":
      createGallery(harmony);
      break;
  }
}
