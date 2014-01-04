<?php

class HomeWorkServer {

    public function UserClass() {
        
    }

    public function sendSMS($num, $msg, $sender) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "http://107.20.195.151/mcast_ws/?user=9gist&password=soladnet2006romeo1&from=$sender&to=$num&message=" . urlencode($msg));
        curl_setopt($ch, CURLOPT_HTTPGET, 1);
        $strBuffer = curl_exec($ch);
        curl_close($ch);
//        $sql = "INSERT INTO sentSMS (`sender`, `receiver`, `msg`, `time`) VALUES ('$originalSender','$num','$sender','$msg',NOW())";
//        @mysql_query($sql);
    }

}

?>