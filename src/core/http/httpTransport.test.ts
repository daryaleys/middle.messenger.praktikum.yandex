import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HTTPTransport from "./httpTransport";

type XHREventHandler = (() => void) | null;

type XMLHttpRequestMock = {
	method: string;
	url: string;
	requestHeaders: Record<string, string>;
	requestBody: XMLHttpRequestBodyInit | null | undefined;
	response: unknown;
	responseText: string;
	responseType: XMLHttpRequestResponseType;
	status: number;
	statusText: string;
	timeout: number;
	withCredentials: boolean;
	onabort: XHREventHandler;
	onerror: XHREventHandler;
	onload: XHREventHandler;
	ontimeout: XHREventHandler;
	open(method: string, url: string): void;
	setRequestHeader(key: string, value: string): void;
	getResponseHeader(key: string): string | null;
	send(body?: XMLHttpRequestBodyInit | null): void;
};

let requests: XMLHttpRequestMock[] = [];

function createXMLHttpRequestMock(): XMLHttpRequestMock {
	const request: XMLHttpRequestMock = {
		method: "",
		url: "",
		requestHeaders: {},
		requestBody: undefined,
		response: undefined,
		responseText: "",
		responseType: "",
		status: 200,
		statusText: "OK",
		timeout: 0,
		withCredentials: false,
		onabort: null,
		onerror: null,
		onload: null,
		ontimeout: null,
		open: vi.fn((method, url) => {
			request.method = method;
			request.url = url;
		}),
		setRequestHeader: vi.fn((key, value) => {
			request.requestHeaders[key] = value;
		}),
		getResponseHeader: vi.fn((key) => {
			if (key.toLowerCase() === "content-type") {
				return request.requestHeaders["Response-Content-Type"] ?? null;
			}

			return null;
		}),
		send: vi.fn((body) => {
			request.requestBody = body;
		}),
	};

	return request;
}

function getLastRequest() {
	const request = requests.at(-1);

	if (!request) {
		throw new Error("Expected XMLHttpRequest to be created");
	}

	return request;
}

describe("HTTPTransport", () => {
	beforeEach(() => {
		requests = [];
		vi.stubGlobal(
			"XMLHttpRequest",
			vi.fn(function XMLHttpRequestMockConstructor() {
				const request = createXMLHttpRequestMock();
				requests.push(request);

				return request;
			}),
		);
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("sends GET requests with query params and default credentials", async () => {
		const transport = new HTTPTransport("/api");
		const responsePromise = transport.get("/users", {
			data: { page: 1, search: "john" },
		});
		const request = getLastRequest();

		request.responseText = "ok";
		request.onload?.();

		await expect(responsePromise).resolves.toBe("ok");
		expect(request.method).toBe("GET");
		expect(request.url).toBe("/api/users?page=1&search=john");
		expect(request.withCredentials).toBe(true);
		expect(request.requestBody).toBeUndefined();
	});

	it("serializes plain POST data to JSON and sets content type", async () => {
		const transport = new HTTPTransport("/api");
		const responsePromise = transport.post("/users", {
			data: { login: "tester" },
		});
		const request = getLastRequest();

		request.responseText = '{"id":1}';
		request.requestHeaders["Response-Content-Type"] = "application/json";
		request.onload?.();

		await expect(responsePromise).resolves.toEqual({ id: 1 });
		expect(request.method).toBe("POST");
		expect(request.url).toBe("/api/users");
		expect(request.requestHeaders["Content-Type"]).toBe("application/json");
		expect(request.requestBody).toBe('{"login":"tester"}');
	});

	it("preserves provided headers and withCredentials option", async () => {
		const transport = new HTTPTransport();
		const responsePromise = transport.put("/profile", {
			headers: {
				"Content-Type": "text/plain",
				"X-Test": "yes",
			},
			data: { name: "Ada" },
			withCredentials: false,
		});
		const request = getLastRequest();

		request.responseText = "updated";
		request.onload?.();

		await expect(responsePromise).resolves.toBe("updated");
		expect(request.method).toBe("PUT");
		expect(request.requestHeaders["Content-Type"]).toBe("text/plain");
		expect(request.requestHeaders["X-Test"]).toBe("yes");
		expect(request.withCredentials).toBe(false);
	});

	it("rejects failed HTTP responses with response details", async () => {
		const transport = new HTTPTransport();
		const responsePromise = transport.delete("/users", {
			data: { id: 1 },
		});
		const request = getLastRequest();

		request.status = 500;
		request.statusText = "Server Error";
		request.responseText = "failed";
		request.onload?.();

		await expect(responsePromise).rejects.toMatchObject({
			status: 500,
			statusText: "Server Error",
			response: "failed",
			request,
		});
	});
});
