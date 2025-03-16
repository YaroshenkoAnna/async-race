import { Router } from "./router/router";
import { APP_ROUTES } from "./constants/routes";

const router = new Router(APP_ROUTES, document.body);
router.navigate("/");
