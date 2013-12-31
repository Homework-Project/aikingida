<?php

include_once './UserClass.php';
$db = new mysqli('localhost', 'root', '', 'my_homework_db');
if ($db->connect_errno > 0) {
    throw new Exception("Connection to server failed!");
} else {
    if (filter_input(INPUT_POST, 'param') == "sendCode") {
        $activateCodeComb = array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
        shuffle($activateCodeComb);

        $phonenum = filter_input(INPUT_POST, 'phonenum');
        $email = filter_input(INPUT_POST, 'email');
        $fullname = filter_input(INPUT_POST, 'fullname');
        $country_code = filter_input(INPUT_POST, 'code');
        $activateCode = $activateCodeComb[0] . $activateCodeComb[1] . $activateCodeComb[2] . $activateCodeComb[3];
        $user = new UserClass($phonenum);
        $user->setCountryCode($country_code);
        $user->setFullname($fullname);
        $user->setEmail($email);
        $user->setActivateCode($activateCode);
        if ($user->save()) {
            //send sms now!
            echo json_encode(array("activateCode" => $activateCode));
        } else {
            $details = $user->getUserDetails($phonenum);
            if ($details) {
                echo json_encode(array("activateCode" => $details['activateCode']));
            } else {
                echo json_encode(array("err" => "Registration not successfull"));
            }
        }
    } else if (filter_input(INPUT_POST, 'param') == "resentActivationCode") {
        $phonenum = filter_input(INPUT_POST, 'phonenum');
        $user = new UserClass($phonenum);
        $details = $user->getUserDetails($phonenum);
        if ($details) {
            echo json_encode(array("status" => "Activation Code sent! You will receive an SMS soon."));
        } else {
            echo json_encode(array("err" => "We have trouble sending you an SMS, please try again later."));
        }
    } else if (filter_input(INPUT_POST, 'param') == "verifyActivationCode") {
        $phonenum = filter_input(INPUT_POST, 'phonenum');
        $code = filter_input(INPUT_POST, 'code');
        $user = new UserClass($phonenum);
        $details = $user->getUserDetails($phonenum);
        if ($details) {
            if ($code == $details['activateCode']) {
                if ($user->update("user_info", array("status" => "Y"), array("phonenum" => $phonenum))) {
                    echo json_encode(array("status" => "Activation successful."));
                } else {
                    echo json_encode(array("err" => "We have trouble activating your account, please try again later."));
                }
            } else {
                echo json_encode(array("err" => "Activation code incorrect."));
            }
        } else {
            echo json_encode(array("err" => "We have trouble activating your account, please try again later."));
        }
    }
}
?>