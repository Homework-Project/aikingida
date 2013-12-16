
requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
    },
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    },
    urlArgs: { 'bust': Date.now() }// for debug purposes....remove after development
});

// Start the main app logic.
requirejs(['jquery', 'backbone'],
        function($, Backbone) {
            $(document).ready(function() {
//                $.ajax("http://soladnet.com/phonegap-api.php"/*"http://localhost/Login/index.php"*/, {
//                    dataType: "json",
//                    type: "POST",
//                    data:{
//                        a:"a"
//                    },
//                    success: function(response, statusText, xhr) {
////                        $("#content").html(response);
//                        alert(0);
//                    },
//                    error: function(resp, status, error) {
//                        alert(status)
//                        
//                    },
//                    complete: function(resp, status) {
//                        alert(status);
//                    }
//                });
            });
        });