import { createGallery } from "../modules/createGallery.js";
import { switchGifts } from "../modules/switchGifts.js";
import { gifts } from "../modules/gifts.js";
import { modal } from "../modules/modal.js";
import { up } from "../modules/up.js";
import { getRandomElements } from "../modules/getRandomElements.js";

/* createGallery([
  gifts[1],
  gifts[13],
  gifts[0],
  gifts[2],
  gifts[12],
  gifts[26],
  gifts[14],
  gifts[25],
  gifts[15],
  gifts[3],
  gifts[24],
  gifts[27],
]); */
createGallery(getRandomElements(gifts));

const switches = document.querySelector(".section__switches");
switches.addEventListener("click", switchGifts);
modal();
up();
