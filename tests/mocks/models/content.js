'use strict';

function Content(data) {
    Object.assign(this, data);
    this.body = this.body || (this.custom && this.custom.body);
}

module.exports = Content;
