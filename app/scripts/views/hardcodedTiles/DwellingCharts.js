'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'appEvents',
    'd3',
    'views/hardcodedTiles/dwellingCharts/SuburbBarChart',
    'views/hardcodedTiles/dwellingCharts/TotalBarChart',
    'text!templates/barCharts.html'
], function($, _, Backbone, appEvents, d3, SuburbBarChart, TotalBarChart, BarCharts) {

    var DwellingCharts = Backbone.View.extend({

        _data: null,

        render: function(obj) {

            this._data = obj;

            this.onDwellingData = this.onDwellingData.bind(this);

            var data = {
                columnWidth: this._data.attributes.columnwidth,
                heading: this._data.attributes.heading,
                headingColour: this._data.attributes.headingcolour,
                borderColour: this._data.attributes.bordercolour,
                bgColour: this._data.attributes.backgroundcolour,
                bodyColour: this._data.attributes.bodycopy,
                tagline: this._data.attributes.tagline,
                _: _
            }

            var template = _.template(BarCharts);
            var compiledTemplate = template(data);
            $(this.el).html(compiledTemplate);

           // $(this.el).html(BarCharts)

            d3.csv('data/dwellingCompletions.csv', this.onDwellingData)

        },

        onDwellingData: function(data) {

            var suburbBar = new SuburbBarChart();
            suburbBar.render(data);

            var totalBar = new TotalBarChart();
            totalBar.render(data);
        }

    });

    return DwellingCharts;

});
