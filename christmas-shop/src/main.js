import { createGallery } from "../modules/createGallery.js";
import { gifts } from "../modules/gifts.js";
import { modal } from "../modules/modal.js";
import { timer } from "../modules/timer.js";
import { slider } from "../modules/slider.js";

createGallery([gifts[1], gifts[15], gifts[3], gifts[27]]);

slider();
/* modal();
timer(); */

// generating random gifts
/* function getRandomElements(arr) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4);
}

createGallery(getRandomElements(gifts));
 */
