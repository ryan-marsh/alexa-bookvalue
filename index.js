'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('booktradein');
var BookDataHelper = require('./book_data_helper');

app.launch(function(req, res) {
	var prompt = 'To find the trade-in value of your book, tell me a thirteen digit ISBN number.';
	res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('GetTradeinValue', {
	'slots': {
		'ISBN': 'AMAZON.NUMBER'
	},
	'utterances': ['{|isbn} {|number} {-|ISBN}']
},
	function(req, res) {
		var isbn = req.slot('ISBN');
		var reprompt = 'Tell me a thirteen digit ISBN number to get the trade-in value of your book.';
		if (_.isEmpty(isbn)) {
			var prompt = 'I didn\'t hear a thirteen digit ISBN number. Tell me an ISBN number.';
			res.say(prompt).reprompt(reprompt).shouldEndSession(false);
			return true;
		} else {
			var bookHelper = new BookDataHelper();
			bookHelper.requestBookData(isbn).then(function(bookData) {
				console.log(bookData);
				res.say(bookHelper.formatBookTradeinValue(bookData)).send();
			}).catch(function(err) {
				console.log(err.statusCode);
				var prompt = 'I don\'t have a book that matches ISBN number ' + isbn;
				res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
			});
			return false;
		}
	}
);

module.exports = app;
