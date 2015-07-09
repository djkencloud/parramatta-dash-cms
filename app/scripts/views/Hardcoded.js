'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'views/hardcodedTiles/DwellingCharts',
    'views/hardcodedTiles/Traffic',
    'views/hardcodedTiles/Weather'
], function($, _, Backbone, DwellingCharts, Traffic, Weather) {

    var Hardcoded = Backbone.View.extend({

        _data: {},

        render: function(obj) {

            this._data = obj;

            //console.log("in Hardcoded ", this._data);

            var tile;

            if (this._data.attributes.javascriptref === "Weather") {
                tile = new Weather({el: this.el})
                tile.render(this._data);

            } else if (this._data.attributes.javascriptref === "DwellingCharts")  {
                tile = new DwellingCharts({el: this.el})
                tile.render(this._data);

            } else if (this._data.attributes.javascriptref === "Traffic")  {
                tile = new Traffic({el: this.el})
                tile.render(this._data);

            } else {
                console.log('no javascirpt reference for hardcoded tile?')
            }


        }

    });

    return Hardcoded;

});
