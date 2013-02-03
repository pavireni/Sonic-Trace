define([
    "app",
    "router",
    "modules/story",
    "modules/icon",
    "modules/origins"
], function( App, Router, Story, Icon, Origins ) {

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
                var latlng, icon, iconLabel, iconTypes;

                if ( mark.get("icon") === null ) {

                    latlng = [
                        mark.get("media_geo_latitude"),
                        mark.get("media_geo_longitude")
                    ];

                    // Parse tags to check for icon to be used

                    iconTypes = _.filter( mark.get("tags"), function( tag ){
                        return tag.indexOf("icon-") === 0;
                    });

                    if( iconTypes.length > 0 ){
                        iconLabel = iconTypes[ 0 ].substring( 5 );
                    } else {
                        iconLabel = "magenta";
                    }


                    // Generate an Icon/Leaflet marker, which is added to the
                    // main map surface.
                    icon = new Icon({ latlng: latlng, use: iconLabel }).addTo( surface );

                    // Update the mark model, these properties will signify
                    // to later render() calls that these marks do not need
                    // to be rendered to icons

                    mark.set({
                        latlng: latlng,
                        icon: icon
                    });

                    // Make request for Zeega.Player data

                    icon.on("mouseover", function( event ) {
                        console.log( "icon hovered...", mark.get("id"), event );
                       

                        var story,
                            popup,
                            origin;


                        story = Story.Items.get( mark.get("id") );

                        //Update Origin Map

                        origin = Sonic.origins.match(mark);
                        Sonic.surfaces.mx.panTo( new L.LatLng( origin.get("lat"), origin.get("lng")));
                        $(".origin-label").fadeOut("fast", function(){
                            $(this).html( origin.get("place_name") ).fadeIn("slow");
                        });

                        // Create popup
                        // TODO move content to template

                        popup = new L.popup();
                        
                        popup.setLatLng([ event.target.getLatLng().lat, event.target.getLatLng().lng ])
                            .setContent( story.get("title")+"<br><a>Click to Play</a>" )
                            .openOn(surface);
                        

                        $(popup._wrapper).click(function(){
                            
                            
                            Sonic.router.navigate("#story/" + story.id, { silent : true });
                            // By binding the click handler here, we create an
                            // upvar for |mark|

                            console.log( "popup clicked...", mark.get("id"), event );

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
                                    target: "#zeega-player",
                                    //
                                    //  TODO: Investigate why passing previously requested data
                                    //  doesn't work.
                                    url: story.url(),
                                    next: ".next",
                                    prev: ".prev"
                                });

                                $(".surface-player").addClass("center");

                            }
                        });
                    });

                    markers.push({
                        id: mark.get("id")
                    });
                }

                if ( k === this.models.length - 1 && markers.length && callback ) {
                    callback( markers );
                }
            }.bind(this));

            // TODO :: Move this to a new controls view for player

            $(".close").click(function(){
                $(".ZEEGA-player").remove();
                $(".surface-player").removeClass("center");
                Sonic.router.navigate("", { silent : true });
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
            this.render(function( markers ) {
                Story.Items.from( markers );
            });
        }
    });

    // Fetch "bootstrap" Marker data
    Marker.Items.fetch();

    return Marker;
});
