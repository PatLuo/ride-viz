export function formatDate(date: string) {
	const d = new Date(date);
	return d.toDateString();
}
export function formatStartTime(timestamp: string): string {
	const date = new Date(timestamp);

	let hours = date.getUTCHours();
	const minutes = date.getUTCMinutes();
	const ampm = hours >= 12 ? "pm" : "am";

	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'

	const minutesStr = minutes < 10 ? "0" + minutes : minutes;

	return `${hours}:${minutesStr} ${ampm}`;
}
export function formatDuration(seconds: number) {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;

	if (hours >= 1) {
		return `${hours}H ${String(minutes).padStart(2, "0")}m`;
	} else {
		return `${String(minutes).padStart(2, "0")}m ${String(secs).padStart(
			2,
			"0"
		)}s`;
	}
}

export function formatDistance(distance: number) {
	return Math.round(distance / 100) / 10; //round to 1 decimal place
}
