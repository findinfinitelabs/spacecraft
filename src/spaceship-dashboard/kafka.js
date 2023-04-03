const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'spaceship-dashboard',
  brokers: ['localhost:9092'],
});

const createProducer = async () => {
  const producer = kafka.producer();
  await producer.connect();
  return producer;
};

const createConsumer = async (topic, onMessageReceived) => {
  const consumer = kafka.consumer({ groupId: 'spaceship-dashboard-group' });
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });
  await consumer.run({ eachMessage: onMessageReceived });
};

module.exports = { createProducer, createConsumer };
