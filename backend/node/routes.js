const router = require('express').Router();
const RecipientController = require('./controllers/recipient.controller');
const UserController = require('./controllers/users.controller');

router.get('/recipients', RecipientController.index);
router.post('/recipients', RecipientController.create);

router.post('/login', UserController.login);
router.post('/register', UserController.register);

module.exports = router;
