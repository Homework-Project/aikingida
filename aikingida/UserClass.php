<?php

class UserClass {

    var $phonenum, $country_code, $country_name;

    public function UserClass($phonenum, $country_code) {
        $this->phonenum = $phonenum;
        $this->country_code = $country_code;
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

    public function getPhonenum() {
        return $this->phonenum;
    }

    public function getCountryCode() {
        return $this->country_code;
    }

    public function getCountryName() {
        return $this->country_name;
    }

}

?>