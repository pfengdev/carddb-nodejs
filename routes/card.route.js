const router = require('express').Router();

const card_controller = require('../controllers/card.controller');

router.get('/', function(req, res) {
	let result = card_controller.search(req, res);
	res.json(result);
});

module.exports = router;