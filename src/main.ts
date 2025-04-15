import styles from "./styles.module.scss";
import { PageFactory } from "./factories/page-factory";
import { createAppRoutes } from "./router/routes";
import { Router } from "./router/router";
import { BaseElement } from "./utils/base-element";
import { ConnectionOverlay } from "./components/connection-overlay/connection-overlay";
import { DEFAULT_ROUTE, ERROR_ROUTE } from "./router/constants";

const container = new BaseElement({
  tag: "div",
  classNames: [styles.container],
});
document.body.appendChild(container.node);

const factory = new PageFactory();

const router = new Router(
  createAppRoutes(factory),
  container,
  DEFAULT_ROUTE,
  ERROR_ROUTE
);

const client = factory.getSocket();
let overlay: ConnectionOverlay | null = null;

client.isConnected$.subscribeAndGet((isConnected) => {
  if (!isConnected && !overlay) {
    overlay = new ConnectionOverlay();
    document.body.appendChild(overlay.node);
  }
  if (isConnected && overlay) {
    overlay.deleteElement();
    overlay = null;
  }
});
