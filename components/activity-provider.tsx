"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { FullActivity } from "@/lib/types";

type ActivityContextType = {
	filtered: FullActivity[];
	updatefiltered: (newfiltered: FullActivity[]) => void;
};

const ActivityContext = createContext<ActivityContextType | undefined>(
	undefined
);

export const ActivityProvider = ({ children }: { children: ReactNode }) => {
	const [filtered, setfiltered] = useState<FullActivity[]>([]);

	const updatefiltered = (newfiltered: FullActivity[]) => {
		setfiltered(newfiltered);
	};

	return (
		<ActivityContext.Provider value={{ filtered, updatefiltered }}>
			{children}
		</ActivityContext.Provider>
	);
};

export const useActivity = () => {
	const context = useContext(ActivityContext);
	if (context === undefined) {
		throw new Error("useActivity must be used within an ActivityProvider");
	}
	return context;
};
