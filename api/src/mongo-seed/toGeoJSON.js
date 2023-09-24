const addresses = require('./addresses.json');
const fs = require('fs');

// adds GeoJSON property to addresses
function toGeoJSON() {
    addresses.forEach(address => {
        address.location = [address.longitude, address.latitude];
    });
    fs.writeFileSync(process.argv[2], JSON.stringify(addresses));
}

toGeoJSON();