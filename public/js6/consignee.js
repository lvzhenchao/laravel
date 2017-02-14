﻿//#region html
var CONSIGNEE_READONLY_TEMPLATE =
"<a name='consignee_point'></a>"
    + "<div class='hide' id='div_consignee_add_info'>"
					+ "<h4>收货地址</h4>"
                    + "<div class='address-new'>"
                        + "<ul>"
                            + "<li class='form-address'>"
							   + "<p class='color-red' id=''identity_num_tip' style='display:none;'>温馨提示：收件人请使用和身份证号对应的真实姓名，否则您购买的商品将无法通过海关检验！</p>"
                               + "<form class='form' action=''>"
                                   + " <div class='info-list' id='div_normal_ship_name'>"
                                        + "<label class='label-w75' for=''><strong>*</strong> 收&nbsp;&nbsp;货&nbsp;&nbsp;人：</label><input class='input-w178' type='text' placeholder='' maxlength='40' id='txt_ship_name' value=''/>"
                                        + "<span class='hide' id='span_ship_name_valid_msg'><span class='icon icon-warn'></span>请填写收货人姓名</span>"
                                    + "</div>"
									+ "<div class='info-list hide' style='z-index:99' id='div_id_ship_name'>"
								    + "     <label class='label-w75' for=''><strong>*</strong> 收&nbsp;&nbsp;货&nbsp;&nbsp;人：</label><input class='input-w178' type='text' placeholder='' id='txt_id_ship_name' value=''>	<a id='identity_num_tip_button' class='info-id-icon'></a><iframe id='identity_num_tip_iframe' class='info_id_num_iframe hide'></iframe><ul id='identity_num_tip_parent' class='info-id-num hide'></ul>"
                                    + "     <span class='help-inline help-inline-error hide' id='span_id_ship_name_valid_msg'><span class='icon icon-warn'></span>请填写收货人姓名</span>"
					                + "</div>"
					                + " <div class='info-list hide' id='div_identity_num'>"
						            + "     <label class='label-w75' for='' style='float:none;'><strong>*</strong> 身份证号：</label><input class='input-w178' type='text' placeholder='' id='txt_identity_num' value=''><a class='ml-5' target='_blank' href='http://help.dangdang.com/details/page213'>为什么要身份验证</a>"
						            + "     <div class='help-inline help-inline-error hide' id='span_identity_num_valid_msg'><span class='icon icon-warn'></span>请正确输入18位有效二代身份证号码</div>"
					                + " </div>"
                              		+ "<div class='info-list' id='div_consignee_addr'>"
                            			+ "<label class='label-w75' for=''><strong>*</strong> 收货地区：</label>"
                                  		+ "<select class='select-h22' name='' id='page_sel_country'></select>"
                                        + "<select class='select-h22' name='' id='page_sel_province'></select>"
                                        + "<select class='select-h22' name='' id='page_sel_city'></select>"
                                        + "<select class='select-h22' name='' id='page_sel_town'></select>"
                                        + "<select class='hide' name='' id='page_sel_quarter'></select>"
                                  		+ "<a href='http://help.dangdang.com/details/page14' target='_blank'  id='lnk_distribution'>查看可货到付款地区</a>"
                                  		+ "<span class='help-inline help-inline-error' id='span_region_id_valid_msg'><span class='icon icon-warn'></span>订单中有商品暂不能配送到此地址，请重新选择收货地址</span>"
                              		+ "</div>"
                              		+ "<div class='info-list info-list-z11'>"
                            			+ "<label class='label-w75' for=''><strong>*</strong> 详细地址：</label><input class='input-w440' type='text' placeholder=''  maxlength='120' id='txt_ship_address' value='' />"
                                        + "<span id='span_ship_address_valid_msg' class='hide'><span class='icon icon-warn'></span>请填写详细的街道地址，要求3个汉字或以上</span>"
                                        + "<ul id='ul_ship_address_prompt' class='hide input-prompt w440'></ul>"
                              		+ "</div>"
                              		+ "<div class='info-list info-list-z10'>"
                            			+ "<label class='label-w75' for=''><strong>*</strong> 邮政编码：</label><input class='input-w178' type='text' placeholder='' maxlength='20' id='txt_ship_zip' value='' />"
                                        + "<span id='span_ship_zip_valid_msg' class='hide'><span class='icon icon-warn'></span>请正确填写6位阿拉伯数字的邮政编码</span>"
                                        + "<ul id='ul_zip_prompt' class='hide input-prompt w178'></ul>"
                              		+ "</div>"
                              		+ "<div class='info-list'>"
                            			+ "<label class='label-w75' for=''><strong>*</strong> 手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：</label><input class='input-w178' type='text' placeholder='' id='txt_ship_mb' value='' maxlength='20' />"
                                  		+ "<span class='mlr-10'>或</span>"
                                  		+ "<label for=''> 固定电话：</label><input class='input-w178' type='text' placeholder='' id='txt_ship_tel' value='' maxlength='20' />"
                                        + "<span id='span_ship_mb_valid_msg' class='hide'><span class='icon icon-warn'></span>请填写手机号或固定电话</span>"
                              		+ "</div>"
                              		+ "<div class='hide'>"
                                		+ "<label class='checkbox ml-80'><input id='chk_address_status' type='checkbox' /> 设为默认地址</label>"
                              		+ "</div>"
                              		+ "</form>"
                                    + "<div class='info-list mar_top12'>"
                                  		+ "<a href='javascript:for_99click();' id='btn_consignee_save' class='btn btn-large-orange' >确认收货地址</a>"
                                        + "<span id='span_consignee_save_tips' class='hide'><span class='icon icon-warn'></span>请点击按钮确认</span>"
                              		+ "</div>"
                          	+ "</li>"
                      	+ "</ul>"
                    + "</div>"
            + "</div>"
           + "<div name='helpHint' id='helpHint'></div>"
           + "<div id='div_delete_address_dialog' class='hide' style='position: relative;z-index: 1001;'>"
                + "<div class='popup-wrap popup-delete'>"
                    + "<div class='popup-cont'>"
                        + "<p>您确定要删除吗？</p>"
                        + "<p class='btn-bar'><a id='btn_confirm' class='btn btn-small-grey mr-10' href='javascript:for_99click();'>确&nbsp;定</a><a id='btn_cancel' class='btn btn-small-grey' href='javascript:for_99click();'>取&nbsp;消</a></p>"
                    + "</div>"
                + "</div>"
           + "</div>"
            + "<div class='item-address' id='div_myaddress_list'>"
                + "<h4><a class='btn' href='javascript:for_99click();' id='rd_new_addr'>使用新地址</a>收货地址<label for='' class='checkbox' id='order_sms' style='display:none; padding-top:10px;'><input type='checkbox' class='ml-20 mr-5' id='order_sms_checkbox'   name='need_send_order_sms'  {checked} value='{need_send_order_sms}'><span>发货时，给我已绑定的手机号：<span class='mr-10' id='register_mb_span'>{register_mb}</span>发送短信</span></label></h4> "
                    + "<div class='addr_list clearfix' id='div_myaddress'></div>"
                + "<p><a class='ml-5' href='javascript:for_99click();' id='lnk_more_address'>收起其他地址</a></p>"
            + "</div>"

