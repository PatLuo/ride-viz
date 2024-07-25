import { useActivity } from "./activity-provider";
import { useState, useEffect } from "react";
import { FullActivity } from "@/lib/types";
import { getAllYears, filterByYear } from "@/lib/filterUtils";
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
	const years = getAllYears(activities);

	const [selectedYears, setSelectedYears] = useState<number[]>(years);

	const { updatefiltered } = useActivity();

	function handleCheckboxChange(year: number) {
		if (selectedYears.includes(year)) {
			setSelectedYears(selectedYears.filter((y) => y !== year));
		} else {
			setSelectedYears([...selectedYears, year]);
		}
	}

	useEffect(() => {
		const newFiltered = filterByYear(activities, selectedYears);
		updatefiltered(newFiltered);
	}, [activities, selectedYears]);

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
				<Accordion type="single" collapsible defaultValue="year">
					<AccordionItem value="year" className="ml-3">
						<AccordionTrigger>
							<SheetHeader className="text-xl ">Year:</SheetHeader>
						</AccordionTrigger>
						<AccordionContent>
							<SheetDescription>
								<div className="flex flex-col gap-y-5 ">
									{years.map((year) => (
										<div className="flex flex-row items-center gap-x-2">
											<Checkbox
												id={String(year)}
												checked={selectedYears.includes(year)}
												onCheckedChange={() => handleCheckboxChange(year)}
											/>
											<label className="text-md " htmlFor={String(year)}>
												{year}
											</label>
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
