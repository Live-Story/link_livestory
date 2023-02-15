'use strict';

var URLUtils = require('dw/web/URLUtils');

/**
 * Transform a $httpUrl statement given as string to a localized URL
 *
 * @param {string} str - The $httpUrl statement
 *
 * @returns {URL} - The resulted URL
 */
function parseLink(str) {
    var out = str;
    var regex = /\$http(s*)Url\((.*?)\)\$/g;
    var groups = regex.exec(str);
    while (groups !== null) {
        if (groups.length >= 3) {
            var originalUrl = groups[0];
            var url;
            // remove quotes, spaces etc.
            var params = groups[2].replace(/["'\s]/gi, '');
            // split params
            params = params.split(',');
            // get complete URL
            if (groups[1] === 's') {
                url = URLUtils.https.apply(this, params);
            } else {
                url = URLUtils.http.apply(this, params);
            }
            // Replace complete URL into original string
            out = out.replace(originalUrl, url);
        }

        groups = regex.exec(str);
    }
    return out;
}

module.exports = {
    parseLink: parseLink
};
