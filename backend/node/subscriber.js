const fs = require('fs');
const path = require('path');
const mqtt = require('mqtt');

const configFile = fs.readFileSync(path.join('..', 'config.json'));
const config = JSON.parse(configFile);

const client = mqtt.connect(`mqtt://${config.mqtt.address}`, {
    username: config.mqtt.username,
    password: config.mqtt.password,
    clientId: 'b1182640-7095-11eb-a2e4-b32ea624e442'
});

const topic = `v1/${config.mqtt.username}/things/${config.mqtt.recipients[0]}/data/1`;

client.on('connect', () => {
    console.log('connected');
    client.subscribe(topic);
});

client.on('message', (topic, message) => {
    console.log(topic, message.toString());
})

module.exports = client;
