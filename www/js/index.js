//var app = {
//    // Application Constructor
//    initialize: function() {
//        this.bindEvents();
//    },
//    // Bind Event Listeners
//    //
//    // Bind any events that are required on startup. Common events are:
//    // 'load', 'deviceready', 'offline', and 'online'.
//    bindEvents: function() {
//        document.addEventListener('deviceready', this.onDeviceReady, false);
//    },
//    // deviceready Event Handler
//    //
//    // The scope of 'this' is the event. In order to call the 'receivedEvent'
//    // function, we must explicity call 'app.receivedEvent(...);'
//    onDeviceReady: function() {
//        app.receivedEvent('deviceready');
//    },
//    // Update DOM on a Received Event
//    receivedEvent: function(id) {
//        var parentElement = document.getElementById(id);
//        var listeningElement = parentElement.querySelector('.listening');
//        var receivedElement = parentElement.querySelector('.received');
//
//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');
//
//        console.log('Received Event: ' + id);
//    }
//};

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
                $.ajax("http://soladnet.com/phonegap-api.php"/*"http://localhost/Login/index.php"*/, {
                    dataType: "json",
                    type: "POST",
                    data:{
                        a:"a"
                    },
                    success: function(response, statusText, xhr) {
//                        $("#content").html(response);
                        alert(0);
                    },
                    error: function(resp, status, error) {
                        alert(status)
                        
                    },
                    complete: function(resp, status) {
                        alert(status);
                    }
                });
            });
        });