define([
    "app"

], function( App ) {

    var Marker = App.module();

    Marker.Model = Backbone.Model.extend({
        defaults: {
            icon: null
        }
    });

    Marker.Collection = Backbone.Collection.extend({
        model: Marker.Model,

        cache: true,

        url: "http://alpha.zeega.org/api/items/73916/items",

        parse: function( obj ) {
            var ids = _.pluck( this.models, "id" );

            // Enforce new-items-only mutations. This prevents
            // previously existing marker items from being treated
            // as newly added merker items on each fetch response.
            return ids.length === 0 ?
                obj.items : obj.items.filter(function( item ) {
                    return ids.indexOf( item.id ) === -1;
                });
        },

        render: function() {
            var surface = Sonic.surfaces.la;

            // TODO: From here, initialize any defaults that will be
            // needed for ALL newly rendered markers
            //
            // L.Icon:
            // See: http://leafletjs.com/examples/custom-icons.html
            //
            //

            this.forEach(function( mark ) {
                if ( mark.get("icon") === null ) {

                    // TODO: From here, initialize any defaults that
                    // will be needed for each individual marker
                    // ie. based on specific marker data

                    // Generate a Leaflet marker, which is added to the
                    // main map surface.
                    mark.set( "icon",
                        new L.Marker([
                            mark.get("media_geo_latitude"),
                            mark.get("media_geo_longitude")
                        ]).addTo( surface )
                    );
                }
            });


            // TODO: Determine a meaningful return value.
            //  - Number of newly rendered markers?
            //  - Boolean success flag?
            //  - Marker.Collection instance?
            //
        }
    });

    // Create a new Marker.Collection to hold all of the
    // map markers.
    Marker.Items = new Marker.Collection();

    // When new Markers are delivered from the server,
    // render them to the maps.
    Marker.Items.on("all", function( type ) {
        var marks;

        if ( type === "reset" || type === "add" ) {
            this.render();
        }
    });

    // Fetch "bootstrap" Marker data
    Marker.Items.fetch();

    return Marker;
});
