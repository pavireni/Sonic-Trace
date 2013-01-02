define([
    "app",

    "modules/map",
    "modules/contributor",
    "modules/entry",
    "modules/story"
],

function( App, Map, Contributor, Entry, Story ) {

    // Defining the application router, you can attach sub routers here.
    var Router = Backbone.Router.extend({
        initialize: function() {

            App.useLayout("main").setViews({
                ".map": new Map.View()
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
