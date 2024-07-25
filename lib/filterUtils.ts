import { FullActivity } from "./types";

export function getAllYears(activities: FullActivity[]): number[] {
	const yearsSet: Set<number> = new Set();

	activities.forEach((activity) => {
		const activityYear = new Date(activity.start_date).getFullYear();
		yearsSet.add(activityYear);
	});

	return Array.from(yearsSet).sort((a, b) => a - b);
}

export function filterByYear(
	activities: FullActivity[],
	selectedYears: number[]
): FullActivity[] {
	return activities.filter((activity) =>
		selectedYears.includes(new Date(activity.start_date_local).getFullYear())
	);
}

export function filterByDistance(
	activities: FullActivity[],
	selectedDistance: number[]
): FullActivity[] {
	return activities.filter(
		(activity) =>
			activity.distance >= selectedDistance[0] &&
			activity.distance <= selectedDistance[1]
	);
}
export function filterByDuration(
	activities: FullActivity[],
	selectedDuration: number[]
): FullActivity[] {
	return activities.filter(
		(activity) =>
			activity.moving_time >= selectedDuration[0] &&
			activity.moving_time <= selectedDuration[1]
	);
}

export function filterBySpeed(
	activities: FullActivity[],
	selectedSpeed: number[]
): FullActivity[] {
	return activities.filter(
		(activity) =>
			activity.average_speed >= selectedSpeed[0] &&
			activity.average_speed <= selectedSpeed[1]
	);
}
