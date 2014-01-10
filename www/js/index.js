//document.addEventListener("deviceready", init, false);
init();
function init() {
    var db = window.openDatabase("homeworkDB", "1.0", "HomeWork Database", 2 * 1024 * 1024);
    var dbCrude = new Database(db);
    var remote = new Remote();//class to do remote Ajax call
//    var store1 = new DatabaseInit({database: dbCrude, createDB: false});
    var obj = new View();
    dbCrude.fetch({table: "user_info", column: null, condition: null}, function(tx, result) {
        if (result.rows.length === 0) {//new registration, render welcome page
            obj.renderWelcomeViewCard({container: "#content-body", database: dbCrude, remote: remote});
            obj.renderSampleExamViewCard({container: "#content-body", remote: remote});
        } else {
            var row = result.rows.item(0);
            if (row.status === "N") {// activation code not gotten yet, render verifiction page
                console.log("activation code not gotten yet, render verifiction page");
                obj.renderVerificationViewCard({user: row, container: "#content-body", fadeIn: true, remote: remote, database: dbCrude});
            } else {//activation code gotten and activated successfully, render user home screen
                console.log("render user home screen...");
                dbCrude.fetch({table: "papers_taken", column: null, condition: {phonenum: row.phonenum}}, function(tx, result) {
                    var optionsHomeScreen = {user: row, container: "#content-body", fadeIn: true, remote: remote, database: dbCrude, papersTaken: result.rows.length};
                    obj.renderUserHomeScreen(optionsHomeScreen);
                }, function(e) {
                    console.log(e.message);
                });
            }
        }
    }, function(err) {
        console.log("err", err.message);
        if (!$("#content-body").isMasked()) {
            console.log("masking... ");
            $("#content-body").mask();
        }
        var store1 = new DatabaseInit({container: "#content-body", viewObj: obj, database: dbCrude, remote: remote, createDB: true});
    });
}
