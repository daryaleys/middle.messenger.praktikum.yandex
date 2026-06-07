import { HTTPTransport } from "@src/core";

import { API_BASE_URL } from "../base-url";

export const userAPIInstance = new HTTPTransport(`${API_BASE_URL}/user`);
