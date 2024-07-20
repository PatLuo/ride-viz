"use client";

import {
	MapContainer,
	TileLayer,
	Polyline,
	LayersControl,
	useMap,
} from "react-leaflet";

const { BaseLayer } = LayersControl;

import "leaflet/dist/leaflet.css";
import { FullActivity } from "@/lib/types";
import polyline from "@mapbox/polyline";
import { useTheme } from "next-themes";

interface MiniMapProps {
	activity: FullActivity;
}

export default function MiniMap({ activity }: MiniMapProps) {
	const { resolvedTheme } = useTheme(); //change map theme based on system theme
	const isDarkMode = resolvedTheme === "dark";

	const polylineData: [number, number][] = polyline.decode(
		activity.map.summary_polyline
	);

	return (
		<MapContainer
			style={{ height: "100%", width: "100%", zIndex: 0 }}
			className="dark:bg-gray-800"
			bounds={polylineData}
		>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			<LayersControl position="bottomleft">
				<BaseLayer checked={!isDarkMode} name="Light">
					<TileLayer
						url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
						maxZoom={20}
					/>
				</BaseLayer>
				<BaseLayer checked={isDarkMode} name="Dark">
					<TileLayer
						url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
						maxZoom={20}
					/>
				</BaseLayer>
			</LayersControl>
			<Polyline
				positions={polylineData}
				pathOptions={{ color: "hsl(24.6, 95%, 53.1%)" }}
			></Polyline>
		</MapContainer>
	);
}
