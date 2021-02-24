const router = require('express').Router();
const RecipientController = require('./controllers/recipient.controller');

router.get('/recipients', RecipientController.show);

module.exports = router;
