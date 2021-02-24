const router = require('express').Router();
const RecipientController = require('./controllers/recipient.controller');

router.get('/recipients', RecipientController.index);
router.post('/recipients', RecipientController.create);

module.exports = router;
