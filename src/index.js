import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import axios from 'axios';

import icon from '../images/icon-location.svg'

var myIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
});

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

const ipInfo = document.getElementById('ip')
const locationInfo = document.getElementById('location')
const timezoneInfo = document.getElementById('timezone')
const ispInfo = document.getElementById('isp')

btn.addEventListener('click', () => {
    if (ValidateIPaddress(ipInput.value)) {
        getAddress(ipInput.value);
    }
})

ipInfo.addEventListener('keydown', (e) => {
    if (e.target.key === 'Enter') {
        if (ValidateIPaddress(ipInput.value)) getAddress(ipInput.value);
    }
})

const mapArea = document.querySelector('.map');
const map = L.map(mapArea, {
    center: [51.505, -0.09],
    zoom: 13,
    zoomControl: false
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: `Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
        Coded by <a href="#">Mikhail Nepomnyashchiy</a>.`,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

function getAddress(ip = '8.8.8.8') {
    const url = `https://geo.ipify.org/api/v1?apiKey=at_RGFJlbsE0JO6WacpYnQZDCsk3gMNy&ipAddress=${ip}`;

    axios.get(url).then(({data}) => {
        console.log(data)

        const lat = data.location.lat;
        const lng = data.location.lng;

        map.setView([lat, lng])
        ipInfo.innerText = ip;
        locationInfo.innerText = data.location.country + ' ' + data.location.region;
        timezoneInfo.innerText = data.location.timezone;
        ispInfo.innerText = data.isp;

        L.marker([lat, lng], {icon: myIcon}).addTo(map);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    getAddress('102.22.22.1')
})

function ValidateIPaddress(ipaddress) {  
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
    return (true)  
  }  
  alert("You have entered an invalid IP address!")  
  return (false)  
}  