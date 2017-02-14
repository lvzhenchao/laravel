var CONSIGNEE_MODIFY_NOTICE_TEMPLATE = 
"<div class='popup-wrap popup-orderEnd' style='left:550px; top:140px; width:490px;z-index:10001' id='notice_container'>"
    +"<div class='popup-title' id='notice_title'>" 
      +"<h3>温馨提示</h3>"
      + "<a class='btn-popup-close' href='#'  id='notice_close'></a>"
    +"</div>"
    + "<div class='popup-cont' style='padding:25px 30px;' id='consignee_modify_notice'>"
      + "<p style='width:410px; font-size: 12px;'>您的订单中有区域促销商品，您选择了新的送货地址，区域促销价格发生变化</p>"
      + "<p class='btn-bar' style='margin-top: 20px;'><a href='#' class='btn btn-small-orange mr-10' id='confirmBnt'>知道了，继续结算</a><a href='#' class='btn btn-small-grey' id='cancelBnt'>点错了，不修改地址了</a></p>"
    + "</div>"
    + "</div>";


function ConsigneeModifyNoticeDialog(container_id) {
    var m_notice_panel = new JSPanel(container_id);
    var obj_btn_confirm = null;
    var obj_btn_cancel = null;
    var m_consignee_save = null;
    var m_consi_data = null;
    var dialog = null;

    this.show = function(consignee_save, consi_data) {

        m_consignee_save = consignee_save;
        m_consi_data = consi_data;
        document.getElementById('shield_frame').style.height = document.body.clientHeight + "px";


        m_notice_panel.Template = CONSIGNEE_MODIFY_NOTICE_TEMPLATE;
        m_notice_panel.DataBind();
        obj_btn_confirm = $1("confirmBnt");
        obj_btn_cancel = $1("cancelBnt");
        obj_btn_confirm.onclick = confirmChoice;
        obj_btn_cancel.onclick = cancelChoice;


        dialog = new DivModelDialogMove('notice_container', 'notice_title', 'notice_close', 'div_shield', 'notice_table', 'consignee_modify_notice', false);
        if (dialog != null) {
            dialog.show();
        }
    };
    var confirmChoice = function() {
        m_consignee_save(m_consi_data);
        dialog.closeDialog();
    };
    var cancelChoice = function() {
        $("#div_" + m_consi_data["addr_id"]).removeClass("current operate");
        dialog.closeDialog();
    };
}