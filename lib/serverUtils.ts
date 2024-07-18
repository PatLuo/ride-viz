import { RefreshTokenData } from "./types";

export async function refreshToken(
	client_id?: string,
	client_secret?: string,
	refresh_token?: string
): Promise<RefreshTokenData | null> {
	const url = `https://www.strava.com/oauth/token?client_id=${client_id}&client_secret=${client_secret}&refresh_token=${refresh_token}&grant_type=refresh_token`;
	try {
		const response = await fetch(url, {
			method: "POST",
		});
		if (!response.ok) {
			console.log(await response.json());
			return null;
		}
		return await response.json();
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function getActivities(access_token: string, per_page = 200) {
	const url = `https://www.strava.com/api/v3/athlete/activities?per_page=${per_page}&access_token=${access_token}`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			console.log(await response.json());
			return null;
		}
		return await response.json();
	} catch (error) {
		console.error(error);
		return null;
	}
}
