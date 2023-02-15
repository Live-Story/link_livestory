'use strict';

var assert = require('chai').assert;
var proxyquire = require('proxyquire').noCallThru().noPreserveCache();

require('dw-api-mock/demandware-globals');
require('app-module-path').addPath(process.cwd() + '/cartridges');

var mockSuperModule = require('../../../mocks/superModule');
var ContentMock = require('../../../mocks/models/content');

var ContentStub;

describe('Content', function () {
    before(function () {
        mockSuperModule.create(ContentMock);
        ContentStub = proxyquire('../../../../cartridges/int_livestory_sfra/cartridge/models/content', {
            '*/cartridge/scripts/helpers/livestoryHelper': require('../../../../cartridges/int_livestory_sfra/cartridge/scripts/helpers/livestoryHelper')
        });
    });

    after(function () {
        mockSuperModule.remove();
    });

    it('should include Live Story data if present', function () {
        var contentValue = {
            custom: {
                body: 'Hello from Live Story'
            },
            name: 'contentAssetName',
            template: 'templateName',
            UUID: 22,
            ID: 'contentAssetID',
            online: true,
            pageTitle: 'some title',
            pageDescription: 'some description',
            pageKeywords: 'some keywords',
            pageMetaTags: [{}]
        };

        var content = new ContentStub(contentValue);

        assert.deepEqual(content, {
            body: 'Hello',
            livestory: {
                body: 'Hello from Live Story'
            },
            custom: {
                body: 'Hello from Live Story'
            },
            name: 'contentAssetName',
            template: 'templateName',
            ID: 'contentAssetID',
            UUID: 22,
            online: true,
            pageTitle: 'some title',
            pageDescription: 'some description',
            pageKeywords: 'some keywords',
            pageMetaTags: [{}]
        });
    });
});
