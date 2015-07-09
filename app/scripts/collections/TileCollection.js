'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'models/tileModel',
    'appEvents'
], function ($, _, Backbone, TileModel, appEvents) {

    var TileCollection = Backbone.Collection.extend({

        model: TileModel,

        url: 'http://api.osmek.com/3.1.3/feed/jsonp/?callback=groupfunctionA',

        initialize: function () {
            this.fetch({
                data: {api_key: 'XoMiatrHWBj6ElDz2GA8JPYmV4bRqSug', section_id: '11145'},
                type: 'POST',
                dataType: 'jsonp',
                success: this.successLoad,
                error: this.errorLoad
            });
        },

        successLoad: function () {
            appEvents.trigger('tileCollectionSuccess');
        },

        errorLoad: function () {
            console.log('error with loading tile collection');
        },

        parse: function (response) {
            return response.items;
        }

    });


    return TileCollection;
});
