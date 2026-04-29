import Handlebars from "handlebars";
import sidebarTemplate from "./layouts/sidebar/sidebar.hbs?raw";
import chatItemTemplate from "./components/chat-item/chat-item.hbs?raw";
import newChatButtonTemplate from "./components/new-chat-button/new-chat-button.hbs?raw";
import lt from "./helpers/lt";
import gt from "./helpers/gt";
import subtract from "./helpers/subtract";
import { chats } from "./mocks/chats";
import "./style.css";

Handlebars.registerPartial("chat-item", chatItemTemplate);
Handlebars.registerPartial("new-chat-button", newChatButtonTemplate);

Handlebars.registerHelper("lt", lt);
Handlebars.registerHelper("gt", gt);
Handlebars.registerHelper("subtract", subtract);

const compiledTemplate = Handlebars.compile(sidebarTemplate)({ chats });

document.querySelector<HTMLDivElement>("#app")!.innerHTML = compiledTemplate;
