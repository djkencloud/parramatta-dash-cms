'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/custom.html'
], function($, _, Backbone, CustomTemplate) {

    var Custom = Backbone.View.extend({

        _data: {},

        render: function(obj) {

            this._data = obj;

            console.log("in Custom ", this._data)

            //er-outline" style="border-color:<%= borderColour %>;background-color:<%= bgColour %>;color:<%= bodyColour %>

            var data = {
                columnWidth: this._data.attributes.columnwidth,
                heading: this._data.attributes.heading,
                headingColour: this._data.attributes.headingcolour,
                tagline: this._data.attributes.tagline,
                borderColour: this._data.attributes.bordercolour,
                bgColour: this._data.attributes.backgroundcolour,
                bodyColour: this._data.attributes.bodycopy,
                html: this._data.attributes.html,
                _: _
            };

            var template = _.template(CustomTemplate);
            var compiledTemplate = template(data);
            $(this.el).html(compiledTemplate);

        }

    });

    return Custom;

});
