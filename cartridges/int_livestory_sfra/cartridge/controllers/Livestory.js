'use strict';

/**
 * Controller that renders the store finder and store detail pages.
 *
 * @module controllers/Livestory
 */

/* API Includes */
var StringUtils = require('dw/util/StringUtils');

/* Script Modules */
var server = require('server');
var livestoryHelper = require('*/cartridge/scripts/helpers/livestoryHelper');

server.get('Parse', function (req, res, next) {
    res.cacheExpiration(24);
    var originalBody = StringUtils.decodeBase64(req.querystring.sig);
    try {
        var body = JSON.parse(originalBody);
        if (body.links && Array.isArray(body.links)) {
            for (var i = 0; i < body.links.length; i += 1) {
                var link = body.links[i];
                var url = livestoryHelper.parseLink(link);
                body.links[i] = {
                    url: link,
                    parsedUrl: url.toString()
                };
            }
        }
        body.date = new Date();
        res.setContentType('application/json');
        res.json(body);
    } catch (err) {
        res.setStatusCode(400);
        res.print(err);
    }

    return next();
});

module.exports = server.exports();
