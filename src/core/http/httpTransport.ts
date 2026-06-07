import { queryStringify } from "@src/utils/url";

const METHODS = {
	GET: "GET",
	POST: "POST",
	PUT: "PUT",
	DELETE: "DELETE",
} as const;

type Method = (typeof METHODS)[keyof typeof METHODS];
type Headers = Record<string, string>;
type PlainData = Record<string, unknown>;
type RequestData = XMLHttpRequestBodyInit | PlainData;

type RequestOptions = {
	headers?: Headers;
	method?: Method;
	data?: RequestData;
	responseType?: XMLHttpRequestResponseType;
	timeout?: number;
	withCredentials?: boolean;
};

type RequestOptionsWithoutMethod = Omit<RequestOptions, "method">;

type HTTPError = {
	status?: number;
	statusText?: string;
	response?: string;
	reason?: string;
	timeout?: number;
	request: XMLHttpRequest;
};

function isPlainData(data: RequestData): data is PlainData {
	return (
		typeof data === "object" &&
		data !== null &&
		!(data instanceof FormData) &&
		!(data instanceof URLSearchParams) &&
		!(data instanceof Blob) &&
		!(data instanceof ArrayBuffer)
	);
}

export class HTTPTransport {
	private readonly baseUrl: string;

	constructor(baseUrl = "") {
		this.baseUrl = baseUrl;
	}

	get<T = unknown>(url: string, options: RequestOptionsWithoutMethod = {}) {
		return this.request<T>(
			url,
			{ ...options, method: METHODS.GET },
			options.timeout,
		);
	}

	post<T = unknown>(url: string, options: RequestOptionsWithoutMethod = {}) {
		return this.request<T>(
			url,
			{ ...options, method: METHODS.POST },
			options.timeout,
		);
	}

	put<T = unknown>(url: string, options: RequestOptionsWithoutMethod = {}) {
		return this.request<T>(
			url,
			{ ...options, method: METHODS.PUT },
			options.timeout,
		);
	}

	delete<T = unknown>(
		url: string,
		options: RequestOptionsWithoutMethod = {},
	) {
		return this.request<T>(
			url,
			{ ...options, method: METHODS.DELETE },
			options.timeout,
		);
	}

	request<T = unknown>(
		url: string,
		options: RequestOptions = {},
		timeout = 5000,
	): Promise<T> {
		const {
			headers = {},
			method,
			data,
			responseType,
			withCredentials = true,
		} = options;

		return new Promise<T>((resolve, reject: (reason: HTTPError) => void) => {
			if (!method) {
				reject({
					reason: "HTTP method is required",
					request: new XMLHttpRequest(),
				});
				return;
			}

			const xhr = new XMLHttpRequest();
			const isGet = method === METHODS.GET;
			const requestUrl =
				isGet && data && isPlainData(data)
					? `${url}${queryStringify(data)}`
					: url;

			xhr.open(method, `${this.baseUrl}${requestUrl}`);
			xhr.withCredentials = withCredentials;

			if (responseType) {
				xhr.responseType = responseType;
			}

			Object.entries(headers).forEach(([key, value]) => {
				xhr.setRequestHeader(key, value);
			});

			xhr.onload = () => {
				if (xhr.status >= 200 && xhr.status < 300) {
					resolve(this.parseResponse<T>(xhr));
					return;
				}

				reject({
					status: xhr.status,
					statusText: xhr.statusText,
					response: xhr.responseText,
					request: xhr,
				});
			};

			xhr.onabort = () =>
				reject({
					reason: "Request aborted",
					request: xhr,
				});

			xhr.onerror = () =>
				reject({
					reason: "Network error",
					request: xhr,
				});

			xhr.timeout = timeout;

			xhr.ontimeout = () =>
				reject({
					reason: "Request timeout",
					timeout,
					request: xhr,
				});

			this.sendRequest(xhr, data, isGet, headers);
		});
	}

	private parseResponse<T>(xhr: XMLHttpRequest): T {
		if (xhr.responseType) {
			return xhr.response as T;
		}

		const contentType = xhr.getResponseHeader("Content-Type");

		if (contentType?.includes("application/json")) {
			return JSON.parse(xhr.responseText) as T;
		}

		return xhr.responseText as T;
	}

	private sendRequest(
		xhr: XMLHttpRequest,
		data: RequestData | undefined,
		isGet: boolean,
		headers: Headers,
	) {
		if (isGet || !data) {
			xhr.send();
			return;
		}

		if (isPlainData(data)) {
			if (!headers["Content-Type"]) {
				xhr.setRequestHeader("Content-Type", "application/json");
			}

			xhr.send(JSON.stringify(data));
			return;
		}

		xhr.send(data);
	}
}

export default HTTPTransport;
