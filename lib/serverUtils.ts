"use server";

import { RefreshTokenData } from "./types";
import { cookies } from "next/headers";

const baseUrl = "https://www.strava.com/";

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const default_refresh_token: string = `${process.env.REFRESH_TOKEN}`;

export async function logout() {
	cookies().delete("refresh_token");
}
export async function getSession() {
	const session = cookies().get("refresh_token")?.value;

	if (!session) return null;
	return session;
}

export async function refreshAccessToken(
	refresh_token: string = default_refresh_token
): Promise<RefreshTokenData | null> {
	const url = `${baseUrl}oauth/token?client_id=${client_id}&client_secret=${client_secret}&refresh_token=${refresh_token}&grant_type=refresh_token`;
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
	const url = `${baseUrl}api/v3/athlete/activities?per_page=${per_page}&access_token=${access_token}`;
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

export async function getProfileData(access_token: string) {
	const url = `${baseUrl}api/v3/athlete?access_token=${access_token}`;
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