var RPT_MYADDRESS_ITEMTEMPLATE =
	 "<div class='addr' id='div_{addr_id}'  addrindex='{addr_index}' addrid='{addr_id}'>"
		+ "<h1>{ship_name_desc}<span class='ml-10'>（收）</span></h1>"
		+ "<p><span class='mr-3'>{country_name_desc}</span><span class='mr-3'>{province_city_name}</span><span class='mr-3'>{town_name_desc}</span><span class='mr-3'>{quarter_name_desc}</span><span class='mr-3'>{ship_address_desc}</span><span>{ship_contact}</span></p><p id='identity_num_{addr_index}' class='add_id'></p>"
        + "<a href='javascript:for_99click();'  class='hide' id='edit_{addr_index}'>编辑</a><a href='javascript:for_99click();' class='hide' id='delete_{addr_index}'>删除</a><a href='javascript:for_99click();' class='hide' id='default_{addr_index}'>设为默认地址</a><em {is_default} id='default_address_em'></em>"
	+ "</div>"

var CONSIGNEE_ICON_WARN = "<span class='icon icon-warn'></span>";
var current_ship_address = null;
//#endregion


//#region regex
var REGEX_SHIP_MB = '^((13[0-9])|(14[0-9])|(15[^4,\\D])|(18[0-9])|(17[0-9]))\\d{8}$';
var REGEX_SHIP_TEL = '^(\\d|\\(|\\)|\\-)*$';
var REGEX_SHIP_ZIP = '^(\\d{6})?$';
//#endregion

