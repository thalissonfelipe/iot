const fs = require('fs');
const path = require('path');
const mqtt = require('mqtt');
const Recipient = require('./models/Recipient');

const configFile = fs.readFileSync(path.join('..', 'config.json'));
const config = JSON.parse(configFile);

const client = mqtt.connect(`mqtt://${config.mqtt.address}`, {
    username: config.mqtt.username,
    password: config.mqtt.password
});

const topics = config.mqtt.recipients.map(id => ([
    `v1/${config.mqtt.username}/things/${id}/data/1`,
    `v1/${config.mqtt.username}/things/${id}/data/2`,
    `v1/${config.mqtt.username}/things/${id}/data/3`
]));

client.on('connect', () => {
    console.log('Connected with cayenne broker!');
    topics.forEach(topic => {
        topic.forEach(channel => client.subscribe(channel));
    });
});

client.on('message', async (topic, message) => {
    const id = topic.split('/')[3];
    const channelId = topic.split('/')[5];
    const value = parseFloat(message.toString());
    let doc;

    if (channelId == 1) {
        doc = { $push: { temperature: value } }
    } else if (channelId == 2) {
        doc = { $push: { humidity: value } }
    } else {
        doc = { $push: { weight: value } }
    }

    await Recipient.updateOne({ recipientId: id }, doc, { upsert: true })
});
