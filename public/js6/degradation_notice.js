var DEGRADATION_NOTICE_TEMPLATE = 
"<div class='popup-wrap popup-orderEnd' style='left:550px; top:140px; width:490px;z-index:10001' id='degradation_notice'>"
    +"<div class='popup-title' id='notice_title'>" 
      +"<h3>温馨提示</h3>"
      + "<a class='btn-popup-close' href='#'  id='notice_close'></a>"
    +"</div>"
    + "<div class='popup-cont' style='padding:25px 30px;' id='consignee_modify_notice'>"
      + "<p style='width:410px; font-size: 12px;'>您的订单提交失败，会在10分钟之内将您支付的金额退还到到您的账户</p>"
      + "<p class='btn-bar' style='margin-top: 20px;'><a href='#' class='btn btn-small-orange mr-10' id='confirmBnt'>知道了</a></p>"
    + "</div>"
    + "</div>";

function DegradationNoticeDialog(container_id) {
    var m_notice_panel = new JSPanel(container_id);
    var obj_btn_confirm = null;
    var dialog = null;
    var submit_object = null;
    var m_left = 0;
    var m_top = 0;
    this.show = function(submit_order) {
    	submit_object = submit_order;
        document.getElementById('shield_frame').style.height = document.body.clientHeight + "px";
        m_notice_panel.Template = DEGRADATION_NOTICE_TEMPLATE;
        m_notice_panel.DataBind();
        obj_btn_confirm = $1("confirmBnt");
        obj_btn_confirm.onclick = confirmChoice;


        dialog = new DivModelDialogMove('degradation_notice', 'notice_title', 'notice_close', 'div_shield', 'notice_table', 'consignee_modify_notice', false);
        if (dialog != null) {
        	setPositon();
            dialog.show(m_left,m_top);
            dialog.setXboxClick(confirmChoice);
        }
    };
    var confirmChoice = function() {
    	//submit_object.show();
    	window.location.reload();
        //dialog.closeDialog();
    };
    var setPositon = function () {
        var iWidth = 400;     //弹出窗口的宽度;
        var iHeight = 140;    //弹出窗口的高度;
        var scrolltop = 0;
        var scrollleft = 0;
        var cheight = 0;
        var cwidth = 0;
        if (document.compatMode == "BackCompat") {
            cWidth = document.body.clientWidth;
            cHeight = document.body.clientHeight;
            sWidth = document.body.scrollWidth;
            sHeight = document.body.scrollHeight;
            scrollleft = document.body.scrollLeft;
            scrolltop = document.body.scrollTop;
        }
        else { //document.compatMode == \"CSS1Compat\"
            cwidth = document.documentElement.clientWidth;
            cheight = document.documentElement.clientHeight;
            sWidth = document.documentElement.scrollWidth;
            sHeight = document.documentElement.scrollHeight;
            scrollleft = document.documentElement.scrollLeft == 0 ? document.body.scrollLeft : document.documentElement.scrollLeft;
            scrolltop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
        }

        m_left = (cwidth - iWidth) / 2 + scrollleft;
        m_top = (cheight - iHeight) / 2 + scrolltop;

    }
}