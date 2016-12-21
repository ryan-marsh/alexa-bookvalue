'use strict';
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var BookDataHelper = require('../book_data_helper');
chai.config.includeStack = true;

describe('BookDataHelper', function() {
	var subject = new BookDataHelper();
	var isbn_number;
	describe('#getBookData', function() {
		context('with a valid isbn number', function() {
			it('returns isbn number', function() {
				isbn_number = '0077861930';
				var value = subject.requestBookData(isbn_number).then(function(obj) {
					return obj.Item.ItemAttributes.ISBN;
				});
				return expect(value).to.eventually.eq(isbn_number);
			});
		});
	});

	describe('#formatBookTradeinValue', function() {
		var bookData = {
			'Item': {
				'ItemAttributes': {
					'Title': 'Essentials of Life-Span Development',
					'TradeInValue': {
						'FormattedPrice': '$105.75'
					}
				}
			}
		};

		context('with valid book data', function() {
			it('formats the trade-in value as expected', function() {
				expect(subject.formatBookTradeinValue(bookData)).to.eq(
					'The current trade-in value for Essentials of Life-Span Development is $105.75.'
				);
			});
		});
	});
});