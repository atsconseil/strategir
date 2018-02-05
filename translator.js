var http = require('http');
var url = require('url');
var fs = require('fs');

var watson = require('watson-developer-cloud');

/* LT user Nicolas */
var language_translator = watson.language_translator({
  username: '3329ac63-23f0-4632-a875-8ab61ba95f9a',
  password: 'Om54fWlHdOxK',
  version: 'v2',
  url: 'https://gateway-fra.watsonplatform.net/language-translator/api'
});

var datajson = require('./data/profiles/cyrille_profile.json');

for(var value in datajson) {
	if(datajson[value].content.length > 10) {
		language_translator.translate({
		    text: datajson[value].content,
		    source: 'fr',
		    target: 'en'
		  }, function(err, translation) {
		    if (err) {
		    	fs.appendFileSync('./data/profiles/cyrille_profile_en.json', JSON.stringify(err));
		    } else {
		    	fs.appendFileSync('./data/profiles/cyrille_profile_en.json', '{"content": "' + translation.translations[0].translation + '"},\n\r');
		    }
		});
	} else {
		fs.appendFileSync('./data/profiles/cyrille_profile_en.json', datajson[value].content.concat(' too short\r\n'));
	}
}


