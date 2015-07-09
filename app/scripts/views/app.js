'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'appEvents',
    'collections/TileCollection',
    'collections/WebsiteCollection',
    'views/Header',
    'views/Hardcoded',
    'views/Custom',
    'views/CustomPhoto',
    'views/CustomMultipleVideo',
    'views/Factoid',
    'views/CustomSingleVideo'
], function($, _, Backbone, appEvents, TileCollection, WebsiteCollection, Header, Hardcoded, Custom, CustomPhoto, CustomMultipleVideo, Factoid, CustomSingleVideo) {

    var App = Backbone.View.extend({

        _tileData: {},
        _websiteData: {},

        _header: null,
        _sortedArray: [],

        _tileCollectionLoaded: false,
        _webCollectionLoaded: false,


        _myInterval: null,
        _timer: null,
        _maxCount: 5,
        _counter: 0,
        _executeInterval: 4000,

        render: function() {

            appEvents.on('tileCollectionSuccess', this.onTileCollection, this);
            appEvents.on('websiteCollectionSuccess', this.onWebsiteCollection, this);

            this._tileData = new TileCollection();
            this._websiteData = new WebsiteCollection();


        },

        onTileCollection: function() {
            this._tileCollectionLoaded = true;
            this.onDataLoaded();
        },

        onWebsiteCollection: function() {
            this._webCollectionLoaded = true;
            this.onDataLoaded();
        },

        onDataLoaded: function() {
            if (this._tileCollectionLoaded && this._webCollectionLoaded) {
                this.setUp()
            }
        },

        setUp: function() {

            // Set up global event for page resize...
            var resizeEvent = 'onorientationchange' in window ? 'orientationchange' : 'resize';

            // Add global resize event.  Can remove if not required.
            $(window).bind(resizeEvent, function() {
                appEvents.trigger('pageResize', [ document.body.offsetWidth, document.body.offsetHeight ] );
            });

            // listen to resize in here
            appEvents.on('pageResize', this.onPageResize, this);


            //console.log('this._websiteData.models ', this._websiteData.models);
            //console.log('this._tileData.models ', this._tileData.models);


            // put the header up first...
            this._header = new Header();
            this._header.render(this._websiteData.models);


            // Change sort attribute to number so we can sort on it, also get width as a number.
            _.each(this._tileData.models, function(obj) {
                obj.sort = +obj.attributes.order;
                obj.columnwidth = +obj.attributes.columnwidth;
            });

            // Get a new array of the sorted values...
            this._sortedArray = _.sortBy(this._tileData.models, function(obj) {
                return obj.sort;
            });


            this.createDomSkeleton();


        },

        createDomSkeleton: function() {

            // add container div for body elements.
            $('#body-wrap').append('<div id="body-container" class="container"></div>')

            // need to count the col widths so we can create the rows correctly...
            var colCount = 0;
            var rowCount = 0;
            var rowDiv;

            for (var i = 0; i < this._sortedArray.length; i++) {

                // if count is 0 - add a new row element - add unique idetifier so we can add our tile holders/wrap
                if (colCount === 0) {
                    rowDiv = $('#body-container').append('<div id="row' + rowCount + '" class="row"></div><div class="thick-black hidden-xs  "></div>')
                }

                // add holders/wrap for tile
                $('#row'+rowCount).append('<div id="tile' + i + '"></div>');

                // ammend our count so that we know rows we have.
                colCount = colCount + this._sortedArray[i].columnwidth;

                // do a check - if we add the 'next' (i+1) column width widget to our current row, and that makes more than 12 columns, we break the page layout.  So stop adding to the current row and start over by setting .
                if (this._sortedArray[i+1]) {
                    if ((colCount + this._sortedArray[i+1].columnwidth) > 12) {
                        colCount = 0;
                        rowCount++;
                    }
                }

            }

            this.createTiles();

        },

        createTiles: function() {


            console.log('this._sortedArray ', this._sortedArray);

            for (var i = 0; i < this._sortedArray.length; i++) {

                var tile;
                var tileWrapId = '#tile'+i;

                if (this._sortedArray[i].attributes.type === 'hardCoded') {
                    tile = new Hardcoded({el: tileWrapId});
                    tile.render(this._sortedArray[i]);

                } else if (this._sortedArray[i].attributes.type === 'custom') {
                    tile = new Custom({el: tileWrapId});
                    tile.render(this._sortedArray[i]);

                } else if (this._sortedArray[i].attributes.type === 'customPhoto') {
                    tile = new CustomPhoto({el: tileWrapId});
                    tile.render(this._sortedArray[i]);

                } else if (this._sortedArray[i].attributes.type === 'factoid') {
                    tile = new Factoid({el: tileWrapId});
                    tile.render(this._sortedArray[i]);

                } else if (this._sortedArray[i].attributes.type === 'customMultipleVideo') {
                    tile = new CustomMultipleVideo({el: tileWrapId});
                    tile.render(this._sortedArray[i]);

                } else if (this._sortedArray[i].attributes.type === 'customSingleVideo') {
                    tile = new CustomSingleVideo({el: tileWrapId});
                    tile.render(this._sortedArray[i]);

                } else {
                    console.log('tile type not assigned...')
                }

            }

            this.fixBorderHeight();

        },



        fixBorderHeight: function() {


            // call page resize to straighten up the row borders - should put a listener on page load items for production release.  Or just do this, it seems to work.
            this._myInterval = setInterval(function(){

                this._counter++;
                if (this._counter === this._maxCount) {
                    clearInterval(this._myInterval);
                }
                this.onPageResize();

            }.bind(this), this._executeInterval);

            this.onPageResize();

        },


        //
        onPageResize: function() {

            // fairly crude attempt to make all 'box outlines' have the same height... does actually work.
            if ($(window).width() >= 768 ) {
                $('.row').each(function() {
                    var rowChildren = $(this).find('.matchHeight');
                    var maxHeight = 0;
                    for (var i = 0; i < rowChildren.length; i++) {
                        if ($(rowChildren[i]).height() > maxHeight)  {
                            maxHeight = $(rowChildren[i]).height();
                        }
                    }

                    rowChildren.find('.border-outline').css({height: maxHeight});

                });

            } else {
                $('.border-outline').css({height: 'auto'});
            }

        }




    });

    return App;

});
