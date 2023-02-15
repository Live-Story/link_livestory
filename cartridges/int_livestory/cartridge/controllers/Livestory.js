'use strict';

/**
 * Controller that renders the store finder and store detail pages.
 *
 * @module controllers/Livestory
 */

/* API Includes */

/* Script Modules */
var guard = require('*/cartridge/scripts/guard');
var livestoryHelper = require('~/cartridge/scripts/helpers/livestoryHelper');
var StringUtils = require('dw/util/StringUtils');

/**
 * Process URLs given as input in form of $httpsUrl statements and return
 * the localized URLs
 */
function parseUrl() {
    /* eslint-disable no-undef */
    response.setExpires(Date.now() + 24 * 3600 * 1000);
    response.setContentType('application/json');
    var originalBody = StringUtils.decodeBase64(request.httpParameterMap.get('sig'));
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
        var json = JSON.stringify(body);
        response.setStatus(200);
        response.writer.print(json);
    } catch (err) {
        response.setStatus(400);
        response.writer.print(err);
    }
    response.writer.close();
    /* eslint-enable no-undef */
}

exports.Parse = guard.ensure(['get'], parseUrl);
