/**
CardSet Format:
{
  card_set: {
    version: 1,
    set_info: {
	  set_id:
	  pack_item_def:
	  name:
    },
    card_list: []
  }
}
**/

const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

const ARG_LEN = 2;
//Skipping over cards with no image and also path cards. Index starts at SKIP
const REQUIRED_KEYS = ['large_image', 'card_text'];
const DELETE_KEYS = ['mini_image', 'large_image', 'ingame_image'];
const languages = ['english', 'german', 'french', 'italian', 'koreana', 
				   'spanish', 'schinese', 'tchinese', 'russian', 'japanese',
				   'brazilian', 'latam'];
const ARTIFACT = 'artifact';

let myArgs = process.argv.slice(2);

if (myArgs.length !== ARG_LEN) {
	throw new Error('Need to pass in a filename');
}

var game = myArgs[0];
var fileName = myArgs[1]; 
//mention don't need to put data/ in the error
var filePath = fileName;
var nameOfSet;
var collection;

main();

function isValidGame(game) {
	return game === ARTIFACT;
}

function main() {
  if (!isValidGame(game)) {
  	return;
  }
  MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }, function(err, client) {
    if(!err) {
      console.log("We are connected");
      var db = client.db(game);
      collection = db.collection('card');
	  fs.readFile(filePath, function(err, data) {
		if (err) {
			throw err;
		}
		let jsonData = JSON.parse(data);
		let cardArr = jsonData.card_set.card_list;
		setNameOfSet(jsonData);
		processCardSet(cardArr);
		saveCards(cardArr, client);
	  });
   }
  });
}

function setNameOfSet(jsonData) {
	nameOfSet = jsonData.card_set.set_info.name.english;
}

function processCardSet(cardArr) {
	cardArr.forEach(function(card) {
		if (shouldProcessCard(card)) {
			processCard(card);
		}
	});
}

function saveCards(cardArr, client) {
	collection.insertMany(cardArr, {w:1}, function(err, result) {
		if (!err) {
			console.log("saved succesfully");
		} else {
			console.log(err);
		}
		client.close();
	});
}

function shouldProcessCard(card) {
	REQUIRED_KEYS.forEach(function(key) {
		if (!card[key]) {
			return false;
		}
	});
	return true;
}

function processCard(card) {
	pruneCard(card);
	reformatLanguages(card);
}

function pruneCard(card) {
	DELETE_KEYS.forEach(function(key) {
		delete card[key];
	});
}

function reformatLanguages(card) {
	card.card_name = card.card_name.english;
	card.card_text = card.card_text.english;
}