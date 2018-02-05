var http = require('http');
var url = require('url');
var fs = require('fs');

var NaturalLanguageUnderstandingV1 = require('../node_modules/watson-developer-cloud/natural-language-understanding/v1.js');

/* user ATS Conseil 
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': 'a5dc07dd-f23d-4d14-b9dd-88a7dff5a596',
  'password': 'bLKw1Jt5ARx2',
  'version_date': '2017-02-27',
  'url': 'https://gateway-fra.watsonplatform.net/natural-language-understanding/api'
});
*/

/* user Nicolas */
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
	  'username': '9d81429d-652b-4183-859d-68fe70963624',
	  'password': 'dkuIAZmSo8VH',
	  'version_date': '2017-02-27',
	  'url': 'https://gateway-fra.watsonplatform.net/natural-language-understanding/api'
	}); 

var parameters = {
  'text': '',
  'features': {
    'keywords': {
      'emotion': true,
      'sentiment': true,
      'limit': 1
    }
  }
}

var filename = 'raison_prefs';

var datajson = require('./data/' + filename + '.json');

var Data = [];

for(var value in datajson) {
	parameters.text = datajson[value].text;
    natural_language_understanding.analyze(parameters, function(err, response) {
	  if (err)
		  fs.appendFileSync('./data/' + filename + '_watson.json', JSON.stringify(err));
	  else
		  fs.appendFileSync('./data/' + filename + '_watson.json', JSON.stringify(response, null, 2));
	});
}