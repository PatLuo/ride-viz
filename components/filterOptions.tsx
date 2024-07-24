import { useActivity } from "./activity-provider";
import { useState, useEffect } from "react";
import { FullActivity } from "@/lib/types";
import { getAllYears } from "@/lib/filterUtils";

interface FilterOptionsProps {
	activities: FullActivity[];
}

export default function FilterOptions({ activities }: FilterOptionsProps) {
	const [filteredActivities, setFilteredActivities] = useState(activities);
	const { updatefiltered } = useActivity();
	console.log("activities", activities);

	useEffect(() => {
		updatefiltered(activities); //initialize with all activities
	}, []);
	return <div>filter</div>;
}
