function CustPoint() {
    var self = this;
    var dataSource;
    var pointSubmitCallback;
    var pointCancelCallback;
    var submitCustPointAjax = new Ajax("/point/use_point");
    var cancelCustPointnAjax = new Ajax("/point/cancel");
    var custPointDivBinder = new JSPanel("custPointPanel");
    var custPointDivUsedBinder = new JSPanel("custPointUsedPanel");
 
    function updateSummary() {
        var objSummary = new Summary('div_summary');
        objSummary.setDataSource(dataSource);
        objSummary.show();
    }
    function addEvents() {
        $("submitCustPoint").onclick = function () {
            submitCustPoint();
        };
        $("cancelCustPoint").onclick = function () {
            cancelCustPoint();
        };
        $("point_tip_arrow").onmouseover = function () {
            $("point_tip").className = "ji-tips";
        };
        $("point_tip_arrow").onmouseout = function () {
            $("point_tip").className = "hide";
        };
        //积分输入框取消除数字和.以外的字符
        $("point_deduction_amount").onkeyup = function () {
            $("point_deduction_amount").value = $("point_deduction_amount").value.replace(/[^\d.]/g, "");
        };
    }
    function cancelCustPoint() {
        cancelCustPointnAjax.OnSucceed(function (result) {
            if ((+result.error_code) !== 0) {
                result.errorMessage = "取消积分使用失败";
                $("custPointError").innerHTML = errorTipIcon + result.errorMessage;
            } else {
                succeed(result);
                if (pointCancelCallback) {
                    pointCancelCallback(result);
                }
            }
        });
        cancelCustPointnAjax.invokeServer("", "POST", false);
    }
    function submitCustPoint() {
        var amount = parseFloat($F("point_deduction_amount"));
        var checkOk = false;
        var errorInfo = "";

        if (amount > parseFloat(dataSource['payable_amount'])) {
            errorInfo = "填写金额应小于等于还需支付金额";
        }
        else if (amount > parseFloat(dataSource["point_max_amonut"])) {
            errorInfo = "亲，输入金额超限了";
        }
        else if (amount.toString().indexOf(".") > -1 && (amount.toString().split("."))[1].length > 1) {
            errorInfo = "亲，只能精确到角（一位小数）";
        }
        else if (amount == 0) {
            errorInfo = "输入金额必须大于0";
        }
        else {
            checkOk = true;
        }
        if (!checkOk) {
            $("custPointError").innerHTML = errorTipIcon + errorInfo;
            return;
        }
        var postData = new Hashtable();
        postData["point_deduction_amount"] = amount;

        submitCustPointAjax.OnSucceed(function (result) {
            if ((+result.error_code) !== 0) {
                if (+result.error_code == 150) {
                    result.errorMessage = "抱歉，积分使用失败";
                }
                $("custPointError").innerHTML = errorTipIcon + result.errorMessage;

            } else {
                succeed(result);
                if (pointSubmitCallback) {
                    pointSubmitCallback(result);
                }
            }
        });
        submitCustPointAjax.invokeServer(postData, "POST", false);
    }
    function updateBindings() {
        if (+dataSource["cust_point_used"] <= 0) {
            $("custPointPanel").className = "";
            $("custPointUsedPanel").className = "hide";
        }
        else {
            $("custPointPanel").className = "hide";
            $("custPointUsedPanel").className = "";
        }
    }
    function bindTemplate() {
        custPointDivBinder.Template = custPointTemplate;
        custPointDivBinder.DataSource = dataSource;
        custPointDivBinder.DataBind();

        custPointDivUsedBinder.Template = custPointUsedTemplate;
        custPointDivUsedBinder.DataSource = dataSource;
        custPointDivUsedBinder.DataBind();
    }
    function succeed(result) {
        dataSource = result;
        bindTemplate();
        addEvents();
        updateBindings();
    }

    self.setDataSource = function (source) {
        dataSource = source;
    };
    // set point submit callback
    self.setPonitSubmit = function (fnCallback) {
        pointSubmitCallback = fnCallback;
    };
    // set point cancel callback
    self.setPointCancel = function (fnCallback) {
        pointCancelCallback = fnCallback;
    };
    self.show = function () {
        bindTemplate();
        addEvents();
        updateBindings();
    };
}