const Area = require('../models/areaModel');
const City = require('../models/cityModel');

module.exports = async (areaId, from, distance) => {
    try {
        console.log(`Calculating area of ${from} within ${distance}`);
        const city = await City.findOne({ guid: from });
        if (!city) {
            throw new Error(`No city found with given GUID=${from}`);
        }

        const cities = await City.find({
            location: { 
                $geoWithin: { 
                    $centerSphere: [
                        [city.longitude, city.latitude], 
                        (distance / parseInt(process.env.EARTH_RADIUS_KM)) // km to radius
                    ]
                } 
            },
            guid: { $ne: city.guid } // exclude 'from' city
        });
        console.log(`Number of cities nearby ${cities.length}`);

        console.log(`Creating area result with ID=${areaId}`);
        await Area.create({
            areaId,
            from: city.guid,
            distance,
            unit: 'km',
            cities
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}