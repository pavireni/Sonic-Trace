define([
    "app"

],
function( App ) {

    var Map = App.module();

    Map.Model = Backbone.Model.extend({});

    Map.View = Backbone.View.extend({
        template: "map",
        tagName: "div",

        initialize: function() {
            console.log( "Initialize:Map" );

        },
        afterRender: function() {
            console.log( "rendered" );

            map = new L.Map( "sonic-trace-map", {
                center: new L.LatLng( 33.931966, -118.017883 ),
                zoom: 10
            });

            layer = new L.StamenTileLayer( "watercolor" );

            map.addLayer( layer );
        }
    });

    // Things Map.View does...
    //
    // 1. Render a leaflet map
    // 2. Indicate that it is ready for Points to be added

    return Map;
});
