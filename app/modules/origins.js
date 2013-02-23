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
            console.log(candidate);
            origin = _.find( _.toArray( this.models ), function( model ){
                return model.get("tag") === candidate;
            });

            return origin;
            
        }
    });

    //  Add new origin locations here
    //      id          -- unique identifier
    //      place_name  -- string displayed on origin map
    //      tag         -- "sampleloc" matches tag "origin-sampleloc"

    Sonic.origins = new Origins.Collection([
        
        // Default location centers on Distrito Federal with text Mexico

        {
            "id":1,
            "place_name":"Mexico",
            "tag":"default",
            "lat":19.246469,
            "lng":-99.101349

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
            "place_name":"Zacatecas",
            "tag":"zacatecas",
            "lat":22.770857,
            "lng":-102.583244

        },
        {
            "id":14,
            "place_name":"Veracruz",
            "tag":"veracruz",
            "lat":19.190277,
            "lng":-96.153336

        },
        {
            "id":15,
            "place_name":"Guanajuato",
            "tag":"guanajuato",
            "lat":20.917019,
            "lng":-101.161736

        },
        {
            "id":16,
            "place_name":"Zacatecas",
            "tag":"zacatecas",
            "lat":22.770857,
            "lng":-102.583244

        },
        {
            "id":17,
            "place_name":"Jalisco",
            "tag":"jalisco",
            "lat":20.154020,
            "lng":-103.914398

        },
        {
            "id":18,
            "place_name":"Nayarit",
            "tag":"nayarit",
            "lat":21.751385,
            "lng":-104.845459

        },
        {
            "id":19,
            "place_name":"Colima",
            "tag":"zacatecas",
            "lat":19.136499,
            "lng":-103.821625

        },
        {
            "id":20,
            "place_name":"Michoacán<",
            "tag":"michoacan<",
            "lat":19.566519,
            "lng":-101.706825

        },
        {
            "id":21,
            "place_name":"Guerrero",
            "tag":"guerrero",
            "lat":17.43919,
            "lng":-99.545097

        },
        {
            "id":22,
            "place_name":"Oaxaca",
            "tag":"oaxaca",
            "lat":17.083332,
            "lng":-96.750000

        },
        {
            "id":23,
            "place_name":"Chiapas",
            "tag":"chiapas",
            "lat":16.756931,
            "lng":-93.129234

        },
        {
            "id":24,
            "place_name":"Yucatan",
            "tag":"yucatan",
            "lat":20.709879,
            "lng":-89.094337

        },
        {
            "id":25,
            "place_name":"Campeche",
            "tag":"campeche",
            "lat":18.931225,
            "lng":-90.261810

        },
        {
            "id":26,
            "place_name":"Quintana Roo",
            "tag":"quintanaroo",
            "lat":19.181740,
            "lng":-88.479141

        },
        {
            "id":27,
            "place_name":"Chihuahua",
            "tag":"chihuahua",
            "lat":28.630581,
            "lng":-106.073700

        },
        {
            "id":28,
            "place_name":"Hidalgo",
            "tag":"hidalgo",
            "lat":20.666819,
            "lng":-99.012894

        },
        {
            "id":29,
            "place_name":"State of Mexico",
            "tag":"stateofmexico",
            "lat":19.496874,
            "lng":-99.723267

        },
        {
            "id":30,
            "place_name":"Distrito Federal",
            "tag":"distritofederal",
            "lat":19.246469,
            "lng":-99.101349

        },
        {
            "id":31,
            "place_name":"Tlaxcala",
            "tag":"tlaxcala",
            "lat":19.29999,
            "lng":-98.239998

        },
        {
            "id":32,
            "place_name":"Colima",
            "tag":"colima",
            "lat":19.136499,
            "lng":-103.821625

        },
        {
            "id":33,
            "place_name":"Puebla",
            "tag":"puebla",
            "lat":19.041298,
            "lng":-98.206200

        },
        {
            "id":34,
            "place_name":"Morelos",
            "tag":"morelos",
            "lat":18.681305,
            "lng":-99.101349

        },
        {
            "id":35,
            "place_name":"Querétaro",
            "tag":"queretaro",
            "lat":20.588793,
            "lng":-100.389885

        },
        {
            "id":36,
            "place_name":"Puebla",
            "tag":"puebla",
            "lat":22.156469,
            "lng":-100.985542

        },
        {
            "id":37,
            "place_name":"Guatemala",
            "tag":"guatemala",
            "lat":15.783,
            "lng":-90.231

        }
        




    ]);


    return Origins;
});
