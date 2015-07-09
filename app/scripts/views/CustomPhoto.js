'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/customPhoto.html'
], function($, _, Backbone, CustomPhotoTemplate) {

    var CustomPhoto = Backbone.View.extend({

        _data: {},

        render: function(obj) {

            this._data = obj;

            console.log("in Custom Photo", this._data)

            var data = {
                columnWidth: this._data.attributes.columnwidth,
                heading: this._data.attributes.heading,
                headingColour: this._data.attributes.headingcolour,
                tagline: this._data.attributes.tagline,
                borderColour: this._data.attributes.bordercolour,
                bgColour: this._data.attributes.backgroundcolour,
                bodyColour: this._data.attributes.bodycopy,
                html: this._data.attributes.html,
                photoId: this._data.attributes.image,
                imagelink: this._data.attributes.imagelink,
                _: _
            };

            var template = _.template(CustomPhotoTemplate);
            var compiledTemplate = template(data);
            $(this.el).html(compiledTemplate);

        }

    });

    return CustomPhoto;

});
