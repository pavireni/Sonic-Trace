define([], function() {

    function Icon( preset ) {
        Abstract.assign( this, Icon.Presets[ preset ] );
    }

    Icon.Point = function( color ) {
        return new Icon( color );
    };

    Icon.Presets = {
        magenta: {
            color: "magenta",
            fillColor: "magenta",
            fillOpacity: 1,
            opacity: 1
        }
    };

    return Icon;
});
