define([
    "app"

], function( App ) {

    var Contributor = App.module();

    Contributor.Model = Backbone.Model.extend({
        defaults: {
        },

        initialize: function() {
        }
    });

    return Contributor;
});
