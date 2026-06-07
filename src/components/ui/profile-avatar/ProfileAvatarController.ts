import { profileAvatarAPI } from "@src/api";
import { setUser } from "@src/store";

import { ProfileAvatarModel } from "./ProfileAvatarModel";
import type { ProfileAvatarProps } from "./types";

export class ProfileAvatarController {
	private readonly model: ProfileAvatarModel;

	constructor(model: ProfileAvatarModel) {
		this.model = model;
	}

	getViewModel(): Required<ProfileAvatarProps> {
		return this.model.getAvatarData();
	}

	async updateAvatar(file: File) {
		try {
			const user = await profileAvatarAPI.request({ avatar: file });
			setUser(user);
			return user;
		} catch {
			return "Не удалось обновить аватар. Попробуйте другой файл.";
		}
	}
}
