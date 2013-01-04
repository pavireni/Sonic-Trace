define([
    "app"

], function( App ) {

    var Marker = App.module();

    Marker.Model = Backbone.Model.extend({
        defaults: {
            icon: null,
            latlng: null
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
                var latlng, icon;

                if ( mark.get("icon") === null ) {

                    latlng = [
                        mark.get("media_geo_latitude"),
                        mark.get("media_geo_longitude")
                    ];

                    // TODO: From here, initialize any defaults that
                    // will be needed for each individual marker
                    // ie. based on specific marker data

                    // Generate a Leaflet marker, which is added to the
                    // main map surface.
                    icon = new L.Circle( latlng, 300, {

                        // TODO: Icon options should be stored as an L.Icon class!!
                        //
                        color: "magenta",
                        fillColor: "magenta",
                        fillOpacity: 1,
                        opacity: 1

                    }).addTo( surface );

                    // Update the mark model, these properties will signify
                    // to later render() calls that these marks do not need
                    // to be rendered to icons
                    mark.set({
                        latlng: latlng,
                        icon: icon
                    });

                    // TODO: Replace with click handler...
                    icon.bindPopup("I will be replaced by a Zeega.Player!");
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
