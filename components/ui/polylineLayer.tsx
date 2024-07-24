import { Polyline, useMap } from "react-leaflet";
import { useState } from "react";
import { useTheme } from "next-themes"; //to check theme and modify map buttons

interface PolylineLayerProps {
	polylines: [number, number][][];
}

type lineData = [number, number][];

export default function PolylineLayer({ polylines }: PolylineLayerProps) {
	const map = useMap();
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [selectedIndex, setselectedIndex] = useState<number | null>(null);

	const { resolvedTheme } = useTheme();
	const isDarkMode = resolvedTheme === "dark";

	const handleMouseOver = (polyline: any, i: number) => {
		setHoveredIndex(i);
		polyline.bringToFront();
	};

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
									color: isDarkMode ? "hsl(24.6,95%,90%)" : "hsl(24.6,95%,25%)",
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
						mouseout() {
							setHoveredIndex(null);
						},
						click() {
							map.fitBounds(polyline);
							setselectedIndex(i);
						},
					}}
				/>
			))}
		</>
	);
}
