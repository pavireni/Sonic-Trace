// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the main application file.
    deps: [ "zeegaplayer", "bootstrap", "main" ],

    paths: {
        // JavaScript folders.
        // libs: "../app/js/libs",
        plugins: "../vendor/js/plugins",
        vendor: "../vendor",

        // Libraries.
        jquery: "../vendor/js/libs/jquery",
        lodash: "../vendor/js/libs/lodash",
        backbone: "../vendor/js/libs/backbone",
        bootstrap: "../vendor/bootstrap/js/bootstrap",

        // Specialty
        zeegaplayer: "../vendor/zeegaplayer/dist/debug/zeega"
    },

    shim: {
        // Backbone library depends on lodash and jQuery.
        backbone: {
            deps: [ "lodash", "jquery" ],
            exports: "Backbone"
        },

        zeegaplayer: [ "jquery", "backbone" ],

        bootstrap: [ "jquery" ],

        // Backbone.LayoutManager depends on Backbone.
        "plugins/backbone.layoutmanager": [ "backbone" ]
    }
});
