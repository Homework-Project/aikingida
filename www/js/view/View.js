var View = function() {
    this.renderWelcomeViewCard = function(options, callback) {
        var html = '<div class="card card-user" id="card-welcome"><div class="head"><h1 class="font-large">Hello :)</h1></div>' +
                '<hr><div class="card-body"><p class="font-medium">Welcome to HomeWork, In order for you to enjoy the vast collection of exam study materials, you\'ll need to verify your mobile phone number.' +
                '<br><br><i>PS: SMS charges may apply. </i></p>' +
                '<select class="topcoat-text-input margin-bottom" id="country-list"></select>' +
                '<br><input type="tel" id="tel" class="topcoat-text-input margin-bottom" placeholder="Phone Number">' +
                '<br><input type="text" id="fullname" class="topcoat-text-input margin-bottom" placeholder="Full Name"><br>' +
                '<button class="topcoat-button--cta float-right font-medium" id="card-welcome-next"><span class="icon-circleright"></span>Next</button>' +
                '<div class="clear"></div></div></div>';
        $(options.container).append(html);
        options.database.transaction(function(query) {
            query.executeSql("SELECT * FROM country", [], function(tx, result) {
                if (result.rows.length > 0) {
                    $("#country-list").append("<option value='-1'>Select Country</option>");
                    for (var i = 0; i < result.rows.length; i++) {
                            var countryOption = "<option value='" + result.rows.item(i).phonecode + "'>" + result.rows.item(i).name + "</option>";
                            $("#country-list").append(countryOption);
                    }
                    $("#country-list").on("change", function() {
                        $("#tel").val(this.value)
                    });
                } else {
                    console.log("NO country found");
                }
            });
        });
        $("#card-welcome-next").on("click",function(){
            alert($("#country-list").val())
        })
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
    }
};