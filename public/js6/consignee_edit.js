﻿var CONSIGNEE_EDITABLE_TEMPLATE =
    "<div id='consignee_edit_container' class='popup-wrap popup-share popup-share-email'  style='left:40px; top:60px;position:absolute;display:none;z-index:10001;''>"
    + "<div class='popup-title' id='consignee_eidt_title'>"
      	+ "<h3>修改收货人地址</h3>"
      	+ "<a href='javascript:for_99click();' class='btn-popup-close' id='consignee_edit_close'></a>"
  	+ "</div>"
  	+ "<div class='popup-cont'>"
	    + "<p class='color-red' id='identity_num_tip_edit' style='display:none;'>温馨提示：收件人请使用和身份证号对应的真实姓名，否则您购买的商品将无法通过海关检验！</p>"
 		+ "<div class='form-address' id='consignee_eidt_content'>"
			 + "<form class='form' action=''>"
                                   + " <div class='info-list' id='div_normal_ship_name_edit'>"
                                        + "<label class='label-w75' for=''><strong>*</strong> 收&nbsp;&nbsp;货&nbsp;&nbsp;人：</label><input class='input-w178' type='text' placeholder='' maxlength='40' id='txt_ship_name_edit' value='{ship_name}'/>"
                                        + "<span class='hide' id='span_ship_name_valid_msg_edit'><span class='icon icon-warn'></span>请填写收货人姓名</span>"
                                    + "</div>"
                                    + "<div class='info-list hide' id='div_id_ship_name_edit' style='z-index:999;'>"
					                + "  <span class='info-id-name'>"
							        + "     <label class='label-w75' for=''><strong>*</strong> 收&nbsp;&nbsp;货&nbsp;&nbsp;人：</label><input class='input-w90' type='text' placeholder='' id='txt_id_ship_name_edit' value='{ship_name}'>	<a id='identity_num_tip_button_edit' class='info-id-icon'></a><iframe id='identity_num_tip_iframe_edit' class='info_id_num_iframe hide'></iframe><ul id='identity_num_tip_parent_edit' class='info-id-num hide'></ul>"
					                + " </span>"
                                    + " <div class='help-inline help-inline-error hide' id='span_id_ship_name_valid_msg_edit'><span class='icon icon-warn'></span>请您输入正确格式，如“ABC”</div>"
					                + " <div class='info-id'>"
						            + "     <label class='label-w75' for='' style='float:none;'>身份证号：</label><input class='input-w153 mr-5' type='text' placeholder='' id='txt_identity_num_edit' value='{identityNum}'><a target='_blank' href='http://help.dangdang.com/details/page213'>为什么要身份验证</a>"
						            + "     <div class='help-inline help-inline-error hide' id='span_identity_num_valid_msg_edit'><span class='icon icon-warn'></span>请正确输入18位有效二代身份证号码</div>"
					                + " </div>"
				                    + "</div>"
                              		+ "<div class='info-list' id='div_consignee_addr_edit'>"
                            			+ "<label class='label-w75' for=''><strong>*</strong> 收货地区：</label>"
                                  		+ "<select class='select-h22' name='' id='page_sel_country_edit'  style='width:60px'></select>"
                                        + "<select class='select-h22' name='' id='page_sel_province_edit'  style='width:60px'></select>"
                                        + "<select class='select-h22' name='' id='page_sel_city_edit'></select>"
                                        + "<select class='select-h22' name='' id='page_sel_town_edit'></select>"
                                        + "<select class='hide' name='' id='page_sel_quarter_edit'></select>"
                                  		+ "<a a href='http://help.dangdang.com/details/page14' target='_blank' id='lnk_distribution'>查看可货到付款地区</a>"
                                  		+ "<span class='hide' id='span_region_id_valid_msg_edit'><span class='icon icon-warn'></span>订单中有商品暂不能配送到此地址，请重新选择收货地址</span>"
                              		+ "</div>"
                              		+ "<div class='info-list info-list-z11' style='z-index:1000'>"
                            			+ "<label class='label-w75' for=''><strong>*</strong> 详细地址：</label><input class='input-w440' type='text' placeholder=''  maxlength='120' id='txt_ship_address_edit' value='{ship_address}' />"
                                        + "<span id='span_ship_address_valid_msg_edit' class='hide'><span class='icon icon-warn'></span>请填写详细的街道地址，要求3个汉字或以上</span>"
                                        + "<ul id='ul_ship_address_prompt_edit' class='hide input-prompt w440'></ul>"
                              		+ "</div>"
                              		+ "<div class='info-list info-list-z10' style='z-index:999;'>"
                            			+ "<label class='label-w75' for=''><strong>*</strong> 邮政编码：</label><input class='input-w178' type='text' placeholder='' maxlength='20' id='txt_ship_zip_edit' value='{ship_zip}' />"
                                        + "<span id='span_ship_zip_valid_msg_edit' class='hide'><span class='icon icon-warn'></span>请正确填写6位阿拉伯数字的邮政编码</span>"
                                        + "<ul id='ul_zip_prompt_edit' class='hide input-prompt w178'></ul>"
                              		+ "</div>"
                              		+ "<div class='info-list'>"
                            			+ "<label class='label-w75' for=''><strong>*</strong> 手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：</label><input class='input-w178' type='text' placeholder='' id='txt_ship_mb_edit' value='{ship_mb}' maxlength='20' />"
                                  		+ "<span class='mlr-10'>或</span>"
                                  		+ "<label for=''> 固定电话：</label><input class='input-w178' type='text' placeholder='' id='txt_ship_tel_edit' value='{ship_tel}' maxlength='20' />"
                                        + "<span id='span_ship_mb_valid_msg_edit' class='hide'><span class='icon icon-warn'></span>请填写手机号或固定电话</span>"
									+ "</div>"
                              		+ "<div class='hide'>"
                                		+ "<label class='checkbox ml-80'><input id='chk_address_status_edit' type='checkbox' /> 设为默认地址</label>"
                              		+ "</div>"
                              		+ "</form>"
				+ "<div class='btn-bar'>"
					+ "<a class='btn btn-large-orange' id='btn_consignee_save_edit' href='javascript:for_99click();'>确认收货地址</a>"
				+ "</div>"
		+ "</div>"
  	+ "</div>"
  	+ "</div>"

