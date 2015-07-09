'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/header.html'
], function($, _, Backbone, HeaderTemplate) {

    var Header = Backbone.View.extend({

        _data: {},

        render: function(websiteData) {

            this._data = websiteData;

            console.log("this._data")

            var data = {
                title: this._data[0].attributes.mainheading.value,
                introPara: this._data[0].attributes.mainparagraph.value,
                _: _
            };

            var template = _.template(HeaderTemplate);
            var compiledTemplate = template(data);
            $('#head-wrap').append(compiledTemplate);


        }

    });

    return Header;

});
