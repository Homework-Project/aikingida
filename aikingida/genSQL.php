<?php

$db = new mysqli('localhost', 'root', '', 'my_homework_db');
if ($db->connect_errno > 0) {
    throw new Exception("Connection to server failed!");
} else {
    if ($db->connect_errno > 0) {
        throw new Exception("Connection to server failed!");
    } else {
        $tableName = $_GET['table'];
        $colmn = "";
        $finalSQL = "";
        $sql = "DESCRIBE $tableName";
        if ($result = $db->query($sql)) {
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_row()) {
                    $colmn[] = $row[0];
                }
            }
        }
        ////////////////////////////////////
        $sql = "SELECT * FROM $tableName";
        if ($result = $db->query($sql)) {
            if ($result->num_rows > 0) {
                $i = 0;
                echo $result->num_rows."<br/><br/>";
                $finalSQL = "INSERT INTO $tableName(`" . (implode('`,`', $colmn)) . "`) SELECT ";
                while ($row = $result->fetch_row()) {
                    if ($i == 0 || $i == 250) {
                        if ($i == 250) {
                            echo "$finalSQL<br/><br/>";
                            $finalSQL = "INSERT INTO $tableName(`" . (implode('`,`', $colmn)) . "`) SELECT ";
                        }
                        for ($x = 0; $x < count($row); $x++) {
                            if ($x != 0 && $x < count($colmn)) {
                                $finalSQL .=",";
                            }
                            $finalSQL .= "'" . str_replace("'","''",$row[$x]) . "' as `$colmn[$x]` ";
                        }
                    } else {
                        $finalSQL .= "UNION SELECT ";
                        for ($x = 0; $x < count($row); $x++) {
                            if ($x != 0 && $x < count($colmn)) {
                                $finalSQL .=",";
                            }
                            $finalSQL .= "'" . str_replace("'","''",$row[$x]) . "'";
                        }
                        $finalSQL .= " ";
                    }
                    $i++;
                }
            }
        }
        echo $finalSQL;
    }
}
?>