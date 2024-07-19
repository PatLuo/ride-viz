import { FullActivity } from "@/lib/types";
import { Card } from "./card";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
interface ActivityCardProps {
	activity: FullActivity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
	const { name, distance, moving_time, start_date_local } = activity;

	function formatDate(date: string) {
		const d = new Date(date);
		return d.toDateString();
	}
	function formatStartTime(timestamp: string): string {
		const date = new Date(timestamp);

		let hours = date.getUTCHours();
		const minutes = date.getUTCMinutes();
		const ampm = hours >= 12 ? "pm" : "am";

		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'

		const minutesStr = minutes < 10 ? "0" + minutes : minutes;

		return `${hours}:${minutesStr} ${ampm}`;
	}
	function formatDuration(seconds: number) {
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

	function formatDistance(distance: number) {
		return Math.round(distance / 100) / 10; //round to 1 decimal place
	}
	return (
		<Dialog>
			<DialogTrigger className="w-full">
				<Card className="p-3 min-w-56 hover:bg-gray-200 dark:hover:bg-[hsl(20,76%,18%)] transition-colors duration-100">
					<div className="flex justify-between">
						<span className="font-semibold">
							{formatDate(start_date_local)}
						</span>
						<span className="text-md">{formatStartTime(start_date_local)}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-md">{formatDistance(distance)} km</span>
						<span className="text-sm">{formatDuration(moving_time)}</span>
					</div>
				</Card>
			</DialogTrigger>
			<DialogContent style={{ zIndex: 400 }}>
				<div className="p-3">
					<h2 className="text-2xl font-semibold">{name}</h2>
					<p className="text-md">
						{formatDate(start_date_local)} at{" "}
						{formatStartTime(start_date_local)}
					</p>
					<p className="text-md">
						{formatDistance(distance)} km in {formatDuration(moving_time)}
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}