//#region error message
var MSG_SHIP_NAME_EMPTY = '请填写收货人姓名';
var MSG_SHIP_NAME_EMPTY2 = '请用英文填写收货人姓名';
var MSG_SHIP_ADDRESS_EMPTY = '请填写详细的街道地址，要求3个汉字或以上';
var MSG_SHIP_ADDRESS_EMPTY2 = '请用英文填写详细地址信息，至少五个字母';
var MSG_MB_TEL_EMPTY = '请填写手机号或固定电话';
var MSG_MB_TEL_GAT = '为了保证港澳台订单的正常配送，请您填写当地有效的联系方式';
var MSG_SHIP_ZIP_ERROR = '请正确填写6位阿拉伯数字的邮政编码';
var MSG_SHIP_MB_ERROR = '请正确填写11位有效的手机号';
var MSG_SHIP_TEL_ERROR = '请正确填写固定电话';
var MSG_INVALID_CHAR_ERROR = '您输入的内容中含有不支持的字符{0}，请修改';
var MSG_PDDMONEY_SHIP_TEL_EMPTY = '请填写移动电话,礼品卡激活信息将会在订单交易成功后发送到此号码上';
var MSG_IDENTITY_NUM_ERROR = '请正确输入18位有效二代身份证号码';
//#endregion
var cust_setting_cache = null;
//#region function
function Consignee(container_id) {
    var objConsigneeModifyNoticeDialog = new ConsigneeModifyNoticeDialog("consignee_modify_notice_dialog");
    var m_order_flow_data_source = null;
    var m_consignee_panel = new JSPanel(container_id);
    var m_rpt_myaddress = null;
    var m_sel_region = null;
    var m_data_source = null;
    //var m_show_status = null;
    var m_show_more_address_status = null;
    var m_consignee_save = null;
    var m_consignee_close = null;
    var m_consignee_sync = null;
    //var span_city_desc = null;
    var span_country_name_display = null;
    var span_province_name_display = null;
    var span_city_name_display = null;
    var span_town_name_display = null;
    var span_quarter_name_display = null;
    var span_ship_name_valid_msg = null;
    var span_region_id_valid_msg = null;
    var span_ship_address_valid_msg = null;
    var span_ship_zip_valid_msg = null;
    var span_ship_mb_valid_msg = null;
    var span_consignee_save_tips = null;

    var span_country_name_display = null;
    var span_province_name_display = null;
    var span_city_name_display = null;
    var span_town_name_display = null;
    var span_quarter_name_display = null;
    var span_ship_mb_display = null;
    var span_ship_tel_display = null;

    var btn_consignee_save = null;
    var btn_delete_confirm = null;
    var btn_delete_cancel = null;
    var div_consignee_add_info = null;
    var div_myaddress = null;

    var div_delete_address_dialog = null;
    var txt_ship_address = null;
    var txt_ship_zip = null;
    var txt_ship_name = null;
    var txt_ship_mb = null;
    var txt_ship_tel = null;
    var ul_zip_prompt = null;
    var ul_ship_address_prompt = null;
    var sel_city = null;
    var sel_town = null;
    var sel_quarter = null;
    var sel_cust_addr_id = null;
    var is_valid_address = null;
    var town_id_in_book = null;
    var ship_name_in_book = null;
    var ship_address_in_book = null;
    var lnk_distribution = null;
    var lnk_more_address = null;
    var chk_address_status = null;
    var index = -1;

    var obj_order_sms = null;
    var obj_order_sms_checkbox = null;
    var obj_register_mb = null;
    var rd_new_addr = null;
    var editConsigneeObj = null;
    var sel_cust_addr_index = 0;
	
	var identity_num_tip = null;
    var div_normal_ship_name = null;
    var div_id_ship_name = null;
    var div_identity_num = null;
    var txt_id_ship_name = null;
    var txt_identity_num = null;
	var last_identity_num = '';


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
        edit: 1,
        del: 2
    };
    var districtMallOrderType = {
        /**
        * 普通订单
        */
        Normal: 0,
        /**
         * 区域清仓
         */
        AreaMall: 1,
        /**
         * 区域运营
         */
        AreaOperation: 2,
        /**
         * 混合促销
         */
        AreaMixed: 3
    };
    //当前是否为新增收货地址状态 1-是，0-不是
    var m_add_address_status = 0;
    //所有订单的order_sequence_id，多个用逗号隔开
    var m_order_sequence_ids = null;

    var initReadOnlyControl = function () {
        m_rpt_myaddress = new JSRepeater('div_myaddress');
        m_rpt_myaddress.ItemTemplate = RPT_MYADDRESS_ITEMTEMPLATE;
        m_sel_region = new Region('div_consignee_addr', m_data_source['order_sequence_id'], 'page', 0);
        sel_city = $("#page_sel_city");
        sel_town = $("#page_sel_town");
        sel_quarter = $("#page_sel_quarter");
        span_ship_name_valid_msg = $("#span_ship_name_valid_msg");
        span_region_id_valid_msg = $("#span_region_id_valid_msg");
        span_ship_address_valid_msg = $("#span_ship_address_valid_msg");
        span_ship_zip_valid_msg = $("#span_ship_zip_valid_msg");
        span_ship_mb_valid_msg = $("#span_ship_mb_valid_msg");
        span_consignee_save_tips = $1("span_consignee_save_tips");
        btn_consignee_save = $("#btn_consignee_save");
        btn_delete_confirm = $("#btn_confirm");    //删除收货地址弹窗里的确认按钮
        btn_delete_cancel = $("#btn_cancel");   //删除收货地址弹窗里的取消按钮
        div_consignee_add_info = $("#div_consignee_add_info");    //新增收货地址
        div_myaddress = $("#div_myaddress");
        div_delete_address_dialog = $1("div_delete_address_dialog");    //删除收货地址弹窗
        txt_ship_address = $("#txt_ship_address");
        txt_ship_zip = $("#txt_ship_zip");
        txt_ship_name = $("#txt_ship_name");
        txt_ship_mb = $("#txt_ship_mb");
        txt_ship_tel = $("#txt_ship_tel");
        rd_new_addr = $("#rd_new_addr");   //使用新地址按钮
        lnk_more_address = $("#lnk_more_address");   //查看更多地址
        chk_address_status = $("#chk_address_status");    //新增收货地址时的设为默认地址
        //vip 发货发短信
        obj_order_sms = $1("order_sms");
        obj_order_sms_checkbox = $1("order_sms_checkbox");
        obj_register_mb = $1("register_mb_span");
		
        identity_num_tip = $('#identity_num_tip');
        div_normal_ship_name = $('#div_normal_ship_name');
        div_id_ship_name = $('#div_id_ship_name');
        div_identity_num = $('#div_identity_num');
        txt_id_ship_name = $('#txt_id_ship_name');
        txt_identity_num = $('#txt_identity_num');
    };

    this.setDataSource = function (order_flow_data_source, data_source) {
        m_order_flow_data_source = order_flow_data_source;
        m_data_source = data_source;
        REGEX_SHIP_MB = m_data_source['ship_mb_regular_express'];
        m_consignee_panel.DataSource = data_source;
    };

    
    this.setOrderSequenceIds = function (order_sequence_ids) {
        m_order_sequence_ids = order_sequence_ids;
    }

    this.setConsigneeSave = function (consignee_save) {
        m_consignee_save = consignee_save;
    };

    this.setConsigneeClose = function (consignee_close) {
        m_consignee_close = consignee_close;
    };

    this.setConsigneeSync = function (consignee_sync) {
        m_consignee_sync = consignee_sync;
    };

    this.showReadOnly = function () {
        $("div_consignee").attr("class","item-list");
        //m_show_status = 0;
        sel_cust_addr_id = null;
        m_consignee_panel.Template = CONSIGNEE_READONLY_TEMPLATE;
        m_consignee_panel.DataBind();
        initReadOnlyControl();

        if (cust_setting_cache == null) {
            cust_setting_ajax.invokeServer('method=find', 'POST', false);
        }
        else {
            bindCustSetting(cust_setting_cache);
        }

        //REGEX_SHIP_MB = m_data_source["ship_mb_regular_express"];
        is_valid_address = (m_data_source['is_invalid_address'] == 0) ? 1 : 0;

        initDisplayData();
        bindControlEvent();
        this.VipSMS.setNeedSMS();
        this.VipSMS.refreshRegisterMb();
    };

    this.showEditable = function()
    {
        this.showReadOnly();
        //如果当前是新增收货地址状态，则不再弹开收货地址编辑窗口
            if (m_add_address_status == 0 || m_data_source['conflic_code'] == 727) {
            bindEditConsigneeData(operateType.edit);
            var custSettingData = editConsigneeObj.getCurCustSetingData();
            if (!editConsigneeObj.consignee_save_check()) {
                showEditConsigneeDialog();
                return;
            }
        }
    }

    function initDisplayData()
    {
        span_country_name_display = $("#span_country_name_display");
        span_province_name_display = $("#span_province_name_display");
        span_city_name_display = $("#span_city_name_display");
        span_town_name_display = $("#span_town_name_display");
        span_quarter_name_display = $("#span_quarter_name_display");
        span_ship_mb_display = $("#span_ship_mb_display");
        span_ship_tel_display = $("#span_ship_tel_display");

        if (span_quarter_name_display.html() == span_town_name_display.html()) {
            span_town_name_display.hide();
        }
        else {
            span_town_name_display.attr("class","mr-3");
        }

        if (span_town_name_display.html() == span_city_name_display.html() || m_data_source["city_name"] == '') {
            span_city_name_display.hide();
        }
        else {
            span_city_name_display.attr("class", "mr-3");
        }

        if (span_city_name_display.html() == span_province_name_display.html()) {
            span_province_name_display.hide();
        }
        else {
            span_province_name_display.attr("class", "mr-3");
        }

        if (span_province_name_display.html() == span_country_name_display.html()) {
            span_country_name_display.hide();
        }
        else {
            span_country_name_display.attr("class", "mr-3");
        }
        if (span_ship_mb_display.html() == '') {
            span_ship_mb_display.hide();
            if (span_ship_tel_display.html() == '') {
                span_ship_tel_display.hide();
            }
            else {
                span_ship_tel_display.attr("class", "mr-3");
            }
        }
        else {
            span_ship_mb_display.attr("class", "mr-3");
        }
    }
    //添加、修改收货人信息输入框绑定事件
    function bindControlEvent() {

        current_ship_address = m_data_source['ship_address'];
        var consigneeCommon = new ConsigneeCommon();

        ul_zip_prompt = $1('ul_zip_prompt');
        txt_ship_zip.keyup(function (e) { consigneeCommon.txt_ship_zip_keyup(this, e); });
        txt_ship_zip.focus(function () { consigneeCommon.txt_ship_zip_focus(this, m_sel_region, 'ul_zip_prompt', 'txt_ship_zip', 'span_ship_zip_valid_msg'); });
        txt_ship_zip.blur(function () { consigneeCommon.txt_ship_zip_check('txt_ship_zip', 'span_ship_zip_valid_msg', m_sel_region); });

        ul_ship_address_prompt = $1('ul_ship_address_prompt');
        txt_ship_address.keyup(function (e) { consigneeCommon.txt_ship_address_keyup(this, e, 'ul_ship_address_prompt', m_sel_region, 'txt_ship_address', 'span_ship_address_valid_msg',null); });
        txt_ship_address.blur(function () { consigneeCommon.txt_ship_address_check('txt_ship_address', 'span_ship_address_valid_msg', m_sel_region,null); });
        //txt_ship_address.keyup(function () { consigneeCommon.txt_ship_address_keyup(); });

        btn_consignee_save.click(function () { addConsignee(); });
        btn_delete_confirm.click(function () { deleteConsignee() });
        btn_delete_cancel.click(function () { btn_cancel_click() });
        $("#lnk_more_address").click(function () { show_more_address(); });

        txt_ship_name.blur(function () { consigneeCommon.txt_ship_name_check('txt_ship_name', 'span_ship_name_valid_msg', m_sel_region); });
        txt_ship_name.keyup(function () { consigneeCommon.txt_ship_name_keyup(m_sel_region, 'txt_ship_name', 'span_ship_name_valid_msg'); });

		txt_id_ship_name.blur(function () { consigneeCommon.txt_ship_name_check('txt_id_ship_name', 'span_id_ship_name_valid_msg', m_sel_region); });
        txt_id_ship_name.keyup(function () { consigneeCommon.txt_ship_name_keyup(m_sel_region, 'txt_id_ship_name', 'span_id_ship_name_valid_msg'); });
        txt_identity_num.blur(function () { consigneeCommon.txt_identity_num_check('txt_identity_num', 'span_identity_num_valid_msg'); });
		
        sel_city.blur(function () { if (m_sel_region.isTownHidden() && m_sel_region.isQuarterHidden()) { m_sel_region.getValue(); } });
        sel_town.blur(function () { if (m_sel_region.isQuarterHidden()) { m_sel_region.getValue(); } });
        sel_quarter.blur(function () { m_sel_region.getValue(); });

        if (m_data_source['province_id'] == 171 || m_data_source['province_id'] == 172 || m_data_source['province_id'] == 173) {
            txt_ship_mb.focus(function () { consigneeCommon.txt_ship_mb_tel_check('txt_ship_mb','txt_ship_tel', 'span_ship_mb_valid_msg', m_sel_region, m_data_source['order_type']); });
            txt_ship_tel.focus(function () { consigneeCommon.txt_ship_mb_tel_check('txt_ship_mb', 'txt_ship_tel', 'span_ship_mb_valid_msg', m_sel_region, m_data_source['order_type']); });
        }
        txt_ship_mb.blur(function () { consigneeCommon.txt_ship_mb_tel_check('txt_ship_mb', 'txt_ship_tel', 'span_ship_mb_valid_msg', m_sel_region, m_data_source['order_type']); });
        txt_ship_tel.blur(function () { consigneeCommon.txt_ship_mb_tel_check('txt_ship_mb', 'txt_ship_tel', 'span_ship_mb_valid_msg', m_sel_region, m_data_source['order_type']); });
    }


    this.setSubmitConflictTips = function () {
        var region_value = null;
        if (!consignee_save_check()) return;
        region_value = m_sel_region.getValue();
        if ($.trim(txt_ship_name).indexOf('<') >= 0 || $.trim(txt_ship_address).indexOf('<') >= 0) return;
    };

    this.setHignLight = function () {
        btn_consignee_save.className = 'btn btn-large-orange ml-75';
    };

    this.setDisabled = function () {
        $disabled('btn_consignee_save');
        $wait('btn_consignee_save');
    };

    this.setEnabled = function () {
        $enabled('btn_consignee_save');
        $1('btn_consignee_save').style.cursor = 'pointer';
    }

    //商品报缺时，点击“修改地址”调用
    this.EidtConsignee = function () {
        bindEditConsigneeData(operateType.edit);
        var custSettingData = editConsigneeObj.getCurCustSetingData();
        showEditConsigneeDialog();
    }

    var cust_setting_ajax = new Ajax('/consignee/custAddress');

    cust_setting_ajax.OnSucceed
	(
		function (result) {
		    if (result != null && result['error_code'] == 0 && result['cust_settings']!=null) {
		        cust_setting_cache = result['cust_settings'];
		        for (var i = 0; i < cust_setting_cache.length; i++) {
                //格式化收货地址栏显示的数据
		            if (cust_setting_cache[i]["ship_mb"] == '') {
		                cust_setting_cache[i]["ship_contact"] = ConsigneeCommon.getFormatShipTel(cust_setting_cache[i]["ship_tel"]);
		            } else {
		                cust_setting_cache[i]["ship_contact"] = ConsigneeCommon.getFormatShipMb(cust_setting_cache[i]["ship_mb"]);
		            }
		            cust_setting_cache[i]["ship_name_desc"] = nTruncate(cust_setting_cache[i]["ship_name"],9);
		            cust_setting_cache[i]['country_name_desc'] = cust_setting_cache[i]['country_name'];
		            if (cust_setting_cache[i]['province_name'] == cust_setting_cache[i]['country_name']) {
		                cust_setting_cache[i]['province_name_desc'] = "";
		            }
		            else {
		                cust_setting_cache[i]['province_name_desc'] = cust_setting_cache[i]['province_name'];
		            }
		            if (cust_setting_cache[i]['province_name'] == cust_setting_cache[i]['city_name']) {
		                cust_setting_cache[i]['city_name_desc'] = "";
		            }
		            else {
		                cust_setting_cache[i]['city_name_desc'] = cust_setting_cache[i]['city_name'];
		            }
		            if (cust_setting_cache[i]['city_name'] == cust_setting_cache[i]['town_name']) {
		                cust_setting_cache[i]['town_name_desc'] = "";
		            }
		            else {
		                cust_setting_cache[i]['town_name_desc'] = cust_setting_cache[i]['town_name'];
		            }
		            if (cust_setting_cache[i]['town_name'] == cust_setting_cache[i]['quarter_name']) {
		                cust_setting_cache[i]['quarter_name_desc'] = "";
		            }
		            else {
		                cust_setting_cache[i]['quarter_name_desc'] = cust_setting_cache[i]['quarter_name'];
		            }

		            if (cust_setting_cache[i]['city_name_desc'] == '' || (cust_setting_cache[i]['city_name_desc'] == cust_setting_cache[i]['province_name_desc'])) {
		                cust_setting_cache[i]['province_city_name'] = cust_setting_cache[i]['province_name_desc'];
		            } else {
		                cust_setting_cache[i]['province_city_name'] = cust_setting_cache[i]['province_name_desc'] + ' ' + cust_setting_cache[i]['city_name_desc'];
		            }
					
					cust_setting_cache[i]['ship_address_desc'] = ConsigneeCommon.getFormatAddress(cust_setting_cache[i]['ship_address']);
		        }
		        bindCustSetting(cust_setting_cache);
		        $("#div_myaddress_list").show();
		    }
		    else {
		        cust_setting_cache = null;
		        lnk_more_address.hide();
		        div_delete_address_dialog.className = 'hide';
             //地址本表里没有数据，新增了收货地址或者是订单沿用了之前的订单的收货地址（之前的结算记录）的情况
		        //if (m_data_source["addr_id"] == 0 && m_data_source["country_id"] > 0 && m_data_source["province_id"] > 0 && m_data_source["city_id"] > 0 && m_data_source["town_id"] > 0) {
		        if (m_data_source["country_id"] > 0 && m_data_source["province_id"] > 0 && m_data_source["city_id"] > 0 && m_data_source["town_id"] > 0) {
		            bindCKAddress(result);
		        }
		        else {
                    //新用户进入结算
		            $("#div_myaddress_list").hide();
		            bind_cust_addr_by_index(result, -1);
		        }
		    }
		}
	);

	var showConsigneeAddInfo = function (isShow) {
        if (isShow) {
            div_consignee_add_info.attr("class", "item-address item-address-newuser");
            if (m_data_source['is_overseas']) {
                identity_num_tip.show();
                div_normal_ship_name.hide();
                div_id_ship_name.show();
                div_identity_num.show();
            } else {
                identity_num_tip.hide();
                div_normal_ship_name.show();
                div_id_ship_name.hide();
                div_identity_num.hide();
            }
            m_add_address_status = 1;
        } else {
            div_consignee_add_info.attr("class", "hide");
            m_add_address_status = 0;
        }
    }

    var bindCustSetting = function (result) {
        m_show_more_address_status = 0;

        if (result == null || result.length == 0) {
            showConsigneeAddInfo(true);
        }
        else {
            showConsigneeAddInfo(false);
        }

        if (result.length < 5) {
            //收货地址为4个
            div_myaddress.removeClass("addr_list clearfix");
            div_myaddress.addClass("addr_list all clearfix");
            div_myaddress.css("height", "auto");
            lnk_more_address.hide();
        }
        else {
            //收货地址只显示8个
            var limit = 8;
            result.splice(limit, result.length - limit);
            lnk_more_address.show();
            lnk_more_address.text("展开更多地址")
            div_myaddress.css("height", "");
            div_myaddress.removeClass("addr_list all clearfix");
            div_myaddress.addClass("addr_list clearfix");
            if (result.length == 8) {
                rd_new_addr.attr("class", "hide");
            }
        }


        for (var i = 0; i < result.length; i++) {
            if (result[i]['status'] == 1) {
                result[i]['is_default'] = 'class="addr_mo"';
                break;
            }
        }
        updateSelectedAddress(result);
        m_rpt_myaddress.DataSource = result;
        m_rpt_myaddress.DataBind();
		
        if (m_data_source["is_overseas"]) {
            for (var i = 0; i < result.length; i++) {
                if (result[i].identity_num) {
                    $('#identity_num_' + result[i].addr_index).html('<em class="icon_id"></em>' + ConsigneeCommon.getFormatIdentityNum(result[i].identity_num) + '');//<span>实名</span>
                } else {
                    $('#identity_num_' + result[i].addr_index).html('尚未上传身份证');
                }
            }
        }

        if (sel_cust_addr_id == null) {
            if ($("#div_" + m_data_source['addr_id']) != null) {
                sel_cust_addr_id = m_data_source['addr_id'];
            }
            else {

                sel_cust_addr_id = 0;
            }
        }
        else if (sel_cust_addr_id == -1) {
            if (result == null || result.length == 0) {
                sel_cust_addr_id = 0;
            }
            else {
                sel_cust_addr_id = result[0]['addr_id'];
            }
        }
        //如果当前订单使用的收货地址是新增加的，或者是沿用的之前结算记录中的地址信息（这个信息已经在地址本表里删除了）则把这个地址显示在地址信息列表处
        if (m_data_source["addr_id"] == 0 || (m_data_source["addr_id"] > 0 && !isInCustAddressBook(result,m_data_source["addr_id"]))) {
            bindNewAddressHtml(result);
        }

        //选中当前地址
        $("#div_" + sel_cust_addr_id).addClass("current operate");

        //如果当前选中的地址是第四个以后得地址，则展开所有收货地址
        var addr_index = $("#div_" + sel_cust_addr_id).attr("addrindex");
        sel_cust_addr_index = addr_index;
        if (addr_index > 3) {
            div_myaddress.addClass("addr_list all clearfix");
            div_myaddress.css("height", "auto");
            lnk_more_address.hide();
        }
       
        //绑定收货地址相关事件
        bindMouseOverConsigneeEvent();
        bindMouseOutConsigneeEvent();
        bindSeleteConsigneeEvent(result);
        bindDeleteConsigneeEvent();
        bindSetDefaultEvent();
        bindEditConsigneeEvent();
        $("#div_" + sel_cust_addr_id).unbind("click")
        rd_new_addr.click(function () { addNewAddress(result) });
    };

    //判断当前订单使用的地址，是否在地址本表里
    function isInCustAddressBook(result,addr_id){
        if(result!=null)
        {
            for (var i = 0; i < result.length; i++) {
                if (result[i]['addr_id'] == addr_id) {
                    return true;
                }
            }
        }
        return false;
    }

    ///用结算记录更新当前 选择的 地址本的数据（因为如果用户修改了地址本数据，要实时显示更新的结果数据）
    function updateSelectedAddress(result)
    {
        if (result != null) {
            for (var i = 0; i < result.length; i++) {
                if (result[i]['addr_id'] == m_data_source["addr_id"]) {
                    result[i]['ship_name'] = m_data_source["ship_name"];
					result[i]['identity_num'] = m_data_source["identity_num"];
                    result[i]['ship_name_desc'] = nTruncate(m_data_source["ship_name"],9);
                    result[i]['country_name'] = m_data_source["country_name"];
                    result[i]['province_name'] = m_data_source["province_name"];
                    result[i]['city_name'] = m_data_source["city_name"];
                    result[i]['town_name'] = m_data_source["town_name"];
                    result[i]['quarter_name'] = m_data_source["quarter_name"];
                    result[i]['ship_address'] = m_data_source["ship_address"];
                    result[i]['ship_mb'] = m_data_source["ship_mb"];
                    result[i]['ship_tel'] = m_data_source["ship_tel"];
					
					result[i]['country_id'] = m_data_source['country_id'];
                    result[i]['province_id'] = m_data_source['province_id'];
                    result[i]['city_id'] = m_data_source['city_id'];
                    result[i]['town_id'] = m_data_source['town_id'];
                    result[i]['quarter_id'] = m_data_source['quarter_id'];
                    result[i]['ship_zip'] = m_data_source['ship_zip'];

                    if (m_data_source["ship_mb"] == '') {
						result[i]["ship_contact"] = ConsigneeCommon.getFormatShipTel(m_data_source["ship_tel"]);                        
                    } else {
						result[i]["ship_contact"] = ConsigneeCommon.getFormatShipMb(m_data_source["ship_mb"]);
					}				
                    result[i]["ship_name_desc"] = nTruncate(result[i]["ship_name"], 9);
                    result[i]['country_name_desc'] = result[i]['country_name'];
                    if (result[i]['province_name'] == result[i]['country_name']) {
                        result[i]['province_name_desc'] = "";
                    }
                    else {
                        result[i]['province_name_desc'] = result[i]['province_name'];
                    }
                    if (result[i]['province_name'] == result[i]['city_name']) {
                        result[i]['city_name_desc'] = "";
                    }
                    else {
                        result[i]['city_name_desc'] = result[i]['city_name'];
                    }
                    if (result[i]['city_name'] == result[i]['town_name']) {
                        result[i]['town_name_desc'] = "";
                    }
                    else {
                        result[i]['town_name_desc'] = result[i]['town_name'];
                    }
                    if (result[i]['town_name'] == result[i]['quarter_name']) {
                        result[i]['quarter_name_desc'] = "";
                    }
                    else {
                        result[i]['quarter_name_desc'] = result[i]['quarter_name'];
                    }
                    if (result['city_name_desc'] == '' || (result[i]['city_name_desc'] == result[i]['province_name_desc'])) {
                        result[i]['province_city_name'] = result[i]['province_name_desc'];
                    } else {
                        result[i]['province_city_name'] = result[i]['province_name_desc'] + ' ' + result[i]['city_name_desc'];
                    }
					result[i]['ship_address_desc'] = ConsigneeCommon.getFormatAddress(m_data_source["ship_address"]);
                    break;
                }
            }
        }
    }

    /*以下2种情况下调用
    1、是新用户，且已填写完收货地址 时调用 ————要把新添加的地址显示在结算页
    2、只有一个地址，且执行了删除操作后，调用
    */
    var bindCKAddress = function (result)
    {
        if (sel_cust_addr_id == null) {
            if ($("#div_" + m_data_source['addr_id']) != null) {
                sel_cust_addr_id = m_data_source['addr_id'];
            }
            else {
                sel_cust_addr_id = -1;
            }
        }
        
        //新用户，且已填写完收货地址
        if (sel_cust_addr_id >= 0) {
            bindNewAddressHtml();
            $("#div_" + sel_cust_addr_id).addClass("current operate");
            bindEditConsigneeEvent();

            rd_new_addr.click(function () { addNewAddress(result) });
        }
        else
            $("#div_myaddress_list").hide();   //删除唯一的地址，会执行到这里
    }

    function bindNewAddressHtml(result) {
        //当前结算记录有地址信息时，则在地址列表末尾把这个新地址显示出来
        if (m_data_source["country_id"] > 0 && m_data_source["province_id"] > 0 && m_data_source["city_id"] > 0 && m_data_source["town_id"] > 0) {
            var new_address_html = "<div class='addr' id='div_" + m_data_source['addr_id'] + "'  addrindex='' addrid='" + m_data_source['addr_id'] + "'>"
		+ "<h1>" + nTruncate(m_data_source['ship_name'],9) + "<span class='mr-10'>（收）</span></h1>"
		+ "<p><span id='span_country_name_display' class='mr-3'>" + m_data_source["country_name"] + "</span><span id='span_province_name_display' class='mr-3'>" + m_data_source["province_name"] + "</span><span id='span_city_name_display' class='mr-3'>" + m_data_source["city_name"] + "</span><span id='span_town_name_display' class='mr-3'>" + m_data_source["town_name"] + "</span><span id='span_quarter_name_display' class='mr-3'>" + m_data_source["quarter_name"] + "</span><span class='mr-3'>" + ConsigneeCommon.getFormatAddress(m_data_source["ship_address"]) + "</span><span id='span_ship_mb_display' class='mr-3'>" + ConsigneeCommon.getFormatShipMb(m_data_source["ship_mb"]) + "</span><span id='span_ship_tel_display' class='hide'>" + ConsigneeCommon.getFormatShipTel(m_data_source["ship_tel"]) + "</span></p>"
        if (m_data_source["is_overseas"]) {
                if (m_data_source["identity_num"]) {
                    new_address_html += "<p class='add_id'><em class='icon_id'></em>" + ConsigneeCommon.getFormatIdentityNum(m_data_source["identity_num"]) + "</p>";//<span>实名</span>
                } else {
                    new_address_html += "<p class='add_id'>尚未上传身份证</p>";
                }
            }
            new_address_html += "<a href='javascript:for_99click();'  class='hide' id='edit_9'>编辑</a>"
	+ "</div>";

            div_myaddress.append(new_address_html);

            //如果地址本里已有4个地址了，用户又新加了一个，这时要把收货地址列表都展开
            if (result != null) {
                if (result.length >= 4) {
                    div_myaddress.addClass("addr_list all clearfix");
                    div_myaddress.css("height", "auto");
                    lnk_more_address.hide();
                }
            }

        }
    }

    var bind_cust_addr_by_index = function (result, index) {
        span_ship_name_valid_msg.text("");
        span_region_id_valid_msg.text("");
        span_ship_address_valid_msg.text("");
        span_ship_zip_valid_msg.text("");
        span_ship_mb_valid_msg.text("");

        //如果index为-1， 显示添加收货人地址区域,初始化所有输入框的值为空
        if (index == -1) {
            txt_ship_name.value = '';
			txt_id_ship_name.value = '';
            txt_identity_num.value = '';
            txt_ship_address.value = '';
            txt_ship_zip.value = '';
            txt_ship_mb.value = '';
            txt_ship_tel.value = '';
            chk_address_status.attr("checked", false);
            ship_name_in_book = '';
            ship_address_in_book = '';
            town_id_in_book = 0;
            sel_cust_addr_id = 0;
            is_valid_address = 0;
            m_sel_region.setValue(0, 0, 0, 0, 0, m_data_source['order_type'], m_data_source['shop_id'], m_data_source['order_products_type']);

            showConsigneeAddInfo(true);
            m_rpt_myaddress.className = "addr_list clearfix";
            return;
        }

        //不是新用户，隐藏添加收货人地址区域
        showConsigneeAddInfo(false);
        m_rpt_myaddress.className = 'addr_list clearfix';

        var cust_settings_first = result[index];
        if (cust_settings_first != null) {
            txt_ship_name.val(cust_settings_first['ship_name']);
			txt_id_ship_name.val(cust_settings_first['ship_name']);
            txt_identity_num.val(cust_settings_first["identity_num"]);
            ship_name_in_book = cust_settings_first['ship_name'];
            txt_ship_zip.val(cust_settings_first['ship_zip']);
            txt_ship_mb.val(cust_settings_first['ship_mb']);
            txt_ship_tel.val(cust_settings_first['ship_tel']);
            sel_cust_addr_id = cust_settings_first['addr_id'];
            is_valid_address = cust_settings_first['is_valid_address'];
            txt_ship_address.val(cust_settings_first['ship_address']);
            ship_address_in_book = cust_settings_first['ship_address'];
            town_id_in_book = cust_settings_first['quarter_id'];
            m_sel_region.setValue(cust_settings_first['country_id'], cust_settings_first['province_id'], cust_settings_first['city_id'], cust_settings_first['town_id'], cust_settings_first['quarter_id'], m_data_source['order_type'], m_data_source['shop_id'], m_data_source['order_products_type']);
            var regions = m_sel_region.getCountryProvinceCity();
        }
    };

    var getCurCustSetingData = function (operate_type) {
        if (operate_type == operateType.add) {
		    if (m_data_source["is_overseas"]) {
                curCustSetingData.shipName = txt_id_ship_name.val();
                curCustSetingData.identityNum = txt_identity_num.val();
            } else {
                curCustSetingData.shipName = txt_ship_name.val();
                curCustSetingData.identityNum = '';
            }
            curCustSetingData.shipAddress = txt_ship_address.val();
            curCustSetingData.selRegion = m_sel_region;
            curCustSetingData.shipZip = txt_ship_zip.val();
            curCustSetingData.shipMb = txt_ship_mb.val();
            curCustSetingData.shipTel = txt_ship_tel.val();
            curCustSetingData.addressStatus = chk_address_status.prop("checked") ? 1 : 2;
            curCustSetingData.addressId = sel_cust_addr_id;
            curCustSetingData.isValidAddress = is_valid_address;
            curCustSetingData.shipAddressInBook = ship_address_in_book;
            curCustSetingData.townIdInBook = town_id_in_book;
            curCustSetingData.shipNameInBook = ship_name_in_book;
        }
        else if (operate_type == operateType.del) {
            curCustSetingData.shipName = "";
            curCustSetingData.shipAddress = "";
            curCustSetingData.selRegion = null;
            curCustSetingData.shipZip = "";
            curCustSetingData.shipMb = "";
            curCustSetingData.shipTel = "";
            curCustSetingData.addressStatus = false;
            curCustSetingData.addressId = 0;
        }
        return curCustSetingData;
    }

    //使用新地址 按钮事件
    function addNewAddress(result) {
        //div_delete_address_dialog.hide();
        div_delete_address_dialog.className = 'hide';
		var icTip = new IdentityNumTip(result, 'identity_num_tip_button', 'identity_num_tip_parent', 'identity_num_tip_iframe', 'txt_id_ship_name', 'txt_identity_num', m_sel_region);
        icTip.init();
        //如果当前订单使用的地址，是新增加的地址，那么再次点击新增地址按钮时，新增地址输入框里赋值为之前新添加的内容
        if (m_data_source["addr_id"] == 0 && m_data_source["province_id"] > 0 && m_data_source["city_id"] > 0 && m_data_source["town_id"] > 0) {
            setAddAddressTxtValue();
            showConsigneeAddInfo(true);

        }
        else {
            bind_cust_addr_by_index(result, -1);
        }
    }
	
	this.showAddNewAddress = function () {
        addNewAddress(cust_setting_cache);
        var consigneeCommon = new ConsigneeCommon();
        consigneeCommon.txt_identity_num_check('txt_identity_num', 'span_identity_num_valid_msg', m_data_source);
    }

    function setAddAddressTxtValue()
    {
        txt_ship_name.val(m_data_source['ship_name']);
		txt_id_ship_name.val(m_data_source['ship_name']);
        if (m_data_source["identity_num"]) {
            txt_identity_num.val(m_data_source["identity_num"]);
        } else if (last_identity_num) {
            txt_identity_num.val(last_identity_num);
        }
        m_sel_region.setValue(m_data_source['country_id'], m_data_source['province_id'], m_data_source['city_id'], m_data_source['town_id'], m_data_source['quarter_id'], m_data_source['order_type'], m_data_source['shop_id'], m_data_source["order_products_type"]);
        txt_ship_address.val(m_data_source['ship_address']);
        txt_ship_zip.val(m_data_source['ship_zip']);
        txt_ship_mb.val(m_data_source['ship_mb']);
        txt_ship_tel.val(m_data_source['ship_tel']);
        bind_address_status_val(m_data_source['address_status']);
    }
	
    function bindMouseOverConsigneeEvent() {
        $("#div_myaddress div").mouseover(function () {
            var curObj = $(this)
            curObj.addClass("active");
            curObj.css("cursor","pointer");
        });
    }
    function bindMouseOutConsigneeEvent() {
        $("#div_myaddress div").mouseout(function () {
            $(this).removeClass("active");
        });
    }
    //选择收货地址事件
    function bindSeleteConsigneeEvent(result) {
        $("#div_myaddress div[id^='div_']:not(a)").click(
                       function () {
                           //div_delete_address_dialog.hide();   //隐藏删除收货地址提示框
                           div_delete_address_dialog.className = 'hide';
                           sel_cust_addr_index = $(this).attr("addrindex");
                           sel_addr_id = $(this).attr("addrid");
                           $(this).addClass("current operate");
                           var cur_cust_settings = result[sel_cust_addr_index];
                           selectConsignee(cur_cust_settings,this);
                       }
            );
    }
    //删除收货人地址
    function bindDeleteConsigneeEvent() {
        $("#div_myaddress div a[id^='delete_']").click(
            function () {
                showDeleteAddressDialog($(this));
                return false;
            });
    }
    //编辑收货人地址
    function bindEditConsigneeEvent() {
        $("#div_myaddress div a[id^='edit_']").click(
           function () {
               bindEditConsigneeData(operateType.edit)
               showEditConsigneeDialog();
               return false;
           });

    }
    //设为默认地址
    function bindSetDefaultEvent() {
        $("#div_myaddress div a[id^='default_']").click(
           function () {
               cust_setting_ajax.invokeServer('addr_id=' + sel_cust_addr_id + '&status=1&method=setDefault', 'POST', true);
               return false;
           });
    }

    //切换收货地址
    var selectConsignee = function (cur_cust_settings, curObj, operate_type) {
        bindEditConsigneeData(operateType.add, cur_cust_settings);
        var custSettingData = editConsigneeObj.getCurCustSetingData();
        if (!editConsigneeObj.consignee_save_check()) {
            $(curObj).removeClass("current operate");
            if (operate_type == operateType.del) {
                //var custSettingDataDel = getCurCustSetingData(operateType.del);
                //var param_data = ConsigneeCommon.getConsigneeSaveData(custSettingDataDel, m_data_source['shop_id'], m_order_sequence_ids);
                //m_consignee_save(param_data);
                //return;
                delete_consignee_redis_ajax.invokeServer('order_sequence_ids=' + m_order_sequence_ids, 'POST', false);
            } else {
                showEditConsigneeDialog();
                return;
            }
        }

        if ($.trim(custSettingData.shipName).indexOf('<') >= 0 || $.trim(custSettingData.shipAddress).indexOf('<') >= 0) return;
        var param_data = ConsigneeCommon.getConsigneeSaveData(custSettingData, m_data_source, m_order_sequence_ids);
        selectConsigneeActive(param_data);
        //m_consignee_save(param_data);
    };

    var selectConsigneeActive = function (consi_data) {
        var oldProvinceId = m_order_flow_data_source["order_list"][0]["province_id"];
        var newProvinceId = consi_data['province_id'];
        //交易单为区域促销&二级地址发生变更
        if (m_order_flow_data_source["district_mall_order_type"] == districtMallOrderType.Normal && newProvinceId != oldProvinceId) {
            //比较地区价格是否有变化
            var orders = m_order_flow_data_source["order_list"];
            for (var i = 0; i < orders.length; i++) {
                var cartItems = orders[i]["cart_items"];
                for (var n = 0; n < cartItems.length; n++) {
                    if (cartItems[n]["district_mall_product_type"] > districtMallOrderType.Normal) {
                        var districtPrice = cartItems[n]["district_price"];
                        if (districtPrice[newProvinceId] != districtPrice[oldProvinceId]) {
                            objConsigneeModifyNoticeDialog.show(m_consignee_save, consi_data);
                            return;
                        }
                    }
                }
            }
        }
        m_consignee_save(consi_data);
    };
    //新增收货地址
    var addConsignee = function () {
        if (!consignee_save_check()) {
            showConsigneeAddInfo(true);
            return;
        }
        var curInputData = getCurCustSetingData(operateType.add);
		last_identity_num = curCustSetingData.identityNum;
        var param_data = ConsigneeCommon.getConsigneeSaveData(curInputData, m_data_source, m_order_sequence_ids);
        selectConsigneeActive(param_data);
        //m_consignee_save(param_data);
    }
    //删除收货人地址，确认删除用到
    var deleteConsignee = function () {
        sel_cust_addr_id = -1;
        cust_setting_ajax.invokeServer('addr_id=' + cust_setting_cache[sel_cust_addr_index]['addr_id'] + '&status=-1&method=delete', 'POST', false);
        //div_delete_address_dialog.hide();
        div_delete_address_dialog.className = 'hide';
        var cur_cust_settings = cust_setting_cache
        //如果删除收货地址后，地址本表里已经没有数据了，则展开新增收货地址输入框
        if (cur_cust_settings == null) {
            //var custSettingDataDel = getCurCustSetingData(operateType.del);
            //var param_data = ConsigneeCommon.getConsigneeSaveData(custSettingDataDel, m_data_source['shop_id'], m_order_sequence_ids);
            //m_consignee_save(param_data);
            delete_consignee_redis_ajax.invokeServer('order_sequence_ids=' + m_order_sequence_ids, 'POST', false);
            bind_cust_addr_by_index(null,-1);
        } else {
            selectConsignee(cur_cust_settings[0], null, operateType.del);
        }
    };

    var consignee_save_check = function () {
        var consigneeCommon = new ConsigneeCommon();
		var ship_name_check = false;
        if (m_data_source['is_overseas']) {
            ship_name_check = consigneeCommon.txt_ship_name_check('txt_id_ship_name', 'span_id_ship_name_valid_msg', m_sel_region)
                && consigneeCommon.txt_identity_num_check('txt_identity_num', 'span_identity_num_valid_msg');
        } else {
            ship_name_check = consigneeCommon.txt_ship_name_check('txt_ship_name', 'span_ship_name_valid_msg', m_sel_region);
        }
        return ship_name_check
            && m_sel_region.getValue() && consigneeCommon.txt_ship_address_check('txt_ship_address', 'span_ship_address_valid_msg', m_sel_region, null)
            && consigneeCommon.txt_ship_zip_check('txt_ship_zip', 'span_ship_zip_valid_msg', m_sel_region)
            && consigneeCommon.txt_ship_mb_tel_check('txt_ship_mb', 'txt_ship_tel', 'span_ship_mb_valid_msg', m_sel_region, m_data_source['order_type']);
    };

       function showDeleteAddressDialog(obj) {

        var offset = obj.offset();
        var left = offset.left;
        var top = offset.top;
        var popLeft = $1("helpHint").offsetLeft;
        var popTop = $1("helpHint").offsetTop;

        var resultLeft = left - popLeft;
        var resultTop = top - popTop;

        div_delete_address_dialog.style.left = resultLeft-256 + 'px';
        div_delete_address_dialog.style.top = resultTop-120 + 'px';
        div_delete_address_dialog.className = '';
    };

    var btn_cancel_click = function () {
        div_delete_address_dialog.className = 'hide';  
    };
    function show_more_address() {
        if (m_show_more_address_status == 0) {
            m_show_more_address_status = 1;
            lnk_more_address.text("收起更多地址");
            div_myaddress.addClass("all");
        } else if (m_show_more_address_status == 1) {
            m_show_more_address_status = 0;
            lnk_more_address.text("展开更多地址");
            div_myaddress.removeClass("all");
        }
    };
    var bind_address_status_val = function (status) {
        if (status == 1) {
            chk_address_status.attr("checked", true)
        } else {
            chk_address_status.attr("checked", false)
        }
    };

    function showEditConsigneeDialog() {
        editConsigneeObj.setConsigneeSave(m_consignee_save);
        editConsigneeObj.show();
    }
    //operate_type:0-切换收货地址，1-编辑收货地址
    function bindEditConsigneeData(operate_type, cur_cust_settings) {
        editConsigneeObj = new ConsigneeEditDialog("edit_consignee_dialog");
        editConsigneeObj.setDataSource(m_data_source);
        editConsigneeObj.setOrderSequenceIds(m_order_sequence_ids);
        editConsigneeObj.bindData(operate_type, cur_cust_settings);
    }

    this.VipSMS = {
        setNeedSMS: function () {
            if (m_data_source['is_show_send_msg'] == true) {
                $s(obj_order_sms);
                obj_order_sms_checkbox.checked = m_data_source['need_send_order_sms'];
                obj_order_sms_checkbox.onclick = this.SaveSendSMS;
            }
            else {
                $h(obj_order_sms);
            }
        },
        SaveSendSMS: function () {
            var m_send_SMS_data = new Hashtable();
            m_send_SMS_data['needSendSMS'] = this.checked == true ? '1' : '0';
            //m_send_SMS_data['order_sequence_id'] = m_data_source['order_sequence_id'];
            var ship_message_ajax = new Ajax('/consignee/sendSMS');
            ship_message_ajax.OnSucceed
            (
                function (result) {
                    if (result != null && result['errorCode'] == 0) {
                        m_data_source['need_send_sms'] = this.checked == 'checked' ? '1' : '0';
                    }
                }
            )
            ship_message_ajax.invokeServer(m_send_SMS_data, 'POST', false);
        },
        refreshRegisterMb: function () {
            ///<summary>给送货信息保存的时候调用：this.consigneeRefresh</summary>
            if (m_data_source["shop_id"] == 0) {
                obj_register_mb.innerHTML = m_data_source["register_mb"];
                //if ($1("register_mb_0_98"))
                //    $1("register_mb_0_98").innerHTML = m_data_source["register_mb"];
            }
        }
    }

    var delete_consignee_redis_ajax = new Ajax('/consignee/delete');
    //delete_consignee_redis_ajax.invokeServer('order_sequence_ids=' + m_order_sequence_ids + '&method=delRedisData', 'POST', true);
    delete_consignee_redis_ajax.OnSucceed
    (
        function (result) {
            if (result != null && result['error_code'] == 0) {
                //alert('删除redis成功');
            }
            else {
                alert("删除失败");
                return false;
            }
        }
    );
}
//#endregion
