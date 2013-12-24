var DatabaseInit = function(db, createDB, viewObj) {//the createDB is boolean to either creat or drop database tables

    this.initializeDatabase = function(dbObject, createDB) {
        var self = this;

        var sqlDropTables = './res/sql/dropTables.sql';
        var sqlCreateTables = './res/sql/dbinit.sql';

        $.get(createDB ? sqlCreateTables : sqlDropTables, function(response) {
            self.processQuery(dbObject, 0, response.split(';\n'), 'homeworkDB');
        });
    };
    this.processQuery = function(db, i, queries, dbname) {
        var self = this;
        if (i < queries.length - 1) {
            db.transaction(function(query) {
                query.executeSql(queries[i] + ';', [], function(tx, result) {
                    self.processQuery(db, i + 1, queries, dbname);
                });
            }, function(err) {
                self.processQuery(db, i + 1, queries, dbname);
            });
        } else {
            if (viewObj !== null) {
                viewObj.renderWelcomeViewCard({container: "#content", database: db});
                viewObj.renderSampleExamViewCard({container: "#content"});
            } else {
                console.log("Tables Removed Succssfully!");
            }
        }
    };
    this.initializeDatabase(db, createDB);
}
