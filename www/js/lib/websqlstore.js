var WebSqlStore = function(successCallback, errorCallback) {
    this.initializeDatabase = function(successCallback, errorCallback) {
        var self = this;
//        $.get('./res/sql/dropTables.sql', function(response) {
//            var db = window.openDatabase("homeworkDB", "1.0", "HomeWork Database", 2 * 1024 * 1024);
//            self.processQuery(db, 0, response.split(';\n'), 'homeworkDB');
//        });
        $.get('./res/sql/dbinit.sql', function(response) {
            var db = window.openDatabase("homeworkDB", "1.0", "HomeWork Database", 2 * 1024 * 1024);
            self.processQuery(db, 0, response.split(';\n'), 'homeworkDB');
        });
    };
    this.processQuery = function(db, i, queries, dbname) {
        var self = this;
        if (i < queries.length - 1) {
//            console.log(i + ' of ' + queries.length);
//            console.log('------------>', queries[i]);
            db.transaction(function(query) {
                query.executeSql(queries[i] + ';', [], function(tx, result) {
                    self.processQuery(db, i + 1, queries, dbname);
                });
            }, function(err) {
//                console.log("Query error in ", queries[i], err.message);
                self.processQuery(db, i + 1, queries, dbname);
            });
        } else {
            alert("Done importing!");
//            console.log("Done importing!");
        }
    };
    this.getDB = function() {
        return db;
    };
    this.getAllRecords = function(tableName, callback) {
        this.db.transaction(
                function(tx) {

                    var sql = "SELECT * FROM " + tableName;

                    tx.executeSql(sql, [], function(tx, results) {
                        var len = results.rows.length,
                                rowSet = [],
                                i = 0;
                        for (; i < len; i = i + 1) {
                            rowSet[i] = results.rows.item(i);
                        }
                        callback(rowSet);
                    });
                },
                function(error) {
                    alert("Transaction Error: " + error.message);
                }
        );
    }
    this.addSampleData = function(tx, employees) {
        var rand = Math.random();
        var listItem = [
            {"id": 1, "list": "Olaray", email: "ryan@dundermifflin.com"}
        ];
        var l = listItem.length;
        var sql = "INSERT OR REPLACE INTO list " +
                "(id, list, email) " +
                "VALUES (?, ?, ?)";
        var e;
        for (var i = 0; i < l; i++) {
            e = listItem[i];
            tx.executeSql(sql, [e.id, e.list, e.email],
                    function() {
                        console.log('INSERT success');
                    },
                    function(tx, error) {
                        alert('INSERT error: ' + error.message);
                    });
        }
    }
    db = this.initializeDatabase(successCallback, errorCallback);
}
