export interface RefreshTokenData {
	token_type: string;
	access_token: string;
	expires_at: number;
	expires_in: number;
	refresh_token: string;
}

export interface Activity {
	name: string;
	distance: number;
	moving_time: number;
	elapsed_time: number;
	total_elevation_gain: number;
	id: number;
	start_date_local: string;
	achievement_count: number;
	map: {
		id: string;
		summary_polyline: string;
		resource_state: number;
	};
	average_speed: number;
	max_speed: number;
	pr_count: number;
	total_photo_count: number;
}

export interface FullActivity {
	resource_state: number;
	athlete: { id: number; resource_state: number };
	name: string;
	distance: number;
	moving_time: number;
	elapsed_time: number;
	total_elevation_gain: number;
	type: string;
	sport_type: string;
	workout_type: number;
	id: number;
	start_date: string;
	start_date_local: string;
	timezone: string;
	utc_offset: number;
	location_city: string | null;
	location_state: string | null;
	location_country: string;
	achievement_count: number;
	kudos_count: number;
	comment_count: number;
	athlete_count: number;
	photo_count: number;
	map: {
		id: string;
		summary_polyline: string;
		resource_state: number;
	};
	trainer: boolean;
	commute: boolean;
	manual: boolean;
	private: boolean;
	visibility: string;
	flagged: boolean;
	gear_id: string | null;
	start_latlng: number[];
	end_latlng: number[];
	average_speed: number;
	max_speed: number;
	has_heartrate: boolean;
	heartrate_opt_out: boolean;
	display_hide_heartrate_option: boolean;
	elev_high: number;
	elev_low: number;
	upload_id: number;
	upload_id_str: string;
	external_id: string;
	from_accepted_tag: boolean;
	pr_count: number;
	total_photo_count: number;
	has_kudoed: boolean;
}

export interface AthleteProfile {
	id: number;
	username: string;
	resource_state: number;
	firstname: string;
	lastname: string;
	bio: string | null;
	city: string;
	state: string;
	country: string;
	sex: "M" | "F" | "O"; // Assuming 'O' for other; adjust if needed
	premium: boolean;
	summit: boolean;
	created_at: string; // ISO 8601 date string
	updated_at: string; // ISO 8601 date string
	badge_type_id: number;
	weight: number;
	profile_medium: string;
	profile: string;
	friend: string | null; // or adjust type if needed
	follower: string | null; // or adjust type if needed
}
