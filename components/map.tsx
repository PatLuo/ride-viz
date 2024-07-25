"use client";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
const { BaseLayer } = LayersControl;

import "leaflet/dist/leaflet.css";
import { useTheme } from "next-themes"; //to check theme and modify map buttons
import PolylineLayer from "./polylineLayer";

export default function Map() {
	const { resolvedTheme } = useTheme();
	const isDarkMode = resolvedTheme === "dark";

	return (
		<MapContainer
			style={{ height: "91vh", width: "98vw", zIndex: 0 }}
			center={[45.424721, -75.695]}
			zoom={13}
		>
			<LayersControl position="bottomleft">
				<BaseLayer checked={!isDarkMode} name="Light">
					<TileLayer
						attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
						url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
						maxZoom={20}
					/>
				</BaseLayer>
				<BaseLayer checked={isDarkMode} name="Dark">
					<TileLayer
						attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
						url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
						maxZoom={20}
					/>
				</BaseLayer>
				<BaseLayer checked={false} name="Satellite">
					<TileLayer
						attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
						url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
					/>
				</BaseLayer>
			</LayersControl>
			<PolylineLayer />
		</MapContainer>
	);
}
