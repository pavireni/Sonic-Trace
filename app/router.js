define([
    "app",

    "modules/surface",
    "modules/story",
    "modules/marker",
    "modules/session"
],

function( App, Surface, Story, Marker, Session ) {
    var Router;

    // If this is the first visit, there will be no record of any
    // prior visits. For this visit, set "isFirst" to |true|.
    // Subsequent visits will see a valid "isFirst" record and will
    // therefore be set to false.
    Session.set(
        "isFirst", Session.get("isFirst") === undefined ? true : false
    );

    window.Session = Session;

    Router = Backbone.Router.extend({
        initialize: function() {

            App.useLayout("main").setViews({
                // 1. Introductory Video (Pg.2)
                // Setup the introductory video, which displays
                // conditionally (first visit)

                // Or...

                // 1. Surfaces (Pg.3)
                // Surface Parameters:           domId, lat, lng, zoom
                "#surface-la": new Surface.View( "la", 33.79, -118.2, 11 ),
                "#surface-mx": new Surface.View( "mx", 23.16, -106.35, 4 )



                // 2. Instructions overlay (Pg.3)
                //
                //  See also: this.intro() & this.index()
                //
                //
                // 3. Navigation (Pg.4)
                //
                // 4. Markers (Pg.4)
                //
                //      http://alpha.zeega.org/api/items/73916/items
                //
                //      A. Clicking on a Marker will load a story by initializing a
                //          Zeega.Player with a URL:
                //
                //          eg. http://alpha.zeega.org/api/items/71690
                //
                //      B.
                //
                // 5. KCRW News, Features (Pg.4)
                //
                //
                //
                //
                //
                //
                //
                //
                //
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
            if ( Session.get("isFirst") ) {
                console.log( "Is first visit..." );
                // If first visit, show introductory video
                this.intro();
            } else {
                // Check for new Marker items approx every 5s.
                // This is super lame, but should do the job for
                // at least the immediate future.
                setInterval(function() {
                    Marker.Items.fetch({
                        update: true,
                        add: true
                    });
                }, 5000);
            }
        },

        intro: function() {
            // render the intro view
            console.log( "Render the intro view" );
        }
    });

    // Required, return the module for AMD compliance.
    return Router;
});
