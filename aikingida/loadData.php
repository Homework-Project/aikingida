<?php

$db = new mysqli('localhost', 'root', '', 'my_homework_db');
if ($db->connect_errno > 0) {
    throw new Exception("Connection to server failed!");
} else {
    if ($db->connect_errno > 0) {
        throw new Exception("Connection to server failed!");
    } else {
        $id = 1;
        //prepare JAMB YEAR
        for ($i = 1978; $i <= 2013; $i++) {
            if ($i != 1996) {
                $sql = "INSERT INTO exam_year(id,`year`,exam_id) VALUES($id,'$i',1)";
                $db->query($sql);
                $insertId = $db->insert_id;
                //ENGLISH LANGUAGE
                $sql = "INSERT INTO subject(exam_id,exam_year_id,`name`,`time`) VALUES(1,$id,'ENGLISH LANGUAGE',2)";
                $db->query($sql);
                //MATHEMATICS
                $sql = "INSERT INTO subject(exam_id,exam_year_id,`name`,`time`) VALUES(1,$id,'MATHEMATICS',2)";
                $db->query($sql);
                //BIOLOGY
                $sql = "INSERT INTO subject(exam_id,exam_year_id,`name`,`time`) VALUES(1,$id,'BIOLOGY',2)";
                $db->query($sql);
                //CHEMISTRY
                $sql = "INSERT INTO subject(exam_id,exam_year_id,`name`,`time`) VALUES(1,$id,'CHEMISTRY',2)";
                $db->query($sql);
                //PHYSICS
                $sql = "INSERT INTO subject(exam_id,exam_year_id,`name`,`time`) VALUES(1,$id,'PHYSICS',2)";
                $db->query($sql);
                //LITERATURE IN ENGLISH
                $sql = "INSERT INTO subject(exam_id,exam_year_id,`name`,`time`) VALUES(1,$id,'LITERATURE IN ENGLISH',2)";
                $db->query($sql);
                //ECONOMICS
                $sql = "INSERT INTO subject(exam_id,exam_year_id,`name`,`time`) VALUES(1,$id,'ECONOMICS',2)";
                $db->query($sql);
                //GOVERNMENT
                $sql = "INSERT INTO subject(exam_id,exam_year_id,`name`,`time`) VALUES(1,$id,'GOVERNMENT',2)";
                $db->query($sql);
                //GEOGRAPHY
                $sql = "INSERT INTO subject(exam_id,exam_year_id,`name`,`time`) VALUES(1,$id,'GEOGRAPHY',2)";
                $db->query($sql);
                //COMMERCE
                $sql = "INSERT INTO subject(exam_id,exam_year_id,`name`,`time`) VALUES(1,$id,'COMMERCE',2)";
                $db->query($sql);
                //ACCOUNT
                $sql = "INSERT INTO subject(exam_id,exam_year_id,`name`,`time`) VALUES(1,$id,'ACCOUNT',2)";
                $db->query($sql);
            }
            $id++;
        }
        //prepare WAEC YEAR
        for ($i = 1988; $i <= 2013; $i++) {
            $sql = "INSERT INTO exam_year(id,`year`,exam_id) VALUES($id,'$i',2)";
            $db->query($sql);
            //ENGLISH LANGUAGE
            $sql = "INSERT INTO subject(exam_id,exam_year_id,`name`,`time`) VALUES(2,$id,'ENGLISH LANGUAGE',2)";
            $db->query($sql);
            //MATHEMATICS
            $sql = "INSERT INTO subject(exam_id,exam_year_id,`name`,`time`) VALUES(2,$id,'MATHEMATICS',2)";
            $db->query($sql);
            //BIOLOGY
            $sql = "INSERT INTO subject(exam_id,exam_year_id,`name`,`time`) VALUES(2,$id,'BIOLOGY',2)";
            $db->query($sql);
            //CHEMISTRY
            $sql = "INSERT INTO subject(exam_id,exam_year_id,`name`,`time`) VALUES(2,$id,'CHEMISTRY',2)";
            $db->query($sql);
            //PHYSICS
            $sql = "INSERT INTO subject(exam_id,exam_year_id,`name`,`time`) VALUES(2,$id,'PHYSICS',2)";
            $db->query($sql);
            //LITERATURE IN ENGLISH
            $sql = "INSERT INTO subject(exam_id,exam_year_id,`name`,`time`) VALUES(2,$id,'LITERATURE IN ENGLISH',2)";
            $db->query($sql);
            //ECONOMICS
            $sql = "INSERT INTO subject(exam_id,exam_year_id,`name`,`time`) VALUES(2,$id,'ECONOMICS',2)";
            $db->query($sql);
            //GOVERNMENT
            $sql = "INSERT INTO subject(exam_id,exam_year_id,`name`,`time`) VALUES(2,$id,'GOVERNMENT',2)";
            $db->query($sql);
            //GEOGRAPHY
            $sql = "INSERT INTO subject(exam_id,exam_year_id,`name`,`time`) VALUES(2,$id,'GEOGRAPHY',2)";
            $db->query($sql);
            //COMMERCE
            $sql = "INSERT INTO subject(exam_id,exam_year_id,`name`,`time`) VALUES(2,$id,'COMMERCE',2)";
            $db->query($sql);
            //ACCOUNT
            $sql = "INSERT INTO subject(exam_id,exam_year_id,`name`,`time`) VALUES(2,$id,'ACCOUNT',2)";
            $db->query($sql);
            //AGRIC
            $sql = "INSERT INTO subject(exam_id,exam_year_id,`name`,`time`) VALUES(2,$id,'AGRICULTURAL SCIENCE',2)";
            $db->query($sql);
            $id++;
        }
        $db->close();
    }
}
?>