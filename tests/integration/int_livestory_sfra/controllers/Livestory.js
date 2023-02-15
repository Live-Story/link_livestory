'use strict';

var chai = require('chai');
var assert = chai.assert;

var request = require('request-promise');
var config = require('../../it.config');

describe('Livestory-Parse', function () {
    this.timeout(25000);

    var myRequest = {
        url: '',
        method: 'GET',
        rejectUnauthorized: false,
        resolveWithFullResponse: true,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    };

    var baseUrl = config.baseUrl + '/Livestory-Parse';

    it('should successfully retrieve the localized version of the requested content asset url', function () {
        var caUrlStatement = '$httpsUrl("Page-Show", "pid", "about-us")$';
        var payload = { links: [caUrlStatement] };

        myRequest.url = baseUrl + '?sig=' + Buffer.from(JSON.stringify(payload)).toString('base64');

        return request(myRequest)
            .then(function (response) {
                assert.equal(response.statusCode, 200, 'Expected Livestory-Parse request statusCode to be 200.');
                var bodyAsJson = JSON.parse(response.body);
                assert.exists(bodyAsJson.links, 'Expected field called links in Livestory-Parse response');
                assert.equal(bodyAsJson.links.length, 1);
            });
    });

    it('should successfully retrieve the localized version of the requested product page url', function () {
        var caUrlStatement = '$httpsUrl("Product-Show", "pid", "701643465453M")$';
        var payload = { links: [caUrlStatement] };

        myRequest.url = baseUrl + '?sig=' + Buffer.from(JSON.stringify(payload)).toString('base64');

        return request(myRequest)
            .then(function (response) {
                assert.equal(response.statusCode, 200, 'Expected Livestory-Parse request statusCode to be 200.');
                var bodyAsJson = JSON.parse(response.body);
                assert.exists(bodyAsJson.links, 'Expected field called links in Livestory-Parse response');
                assert.equal(bodyAsJson.links.length, 1);
            });
    });

    it('should successfully retrieve the localized version of the requested product listing url', function () {
        var caUrlStatement = '$httpsUrl("Search-Show", "cid", "womens")$';
        var payload = { links: [caUrlStatement] };

        myRequest.url = baseUrl + '?sig=' + Buffer.from(JSON.stringify(payload)).toString('base64');

        return request(myRequest)
            .then(function (response) {
                assert.equal(response.statusCode, 200, 'Expected Livestory-Parse request statusCode to be 200.');
                var bodyAsJson = JSON.parse(response.body);
                assert.exists(bodyAsJson.links, 'Expected field called links in Livestory-Parse response');
                assert.equal(bodyAsJson.links.length, 1);
            });
    });
});
