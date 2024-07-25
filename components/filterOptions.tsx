import { useState, useEffect } from "react";
import { useActivity } from "./activity-provider"; //context
import {
	getAllYears,
	filterByYear,
	filterByDistance,
	filterByDuration,
	filterBySpeed,
} from "@/lib/filterUtils"; //utils
import { FullActivity } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
//shadcn ui
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetDescription,
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

interface FilterOptionsProps {
	activities: FullActivity[];
}

export default function FilterOptions({ activities }: FilterOptionsProps) {
	const years = getAllYears(activities);
	const [filteredResults, setFilteredResults] = useState<FullActivity[]>([]);
	const [selectedYears, setSelectedYears] = useState<number[]>(years);
	const [selectedDistance, setSelectedDistance] = useState<number[]>([
		0, 99_999,
	]);
	const [selectedDuration, setSelectedDuration] = useState<number[]>([
		0, 21600,
	]);
	const [selectedSpeed, setSelectedSpeed] = useState<number[]>([0, 11.11]);

	const { updatefiltered } = useActivity(); //context updater

	function handleCheckboxChange(year: number) {
		if (selectedYears.includes(year)) {
			setSelectedYears(selectedYears.filter((y) => y !== year));
		} else {
			setSelectedYears([...selectedYears, year]);
		}
	}

	function distanceSliderChange(values: number[]) {
		setSelectedDistance(values);
	}

	function durationSliderChange(values: number[]) {
		setSelectedDuration(values);
	}

	function speedSliderChange(values: number[]) {
		setSelectedSpeed(values);
	}

	function resetFilters() {
		setSelectedYears(years);
		setSelectedDistance([0, 99_999]);
		setSelectedDuration([0, 21600]);
		setSelectedSpeed([0, 11.11]);
	}

	//apply filters one at a time to full activity list then update context
	useEffect(() => {
		let newFiltered = filterByYear(activities, selectedYears);
		newFiltered = filterByDistance(newFiltered, selectedDistance);
		newFiltered = filterByDuration(newFiltered, selectedDuration);
		newFiltered = filterBySpeed(newFiltered, selectedSpeed);
		setFilteredResults(newFiltered);
		updatefiltered(newFiltered);
	}, [
		activities,
		selectedYears,
		selectedDistance,
		selectedDuration,
		selectedSpeed,
	]);

	return (
		<Sheet modal={false}>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon">
					<FilterIcon className="h-[1.2rem] w-[1.2rem]" />
				</Button>
			</SheetTrigger>

			<SheetContent side="left" onOpenAutoFocus={(e) => e.preventDefault()}>
				{/* Prevent focus from moving to filter btn on close */}
				<SheetTitle className="flex justify-between pr-10">
					<div className="text-2xl font-bold">Filters</div>
					<Button onClick={resetFilters}>Reset Filters</Button>
				</SheetTitle>
				<SheetDescription></SheetDescription>
				<Accordion
					type="multiple"
					defaultValue={["year", "distance", "duration", "speed"]}
				>
					{/* year filter */}
					<AccordionItem value="year">
						<AccordionTrigger>
							<SheetHeader className="text-xl ">Year:</SheetHeader>
						</AccordionTrigger>

						<AccordionContent>
							<div className="flex flex-col gap-y-5 ml-3">
								{years.map((year) => (
									<div
										key={year}
										className="flex flex-row items-center gap-x-2"
									>
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
						</AccordionContent>
					</AccordionItem>
					{/* distance filter */}
					<AccordionItem value="distance">
						<AccordionTrigger>
							<SheetHeader className="text-xl ">Distance:</SheetHeader>
						</AccordionTrigger>
						<AccordionContent>
							<div className="ml-3 mb-3">
								<div className="text-base mb-3">
									{(selectedDistance[0] / 1000).toFixed(1)}km -{" "}
									{(selectedDistance[1] / 1000).toFixed(1)}km
								</div>
								<Slider
									value={selectedDistance}
									minStepsBetweenThumbs={500}
									max={100_000}
									min={0}
									step={1}
									onValueChange={distanceSliderChange}
								/>
							</div>
						</AccordionContent>
					</AccordionItem>
					{/* Duration filter */}
					<AccordionItem value="duration">
						<AccordionTrigger>
							<SheetHeader className="text-xl ">Duration:</SheetHeader>
						</AccordionTrigger>
						<AccordionContent>
							<div className="ml-3 mb-3">
								<div className="text-base mb-3">
									{(selectedDuration[0] / 3600).toFixed(1)}h -{" "}
									{(selectedDuration[1] / 3600).toFixed(1)}h
								</div>

								<Slider
									value={selectedDuration}
									minStepsBetweenThumbs={60}
									max={21600}
									min={0}
									step={1}
									onValueChange={durationSliderChange}
								/>
							</div>
						</AccordionContent>
					</AccordionItem>
					{/* speed filter */}
					<AccordionItem value="speed">
						<AccordionTrigger>
							<SheetHeader className="text-xl ">Avg. Speed:</SheetHeader>
						</AccordionTrigger>
						<AccordionContent>
							<div className="ml-3 mb-3">
								<div className="text-base mb-3">
									{(selectedSpeed[0] * 3.6).toFixed(1)}km/h -{" "}
									{(selectedSpeed[1] * 3.6).toFixed(1)}km/h
								</div>

								<Slider
									value={selectedSpeed}
									minStepsBetweenThumbs={1}
									max={11.11}
									min={0}
									step={0.0276}
									onValueChange={speedSliderChange}
								/>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
				<div className="text-2xl mt-4 font-semi-bold">
					<span>{filteredResults.length}</span> of {activities.length} Results
				</div>
			</SheetContent>
		</Sheet>
	);
}
