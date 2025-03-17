import { Router } from "./router/router";
import { APP_ROUTES } from "./constants/routes";
import { appStore } from "./store/app-store";

const router = new Router(APP_ROUTES, document.body);
router.navigate(appStore.currentUrl.value);
