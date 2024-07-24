import { useActivity } from "./activity-provider";
import { useState, useEffect } from "react";
import { FullActivity } from "@/lib/types";
import { getAllYears } from "@/lib/filterUtils";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { Filter as FilterIcon } from "lucide-react";

interface FilterOptionsProps {
	activities: FullActivity[];
}

export default function FilterOptions({ activities }: FilterOptionsProps) {
	const [filteredActivities, setFilteredActivities] = useState(activities);
	const { updatefiltered } = useActivity();

	useEffect(() => {
		updatefiltered(filteredActivities);
	}, [filteredActivities]);
	const years = getAllYears(activities);
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon">
					<FilterIcon className="h-[1.2rem] w-[1.2rem] " />
				</Button>
			</SheetTrigger>

			<SheetContent onCloseAutoFocus={(e) => e.preventDefault()}>
				{/* Prevent focus from moving to filter btn on close */}
				<SheetTitle className="text-2xl font-bold">Filters</SheetTitle>
				<Accordion type="single" collapsible>
					<AccordionItem value="year" className="ml-3">
						<AccordionTrigger>
							<SheetHeader className="text-xl ">Year:</SheetHeader>
						</AccordionTrigger>
						<AccordionContent>
							<SheetDescription>
								<div className="flex flex-col gap-y-5 ">
									{years.map((year) => (
										<div className="flex flex-row items-center gap-x-2 ">
											<Checkbox id={String(year)} />
											<div className="text-md ">{year}</div>
										</div>
									))}
								</div>
							</SheetDescription>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</SheetContent>
		</Sheet>
	);
}
