const MongoClient = require('mongodb').MongoClient;

const ARTIFACT = 'artifact';
const ARG_LEN = 1;

let myArgs = process.argv.slice(2);

if (myArgs.length !== ARG_LEN) {
	throw new Error('Need to pass in a game name');
}

var game = myArgs[0];

main();

function isValidGame(game) {
	return game === ARTIFACT;
}

function main() {
	if (!isValidGame(game)) {
  		console.log("Invalid game");
  		return;
  	}
	MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }, function(err, client) {
    if(!err) {
      console.log("We are connected");
      var db = client.db(game);
      collection = db.collection('cards');
	  collection.createIndex({ card_name : 'text', card_text : 'text'}, function(err, result) {
	  	console.log("Indexes created");
	  	client.close();
	  });
	}
	});
}