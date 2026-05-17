import "./style.css";
import { registerPartials } from "@src/app/registerPartials";
import { router } from "@src/app/router";

registerPartials();
router.start();
