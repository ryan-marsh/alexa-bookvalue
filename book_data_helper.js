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
			//console.log(response.result.ItemSearchResponse.Items.Item.ItemAttributes.TradeInValue.FormattedPrice);
			return response.result.ItemSearchResponse.Items;
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
		'Sort': 'price'
	});
};

BookDataHelper.prototype.formatBookTradeinValue = function(bookData) {
	return _.template('The current trade-in value for ${title} is ${value}.')({
		title: bookData.Item.ItemAttributes.Title,
		value: bookData.Item.ItemAttributes.TradeInValue.FormattedPrice
	});
};

module.exports = BookDataHelper;
