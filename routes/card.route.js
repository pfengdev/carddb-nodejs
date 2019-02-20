const router = require('express').Router();

const card_controller = require('../controllers/card.controller');

router.get('/', card_controller.find);

module.exports = router;