const KafkaConfig = require('../config/kafkaConfig');
const Area = require('../models/areaModel');
const catchAsync = require('../utils/catchAsync');

exports.getAreaOfCityWithin = catchAsync(async (req, res, next) => {
    const { from, distance } = req.query;
    console.log(`Getting cities within distance=${distance} from=${from}`);
    // hard-coded in index.js, otherwise could use e.g. slugify to create GUID
    const areaId = '2152f96f-50c7-4d76-9e18-f7033bd14428';
    const messages = [{
        key: `key-${areaId}`,
        value: JSON.stringify({
            areaId,
            from,
            distance
        })
    }];
    const kafka = new KafkaConfig();
    kafka.produce(process.env.AREA_TOPIC, messages);

    return res.status(202).send({
        resultsUrl: `http://${process.env.HOST}:${process.env.PORT}/area-result/${areaId}`
    });
});

exports.getAreaResult = catchAsync(async (req, res, next) => {
    const { areaId } = req.params;
    console.log(`Getting area result with ID=${areaId}`);
    const area = await Area.findOne({ areaId: areaId });
    if (!area) { // Area not yet found
        return res.status(202).send();
    }

    return res.status(200).send({
        cities: area.cities
    });
});