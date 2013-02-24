define([
    "app"

],
function( App ) {

    var Surface = App.module();

    Surface.Model = Backbone.Model.extend({});

    Surface.View = Backbone.View.extend({

        tagName: "div",

        
        afterRender: function() {
            var map;

            // Initialize a new Leaflet Map Surface, this will be stored
            // in the Sonic.Leaflets global Map instance, its key is this
            // Surface.View
            map = new L.Map( this.domId, this.options ).addLayer(
                new L.StamenTileLayer( "watercolor" )
            );

            map.addControl( new L.Control.Attribution().addAttribution("Map tiles by <a href=\"http://stamen.com\">Stamen Design</a>, under <a href=\"http://creativecommons.org/licenses/by/3.0\">CC BY 3.0</a>. Data by <a href=\"http://openstreetmap.org\">OpenStreetMap</a>, under <a href=\"http://creativecommons.org/licenses/by-sa/3.0\">CC BY SA</a>. Stories made with <a href='http://zeega.com'>Zeega</a>") );


            // Add this Leaflet map surface to the global cache
            Sonic.surfaces[ this.domId ] = map;
        }
    });

    // Workaround for compile issue

    Surface.MainView = Surface.View.extend({
        initialize: function( ) {

            this.domId = "la";
            this.options = {
                center: new L.LatLng( 34.02, -118.20 ),
                zoom: 10,
                zoomControl: true,
                attributionControl: false
            };

            // Set the rendered element's id, this will be used
            // by afterRender to locate the map container
            $( this.el ).attr( "id", this.domId );
        }
    });

    Surface.OriginView = Surface.View.extend({
        initialize: function( ) {
            

            this.domId = "mx";
            this.options = {
                center: new L.LatLng( 23.16, -106.35 ),
                zoom: 4,
                zoomControl: false
            };

            // Set the rendered element's id, this will be used
            // by afterRender to locate the map container
            $( this.el ).attr( "id", this.domId );
        }
    });



    // Things Surface.View does...
    //
    // 1. Render a leaflet surface (map)
    // 2. Indicate that it is ready for Points to be added

    return Surface;
});
