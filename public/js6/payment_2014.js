//#region template
var PAYMENT_EDITABLE_TEMPLATE =
"<a name='payment_point_{order_sequence_id}'></a>"
+ "<div class='item-pay'>"
+ "<div class='item-pay-title'><b>订单{sort_num}：</b></div>"
+ "     <div class='pay-box'>"

+ "    <div id='cust_cash_area_{order_sequence_id}' class='by-balance'>"
+ "        <p>"
+ "        余额：您当前有<strong class='color-price'>{remain_cash}</strong>元余额可用<span id='span_cust_account_{order_sequence_id}' class=''>，您已使用<strong class='color-price' id='p_cust_cash_used_{order_sequence_id}'>{cust_cash_used}</strong>元"
+ "        </span>"
+ "        </p>"
+ "    </div>"

	 + "<div class='by-gift' id='by-gift_{shop_id}'>"
	 + "<p><span id='remain_gift_card_{order_sequence_id}' class=''>礼品卡：您当前有<strong class='color-price' id='remain_gift_card_account_{order_sequence_id}'>{remain_gift_card}</strong>元礼品卡可用</span>"
     + "<span id='span_ddmoney_{order_sequence_id}' class=''>，您已使用<strong class='color-price' id='p_ddmoney_used_{order_sequence_id}'>{giftcard_amount}</strong>元 "
    + "</span>"
    + "</p>"
	 + "</div>"
	 + "<p id='dd_cust_giftcard_limit_tips_{order_sequence_id}' style='color:#cc3300;padding:0 40px 5px;' class='hide'></p>"
	 + "<p id='dd_cust_cash_tips_{order_sequence_id}' style='color:#cc3300;padding:0 40px 5px;' class=''></p>"
	 + "<div class='by-other'>"
    + "<p  id='dd_money_payable_tips_{order_sequence_id}'> 您还需为订单支付<strong class='color-price' >{order_payable_amount}</strong>元，请选择以下支付方式：</p>"

     + "<span id='span_product_choice_payment_{order_sequence_id}' style='position:absolute;display:none;z-index:10;width:1261px'>"
          + "<div  id='div_product_choice_payment_info_{order_sequence_id}' class='new_window'>"
            + "<div class='wind_top' id='product_choice_payment_title_{order_sequence_id}'><div  class='title_left'>付款方式限制提示</div><div class='w_close'><a id='product_choice_payment_box_{order_sequence_id}' name='product_choice_payment_close' href='javascript:for_99click();' title='关闭'>关闭窗口</a></div></div>"
            + "<div class='window_content' id='product_choice_payment_content_{order_sequence_id}'>"
                + "<div class='wind_split wind_limit'>"
                    + "<p>以下商品暂不支持货到付款</p>"
                    + "<p><span>{not_cod_product_names}</span><span></span></p>"
                    + "<p>您可以<a id='a_openPayment_edit_{order_sequence_id}' name='a_openPayment_edit' href=''>修改付款方式</a>或<a name='cod_to_shopping'  id='cod_to_shopping_{order_sequence_id}' href='{shopping_cart_url}?product_ids={cod_product_ids}&type=3&ref=checkout-0-C' target='_blank'>返回修改购物车&gt;&gt;</a></p>"
                + "</div>"
            + "<div class='' id='product_choice_payment_loading_bar_{order_sequence_id}'></div></div>"
          + "</div>"
     + "</span>"
	 + "<ul id='rd_pay_id_{order_sequence_id}'></ul>"
     + "<p class='btn-bar mt-10 pb-15'>"
        + "<a class='btn btn-large-orange' id='btn_payment_save_{order_sequence_id}' href='javascript:for_99click();'>确认支付方式</a>"
        + "<span id='area_payment_save_tips_{order_sequence_id}' class='hide'>"
        + "    <span class='icon icon-warn'></span>"
        + "    <span id='span_payment_save_tips_{order_sequence_id}'></span>"
        + "</span>"
        + "<div class='clear'></div>"
     + "</p>"
    + "</div>"
  + "</div>"   //-2box
+ "</div>"; //-1

var PAYMENT_READONLY_TEMPLATE =
         "<p class='listcon'>"
        + "订单{sort_num}：<span id='li_pay_id_name_{order_sequence_id}' class='mr-10'>{pay_type_name} </span>"
        + "<span id='li_other_pay_email_{order_sequence_id}' class='mr-10'>代付邮箱{payer_email}"
        + "</span>"
        + "<span id='cust_cash_account_used_{order_sequence_id}' class='mr-10'>使用余额{cust_cash_used}元"
        + "</span>"
        + "<span id='gift_card_account_used_{order_sequence_id}' class='mr-10'>"
        + "使用礼品卡{giftcard_amount}元"
        + "</span>"
        + "<span id='coupon_account_used_{order_sequence_id}' class='mr-10'>"
        + "使用礼券/优惠码{coupon_amount}元"
        + "</span>"
        + "<span id='point_deduction_amount_{order_sequence_id}' class='mr-10'>使用积分{point_deduction_amount}元</span>"
        + "<span id='area_payment_edit_{order_sequence_id}'>"
        + "<a href='javascript:for_99click();' id='btn_payment_edit_{order_sequence_id}'>"
        + "编辑"
        + "</a>"
        + "</span>"
        + "</p>";

var RD_PAY_ID_HEADERTEMPLATE = "<ul>";
var RD_PAY_ID_ITEMTEMPLATE_COD_AND_REMIT =
"<li>"
    + "<p>"
        + "<label class='radio' for=''><input name='rd_pay_id_{order_sequence_id}' type='radio' value='{pay_type}' id='{pay_id}' {tag}/>{type_name}</label>"
        + "<span class='{hide}'><span class='hide' id='bank_memo_{pay_type}_{pay_id}_{order_sequence_id}'>"       //'span-w615 color-grey'  'objhide'  'inblock color-grey'
        + "</span></span>"
        + "<span class='zhidian' style='display:none' id='zhi_dian_desc_{pay_type}_{pay_id}_{order_sequence_id}'>{zhi_dian_desc}</span>"
    + "</p>"
    + "<div class='hide' id='bank_memo_detail_{pay_type}_{pay_id}_{order_sequence_id}'>"    //'explain-box'  'objhide'
    + "</div>"
+ "</li>";
//原文案“10月19日-26日期间，有机会领取最高200元红包，付款时扫码支付直接抵扣哦”
var RD_PAY_ID_ITEMTEMPLATE_ALIPAY =
"<li>"
    + "<p>"
        + "<label class='radio' for=''><input name='rd_pay_id_{order_sequence_id}' type='radio' value='{pay_type}' id='{pay_id}' {tag}/>{type_name}</label>"
		+ "<span style='color:#FF2832; margin-left:15px;'>当当已经开通17个省的货到付款支付宝扫码，推荐您收货时使用支付宝扫码进行支付</span>"
        + "<span class='{hide}'><span class='hide' id='bank_memo_{pay_type}_{pay_id}_{order_sequence_id}'>"       //'span-w615 color-grey'  'objhide'  'inblock color-grey'
        + "</span></span>"
        + "<span class='zhidian' style='display:none' id='zhi_dian_desc_{pay_type}_{pay_id}_{order_sequence_id}'>{zhi_dian_desc}</span>"
    + "</p>"
    + "<div class='hide' id='bank_memo_detail_{pay_type}_{pay_id}_{order_sequence_id}'>"    //'explain-box'  'objhide'
    + "</div>"
+ "</li>";

var RD_PAY_ID_ITEMTEMPLATE_COD_AND_REMIT_DISABLED =
"<li>"
    + "<p>"
        + "<span class='radio color-grey' for=''><input name='rd_pay_id_{order_sequence_id}' type='radio' value='{pay_type}' id='{pay_id}' {tag}>{type_name}</span>"
        + "<span class='zhidian' style='display:none' id='zhi_dian_desc_{pay_type}_{pay_id}_{order_sequence_id}'>{zhi_dian_desc}</span>"
    + "</p>"
+ "</li>";

var RD_PAY_ID_FOOTERTEMPLATE = "</ul>";

var RD_PAY_ID_ITEMTEMPLATE_PLATFORM_END = "</tr></table></div>";

var rd_pay_id_web_memo =
"为保证及时处理您的订单，请您于下单后"
+ "<span class='color-orange'>24小时</span>"
+ "内完成付款(您将获得<strong class='color-orange'>10分</strong>积分奖励)，否则订单将被自动取消";

