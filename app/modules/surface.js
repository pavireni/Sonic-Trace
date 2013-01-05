define([
    "app"

],
function( App ) {

    var Surface = App.module();

    Surface.Model = Backbone.Model.extend({});

    Surface.View = Backbone.View.extend({

        tagName: "div",

        initialize: function( domId, lat, lng, zoom ) {
            console.log( "Initialize:Surface", arguments );

            this.domId = domId;
            this.options = {
                center: new L.LatLng( lat, lng ),
                zoom: zoom
            };

            // Set the rendered element's id, this will be used
            // by afterRender to locate the map container
            $( this.el ).attr( "id", this.domId );
        },
        afterRender: function() {
            var map;

            // Initialize a new Leaflet Map Surface, this will be stored
            // in the Sonic.Leaflets global Map instance, its key is this
            // Surface.View
            map = new L.Map( this.domId, this.options ).addLayer(
                new L.StamenTileLayer( "watercolor" )
            );

            // Add this Leaflet map surface to the global cache
            Sonic.surfaces[ this.domId ] = map;
        }
    });

    // Things Surface.View does...
    //
    // 1. Render a leaflet surface (map)
    // 2. Indicate that it is ready for Points to be added

    return Surface;
});
