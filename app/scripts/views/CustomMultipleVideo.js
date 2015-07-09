'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/customMultipleVideo.html'
], function($, _, Backbone,CustomMultipleVideoTemplate) {

    var CustomMultipleVideo = Backbone.View.extend({

        _data: {},

        render: function(obj) {

            this._data = obj;

            console.log("in Custom MultipleVideo ", this._data)

            var data = {
                columnWidth: this._data.attributes.columnwidth,
                heading: this._data.attributes.heading,
                headingColour: this._data.attributes.headingcolour,
                tagline: this._data.attributes.tagline,
                borderColour: this._data.attributes.bordercolour,
                bgColour: this._data.attributes.backgroundcolour,
                bodyColour: this._data.attributes.bodycopy,
                html: this._data.attributes.html,
                video1: this._data.attributes.video1,
                video2: this._data.attributes.video2,
                video3: this._data.attributes.video3,
                video4: this._data.attributes.video4,
                _: _
            };

            var template = _.template(CustomMultipleVideoTemplate);
            var compiledTemplate = template(data);
            $(this.el).html(compiledTemplate);


        }

    });

    return CustomMultipleVideo;

});
