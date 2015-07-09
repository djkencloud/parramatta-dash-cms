'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/factoid.html'
], function($, _, Backbone, FactoidTemplate) {

    var Factoid = Backbone.View.extend({

        _data: {},

        render: function(obj) {

            this._data = obj;

            console.log("in Factoid ", this._data)

            var data = {
                columnWidth: this._data.attributes.columnwidth,
                heading: this._data.attributes.heading,
                headingColour: this._data.attributes.headingcolour,
                tagline: this._data.attributes.tagline,
                borderColour: this._data.attributes.bordercolour,
                bgColour: this._data.attributes.backgroundcolour,
                bodyColour: this._data.attributes.bodycopy,
                fact: this._data.attributes.fact,
                _: _
            };

            var template = _.template(FactoidTemplate);
            var compiledTemplate = template(data);
            $(this.el).html(compiledTemplate);


        }

    });

    return Factoid;

});
