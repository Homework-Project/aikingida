var Remote = function(options) {

    this.configure = function(options, callback) {
        options = $.extend({
//            url: "http://localhost/aikingida/aikingida/api.php",
            url: "http://homework.sch.ng/api.php",
            type: "post",
            dataType: "json"
        }, options);
        $.ajaxSetup(options);
    };
    this.sendData = function(options, beforeSendCallback, successCallback, completeCallback,errorCallback) {
        var config = {};
        config.data = options;
        config.beforeSend = beforeSendCallback;
        config.success = successCallback;
        config.complete = completeCallback;
        config.error = errorCallback;
        $.ajax(config);
    };
    this.configure(options);
};