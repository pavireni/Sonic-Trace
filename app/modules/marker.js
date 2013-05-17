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

        url: localStorage.api + "/items/search?sort=date-desc&sort=date-desc&collection=" + localStorage.collectionId + "&page=1&fields=id,media_geo_longitude,media_geo_latitude,tags,title",

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


                    if( _.isNumber(mark.get("media_geo_latitude")) && _.isNumber(mark.get("media_geo_longitude"))){

                        latlng = [
                            mark.get("media_geo_latitude"),
                            mark.get("media_geo_longitude")
                        ];

                    } else {


                        latlng = [ 40, 40 ];

                    }

                    

                    // Parse tags to check for icon to be used

                    iconTypes = _.filter( mark.get("tags"), function( tag ){
                        return tag.indexOf("icon-") === 0;
                    });

                    if( iconTypes.length > 0 ){
                        iconLabel = iconTypes[ 0 ].substring( 5 );
                    } else {
                        iconLabel = "standard";
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
                       

                        var story,
                            popup,
                            origin,
                            point;


                        story = Story.Items.get( mark.get("id") );
                        point = event.target;

                        // Highlight the point
                        if ( point.options.icon ) {
                            point.setOpacity(1);
                        } else {
                            point.setStyle({
                                opacity: 1,
                                fillOpacity: 1,
                                color: "#7a676b",
                                fillColor: "#7a676b"
                            });
                        }

                        // Update Origin Map

                        origin = Sonic.origins.match(mark);
                        Sonic.surfaces.mx.panTo( new L.LatLng( origin.get("lat"), origin.get("lng")));

                        latlng2 = [origin.get("lat"), origin.get("lng")];

                    //code for line drawing using CSS
                        var c=document.getElementById("arcCanvas");
                        var ctx=c.getContext("2d");
                        stz=[event.originalEvent.pageX,event.originalEvent.pageY];  //point on hover
                        etz=[108,$(window).height()-140];   //point on minimap
                        ctx.canvas.width=stz[0]-etz[0];
                        ctx.canvas.height=$(window).height();
                        $('#arcCanvas').show();
                        $("#arcCanvas").offset({ top: 0, left: 108});
                        ctx.beginPath();
                        var grd=ctx.createLinearGradient(10,0,(stz[0]-120) ,0);
                        grd.addColorStop(0,"transparent");
                        grd.addColorStop(0.10,"#555555");
                        grd.addColorStop(0.90,"#555555");
                        grd.addColorStop(1,"transparent");
                        ctx.moveTo(10,$(window).height()-140);
                        ctx.quadraticCurveTo(ctx.canvas.width/2-10,0,stz[0]-120,stz[1]); 
                        ctx.shadowOffsetY=20;
                        ctx.shadowBlur=30;
                        ctx.shadowColor="#555555";
                        ctx.lineWidth=10;
                        ctx.strokeStyle=grd;
                        ctx.stroke();
                    //end of arc

                        $(".origin-label").fadeOut("fast", function(){
                            $(this).html( origin.get("place_name") ).fadeIn("slow");
                        });

                        // Create popup
                        // TODO move content to template

                        popup = new L.popup({
                            offset: new L.Point(140, -16),
                            minWidth: 200,
                            maxWidth: 200,
                            minHeight: 36
                        });
                        
                        popup.setLatLng([ event.target.getLatLng().lat, event.target.getLatLng().lng ])
                            .setContent( story.get("title") )
                            .openOn(surface);
                        
                    });

                    icon.on("mouseout", function( event ) {
                        
                        var point = event.target;

                        $("arcCanvas").attr("top","10");
                        $("#arcCanvas").hide();
                        if ( point.options.icon ) {
                            point.setOpacity(0.7);
                        } else {
                            point.setStyle({
                                opacity: 0.7,
                                fillOpacity: 0.7,
                                color: "#5c7b80",
                                fillColor: "#5c7b80"
                            });
                        }
                    });

                    icon.on("click", function(event){

                        var story = Story.Items.get( mark.get("id") );
                            
                        
                        Sonic.router.navigate("#story/" + story.id, { silent : true });
                        // By binding the click handler here, we create an
                        // upvar for |mark|

                        

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

                        var zplayer = new Zeega.player({
                                controls: {
                                  arrows: true,
                                  playpause: true,
                                  close: false
                                },
                                autoplay: true,
                                // data: story.attributes,
                            
                                //
                                target: "#zeega-player",
                                //
                                //  TODO: Investigate why passing previously requested data
                                //  doesn't work.
                                url: story.url()
                            });

                            $(".surface-player").addClass("center");

                            $(".player-title").text( story.get( "title" ) );
                            var sequencesArray = story.get("text").sequences;
                            var trackList="<ul style='list-style-type: none;'>";
                            for (var i = 0; i < sequencesArray.length; i++) {                 
                                trackList = trackList + "<li>"+(i+1)+". "+sequencesArray[i].title+"</li>";
                            }
                            $(".under-story").html(trackList+"</ul>");

                            $(".share-twitter").attr("href", "https://twitter.com/intent/tweet?original_referer=http://sonictrace.org/%23story/" + story.get("id") + "&text=Sonic%20Trace%3A%20" + story.get( "title" ) + "&url=http://sonictrace.org/%23story/" + story.get( "id" ) );
                            $(".share-fb").attr("href", "http://www.facebook.com/sharer.php?u=http://sonictrace.org/%23story/" + story.get("id") );
                            $(".share-email").attr("href", "mailto:friend@example.com?subject=Check out this story on Sonic Trace!&body=http://sonictrace.org/%23story/" + story.get("id") );


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

            // TODO :: Move this to a new controls view for player

            $(".player-close").click(function(){
                $(".ZEEGA-player").remove();
                $(".surface-player").removeClass("center");
                Sonic.router.navigate("", { silent : true });
            });

            $(".fullscreen").click(function(){
                var $playerElem = $(".ZEEGA-player").get(0);

                if ($playerElem.requestFullscreen) {
                  $playerElem.requestFullscreen();
                } else if ($playerElem.mozRequestFullScreen) {
                  $playerElem.mozRequestFullScreen();
                } else if ($playerElem.webkitRequestFullscreen) {
                  $playerElem.webkitRequestFullscreen();
                }
            });

            $(".share").click(function(){
                $(this).find(".icons").toggle();
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
