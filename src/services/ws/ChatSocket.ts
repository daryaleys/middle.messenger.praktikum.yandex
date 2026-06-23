type ChatSocketConfig = {
	userId: number;
	chatId: number;
	token: string;
	onClose?: () => void;
	onError?: () => void;
	onMessages?: (messages: ChatSocketMessage[]) => void;
	onOpen?: () => void;
	pingIntervalMs?: number;
};

export type ChatSocketMessage = {
	id: number | string;
	chat_id?: number | string;
	time: string;
	type: "message" | "file";
	user_id: number | string;
	content: string;
	file?: {
		id: number;
		user_id: number;
		path: string;
		filename: string;
		content_type: string;
		content_size: number;
		upload_date: string;
	};
};

const WS_BASE_URL = "wss://ya-praktikum.tech/ws/chats";
const DEFAULT_PING_INTERVAL_MS = 15000;

export class ChatSocket {
	private readonly url: string;

	private readonly pingIntervalMs: number;

	private readonly onMessages?: (messages: ChatSocketMessage[]) => void;

	private readonly onClose?: () => void;

	private readonly onError?: () => void;

	private readonly onOpen?: () => void;

	private socket: WebSocket | null = null;

	private pingTimerId: number | null = null;

	constructor({
		userId,
		chatId,
		token,
		onClose,
		onError,
		onMessages,
		onOpen,
		pingIntervalMs = DEFAULT_PING_INTERVAL_MS,
	}: ChatSocketConfig) {
		this.url = `${WS_BASE_URL}/${userId}/${chatId}/${token}`;
		this.onClose = onClose;
		this.onError = onError;
		this.onMessages = onMessages;
		this.onOpen = onOpen;
		this.pingIntervalMs = pingIntervalMs;
	}

	connect() {
		this.close();

		const socket = new WebSocket(this.url);

		this.socket = socket;
		socket.addEventListener("open", this.handleOpen);
		socket.addEventListener("message", this.handleMessage);
		socket.addEventListener("close", this.handleClose);
		socket.addEventListener("error", this.handleError);
	}

	getOldMessages(offset: number | string) {
		return this.send({
			content: String(offset),
			type: "get old",
		});
	}

	sendMessage(content: string) {
		return this.send({
			content,
			type: "message",
		});
	}

	sendFile(resourceId: number | string) {
		return this.send({
			content: String(resourceId),
			type: "file",
		});
	}

	close() {
		this.stopPing();

		if (!this.socket) {
			return;
		}

		this.socket.removeEventListener("open", this.handleOpen);
		this.socket.removeEventListener("message", this.handleMessage);
		this.socket.removeEventListener("close", this.handleClose);
		this.socket.removeEventListener("error", this.handleError);

		if (
			this.socket.readyState === WebSocket.OPEN ||
			this.socket.readyState === WebSocket.CONNECTING
		) {
			this.socket.close();
		}

		this.socket = null;
	}

	private send(data: object): boolean {
		if (this.socket?.readyState !== WebSocket.OPEN) {
			return false;
		}

		this.socket.send(JSON.stringify(data));
		return true;
	}

	private startPing() {
		this.stopPing();
		this.pingTimerId = window.setInterval(() => {
			this.send({ type: "ping" });
		}, this.pingIntervalMs);
	}

	private stopPing() {
		if (this.pingTimerId === null) {
			return;
		}

		window.clearInterval(this.pingTimerId);
		this.pingTimerId = null;
	}

	private handleOpen = () => {
		this.startPing();
		this.onOpen?.();
	};

	private handleMessage = (event: MessageEvent<string>) => {
		const message = this.parseMessage(event.data);

		if (this.isChatMessage(message)) {
			this.onMessages?.([message]);
			return;
		}

		if (this.isChatMessages(message)) {
			this.onMessages?.(message);
		}
	};

	private handleClose = () => {
		this.stopPing();

		this.onClose?.();
	};

	private handleError = () => {
		this.onError?.();
	};

	private parseMessage(data: string) {
		try {
			return JSON.parse(data) as unknown;
		} catch {
			return data;
		}
	}

	private isChatMessages(message: unknown): message is ChatSocketMessage[] {
		return Array.isArray(message) && message.every((item) =>
			this.isChatMessage(item),
		);
	}

	private isChatMessage(message: unknown): message is ChatSocketMessage {
		if (typeof message !== "object" || message === null) {
			return false;
		}

		const messageType = (message as Partial<ChatSocketMessage>).type;

		return messageType === "message" || messageType === "file";
	}
}
