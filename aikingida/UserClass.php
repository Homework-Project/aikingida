<?php

include_once './Config.php';

class UserClass {

    var $phonenum, $country_code, $country_name, $activateCode, $email, $fullname;

    public function UserClass($phonenum) {
        $this->phonenum = $phonenum;
    }

    public function setPhonenum($newPhonenum) {
        $this->phonenum = $newPhonenum;
    }

    public function setCountryCode($newCountryCode) {
        $this->country_code = $newCountryCode;
    }

    public function setCountryName($newCountryName) {
        $this->country_name = $newCountryName;
    }

    public function setActivateCode($newActivateCode) {
        $this->activateCode = $newActivateCode;
    }

    public function setEmail($newEmail) {
        $this->email = $newEmail;
    }

    public function setFullname($newFullname) {
        $this->fullname = $newFullname;
    }

    public function getPhonenum() {
        return $this->phonenum;
    }

    public function getCountryCode() {
        return $this->country_code;
    }

    public function getCountryName() {
        return $this->country_name;
    }

    public function getActivateCode() {
        return $this->activateCode;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getFullname() {
        return $this->fullname;
    }

    public function save() {
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $phonenum = $this->getPhonenum();
            $email = $this->getEmail();
            $fullname = $this->getFullname();
            $activateCode = $this->getActivateCode();
            $countryCode = $this->getCountryCode();
            $sql = "INSERT INTO user_info(phonenum,email,fullname,`activateCode`,country_code) VALUES('$phonenum','$email','$fullname','$activateCode','$countryCode')";
            if ($mysql->query($sql)) {
                return $mysql->insert_id;
            } else {
                return FALSE;
            }
        }
    }

    public function update($table, $valueSet, $condition) {
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $conditionStr = "";
            $valueSetStr = "";
            $i = 0;
            foreach ($valueSet as $key => $value) {
                if ($i > 0) {
                    $valueSetStr .= ", ";
                }
                $valueSetStr .= "$key = '$value'";
                $i++;
            }
            $conditionStr = "";
            $i = 0;
            foreach ($condition as $key => $value) {
                if ($i > 0) {
                    $conditionStr .= " AND ";
                }
                $conditionStr .= "$key = '$value'";
                $i++;
            }

            $sql = "UPDATE $table SET $valueSetStr WHERE $conditionStr";
            if ($mysql->query($sql)) {
                return TRUE;
            } else {
                return FALSE;
            }
        }
    }

    public function getUserDetails($userPhonenum = null) {
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            if (is_null($userPhonenum)) {
                $phonenum = $this->getPhonenum();
                $sql = "SELECT * FROM user_info WHERE phonenum='$phonenum'";
                if ($result = $mysql->query($sql)) {
                    if ($result->num_rows > 0) {
                        $row = $result->fetch_assoc();
                        return $row;
                    } else {
                        return FALSE;
                    }
                } else {
                    return FALSE;
                }
            } else {
                $sql = "SELECT * FROM user_info WHERE phonenum='$userPhonenum'";
                if ($result = $mysql->query($sql)) {
                    if ($result->num_rows > 0) {
                        $row = $result->fetch_assoc();
                        return $row;
                    } else {
                        return FALSE;
                    }
                } else {
                    return FALSE;
                }
            }
        }
    }

}

?>