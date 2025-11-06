import "babel-polyfill";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
	addOffset,
	addTileLayer,
	getAddress,
	validateIPaddress,
} from "./helpers";

const icon = new URL('../images/icon-location.svg', import.meta.url).href;

const myIcon = L.icon({
	iconUrl: icon,
	iconSize: [30, 40],
	iconAnchor: [22, 94],
	popupAnchor: [-3, -76],
});

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector("button");

const ipInfo = document.getElementById("ip");
const locationInfo = document.getElementById("location");
const timezoneInfo = document.getElementById("timezone");
const ispInfo = document.getElementById("isp");

btn.addEventListener("click", () => {
	if (validateIPaddress(ipInput.value)) {
		getAddress(ipInput.value).then(({ data }) => setMapView(data));
	}
});

ipInput.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		if (validateIPaddress(ipInput.value))
			getAddress(ipInput.value).then(({ data }) => setMapView(data));
	}
});

const mapArea = document.querySelector(".map");
const map = L.map(mapArea, {
	center: [51.505, -0.09],
	zoom: 13,
	zoomControl: false,
});

addTileLayer(map);

document.addEventListener("DOMContentLoaded", () => {
	getAddress("102.22.22.1").then(({ data }) => setMapView(data));
});

function setMapView(mapData) {
	console.log(mapData);
	const lat = mapData.location.lat;
	const lng = mapData.location.lng;

	map.setView([lat, lng]);
	ipInfo.innerText = mapData.ip;
	locationInfo.innerText =
		mapData.location.country + " " + mapData.location.region;
	timezoneInfo.innerText = mapData.location.timezone;
	ispInfo.innerText = mapData.isp;

	L.marker([lat, lng], { icon: myIcon }).addTo(map);
	matchMedia("(max-width: 1024px)").matches && addOffset(map);
}
