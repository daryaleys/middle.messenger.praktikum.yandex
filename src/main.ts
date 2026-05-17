import "./styles/index.css";
import { registerHelpers } from "@src/app/registerHelpers";
import { registerComponents } from "@src/app/registerComponents";
import { router } from "@src/router/router";

registerHelpers();
registerComponents();
router.start();
