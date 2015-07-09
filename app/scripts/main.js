'use strict';

require.config({

    baseUrl: 'scripts',

    paths: {

        // Major libraries via Bower
        jquery: '../../bower_components/jquery/dist/jquery',
        underscore: '../../bower_components/underscore/underscore',
        backbone: '../../bower_components/backbone/backbone',
        modernizr: '../../bower_components/modernizr/modernizr',
        moment: '../../bower_components/momentjs/moment',
        d3: '../../bower_components/d3/d3',

        // Require.js plugins
        text: '../../bower_components/requirejs-text/text',

        // Major vendor libraries outside Bower, eg. our licensed GSAP libraries
        tweenMax: 'vendor/greensock/src/uncompressed/TweenMax',
        timelineMax: 'vendor/greensock/src/uncompressed/TimelineMax',
        easing: 'vendor/greensock/src/uncompressed/easing/EasePack',
        mapbox: 'vendor/mapbox/mapbox',

        // Shortcuts
        appEvents: 'events/appEvents',

        // Just a short cut to put our html outside the js dir
        templates: '../templates'

    },


    // Extra Shimmy Shimmy
    shim: {
        'mapbox': {
            exports: 'L'
        },
        'modernizr': {
            exports: 'Modernizr'
        },
        'tweenMax' : {
            exports: 'TweenMax'
        }
    },

    config: {
        moment: {
            noGlobal: true
        }
    }

});

require(
    [
        'jquery',
        'underscore',
        'views/app'
    ], function($, _, App) {
        var _app;

        _app = new App({el: '#main-container'});
        _app.render();

    }
);
