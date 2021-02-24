const mongoose = require('mongoose');

const RecipientSchema = new mongoose.Schema({
    recipientId: {
        type: String,
        unique: true,
        required: true
    },
    ingredientType: {
        type: String,
        required: true
    },
    content: {
        type: {
            a: String,
            b: String,
            c: String
        },
        required: true
    },
    temperature: {
        type: Array,
        default: []
    },
    humidity: {
        type: Array,
        default: []
    },
    weight: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('Recipient', RecipientSchema);
