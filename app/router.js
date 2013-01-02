define([
    "app",

    "modules/map",
    "modules/contributor",
    "modules/entry",
    "modules/story"
],

function( App, Map, Contributor, Entry, Story ) {

    var Router = Backbone.Router.extend({
        initialize: function() {

            App.useLayout("main").setViews({
                // Map Parameters:       domId, lat, lng, zoom
                "#map-la": new Map.View( "la", 33.79, -118.2, 11 ),
                "#map-mx": new Map.View( "mx", 23.16, -106.35, 4 )

                // Additional views here, not specifically these,
                // a placeholder only.
                //
                // ".stories": ...views from collection
                // ".contributors": ...views from collection
                // ""...

            }).render();
        },

        routes: {
            "": "index"
            // routes to view specific story via URL
        },

        index: function() {
            console.log( "Router:Index" );
        }
    });

    // Required, return the module for AMD compliance.
    return Router;
});
