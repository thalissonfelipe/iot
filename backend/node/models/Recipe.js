const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    category: String,
    url: String,
    name: String,
    image_url: String,
    preparation_time: String,
    portions: String,
    cooking_time: String,
    ingredients: Array,
    instructions: Array,
    score: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Recipe', RecipeSchema);
