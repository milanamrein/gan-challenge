const { Kafka } = require('kafkajs');

// Configuration class for Kafka (Producer, Consumer)
class KafkaConfig {
    constructor() {
        this.kafka = new Kafka({
            clientId: process.env.KAFKA_CLIENT_ID,
            brokers: [process.env.KAFKA_BOOTSTRAP_SERVER]
        });
        this.producer = this.kafka.producer({
            transactionTimeout: 30000
        });
        this.consumer = this.kafka.consumer({ groupId: "api-group" });
    }

    async produce(topic, messages) {
        try {
            await this.producer.connect();
            console.log(`Sending messages=${JSON.stringify(messages)} to topic=${topic}`);
            await this.producer.send({
                topic,
                messages
            })
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            console.log('Disconnecting from Kafka server...');
            await this.producer.disconnect();
        }
    }

    async consume(topic, callback) {
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({ topic: topic, fromBeginning: true });
            await this.consumer.run({
              eachMessage: async ({ topic, partition, message }) => {
                console.log(`Consuming message=${JSON.stringify(message)} on topic=${topic}`);
                const value = JSON.parse(message.value);
                callback(value);
              },
            });
          } catch (error) {
            console.error(error);
            throw error;
          }
    }
}

module.exports = KafkaConfig;
