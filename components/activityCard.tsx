import { FullActivity } from "@/lib/types";
import { Card } from "./ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";

import {
	formatDistance,
	formatDuration,
	formatDate,
	formatStartTime,
} from "@/lib/activityUtils";
import { useActivity } from "./activity-provider";

interface ActivityCardProps {
	activity: FullActivity;
}

//have to dynamically import map component to fix window not found error
import dynamic from "next/dynamic";
const MiniMap = dynamic(() => import("@/components/miniMap"), {
	ssr: false,
});

export default function ActivityCard({ activity }: ActivityCardProps) {
	const { name, distance, moving_time, start_date_local } = activity;
	const { selectedLine } = useActivity(); //highlight selected activity

	return (
		<Dialog>
			<DialogTrigger
				className={`w-full p-4 min-w-64 border-x-[12px] border-y-[4px] rounded-[22px] bg-gray-100 hover:bg-gray-200 dark:bg-[hsl(20,15%,10%)] dark:hover:bg-[hsl(20,76%,18%)] transition-colors pointer border-white dark:border-black font-semibold ${
					selectedLine == activity.id
						? `bg-[hsl(24.6,95%,53%)] hover:bg-[hsl(24.6,95%,43%)] dark:bg-[hsl(24.6,95%,43%)] hover:dark:bg-[hsl(24,100%,50%)] text-gray-50 `
						: ""
				}`}
			>
				<div>
					<div className="flex justify-between">
						<span className="font-bold">{formatDate(start_date_local)}</span>
						<span className="text-md">{formatStartTime(start_date_local)}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-md">{formatDistance(distance)} km</span>
						<span className="text-sm">{formatDuration(moving_time)}</span>
					</div>
				</div>
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
