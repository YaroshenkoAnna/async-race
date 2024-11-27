import { createGallery } from "../modules/createGallery.js";
import { gifts } from "../modules/gifts.js";
import { modal } from "../modules/modal.js";
import { timer } from "../modules/timer.js";
import { slider } from "../modules/slider.js";
import { getRandomElements } from "../modules/getRandomElements.js";

createGallery([gifts[1], gifts[15], gifts[3], gifts[27]]);

slider();
modal();
timer();

createGallery(getRandomElements(gifts, 4));
