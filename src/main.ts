import { Router } from "./router/router";
import { APP_ROUTES } from "./constants/routes";

import { BaseElement } from "./utils/base-element";
import "./style.scss";

const container = new BaseElement<"div">({
  tag: "div",
  classNames: ["container"],
});
document.body.append(container.node);
new Router(APP_ROUTES, container);