var rd_pay_id_web_memo_detail =
"    <p>订单完成后，您可以选择以下银行及支付方式进行支付：</p>"
+ "    <p class='banks clearfix'>"
+ "        <a style='text-decoration: none;'>中国工商银行</a>"
+ "        <a style='text-decoration: none;'>招商银行</a>"
+ "        <a style='text-decoration: none;'>中国建设银行</a>"
+ "        <a style='text-decoration: none;'>中国银行</a>"
+ "        <a style='text-decoration: none;'>中国农业银行</a>"
+ "        <a style='text-decoration: none;'>交通银行</a>"
+ "        <a style='text-decoration: none;'>中信银行</a><br/>"
+ "        <a style='text-decoration: none;'>中国民生银行</a>"
+ "        <a style='text-decoration: none;'>广发银行</a>"
+ "        <a style='text-decoration: none;'>兴业银行</a>"
+ "        <a style='text-decoration: none;'>浦发银行</a>"
+ "        <a style='text-decoration: none;'>北京银行</a>"
+ "        <a style='text-decoration: none;'>中国邮政储蓄银行</a>"
+ "        <a style='text-decoration: none;'>中国光大银行</a><br/>"
+ "        <a style='text-decoration: none;'>平安银行（原深圳发展银行更名）</a>"
+ "    </p>"
+ "    <p class='banks-other clearfix'>"
+ "        <a style='text-decoration: none;'>银联在线支付</a>"
+ "        <a style='text-decoration: none;'>手机支付</a>"
+ "        <a style='text-decoration: none;'>支付宝</a>"
+ "        <a style='text-decoration: none;'>快钱</a>"
+ "        <a style='text-decoration: none;'>银联电子支付公司</a>"
+ "        <a style='text-decoration: none;'>财付通</a>"
+ "        <a style='text-decoration: none;'>国外信用卡</a>"
+ "    </p>";

var rd_pay_id_cod_memo = '使用支付宝钱包货到付款，付款时立减2-10元，点击<a href="http://d.alipay.com/a" target="_blank">d.alipay.com/a</a>下载支付宝钱包';

var alipay_how_to_use = "&nbsp;&nbsp;&nbsp;&nbsp;<a href='{ALIPAY_PATH}/alipaycod_direction.html' style='display:none;' target='_blank'>如何使用？</a>";


var rd_pay_id_remit_memo = "<div class='pay_nn'>"
        + "<p>请您在汇款单的“请按汇款种类填写”中选择“商务汇款”，商户客户号为：<strong>110700150</strong></p>"
        + "<p>同时要填写汇款金额、汇款人相关信息、并在附言栏注明订单号。</p>"
        + "</div>";

var rd_pay_id_bank_memo = "您需要先去银行转帐，所购商品将在款项到达当当网帐户后发出，到款时间一般为1-3个工作日";
var rd_pay_id_bank_memo_detail =
"    <p>为了保证及时处理您的订单，请您于下单后<span class='color-orange'>24小时内</span>在我的订单填写付款确认，并在<span class='color-orange'>7天内</span>完成付款，否则订单将被自动取消。<br/>您可以在任一家银行向以下帐户汇款，汇款时请务必在电汇单的用途栏内注明<span class='color-orange'>订单号</span>。</p>"
+ "    <p class='color-grey'>开户名：北京当当科文电子商务有限公司</p>"
+ "    <p class='banks-info color-grey'>"
+ "        <span>开户银行：</span>"
+ "            北京银行大望路支行，账号：01091233700120102002046<br/>"
+ "            建行地坛支行(429)，账号：11001042900053001057<br/>"
+ "            农业银行青年湖支行，账号：190301040012801（外地农行账号前加11）<br/>"
+ "            招商银行北京朝阳门支行，账号：110902055910502"
+ "    </p>";
// tj 2013-11-24 add 找人代付模板
var RD_PAY_ID_ITEMTEMPLATE_OTHER_PAY =
"<li>"
    + "<p>"
        + "<label class='radio label-w145' for=''><input type='radio' name='rd_pay_id_{order_sequence_id}' value='{pay_type}' id='{pay_id}'>{type_name}</label>"
        + "<span class='hide' id='bank_memo_{pay_type}_{pay_id}_{order_sequence_id}' style='margin-right:0;'>"
//+ "<span>TA的手机号码：<input type='text' value='选填' id='other_pay_phone_number_{order_sequence_id}' /></span><span style='margin-right:0;'>TA的邮箱：<input type='text' value='选填' id='other_pay_email_{order_sequence_id}'  maxlength='50' /></span></span><span id='area_other_pay_error_{order_sequence_id}' class='hide'><span class='icon icon-warn'></span><span id='span_other_pay_error_{order_sequence_id}'>请输入正确的手机号码</span></span>"
            + "TA的邮箱：<input type='text' class='input-w210 ver-m' value='选填' id='other_pay_email_{order_sequence_id}'  maxlength='50' />"
        + "</span>"
        + "<span id='area_other_pay_error_{order_sequence_id}' class='hide'>"
            + "<span class='icon icon-warn'></span>"
            + "<span id='span_other_pay_error_{order_sequence_id}'>请输入正确的邮箱</span>"
        + "</span>"
    + "</p>"
    + "<p class='hide' id='bank_memo_description_{pay_type}_{pay_id}_{order_sequence_id}'>（代付链接将发送至您填写的邮箱中）</p>"
    + "<div class='hide' id='bank_memo_detail_{pay_type}_{pay_id}_{order_sequence_id}'>"
        + "<p class='pay-instead-messages'>"
            + "给TA留言："
            + "<label><input type='radio' id='other_pay_rd_message_10_{order_sequence_id}' name='other_pay_rd_message_{order_sequence_id}' checked='checked' value='10'>默认留言</label>"
            + "<label><input type='radio' id='other_pay_rd_message_11_{order_sequence_id}' name='other_pay_rd_message_{order_sequence_id}' value='11'>雪中送炭</label>"
            + "<label><input type='radio' id='other_pay_rd_message_12_{order_sequence_id}' name='other_pay_rd_message_{order_sequence_id}' value='12'>温馨甜蜜</label>"
            + "<label><input type='radio' id='other_pay_rd_message_13_{order_sequence_id}' name='other_pay_rd_message_{order_sequence_id}' value='13'>亲情无限</label>"
            + "<label><input type='radio' id='other_pay_rd_message_14_{order_sequence_id}' name='other_pay_rd_message_{order_sequence_id}' value='14'>衷心请求</label>"
        + "</p>"
        + "<div style='padding-left: 63px;' class='clearfix'>"
            + "<textarea id='other_pay_message_{order_sequence_id}' value='请帮忙给我支付一下这件商品吧'></textarea>"
            + "<span class='help-inline help-inline-error help-inline-large fl' style='margin-top: 65px; white-space: nowrap;' id='other_pay_message_error_{order_sequence_id}'>"
                + "<span style='color:#87827F;' id='other_pay_message_length_{order_sequence_id}'>0/35</span>"
            + "</span></span>"
            + "<p id='other_pay_public_name_panel_{order_sequence_id}' class='pay-instead-pub fl'><label><input checked='checked' type='checkbox' name='name_other_pay_public_name_{order_sequence_id}' id='other_pay_public_name_{order_sequence_id}'>对TA公开收货人姓名</label></p>"
        + "</div>"
    + "</div>"
+ "</li>";
//#endregion 

