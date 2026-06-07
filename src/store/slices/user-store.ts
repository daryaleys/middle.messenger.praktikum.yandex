import type { UserResponse } from "@src/api/auth/user-api";

import { store } from "../store";

type UserState = {
	currentUser?: UserResponse | null;
};

export function getUser(): UserResponse | null {
	const userState = store.getState().user as UserState | undefined;

	return userState?.currentUser ?? null;
}

export function setUser(user: UserResponse) {
	store.setState({
		user: { currentUser: user },
	});
}

export function resetUser() {
	store.setState({
		user: { currentUser: null },
	});
}
