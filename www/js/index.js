
$(document).ready(function() {
    var db = window.openDatabase("homeworkDB", "1.0", "HomeWork Database", 2 * 1024 * 1024);
    var dbCrude = new Database(db);
    var remote = new Remote();//class to do remote Ajax call
//    var store1 = new DatabaseInit({database: dbCrude, createDB: false});
    var obj = new View();
    dbCrude.fetch({table: "user_info", column: null, condition: null}, function(tx, result) {
        if (result.rows.length === 0) {//new registration, render welcome page
            console.log(1);
            obj.renderWelcomeViewCard({container: "#content-body", database: dbCrude, remote: remote});
            obj.renderSampleExamViewCard({container: "#content-body", remote: remote});
        } else {
            console.log("a");
            console.log("found user!");
            var row = result.rows.item(0);
            if (row.status === "N") {// activation code not gotten yet, render verifiction page
                console.log("activation code not gotten yet, render verifiction page");
                obj.renderVerificationViewCard({user: {phonenum: row.phonenum, fullname: row.fullname}, container: "#content", fadeIn: true, remote: remote, database: dbCrude});
            } else {//activation code gotten and activated successfully, render user home screen
                console.log("render user home screen...");
                var optionsHomeScreen = {user:{phonenum: row.phonenum, fullname: row.fullname},container: "#content-body", fadeIn: true, remote: remote, database: dbCrude};
//                dbCrude.customFetch("SELECT * FROM result WHERE phonenum = '2348135606572'",function(){});
//                dbCrude.fetch({table: "result", column: null, condition: {phonenum: row.phonenum}}, function(tx, result) {
//                    optionsHomeScreen.papersTaken = result.rows.length;
//                    console.log(result.rows.length);
//                },function(e){
//                    console.log(e.message);
//                });
                obj.renderUserHomeScreen(optionsHomeScreen);
            }
        }
    }, function(err) {
        console.log("err", err.message);
        var store1 = new DatabaseInit({container: "#content-body", viewObj: obj, database: dbCrude, remote: remote, createDB: true});
    });
});