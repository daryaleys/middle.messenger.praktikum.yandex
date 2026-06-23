import { afterEach, describe, expect, it, vi } from "vitest";
import { ChatSocket } from "./ChatSocket";

type WebSocketListener = (event: Event) => void;

class WebSocketMock extends EventTarget {
	static instances: WebSocketMock[] = [];

	static CONNECTING = 0;
	static OPEN = 1;
	static CLOSING = 2;
	static CLOSED = 3;

	readyState = WebSocketMock.CONNECTING;

	readonly send = vi.fn();

	readonly close = vi.fn(() => {
		this.readyState = WebSocketMock.CLOSED;
	});

	readonly url: string;

	constructor(url: string) {
		super();
		this.url = url;
		WebSocketMock.instances.push(this);
	}

	open() {
		this.readyState = WebSocketMock.OPEN;
		this.dispatchEvent(new Event("open"));
	}

	receive(data: unknown) {
		this.dispatchEvent(
			new MessageEvent("message", {
				data: JSON.stringify(data),
			}),
		);
	}

	addEventListener(type: string, listener: WebSocketListener) {
		super.addEventListener(type, listener);
	}

	removeEventListener(type: string, listener: WebSocketListener) {
		super.removeEventListener(type, listener);
	}
}

describe("ChatSocket", () => {
	afterEach(() => {
		WebSocketMock.instances = [];
		vi.restoreAllMocks();
	});

	it("passes a realtime message object to onMessages", () => {
		vi.stubGlobal("WebSocket", WebSocketMock);
		const onMessages = vi.fn();
		const socket = new ChatSocket({
			userId: 1,
			chatId: 2,
			token: "token",
			onMessages,
		});

		socket.connect();
		WebSocketMock.instances[0].receive({
			id: "12",
			time: "2026-06-23T10:00:00.000Z",
			user_id: "3",
			content: "Привет",
			type: "message",
		});

		expect(onMessages).toHaveBeenCalledWith([
			expect.objectContaining({
				content: "Привет",
				type: "message",
			}),
		]);
	});

	it("passes old message arrays to onMessages", () => {
		vi.stubGlobal("WebSocket", WebSocketMock);
		const onMessages = vi.fn();
		const socket = new ChatSocket({
			userId: 1,
			chatId: 2,
			token: "token",
			onMessages,
		});

		socket.connect();
		WebSocketMock.instances[0].receive([
			{
				id: "12",
				time: "2026-06-23T10:00:00.000Z",
				user_id: "3",
				content: "Привет",
				type: "message",
			},
		]);

		expect(onMessages).toHaveBeenCalledOnce();
		expect(onMessages.mock.calls[0][0]).toHaveLength(1);
	});

	it("ignores service messages", () => {
		vi.stubGlobal("WebSocket", WebSocketMock);
		const onMessages = vi.fn();
		const socket = new ChatSocket({
			userId: 1,
			chatId: 2,
			token: "token",
			onMessages,
		});

		socket.connect();
		WebSocketMock.instances[0].receive({ type: "pong" });

		expect(onMessages).not.toHaveBeenCalled();
	});
});
