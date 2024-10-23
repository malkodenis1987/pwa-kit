'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for the storefront.MainBanner component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @returns {string} The template to be displayed
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    /*    model.image = ImageTransformation.getScaledImage(content.image);
        model.heading = content.heading;
        model.subHeading = content.subHeading;
        model.ctaLink = URLUtils.url('Search-Show', 'cgid', content.ctaLink.getID()).toString();
        model.ctaText = content.ctaText;
    */
    return new Template('experience/components/assets/pwa-alt-component').render(model).text;
};
