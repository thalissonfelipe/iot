const mqtt = require('mqtt');
const config = require('./config');
const Recipient = require('./models/Recipient');

const client = mqtt.connect(config.getMQTTAddress(), {
    username: config.getMQTTUsername(),
    password: config.getMQTTPassword()
});

client.on('connect', async () => {
    console.log('Connected with cayenne broker!');

    const recipients = await Recipient.find({});

    if (recipients) {
        recipients.forEach(recipient => {
            client.subscribe(`v1/${config.getMQTTUsername()}/things/${recipient.recipientId}/data/1`);
            client.subscribe(`v1/${config.getMQTTUsername()}/things/${recipient.recipientId}/data/2`);
            client.subscribe(`v1/${config.getMQTTUsername()}/things/${recipient.recipientId}/data/3`);
            client.subscribe(`v1/${config.getMQTTUsername()}/things/${recipient.recipientId}/data/4`);
            client.subscribe(`v1/${config.getMQTTUsername()}/things/${recipient.recipientId}/data/5`);
            client.subscribe(`v1/${config.getMQTTUsername()}/things/${recipient.recipientId}/data/6`);
        });
    }
});

client.on('message', async (topic, message) => {
    const recipientId = topic.split('/')[3];
    const channelId = topic.split('/')[5];
    const value = parseFloat(message.toString());
    let doc;

    if (channelId == 1) {
        doc = { $push: { temperature: value } }
    } else if (channelId == 2) {
        doc = { $push: { humidity: value } }
    } else if (channelId == 3) {
        doc = { $push: { weight1: value } }
    } else if (channelId == 4) {
        doc = { $push: { weight2: value } }
    } else if (channelId == 5) {
        doc = { $push: { weight3: value } }
    } else if (channelId == 6) {
        doc = { $push: { priority: value } }
    }

    await Recipient.updateOne({ recipientId }, doc, { upsert: true })
});

module.exports = client;
