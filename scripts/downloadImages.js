const fs = require('fs');
const https = require('https');
require('./utils');
const ARG_LEN = 2;
const ARTIFACT = 'artifact';
const LARGE_IMAGE = 'large_image';

let myArgs = process.argv.slice(2);

if (myArgs.length !== ARG_LEN) {
	throw new Error('Need to pass in a filename');
}

var game = myArgs[0];
var fileName = myArgs[1]; 
//mention don't need to put data/ in the error
var filePath = fileName;

main();

function main() {
	if (!isValidGame(game)) {
		console.log("Invalid game");
		return;
	}
	if (isArtifact(game)) {
		fs.readFile(filePath, function(err, data) {
		if (err) {
			throw err;
		}
		let jsonData = JSON.parse(data);
		let cardArr = jsonData.card_set.card_list;
		downloadImages(cardArr);
	  });
	}
}

function isValidGame(game) {
	return game === ARTIFACT;
}

function isArtifact(game) {
	return game === ARTIFACT;
}

function downloadImages(cardArr) {
	cardArr.forEach(function(card) {
		let cardName = card.card_name.english;
		let imgUrls = card[LARGE_IMAGE];
		let card_text = card["card_text"];
		if (imgUrls && card_text) {
			Object.keys(imgUrls).forEach(function(language) {
				let saveAsLanguage = language;
				if (language === 'default') {
					saveAsLanguage = 'english';
				}
				let url = imgUrls[language];
				if (url) {
					https.get(url, (resp) => {
						var imgData = '';
					    resp.setEncoding('binary');

					    resp.on('data', function(chunk){
					        imgData += chunk;
					    });
						resp.on('end', () => {
							let fName = '../../cardimages/' + game + '/' + saveAsLanguage + '/' + cardName + '.png';
							fs.writeFile(fName, imgData, 'binary', function(err){
					            if (err) {
					            	throw err
					            } else {
						    		console.log('saved image for ' + cardName + ' in ' + saveAsLanguage);
						    	}
					        });
						  });
					}).on("error", (err) => {
					  console.log("Error: " + err.message);
					});
				}
			});
		}
	});
}