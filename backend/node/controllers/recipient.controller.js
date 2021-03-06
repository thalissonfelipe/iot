const config = require('../config');
const User = require('../models/User');
const cayenneClient = require('../subscriber');
const Recipient = require('../models/Recipient');

class RecipientController {
    async index(req, res) {
        try {
            const userId = (await User.findOne({ username: req.query.username }))._id;

            const response = await Recipient.aggregate([
                {
                    $match: { userId }
                }, {
                    $project: {
                        _id: 0,
                        recipientId: 1,
                        ingredientType: 1,
                        content: 1,
                        temperature: { $arrayElemAt: ['$temperature', -1] },
                        humidity: { $arrayElemAt: ['$humidity', -1] },
                        weight1: { $arrayElemAt: ['$weight1', -1] },
                        weight2: { $arrayElemAt: ['$weight2', -1] },
                        weight3: { $arrayElemAt: ['$weight3', -1] },
                        priority: { $arrayElemAt: ['$priority', -1] }
                    }
                }
            ]);

            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send('Internal Error.');
        }
    }

    async create(req, res) {
        try {
            const {
                recipientId,
                ingredientType,
                content,
                username
            } = req.body;

            const userId = (await User.findOne({ username }))._id;

            await Recipient.create({
                recipientId,
                userId,
                ingredientType,
                content
            });

            const topics = [
                `v1/${config.getMQTTUsername()}/things/${recipientId}/data/1`,
                `v1/${config.getMQTTUsername()}/things/${recipientId}/data/2`,
                `v1/${config.getMQTTUsername()}/things/${recipientId}/data/3`,
                `v1/${config.getMQTTUsername()}/things/${recipientId}/data/4`,
                `v1/${config.getMQTTUsername()}/things/${recipientId}/data/5`,
                `v1/${config.getMQTTUsername()}/things/${recipientId}/data/6`,
            ];

            topics.forEach(topic => cayenneClient.subscribe(topic));

            return res.status(201).send('Recipient created.');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Internal Error.');
        }
    }

    async update(req, res) {
        try {
            await Recipient.findOneAndUpdate({ recipientId: req.params.id }, req.body);

            return res.status(204).send('Recipient updated.');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Internal Error.');
        }
    }
}

module.exports = new RecipientController();
