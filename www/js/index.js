
//requirejs.config({
//    //By default load any module IDs from js/lib
//    baseUrl: 'js/lib',
//    //except, if the module ID starts with "app",
//    //load it from the js/app directory. paths
//    //config is relative to the baseUrl, and
//    //never includes a ".js" extension since
//    //the paths config could be for a directory.
//    paths: {
//    },
//    shim: {
//        'backbone': {
//            //These script dependencies should be loaded before loading
//            //backbone.js
//            deps: ['underscore', 'jquery'],
//            //Once loaded, use the global 'Backbone' as the
//            //module value.
//            exports: 'Backbone'
//        },
//        'underscore': {
//            exports: '_'
//        }
//    }
//});

//// Start the main app logic.
//requirejs(['jquery', 'backbone', 'websqlstore'],
//        function($, Backbone) {
$(document).ready(function() {
    var db = window.openDatabase("homeworkDB", "1.0", "HomeWork Database", 2 * 1024 * 1024);
//    var store1 = new DatabaseInit(db, false, null);
    var obj = new View();
    db.transaction(function(tx) {
        tx.executeSql("SELECT * FROM user_info", [], function(tx, result) {
            if (result.rows.length === 0) {
                obj.renderWelcomeViewCard({container: "#content", database: db});
                obj.renderSampleExamViewCard({container: "#content"});
            } else {
                console.log("Good");
            }
        });
    }, function(err) {
        var store1 = new DatabaseInit(db, true, obj);
    });
});