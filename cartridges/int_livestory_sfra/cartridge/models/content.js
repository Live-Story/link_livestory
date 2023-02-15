'use strict';

var livestoryHelper = require('*/cartridge/scripts/helpers/livestoryHelper');

/**
 * Extends existing content model with custom attribute
 * @param  {dw.content.Content} contentValue - result of ContentMgr.getContent call
 * @param  {string} renderingTemplate - rendering template for the given content
 * @return {content} content model instance
 * @constructor
 */

module.exports = function Content(contentValue, renderingTemplate) {
    module.superModule.call(this, contentValue, renderingTemplate);

    // extract additional attributes for Live Story
    this.livestory = {};

    if (contentValue.custom.body) {
        this.livestory.body = livestoryHelper.parseLink(contentValue.custom.body);
    }

    if (contentValue.custom.lsTitle) {
        this.livestory.title = contentValue.custom.lsTitle;
    }

    if (contentValue.custom.lsThumbnail) {
        this.livestory.thumbnail = contentValue.custom.lsThumbnail;
    }

    return this;
};
