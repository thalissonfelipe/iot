const router = require('express').Router();
const RecipientController = require('./controllers/recipient.controller');
const UserController = require('./controllers/user.controller');
const RecipeController = require('./controllers/recipe.controller');

const recipientController = new RecipientController();
const userController = new UserController();
const recipeController = new RecipeController();

router.get('/recipients', recipientController.index);
router.post('/recipients', recipientController.create);
router.put('/recipients/:id', recipientController.update);

router.post('/login', userController.login);
router.post('/register', userController.register);

router.get('/recipes', recipeController.index);

module.exports = router;
