define([
    "app"

], function( App ) {

    var Origins = App.module();


    Origins.Collection = Backbone.Collection.extend({

        match: function( model ){
            var candidates, candidate, origin;

            candidates = _.filter( model.get("tags"), function( tag ){
                return tag.indexOf("origin-") === 0;
            });

            if( candidates.length > 0 ){
                candidate = candidates[ 0 ].substring( 7 );
            } else {
                candidate = "default";
            }

            origin = _.find( _.toArray( this.models ), function( model ){
                return model.get("tag") === candidate;
            });

            return origin;
            
        }
    });


    Sonic.origins = new Origins.Collection([
    {
        "id":1,
        "place_name":"Guatemala",
        "tag":"guatemala",
        "lat":15.783,
        "lng":-90.231

    },
    {
        "id":2,
        "place_name":"El Salvador",
        "tag":"elsalvador",
        "lat":13.794,
        "lng":-88.897

    },
    {
        "id":3,
        "place_name":"Honduras",
        "tag":"honduras",
        "lat":15.2,
        "lng":-86.24

    },
    {
        "id":4,
        "place_name":"Baja California",
        "tag":"bajacalifornia",
        "lat":30.840633,
        "lng":-115.283760

    },
    {
        "id":5,
        "place_name":"Baja California Sur",
        "tag":"bajacaliforniasur",
        "lat":26.044445,
        "lng":-111.666069

    },
    {
        "id":6,
        "place_name":"Sonora",
        "tag":"sonora",
        "lat":29.297226,
        "lng":-110.330879

    },
    {
        "id":7,
        "place_name":"Coahuila",
        "tag":"coahuila",
        "lat":27.058676,
        "lng":-101.706825

    },
    {
        "id":8,
        "place_name":"Nuevo León",
        "tag":"nuevoleon",
        "lat":25.727661,
        "lng":-99.545097

    },
    {
        "id":9,
        "place_name":"Aguascalientes",
        "tag":"aguascalientes",
        "lat":21.881796,
        "lng":-102.291267

    },
    {
        "id":10,
        "place_name":"Tamaulipas",
        "tag":"tamaulipas",
        "lat":24.266939,
        "lng":-98.836273

    },
    {
        "id":11,
        "place_name":"Sinaloa",
        "tag":"sinaloa",
        "lat":25.172110,
        "lng":-107.479515

    },
    {
        "id":12,
        "place_name":"Durango",
        "tag":"durango",
        "lat":24.02771,
        "lng":-104.653175

    },
    {
        "id":13,
        "place_name":"",
        "tag":"default",
        "lat":24.02771,
        "lng":-104.653175

    }


]);


    return Origins;
});
