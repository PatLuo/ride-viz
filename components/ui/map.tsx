"use client";

import {
	MapContainer,
	TileLayer,
	Polyline,
	LayersControl,
} from "react-leaflet";

const { BaseLayer } = LayersControl;

import "leaflet/dist/leaflet.css";
import { FullActivity } from "@/lib/types";
import polyline from "@mapbox/polyline";

interface MapProps {
	activities: FullActivity[];
}

export default function Map({ activities }: MapProps) {
	const polylines: [number, number][][] = activities.map((activity) => {
		return polyline.decode(activity.map.summary_polyline);
	});

	return (
		<MapContainer
			style={{ height: "90vh", width: "98vw", zIndex: 0 }}
			center={[45.424721, -75.695]}
			zoom={13}
			className="dark:bg-gray-800"
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<LayersControl position="bottomleft">
				<BaseLayer name="Light">
					<TileLayer
						attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
						url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
						maxZoom={20}
					/>
				</BaseLayer>
				<BaseLayer checked name="Dark">
					<TileLayer
						attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
						url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
						maxZoom={20}
					/>
				</BaseLayer>
				<BaseLayer name="Colorful">
					<TileLayer
						attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
						url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
						maxZoom={20}
					/>
				</BaseLayer>
				<BaseLayer name="Satellite">
					<TileLayer
						attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
						url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
					/>
				</BaseLayer>
			</LayersControl>
			{polylines.map((polyline, i) => (
				<Polyline
					className="opacity-50"
					key={i}
					positions={polyline}
					pathOptions={{ color: "hsl(24.6, 95%, 53.1%)" }}
				></Polyline>
			))}
		</MapContainer>
	);
}
