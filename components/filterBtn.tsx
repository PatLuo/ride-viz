"use client";
import { useEffect } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import FilterOptions from "./filterOptions";
import { useActivity } from "@/components/activity-provider";
import { FullActivity } from "@/lib/types";

interface FilterBtnProps {
	activities: FullActivity[];
}

export default function FilterBtn({ activities }: FilterBtnProps) {
	const { updatefiltered } = useActivity();
	useEffect(() => {
		updatefiltered(activities); //initialize with all activities
	}, []);
	return (
		<TooltipProvider>
			<Tooltip delayDuration={100}>
				<TooltipTrigger asChild>
					<div>
						{/* this div needed for tooltip to work */}
						<FilterOptions activities={activities} />
					</div>
				</TooltipTrigger>
				<TooltipContent>Filter</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
