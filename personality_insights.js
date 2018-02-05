var http = require('http');
var url = require('url');
var fs = require('fs');

var watson = require('watson-developer-cloud');
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

var language_translator = watson.language_translator({
  username: '3329ac63-23f0-4632-a875-8ab61ba95f9a',
  password: 'Om54fWlHdOxK',
  version: 'v2',
  url: 'https://gateway-fra.watsonplatform.net/language-translator/api'
});

var personality_insights = new PersonalityInsightsV3({
  username: '49156749-6fc4-4a15-a5b3-2cb231a893ba',
  password: 'FX0ENS4MmTRT',
  version_date: '2017-10-13',
  url: 'https://gateway-fra.watsonplatform.net/personality-insights/api'
});

var params = {
  // Get the content from the JSON file.
  content: require('./data/profiles/cyrille_profile_en.json'),
  content_type: 'application/json',
  consumption_preferences: true,
  raw_scores: true,
  Accept: "text/csv",
  csv_headers: true
};

personality_insights.profile(params, function(error, response) {
	if (error)
		  fs.appendFileSync('./data/personality_insights_profiles/cyrille_profile_watson_en.csv', error);
	else
		  fs.appendFileSync('./data/personality_insights_profiles/cyrille_profile_watson_en.csv', JSON.stringify(response));
});