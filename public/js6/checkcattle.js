function checkcattle() {
    this.check = function (is_cattle, is_have_limit_product) {
        var is_succeed = false;
        if (!(is_cattle == 1 && is_have_limit_product == 1)) {
            is_succeed = true;
        }
        else {
            if (!$1("return_data") || $1("return_data").value == "") {
                PhoneAuth.init();
                return is_succeed;
            }
            if (!($1("return_data").value == "")) {
                //安全中心验证工作放在后台
                return true;
                //var strArray = new Array();
                //strArray = $1("return_data").value.split("|");

                //var check_cattle_ajax = new Ajax('check_cattle.aspx');
                //check_cattle_ajax.OnSucceed(
                //    function (result) {
                //        if (result != null && result['errorCode'] == 0) {
                //            is_succeed = true;
                //        }
                //        else {
                //            is_succeed = false;
                //        }
                //    }
                //    );
                //check_cattle_ajax.OnTimeout(
                //    function () {
                //        check_cattle_ajax.Abort();
                //    }
                //    );

                //check_cattle_ajax.invokeServer('return_phone=' + strArray[0] + '&return_vcode=' + strArray[1] + '&verify_type=' + strArray[2], 'POST', false);
            }
        }

        return is_succeed;
    }
}