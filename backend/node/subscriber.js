const mqtt = require('mqtt');
const config = require('./config');
const Recipient = require('./models/Recipient');

const client = mqtt.connect(config.getMQTTAddress(), {
    username: config.getMQTTUsername(),
    password: config.getMQTTPassword()
});

client.on('connect', () => console.log('Connected with cayenne broker!'));

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

module.exports = client;
