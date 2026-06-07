import { store } from "../store";

export const AUTH_STATUS = {
	// Стартовое состояние: приложение ещё не проверяло cookie через /auth/user.
	unchecked: "unchecked",
	// Пользователь авторизован: login/signup или /auth/user прошли успешно.
	authorized: "authorized",
	// Пользователь не авторизован: /auth/user вернул ошибку или выполнен logout.
	guest: "guest",
} as const;

type AuthStatus = (typeof AUTH_STATUS)[keyof typeof AUTH_STATUS];

type AuthState = {
	status?: AuthStatus;
};

export function getAuthStatus(): AuthStatus {
	const authState = store.getState().auth as AuthState | undefined;

	return authState?.status ?? AUTH_STATUS.unchecked;
}

function setAuthStatus(status: AuthStatus) {
	store.setState({
		auth: { status },
	});
}

export function setAuthorized() {
	setAuthStatus(AUTH_STATUS.authorized);
}

export function setGuest() {
	setAuthStatus(AUTH_STATUS.guest);
}
