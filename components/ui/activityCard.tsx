import { FullActivity } from "@/lib/types";
import { Card } from "./card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "./dialog";

import {
	formatDistance,
	formatDuration,
	formatDate,
	formatStartTime,
} from "@/lib/activityUtils";

interface ActivityCardProps {
	activity: FullActivity;
}
//have to dynamically import map component to fix window not found error
import dynamic from "next/dynamic";
const MiniMap = dynamic(() => import("@/components/ui/miniMap"), {
	ssr: false,
});

export default function ActivityCard({ activity }: ActivityCardProps) {
	const { name, distance, moving_time, start_date_local } = activity;

	return (
		<Dialog>
			<DialogTrigger className="w-full">
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
					<div className="h-[90%] p-5">
						<MiniMap activity={activity} />
					</div>
				</DialogDescription>
			</DialogContent>
		</Dialog>
	);
}
