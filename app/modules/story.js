define([
    "app"

], function( App ) {

    var Story = App.module();

    Story.Model = Backbone.Model.extend({
        defaults: {
            isAvailable: false
        },
        url: function() {
            return "http://alpha.zeega.org/api/items/" + this.id;
        },
        parse: function( obj ) {
            var data = obj.items[ 0 ].text;

            // API requests are coming up empty handed for the
            // "text" property now??
            if ( !data ) {
                console.warn(
                    "Zeega API failed to respond with project data. Requested from: ", this.url()
                );
            }


            return data;
        },
        initialize: function() {
            // Push all new Story.Model instances into
            // the Story.Items collection
            Story.Items.add( this );

            this.set( "isAvailable", true );
        }
    });

    Story.Collection = Backbone.Collection.extend({
        model: Story.Model
    });

    Story.Items = new Story.Collection();

    Story.Items.from = function( marks ) {
        if ( marks.length ) {
            marks.forEach(function( story ) {
                ( new Story.Model(story) ).fetch();
            });
        }
    };

    return Story;
});
