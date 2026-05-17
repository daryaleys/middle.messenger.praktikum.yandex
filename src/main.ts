import "./style.css";
import { registerComponents } from "@src/app/registerComponents";
import { registerHelpers } from "@src/app/registerHelpers";
import { router } from "@src/router/router";

registerHelpers();
registerComponents();
router.start();
