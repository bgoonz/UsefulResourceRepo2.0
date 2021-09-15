#!/usr/local/bin/mocha
let expect = require('chai').expect;
let color = require('./color.js');


describe('color', function() {

    it('hsl', function() {
        let r=11, g=48, b=192;
        let hsl = color.rgbToHsl(r,g,b);
        let rgb = color.hslToRgb(hsl[0],hsl[1],hsl[2]);
        expect(rgb).to.equal([r,g,b]);
    });

    it('hsv', function() {
        let r=11, g=48, b=192;
        let hsv = color.rgbToHsv(r,g,b);
        let rgb = color.hsvToRgb(hsv[0],hsv[1],hsv[2]);
        expect(rgb).to.equal([r,g,b]);
    });
});
