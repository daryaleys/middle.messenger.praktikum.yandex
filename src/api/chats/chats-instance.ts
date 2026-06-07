import { HTTPTransport } from "@src/core";

import { API_BASE_URL } from "../base-url";

export const chatsAPIInstance = new HTTPTransport(`${API_BASE_URL}/chats`);
