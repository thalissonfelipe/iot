const Recipe = require('../models/Recipe');
const Recipient = require('../models/Recipient');
const User = require('../models/User');

/**
 * 
 * @param {*} recipes all recipes save in the database
 * @param {*} recipientsContent the content monitored Ex.: alface, ...
 */
function filterRecipes(recipes, recipientsContent) {
    const regex = new RegExp(recipientsContent.join('|'));

    const filteredRecipes = recipes.filter(recipe => {
        let score = 0;
        recipe.ingredients.forEach(ingredient => {
            if (regex.test(ingredient)) {
                score += 1;
            }
        });

        if (score > 0) {
            recipe.score = score;
            recipe.total = recipientsContent.length; // temp
            return true;
        }
    });

    filteredRecipes.sort((a, b) => b.score - a.score);

    return filteredRecipes;
}

function getContentArray(content) {
    let contentArray = [];
    content.forEach(c => {
        contentArray.push(c.content.a);
        contentArray.push(c.content.b);
        contentArray.push(c.content.c);
    });
    return contentArray;
}

class RecipeController {
    async index(req, res) {
        try {
            const maxItemsPerPage = 51;
            const page = req.query.page;
            const skip = (maxItemsPerPage * page) - maxItemsPerPage;

            if (req.query.username) {
                const recipes = await Recipe.find();
                const userId = (await User.findOne({ username: req.query.username }))._id;
                const recipientsContent = await Recipient.find({ userId }, {
                    _id: 0,
                    content: 1
                });
                const content = getContentArray(recipientsContent);
                let filteredRecipes = filterRecipes(recipes, content);

                // skip and limit using array
                filteredRecipes = filteredRecipes.slice(skip).slice(0, maxItemsPerPage);

                return res.status(200).json(filteredRecipes);
            }

            const recipes = await Recipe
                                    .find()
                                    .skip((maxItemsPerPage * page) - maxItemsPerPage)
                                    .limit(maxItemsPerPage);

            return res.status(200).json(recipes);
        } catch (error) {
            console.log(error);
            return res.status(500).send('Internal Error.');
        }
    }
}

module.exports = RecipeController;