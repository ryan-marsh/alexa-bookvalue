'use strict';
var _ = require('lodash');
var util = require('util');
var OperationHelper = require('apac').OperationHelper;
var AWS_ID = ''; // AWS access key goes here
var AWS_SECRET = ''; // AWS secret key goes here
var ASSOC_ID = ''; // Amazon associate id goes here

function BookDataHelper() { }

BookDataHelper.prototype.requestBookData = function(isbnNumber) {
	return this.getBookData(isbnNumber).then(
		function(response) {
			var items = response.result.ItemSearchResponse.Items;

			if (items.TotalResults > 1) {
				return items.Item[0];
			} else {
				return items.Item;
			}
		}
	);
};

BookDataHelper.prototype.getBookData = function(isbnNumber) {
	var opHelper = new OperationHelper({
		awsId: AWS_ID,
		awsSecret: AWS_SECRET,
		assocId: ASSOC_ID
	});

	return opHelper.execute('ItemSearch', {
		'SearchIndex': 'Books',
		'Keywords': isbnNumber,
		'ResponseGroup': 'ItemAttributes',
		'Sort': 'relevancerank'
	});
};

BookDataHelper.prototype.formatBookTradeinValue = function(bookData) {
	return _.template('The current Amazon trade-in value for ${title} is ${value}.')({
		title: bookData.ItemAttributes.Title,
		value: bookData.ItemAttributes.TradeInValue.FormattedPrice
	});
};

module.exports = BookDataHelper;
