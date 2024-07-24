import { Polyline, useMap, useMapEvents } from "react-leaflet";
import { useState } from "react";
import { useTheme } from "next-themes"; //to check theme and modify map buttons
import polyline from "@mapbox/polyline"; //to decode polyline data

import { useActivity } from "./activity-provider";

export default function PolylineLayer() {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [selectedIndex, setselectedIndex] = useState<number | null>(null);

	const { resolvedTheme } = useTheme();
	const isDarkMode = resolvedTheme === "dark";

	const map = useMap();

	//decode activity data into polylines
	const { filtered } = useActivity();
	const polylines: [number, number][][] = filtered.map((activity) => {
		return polyline.decode(activity.map.summary_polyline);
	});

	const handleMouseOver = (polyline: any, i: number) => {
		setHoveredIndex(i);
		polyline.bringToFront(); //
	};

	const handleMouseOut = (polyline: any, i: number) => {
		setHoveredIndex(null);
		if (selectedIndex == i) return; // don't send polyline to back if it's selected
		setTimeout(() => {
			// let animation finish before sending polyline to back
			polyline.bringToBack();
		}, 200);
	};

	const handleMouseClick = (polyline: any, i: number) => {
		polyline.bringToFront();
		setselectedIndex(i);
		setHoveredIndex(i);
	};

	const handleMapClick = () => {
		setselectedIndex(null);
		setHoveredIndex(null);
	};

	useMapEvents({
		click(e) {
			// Only trigger map click if not clicking on a polyline
			if (e.originalEvent.target instanceof SVGElement) {
				if (e.originalEvent.target.closest(".leaflet-interactive")) {
					return; // if click is on a polyline, do nothing
				}
			}
			handleMapClick();
		},
	});

	return (
		<>
			{polylines.map((polyline, i) => (
				<Polyline
					className="polyline"
					positions={polyline}
					key={i}
					pathOptions={
						selectedIndex == i || hoveredIndex == i
							? {
									color: isDarkMode ? "hsl(24.6,95%,90%)" : "hsl(24.6,95%,15%)",
									weight: 7,
									opacity: 1,
							  }
							: {
									color: "hsl(24.6,95%,53.1%)",
									weight: 3,
									opacity: 0.3,
							  }
					}
					eventHandlers={{
						mouseover(e) {
							handleMouseOver(e.target, i);
						},
						mouseout(e) {
							handleMouseOut(e.target, i);
						},
						click(e) {
							handleMouseClick(e.target, i);
							map.fitBounds(polyline);
						},
					}}
				/>
			))}
		</>
	);
}
