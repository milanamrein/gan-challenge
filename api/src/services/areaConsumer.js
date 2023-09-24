const calculateAreaOfCityWithin = require('./areaService');
const KafkaConfig = require('../config/kafkaConfig');

// function to initialize Kafka Consumer
module.exports = async () => {
    try {
        console.log('Initializing consumer...');
        const kafka = new KafkaConfig();
        kafka.consume(process.env.AREA_TOPIC, (message) => {
            calculateAreaOfCityWithin(message.areaId, message.from, message.distance);
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}