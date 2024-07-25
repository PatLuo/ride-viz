"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import ActivityCard from "@/components/activityCard";
import { useActivity } from "./activity-provider";
import { useEffect } from "react";

export default function ActivitiesList() {
	const { filtered, selectedLine } = useActivity();

	function scrollIntoView(id: string) {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "nearest",
			});
		}
	}

	useEffect(() => {
		scrollIntoView(String(selectedLine));
	}, [selectedLine]);

	return (
		<ScrollArea className="h-[90vh]">
			{filtered.map((activity) => (
				<div key={activity.id} id={String(activity.id)}>
					<ActivityCard activity={activity} />
				</div>
			))}
		</ScrollArea>
	);
}
