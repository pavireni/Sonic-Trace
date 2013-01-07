define([
    "app",
    "modules/story",
    "modules/icon"
], function( App, Story, Icon ) {

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

        render: function( callback ) {
            var surface, markers;

            surface = Sonic.surfaces.la;

            markers = [];

            // TODO: From here, initialize any defaults that will be
            // needed for ALL newly rendered markers
            //
            // L.Icon:
            // See: http://leafletjs.com/examples/custom-icons.html
            //
            //

            this.forEach(function( mark, k ) {
                var latlng, icon;

                if ( mark.get("icon") === null ) {

                    latlng = [
                        mark.get("media_geo_latitude"),
                        mark.get("media_geo_longitude")
                    ];

                    // TODO: From here, initialize any defaults that
                    // will be needed for each individual marker:
                    //
                    //      - type of Icon to use, based on specific marker data
                    //

                    // Generate an Icon/Leaflet marker, which is added to the
                    // main map surface.
                    icon = new Icon({ latlng: latlng, use: "magenta" }).addTo( surface );

                    // Update the mark model, these properties will signify
                    // to later render() calls that these marks do not need
                    // to be rendered to icons
                    mark.set({
                        latlng: latlng,
                        icon: icon
                    });

                    // Make request for Zeega.Player data

                    // TODO: Replace with click handler... See following...
                    icon.bindPopup("I will be replaced by a Zeega.Player!");

                    // This will eventually replace the above line when
                    // Zeega.Player instances are created.
                    //
                    icon.on("click", function( event ) {
                        var story;

                        // By binding the click handler here, we create an
                        // upvar for |mark|

                        console.log( "icon clicked...", mark.get("id"), event );

                        // Tasks Controlled by this event...
                        //
                        // 1. Remove existing player (unless it is the same story)
                        //
                        // 2. Load a story into a zeega player
                        //
                        //      2.A. If the story is not yet fetched, then wait until it is
                        //
                        // 3. Move the mini-map pointer
                        //
                        //      3.A. Not sure how this is actually going to work?
                        //          The only way to draw these is to use a canvas,
                        //          but the canvas will overlay across the entire
                        //          viewport—which means it will intercept click events.
                        //
                        //

                        // Remove the previously rendered Player
                        // TODO: Make this conditional
                        $(".ZEEGA-player").remove();

                        story = Story.Items.get( mark.get("id") );

                        // If the Story.Model has already been requested.
                        // This is sort of pointless right now since the
                        // |data| property is being rejected by Zeega.player
                        //
                        // TODO: Investigate this failure.
                        //
                        if ( story && story.get("isAvailable") ) {

                            new Zeega.player({
                                autoplay: true,
                                // data: story.attributes,
                                //
                                // Ideally we should control the player target
                                // but for some reason the player is forced behind the maps.
                                // This MIGHT be caused by the map style declarations...
                                // someone with a better sense of CSS can look at this.
                                //
                                // target: "#zeega-player",
                                //
                                url: story.url()
                            }, {
                                next: ".next",
                                prev: ".prev",
                            });
                        }
                    });

                    markers.push({
                        id: mark.get("id")
                    });
                }

                if ( k === this.models.length - 1 && markers.length && callback ) {
                    callback( markers );
                }
            }.bind(this));



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
            this.render(function( markers ) {
                Story.Items.from( markers );
            });
        }
    });

    // Fetch "bootstrap" Marker data
    Marker.Items.fetch();

    return Marker;
});
