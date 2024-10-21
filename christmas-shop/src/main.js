import { createGallery } from "../modules/createGallery.js";
import { gifts } from "../modules/gifts.js";
import { modal } from "../modules/modal.js";
import { timer } from "../modules/timer.js";

createGallery([gifts[1], gifts[15], gifts[3], gifts[27]]);

modal();
timer();
