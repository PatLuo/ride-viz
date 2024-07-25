import { useActivity } from "./activity-provider";
import { useState, useEffect } from "react";
import { FullActivity } from "@/lib/types";
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
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Filter as FilterIcon } from "lucide-react";
import { getAllYears, filterByYear, filterByDistance } from "@/lib/filterUtils";

interface FilterOptionsProps {
	activities: FullActivity[];
}

export default function FilterOptions({ activities }: FilterOptionsProps) {
	const years = getAllYears(activities);

	const [selectedYears, setSelectedYears] = useState<number[]>(years);
	const [selectedDistance, setSelectedDistance] = useState<number[]>([
		0, 10000,
	]);
	const { updatefiltered } = useActivity();

	function handleCheckboxChange(year: number) {
		if (selectedYears.includes(year)) {
			setSelectedYears(selectedYears.filter((y) => y !== year));
		} else {
			setSelectedYears([...selectedYears, year]);
		}
	}

	function handleSliderChange(values: number[]) {
		setSelectedDistance(values);
	}

	useEffect(() => {
		let newFiltered = filterByYear(activities, selectedYears);
		newFiltered = filterByDistance(newFiltered, selectedDistance);
		updatefiltered(newFiltered);
	}, [activities, selectedYears, selectedDistance]);

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
				<Accordion type="multiple" defaultValue={["year", "distance"]}>
					{/* year filter */}
					<AccordionItem value="year">
						<AccordionTrigger>
							<SheetHeader className="text-xl ">Year:</SheetHeader>
						</AccordionTrigger>
						<AccordionContent>
							<SheetDescription className="flex flex-col gap-y-5 ml-3">
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
							</SheetDescription>
						</AccordionContent>
					</AccordionItem>
					{/* distance filter */}
					<AccordionItem value="distance">
						<AccordionTrigger>
							<SheetHeader className="text-xl ">Distance:</SheetHeader>
						</AccordionTrigger>
						<AccordionContent>
							<SheetDescription className="ml-3 mb-3">
								<h2 className="text-base mb-3">
									{(selectedDistance[0] / 1000).toFixed(1)}km -{" "}
									{(selectedDistance[1] / 1000).toFixed(1)}km
								</h2>

								<Slider
									defaultValue={[0, 99_999]}
									minStepsBetweenThumbs={5000}
									max={100_000}
									min={0}
									step={1}
									onValueChange={handleSliderChange}
								/>
							</SheetDescription>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</SheetContent>
		</Sheet>
	);
}
