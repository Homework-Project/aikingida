var View = function() {
    var self = this;
    this.renderWelcomeViewCard = function(options, callback) {
        console.log(2);
        var html = '<div class="card card-user" id="card-welcome"><div class="head"><h1 class="font-large">Hello :)</h1></div>' +
                '<hr><div class="card-body"><p class="font-medium">Welcome to HomeWork, In order for you to enjoy the vast collection of exam study materials, you\'ll need to verify your mobile phone number.' +
                '<br><br><i>PS: SMS charges may apply. </i></p>' +
                '<select class="topcoat-text-input margin-bottom" id="country-list"></select>' +
                '<br><input type="tel" id="tel" class="topcoat-text-input margin-bottom" placeholder="Phone Number">' +
                '<br><input type="text" id="fullname" class="topcoat-text-input margin-bottom" placeholder="Full Name"><br>' +
                '<button class="topcoat-button--cta float-right font-medium" id="card-welcome-next"><span class="icon-circleright"></span>Next</button>' +
                '<div class="clear"></div></div></div>';
        $(options.container).append(html);
        options.database.fetch({table: "country", column: null, condition: null}, function(tx, result) {
            if (result.rows.length > 0) {
                $("#country-list").append("<option value='-1'>Select Country</option>");
                for (var i = 0; i < result.rows.length; i++) {
                    var countryOption = "<option value='" + result.rows.item(i).phonecode + "'>" + result.rows.item(i).name + "</option>";
                    $("#country-list").append(countryOption);
                }
                $("#country-list").on("change", function() {
                    $("#tel").val(this.value === "-1" ? "" : this.value);
                });
            } else {
                console.log("NO country found");
            }
        }, null);

        //event triggered when next button clicked
        $("#card-welcome-next").bind("click", function() {
            console.log(3);
            var country = $("#country-list").val();
            var tel = $.trim($("#tel").val());
            var fname = $.trim($("#fullname").val());
            if (country !== "-1" && tel !== "" && fname !== "" && tel.length > country.length) {
                self.showWaitScreen(options.container, true);
                options.database.insert({table: "user_info", column: ["phonenum", "fullname", "country_code"], values: [tel, fname, country]},
                function(tx, result) {
                    options.remote.sendData({param: "sendCode", phonenum: tel, email: "", fullname: fname, code: country},
                    function() {//beforeSendCallback
                        self.showWaitScreen(options.container, true);
                    }
                    , function(response, statusText, xhr) {//successCallback
                        console.log("server response", response);
                        if (!response.err) {
                            options.database.update({table: "user_info", valueSet: {activateCode: response.activateCode}, condition: {phonenum: tel}},
                            function(tx, result) {
                                console.log(4);
                                console.log("update success!");
                                var user = {user: {phonenum: tel, fullname: fname, activateCode: response.activateCode}};
                                options = $.extend(options, user)
                                self.renderVerificationViewCard(options);
                            });
                        } else {
                            if (navigator.notification) {
                                navigator.notification.alert(response.err, null, "Server Error", "OK");
                            } else {
                                alert(response.err);
                            }
                        }
                    }, function() {//completeCallback
                        self.showWaitScreen(options.container, false);
                    }, function() {

                    });
                });
            } else {
                if (navigator.notification) {
                    navigator.notification.alert("Please fill in the right details", null, "Field Error", "OK");
                } else {
                    alert("Please fill in the right details");
                }
            }

        });
    };
    this.renderSampleExamViewCard = function(options, callback) {
        var html = '<div class="card card-exam" id="card-sample-exam"><div class="head"><h1 class="font-large">Sample Exam</h1></div>' +
                '<hr><div class="card-body"><div class="topcoat-list"><ul class="topcoat-list__container">' +
                '<li class="topcoat-list__item"><img src="img/exam-logo-jamb.png" alt="" class="exam-logo">' +
                '<span class="inline-button float-right button-link">Take Paper <span class="icon-arrow-right2"></span><img src="" alt=""></span>' +
                '<p class="font-small"><span class=" "> JAMB </span><br><span class=" "> 2013 </span><br><span class=" "> English Language </span><br>' +
                '</p></li></ul></div><button class="topcoat-button--cta float-right font-medium" ><span class="icon-copy"></span>View all Papers</button>' +
                '<div class="clear"></div></div></div>';
        $(options.container).append(html);
    };
    this.renderVerificationViewCard = function(options, callback) {
        var html = '<div class="card card-user" id="card-verify"><div class="head"><h1 class="font-large">Hi ' + options.user.fullname + '</h1></div>' +
                '<hr><div class="card-body"><p class="font-medium">' +
                'An SMS has been sent to <span>' + options.user.phonenum + '</span>. Please enter the code you recieved here. <br></p>' +
                '<input type="text" id="verification-field" class="topcoat-text-input" placeholder="Verification Code" >' +
                '<br><button class="topcoat-button--cta float-right font-medium" id="verify-button"><span class="icon-uniF471"></span>Verify</button>' +
                '<br><a href="#" class="button-link" id="resend-verification-link"><span class="icon-uniF691"></span>Resend SMS</a>' +
                '<div class="clear"></div></div></div>';
        if ($(options.container).has("#card-welcome").length || $(options.container).has("#card-sample-exam").length) {
            $("#card-welcome, #card-sample-exam").fadeOut(500, function() {
                $(this).remove();
            });
        }
        console.log("rendering verification screen...");
        if (options.fadeIn) {
            $(options.container).append(html).show(500, function() {
            });
        } else {
            $(options.container).append(html);
        }

        $("#verify-button").bind("click", function() {
            var code = $("#verification-field").val();
            if ($.trim(code).length > 0) {
                console.log("code entered", code)
                if (code === options.user.activateCode.toString()) {//send activateCode online and verify den store
                    console.log("code matched! sending data online...");
                    options.remote.sendData({param: "verifyActivationCode", phonenum: options.user.phonenum, code: code},
                    function() {
                        self.showWaitScreen(options.container, true);
                    }, function(response) {//back from server
                        console.log("back from server...sucess");
                        var updateLocalDB = false;
                        if (navigator.notification) {
                            if (!response.err) {
                                updateLocalDB = true;
                                navigator.notification.alert(response.status, null, "Success", "OK");
                            } else {
                                navigator.notification.alert(response.err, null, "Error", "OK");
                            }
                        } else {
                            if (!response.err) {
                                updateLocalDB = true;
                                alert(response.status);
                            } else {
                                alert(response.err);
                            }
                        }
                        console.log("update local db value is ", updateLocalDB);
                        if (updateLocalDB) {
                            options.database.update({table: "user_info", valueSet: {status: "Y"}, condition: {phonenum: options.user.phonenum}},
                            function(tx, result) {
                                //show veryfication success screen
                                console.log("renderVerificationSuccessViewCard");
                                self.renderVerificationSuccessViewCard(options);
                            });
                        }
                    }, function() {
                        self.showWaitScreen(options.container, false);
                    }, function(jqXHR, status, errorThrown) {
                        alert(errorThrown);
                    });
                } else {//inform user verification code is not valid
                    if (navigator.notification) {
                        navigator.notification.alert("Code invalid, please check code and try again", null, "Error", "OK");
                    } else {
                        alert("Code invalid, please check code and try again");
                    }
                }
            } else {
                if (navigator.notification) {
                    navigator.notification.alert("Please enter verification code in the field provided", null, "Notice", "OK");
                } else {
                    alert("Please enter verification code in the field provided");
                }
            }
        });
        $("#resend-verification-link").bind("click", function() {
            options.remote.sendData({param: "resentActivationCode", phonenum: options.user.phonenum},
            function() {//beforeSendCallback
                self.showWaitScreen(options.container, true);
            }, function(response, statusText, xhr) {//successCallback
                if (navigator.notification) {
                    if (!response.err) {
                        navigator.notification.alert(response.status, null, "Success", "OK");
                    } else {
                        navigator.notification.alert(response.err, null, "Error", "OK");
                    }
                } else {
                    if (!response.err) {
                        alert(response.status);
                    } else {
                        alert(response.err);
                    }
                }
            }, function() {//completeCallback
                self.showWaitScreen(options.container, false);
            });
        });
    };
    this.renderVerificationSuccessViewCard = function(options, callback) {
        for (x in options) {
            console.log(x);
        }
        var html = '<div class="card card-user"><div class="head"><h1 class="font-large grade-a"><span class="icon-uniF471"></span>Successful</h1></div>' +
                '<hr><div class="card-body"><p class="font-small">' +
                options.user.fullname + ', your phone number has been verified successfully. You can now enjoy HomeWork :)' +
                '<br>To improve Paper suggestions, please select any of the options below.' +
                '</p><label class="topcoat-radio-button"><input type="radio" name="topcoat" value="Art" id="radio-art"><div class="topcoat-radio-button__checkmark"></div><span class="font-medium"><span class="icon-brush"></span>Art</span></label>' +
                '<br><label class="topcoat-radio-button"><input type="radio" name="topcoat" value="Commercial" id="radio-commercial"><div class="topcoat-radio-button__checkmark"></div><span class="font-medium"><span class="icon-stocks"></span>Commercial</span></label>' +
                '<br><label class="topcoat-radio-button"><input type="radio" name="topcoat" value="Science" id="radio-science"><div class="topcoat-radio-button__checkmark"></div><span class="font-medium"><span class="icon-lab"></span>Science</span></label><br>' +
                '<button class="topcoat-button--cta float-right font-medium" id="finish-button"><span class="icon-uniF471"></span>Finish</button><div class="clear"></div></div></div>';
        $(options.container).append(html);
        $("#card-verify").fadeOut(500, function() {
            $(this).remove();
        });
        $("#finish-button").bind("click", function() {
            self.showWaitScreen(options.container, true);
            var suggestTag = $("input[name='topcoat']:checked").val();
            suggestTag = suggestTag ? suggestTag : "Science,Art,Commercial";
            console.log(suggestTag);
            options.database.update({table: "user_info", valueSet: {sugestCategory: suggestTag}, condition: {phonenum: options.user.phonenum}},
            function(tx, result) {
                options.user = $.extend(options.user, {sugestCategory: suggestTag});
                //show user home screen
                self.renderUserHomeScreen(options);
            });
        });
    }
    this.getAppHeader = function() {
        return '<div class="topcoat-navigation-bar"><div class="topcoat-navigation-bar__item  full"><h1 class="topcoat-navigation-bar__title font-large"><span class="icon-menu menu-trigger"></span>HomeWork</h1></div></div><span id="content-span"></span>';
    }
    this.renderUserHomeScreen = function(options, callback) {
        var html = '<div class="card card-user"><div class="head"><h1 class="font-large">Welcome</h1>' +
                '<h3 class="font-medium"><span class="icon-user"></span>' + options.user.fullname + '</h3>' +
                '</div><hr><div class="card-body "><div class="topcoat-list "><ul class="topcoat-list__container">' +
                '<li class="topcoat-list__item"><span class="inline-button float-right button-link" style="cursor:pointer" id="view-progress-link">View Progress <span class="icon-arrow-right2"></span></span>' +
                '<p class="font-medium"><span class="icon-copy"></span>Paper(s) taken: <span><b id="papers-taken-count">' + (options.papersTaken ? options.papersTaken : 0) + '</b></span></p>' +
                '</li></ul></div>' +
                '<button class="topcoat-button--cta float-right font-medium" id="take-paper-button"> <span class="icon-rawaccesslogs"></span>Take a Paper </button>' +
                '<div class="clear"></div></div></div>';
        $(options.container).html(this.getAppHeader());
        $(".menu-trigger").bind('click', function() {
            if ($("body").hasClass("menu-active")) {
                $("body").removeClass("menu-active");
            } else {
                $("body").addClass("menu-active");
            }
        });
        options.container = "#content-span";
        $(options.container).append(html).fadeIn(500);
        this.renderSuggestExamViewCard(options, null);
    };
    this.renderSuggestExamViewCard = function(options, callback) {
        var html = '<div class="card card-exam"><div class="head"><h1 class="font-large">Suggestions</h1></div>' +
                '<div class="card-body"><div class="topcoat-list"><ul class="topcoat-list__container">';
        options.database.search({table: "subject", column: null, searchColumn: ["sugestCategory"], searchTerms: options.user.sugestCategory.split(",")},
        function(tx, result) {
//            if (result.rows.length > 0) {
//                $("#country-list").append("<option value='-1'>Select Country</option>");
//                for (var i = 0; i < result.rows.length; i++) {
//                    var countryOption = "<option value='" + result.rows.item(i).phonecode + "'>" + result.rows.item(i).name + "</option>";
//                    $("#country-list").append(countryOption);
//                }
//                $("#country-list").on("change", function() {
//                    $("#tel").val(this.value === "-1" ? "" : this.value);
//                });
//            } else {
//                console.log("NO country found");
//            }
        }, null);
        html += '</ul></div><button class="topcoat-button--cta float-right font-medium" ><span class="icon-copy"></span>View all Exams</button>' +
                '<div class="clear"></div></div></div>';
    }
    this.showWaitScreen = function(container, maskUnMask) {
        if (maskUnMask) {
            if (!$(container).isMasked()) {
                $(container).mask();
            }
        } else {
            $(container).unmask();
        }
    };
};