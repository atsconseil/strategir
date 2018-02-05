var http = require('http');
var url = require('url');
var fs = require('fs');

var watson = require('watson-developer-cloud');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

/* LT user Nicolas */
var language_translator = watson.language_translator({
  username: '3329ac63-23f0-4632-a875-8ab61ba95f9a',
  password: 'Om54fWlHdOxK',
  version: 'v2',
  url: 'https://gateway-fra.watsonplatform.net/language-translator/api'
});


/* NLU user ATS Conseil 
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': 'a5dc07dd-f23d-4d14-b9dd-88a7dff5a596',
  'password': 'bLKw1Jt5ARx2',
  'version_date': '2017-02-27',
  'url': 'https://gateway-fra.watsonplatform.net/natural-language-understanding/api'
});
*/

/* NLU user Nicolas */
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  username: '9d81429d-652b-4183-859d-68fe70963624',
  password: 'dkuIAZmSo8VH',
  version_date: '2017-02-27',
  url: 'https://gateway-fra.watsonplatform.net/natural-language-understanding/api'
}); 

/* var usa_parameters = {
  'text': 'The color was very neutral and the gloss felt smooth on my lips.',
  'features': {
    'entities': {
      'emotion': true,
      'sentiment': true,
      'limit': 2
    },
    'keywords': {
      'emotion': true,
      'sentiment': true,
      'limit': 2
    }
  }
}
*/

var datajson = require('./data/data.json');

for(var value in datajson) {
	if(datajson[value].Content.length > 40) {
		/* language_translator.translate({
		    text: datajson[value].Content,
		    source: 'fr',
		    target: 'en'
		  }, function(err, translation) {
		    if (err) {
		    	fs.appendFileSync('error.log', JSON.stringify(err).concat('\r\n'));
		    } else { */
		    	var parameters = {
		    		  /* 'text': translation.translations[0].translation, */
		    		  'text': datajson[value].Content,
		    		  'features': {
		    			  'relations': {},
		    			  'entities': {
		    				  'emotion': true,
		    			      'sentiment': true,
		    			      'limit': 1
		    			  },
		    			  'keywords': {
		    				  'emotion': true,
		    				  'sentiment': true,
		    				  'limit': 3
		    			  }
		    		   }
		    	};
			    natural_language_understanding.analyze(parameters, function(err, response) {
		    	  if (err)
		    		  fs.appendFileSync('error.log', JSON.stringify(err).concat('\r\n'));
		    	  else
		    		  fs.appendFileSync('./data/strategir_handicap_watson_fr.json', JSON.stringify(response, null, 2).concat(',\r\n'));
		    	});
		   /* }
	  }); */
	} else {
		fs.appendFileSync('error.log', datajson[value].Content.concat(' too short\r\n'));
	}
	
}


