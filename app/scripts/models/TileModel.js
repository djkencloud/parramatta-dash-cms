'use strict';

define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var TileModel = Backbone.Model.extend({

        defaults: {
            //"id": "",
        },

        initialize: function() {
            //this.id = this.get('id');
        }

    });

    return TileModel;

});
