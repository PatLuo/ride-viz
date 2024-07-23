import { FullActivity } from "@/lib/types";
import { Card } from "./card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "./dialog";
import MiniMap from "./miniMap";

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
			<DialogTrigger asChild className="w-full">
				<Card className="p-3 min-w-56 hover:bg-gray-200 dark:hover:bg-[hsl(20,76%,18%)] transition-colors duration-100 pointer">
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
			<DialogContent className="min-w-[80%] lg:min-w-[800px] h-[80%] flex flex-col">
				<DialogTitle>
					<div className="text-3xl font-bold px-5">{name}</div>
				</DialogTitle>
				<DialogDescription asChild className="pt-5 ">
					<div className="text-md">
						{formatDate(start_date_local)} at{" "}
						{formatStartTime(start_date_local)}
						{formatDistance(distance)} km in {formatDuration(moving_time)}
					</div>
				</DialogDescription>
				<div className="h-[90%] p-5">
					<MiniMap activity={activity} />
				</div>
			</DialogContent>
		</Dialog>
	);
}
