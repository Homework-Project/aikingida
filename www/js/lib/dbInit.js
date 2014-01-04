var DatabaseInit = function(options) {//the createDB is boolean to either creat or drop database tables

    this.initializeDatabase = function(dbObject, createDB) {
        var self = this;
        console.log("initializing...");
        var sqlDropTables = './res/sql/dropTables.sql';
        var sqlCreateTables = './res/sql/dbinit.sql';

        var remote = new Remote({url: createDB ? sqlCreateTables : sqlDropTables, dataType: "text", type: "GET"});
        remote.sendData(null, null, function(response, status, xhr) {
            self.processQuery(dbObject, 0, response.split(';\n'), 'homeworkDB');
        }, null, null);
    };
    this.processQuery = function(db, i, queries, dbname) {
        var self = this;
        if (i < queries.length - 1) {
            db.transaction(function(query) {
                console.log("sql: "+queries.length, queries[i]);
                query.executeSql(queries[i] + ';', [], function(tx, result) {
                    self.processQuery(db, i + 1, queries, dbname);
                });
            }, function(err) {
                console.log("error", err.message);
                console.log("errorOBJ", err);
                self.processQuery(db, i + 1, queries, dbname);
            });
        } else {
            if (options.viewObj) {
                options.remote = new Remote();
                options.viewObj.renderWelcomeViewCard(options);
                options.viewObj.renderSampleExamViewCard(options);
            } else {
                console.log("Tables Removed Succssfully!");
            }
        }
    };
    this.initializeDatabase(options.database.getDbObject(), options.createDB);
}
