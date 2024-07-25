"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { FullActivity } from "@/lib/types";

//define type
type ActivityContextType = {
	filtered: FullActivity[];
	updatefiltered: (newfiltered: FullActivity[]) => void;
	selectedLine: number | undefined;
	updateSelectedLine: (newSelectedLine: number | undefined) => void;
};

//create context
const ActivityContext = createContext<ActivityContextType | undefined>(
	undefined
);

//create provider- wraps entire app
export const ActivityProvider = ({ children }: { children: ReactNode }) => {
	const [filtered, setfiltered] = useState<FullActivity[]>([]);
	const [selectedLine, setSelectedLine] = useState<number | undefined>(
		undefined
	);

	const updatefiltered = (newfiltered: FullActivity[]) => {
		setfiltered(newfiltered);
	};
	const updateSelectedLine = (newSelectedLine: number | undefined) => {
		setSelectedLine(newSelectedLine);
	};

	return (
		<ActivityContext.Provider
			value={{ filtered, selectedLine, updatefiltered, updateSelectedLine }}
		>
			{children}
		</ActivityContext.Provider>
	);
};

//custom hook to use context
export const useActivity = () => {
	const context = useContext(ActivityContext);
	if (context === undefined) {
		throw new Error("useActivity must be used within an ActivityProvider");
	}
	return context;
};
