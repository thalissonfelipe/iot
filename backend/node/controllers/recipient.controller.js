const config = require('../config');
const cayenneClient = require('../subscriber');
const Recipient = require('../models/Recipient');

class RecipientController {
    async index(req, res) {
        try {
            const response = await Recipient.aggregate([{
                $project: {
                    _id: 0,
                    recipientId: 1,
                    ingredientType: 1,
                    content: 1,
                    temperature: { $arrayElemAt: ['$temperature', -1] },
                    humidity: { $arrayElemAt: ['$humidity', -1] },
                    weight: { $arrayElemAt: ['$weight', -1] }
                }
            }]);

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
                content
            } = req.body;

            // TODO: add validation
            // verify if recipient already exists
            // validate body
            const recipient = new Recipient({
                recipientId,
                ingredientType,
                content
            });

            await recipient.save();

            const topics = [
                `v1/${config.getMQTTUsername()}/things/${recipientId}/data/1`,
                `v1/${config.getMQTTUsername()}/things/${recipientId}/data/2`,
                `v1/${config.getMQTTUsername()}/things/${recipientId}/data/3`
            ];

            topics.forEach(topic => cayenneClient.subscribe(topic));

            return res.status(201).send('Recipient created.');
        } catch (error) {
            console.log(error);
            return res.status(500).send('Internal Error.');
        }
    }
}

module.exports = new RecipientController();
