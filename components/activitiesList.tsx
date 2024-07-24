"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import ActivityCard from "@/components/activityCard";
import { useActivity } from "./activity-provider";

export default function ActivitiesList() {
	const { filtered } = useActivity();
	return (
		<ScrollArea className="h-[90vh]">
			<div className="flex flex-col items-stretch justify-between gap-2 rouded-lg p-3">
				{filtered.map((activity) => (
					<div key={activity.id}>
						<ActivityCard activity={activity} />
					</div>
				))}
			</div>
		</ScrollArea>
	);
}