function Payment(container_id) {
    //#region 变量
    var m_data_source = null;
    var m_payment_save = null;
    var m_pay_id = null;
    var m_pay_type = null;
    var m_show_status = null;
    var m_payment_tips = null;
    var m_ship_type = null;
    var is_dangdang_money = null;//是否有礼品卡
    var is_dangdang_money_use = null;//是否使用了礼品卡
    var is_cust_cash_used = null;//是否使用了余额
    var payable = null;
    var product_choice_payment_Dialog = null;
    var m_payment_password_status = true;

    //多订单定义变量加order_sequence_id
    var div_payment = null;
    var span_cust_account = null;
    var p_cust_cash_used = null;//已经使用余额金额
    var dd_cust_cash_tips = null; //控制足以支付、还需支付区域是否显示      
    var dd_money_payable_tips = null;//提示
    var span_product_choice_payment = null;
    var product_choice_payment_title = null;
    var product_choice_payment_box = null;
    var product_choice_payment_content = null;
    var a_openPayment_edit = null;
    var cod_to_shopping = null;
    var product_choice_payment_loading_bar = null;
    var var_rd_pay_id = null;
    var btn_payment_save = null;
    var span_payment_save_tips = null;
    var area_payment_save_tips = null;
    var li_pay_id_name = null;
    var btn_payment_edit = null;
    var area_payment_edit = null;
    var span_ddmoney = null;
    var p_ddmoney_used = null;//已使用礼品卡金额
    var cust_cash_account_used = null;
    var gift_card_account_used = null;
    var coupon_account_used = null;
    var point_deduction_amount = null;
    var cust_cash_area = null;
    var remain_gift_card = null;
    var remain_gift_card_account = null;
    var rd_pay_id = null;
    // tj 2013-11-29 add 找人代付参数
    var shipmessage = null;
    var regex_phone_number = "^((13[0-9])|(15[^4,\\D])|(18[0-9]))\\d{8}$";
    var regex_email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var default_messages = { 10: "请帮忙给我支付一下这件商品吧。", 11: "我的银行卡不能付款了，帮我付一下。", 12: "亲爱的，我看上这个了，你给我买嘛。", 13: "亲，一时钱紧，帮我付一下。", 14: "我的亲，帮忙给支付一下吧。" };
    var other_pay_phone_number = null;
    var other_pay_email = null;
    var other_pay_message = null;
    var span_other_pay_error = null;
    var area_other_pay_error = null;
    var others_payment_rd_message_elements = null;
    var show_message_element = null;
    var other_pay_public_name = null;
    var li_other_pay_email = null;
    var other_pay_public_name_panel = null;
    var yihao_shopId = new Array("12413", "12667", "12668"); //一号店三个店铺ID
    var m_is_contain_normal_giftebook = false; //是否属于纸书赠电子书
    var alipay_desc = "";
    //#endregion

    //#region 变量初始化
    var init_control = function () {
        span_cust_account = "span_cust_account_" + m_data_source['order_sequence_id'];
        p_cust_cash_used = "p_cust_cash_used_" + m_data_source['order_sequence_id'];
        dd_cust_cash_tips = "dd_cust_cash_tips_" + m_data_source['order_sequence_id'];
        dd_money_payable_tips = "dd_money_payable_tips_" + m_data_source['order_sequence_id'];
        span_product_choice_payment = "span_product_choice_payment_" + m_data_source['order_sequence_id'];
        product_choice_payment_title = "product_choice_payment_title_" + m_data_source['order_sequence_id'];
        product_choice_payment_box = "product_choice_payment_box_" + m_data_source['order_sequence_id'];
        product_choice_payment_content = "product_choice_payment_content_" + m_data_source['order_sequence_id'];
        a_openPayment_edit = "a_openPayment_edit_" + m_data_source['order_sequence_id'];
        cod_to_shopping = "cod_to_shopping_" + m_data_source['order_sequence_id'];
        product_choice_payment_loading_bar = "product_choice_payment_loading_bar_" + m_data_source['order_sequence_id'];
        var_rd_pay_id = "rd_pay_id_" + m_data_source['order_sequence_id'];
        btn_payment_save = "btn_payment_save_" + m_data_source['order_sequence_id'];
        area_payment_save_tips = "area_payment_save_tips_" + m_data_source['order_sequence_id'];
        span_payment_save_tips = "span_payment_save_tips_" + m_data_source['order_sequence_id'];
        li_pay_id_name = "li_pay_id_name_" + m_data_source['order_sequence_id'];
        btn_payment_edit = "btn_payment_edit_" + m_data_source['order_sequence_id'];
        area_payment_edit = "area_payment_edit_" + m_data_source['order_sequence_id'];
        span_ddmoney = "span_ddmoney_" + m_data_source['order_sequence_id'];
        p_ddmoney_used = "p_ddmoney_used_" + m_data_source['order_sequence_id'];
        li_other_pay_email = "li_other_pay_email_" + m_data_source['order_sequence_id'];
        cust_cash_account_used = 'cust_cash_account_used_' + m_data_source['order_sequence_id'];
        gift_card_account_used = 'gift_card_account_used_' + m_data_source['order_sequence_id'];
        coupon_account_used = 'coupon_account_used_' + m_data_source['order_sequence_id'];
        point_deduction_amount = 'point_deduction_amount_' + m_data_source['order_sequence_id'];
        cust_cash_area = 'cust_cash_area_' + m_data_source['order_sequence_id'];
        remain_gift_card = 'remain_gift_card_' + m_data_source['order_sequence_id'];
        div_payment = 'div_payment_' + m_data_source['order_sequence_id'];
        remain_gift_card_account = 'remain_gift_card_account_' + m_data_source['order_sequence_id'];
        rd_pay_id = new RadioButtonList(var_rd_pay_id);
    };
    //#endregion

    var m_payment_panel = new JSPanel(container_id);

    //#region 加载支付方式
    var pay_id_ajax = new Ajax('/payment/get');
    pay_id_ajax.OnSucceed
    (
        function (result) {
            if (result != null && result['error_code'] == 0 && result['order_sequence_id'] == m_data_source['order_sequence_id']) {
                // tj 2013-11-24 add 判断是否找人代付订单 pay_id = 100 pay_type = 6
                if (m_data_source["is_other_pay"] == 1) {
                    m_pay_id = 100;
                    m_pay_type = 6;
                }
                rd_pay_id.DataSource = result['pay_ids'];
                //rd_pay_id.HeaderTemplate = RD_PAY_ID_HEADERTEMPLATE;
                rd_pay_id.ItemTemplate = RD_PAY_ID_ITEMTEMPLATE_COD_AND_REMIT;
                //rd_pay_id.FooterTemplate = RD_PAY_ID_FOOTERTEMPLATE;

                rd_pay_id.setOnSelectedIndexChanged(
                    function rd_pay_id_selectedindexchanged(rdl_item) {
                        $1(span_payment_save_tips).innerHTML = '';
                        $1(area_payment_save_tips).className = 'hide';
                        m_pay_type = rdl_item.value;
                        m_pay_id = rdl_item.id;

                        if (m_pay_type == 3) {
                            $1('bank_memo_detail_3_3_' + m_data_source["order_sequence_id"]).innerHTML = rd_pay_id_remit_memo;
                            $1('bank_memo_detail_3_3_' + m_data_source["order_sequence_id"]).className = 'explain-box';
                            //$S('bank_memo_detail_3_3');
                        }
                        else {
                            _H('bank_memo_detail_3_3_' + m_data_source["order_sequence_id"]);
                        }
                        //银行转账
                        if (m_pay_type == 2) {
                            $1('bank_memo_2_2_' + m_data_source["order_sequence_id"]).innerHTML = rd_pay_id_bank_memo;
                            $1('bank_memo_2_2_' + m_data_source["order_sequence_id"]).className = 'span-w615 color-grey';
                            $1('bank_memo_detail_2_2_' + m_data_source["order_sequence_id"]).innerHTML = rd_pay_id_bank_memo_detail;
                            $1('bank_memo_detail_2_2_' + m_data_source["order_sequence_id"]).className = 'explain-box';
                            //$S('bank_memo_2_2');
                            //$S('bank_memo_detail_2_2');
                        }
                        else {
                            _H('bank_memo_2_2_' + m_data_source["order_sequence_id"]);
                            _H('bank_memo_detail_2_2_' + m_data_source["order_sequence_id"]);
                        }
                        // tj 2013-11-24 add 找人代付 pay_type = 6  pay_id = 100
                        if (m_pay_type == 6) {
                            $1('bank_memo_6_100_' + m_data_source["order_sequence_id"]).className = ''; // pay-instead
                            $1('bank_memo_description_6_100_' + m_data_source["order_sequence_id"]).className = 'pay-insetead-tips';
                            $1('bank_memo_detail_6_100_' + m_data_source["order_sequence_id"]).className = 'detail-box';

                            // 初始化找人代付模块
                            init_others_payment(m_data_source);
                            // 设置找人代付信息
                            setOtherPayInfo(m_data_source);
                        }
                        else {
                            _H('bank_memo_6_100_' + m_data_source["order_sequence_id"]);
                            _H('bank_memo_description_6_100_' + m_data_source["order_sequence_id"]);
                            _H('bank_memo_detail_6_100_' + m_data_source["order_sequence_id"]);
                        }
                        //网上支付,pay_type=1,pay_id=-1
                        if (m_pay_type == 1) {
                            $1('bank_memo_1_-1_' + m_data_source["order_sequence_id"]).innerHTML = rd_pay_id_web_memo;
                            $1('bank_memo_1_-1_' + m_data_source["order_sequence_id"]).className = 'span-w615 color-grey';
                            $1('bank_memo_detail_1_-1_' + m_data_source["order_sequence_id"]).innerHTML = rd_pay_id_web_memo_detail;
                            $1('bank_memo_detail_1_-1_' + m_data_source["order_sequence_id"]).className = 'explain-box';
                            //$S('bank_memo_1_-1');
                            //$S('bank_memo_detail_1_-1');
                            if (m_data_source["shop_type"] == 5) {
                                _H('bank_memo_detail_1_-1_' + m_data_source["order_sequence_id"]);
                            }
                        }
                        else {
                            _H('bank_memo_1_-1_' + m_data_source["order_sequence_id"]);
                            _H('bank_memo_detail_1_-1_' + m_data_source["order_sequence_id"]);
                        }
                        //货到付款-现金
                        if (m_pay_type == 0 && m_pay_id == 1) {
                            $1('bank_memo_0_1_' + m_data_source["order_sequence_id"]).innerHTML = "";
                            $1('bank_memo_0_1_' + m_data_source["order_sequence_id"]).className = 'tip-warn';
                            //$S('bank_memo_0_1');
                            if ($1('zhi_dian_desc_0_1_' + m_data_source["order_sequence_id"]) != null) {
                                $1('zhi_dian_desc_0_1_' + m_data_source["order_sequence_id"]).innerHTML = $1('zhi_dian_desc_0_1_' + m_data_source["order_sequence_id"]).innerHTML;
                            }
                        }
                        else {
                            _H('bank_memo_0_1_' + m_data_source["order_sequence_id"]);
                            if ($1('zhi_dian_desc_0_1_' + m_data_source["order_sequence_id"]) != null) {
                                $1('zhi_dian_desc_0_1_' + m_data_source["order_sequence_id"]).innerHTML = $1('zhi_dian_desc_0_1_' + m_data_source["order_sequence_id"]).innerHTML;
                            }
                        }
                        //货到付款-POS机刷卡
                        if (m_pay_type == 0 && m_pay_id == 54) {
                            $1('bank_memo_0_54_' + m_data_source["order_sequence_id"]).innerHTML = "";
                            $1('bank_memo_0_54_' + m_data_source["order_sequence_id"]).className = 'tip-warn';
                            //$S('bank_memo_0_54');
                            if ($1('zhi_dian_desc_0_54_' + m_data_source["order_sequence_id"]) != null) {
                                $1('zhi_dian_desc_0_54_' + m_data_source["order_sequence_id"]).innerHTML = $1('zhi_dian_desc_0_54_' + m_data_source["order_sequence_id"]).innerHTML;
                            }
                        }
                        else {
                            _H('bank_memo_0_54_' + m_data_source["order_sequence_id"]);
                            if ($1('zhi_dian_desc_0_54_' + m_data_source["order_sequence_id"]) != null) {
                                $1('zhi_dian_desc_0_54_' + m_data_source["order_sequence_id"]).innerHTML = $1('zhi_dian_desc_0_54_' + m_data_source["order_sequence_id"]).innerHTML;
                            }
                        }
                        //货到付款-支付宝钱包
                        if (m_pay_type == 0 && m_pay_id == 56) {
                            var node = $1('bank_memo_0_56_' + m_data_source["order_sequence_id"]).parentNode;
                            if (node != null) {
                                node.className = "";
                            }
                            $1('bank_memo_0_56_' + m_data_source["order_sequence_id"]).innerHTML = alipay_desc + alipay_how_to_use.replace('{ALIPAY_PATH}',ALIPAY_PATH);
                            $1('bank_memo_0_56_' + m_data_source["order_sequence_id"]).className = 'tip-warn';
                            //$S('bank_memo_0_54');
                            if ($1('zhi_dian_desc_0_56_' + m_data_source["order_sequence_id"]) != null) {
                                $1('zhi_dian_desc_0_56_' + m_data_source["order_sequence_id"]).innerHTML = $1('zhi_dian_desc_0_56_' + m_data_source["order_sequence_id"]).innerHTML;
                            }
							if($1('bank_memo_0_56_' + m_data_source["order_sequence_id"]) != null){
								var howToUse = $1('bank_memo_0_56_' + m_data_source["order_sequence_id"]).lastChild;
								if (howToUse != null) {
									howToUse.style.display = "";
								}
							}
                        }
                        else {
                            if ($1('zhi_dian_desc_0_56_' + m_data_source["order_sequence_id"]) != null) {
                                $1('zhi_dian_desc_0_56_' + m_data_source["order_sequence_id"]).innerHTML = $1('zhi_dian_desc_0_56_' + m_data_source["order_sequence_id"]).innerHTML;
                            }
							if($1('bank_memo_0_56_' + m_data_source["order_sequence_id"]) != null){
								var howToUse = $1('bank_memo_0_56_' + m_data_source["order_sequence_id"]).lastChild;
								if (howToUse != null) {
									howToUse.style.display = "none";
								}
							}
                        }
                    } 
               );

                var is_web_platform_pay_end = false;
                var pay_id_index = 0;
                var has_cod_pos = false;
                rd_pay_id.OnItemDataBinding = function (dataItem, obj_tpl) {
                    pay_id_index++;
                    var Item_pay_type = dataItem['pay_type'];
                    var Item_pay_id = dataItem['pay_id'];
                    var is_highlight = dataItem['is_highlight'];
                    var seq_no = dataItem['seq_no'];
                    var is_support = dataItem['tag'];
                    if (dataItem['pay_memo'] == "")
                        dataItem['pay_memo_display'] = 0;
                    else
                        dataItem['pay_memo_display'] = 1;
                    if (is_highlight) {
                        dataItem['type_name'] = "<b>" + dataItem['type_name'] + "</b>";
                        //dataItem['pay_memo'] = "<b>" + dataItem['pay_memo'] + "</b>";
                    }

                    if (Item_pay_type == 6) {
                        obj_tpl.ItemTemplate = RD_PAY_ID_ITEMTEMPLATE_OTHER_PAY;
                    }
                    else if (Item_pay_type == 1 && !is_web_platform_pay_end) {
                        //网上支付,pay_id置为-1
                        dataItem['pay_id'] = -1;
                        is_web_platform_pay_end = true;
                        dataItem['pay_memo_display'] = 1;
                        dataItem['type_name'] = "网上支付";
                        //dataItem['pay_memo'] = "<span class='hint'>您需要先拥有一张已开通网上支付功能的银行卡。 <span class='hot'>使用网上支付，您将获得积分奖励：10分</span></span>";
                        dataItem['pay_memo_display'] = 1;
                    }
                    else if (Item_pay_type == 1)
                        obj_tpl.ItemTemplate = "";
                    else if (Item_pay_type == 0 && Item_pay_id == 1) {
                        if (is_support == "disabled") {
                            dataItem['type_name'] = "货到付款-现金(至少有1件商品不支持此支付方式)";
                            dataItem['pay_id'] = -2;
                            obj_tpl.ItemTemplate = RD_PAY_ID_ITEMTEMPLATE_COD_AND_REMIT_DISABLED;
                        }
                        else {
                            dataItem['type_name'] = "货到付款-现金";
                            obj_tpl.ItemTemplate = RD_PAY_ID_ITEMTEMPLATE_COD_AND_REMIT;
                        }
                    }
                    else if (Item_pay_type == 0 && Item_pay_id == 54) {
                        if (is_support == "disabled") {
                            dataItem['type_name'] = "货到付款-POS机刷卡(至少有1件商品不支持此支付方式)";
                            dataItem['pay_id'] = -2;
                            obj_tpl.ItemTemplate = RD_PAY_ID_ITEMTEMPLATE_COD_AND_REMIT_DISABLED;
                        }
                        else {
                            dataItem['type_name'] = "货到付款-POS机刷卡";
                            obj_tpl.ItemTemplate = RD_PAY_ID_ITEMTEMPLATE_COD_AND_REMIT;
                        }
                    }
                    else if (Item_pay_type == 0 && Item_pay_id == 56) {
                        if (is_support == "disabled") {
                            dataItem['type_name'] = "货到付款-支付宝扫码支付(至少有1件商品不支持此支付方式)";
                            dataItem['pay_id'] = -2;
                            obj_tpl.ItemTemplate = RD_PAY_ID_ITEMTEMPLATE_COD_AND_REMIT_DISABLED;
                        }
                        else {
                            dataItem['type_name'] = "货到付款-支付宝扫码支付";
                            obj_tpl.ItemTemplate = RD_PAY_ID_ITEMTEMPLATE_ALIPAY;
                        }
                    }
                        // tj 2013-11-13 add 银行转账
                    else if (Item_pay_type == 2 && Item_pay_id == 2 && is_support == "disabled") {
                        obj_tpl.ItemTemplate = RD_PAY_ID_ITEMTEMPLATE_COD_AND_REMIT_DISABLED;
                    }
                    else {
                        obj_tpl.ItemTemplate = RD_PAY_ID_ITEMTEMPLATE_COD_AND_REMIT;
						dataItem['is_alipay'] = "hide";
                    }

                }

                rd_pay_id.DataBind();

                if (m_payment_tips != null) {
                    $1(span_payment_save_tips).innerHTML = m_payment_tips;
                    $1(area_payment_save_tips).className = 'help-inline help-inline-error help-inline-middle';
                }
                else {
                    $1(span_payment_save_tips).innerHTML = '';
                    $1(area_payment_save_tips).className = 'hide';
                }

                rd_pay_id.setValue(m_pay_type, m_pay_id, var_rd_pay_id);
                if (m_pay_type == 3) {
                    $1('bank_memo_detail_3_3_' + m_data_source["order_sequence_id"]).innerHTML = rd_pay_id_remit_memo;
                    $1('bank_memo_detail_3_3_' + m_data_source["order_sequence_id"]).className = 'explain-box';
                    //$S('bank_memo_detail_3_3');
                }
                else
                    _H('bank_memo_detail_3_3_' + m_data_source["order_sequence_id"]);
                if (m_pay_type == 2) {
                    $1('bank_memo_2_2_' + m_data_source["order_sequence_id"]).innerHTML = rd_pay_id_bank_memo;
                    $1('bank_memo_2_2_' + m_data_source["order_sequence_id"]).className = 'span-w615 color-grey';
                    $1('bank_memo_detail_2_2_' + m_data_source["order_sequence_id"]).innerHTML = rd_pay_id_bank_memo_detail;
                    $1('bank_memo_detail_2_2_' + m_data_source["order_sequence_id"]).className = 'explain-box';
                    //$S('bank_memo_2_2');
                    //$S('bank_memo_detail_2_2');
                }
                else {
                    _H('bank_memo_2_2_' + m_data_source["order_sequence_id"]);
                    _H('bank_memo_detail_2_2_' + m_data_source["order_sequence_id"]);
                }
                // tj 2013-11-24 add 找人代付 pay_type = 6  pay_id = 100
                if (m_pay_type == 6) {
                    $1('bank_memo_6_100_' + m_data_source["order_sequence_id"]).className = ''; // pay-instead
                    $1('bank_memo_description_6_100_' + m_data_source["order_sequence_id"]).className = 'pay-insetead-tips';
                    $1('bank_memo_detail_6_100_' + m_data_source["order_sequence_id"]).className = 'detail-box';

                    // 初始化找人代付模块
                    init_others_payment(m_data_source);
                    // 设置找人代付信息
                    setOtherPayInfo(m_data_source);
                }
                else {
                    _H('bank_memo_6_100_' + m_data_source["order_sequence_id"]);
                    _H('bank_memo_description_6_100_' + m_data_source["order_sequence_id"]);
                    _H('bank_memo_detail_6_100_' + m_data_source["order_sequence_id"]);
                }
                if (m_pay_type == 1) {
                    $1('bank_memo_1_-1_' + m_data_source["order_sequence_id"]).innerHTML = rd_pay_id_web_memo;
                    $1('bank_memo_1_-1_' + m_data_source["order_sequence_id"]).className = 'span-w615 color-grey';
                    $1('bank_memo_detail_1_-1_' + m_data_source["order_sequence_id"]).innerHTML = rd_pay_id_web_memo_detail;
                    $1('bank_memo_detail_1_-1_' + m_data_source["order_sequence_id"]).className = 'explain-box';
                    //$S('bank_memo_1_-1');
                    //$S('bank_memo_detail_1_-1');
                    if (m_data_source["shop_type"] == 5) {
                        _H('bank_memo_detail_1_-1_' + m_data_source["order_sequence_id"]);
                    }
                }
                else {
                    _H('bank_memo_1_-1_' + m_data_source["order_sequence_id"]);
                    _H('bank_memo_detail_1_-1_' + m_data_source["order_sequence_id"]);
                }
                if (m_pay_type == 0 && m_pay_id == 1) {
                    var o = $1('bank_memo_0_1_' + m_data_source["order_sequence_id"]);
                    if (o != null) {
                        $1('bank_memo_0_1_' + m_data_source["order_sequence_id"]).innerHTML = "";
                        $1('bank_memo_0_1_' + m_data_source["order_sequence_id"]).className = 'tip-warn';
                    }
                }
                else {
                    _H('bank_memo_0_1_' + m_data_source["order_sequence_id"]);
                }
                if (m_pay_type == 0 && m_pay_id == 54) {
                    var oo = $1('bank_memo_0_54_' + m_data_source["order_sequence_id"]);
                    if (oo != null) {
                        $1('bank_memo_0_54_' + m_data_source["order_sequence_id"]).innerHTML = "";
                        $1('bank_memo_0_54_' + m_data_source["order_sequence_id"]).className = 'tip-warn';
                    }
                }
                else {
                    _H('bank_memo_0_54_' + m_data_source["order_sequence_id"]);
                }
                if (m_pay_type == 0 && m_pay_id == 56) {
                    var howToUse = $1('bank_memo_0_56_' + m_data_source["order_sequence_id"]).lastChild;
                    if (howToUse != null) {
                        howToUse.style.display = "";
                    }
                }
                else {
                    if ($1('bank_memo_0_56_' + m_data_source["order_sequence_id"]) != null) {
                        var howToUse = $1('bank_memo_0_56_' + m_data_source["order_sequence_id"]).lastChild;
                        if (howToUse != null) {
                            howToUse.style.display = "none";
                        }
                    }
                }
                var alipay = $1('bank_memo_0_56_' + m_data_source["order_sequence_id"]);
                if (alipay != null) {
                    $1('bank_memo_0_56_' + m_data_source["order_sequence_id"]).innerHTML = alipay_desc + alipay_how_to_use.replace('{ALIPAY_PATH}', ALIPAY_PATH);;
                    $1('bank_memo_0_56_' + m_data_source["order_sequence_id"]).className = 'tip-warn';
                }
            }
        }
	 );

    //var shipping_fee_tips = {
    //    init: function (sequence_id) {
    //        if (m_data_source['shop_id'] > 0) {
    //            $H("shippingfee_tip_" + sequence_id);
    //            $S("shop_shippingfee_tip_" + sequence_id);
    //        }
    //        else {
    //            $S("shippingfee_tip_" + sequence_id);
    //            $H("shop_shippingfee_tip_" + sequence_id);
    //        }
    //    },
    //    show: function (sequence_id) { $S("order_shipping_fee_tips_" + sequence_id); },
    //    hide: function (sequence_id) { $H("order_shipping_fee_tips_" + sequence_id); }
    //}
    // tj 2013-11-29 add 设置找人代付信息
    var setOtherPayInfo = function(m_data_source) {
 
        if (m_data_source["payer_email"] != null && m_data_source["payer_email"]!="") {
            other_pay_email.value = m_data_source["payer_email"];
        }
        if (m_data_source["payer_message"] != "") {
            other_pay_message.value = m_data_source["payer_message"];
            shipmessage.OnChange();
        }
        if (m_data_source["payer_mess_id"] != "" && m_data_source["payer_mess_id"] != 0) {
            var other_pay_rd_message_checked_element = $1("other_pay_rd_message_" + m_data_source["payer_mess_id"] + "_" + m_data_source["order_sequence_id"]);
            if (other_pay_rd_message_checked_element) {
                other_pay_rd_message_checked_element.checked = true;
                //other_pay_rd_message_checked_element.click();
            }
        } else {
            // 默认选中“默认留言”
            var other_pay_rd_message_checked_element = $1("other_pay_rd_message_10_" + m_data_source["order_sequence_id"]);
            if (other_pay_rd_message_checked_element) {
                other_pay_rd_message_checked_element.checked = true;
                other_pay_rd_message_checked_element.click();
            }
        }
        if (m_data_source["is_other_pay"] == 0) {
            other_pay_public_name.checked = true;
        } else if (m_data_source["is_public_name"] == 1) {
            other_pay_public_name.checked = true;
        } else {
            other_pay_public_name.checked = "";
        }
        // tj 2014-01-08 add 电子书、虚拟礼品卡因为没有收货地址模块，不显示“是否公开收货人姓名”并且值为0
        if (m_data_source["order_type"] == 98 || m_data_source["order_type"] == 50) {
            $H("other_pay_public_name_panel_" + m_data_source["order_sequence_id"]);
            other_pay_public_name.checked = "";
        }
    };
    // tj 2013-11-26 add
    var ShipMessage = function (sequence_id) {
        var ship_msg_obj = $1("other_pay_message_" + sequence_id); // 信息主体
        var shop_message_length_obj = $1("other_pay_message_length_" + sequence_id); // 字数提示
        //var msg_cache = ship_msg_obj.value
        //var maxlength = 60;
        //var old_msg = "";
        //var row = ship_msg_obj.rows;
        //var GetLength = function (str) {
        //    ///<summary>获得字符串实际长度，中文2，英文1</summary>
        //    var realLength = 0, len = str.length, charCode = -1;
        //    for (var i = 0; i < len; i++) {
        //        charCode = str.charCodeAt(i);
        //        if (charCode >= 0 && charCode <= 128) realLength += 1;
        //        else realLength += 1.63; //这里仅是计算汉字占用宽度而已，不是字符数
        //    }
        //    return realLength;
        //};
        // 初始化长度
        var msg = decodeURIComponent(ship_msg_obj.value.replace(/\+/ig, " "));
        shop_message_length_obj.innerHTML = msg.length + "/35";

        var messageMethod = {
            //公有变量、方法
            OnChange: function () {
                ///<summary>商家留言输入的时候更新字数指示</summary>rows
                var msg = ship_msg_obj.value;
                if (msg.length > 35) {
                    ship_msg_obj.value = msg.substr(0, 35);
                }
                shop_message_length_obj.innerHTML = ship_msg_obj.value.length + "/35";
            }
        };
        return messageMethod;
    };

    // 阻止默认事件发生
    //var stopDefaultKey = function (e) {
    //    if (e && e.preventDefault) {//如果是FF下执行这个  
    //        e.preventDefault();
    //    } else {
    //        window.event.returnValue = false; //如果是IE下执行这个  
    //    }
    //    return false;
    //}

    // 获取event对象
    var GetEvent = function() {
        if (document.all) // IE
        {
            return window.event;
        }
        func = GetEvent.caller; // 返回调用本函数的函数
        while (func != null) {
            // Firefox 中一个隐含的对象 arguments，第一个参数为 event 对象
            var arg0 = func.arguments[0];
            if (arg0) {
                if ((arg0.constructor == Event || arg0.constructor == MouseEvent) || (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
                    return arg0;
                }
            }
            func = func.caller;
        }
        return null;
    };

    // tj 2013-11-23 给他人代付绑定事件
    var init_others_payment = function(m_data_source) {
        other_pay_phone_number = $1('other_pay_phone_number_' + m_data_source['order_sequence_id']); // 获取找人代付-电话号码文本框
        other_pay_email = $1('other_pay_email_' + m_data_source['order_sequence_id']); // 获取找人代付-邮箱文本框
        other_pay_message = $1('other_pay_message_' + m_data_source['order_sequence_id']); // 获取找人代付-留言文本框
        span_other_pay_error = $1("span_other_pay_error_" + m_data_source["order_sequence_id"]);
        area_other_pay_error = $1("area_other_pay_error_" + m_data_source["order_sequence_id"]);
        other_pay_public_name = $1("other_pay_public_name_" + m_data_source["order_sequence_id"]); // 获取是否公开收货人姓名
        others_payment_rd_message_elements = user_defined_getElementsByName("input", "other_pay_rd_message_" + m_data_source["order_sequence_id"]);
        other_pay_public_name_panel = $1("other_pay_public_name_panel_" + m_data_source["order_sequence_id"]);
        // 注册找人代付-手机号码的获得焦点和失去焦点的时间
        if (other_pay_phone_number != null) {
            user_define_addEvent(other_pay_phone_number, "focus", function() {
                if (span_other_pay_error.innerHTML == "请输入正确的手机号码") area_other_pay_error.className = 'hide';

                if (other_pay_phone_number.value == "选填") other_pay_phone_number.value = "";
            });
            user_define_addEvent(other_pay_phone_number, "blur", function() {
                if (other_pay_phone_number.value == "") other_pay_phone_number.value = "选填";

                if (other_pay_phone_number.value != "选填" && other_pay_phone_number.value.match(regex_phone_number) == null) {
                    area_other_pay_error.className = 'help-inline help-inline-error help-inline-middle';
                    span_other_pay_error.innerHTML = "请输入正确的手机号码";
                }
            });
        }
        // 注册找人代付-邮箱的获得焦点和失去焦点的时间
        if (other_pay_email != null) {
            user_define_addEvent(other_pay_email, "focus", function() {
                if (span_other_pay_error.innerHTML == "请输入正确的邮箱") area_other_pay_error.className = 'hide';

                if (other_pay_email.value == "选填") other_pay_email.value = "";
            });
            user_define_addEvent(other_pay_email, "blur", function() {
                if (other_pay_email.value == "") other_pay_email.value = "选填";
                if (other_pay_email.value != "选填" && !regex_email.test(other_pay_email.value)) {
                    area_other_pay_error.className = 'help-inline help-inline-error help-inline-middle';
                    span_other_pay_error.innerHTML = "请输入正确的邮箱";
                }
            });
        }
        if (other_pay_message != null) {
            shipmessage = ShipMessage(m_data_source["order_sequence_id"]);
            other_pay_message.onkeyup = shipmessage.OnChange;
        }
        if (others_payment_rd_message_elements != null && others_payment_rd_message_elements.length > 0) {
            var len = others_payment_rd_message_elements.length;
            for (var i = 0; i < len; i++) {
                if (others_payment_rd_message_elements[i] == null) continue;
                user_define_addEvent(others_payment_rd_message_elements[i], "click", function() {

                    var other_pay_rd_message_value = "" + getCheckedOtherPayRdMessageElement().value;

                    show_message_element = $1("other_pay_message_" + m_data_source["order_sequence_id"]);
                    if (other_pay_rd_message_value == 10) {
                        show_message_element.value = default_messages[other_pay_rd_message_value];
                    } else if (other_pay_rd_message_value == 11) {
                        show_message_element.value = default_messages[other_pay_rd_message_value];
                    } else if (other_pay_rd_message_value == 12) {
                        show_message_element.value = default_messages[other_pay_rd_message_value];
                    } else if (other_pay_rd_message_value == 13) {
                        show_message_element.value = default_messages[other_pay_rd_message_value];
                    } else if (other_pay_rd_message_value == 14) {
                        show_message_element.value = default_messages[other_pay_rd_message_value];
                    }
                    shipmessage.OnChange();
                });
            }
        }
    };

    // 获取选中的找人代付留言类型
    var getCheckedOtherPayRdMessageElement = function() {
        if (others_payment_rd_message_elements != null && others_payment_rd_message_elements.length > 0) {
            var len = others_payment_rd_message_elements.length;
            for (var i = 0; i < len; i++) {
                if (others_payment_rd_message_elements[i] == null) continue;
                if (others_payment_rd_message_elements[i].checked) return others_payment_rd_message_elements[i];
            }
        }
        return null;
    };

    // 给元素注册事件
    function user_define_addEvent(element, eventName, eventFunction) {
        if (element == null) return;
        // IE
        if (element.attachEvent) {
            element.attachEvent("on" + eventName, eventFunction);
        }
            // firefox chrome
        else if (element.addEventListener) {
            element.addEventListener(eventName, eventFunction, false);
        }
        else if (element.setAttribute) {
            element.setAttribute("on" + eventName, eventFunction);
        }
        else {
            element["on" + eventName] = eventFunction;
        }
    }
    // 获取元素
    function user_defined_getElementsByName(tag, name) {
        var returns = new Array();
        var elements = document.getElementsByTagName(tag);
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].getAttribute("name") == name) {
                returns.push(elements[i]);
            }
        }
        return returns;
    };
    
    var showFirstLevel = function () {
        if ($('#paymentList>div.item-list').length == 1) {
            $('#paymentCollapse').click();
        }
    }

    //#region 只读状态
    this.showReadOnly = function () {
        if ($('#paymentCollapse').text() == "") {
            $('#paymentCollapse').text("收起");
        }
        //若有还需支付金额，且支付方式没有选择，则展开 
        if ((m_data_source['pay_type_name'] == '' || m_data_source['pay_type_name'] == null) && m_data_source['order_payable_amount'] > 0) {
            this.showEditable();
            return;
        }

        //2是礼品卡，1是礼券
        //if (m_data_source['coupon_type'] == 2)
        if (CouponType.hasFlag(+m_data_source.coupon_type, CouponType.GiftCard))
            //m_data_source['giftcard_amount'] = formatFloat(m_data_source['coupon_amount']);//衡静注释，java输出节点不是coupon_amount
            m_data_source['giftcard_amount'] = formatFloat(m_data_source['cust_gift_card_used']);
        else
            m_data_source['giftcard_amount'] = "0.00";

        m_data_source['cust_cash_used'] = formatFloat(m_data_source['cust_cash_used']);
        m_data_source['order_payable_amount'] = formatFloat(m_data_source['order_payable_amount']);

        m_show_status = 0;
        m_payment_panel.Template = PAYMENT_READONLY_TEMPLATE;
        m_payment_panel.DataBind();
        init_control();
        $1(div_payment).className = 'item-list';

        //余额显示
        if (m_data_source['cust_cash_used'] == "0.00")
            $1(cust_cash_account_used).className = 'hide';
        else
            $1(cust_cash_account_used).className = 'mr-10';
        //礼品卡显示
        if (formatFloat(m_data_source['giftcard_amount']) == "0.00")
            $1(gift_card_account_used).className = 'hide';
        else
            $1(gift_card_account_used).className = 'mr-10';
        //礼券显示
        if (formatFloat(m_data_source['coupon_amount']) > "0.00" && (CouponType.hasFlag(+m_data_source['coupon_type'], CouponType.Coupon) || CouponType.hasFlag(+m_data_source['coupon_type'], CouponType.DiscountCode)))
            $1(coupon_account_used).className = 'mr-10';
        else
            $1(coupon_account_used).className = 'hide';
        //积分显示
        if (m_data_source['point_deduction_amount'] == "0.00")
            $1(point_deduction_amount).className = 'hide';
        else
            $1(point_deduction_amount).className = 'mr-10';
        //支付方式显示
        if (formatFloat(m_data_source['order_payable_amount']) == "0.00")
            $1(li_pay_id_name).className = 'hide';
        else
            $1(li_pay_id_name).className = 'mr-10';
        //找人代付邮箱显示
        if (m_data_source["pay_type"] == 6 && m_data_source["is_other_pay"] == 1) {
            $1(li_other_pay_email).className = 'mr-10';
            if (m_data_source["payer_email"] == null || m_data_source["payer_email"] == "") {
                $1(li_other_pay_email).innerHTML = "未填写代付邮箱";
            }
        } else
            $1(li_other_pay_email).className = 'hide';
        //added by mlx 2013-4-25  纸电互赠,电子书是赠品时，不能点击“修改支付方式”
        if (m_data_source['is_only_gift'] == true && m_data_source['order_payable_amount'] == "0.00") {
            $1(area_payment_edit).innerHTML = "修改支付方式";
        } else {
            //修改支付方式
            $1(btn_payment_edit).onclick = this.showEditable;
        }
        showFirstLevel();
    };
    //#endregion

    this.isEditStatus = function() {
        return m_show_status == 1;
    };

    //#region 编辑状态
    this.showEditable = function() {
        $('#paymentList>p.listcon').remove();
        $('#paymentList>h4').show();
        $('#paymentList>div.item-list').show();
        $('#paymentCollapse').text('');
        //判断使用了礼品卡还是礼券，1是礼券，2是礼品卡
        var currentCouponType = +m_data_source.coupon_type;
        if (CouponType.hasFlag(currentCouponType, CouponType.GiftCard))
            //m_data_source['giftcard_amount'] = formatFloat(m_data_source['coupon_amount']);//衡静注释，从新字段取值
            m_data_source['giftcard_amount'] = formatFloat(m_data_source['cust_gift_card_used']);
        else
            m_data_source['giftcard_amount'] = "0.00";

        m_data_source['remain_cash'] = formatFloat(m_data_source['remain_cash']);
        m_data_source['cust_cash_used'] = formatFloat(m_data_source['cust_cash_used']);
        m_data_source['remain_gift_card'] = formatFloat(m_data_source['remain_gift_card']);
        m_data_source['order_payable_amount'] = formatFloat(m_data_source['order_payable_amount']);
        m_data_source['probable_gift_card_amount'] = formatFloat(m_data_source['probable_gift_card_amount']);
        m_data_source['probable_gift_card_charge'] = formatFloat(m_data_source['probable_gift_card_charge']);
        m_data_source['gift_card_charge'] = formatFloat(m_data_source['gift_card_charge']);
        m_data_source['giftcard_amount_nocharge'] = formatFloat(formatFloat(m_data_source['giftcard_amount']) - formatFloat(m_data_source['gift_card_charge']));

        m_payment_panel.Template = PAYMENT_EDITABLE_TEMPLATE;
        m_payment_panel.DataBind();

        for (var i = 0; i < yihao_shopId.length; i++) {
            if (m_data_source['shop_id'] == yihao_shopId[i]) {
                _H('by-gift_' + m_data_source['shop_id']);
                $1('dd_cust_giftcard_limit_tips_' + m_data_source['order_sequence_id']).className = '';
                $1('dd_cust_giftcard_limit_tips_' + m_data_source['order_sequence_id']).innerHTML = "(此店铺暂不支持礼品卡支付)";
            }
        }
        //购买实体礼品卡或虚拟礼品卡不能使用礼品卡支付
        if (m_data_source['order_type'] == 51 || m_data_source['order_type'] == 50) {
            _H('by-gift_' + m_data_source['shop_id']);
        }

        init_control();
        //$1(div_payment).className = '';

        is_dangdang_money = m_data_source['remain_gift_card'] > 0;
        m_data_source['giftcard_amount'] = formatFloat(m_data_source['giftcard_amount']);
        is_dangdang_money_use = m_data_source['giftcard_amount'] > 0;
        is_cust_cash = m_data_source['remain_cash'] > 0;
        is_cust_cash_used = m_data_source['cust_cash_used'] > 0;
        payable = m_data_source['order_payable_amount'];

        //控制余额是否显示
        if (is_cust_cash && is_cust_cash_used)
            $1(cust_cash_area).className = "by-balance";
        else
            $1(cust_cash_area).className = "hide";

        if (is_cust_cash_used) {
            $1(span_cust_account).className = '';
        } else {
            $1(span_cust_account).className = 'hide';
        }
        
        if (is_dangdang_money && is_dangdang_money_use)
            $1(remain_gift_card).className = '';
        else {
            $1(remain_gift_card).className = 'hide';
        }

        if (is_dangdang_money_use) {
            $1(span_ddmoney).className = '';
        } else {
            $1(span_ddmoney).className = 'hide';
        }

        //控制足以支付、还需支付区域是否显示              
        if (payable > 0) {
            $1(dd_cust_cash_tips).className = 'hide';
            //  $1(dd_money_payable_tips).className = 'p-first';
        } else if (payable == "0.00") {
            //$1(dd_cust_cash_tips).className = '';
            //$1(dd_money_payable_tips).className = 'hide';
            //if (is_cust_cash_used && is_dangdang_money_use)
            //    $1(dd_cust_cash_tips).innerHTML = "(余额和礼品卡足以支付此订单，无需选择其它支付方式)";
            //else if (is_cust_cash_used && (m_data_source['coupon_type'] == 1 || m_data_source['coupon_type'] == 4))
            //    $1(dd_cust_cash_tips).innerHTML = "(余额和礼券足以支付此订单，无需选择其它支付方式)";
            //else if (is_cust_cash_used)
            //    $1(dd_cust_cash_tips).innerHTML = "(余额足以支付此订单，无需选择其它支付方式)";
            //else if (is_dangdang_money_use)
            //    $1(dd_cust_cash_tips).innerHTML = "(礼品卡足以支付此订单，无需选择其它支付方式)";
            //else if (m_data_source['coupon_type'] == 1 || m_data_source['coupon_type'] == 4)
            //    $1(dd_cust_cash_tips).innerHTML = "(礼券足以支付此订单，无需选择其它支付方式)";
            
            var tips = "";
            if (is_cust_cash_used) {
                tips=tips + "余额、";
            }
            if (CouponType.hasFlag(currentCouponType, CouponType.Coupon) || CouponType.hasFlag(currentCouponType, CouponType.DiscountCode)) {
                tips = tips + "礼券/优惠码、";
            }
            if (CouponType.hasFlag(currentCouponType, CouponType.GiftCard)) {
                tips = tips + "礼品卡、";
            }
            if (m_data_source.point_deduction_amount > 0) {
                tips = tips + "积分、";
            }
            if (tips) {
                tips=tips.substring(0,tips.length - 1);
            }
            tips = tips + "足以支付此订单，无需选择其它支付方式";
            $1(dd_cust_cash_tips).innerHTML = tips;
        }

        //m_payment_panel.DataBind();
        m_show_status = 1;

        m_pay_type = -1;
        m_pay_id = m_data_source['pay_id'];
        m_pay_type = m_data_source['pay_type'];
        m_ship_type = m_data_source['ship_type'];
        m_is_contain_normal_giftebook = m_data_source['is_contain_normal_giftebook'];
        //记载支付方式
        if (m_data_source['order_payable_amount'] > 0) {
            var pay_id_data = new Hashtable();
            pay_id_data['ship_type'] = m_data_source['ship_type'];
            pay_id_data['city_is_cod'] = m_data_source['city_is_cod'];
            pay_id_data['city_is_cod_pos'] = m_data_source['city_is_cod_pos'];
            pay_id_data['order_sequence_id'] = m_data_source['order_sequence_id'];
            pay_id_ajax.invokeServer(pay_id_data, 'POST', true);
        }

        $1(btn_payment_save).onclick = function() { btn_payment_save_click() };

        product_choice_payment_Dialog = new DivModelDialog(span_product_choice_payment, product_choice_payment_title, product_choice_payment_box, 'div_shield', product_choice_payment_content, product_choice_payment_loading_bar);
        $1(a_openPayment_edit).onclick = function() { product_choice_payment_Dialog.closeDialog(); };
        $1(cod_to_shopping).onclick = function() { product_choice_payment_Dialog.closeDialog(); };
    };
    //#endregion

    //#region 付款方式区域保存按钮的点击事件
    var btn_payment_save_click = function () {
        var payment_data = new Hashtable();
        var cur_pay_id = 0;
        var cur_pay_type = -1;
        if (rd_pay_id.DataSource != null) {
            cur_pay_type = rd_pay_id.getValue(var_rd_pay_id);
            if (cur_pay_type < 0 || cur_pay_type == null) {
                $1(area_payment_save_tips).className = 'help-inline help-inline-error help-inline-middle';
                $1(span_payment_save_tips).innerHTML = '请为您的订单选择一种付款方式';
                return;
            }
            cur_pay_id = rd_pay_id.getSelectedControl(var_rd_pay_id).id;
            //cur_pay_type_name = rd_pay_id.getSelectedControl(var_rd_pay_id).attributes['typename'].value;
            // tj 2013-12-25 add 只有当选择的是“找人代付”时，才做合理性判断。
            if (cur_pay_type == 6 && cur_pay_id == 100) {
            
                if (other_pay_email != null) {
                    if (other_pay_email.value == "选填") {
                        payment_data["payer_email"] = "";
                    }
                    else if (!regex_email.test(other_pay_email.value)) {
                        $1("area_other_pay_error_" + m_data_source["order_sequence_id"]).className = 'help-inline help-inline-error help-inline-middle';
                        $1("span_other_pay_error_" + m_data_source["order_sequence_id"]).innerHTML = "请输入正确的邮箱";
                        return;
                    }
                    else {
                        payment_data["payer_email"] = other_pay_email.value; // 获取代付者邮箱
                    }
                }
                var other_pay_rd_message_current_element = getCheckedOtherPayRdMessageElement();
                if (other_pay_rd_message_current_element != null) {
                    payment_data["payer_mess_id"] = other_pay_rd_message_current_element.value; // 获取代付者留言类型
                }
                if (other_pay_message != null) {
                    if (is_so_long(other_pay_message.value)) {
                        return;
                    }
                    else {
                        payment_data["payer_message"] = other_pay_message.value; // 获取代付者留言
                    }
                }
                if (other_pay_public_name != null) {
                    // 获取是否公开收货人姓名
                    if (other_pay_public_name.checked && m_data_source["order_type"] != 98 && m_data_source["order_type"] != 50) {
                        payment_data["is_public_name"] = 1;
                    }
                    else {
                        payment_data["is_public_name"] = 0;
                    }
                }
            }
        }
        if (m_data_source['order_payable_amount'] == "0.00" &&(CouponType.hasFlag(m_data_source.coupon_type, CouponType.GiftCard)||CouponType.hasFlag(m_data_source.coupon_type, CouponType.DiscountCode)||CouponType.hasFlag(m_data_source.coupon_type, CouponType.Coupon)|| is_cust_cash_used || CouponType.hasFlag(m_data_source.coupon_type,CouponType.Point))) {
            cur_pay_type = 5;
            cur_pay_id = 50;
        }

        $1(area_payment_save_tips).className = 'hide';
        $1(span_payment_save_tips).innerHTML = '';
        m_payment_tips = null;
        //判断该区域是否存在这种选择,如果存在付款方式选择区域，则保存，否则（账户余额足以支付该订单），付款方式字段不更新
        payment_data['pay_type'] = cur_pay_type;
        payment_data['pay_id'] = cur_pay_id;
        payment_data['order_sequence_id'] = m_data_source['order_sequence_id'];
        payment_data['inherit_status'] = false;  //false:保存；true：继承
        m_payment_save(payment_data);

    };
    //#endregion

    // tj 2013-11-24 add 判断是否超过规定字符
    var is_so_long = function (str, len) {
        var so_long = false;
        var char_length = 0;
        for (var i = 0; i < str.length; i++) {
            var son_str = str.charAt(i);
            encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5;
            if (char_length >= len) {
                return true;
            }
        }
        return so_long;
    };

    //#region 中控调用方法
    //保存事件
    this.setPaymentSave = function(payment_save) {
        m_payment_save = payment_save;
    };
    //保存支付方式错误提示
    this.setpayment_tips = function(payment_tips) {
        m_payment_tips = payment_tips;
    };
    this.setDataSource = function(data_source) {
        m_data_source = data_source;
        m_payment_panel.DataSource = data_source;
    };

    this.closeProductLimit = function() {

        product_choice_payment_Dialog.closeDialog();
    };

    this.setHignLight = function() {
        $1(btn_payment_save).className = 'btn btn-large-orange';
        //$1(payment_tips).className = 'consignee list_wrong';
    };


    this.setPayPasswordStatus = function(pay_password_status_update) {
        m_set_pay_password_status = pay_password_status_update;
    };

    this.updatePayPasswordStatus = function(stauts) {
        m_payment_password_status = stauts;
    };
    
    //this.refreshDDMoney = function (newValue) {
    //    if ($1(remain_gift_card_account) != null) {
    //        $1(remain_gift_card_account).innerHTML = formatFloat(parseFloat(newValue) + parseFloat(m_data_source['remain_gift_card']));
    //        //m_data_source['remain_gift_card'] = formatFloat(parseFloat(newValue) + parseFloat(m_data_source['remain_gift_card']));
    //    }
    //    m_data_source['remain_gift_card'] = formatFloat(parseFloat(newValue) + parseFloat(m_data_source['remain_gift_card']));
    //};

    //继承方法
    this.setInherit = function(payment_data) {
        if ((m_data_source['pay_type_name'] == ''||m_data_source['pay_type_name'] == null) && m_data_source['order_payable_amount'] > 0) {
            if (rd_pay_id.findPayType(payment_data['pay_id'], payment_data['pay_type'])) {
                var inherit_data = new Hashtable();
                if (payment_data["is_other_pay"] == 1) {
                    inherit_data['pay_type'] = 6;
                    inherit_data['pay_id'] = 100;
                } else {
                    inherit_data['pay_type'] = payment_data['pay_type'];
                    inherit_data['pay_id'] = payment_data['pay_id'];
                }
                inherit_data['order_sequence_id'] = m_data_source['order_sequence_id'];
                inherit_data['inherit_status'] = true;
               
                inherit_data["payer_email"] = payment_data['payer_email'];
                inherit_data["payer_message"] = payment_data["payer_message"];
                inherit_data["payer_mess_id"] = payment_data["payer_mess_id"];
                if (m_data_source['order_type'] == 98 || m_data_source['order_type'] == 50) {
                    inherit_data["is_public_name"] = 0;
                } else {
                    inherit_data["is_public_name"] = payment_data["is_public_name"];
                }
                m_payment_save(inherit_data);
            }
        }
    };

    this.setPaymentSaveConfig = function(config_tips) {
        $1(area_payment_save_tips).className = 'help-inline help-inline-error help-inline-middle';
        $1(span_payment_save_tips).innerHTML = config_tips;
    };

    this.setSubmitConflictTips = function() {
        var cur_pay_id = 0;
        cur_pay_id = rd_pay_id.getValue(var_rd_pay_id);

        if (cur_pay_id <= 0) {
            $1(area_payment_save_tips).className = 'help-inline help-inline-error help-inline-middle';
            $1(span_payment_save_tips).innerHTML = '请为您的订单选择一种付款方式';
            return;
        }
    };
    //#endregion
}

