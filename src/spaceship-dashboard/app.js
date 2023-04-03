const express = require('express');
const Sensor = require('./sensor');
const { createProducer, createConsumer } = require('./kafka');
const app = express();

app.set('view engine', 'ejs');

const oxygenSensor = new Sensor('oxygen', 80, 100);
const nitrogenSensor = new Sensor('nitrogen', 0, 20);
const carbonDioxideSensor = new Sensor('carbonDioxide', 0, 2);
const matterSensor = new Sensor('matter', 30, 70);
const antimatterSensor = new Sensor('antimatter', 30, 70);

const sensorData = {
  lifeSupport: {
    oxygen: null,
    nitrogen: null,
    carbonDioxide: null,
  },
  propulsion: {
    matter: null,
    antimatter: null,
  },
};

const sendSensorData = async (producer) => {
  setInterval(async () => {
    await producer.send({
      topic: 'spaceship-dashboard',
      messages: [
        { key: 'oxygen', value: oxygenSensor.read().toString() },
        { key: 'nitrogen', value: nitrogenSensor.read().toString() },
        { key: 'carbonDioxide', value: carbonDioxideSensor.read().toString() },
        { key: 'matter', value: matterSensor.read().toString() },
        { key: 'antimatter', value: antimatterSensor.read().toString() },
      ],
    });
  }, 1000);
};

const onMessageReceived = ({ message }) => {
  const key = message.key.toString();
  const value = parseInt(message.value.toString(), 10);
  const sensorMap = {
    oxygen: 'lifeSupport',
    nitrogen: 'lifeSupport',
    carbonDioxide: 'lifeSupport',
    matter: 'propulsion',
    antimatter: 'propulsion',
  };
  sensorData[sensorMap[key]][key] = value;
};

app.get('/', (req, res) => {
  res.render('main');
});

app.get('/api/dashboard-data', (req, res) => {
  res.json(sensorData);
});

const startKafka = async () => {
  const producer = await createProducer();
  await sendSensorData(producer);
  await createConsumer('spaceship-dashboard', onMessageReceived);
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await startKafka();
});
