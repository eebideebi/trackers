async function getIP() {
    const response = await fetch('https://ipinfo.io/json')
        .then(response => response.json())
        .catch(err => {
            console.error('Fetch error: failed to retrieve IP address.');
            console.error(err);
            return undefined;
        });
    console.log(response);
    return response
}

async function main() {
    const ipinfo = await getIP();
    if (!ipinfo) {
        const ipElement = document.querySelector('#ip-address');
        ipElement.textContent = 'Failed to fetch IP address';
        ipElement.color = 'red';
        return;
    }
    if (!ipinfo) { return; }

    // IP Address:
    document.querySelector('#ip-address').textContent = ipinfo.ip;

    // Time zone
    document.querySelector('#time-zone').textContent = ipinfo.timezone.replaceAll('_', ' ');

    // Region:
    document.querySelector('#text-location').textContent = `${ipinfo.city}, ${ipinfo.region}, ${ipinfo.country.toUpperCase()}`;

    // Location (map):
    const mapElement = document.querySelector('#osm-map');
    console.log(mapElement)

    const map = L.map(mapElement);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    // Target's GPS coordinates.
    const target = L.latLng(...ipinfo.loc.split(','));

    // Set map's center to target with zoom 14.
    map.setView(target, 12);

    // Place a marker on the same location.
    L.marker(target).addTo(map);
}

document.addEventListener("DOMContentLoaded", main);