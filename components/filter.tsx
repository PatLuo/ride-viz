"use client";
import { useState } from "react";
import { Filter as FilterIcon } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import { useActivity } from "./activity-provider";

import { FullActivity } from "@/lib/types";

interface FilterBtnProps {
	activities: FullActivity[];
}
export default function Filter({ activities }: FilterBtnProps) {
	const [filteredActivities, setFilteredActivities] = useState(activities);
	const { updatefiltered } = useActivity();

	updatefiltered(filteredActivities);
	return (
		<TooltipProvider>
			<Tooltip delayDuration={100}>
				<TooltipTrigger asChild>
					<div>
						{/*this div is needed for tooltip */}
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon">
									<FilterIcon className="h-[1.2rem] w-[1.2rem] " />
								</Button>
							</SheetTrigger>
							<SheetContent>
								<SheetHeader>
									<SheetTitle>Filter Rides</SheetTitle>
									<SheetDescription>
										This action cannot be undone. This will permanently delete
										your account and remove your data from our servers.
									</SheetDescription>
								</SheetHeader>
							</SheetContent>
						</Sheet>
					</div>
				</TooltipTrigger>
				<TooltipContent>Filter rides</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
