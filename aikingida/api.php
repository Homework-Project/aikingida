<?php

$db = new mysqli('localhost', 'root', '', 'my_homework_db');
if ($db->connect_errno > 0) {
    throw new Exception("Connection to server failed!");
} else {
    if($_POST['param']=="sendCode"){
        $phonenum = $_POST['phonenum'];
    }
}
?>