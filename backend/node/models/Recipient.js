const mongoose = require('mongoose');

const RecipientSchema = new mongoose.Schema({
    recipientId: {
        type: String,
        unique: true,
        required: true
    },
    temperature: [],
    humidty: [],
    weight: []
});

module.exports = mongoose.model('Recipient', RecipientSchema);
