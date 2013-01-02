define([
    "app"

],
function( App ) {

    var Map = App.module();

    Map.Model = Backbone.Model.extend({});

    Map.View = Backbone.View.extend({
        template: "map",
        tagName: "div",

        initialize: function( domId, lat, lng, zoom ) {
            console.log( "Initialize:Map", arguments );

            this.domId = domId;
            this.lat = lat;
            this.lng = lng;
            this.zoom = zoom;

            // Set the rendered element's id, this will be used
            // by afterRender to locate the map container
            $(this.el).attr( "id", this.domId );
        },
        afterRender: function() {
            var map, layer;

            console.log( "afterRendered:Map", arguments );

            map = new L.Map( this.domId, {
                center: new L.LatLng( this.lat, this.lng ),
                zoom: this.zoom
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
