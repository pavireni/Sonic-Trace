define([
    "app"

], function( App ) {


    var Marker = App.module();

    Marker.Model = Backbone.Model.extend({
        defaults: {
            isRendered: false
        }
    });

    Marker.Collection = Backbone.Collection.extend({
        model: Marker.Model,

        cache: true,

        url: "http://alpha.zeega.org/api/items/73916/items",

        parse: function( obj ) {
            var ids = _.pluck( this.models, "id" );

            // console.log( "IDS", _.pluck( this.models, "cid" ) );
            return ids.length === 0 ?
                obj.items : obj.items.filter(function( item ) {
                    return ids.indexOf( item.id ) === -1;
                });
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
            // Filter Marker Items for markers that aren't
            // yet rendered onto the map surface.
            marks = Marker.Items.filter(function( item ) {
                return !item.get("isRendered");
            });

            console.log( "Marker.Items: Unrendered", marks );

            // 1. Render the markers
            //
            // 2. Update isRendered = true
            //
            //
        }
    });

    // Fetch "bootstrap" Markers
    Marker.Items.fetch();

    return Marker;
});
