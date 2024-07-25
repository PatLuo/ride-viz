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
