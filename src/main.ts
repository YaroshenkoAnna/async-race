import styles from "./styles.module.scss";
import { PageFactory } from "./factories/page-factory";
import { createAppRoutes } from "./router/routes";
import { Router } from "./router/router";
import { BaseElement } from "./utils/base-element";
import { ConnectionOverlay } from "./components/connection-overlay/connection-overlay";
import { DEFAULT_ROUTE, ERROR_ROUTE } from "./router/constants";
import { Footer } from "./components/footer/footer";

const container = new BaseElement({
  tag: "div",
  classNames: [styles.container],
});
const footer = new Footer();
document.body.append(container.node, footer.node);

const factory = new PageFactory();

new Router(createAppRoutes(factory), container, DEFAULT_ROUTE, ERROR_ROUTE);

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
