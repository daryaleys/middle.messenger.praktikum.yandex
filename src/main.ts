import "./styles/index.css";
import { registerComponents, registerHelpers } from "@src/bootstrap";
import { router } from "@src/router/router";

registerHelpers();
registerComponents();

router.start();
