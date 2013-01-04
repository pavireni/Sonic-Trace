define([
    "app"

], function( App ) {

    var Story = App.module();

    Story.Model = Backbone.Model.extend({
        defaults: {
        },

        initialize: function() {
            // Ensure no duplicates?
        }
    });

    Story.Collection = Backbone.Collection.extend({

    });

    return Story;
});
