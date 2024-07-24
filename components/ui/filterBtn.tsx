"use client";
import { useState } from "react";
import { Filter } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./button";
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
export default function FilterBtn({ activities }: FilterBtnProps) {
	const [filteredActivities, setFilteredActivities] = useState(activities);
	const { updatefiltered } = useActivity();

	updatefiltered(filteredActivities);
	return (
		<TooltipProvider>
			<Tooltip delayDuration={100}>
				<TooltipTrigger asChild>
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon">
								<Filter className="h-[1.2rem] w-[1.2rem] " />
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
				</TooltipTrigger>
				<TooltipContent>Filter rides</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