function ConsigneeEditDialog(container_id) {
    var m_edit_consignee_panel = new JSPanel(container_id);
    var m_sel_region = null;
    var txt_ship_address = null;
    var txt_ship_zip = null;
    var txt_ship_name = null;
    var txt_ship_mb = null;
    var txt_ship_tel = null;
    var span_ship_name_valid_msg = null;
    var span_ship_address_valid_msg = null;
    var span_ship_zip_valid_msg = null;
    var span_ship_mb_valid_msg = null;

    var chk_address_status = null;
    var m_data_source = null;
    var m_consignee_save = null;
    var span_region_id_valid_msg = null;
    var span_consignee_save_tips = null;
    var btn_consignee_save = null;

    var ul_zip_prompt = null;
    var ul_ship_address_prompt = null;
    var sel_city = null;
    var sel_town = null;
    var sel_quarter = null;
    var is_valid_address = 0;

    var m_left = 0;
    var m_top = 0;
    var sel_cust_addr_id = 0;
    var ship_address_in_book = "";
    var ship_name_in_book = "";
    var town_id_in_book = 0;
	
	var identity_num_tip = null;
    var div_normal_ship_name = null;
    var div_id_ship_name = null;
    var txt_id_ship_name = null;
    var txt_identity_num = null;

    var curCustSetingData = {
        shipName: "",
		idShipName: "",
        identityNum: "",
        shipAddress: "",
        selRegion: null,
        shipZip: "",
        shipMb: "",
        shipTel: "",
        addressStatus: null,
        addressId: 0,
        isValidAddress: 0,
        shipAddressInBook: "",
        townIdInBook: 0,
        shipNameInBook: ""
    };

    var operateType = {
        add: 0,
        edit:1
    };

    var self = this;
    var m_consignee_save = null;
    var dialog = null;
    //所有订单的order_sequence_id,多个订单用逗号隔开
    var m_order_sequence_ids = null;
	
	//真实的(不带*号的)固定电话和手机号
	var real_ship_tel=null;
	var real_ship_mb=null;

   // var real_time_shippingfee_piece_subtitle = ""; //实时的免运费凑单文字提示
    this.setDataSource = function (data_source) {
        m_data_source = data_source;
        m_edit_consignee_panel.DataSource = data_source;
    };

    this.setOrderSequenceIds = function (order_sequence_ids) {
        m_order_sequence_ids = order_sequence_ids;
    }
    this.setConsigneeSave = function (consignee_save) {
        m_consignee_save = consignee_save;
    };

    this.show = function () {
        document.getElementById('shield_frame').style.height = document.body.clientHeight + "px";
        dialog = new DivModelDialogMove('consignee_edit_container', 'consignee_eidt_title', 'consignee_edit_close', 'div_shield', 'distribution_table', 'consignee_eidt_content', false);
        if (dialog != null) {
            SetEditConsigneePositon();
            dialog.show(m_left, m_top);
        }
    }

    this.bindData = function (operate_type, cur_cust_settings) {
        m_edit_consignee_panel.Template = CONSIGNEE_EDITABLE_TEMPLATE;
        m_edit_consignee_panel.DataBind();
        initEditControl();
        setEditAddressTxtValue(operate_type, cur_cust_settings);
        bindControlEvent();
    }

    function initEditControl() {
        m_sel_region = new Region('div_consignee_addr_edit', m_data_source['order_sequence_id'], 'page', 1);
        sel_city = $("#page_sel_city_edit");
        sel_town = $("#page_sel_town_edit");
        sel_quarter = $("#page_sel_quarter_edit");
        span_ship_name_valid_msg = $("#span_ship_name_valid_msg_edit");
        span_region_id_valid_msg = $("#span_region_id_valid_msg_edit");
        span_ship_address_valid_msg = $("#span_ship_address_valid_msg_edit");
        span_ship_zip_valid_msg = $("#span_ship_zip_valid_msg_edit");
        span_ship_mb_valid_msg = $("#span_ship_mb_valid_msg_edit");
        span_consignee_save_tips = $1("span_consignee_save_tips_edit");
        btn_consignee_save = $("#btn_consignee_save_edit");
        txt_ship_address = $("#txt_ship_address_edit");
        txt_ship_zip = $("#txt_ship_zip_edit");
        txt_ship_name = $("#txt_ship_name_edit");
        txt_ship_mb = $("#txt_ship_mb_edit");
        txt_ship_tel = $("#txt_ship_tel_edit");
        chk_address_status = $("#chk_address_status_edit");
		
        identity_num_tip = $('#identity_num_tip_edit');
        div_normal_ship_name = $('#div_normal_ship_name_edit');
        div_id_ship_name = $('#div_id_ship_name_edit');
        txt_id_ship_name = $('#txt_id_ship_name_edit');
        txt_identity_num = $('#txt_identity_num_edit');

        var icTip = new IdentityNumTip(cust_setting_cache, 'identity_num_tip_button_edit', 'identity_num_tip_parent_edit', 'identity_num_tip_iframe_edit', 'txt_id_ship_name_edit', 'txt_identity_num_edit', m_sel_region);
        icTip.init();
    }

    //operate_type:0-切换收货地址，1-编辑收货地址
    function setEditAddressTxtValue(type, result)
    {
	    if (m_data_source['is_overseas']) {
            identity_num_tip.show();
            div_normal_ship_name.hide();
            div_id_ship_name.show();
        } else {
            identity_num_tip.hide();
            div_normal_ship_name.show();
            div_id_ship_name.hide();
        }
        if (type == operateType.add) {
            txt_ship_name.val(result['ship_name']);
			txt_id_ship_name.val(result['ship_name']);
            txt_identity_num.val(result['identity_num']);
            ship_name_in_book = result['ship_name'];
            txt_ship_zip.val(result['ship_zip']);
            txt_ship_mb.val(ConsigneeCommon.getFormatShipMb(result['ship_mb']));
            txt_ship_tel.val(ConsigneeCommon.getFormatShipTel(result['ship_tel']));
            bind_address_status_val(result['status']);
            sel_cust_addr_id = result['addr_id'];
            is_valid_address = result['is_valid_address'];
            txt_ship_address.val(result['ship_address']);
            ship_address_in_book = result['ship_address'];
            town_id_in_book = result['quarter_id'];
            m_sel_region.setValue(result['country_id'], result['province_id'], result['city_id'], result['town_id'], result['quarter_id'], m_data_source['order_type'], m_data_source['shop_id'], m_data_source['order_products_type']);
            real_ship_mb = result['ship_mb'];
			real_ship_tel = result['ship_tel'];
        } else {
            txt_ship_name.val(m_data_source['ship_name']);
			txt_id_ship_name.val(m_data_source['ship_name']);
            txt_identity_num.val(m_data_source['identity_num']);
            txt_ship_address.val(m_data_source['ship_address']);
            //current_ship_address = txt_ship_address.val();
            txt_ship_zip.val(m_data_source['ship_zip']);
            txt_ship_mb.val(ConsigneeCommon.getFormatShipMb(m_data_source['ship_mb']));
            txt_ship_tel.val(ConsigneeCommon.getFormatShipTel(m_data_source['ship_tel']));
            sel_cust_addr_id = m_data_source['addr_id'];
            bind_address_status_val(m_data_source['address_status']);
            m_sel_region.setValue(m_data_source['country_id'], m_data_source['province_id'], m_data_source['city_id'], m_data_source['town_id'], m_data_source['quarter_id'], m_data_source['order_type'], m_data_source['shop_id'], m_data_source["order_products_type"]);
			real_ship_mb = m_data_source['ship_mb'];
			real_ship_tel = m_data_source['ship_tel'];
        }
    }

    self.getCurCustSetingData = function () {
        if (m_data_source["is_overseas"]) {
            curCustSetingData.shipName = txt_id_ship_name.val();
        } else {
            curCustSetingData.shipName = txt_ship_name.val();
        }
        curCustSetingData.idShipName = txt_id_ship_name.val();
        curCustSetingData.identityNum = txt_identity_num.val();
        curCustSetingData.shipAddress=txt_ship_address.val();
        curCustSetingData.selRegion = m_sel_region;
        curCustSetingData.shipZip= txt_ship_zip.val();
		//手机号和固定电话，判断如果包含*，则取变量里存的真实的值，因为保存早数据库里必须是真实的，不能包含*
		if(txt_ship_mb.val().indexOf("*")>0){
			curCustSetingData.shipMb= real_ship_mb;
		}else{
			curCustSetingData.shipMb= txt_ship_mb.val();
		}
		if(txt_ship_tel.val().indexOf("*")>0){
			curCustSetingData.shipTel= real_ship_tel;
		}else{
			curCustSetingData.shipTel=txt_ship_tel.val();
		}
		
        //curCustSetingData.shipMb= txt_ship_mb.val();
        //curCustSetingData.shipTel=txt_ship_tel.val();
        curCustSetingData.addressStatus = chk_address_status.prop("checked")? 1 : 2;   //(chk_address_status.checked == true) ? 1 : 2;
        curCustSetingData.addressId= sel_cust_addr_id;
        curCustSetingData.isValidAddress=is_valid_address;
        curCustSetingData.shipAddressInBook= ship_address_in_book;
        curCustSetingData.townIdInBook= town_id_in_book;
        curCustSetingData.shipNameInBook= ship_name_in_book;
        return curCustSetingData;
    }


    function bindControlEvent() {
        var consigneeCommon = new ConsigneeCommon();

        ul_zip_prompt = $1('ul_zip_prompt_edit');
        txt_ship_zip.keyup(function (e) { consigneeCommon.txt_ship_zip_keyup(this, e); });
        txt_ship_zip.focus(function () { consigneeCommon.txt_ship_zip_focus(this, m_sel_region, 'ul_zip_prompt_edit', 'txt_ship_zip_edit', 'span_ship_zip_valid_msg_edit'); });
        txt_ship_zip.blur(function () { consigneeCommon.txt_ship_zip_check('txt_ship_zip_edit', 'span_ship_zip_valid_msg_edit', m_sel_region); });

        ul_ship_address_prompt = $1('ul_ship_address_prompt_edit');
        txt_ship_address.keyup(function (e) { consigneeCommon.txt_ship_address_keyup(this, e, 'ul_ship_address_prompt_edit', m_sel_region, 'txt_ship_address_edit', 'span_ship_address_valid_msg_edit'); });
        txt_ship_address.blur(function () { consigneeCommon.txt_ship_address_check('txt_ship_address_edit', 'span_ship_address_valid_msg_edit', m_sel_region); });

        btn_consignee_save.click(function () { edit_consignee_save_click(); });

        txt_ship_name.blur(function () { consigneeCommon.txt_ship_name_check('txt_ship_name_edit', 'span_ship_name_valid_msg_edit', m_sel_region); });
        txt_ship_name.keyup(function () { consigneeCommon.txt_ship_name_keyup(m_sel_region, 'txt_ship_name_edit', 'span_ship_name_valid_msg_edit'); });

		txt_id_ship_name.blur(function () { consigneeCommon.txt_ship_name_check('txt_id_ship_name_edit', 'span_id_ship_name_valid_msg_edit', m_sel_region); });
        txt_id_ship_name.keyup(function () { consigneeCommon.txt_ship_name_keyup(m_sel_region, 'txt_id_ship_name_edit', 'span_id_ship_name_valid_msg_edit'); });
        txt_identity_num.blur(function () { consigneeCommon.txt_identity_num_check('txt_identity_num_edit', 'span_identity_num_valid_msg_edit'); });

        sel_city.blur(function () { if (m_sel_region.isTownHidden() && m_sel_region.isQuarterHidden()) { m_sel_region.getValue(); } });
        sel_town.blur(function () { if (m_sel_region.isQuarterHidden()) { m_sel_region.getValue(); } });
        sel_quarter.blur(function () { m_sel_region.getValue(); });

        //if (m_data_source['province_id'] == 171 || m_data_source['province_id'] == 172 || m_data_source['province_id'] == 173) {
        txt_ship_mb.focus(function () { consigneeCommon.txt_ship_mb_tel_focus(this);});
        txt_ship_tel.focus(function () { consigneeCommon.txt_ship_mb_tel_focus(this);});
        //}
        txt_ship_mb.blur(
		function () { consigneeCommon.txt_ship_mb_tel_check('txt_ship_mb_edit', 'txt_ship_tel_edit', 'span_ship_mb_valid_msg_edit', m_sel_region, m_data_source['order_type'],real_ship_mb,real_ship_tel); });
        txt_ship_tel.blur(
		function () { consigneeCommon.txt_ship_mb_tel_check('txt_ship_mb_edit', 'txt_ship_tel_edit', 'span_ship_mb_valid_msg_edit', m_sel_region, m_data_source['order_type'],real_ship_mb,real_ship_tel); });
    }

    this.consignee_save_check = function () {
        var consigneeCommon = new ConsigneeCommon();
		var ship_name_check = false;
        if (m_data_source['is_overseas']) {
            ship_name_check = consigneeCommon.txt_ship_name_check('txt_id_ship_name_edit', 'span_id_ship_name_valid_msg_edit', m_sel_region)
                && consigneeCommon.txt_identity_num_check('txt_identity_num_edit', 'span_identity_num_valid_msg_edit', m_data_source);
        } else {
            ship_name_check = consigneeCommon.txt_ship_name_check('txt_ship_name_edit', 'span_ship_name_valid_msg_edit', m_sel_region);
        }
        if(m_data_source['conflic_code'] == 708){
        	return false;
        }
        return ship_name_check
            && m_sel_region.getValue() && consigneeCommon.txt_ship_address_check('txt_ship_address_edit', 'span_ship_address_valid_msg_edit', m_sel_region)
            && consigneeCommon.txt_ship_zip_check('txt_ship_zip_edit', 'span_ship_zip_valid_msg_edit', m_sel_region)
            && consigneeCommon.txt_ship_mb_tel_check('txt_ship_mb_edit', 'txt_ship_tel_edit', 'span_ship_mb_valid_msg_edit', m_sel_region, m_data_source['order_type'],real_ship_mb,real_ship_tel);
    };

    //var setAddressStatus=function(curObj)
    //{
    //    if ($(curObj).prop("checked"))
    //    {
    //        $(curObj).prop("checked", false);
    //    }
    //    else
    //        $(curObj).prop("checked", true);
    //}
         

    var edit_consignee_save_click = function () {
    	m_data_source['conflic_code'] = 0;
    	
        var editConsigneeObj = new ConsigneeEditDialog();

        var custSettingData = self.getCurCustSetingData();
        if (!self.consignee_save_check()) {
            return;
        }
        if ($.trim(custSettingData.shipName).indexOf('<') >= 0 || $.trim(custSettingData.shipAddress).indexOf('<') >= 0) return;
        var param_data = ConsigneeCommon.getConsigneeSaveData(custSettingData, m_data_source, m_order_sequence_ids);
        dialog.closeDialog();
        m_consignee_save(param_data);
    };

    function SetEditConsigneePositon() {
        var iWidth = 580; //弹出窗口的宽度;
        var iHeight = 320; //弹出窗口的高度;
        var scrolltop = 0;
        var scrollleft = 0;
        var cheight = 0;
        var cwidth = 0;
        if (document.compatMode == "BackCompat") {
            cwidth = document.body.clientWidth;
            cheight = document.body.clientHeight;
            //sWidth = document.body.scrollWidth;
            //sHeight = document.body.scrollHeight;
            scrollleft = document.body.scrollLeft;
            scrolltop = document.body.scrollTop;
        } else { //document.compatMode == \"CSS1Compat\"
            //cwidth = document.documentElement.clientWidth;
            //cheight = document.documentElement.clientHeight;
            cwidth = document.documentElement.clientWidth;
            cheight = document.documentElement.clientHeight;
            //sWidth = document.documentElement.scrollWidth;
            //sHeight = document.documentElement.scrollHeight;
            scrollleft = document.documentElement.scrollLeft == 0 ? document.body.scrollLeft : document.documentElement.scrollLeft;
            scrolltop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
        }
        m_left = (cwidth - iWidth) / 2 + scrollleft;
        m_top = (cheight - iHeight) / 2 + scrolltop;
    }

    ////编辑收货地址时，如果是默认地址，则默认地址前的单选框选中
    var bind_address_status_val = function (status) {
        if (status == 1) {
            chk_address_status.attr("checked", true)
        } else {
            chk_address_status.attr("checked", false)
        }
    };
 
}