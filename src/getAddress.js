import axios from 'axios';

function getAddress(ip = '8.8.8.8') {
    const url = `https://geo.ipify.org/api/v1?apiKey=at_RGFJlbsE0JO6WacpYnQZDCsk3gMNy&ipAddress=${ip}`;

    return axios.get(url).then(console.log);
}

export {getAddress}