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
		<ScrollArea className="h-[90vh] min-w-64">
			{filtered.length !== 0 ? (
				filtered.map((activity) => (
					<div key={activity.id} id={String(activity.id)}>
						<ActivityCard activity={activity} />
					</div>
				))
			) : (
				<div className="text-center flex flex-col h-[84vh] justify-center text-xl mx-4 min-w-36">
					No activities found
				</div>
			)}
		</ScrollArea>
	);
}
