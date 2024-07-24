"use client";
import { useEffect } from "react";
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
										<FilterOptions activities={activities} />
									</SheetDescription>
								</SheetHeader>
							</SheetContent>
						</Sheet>
					</div>
				</TooltipTrigger>
				<TooltipContent>Filter</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
