"use client";
import { useEffect } from "react";
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
	return <FilterOptions activities={activities} />;
}
