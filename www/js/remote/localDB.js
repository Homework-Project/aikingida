var Database = function(db) {
    this.getDbObject = function() {
        return db;
    };
    this.insert = function(options, callback) {
        db.transaction(function(query) {
            var col = "", value = "";
            if (options.column) {//column is array not object!
                col = options.column.join();
                col = "(" + col + ")";
            }
            $.each(options.values, function(i, item) {
                if (i > 0) {
                    value += ",";
                }
                value += "?";
            });
            var sql = "INSERT INTO " + options.table + " " + col + "VALUES(" + value + ")";
            query.executeSql(sql, options.values, callback);
        });
    };
    this.search = function(options, callback) {
        var col = "*", condition = "1";
        if (options.column) {//column is array not object!
            col = options.column.join();
        }
        if (options.searchColumn) {
            condition = "";
            for (var i = 0; i < options.searchColumn.length; i++) {
                var column = options.searchColumn[i];
                for (var k = 0; k < options.searchTerms.length; k++) {
                    if (k > 0) {
                        condition += " OR ";
                    }
                    condition += column + " LIKE '%" + options.searchTerms[k] + "%'";
                }
            }
        }
        var sql = "SELECT " + col + " FROM " + options.table + " WHERE " + condition;
        console.log(sql);
    };
    this.fetch = function(options, callback, errorCallback) {
        db.transaction(function(query) {
            var col = "*", condition = "1";
            if (options.column) {//column is array not object!
                col = options.column.join();
            }
            if (options.condition) {
                condition = "";
                var x, i = 0;
                for (x in options.condition) {
                    if (i > 0) {
                        condition += " OR ";
                    }
                    condition += x + " = '" + options.condition[x] + "'";
                    i++;
                }
            }
            var sql = "SELECT " + col + " FROM " + options.table + " WHERE " + condition;
            console.log(sql);
            query.executeSql(sql, options.values, callback);
        }, errorCallback);
    };
    this.update = function(options, callback) {
        db.transaction(function(query) {
            var condition = "", valueSet = "";
            if (options.valueSet) {
                valueSet = "";
                var x, i = 0;
                for (x in options.valueSet) {
                    if (i > 0) {
                        valueSet += ", ";
                    }
                    valueSet += x + " = '" + options.valueSet[x] + "'";
                    i++;
                }
            }
            if (options.condition) {
                condition = "";
                var x, i = 0;
                for (x in options.condition) {
                    if (i > 0) {
                        condition += " AND ";
                    }
                    condition += x + " = '" + options.condition[x] + "'";
                    i++;
                }
            }
            var sql = "UPDATE " + options.table + " SET " + valueSet + " WHERE " + condition;
            console.log(sql);
            query.executeSql(sql, options.values, callback);
        }, function(e) {
            console.log(e.message);
        });
    };
    this.delete = function(options, callback) {

    };
    this.customFetch = function(sql, callback) {
        db.transaction(function(query) {
            query.executeSql(sql, callback);
        });
    };
};