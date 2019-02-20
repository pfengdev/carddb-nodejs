const Card = require('../models/card.model');

const FIELDS = '-_id img_name';

exports.find = function(req, res) {
	//input validaton?
	let queryParams = req.query;
	if (queryParams) {
		Card.find(queryParams, FIELDS, function(err, cardArr) {
			if (err) {
				//Proper error handling?
				console.log('Error when finding cards: ', err);
			}
			res.json(cardArr);
		});
	}
};