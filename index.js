'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('booktradein');
var BookDataHelper = require('./book_data_helper');

app.launch(function(req, res) {
	var prompt = 'To find the Amazon trade-in value of your book, tell me a thirteen digit ISBN number.';
	res.say(prompt).reprompt(prompt).shouldEndSession(false);
});


app.intent('GetTradeinValue', {
	'slots': {
		'ISBN': 'AMAZON.NUMBER'
	},
	'utterances': ['{|the value of|the trade-in value of} {|i.s.b.n.} {|number} {-|ISBN}']
},
	function(req, res) {
		var isbn = req.slot('ISBN');
		var reprompt = 'Tell me a thirteen digit ISBN number to get the Amazon trade-in value of your book.';
		if (_.isEmpty(isbn)) {
			var prompt = 'I didn\'t hear a thirteen digit ISBN number. Tell me an ISBN number.';
			res.say(prompt).reprompt(reprompt).shouldEndSession(false);
			return true;
		} else {
			var bookHelper = new BookDataHelper();
			bookHelper.requestBookData(isbn).then(function(bookData) {
				res.say(bookHelper.formatBookTradeinValue(bookData)).send();
			}).catch(function(err) {
				var prompt = 'I don\'t have a book that matches the ISBN number ' + isbn;
				res.say(prompt).shouldEndSession(true).send();
			});
			return false;
		}
	}
);


var exitFunction = function(req, res) {
	var speechOut = 'Goodbye!';
	res.say(speechOut);
};

app.intent('AMAZON.StopIntent', exitFunction);
app.intent('AMAZON.CancelIntent', exitFunction);
app.intent('AMAZON.HelpIntent', function(req, res) {
	var speechOut = 'To request the Amazon trade-in value of a book, request it by its thirteen digit ISBN number. ' +
		'For example, say nine seven eight zero three two one seven seven five six five eight to get ' +
		'the Amazon trade-in value of Campbell Biology Tenth Edition.';
	res.say(speechOut);
});

module.exports = app;
