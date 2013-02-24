define([
    "app"

],
function( App ) {

    var Intro = App.module();

    Intro.Model = Backbone.Model.extend({});

    Intro.View = Backbone.View.extend({

        tagName: "div",
        template: "intro",

        initialize: function( ) {

            $( this.el ).attr( "id", "intro" );
            
        },

        events: {
            "click .skip": function(){
                window.onFinish();
                //$("#intro").fadeOut("fast").remove();
            }
        },
        
        afterRender: function() {

            var f = $("#intro-player"),
            url = f.attr("src").split("?")[ 0 ];


            // Listen for messages from the player
            if ( window.addEventListener ){
                window.addEventListener("message", onMessageReceived, false);
            }
            else {
                window.attachEvent("onmessage", onMessageReceived, false);
            }

            // Handle messages received from the player
            function onMessageReceived( e ) {
                var data = JSON.parse( e.data );
                console.log(e);
                switch (data.event) {
                    case "ready":
                        onReady();
                        break;
                    case "finish":
                        onFinish();
                        break;
                }
            }



            // Helper function for sending a message to the player
            var post = function(action, value) {
                var data = { method: action };

                if (value) {
                    data.value = value;
                }

                f[ 0 ].contentWindow.postMessage( JSON.stringify( data ), url );
            };

            var onReady = function() {
                post("addEventListener", "finish");
            };

            window.onFinish = function() {
                post("pause");
                $("#intro").fadeOut("fast").remove();
            };

        }
    });

    return Intro;
});
