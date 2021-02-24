const Recipient = require('../models/Recipient');

class RecipientController {
    async show(req, res) {
        try {
            const response = await Recipient.aggregate([{
                $project: {
                    _id: 0,
                    recipientId: 1,
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
}

module.exports = new RecipientController();
