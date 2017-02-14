//#region html
var SHIPMENT_READONLY_TEMPLATE =
"<p class='listcon'  id='p_city_ship_type_readonly_{order_sequence_id}'>订单{sort_num}：<span id='div_ship_type_name_{order_sequence_id}' class='mr-10'>{ship_type_name}</span><span id='div_ship_date_{order_sequence_id}' class='mr-10'>{ship_date_name}</span><span id='div_ship_send_date_{order_sequence_id}' class='mr-10'>{ship_arrive_date}</span><span id='span_packing_type_name_{order_sequence_id}' class='mr-10' >{packing_type_name}</span><span id='span_pick_up_name_{order_sequence_id}' class='mr-10'></span><a id='btn_shipment_edit_{order_sequence_id}' href='javascript:for_99click();'>编辑</a></p>"
    + "<span id='span_city_ship_type_desc_{order_sequence_id}' class='color-orange'>{city_ship_type_desc}</span>";

var PICKUP_READONLY_TEMPLATE =
"<p class='listcon'  id='p_city_ship_type_readonly_{order_sequence_id}'>订单{sort_num}：<span id='div_ship_type_name_{order_sequence_id}' class='mr-10'>{ship_type_name}</span><span id='div_ship_date_{order_sequence_id}' class='mr-10'>{ship_date_name}</span><span id='div_ship_send_date_{order_sequence_id}' class='mr-10'>{ship_arrive_date}</span><span id='span_packing_type_name_{order_sequence_id}' class='mr-10' >{packing_type_name}</span><span id='span_pick_up_name_{order_sequence_id}' class='mr-10'>{pick_up_name}</span><a id='btn_shipment_edit_{order_sequence_id}' href='javascript:for_99click();'>编辑</a></p>"
    + "<span id='span_city_ship_type_desc_{order_sequence_id}' class='color-orange'>{city_ship_type_desc}</span>";

var SHIPMENT_EBOOK_READONLY_TEMPLATE =
"<p class='listcon'>订单{sort_num}：<span class='mr-10'>自动发货</span><span class='mr-10'>款项到达当当网账户后，系统将立即为您开通电子书在线阅读权限，您可以到“我的当当-数字商品”下阅读您购买的电子书</span></p>";

var SHIPMENT_VDDMONEY_READONLY_TEMPLATE =
"<p class='listcon'>订单{sort_num}：<span class='mr-10'>自动发货</span><span class='mr-10'>款项到达当当网账户后，系统在1个工作日内将对应的卡号和密码发送到您的“<a href='http://account.dangdang.com/payhistory/mymoney.aspx?ref=checkout-2-B' target='_blank'>我的当当-当当礼品卡</a>”页</span></p>";

var SHIPMENT_EDITABLE_TEMPLATE =
"<a name='shipment_point_{order_sequence_id}'></a>"
+ "<div id='div_shipment_tips_{order_sequence_id}' class='item-ship'>"
    + "<div class='item-ship-title'><div class='col1'><b>订单{sort_num}</b></div></div>"
    + "<div id='rd_shipinfo_{order_sequence_id}' class='ship-box'></div>"
        + "<div id='pack_prod_{order_sequence_id}'><h4 id='pck_prod'>货物拆分</h4></div>"
        + "<div class='ship-box'>"
        + "<div id='packing_type_{order_sequence_id}' class='item'>"
        + "</div>"
        + "<div id='shipment_submit_{order_sequence_id}' class='item'>"
              + "<p class='btn-bar'><a id='btn_shipment_save_{order_sequence_id}' class='btn btn-large-orange' href='javascript:for_99click();'>确认送货方式</a><span id='span_shipment_save_tips_{order_sequence_id}' class='hide'></span></p>"
        + "</div>"
    + "</div>"
    + "<div class='color-orange' id='div_city_ship_type_desc_{order_sequence_id}'>{city_ship_type_desc}</div>"
+ "</div>";


var PACKING_TYPE_TEMPLATE = "<ul>"
    + "<li>"
        + "<p>"
            + "<label class=\"radio\" for=\"\"><input type=\"radio\" name=\"packing_type_{order_sequence_id}\" value=\"2\" checked=\"checked\" />等待所有商品到货一起发货</label>"
        + "</p>"
    + "</li>"
    + "<li>"
        + "<p>"
            + "<label class=\"radio\" for=\"\"><input type=\"radio\" name=\"packing_type_{order_sequence_id}\" value=\"1\" />用最快方式拆分包裹，您将优先收到有货商品(<a href='http://help.dangdang.com/details/page5' target='_blank'>可能会产生额外运费</a>)</label>"
        + "</p>"
    + "</li>"
+ "</ul>";

var PACKAGE_PREVIEW_DIALOG =
  "<div id=\"package_preview_container\" style=\"z-index:10000;display:none;width:390px;height:370px;\" class=\"popup-wrap popup-split popup-split-detail\">"
+ "  <div id=\"package_preview_title\" class=\"popup-title\">"
+ "      <h3>货物拆分</h3>"
+ "      <a id=\"package_preview_close\" href=\"javascript:void(0)\" class=\"btn-popup-close\"></a>"
+ "  </div>"
+ "  <div id=\"package_preview_items\" class=\"popup-cont\" style=\"height:290px\">"
+ "  {packages}"
+ "  </div>"
+ "  <p class=\"btn-bar\"><a id=\"package_preview_ok\" class=\"btn btn-small-grey\" href=\"javascript:void(0)\">我知道了</a></p>"
+ "</div>";

var PACKAGE_PREVIEW_ITEM =
  "<dl>"
+ "   <dt><span>预计送达日期：<b>{send_time}</b></span>运费：<em class=\"price-r\">¥</em>{package_shipping_fee}</dt>"
+ "   {products}"
+ "</dl>";
var SHIPMENT_PICKUP_TEMPLATE =
"<span id='span_pick_up_img' style='position:absolute;display:none;z-index:10001;width:775px'><div id='div_pick_up_img_info' class='new_window window_pickup02'>"
    + "<div class='wind_top' id='pick_up_img_title'><div class='title_left'>查看自提点</div><div class='w_close'><a id='pick_up_img_box' name='map_close' href='javascript:for_99click();' title='关闭'>关闭窗口</a></div></div> <div class='window_content' id='pick_up_img_content'><img id='pick_up_img' name='map' src=''  /></div><div class='loading_gift' id='pick_up_img_loading_bar'></div></div>"
+ "</span>"
+ "<span id='span_pick_up_map' style='position:absolute;display:none;z-index:10001;width:861px'>"
    + "<div id='div_pick_up_map' class='new_window window_pickup'>"
        + "<div class='wind_top'  id='pick_up_map_title'>"
        + "  <div class='title_left'>查看自提点</div>"
        + "  <div class='w_close'><a  id='pick_up_map_box' href='javascript:for_99click();' name='readmap_close' title='关闭'>关闭窗口</a></div>"
        + "</div>"
        + "<div class='window_content'  id='pick_up_map_content'>"
        + "  <div class='window_pickup_search'><input id='pick_up_api_search_key' name='pick_up_api_search_key' value='' type='text' /><button name='search_readmap' id='pick_up_serach'>查 询</button></div>"
        + "  <div class='window_pickup_map'><div style='width:568px;height:358px;border:1px solid gray' id='container'></div></div>"
        + "  <div id='pick_up_address_parent'>"
            + "  <div class='window_pickup_address' id='pick_up_address'>"
            + "    <p id='p_pick_up_count' class='hide'>共<span id='pick_up_count'></span>个自提点</p>"
            + "    <div id='div_pick_up_address'></div>"
            + "  </div>"
        + "  </div>"
        + "  <div class='clear'></div>"
        + "</div>"
    + "</div>"
+ "</span>";

var RD_SHIPINFO_SELF_HEADERTEMPLATE = "<div class='title'><ul><li><div class='col1'>送货方式</div><div class='col2'>预计到达时间</div><div class='col6'>详细运费</div><div class='col3'>运费标准</div></li></ul></div>";
var RD_SHIPINFO_HEADERTEMPLATE = "<div class='title'><ul><li><div class='col1'>送货方式</div><div class='col6'>详细运费</div><div class='col4'>运费标准</div></li></ul></div>";
var RD_SHIPINFO_ITEMTEMPLATE = "<div class='item'><ul><li><div class='col1'><p><label class='radio {color_type}' for=''><input type='radio' name='rd_ship_type_{order_sequence_id}' id='rd_{ship_type}' value={ship_type} {tag}>{type_name}</label><span>{cod_desc}</span></p></div><div id='div_col2_item_{ship_type}_{order_sequence_id}' class='hide'><span>{ship_arrive_date}</span></div><div class='col6'><span id='div_col6_item_{ship_type}_{order_sequence_id}' name='div_col6_item_{order_sequence_id}'>-------</span></div><div id='div_col3_item_{ship_type}_{order_sequence_id}' class='col4' title='{ship_type_desc}{shipping_fee_explain}'>{ship_type_fee_desc}</div></li><div class='hide' id='div_ship_type_cod_{ship_type}_{order_sequence_id}'></div></ul></div>";
var RD_SHIPINFO_NIGHT_COD = "<div class='item'><ul><li><div class='col1'><p><label class='radio {color_type}' for=''><input type='radio' name='rd_ship_type_{order_sequence_id}' id='rd_{ship_type}' value={ship_type} {tag}>{type_name}</label><span>{cod_desc}</span></p></div><div id='div_col2_item_{ship_type}_{order_sequence_id}' class='hide'><span>{ship_arrive_date}</span></div><div class='col6'><span id='div_col6_item_{ship_type}_{order_sequence_id}' name='div_col6_item_{order_sequence_id}'>-------</span></div><div id='div_col3_item_{ship_type}_{order_sequence_id}' class='col4' title='{ship_type_desc}{shipping_fee_explain}'>{ship_type_fee_desc}</div><div id='div_cod_area_desc_{ship_type}_{order_sequence_id}' class='hide'><p>请确认收货地址在{city_name}的以下范围内，才可选择此项。</p><p class='p-scope'><span class='span-scope'>送货范围：</span><span class='span-scope-text'>{cod_area_desc}</span></p></div></li></ul></div>";
var RD_SHIPINFO_SHIPTYPE = "<div class='item'><ul><li><div class='col1'><p><label class='radio {color_type}' for=''><input type='radio' name='rd_ship_type_{order_sequence_id}' id='rd_{ship_type}' value={ship_type} {tag}>{type_name}</label><select class='select-h22' name='name_sel_ship_time_{ship_type}_{order_sequence_id}' id='sel_ship_time_{ship_type}_{order_sequence_id}' {tag}><option>请选择</option><option value='3'>时间不限&nbsp;</option><option value='1' selected='selected' >只工作日送货&nbsp;</option><option value='2'>只双休日、假日送货&nbsp;</option></select><span>{cod_desc}</span></p></div><div id='div_col2_item_{ship_type}_{order_sequence_id}' class='hide'><span>{ship_arrive_date}</span></div><div class='col6'><span id='div_col6_item_{ship_type}_{order_sequence_id}' name='div_col6_item_{order_sequence_id}'>-------</span></div><div id='div_col3_item_{ship_type}_{order_sequence_id}' class='col4' title='{ship_type_desc}{shipping_fee_explain}'>{ship_type_fee_desc}</div></li></ul></div>";
var RD_SHIPINFO_EXPRESS_COD = "<div class='item'><ul><li><div class='col1'><p><label class='radio {color_type}' for=''><input type='radio' name='rd_ship_type_{order_sequence_id}' id='rd_{ship_type}' value={ship_type} {tag}>{type_name}</label></p></div><div id='div_col2_item_{ship_type}_{order_sequence_id}' class='hide'><span>{ship_arrive_date}</span></div><div class='col6'><span id='div_col6_item_{ship_type}_{order_sequence_id}' name='div_col6_item_{order_sequence_id}'>-------</span></div><div id='div_col3_item_{ship_type}_{order_sequence_id}' class='col4' title='{ship_type_desc}{shipping_fee_explain}'>{ship_type_fee_desc}</div><div id='div_cod_area_desc_{ship_type}_{order_sequence_id}' class='hide'><p>请确认收货地址在{city_name}的以下范围内，才可选择此项。</p><p class='p-scope'><span class='span-scope'>送货范围：</span><span class='span-scope-text'>{cod_area_desc}</span></p></div></li></ul></div>";
var RD_SHIPINFO_POST = "<div class='item'><ul><li><div class='col1'><p><label class='radio {color_type}' for=''><input type='radio' name='rd_ship_type_{order_sequence_id}' id='rd_{ship_type}' value={ship_type} {tag}>{type_name}</label></p></div><div id='div_col2_item_{ship_type}_{order_sequence_id}' class='hide'><span>{ship_arrive_date}</span></div><div class='col6'><span id='div_col6_item_{ship_type}_{order_sequence_id}' name='div_col6_item_{order_sequence_id}'>-------</span></div><div id='div_col3_item_{ship_type}_{order_sequence_id}' class='col4' title='{ship_type_desc}{shipping_fee_explain}'>{ship_type_fee_desc}</div><div id='div_cod_area_desc_{ship_type}_{order_sequence_id}' class='hide'><p class='color-grey'>请您务必填写与收货人身份证一致的姓名，以便您能及时地收到商品。</p></div></li></ul></div>";
var RD_SHIPINFO_UPS = "<div class='item'><ul><li><div class='col1'><p><label class='radio {color_type}' for=''><input type='radio' name='rd_ship_type_{order_sequence_id}' id='rd_{ship_type}' value={ship_type} {tag}>{type_name}</label></p></div><div id='div_col2_item_{ship_type}_{order_sequence_id}' class='hide'><span>{ship_arrive_date}</span></div><div class='col6'><span id='div_col6_item_{ship_type}_{order_sequence_id}' name='div_col6_item_{order_sequence_id}'>-------</span></div><div id='div_col3_item_{ship_type}_{order_sequence_id}' class='col4' title='{ship_type_desc}{shipping_fee_explain}'>{ship_type_fee_desc}</div><div id='div_cod_area_desc_{ship_type}_{order_sequence_id}' class='hide'><p class='color-grey'>请您务必填写与收货人身份证一致的姓名，以便您能及时地收到商品。</p></div></li></ul></div>";
var RD_SHIPINFO_COD = "<div class='item'><ul><li><div class='col1'><p><label class='radio {color_type}' for=''><input type='radio' name='rd_ship_type_{order_sequence_id}' id='rd_{ship_type}' value={ship_type} {tag}>{type_name}</label><select class='select-h22' name='name_sel_ship_time_{ship_type}_{order_sequence_id}' id='sel_ship_time_{ship_type}_{order_sequence_id}' {tag}><option>请选择</option><option value='3'>时间不限&nbsp;</option><option value='1' selected='selected' >只工作日送货&nbsp;</option><option value='2'>只双休日、假日送货&nbsp;</option></select><span>{cod_desc}</span></p></div><div id='div_col2_item_{ship_type}_{order_sequence_id}' class='hide'><span>{ship_arrive_date}</span></div><div class='col6'><span id='div_col6_item_{ship_type}_{order_sequence_id}' name='div_col6_item_{order_sequence_id}'>-------</span></div><div id='div_col3_item_{ship_type}_{order_sequence_id}' class='col4' title='{ship_type_desc}{shipping_fee_explain}'>{ship_type_fee_desc}</div><div id='div_cod_area_desc_{ship_type}_{order_sequence_id}' class='hide'><p>请确认收货地址在{city_name}的以下范围内，才可选择此项。</p><p class='p-scope'><span class='span-scope'>送货范围：</span><span class='span-scope-text'>{cod_area_desc}</span></p></div></li></ul></div>";
var RD_SHIPINFO_ECONOMICAL_EXPRESS = "<div class='item'><ul><li><div class='col1'><p><label class='radio {color_type}' for=''><input type='radio' name='rd_ship_type_{order_sequence_id}' id='rd_{ship_type}' value={ship_type} {tag}>{type_name}</label><span></span></p></div><div id='div_col2_item_{ship_type}_{order_sequence_id}' class='hide'><span>{ship_arrive_date}</span></div><div class='col6'><span id='div_col6_item_{ship_type}_{order_sequence_id}' name='div_col6_item_{order_sequence_id}'>-------</span></div><div id='div_col3_item_{ship_type}_{order_sequence_id}' class='col4' title='{ship_type_desc}{shipping_fee_explain}'>{ship_type_fee_desc}</div><div id='div_cod_area_desc_{ship_type}_{order_sequence_id}' class='hide'><p>请确认收货地址在{city_name}的以下范围内，才可选择此项。</p><p class='p-scope'><span class='span-scope'>送货范围：</span><span class='span-scope-text'>{cod_area_desc}</span></p></div></li></ul></div>";
var RD_SHIPINFO_LARGEELECTRONICS = "<div class='item'><ul><li><div class='col1'><p><label class='radio {color_type}' for=''><input type='radio' name='rd_ship_type_{order_sequence_id}' id='rd_{ship_type}' value={ship_type} {tag}>{type_name}</label><span></span></p></div><div id='div_col2_item_{ship_type}_{order_sequence_id}' class='hide'><span>{ship_arrive_date}</span></div><div class='col6'><span id='div_col6_item_{ship_type}_{order_sequence_id}' name='div_col6_item_{order_sequence_id}'>-------</span></div><div id='div_col3_item_{ship_type}_{order_sequence_id}' class='col4' title='{ship_type_desc}{shipping_fee_explain}'>{ship_type_fee_desc}</div></li></ul></div>";
var RD_SHIPINFO_LARGEELECTRONICS_COD = "<div class='item'><ul><li><div class='col1'><p><label class='radio {color_type}' for=''><input type='radio' name='rd_ship_type_{order_sequence_id}' id='rd_{ship_type}' value={ship_type} {tag}>{type_name}</label><span></span></p></div><div id='div_col2_item_{ship_type}_{order_sequence_id}' class='hide'><span>{ship_arrive_date}</span></div><div class='col6'><span id='div_col6_item_{ship_type}_{order_sequence_id}' name='div_col6_item_{order_sequence_id}'>-------</span></div><div id='div_col3_item_{ship_type}_{order_sequence_id}' class='col4' title='{ship_type_desc}{shipping_fee_explain}'>{ship_type_fee_desc}</div><div id='div_cod_area_desc_{ship_type}_{order_sequence_id}' class='hide'><p>请确认收货地址在{city_name}的以下范围内，才可选择此项。</p><p class='p-scope'><span class='span-scope'>送货范围：</span><span class='span-scope-text'>{cod_area_desc}</span></p></div></li></ul></div>";

var RD_SHIPINFO_RESERVE = "<div class='item'><ul><li><div class='col1'><p style='float:left'><label class='radio {color_type}' for=''><input type='radio' name='rd_ship_type_{order_sequence_id}' id='rd_{ship_type}' value={ship_type} {tag}>{type_name}</label></p>" +
"<div class='ap_time'>" +
"<div id='ap_input_{order_sequence_id}' class='ap_input' style='{ap_input_style}'>" +
"<i class='icon_calendar'>&nbsp;</i>" +
"<span id='hd_time_{order_sequence_id}' class='hd_time'>{default_reserve_date}</span>" +
"</div>" +
"<div id='ap_calendar_{order_sequence_id}' class='ap_calendar' style='display:none;'>{calendar_table}</div><iframe id='ap_calendar_iframe_{order_sequence_id}' style='display:none;'></iframe></div></div>" +
"<div id='div_col2_item_{ship_type}_{order_sequence_id}' class='col2'><span>{ship_arrive_date}</span></div><div class='col6'><span id='div_col6_item_{ship_type}_{order_sequence_id}' name='div_col6_item_{order_sequence_id}'>-------</span></div><div id='div_col3_item_{ship_type}_{order_sequence_id}' class='col3' title='{ship_type_desc}{shipping_fee_explain}'>{ship_type_fee_desc}</div>" +
"</li></ul></div>";

var RD_SHIPINFO_PICK_UP = "<div class='item'><ul><li><div class='col1'><p><label class='radio {color_type}' for=''><input type='radio' name='rd_ship_type_{order_sequence_id}' id='rd_{ship_type}' value={ship_type} {pick_up_disabled}>{type_name}</label>" +
    "</p></div><div id='div_col2_item_{ship_type}_{order_sequence_id}' class='hide'><span>-------</span></div><div class='col6'><span id='div_col6_item_{ship_type}_{order_sequence_id}' name='div_col6_item_{order_sequence_id}'>-------</span></div>" +
    "<div id='div_col3_item_{ship_type}_{order_sequence_id}' class='col4' title='{ship_type_desc}{shipping_fee_explain}'>{ship_type_fee_desc}</div>" +

    "<div id='div_pick_up_{order_sequence_id}' class='hide'>" +

        "<p><label for=''></label><select class='select-h22 fl' name='sel_pbc_town'></select>" +

        "<select style='display:none;' class='select-h22 fl' name='sel_pbc_town'><option value='0'>请选择</option></select>" +

        "<input type='text' class='input_address fl' maxlength='120'>" + "<a class='btn btn-normal-grey ver-m' href='javascript:void(0)' id='btn_pickup_search_{order_sequence_id}'>搜 索</a><span id='span_pick_up_address_valid_msg' class='help-inline help-inline-error'></span><div style='clear:both;'></div></p>" +


"                                       <div class='detail_address clearfix' id='pick_up_detail_address'>" +
"                                         <div class='shadow shadow_address'>" +
"                                           <div class='choose_address'>" +
"                                           <p class='title_num'>共有<span class='number'></span>个自提点</p>" +
"                                           <ul class='point_ul'>" +

"                                            </ul>" +
//分页
"                                             <div class='turn_prev_next_page'>" +
"                                               <span class='prev_lastpage' onclick='changePagePickupInfo(\"up\");'></span>" +
"                                               <strong class='now'></strong><strong class='total'></strong>" +
"                                               <span class='next_lastpage' id='next_page' onclick='changePagePickupInfo(\"down\");'></span>" +
"                                             </div>" +
"                                           </div>" +
"                                         </div>" +
"                                    </div>" +

        "<div class='col1To2'><p class='color-grey'>当订单状态变更为“等待自提”时，您可以前往自提点提货，如您下单填写了手机号，将会收到短信通知。为保证您的货品安全，请自提时请带上收件人身份证。</p></div>" +
    "</div>" +

    "</li></ul></div>";

var RPT_PICKUPSITEINFO_ITEMTEMPLATE = "<li class='point'><label for=''>" +
    "<input type='radio' name='pbc_station' class='point_radio'value='{id}'><strong>{display_id}-{name}</strong></label><span class='phone_number'>{contact_tel}</span>" +
    "<p class='text_indent' title='{address}'>{address}</p>" +
    "</li>";
var RPT_PICKUPSITEINFO_ADDRESS = "<p class='result' onMouseOver=\"this.className=\'result result_02\'\" onMouseOut=\"this.className=\'result\'\"><b class={title_css}>{indexB}：{name}</b> <span>地址：{address}</span><span class='tel'>电话：{contact_tel}</span>{pick_up_select}</p>";
var SHIPMENT_ICON_WARN = "<span class='icon icon-warn'></span>";


//#endregion
//#region function
var SHIPTYPE_NORMAL_EXPRESS = 1;

var m_city_id = null;
var m_city_name = null;
var m_province_name = null;
var searchMapdate = null;
var m_town_id = null;
var m_quarter_id = null;
var m_ship_address = null;
var pick_up_id = null;
var pick_up_town_id = null;
var pick_up_quarter_id = 0;
var pick_up_img_dialog = null;
var pick_up_map_dialog = null;
var pick_up_map_json = null;
var map = null;
var key_point = null;
var keyword = null;
var localSearch = null;
var js_state = 0;
var css_state = 0;
var m_rpt_pick_up_address = null;
var m_rpt_pick_up_site_info = new RadioButtonList('ul_pick_up_list');
var ddl_pick_up_town = new DropDownList('pick_up_town');
var ddl_pick_up_quarter = new DropDownList('pick_up_quarter');
var pick_up_site_info_ajax = new Ajax('/pickupsite/town');
var pick_up_town_list_ajax = new Ajax('/pickupsite/regionUnderCity');
var pick_up_quarter_list_ajax = new Ajax('/pickupsite/regionUnderTown');
var pick_up_site_ajax = new Ajax('/pickupsite/get'); 
var indexA = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J");
var pick_up_town_cache = new Object();
var pick_up_quarter_cache = new Object();
var isExistsQuarterPickUp = false; // 默认不存在五级自提点
var isChangePickUpTownDropDownList = false;
var isFirstPickUpOrChangeConsignee = false;

var input_pick_up_address = null;
var cache_pickupsiteinfo_result = null;
var baiduAPI = null;
var is_support_baidu_map = 1;
var pickup_page_index = 1; //自提点当前页码
var current_pick_up_id = 0;
var baidu_api_data = null;

function Shipment(container_id) {
    var m_shipment_panel = new JSPanel(container_id);
    var m_data_source = null;
    var m_show_status = null;
    var m_shipment_save = null;
    var m_shipment_close = null;
    var m_shipment_sync = null;
    var m_packing_type_changed = null;

    var m_ship_type = null;
    var m_ship_date_type = null;
    var m_shipment_pickup = null;
    var rd_shipinfo = null;
    var span_city_ship_type_desc = null;
    var span_shipment_save_tips = null;
    var div_city_ship_type_desc = null;
    var div_pick_up = null;
    var div_shipnment = null;
    var div_shipment_tips = null;
    var div_ship_type_cod_1 = null;
    var div_ship_type_cod_2 = null;
    var div_ship_type_cod_3 = null;
    var div_ship_type_cod_5 = null;
    var div_ship_type_cod_7 = null;
    var div_ship_type_cod_12 = null;
    var div_ship_type_cod_19 = null;
    var div_cod_area_desc_1 = null;
    var div_cod_area_desc_3 = null;
    var div_cod_area_desc_5 = null;
    var div_cod_area_desc_7 = null;
    var div_cod_area_desc_13 = null;
    var div_cod_area_desc_16 = null;
	var div_cod_area_desc_18 = null;
    var div_cod_area_desc_19 = null;
	
    var div_col2_item_1 = null;
    var div_col2_item_2 = null;
    var div_col2_item_3 = null;
    var div_col2_item_4 = null;
    var div_col2_item_5 = null;
    var div_col2_item_6 = null;
    var div_col2_item_7 = null;
    var div_col2_item_8 = null;
    var div_col2_item_11 = null;
    var div_col2_item_12 = null;
    var div_col2_item_13 = null;
    var div_col2_item_16 = null;
    var div_col2_item_17 = null;
	var div_col2_item_18 = null;
    var div_col2_item_19 = null;

    var div_col3_item_1 = null;
    var div_col3_item_2 = null;
    var div_col3_item_3 = null;
    var div_col3_item_4 = null;
    var div_col3_item_5 = null;
    var div_col3_item_6 = null;
    var div_col3_item_7 = null;
    var div_col3_item_8 = null;
    var div_col3_item_11 = null;
    var div_col3_item_12 = null;
    var div_col3_item_13 = null;
    var div_col3_item_16 = null;
    var div_col3_item_17 = null;
	var div_col3_item_18 = null;
    var div_col3_item_19 = null;

    var btn_shipment_edit = null;
    var btn_shipment_save = null;
    var btn_shipment_cancel = null;
    var sel_ship_time_1 = null;
    var sel_ship_time_12 = null;

    var city_is_to_door = null;
    var city_is_night_send = null;
    var is_need_valid_zip = null;
    var is_show_map_api = null;
    var ship_date_type_enum = { '1': '只工作日送货 ', '2': '只双休日、假日送货 ', '3': '时间不限 ', '4': '晚间19:00-22:00送货' };
    var isShowShipmentFestiveTip = false; //是否有节日特殊处理
    var ship_arrive_date_1 = null;
    var ship_type_desc_1 = null;
    var btn_pickup_search = null;
    var a_curr_reserve_ship = null;

    var WeekArray = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    var DiffArray = ["今天", "明天", "后天"];
    var DeliveryDateType = null;
    var DateFormat = function (formatDate, formatString, currentDate) {
        var diffString = WeekArray[formatDate.getDay()];
        if (currentDate) {
            var diff = parseInt((formatDate - currentDate) / (1 * 24 * 60 * 60 * 1000));
            if (diff >= 0 && diff < DiffArray.length) {
                diffString = DiffArray[diff];
            }
        }
        var o = {
            "M+": formatDate.getMonth() + 1, //月份 
            "d+": formatDate.getDate(), //日 
            "h+": formatDate.getHours(), //小时 
            "m+": formatDate.getMinutes(), //分 
            "s+": formatDate.getSeconds(), //秒 
            "S": formatDate.getMilliseconds(), //毫秒
            "W": diffString //星期(今天 明天 后天)
        };
        if (/(y+)/.test(formatString)) {
            formatString = formatString.replace(RegExp.$1, (formatDate.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(formatString)) {
                formatString = formatString.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return formatString;
    }

    var init_control = function () {
        is_support_baidu_map = m_data_source['is_support_baidu_map'];
        ddl_pick_up_quarter.DataTextField = 'name';
        ddl_pick_up_quarter.DataValueField = 'id';
        ddl_pick_up_quarter.OnSelectedIndexChanged = ddlPickupQuarter_SelectedIndexChanged;

        ddl_pick_up_town.DataTextField = 'name';
        ddl_pick_up_town.DataValueField = 'id';
        ddl_pick_up_town.OnSelectedIndexChanged = ddlPickupTown_SelectedIndexChanged;
        m_rpt_pick_up_site_info.ItemTemplate = RPT_PICKUPSITEINFO_ITEMTEMPLATE;
        m_rpt_pick_up_site_info.setOnSelectedIndexChanged(showBindPopupPickUpInfo);
        rd_shipinfo = new RadioButtonList('rd_shipinfo_' + m_data_source['order_sequence_id']);
        if (m_data_source['order_sequence_id'] == '0_0' || m_data_source['order_sequence_id'] == '0_70') {
            rd_shipinfo.HeaderTemplate = RD_SHIPINFO_SELF_HEADERTEMPLATE;
        } else {
            rd_shipinfo.HeaderTemplate = RD_SHIPINFO_HEADERTEMPLATE;
        }
        rd_shipinfo.ItemTemplate = RD_SHIPINFO_ITEMTEMPLATE;
        span_city_ship_type_desc = $("#span_city_ship_type_desc_" + m_data_source['order_sequence_id']);
        span_shipment_save_tips = $1("span_shipment_save_tips_" + m_data_source['order_sequence_id']);
        div_city_ship_type_desc = $1("div_city_ship_type_desc_" + m_data_source['order_sequence_id']);
        div_shipnment = $1("div_shipment_" + m_data_source['order_sequence_id']);
        div_shipment_tips = $1("div_shipment_tips_" + m_data_source['order_sequence_id']);
        btn_shipment_edit = $1("btn_shipment_edit_" + m_data_source['order_sequence_id']);
        btn_shipment_save = $1("btn_shipment_save_" + m_data_source['order_sequence_id']);
        //m_shipment_pickup = new ShipmentPickUp('div_shipment_pickup');
    };

    var init_ship_types_control = function () {
        div_ship_type_cod_1 = $1("div_ship_type_cod_1_" + m_data_source['order_sequence_id']);
        div_ship_type_cod_2 = $1("div_ship_type_cod_2_" + m_data_source['order_sequence_id']);
        div_ship_type_cod_3 = $1("div_ship_type_cod_3_" + m_data_source['order_sequence_id']);
        div_ship_type_cod_5 = $1("div_ship_type_cod_5_" + m_data_source['order_sequence_id']);
        div_ship_type_cod_7 = $1("div_ship_type_cod_7_" + m_data_source['order_sequence_id']);
        div_ship_type_cod_12 = $1("div_ship_type_cod_12_" + m_data_source['order_sequence_id']);
        div_ship_type_cod_19 = $1("div_ship_type_cod_19_" + m_data_source['order_sequence_id']);
        div_cod_area_desc_1 = $1("div_cod_area_desc_1_" + m_data_source['order_sequence_id']);
        div_cod_area_desc_3 = $1("div_cod_area_desc_3_" + m_data_source['order_sequence_id']);
        div_cod_area_desc_5 = $1("div_cod_area_desc_5_" + m_data_source['order_sequence_id']);
        div_cod_area_desc_7 = $1("div_cod_area_desc_7_" + m_data_source['order_sequence_id']);
        div_cod_area_desc_13 = $1("div_cod_area_desc_13_" + m_data_source['order_sequence_id']);
		div_cod_area_desc_18 = $1("div_cod_area_desc_18_" + m_data_source['order_sequence_id']);
        div_cod_area_desc_19 = $1("div_cod_area_desc_19_" + m_data_source['order_sequence_id']);
        div_pick_up = $1("div_pick_up_" + m_data_source['order_sequence_id']);
        sel_ship_time_1 = $1("sel_ship_time_1_" + m_data_source['order_sequence_id']);
        sel_ship_time_12 = $1("sel_ship_time_12_" + m_data_source['order_sequence_id']);

        // tj 2013-10-24
        div_cod_area_desc_16 = $1("div_cod_area_desc_16_" + m_data_source['order_sequence_id']);
    };
    var div_col2_item_1_change = function() {
	if (span_shipment_save_tips) {
	    span_shipment_save_tips.innerHTML = '';
	}
	if (sel_ship_time_1 && DeliveryDateType) {
	    for ( var key in DeliveryDateType) {
		if (key == sel_ship_time_1.value) {
		    $(div_col2_item_1).children("span").html(DeliveryDateType[key]);
		}
	    }
	}
    }
    var show_ship_arrive_date = function () {

        div_col2_item_1 = $1("div_col2_item_1_0_0");
        div_col2_item_2 = $1("div_col2_item_2_0_0");
        div_col2_item_3 = $1("div_col2_item_3_0_0");
        div_col2_item_4 = $1("div_col2_item_4_0_0");
        div_col2_item_5 = $1("div_col2_item_5_0_0");
        div_col2_item_6 = $1("div_col2_item_6_0_0");
        div_col2_item_7 = $1("div_col2_item_7_0_0");
        div_col2_item_8 = $1("div_col2_item_8_0_0");
        div_col2_item_11 = $1("div_col2_item_11_0_0");
        div_col2_item_12 = $1("div_col2_item_12_0_0");
        div_col2_item_13 = $1("div_col2_item_13_0_0");
        div_col2_item_15 = $1("div_col2_item_15_0_0");
        // tj 2013-10-24 add
        div_col2_item_16 = $1("div_col2_item_16_0_0");
        if (m_data_source["order_sequence_id"] == "0_0") {
            div_col2_item_17 = $1("div_col2_item_17_0_0");
        } else {
            div_col2_item_17 = $1("div_col2_item_17_0_70");
        }
		div_col2_item_18 = $1("div_col2_item_18_0_0");
        div_col2_item_19 = $1("div_col2_item_19_0_70");



        if (div_col2_item_1 != null) {
            div_col2_item_1.className = 'col2';
            div_col2_item_1_change();
	    sel_ship_time_1.onchange = div_col2_item_1_change;
        }
        if (div_col2_item_2 != null) {
            div_col2_item_2.className = 'col2';
        }
        if (div_col2_item_3 != null) {
            div_col2_item_3.className = 'col2';
        }
        if (div_col2_item_4 != null) {
            div_col2_item_4.className = 'col2';
        }
        if (div_col2_item_5 != null) {
            div_col2_item_5.className = 'col2';
        }
        if (div_col2_item_6 != null) {
            div_col2_item_6.className = 'col2';
        }
        if (div_col2_item_7 != null) {
            div_col2_item_7.className = 'col2';
        }
        if (div_col2_item_8 != null) {
            div_col2_item_8.className = 'col2';
        }
        if (div_col2_item_11 != null) {
            div_col2_item_11.className = 'col2';
        }
        if (div_col2_item_12 != null) {
            div_col2_item_12.className = 'col2';
        }
        if (div_col2_item_13 != null) {
            div_col2_item_13.className = 'col2';
        }
        if (div_col2_item_15 != null) {
            div_col2_item_15.className = 'col2';
        }
        // tj 2013-10-24 add
        if (div_col2_item_16 != null) {
            div_col2_item_16.className = 'col2';
        }
        if (div_col2_item_17 != null) {
            div_col2_item_17.className = 'col2';
        }
		if (div_col2_item_18 != null) {
            div_col2_item_18.className = 'col2';
        }
        if (div_col2_item_19 != null) {
            div_col2_item_19.className = 'col2';
        }

        div_col3_item_1 = $1("div_col3_item_1_0_0");
        div_col3_item_2 = $1("div_col3_item_2_0_0");
        div_col3_item_3 = $1("div_col3_item_3_0_0");
        div_col3_item_4 = $1("div_col3_item_4_0_0");
        div_col3_item_5 = $1("div_col3_item_5_0_0");
        div_col3_item_6 = $1("div_col3_item_6_0_0");
        div_col3_item_7 = $1("div_col3_item_7_0_0");
        div_col3_item_8 = $1("div_col3_item_8_0_0");
        div_col3_item_11 = $1("div_col3_item_11_0_0");
        div_col3_item_12 = $1("div_col3_item_12_0_0");
        div_col3_item_13 = $1("div_col3_item_13_0_0");
        div_col3_item_15 = $1("div_col3_item_15_0_0");
        // tj 2013-10-31 add
        div_col3_item_16 = $1("div_col3_item_16_0_0");
        if (m_data_source["order_sequence_id"] == "0_0") {
            div_col3_item_17 = $1("div_col3_item_17_0_0");
        } else {
            div_col3_item_17 = $1("div_col3_item_17_0_70");
        }
		div_col3_item_18 = $1("div_col3_item_18_0_0");
        div_col3_item_19 = $1("div_col3_item_19_0_70");

        if (div_col3_item_1 != null) {
            div_col3_item_1.className = 'col3';
        }
        if (div_col3_item_2 != null) {
            div_col3_item_2.className = 'col3';
        }
        if (div_col3_item_3 != null) {
            div_col3_item_3.className = 'col3';
        }
        if (div_col3_item_4 != null) {
            div_col3_item_4.className = 'col3';
        }
        if (div_col3_item_5 != null) {
            div_col3_item_5.className = 'col3';
        }
        if (div_col3_item_6 != null) {
            div_col3_item_6.className = 'col3';
        }
        if (div_col3_item_7 != null) {
            div_col3_item_7.className = 'col3';
        }
        if (div_col3_item_8 != null) {
            div_col3_item_8.className = 'col3';
        }
        if (div_col3_item_11 != null) {
            div_col3_item_11.className = 'col3';
        }
        if (div_col3_item_12 != null) {
            div_col3_item_12.className = 'col3';
        }
        if (div_col3_item_13 != null) {
            div_col3_item_13.className = 'col3';
        }
        if (div_col3_item_15 != null) {
            div_col3_item_15.className = 'col3';
        }
        // tj 2013-10-31 add
        if (div_col3_item_16 != null) {
            div_col3_item_16.className = 'col3';
        }
        if (div_col3_item_17 != null) {
            div_col3_item_17.className = 'col3';
        }
		if (div_col3_item_18 != null) {
            div_col3_item_18.className = 'col3';
        }
        if (div_col3_item_19 != null) {
            div_col3_item_19.className = 'col3';
        }
    };
    this.setDataSource = function (data_source) {
        m_data_source = data_source;
        m_shipment_panel.DataSource = data_source;
		if(m_data_source['expected_delivery_time_start'] == null || m_data_source['expected_delivery_time_end'] == null){
			m_data_source['expected_delivery_time_start'] = "";
			m_data_source['expected_delivery_time_end'] = "";
		}
        set_shipment_template();
    };

    this.getShipDateTypeName = function (ShipDateType) {
        return ship_date_type_enum[ShipDateType] || '';
    };

    this.isEditStatus = function () {
        return m_show_status == 1;
    };

    this.setShipmentSave = function (shipment_save) {
        m_shipment_save = shipment_save;
    };

    this.setShipmentClose = function (shipment_close) {
        m_shipment_close = shipment_close;
    };

    this.setShipmentSync = function (shipment_sync) {
        m_shipment_sync = shipment_sync;
    };
    this.setPackingTypeChanged = function (packing_type_changed) {
        m_packing_type_changed = packing_type_changed;
    };

    this.setCityShipTypeDesc = function (city_ship_type_desc) {
        if (span_city_ship_type_desc) {
            if (city_ship_type_desc && (m_data_source['is_show_shipment_festiva_tip'] == 0 || (m_data_source['is_show_shipment_festiva_tip'] == 1 && m_data_source['ship_type'] == 1))) {
                span_city_ship_type_desc.attr("class", "color-orange");
                span_city_ship_type_desc.html(city_ship_type_desc);
            } else {
                span_city_ship_type_desc.attr("class", "hide");
            }
        }

        if (div_city_ship_type_desc && m_data_source['is_show_shipment_festiva_tip'] == 1) {
            if (city_ship_type_desc && m_data_source['ship_type'] == 1) {
                div_city_ship_type_desc.className = 'color-orange';
                div_city_ship_type_desc.innerHTML = city_ship_type_desc;
            } else {
                div_city_ship_type_desc.className = 'hide';
            }
        }
    };

    var showFirstLevel = function () {
        if ($('#shipmentList>div.item-list').length == 1) {
            $('#shipmentCollapse').click();
        }
    }

    
    this.showReadOnly = function () {
		if(m_data_source['ship_type_name'] == ''|| m_data_source['ship_type_name'] == null) {
			this.showEditable();
            return;
		}
		
        if ($('#shipmentCollapse').text() == "") {
            $('#shipmentCollapse').text("收起");
        }
	
        m_show_status = 0;

        if (m_data_source['order_type'] == 98 || (m_data_source['order_type'] == 97 && m_data_source['order_products_type'] == 98) || m_data_source['order_type'] == 101 || m_data_source['order_type'] == 971) {
            m_shipment_panel.Template = SHIPMENT_EBOOK_READONLY_TEMPLATE;
            m_shipment_panel.DataBind();
            showFirstLevel();
            return;
        }
        if (m_data_source['order_type'] == 50) {
            m_shipment_panel.Template = SHIPMENT_VDDMONEY_READONLY_TEMPLATE;
            m_shipment_panel.DataBind();
            showFirstLevel();
            return;
        }
        
        if (m_data_source['ship_type'] == 11) {
        	m_shipment_panel.Template = PICKUP_READONLY_TEMPLATE;
        } else {
        	m_shipment_panel.Template = SHIPMENT_READONLY_TEMPLATE;
        }
        var ship_date_name = ship_date_type_enum[m_data_source['ship_date_type']];
        if (m_data_source['ship_type'] == 18) {//预约送货
		if(m_data_source['expected_delivery_time_start'] != null && m_data_source['expected_delivery_time_end'] != null){
            ship_date_name = m_data_source['expected_delivery_time_start'].replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/, "$2月$3日 $4:$5")
                + m_data_source['expected_delivery_time_end'].replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/, "-$4:$5 送达");
			}
        }
        if (ship_date_name) {
            m_data_source['ship_date_name'] = ship_date_name.toString().trim();
        }
        var packing_type_name = m_data_source['packing_type_name'];
        if (m_data_source.is_surpport_share_package) {
            var pack_type_choice = +getPackingTypeFromDataSource(m_data_source);
            if (pack_type_choice == 1) {
                packing_type_name = '分包裹发货';
            } else if (pack_type_choice == 2) {
                packing_type_name = '合包裹发货';
            }
        }
        if (m_data_source["order_products_type"] == 80 && m_data_source["shop_id"] == 0) {
            m_data_source["ship_type_name"] = "合约机配送";
        }
        m_data_source['shipping_fee'] = formatFloat(m_data_source['shipping_fee']);
        m_shipment_panel.DataBind();
        showFirstLevel();
        init_control();
        div_shipnment.className = 'item-list';

        if (!ship_date_name) {
            $H('div_ship_date_' + m_data_source['order_sequence_id']);
        }
        //wzb没有分合包or自提隐藏span元素 
        if (!packing_type_name) {
            $1('span_packing_type_name_' + m_data_source['order_sequence_id']).className = 'hide';
        }
        //wzb没有分合包or自提隐藏span元素 
        if (!m_data_source['pick_up_name']) {
            $1('span_pick_up_name_' + m_data_source['order_sequence_id']).className = 'hide';
        }
        // tj 2013-10-24 add 如果是慢递送货方式则隐藏掉
        if (m_data_source['ship_type'] == 16) {
            $H('div_ship_date_' + m_data_source['order_sequence_id']);
        }

        var city_ship_type_desc = m_data_source['city_ship_type_desc'];
        if (city_ship_type_desc && (m_data_source['is_show_shipment_festiva_tip'] == 0 || (m_data_source['is_show_shipment_festiva_tip'] == 1 && m_data_source['ship_type'] == 1))) {
            span_city_ship_type_desc.className = 'color-orange';
        } else {
            span_city_ship_type_desc.className = 'hide';
        }

        btn_shipment_edit.onclick = this.showEditable;

        if (m_data_source['ship_type'] == 11 && m_data_source['is_show_pick_up_limit'] == 1) {
            btn_shipment_edit.click();
        }

        //if ((m_data_source.is_surpport_share_package && +getPackingTypeFromDataSource(m_data_source) === 0) || (m_data_source.addr_id == 0 && !m_data_source.is_submit_packing_type)) {
        //    this.showEditable();
        //}
    };
    
    /*var TOGETHER_SEND_ITEMTEMPLATE='<p id="together_send_id" class="listcon">'
    	+'<input id="together_send_checkbox" name="together_send_checkbox" type="checkbox" value="" class="mr-5" style="vertical-align: text-bottom">'
    	+'不同订单合并一起发货（<a href="http://help.dangdang.com/details/page2" target="_blank">为什么？</a>）'
        +"</p>";*/

    this.showEditable = function () {
        $('#shipmentList>p.listcon').remove();
        $('#shipmentList>h4').show();
        $('#shipmentList>div.item-list').show();
        $('#shipmentCollapse').text('');
        
        m_show_status = 1;
        m_ship_date_type = m_data_source['ship_date_type'];
        m_ship_type = m_data_source['ship_type'];
        m_shipment_panel.Template = SHIPMENT_EDITABLE_TEMPLATE;
        m_shipment_panel.DataBind();

        init_control();
        //div_shipnment.className = '';

        //特殊节日自营订单给出送货提示
        if (m_data_source['shop_id'] == 0 && isShowShipmentFestiveTip) {
            var spanObj = $1("shipment_festive_tip_" + m_data_source['order_sequence_id']);
            if (spanObj) {
                spanObj.style.display = "";
            }
        }


        var city_ship_type_desc = m_data_source['city_ship_type_desc'];
        if (m_data_source['is_show_shipment_festiva_tip'] == 1) {
            if (m_ship_type == 1 && city_ship_type_desc) {
                div_city_ship_type_desc.className = 'color-orange';
            } else {
                div_city_ship_type_desc.className = 'hide';
            }
        }

        city_is_to_door = m_data_source['city_is_to_door'];
        is_need_valid_zip = m_data_source['is_need_valid_zip'];
        is_show_map_api = m_data_source['is_show_map_api'];
        city_is_night_send = m_data_source['city_is_night_send'];
        m_city_id = m_data_source['city_id'];
        m_province_name = m_data_source['province_name'];
        m_city_name = m_data_source['province_name'];
        m_town_id = m_data_source['town_id'];
        m_quarter_id = m_data_source['quarter_id'];

        pick_up_town_id = m_data_source['pick_up_town_id'];
        pick_up_id = m_data_source['pick_up_id'];
        if (pick_up_town_id == null || pick_up_town_id == 0 || (current_ship_address != m_data_source["ship_address"] && current_ship_address != null)) {
            // 如果走到这步，说明是第一次或者更改了地址
            isFirstPickUpOrChangeConsignee = true;
            pick_up_town_id = m_town_id;
            pick_up_quarter_id = m_quarter_id;
            pickup_page_index = 1;
            current_pick_up_id = 0;
            input_pick_up_address = null;
            current_ship_address = m_data_source["ship_address"];
        }
        btn_shipment_save.onclick = btn_shipment_save_click;
        updateShipTypes();
        updatePackingType(m_data_source);
    };

    this.setHignLight = function () {
        btn_shipment_save.className = 'btn btn-large-orange';
        div_shipment_tips.className = 'item-ship';
    };

    this.setDisabled = function () {
        $disabled('btn_shipment_save_' + m_data_source['order_sequence_id']);
        $wait('btn_shipment_save_' + m_data_source['order_sequence_id']);
    };

    this.setEnabled = function () {
        $enabled('btn_shipment_save_' + m_data_source['order_sequence_id']);
        $1('btn_shipment_save_' + m_data_source['order_sequence_id']).style.cursor = 'pointer';
    };
    this.setShipmentSaveConfig = function (config_tips) {
        span_shipment_save_tips.innerHTML = SHIPMENT_ICON_WARN + config_tips;
        span_shipment_save_tips.className = 'help-inline help-inline-error help-inline-large';
    };

    this.setSubmitConflictTips = function () {
        if (!ship_type_check()) return;
    };
    // tj 2013-08-30 add
    var ddlPickupQuarter_SelectedIndexChanged = function () {
        var quarter_id = ddl_pick_up_quarter.getValue();
        pick_up_quarter_id = quarter_id;
        current_pick_up_id = 0;
        pickup_page_index = 1;
    };
    var ddlPickupTown_SelectedIndexChanged = function () {
        var town_id = ddl_pick_up_town.getValue();
        current_pick_up_id = 0;
        pickup_page_index = 1;
        if (town_id != 0) {
            pick_up_quarter_id = 0;
            isChangePickUpTownDropDownList = true;
            bindQuarterDdlControl(town_id);
        } else {
            pick_up_quarter_id = 0;
            $H("pick_up_quarter");
        }
        pick_up_town_id = town_id;
    };

    var bindDdlControl = function (city_id) {

        if (div_pick_up != null) {
            div_pick_up.className = 'col1To3';
        }

        if (city_id == 0) {
            ddl_pick_up_town.DataSource = [{ 'name': '--------', 'id': '0' }];
            ddl_pick_up_town.DataBind();
            return;
        }

        var cache_result = pick_up_town_cache[city_id]; //全局自提点下拉框四级城市缓存变量
        if (cache_result != null) {
            pick_up_ajax_succeed(city_id, cache_result, false);
            return;
        }

        pick_up_town_list_ajax.OnSucceed(
            function (result) {
                pick_up_ajax_succeed(city_id, result, true);
            }
        );

        pick_up_town_list_ajax.OnTimeout(
            function () {
                pick_up_town_list_ajax.Abort();
            }
        );
        var date = new Hashtable();
        //date["request_type"] = "regions";
        date["city_id"] = city_id;
        //date["town_id"] = 0;
        pick_up_town_list_ajax.invokeServer(date, 'POST', false);
    };
    var quarter_pick_up_ajax_succeed = function (town_id, result, is_refresh) {

        if (result["regions"] != null && result["regions"].length > 0) {
            isExistsQuarterPickUp = true;

            $1("pick_up_quarter").style.display = "";
            if (is_refresh) {
                if (town_id != -1) {
                    result['regions'].unshift({ 'name': '请选择', 'id': '0' });
                }

                pick_up_quarter_cache[town_id] = result;
            }
            ddl_pick_up_quarter.DataSource = result['regions'];
            ddl_pick_up_quarter.DataBind();
            if (pick_up_quarter_id <= 0 && pick_up_id) {
                //刷新的时候走这个,发送请求获取数据获取 pick_up_quarter_id
                pick_up_site_ajax.OnSucceed(function (result) {
                    if (result != null && result['error_code'] == 0 && result["pick_up_site_detail"][0]["quarter_id"]) {
                        pick_up_quarter_id = result["pick_up_site_detail"][0]["quarter_id"];

                        if (pick_up_quarter_id && pick_up_quarter_id > 0) {
                            ddl_pick_up_quarter.setValue(pick_up_quarter_id);

                            if (isChangePickUpTownDropDownList) {
                                ddl_pick_up_quarter.setValue(0);
                            } else {
                                showQuarterPickUpTipsInfo(pick_up_quarter_id, 1);
                            }
                            isChangePickUpTownDropDownList = false;
                        }
                    }
                });

                pick_up_site_ajax.OnTimeout(function () { pick_up_site_ajax.Abort(); });
                pick_up_site_ajax.invokeServer('pickup_site_id=' + pick_up_id, 'POST', false);
            } else {
                ddl_pick_up_quarter.setValue(pick_up_quarter_id);

                if (isChangePickUpTownDropDownList) {
                    ddl_pick_up_quarter.setValue(0);
                }

                isChangePickUpTownDropDownList = false;
            }

        } else {
            isExistsQuarterPickUp = false;
            $H("pick_up_quarter");
            ddl_pick_up_quarter.setValue(0);
        }
    };

    var pick_up_ajax_succeed = function (city_id, result, is_refresh) {
        if (result != null && result['error_code'] == 0) {
            if (is_refresh && result["regions"].length > 0) {
                if (city_id != -1) {
                    result['regions'].unshift({ 'name': '请选择', 'id': '0' });
                }

                pick_up_town_cache[city_id] = result;
            }
            ddl_pick_up_town.DataSource = result['regions'];
            ddl_pick_up_town.DataBind();

            if (pick_up_town_id > 0) {
                ddl_pick_up_town.setValue(pick_up_town_id);
                if (ddl_pick_up_town.getValue() <= 0) {
                    ddl_pick_up_town.setValue(0);
                }

                bindQuarterDdlControl(pick_up_town_id);
            }
        }
    };

    // tj 2013-08-30 add 绑定五级自提点下拉控件

    function bindQuarterDdlControl(town_id) {
        var cache_result = pick_up_quarter_cache[town_id];
        if (cache_result != null) {
            quarter_pick_up_ajax_succeed(town_id, cache_result, false);
            return;
        }

        pick_up_quarter_list_ajax.OnSucceed(function (result) { quarter_pick_up_ajax_succeed(town_id, result, true); });

        pick_up_quarter_list_ajax.OnTimeout(function () { pick_up_quarter_list_ajax.Abort(); });
        var date = new Hashtable();
        //date["request_type"] = "regions";
        //date["city_id"] = 0;
        date["town_id"] = town_id;
        pick_up_quarter_list_ajax.invokeServer(date, 'POST', false);
    }

    function updateShipTypes() {
        var shipment_ajax = new Ajax('/shipment/get');

        var ship_type_data = new Hashtable();
        ship_type_data['city_id'] = (m_data_source['order_sequence_id'] == "0_0" || m_data_source['order_sequence_id'] == "0_51" || m_data_source['order_sequence_id'] == "0_70" || m_data_source['order_sequence_id'] == "0_97") ? m_data_source['quarter_id'] : m_data_source['town_id'];
        //ship_type_data['town_id'] = m_data_source['town_id']; // 用于配送时效
        //ship_type_data['city_is_night_send'] = m_data_source['city_is_night_send'] == true ? 1 : 0;
        //ship_type_data['shop_id'] = m_data_source['shop_id'];
        //ship_type_data['order_items_type'] = m_data_source['order_items_type'];
        //ship_type_data['is_local_arrive'] = m_data_source['is_local_arrive'];
        //ship_type_data['is_surport_ems'] = m_data_source['is_surport_ems'];
        //ship_type_data['is_product_post_disabled'] = m_data_source['is_product_post_disabled'] == true ? 1 : 0;
        //ship_type_data['is_product_ems_disabled'] = m_data_source['is_product_ems_disabled'] == true ? 1 : 0;
        ship_type_data['orderSeqId'] = m_data_source['order_sequence_id'];
        //ship_type_data['order_type'] = m_data_source['order_type'];
        //ship_type_data['packing_type'] = m_data_source['packing_type'];
        //ship_type_data['is_fdc_order'] = m_data_source['is_fdc_order'];
        shipment_ajax.OnSucceed(onShipTypesAjaxSuccess);

        shipment_ajax.invokeServer(ship_type_data, 'POST', true);
    }

    function show_shipping_fee(order) {
        var shipping_fee_show_elements = user_defined_getElementsByName("span", "div_col6_item_" + order["order_sequence_id"]);
        if (shipping_fee_show_elements != null && shipping_fee_show_elements.length > 0) {
            var len = shipping_fee_show_elements.length;
            for (var i = 0; i < len; i++) {
                if (shipping_fee_show_elements[i] == null) continue;
                shipping_fee_show_elements[i].innerHTML = "-------";
            }
            var show_message = "";
            if (parseFloat(order['order_shipping_fee']) == 0) {
                show_message = "免运费";
            } else {
                show_message = "&yen;" + formatFloat(order['order_shipping_fee']);
            }
            var current_show_shipping_fee_element = $1('div_col6_item_' + order["ship_type"] + '_' + order["order_sequence_id"]);
            if (current_show_shipping_fee_element) {
                current_show_shipping_fee_element.innerHTML = show_message;
            }
        }
    }

    function user_defined_getElementsByName(tag, name) {
        var returns = new Array();
        var elements = document.getElementsByTagName(tag);
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].getAttribute("name") == name) {
                returns.push(elements[i]);
            }
        }
        return returns;
    }

    function onShipTypesAjaxSuccess(result) {
        if (result != null && result['ship_types']!=null && result['ship_types'].length>0 && result['error_code'] == 0) {
        	//不同订单合并一起发货
        	togetherSend.showCheckBox();
            togetherSend.bindtogetherSend(result);
        	
        	var is_have_pick_up = false;
        	rd_shipinfo.DataSource = result['ship_types'];
        	for (var i = 0; i < result['ship_types'].length;i++)
        	{
        	    if(result['ship_types'][i]['ship_type']==1) {
        	        DeliveryDateType = result['ship_types'][i]['delivery_date_type'];
        	        break;
        	    }
        	}
            rd_shipinfo.setOnSelectedIndexChanged(rd_shipinfo_selectedindexchanged);

            rd_shipinfo.OnItemDataBinding = function (dataItem, obj_tpl) {
                dataItem['mapapicss'] = 'hide';
                if (dataItem['ship_type'] == m_ship_type) {
                    if (dataItem["tag"] == 'disabled') {
                        m_ship_type = 0;
                    }
                }
                if (dataItem['shipping_fee_explain'] != "" && dataItem['shipping_fee_explain'] != "NULL" && dataItem['shipping_fee_explain'] != null) {
                    dataItem['shipping_fee_explain'] = "（" + dataItem['shipping_fee_explain'] + "）";
                }else{
					dataItem['shipping_fee_explain'] = "";
				}

				if(dataItem['ship_type_desc'] == "NULL" || dataItem['ship_type_desc'] == null){
					dataItem['ship_type_desc'] = "";
				}
				
                if (dataItem['ship_type'] == 1) {
                    dataItem['shipping_fee_explain'] = "";
                    ship_arrive_date_1 = dataItem['ship_arrive_date'];
                    ship_type_desc_1 = dataItem['ship_type_desc'];
                }

                if (dataItem['ship_type'] == 3) {
                    dataItem['shipping_fee_explain'] = "";
                }

                if (dataItem['cod_desc'] != "" && dataItem['cod_desc'] != "NULL" && dataItem['cod_desc'] != null) {
                    dataItem['cod_desc'] = "（" + dataItem['cod_desc'] + "）";
                }
                if (dataItem['ship_type'] == 1 && m_data_source['order_products_type'] == 80 && m_data_source['shop_id'] == 0) {
                    if (dataItem['cod_area_desc'] == "全境配送") {
                        obj_tpl.ItemTemplate = RD_SHIPINFO_SHIPTYPE;
                    } else {
                        obj_tpl.ItemTemplate = RD_SHIPINFO_COD;
                    }
                    dataItem['type_name'] = "合约机配送";
                } else if (dataItem['ship_type'] == 1 || dataItem['ship_type'] == 12) {
                    if (m_data_source['shop_id'] > 0 || dataItem['cod_area_desc'] == "全境配送") {
                        obj_tpl.ItemTemplate = RD_SHIPINFO_SHIPTYPE;
                    } else {
                        obj_tpl.ItemTemplate = RD_SHIPINFO_COD;
                    }
                } else if (dataItem['ship_type'] == 19) {
                    if (m_data_source['shop_id'] > 0 || dataItem['cod_area_desc'] == "全境配送") {
                        obj_tpl.ItemTemplate = RD_SHIPINFO_LARGEELECTRONICS;
                        dataItem['ship_arrive_date'] = "-------";
                    } else {
                        obj_tpl.ItemTemplate = RD_SHIPINFO_LARGEELECTRONICS_COD;
                        dataItem['ship_arrive_date'] = "-------";
                    }

                } else if (dataItem['ship_type'] == 11) {
                    if (m_data_source['is_show_pick_up_limit'] == 1) {
                        dataItem['pick_up_disabled'] = "disabled='disabled'";
                        dataItem['type_name'] = dataItem['type_name'] + "(" + m_data_source['pick_up_limit_tips'] + ")";
                        dataItem['ship_arrive_date'] = "-------";
                        dataItem['ship_type_desc'] = "-------";
                        dataItem['shipping_fee_explain'] = "";
                        dataItem['color_type'] = "color-grey";
                        if (m_ship_type == 11) {
                            m_ship_type = 0;
                        }
                    }
                    else if (dataItem["tag"] == 'disabled') {
                        dataItem['pick_up_disabled'] = "disabled='disabled'";
                        dataItem['type_name'] = dataItem['type_name'];
                        dataItem['ship_arrive_date'] = "-------";
                        dataItem['ship_type_desc'] = "-------";
                        dataItem['shipping_fee_explain'] = "";
                        dataItem['color_type'] = "color-grey";
                        if (m_ship_type == 11) {
                            m_ship_type = 0;
                        }
                    }
                    is_have_pick_up = true;
                    obj_tpl.ItemTemplate = RD_SHIPINFO_PICK_UP;
                    if (is_show_map_api == 1) {
                        dataItem['mapapicss'] = '';
                    }
                } else if (dataItem['ship_type'] == 3) {
                    obj_tpl.ItemTemplate = RD_SHIPINFO_POST;
                } else if (dataItem['ship_type'] == 17) {
                    obj_tpl.ItemTemplate = RD_SHIPINFO_UPS;
                } else if (dataItem['ship_type'] == 13) {
                    if (m_data_source['shop_id'] > 0 || dataItem['cod_area_desc'] == "全境配送") {
                        obj_tpl.ItemTemplate = RD_SHIPINFO_ITEMTEMPLATE;
                    } else {
                        obj_tpl.ItemTemplate = RD_SHIPINFO_NIGHT_COD;
                    }
                    dataItem['type_name'] = "普通快递晚间送货上门 19:00-22:00";
                    dataItem['ship_type_desc'] = ship_type_desc_1 == null ? "-------" : ship_type_desc_1;
                    dataItem['shipping_fee_explain'] = "";
                }
                    // tj 2013-10-24 add
                else if (dataItem['ship_type'] == 16) {
                    if (dataItem["tag"] == 'disabled' && m_ship_type == 16) {
                        m_ship_type = 0;
                    }
                    if (m_data_source['shop_id'] > 0 || dataItem['cod_area_desc'] == "全境配送") {
                        obj_tpl.ItemTemplate = RD_SHIPINFO_ITEMTEMPLATE;
                        dataItem['cod_desc'] = "";
                    } else {
                        obj_tpl.ItemTemplate = RD_SHIPINFO_ECONOMICAL_EXPRESS;
                    }
                    //dataItem['type_name'] += "（订单完成后赠送5元全场通用优惠券）";
                    //dataItem['ship_arrive_date'] = ship_arrive_date_1 == null ? "-------" : ship_arrive_date_1;
                    dataItem['ship_type_desc'] = ship_type_desc_1 == null ? "-------" : ship_type_desc_1;
                    dataItem['shipping_fee_explain'] = "";
                } else if (dataItem['ship_type'] == 7) {
                    if (dataItem["tag"] == 'disabled' && m_ship_type == 7) {
                        m_ship_type = 0;
                    }
                    if (m_data_source['shop_id'] > 0 || dataItem['cod_area_desc'] == "全境配送") {
                        obj_tpl.ItemTemplate = RD_SHIPINFO_ITEMTEMPLATE;
                    } else {
                        obj_tpl.ItemTemplate = RD_SHIPINFO_EXPRESS_COD;
                    }
                } else if (dataItem['ship_type'] == 15) {

                    obj_tpl.ItemTemplate = RD_SHIPINFO_ITEMTEMPLATE;

                }
                else if (dataItem['ship_type'] == 18) {//预约送货
                    dataItem['shipping_fee_explain'] = "";
                    if(!dataItem['ship_arrive_last_date']){
                    	dataItem['tag'] = "disabled";
                    }
                    var calendar = dataItem['calendar'];
                    var html = [];
                    html.push("<table width='100%' border='0' cellspacing='0' cellpadding='0'>");
                    html.push("<tbody><tr>");
                    html.push("<th scope='col'><div class='l-120'>&nbsp;</div></th>");
                    var currentDate = new Date(dataItem['current_date']);
                    var lastDate = new Date(dataItem['ship_arrive_last_date']);
                    var dayCount = 7;
                    for (var i = 0; i < dayCount; i++) {
                        if (i == 0) {
                            dataItem['default_reserve_date'] = DateFormat(lastDate, "W MM月dd日", currentDate);
                        }
                        html.push("<th scope='col'><span>" + DateFormat(lastDate, "W", currentDate) + "</span>" + DateFormat(lastDate, "MM.dd") + "</th>");
                        lastDate = new Date(lastDate.valueOf() + 1 * 24 * 60 * 60 * 1000);//加一天
                    }
                    html.push("</tr>");
					if(calendar['times'] == null){
						calendar['times'] = [];
					}
                    for (var i = 0; i < calendar['times'].length; i++) {
                        var timesString = calendar['times'][i]['name'] + " " + calendar['times'][i]['start_time'] + "-" + calendar['times'][i]['end_time'];
                        html.push("<tr>");
                        html.push("<td><div class='l-120'>" + timesString + "</div></td>");
                        lastDate = new Date(dataItem['ship_arrive_last_date']);
                        for (var j = 0; j < dayCount; j++) {
                            if (j == 0 && i != calendar['times'].length - 1) { //第一天&&除去最后一个时间段
                                html.push("<td><a class='unable'>&nbsp;</a></td>");
                            } else {
                                html.push("<td><a ");
                                if (i == calendar['times'].length - 1 && j == 0) {
                                    html.push(" id='default_reserve_date_" + m_data_source['order_sequence_id'] + "' ");
                                }
                                html.push(" href='javascript:for_99click();' decs='" + DateFormat(lastDate, "W MM月dd日", currentDate) + " " + timesString + "'");
                                html.push("day='" + DateFormat(lastDate, "yyyy-MM-dd") + "' timesname='" + calendar['times'][i]['name'] + "' starttime='" + calendar['times'][i]['start_time'] + "' endtime='" + calendar['times'][i]['end_time'] + "'>&nbsp;</a></td>");
                            }
                            lastDate = new Date(lastDate.valueOf() + 1 * 24 * 60 * 60 * 1000);//加一天
                        }
                        html.push("</tr>");
                    }
                    html.push("</tbody></table>");
                    dataItem['calendar_table'] = html.join("");
                    dataItem['ship_arrive_date'] = "-------";
                    if (dataItem['tag'] == '' || dataItem['tag'] == null || dataItem['tag'] == "NULL")
                        obj_tpl.ItemTemplate = RD_SHIPINFO_RESERVE;
                }
                else {
                    if (m_data_source['shop_id'] > 0 || dataItem['cod_area_desc'] == "全境配送") {
                        obj_tpl.ItemTemplate = RD_SHIPINFO_ITEMTEMPLATE;
                    } else {
                        obj_tpl.ItemTemplate = RD_SHIPINFO_EXPRESS_COD;
                    }
                }

                dataItem['shipping_fee'] = formatFloat(dataItem['shipping_fee']);

                //不支持的送货方式置灰
                var is_support = dataItem['tag'];
                if (is_support == "disabled") {
                    if (dataItem['ship_type'] != 1 && dataItem['ship_type'] != 7 && dataItem['ship_type'] != 16 && dataItem['ship_type'] != 11) {
                        dataItem['type_name'] = dataItem['type_name'] + "(至少有1件商品不支持此送货方式)";
                    }
                    if (dataItem['ship_type'] != 18) {
                        dataItem['ap_input_style'] = "display:none;";
                    }
                    dataItem['cod_desc'] = "";
                    dataItem['ship_arrive_date'] = "-------";
                    dataItem['ship_type_desc'] = "-------";
                    dataItem['shipping_fee_explain'] = "";
                    dataItem['color_type'] = "color-grey";

                }

                //长度过长时截字处理
                if (m_data_source['order_sequence_id'] == "0_0") {
                    dataItem['ship_type_fee_desc'] = cut_str(dataItem['ship_type_desc'] + dataItem['shipping_fee_explain'], 14);
                } else {
                    if (dataItem['ship_type_desc'] == "单品运费描述") {
                        dataItem['ship_type_desc'] = "支持特定商品单独设运费，详情请查看商品详情页";
                        dataItem['ship_type_fee_desc'] = dataItem['ship_type_desc'];
                    } else {
                        dataItem['ship_type_fee_desc'] = cut_str(dataItem['ship_type_desc'] + dataItem['shipping_fee_explain'], 20);
                    }
                }

                //预计送达时间返回为空时，显示"-------"
                if (dataItem['ship_arrive_date'] == '' || dataItem['ship_arrive_date'] == null) {
                    dataItem['ship_arrive_date'] = "-------";
                }
				 //如果订单中包含jit不入库包裹，则预计送达时间显示为“-------”
                if (m_data_source["is_has_no_storage_jit_package"] == 1) {
                    dataItem['ship_arrive_date'] = "-------";
                }
            };
            rd_shipinfo.DataBind();
            init_ship_types_control();
            if (m_ship_type == 0) {
                rd_shipinfo.setFirstValueOnClick('rd_ship_type_' + m_data_source['order_sequence_id']);

            } else {
                rd_shipinfo.setValue(m_ship_type + '', 'rd_' + m_ship_type, 'rd_ship_type_' + m_data_source['order_sequence_id']);
            }

            if (m_ship_type == 1 && sel_ship_time_1 != null) {
                //节日特殊处理,不绑定任何选项
                if (sel_ship_time_1 != null && m_ship_date_type && m_ship_date_type != 0 && m_ship_date_type != 4 && isShowShipmentFestiveTip == false) {
                    sel_ship_time_1.value = m_ship_date_type;
                }
                if (div_cod_area_desc_1 != null) {
                    div_cod_area_desc_1.className = 'col1To2';
                }
            } else {
                if (div_ship_type_cod_1 != null) {
                    div_ship_type_cod_1.className = 'hide';
                }
                if (div_cod_area_desc_1 != null) {
                    div_cod_area_desc_1.className = 'hide';
                }
            }

            if (m_ship_type == 2 && div_ship_type_cod_2 != null) {
                div_ship_type_cod_2.className = '';
            } else if (div_ship_type_cod_2 != null) {
                div_ship_type_cod_2.className = 'hide';
            }

            if (m_ship_type == 3) {
                if (div_ship_type_cod_3 != null) {
                    div_ship_type_cod_3.className = '';
                }
                if (div_cod_area_desc_3 != null) {
                    div_cod_area_desc_3.className = 'col1To2';
                }
            } else {
                if (div_ship_type_cod_3 != null) {
                    div_ship_type_cod_3.className = 'hide';
                }
                if (div_cod_area_desc_3 != null) {
                    div_cod_area_desc_3.className = 'hide';
                }
            }

            if (m_ship_type == 5) {
                if (div_ship_type_cod_5 != null) {
                    div_ship_type_cod_5.className = '';
                }
                if (div_cod_area_desc_5 != null) {
                    div_cod_area_desc_5.className = 'col1To2';
                }
            } else {
                if (div_ship_type_cod_5 != null) {
                    div_ship_type_cod_5.className = 'hide';
                }
                if (div_cod_area_desc_5 != null) {
                    div_cod_area_desc_5.className = 'hide';
                }
            }

            if (m_ship_type == 13) {
                if (div_cod_area_desc_13 != null) {
                    div_cod_area_desc_13.className = 'col1To2';
                }
            } else {
                if (div_cod_area_desc_13 != null) {
                    div_cod_area_desc_13.className = 'hide';
                }
            }

            if (m_ship_type == 16) {
                if (div_cod_area_desc_16 != null) {
                    div_cod_area_desc_16.className = 'col1To2';
                }
            } else {
                if (div_cod_area_desc_16 != null) {
                    div_cod_area_desc_16.className = 'hide';
                }
            }
            if (m_ship_type == 19) {
                if (div_cod_area_desc_19 != null) {
                    div_cod_area_desc_19.className = 'col1To2';
                }
            } else {
                if (div_cod_area_desc_19 != null) {
                    div_cod_area_desc_19.className = 'hide';
                }
            }

            if (m_ship_type == 7 && div_ship_type_cod_7 != null) {
                div_ship_type_cod_7.className = '';
            } else if (div_ship_type_cod_7 != null) {
                div_ship_type_cod_7.className = 'hide';
            }

            if (m_ship_type == 7) {
                if (div_cod_area_desc_7 != null) {
                    div_cod_area_desc_7.className = 'col1To2';
                }
            } else {
                if (div_cod_area_desc_7 != null) {
                    div_cod_area_desc_7.className = 'hide';
                }
            }

            if (m_ship_type == 12 && sel_ship_time_12 != null) {
                if (sel_ship_time_12 != null && m_ship_date_type && m_ship_date_type != 0) {
                    sel_ship_time_12.value = m_ship_date_type;
                }
                if (sel_ship_time_12 != null) {
                    sel_ship_time_12.onchange = function () {
                        span_shipment_save_tips.innerHTML = '';
                    };
                }
            } else if (div_ship_type_cod_12 != null) {
                div_ship_type_cod_12.className = 'hide';
            }

            if (m_ship_type == 11) {
                div_pick_up.className = 'hide';
            }
            //预约送货
            if (m_ship_type == 18) {
                a_curr_reserve_ship = null;
                if ($1("ap_calendar_" + m_data_source['order_sequence_id'])) {
                    var arr = $1("ap_calendar_" + m_data_source['order_sequence_id']).getElementsByTagName("a");
                    var day = m_data_source['expected_delivery_time_start'].replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/, "$1-$2-$3");
                    var starttime = m_data_source['expected_delivery_time_start'].replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/, "$4:$5");
                    var endtime = m_data_source['expected_delivery_time_end'].replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/, "$4:$5");
                    a_curr_reserve_ship = null;
                    for (var i = 0 ; arr && i < arr.length ; i++) {
                        if (arr[i].getAttribute("day") == day && arr[i].getAttribute("starttime") == starttime && arr[i].getAttribute("endtime") == endtime) {
                            a_curr_reserve_ship = arr[i];
                            break;
                        }
                    }
                    if (a_curr_reserve_ship) {
                        $1("hd_time_" + m_data_source['order_sequence_id']).innerHTML = a_curr_reserve_ship.getAttribute("decs");
                    } else {
                        a_curr_reserve_ship = $1("default_reserve_date_" + m_data_source['order_sequence_id']);
                    }
                }

            } else {
                a_curr_reserve_ship = $1("default_reserve_date_" + m_data_source['order_sequence_id']);
            }

            if ($1("ap_calendar_" + m_data_source['order_sequence_id'])) {
                $1("ap_calendar_" + m_data_source['order_sequence_id']).onclick = function (e) {
                    var e = e || window.event;
                    var obj = e.target || e.srcElement;
                    if (!obj.getAttribute("decs")) {
                        return;
                    }
                    if (a_curr_reserve_ship) {
                        a_curr_reserve_ship.className = "";
                    }
                    a_curr_reserve_ship = obj;
                    $1("hd_time_" + m_data_source['order_sequence_id']).innerHTML = obj.getAttribute("decs");
                    $h($1("ap_calendar_" + m_data_source['order_sequence_id']));
                    $h($1("ap_calendar_iframe_" + m_data_source['order_sequence_id']));
                };
            }
            if ($1("ap_input_" + m_data_source['order_sequence_id'])) {
                $1("ap_input_" + m_data_source['order_sequence_id']).onclick = function () {
                    if (a_curr_reserve_ship) {
                        a_curr_reserve_ship.className = "on";
                    }
                    $s($1("ap_calendar_" + m_data_source['order_sequence_id']));
                    $s($1("ap_calendar_iframe_" + m_data_source['order_sequence_id']));
                };
            }
            show_ship_arrive_date();

            show_shipping_fee(m_data_source);
        } else //如果没有该城市对应的发送方式信息，要展开收货人区域
        {
            //alert("请选择正确的收货人城市信息");
            alert("抱歉，该商品暂不能配送至您填写的收货地址。");
            return;
        }
    }

    function rd_shipinfo_selectedindexchanged(rdl_item) {
        m_ship_type = rdl_item.value;

        if (m_ship_type == 1) {
            if (div_ship_type_cod_1 != null) {
                div_ship_type_cod_1.className = '';
                var city_ship_type_desc = m_data_source['city_ship_type_desc'];
                if (m_data_source['is_show_shipment_festiva_tip'] == 1) {
                    if (city_ship_type_desc) {
                        div_city_ship_type_desc.className = 'color-orange';
                    } else {
                        div_city_ship_type_desc.className = 'hide';
                    }
                }
            }
            if (div_cod_area_desc_1 != null) {
                div_cod_area_desc_1.className = 'col1To2';
            }
        } else {
            if (div_ship_type_cod_1 != null) {
                div_ship_type_cod_1.className = 'hide';
            }
            if (div_cod_area_desc_1 != null) {
                div_cod_area_desc_1.className = 'hide';
            }
        }

        if (m_ship_type == 2 && div_ship_type_cod_2 != null) {
            div_ship_type_cod_2.className = '';
        } else if (div_ship_type_cod_2 != null) {
            div_ship_type_cod_2.className = 'hide';
        }

        if (m_ship_type == 3) {
            if (div_ship_type_cod_3 != null) {
                div_ship_type_cod_3.className = '';
            }
            if (div_cod_area_desc_3 != null) {
                div_cod_area_desc_3.className = 'col1To2';
            }
        } else {
            if (div_ship_type_cod_3 != null) {
                div_ship_type_cod_3.className = 'hide';
            }
            if (div_cod_area_desc_3 != null) {
                div_cod_area_desc_3.className = 'hide';
            }
        }

        if (m_ship_type == 5) {
            if (div_ship_type_cod_5 != null) {
                div_ship_type_cod_5.className = '';
            }
            if (div_cod_area_desc_5 != null) {
                div_cod_area_desc_5.className = 'col1To2';
            }
        } else {
            if (div_ship_type_cod_5 != null) {
                div_ship_type_cod_5.className = 'hide';
            }
            if (div_cod_area_desc_5 != null) {
                div_cod_area_desc_5.className = 'hide';
            }
        }

        if (m_ship_type == 13) {
            if (div_cod_area_desc_13 != null) {
                div_cod_area_desc_13.className = 'col1To2';
            }
        } else {
            if (div_cod_area_desc_13 != null) {
                div_cod_area_desc_13.className = 'hide';
            }
        }

        if (m_ship_type == 16) {
            if (div_cod_area_desc_16 != null) {
                div_cod_area_desc_16.className = 'col1To2';
            }
        } else {
            if (div_cod_area_desc_16 != null) {
                div_cod_area_desc_16.className = 'hide';
            }
        }

        if (m_ship_type == 19) {
            if (div_cod_area_desc_19 != null) {
                div_cod_area_desc_19.className = 'col1To2';
            }
        } else {
            if (div_cod_area_desc_19 != null) {
                div_cod_area_desc_19.className = 'hide';
            }
        }

        if (m_ship_type == 7 && div_ship_type_cod_7 != null) {
            div_ship_type_cod_7.className = '';
        } else if (div_ship_type_cod_7 != null) {
            div_ship_type_cod_7.className = 'hide';
        }

        if (m_ship_type == 7) {
            if (div_cod_area_desc_7 != null) {
                div_cod_area_desc_7.className = 'col1To2';
            }
        } else {
            if (div_cod_area_desc_7 != null) {
                div_cod_area_desc_7.className = 'hide';
            }
        }


        if (m_ship_type == 12 && div_ship_type_cod_12 != null) {
            div_ship_type_cod_12.className = '';
        } else if (div_ship_type_cod_12 != null) {
            div_ship_type_cod_12.className = 'hide';
        }

        if (m_ship_type == 11) {
            div_pick_up.className = 'hide';
        }

        span_shipment_save_tips.innerHTML = '';
        if ($1("ap_calendar_" + m_data_source['order_sequence_id'])) {
            $h($1("ap_calendar_" + m_data_source['order_sequence_id']));
            $h($1("ap_calendar_iframe_" + m_data_source['order_sequence_id']));
        }
        if (m_ship_type == 18) {//预约送货

        }
        onShipTypeChanged(m_ship_type);
    }

    var ship_type_check = function () {
        m_ship_type = rd_shipinfo.getValue('rd_ship_type_' + m_data_source['order_sequence_id']);
        if (!m_ship_type) {
            span_shipment_save_tips.innerHTML = SHIPMENT_ICON_WARN + '请为您的订单选择一种送货方式';
            span_shipment_save_tips.className = 'help-inline help-inline-error';
            return false;
        }
        span_shipment_save_tips.innerHTML = '';
        span_shipment_save_tips.className = 'hide';
        return true;
    };

    var btn_shipment_save_click = function () {
        if (!ship_type_check()) return;
        var shipment_data = new Hashtable();
        shipment_data['ship_type'] = m_ship_type;

        if (m_ship_type == 1 || m_ship_type == 12) {
            var ship_date_type = null;
            if (m_ship_type == 1) {
                ship_date_type = sel_ship_time_1.value;
            } else {
                ship_date_type = sel_ship_time_12.value;
            }
            if (ship_date_type == '' || ship_date_type == '请选择') {
                span_shipment_save_tips.innerHTML = SHIPMENT_ICON_WARN + '请选择送货上门时间';
                span_shipment_save_tips.className = 'help-inline help-inline-error';
                return;
            }
            span_shipment_save_tips.innerHTML = '';
            span_shipment_save_tips.className = 'hide';
            shipment_data['ship_date_type'] = ship_date_type;
        } else if (m_ship_type == 13) {
            shipment_data['ship_date_type'] = 4;
        }
            // tj 2013-10-24 add 慢递ship_date_type为时间不限
        else if (m_ship_type == 16) {
            shipment_data['ship_date_type'] = 3;
        }
        else if (m_ship_type == 18) {
            if (!a_curr_reserve_ship) {
                a_curr_reserve_ship = $1("default_reserve_date_" + m_data_source['order_sequence_id']);
            }
            shipment_data['expected_delivery_time_start'] = a_curr_reserve_ship.getAttribute("day") + " " + a_curr_reserve_ship.getAttribute("starttime");
            shipment_data['expected_delivery_time_end'] = a_curr_reserve_ship.getAttribute("day") + " " + a_curr_reserve_ship.getAttribute("endtime");
        } else {
            shipment_data['ship_date_type'] = 0;
        }

        if (m_ship_type == 11) {
            shipment_data['pick_up_town_id'] = pick_up_town_id;
            shipment_data['pick_up_id'] = pick_up_id;
        }

        shipment_data['cur_edit_area'] = 1;
        shipment_data['shop_id'] = m_data_source['shop_id'];
        shipment_data['order_sequence_id'] = m_data_source['order_sequence_id'];
        shipment_data['inherit_status'] = false;

        shipment_data['addr_id'] = m_data_source["addr_id"];
        shipment_data['packing_type'] = getPackingType();
        if (shipment_data['packing_type'] == "0" && m_ship_type == 18 && m_data_source['is_surpport_share_package']) {//预约送货默认为合包
            shipment_data['packing_type'] = "2";
        }
        shipment_data['is_submit_packing_type'] = true;
        shipment_data['order_type'] = m_data_source['order_type'];
        m_shipment_save(shipment_data);
    };

    this.setInherit = function (shipment_data) {
        if (shipment_data['ship_type'] != '') {
            if (m_data_source != null && m_data_source['order_type'] != 98 && m_data_source['order_type'] != 50 && !(m_data_source['order_type'] == 97 && m_data_source['order_products_type'] == 98) && m_show_status == 1 && (m_ship_type == null || m_ship_type == 0)) {
                var inherit_data = new Hashtable();
                inherit_data['ship_type'] = shipment_data['ship_type'];
                inherit_data['ship_date_type'] = shipment_data['ship_date_type'];
                inherit_data['pick_up_town_id'] = shipment_data['pick_up_town_id'];
                inherit_data['pick_up_id'] = shipment_data['pick_up_id'];
                inherit_data['cur_edit_area'] = 1;
                inherit_data['shop_id'] = m_data_source['shop_id'];
                inherit_data['order_sequence_id'] = m_data_source['order_sequence_id'];
                inherit_data['inherit_status'] = true;

                shipment_data['addr_id'] = shipment_data["addr_id"];
                shipment_data['packing_type'] = getPackingTypeFromDataSource(shipment_data);

                m_shipment_save(inherit_data);
            }
        }
    };

    var set_shipment_template = function () {
        isShowShipmentFestiveTip = m_data_source["app_setting"] && (m_data_source["app_setting"]['is_show_shipment_festive_tip'] == true);
        if (isShowShipmentFestiveTip) {
            ship_date_type_enum = { '1': '初七后', '2': '除夕至初七' };
            var sendTypeOptions = "<option>请选择</option>";
            for (key in ship_date_type_enum) {
                sendTypeOptions += "<option value='" + key + "'>" + ship_date_type_enum[key] + "&nbsp;</option>";
            }
            RD_SHIPINFO_SHIPTYPE = "<div class='item'><ul><li><div class='col1'><p><label class='radio {color_type}' for=''><input type='radio' name='rd_ship_type_{order_sequence_id}' id='rd_{ship_type}' value={ship_type} {tag}>{type_name} </label><select class='select-h22' name='name_sel_ship_time_{ship_type}_{order_sequence_id}' id='sel_ship_time_{ship_type}_{order_sequence_id}' {tag}>" + sendTypeOptions + "</select><span>{cod_desc}</span></p></div><div id='div_col2_item_{ship_type}_{order_sequence_id}' class='hide'><span>{ship_arrive_date}</span></div><div class='col6'><span id='div_col6_item_{ship_type}_{order_sequence_id}' name='div_col6_item_{order_sequence_id}'>-------</span></div><div id='div_col3_item_{ship_type}_{order_sequence_id}' class='col4' title='{ship_type_desc}{shipping_fee_explain}'>{ship_type_fee_desc}</div></li></ul></div>";
            RD_SHIPINFO_COD = "<div class='item'><ul><li><div class='col1'><p><label class='radio {color_type}' for=''><input type='radio' name='rd_ship_type_{order_sequence_id}' id='rd_{ship_type}' value={ship_type} {tag}>{type_name} </label><select class='select-h22' name='name_sel_ship_time_{ship_type}_{order_sequence_id}' id='sel_ship_time_{ship_type}_{order_sequence_id}' {tag}>" + sendTypeOptions + "</select><span>{cod_desc}</span></p></div><div id='div_col2_item_{ship_type}_{order_sequence_id}' class='hide'><span>{ship_arrive_date}</span></div><div class='col6'><span id='div_col6_item_{ship_type}_{order_sequence_id}' name='div_col6_item_{order_sequence_id}'>-------</span></div><div id='div_col3_item_{ship_type}_{order_sequence_id}' class='col4' title='{ship_type_desc}{shipping_fee_explain}'>{ship_type_fee_desc}</div><div id='div_cod_area_desc_{ship_type}_{order_sequence_id}' class='hide'><p>请确认收货地址在{city_name}的以下范围内，才可选择此项。</p><p class='p-scope'><span class='span-scope'>送货范围：</span><span class='span-scope-text'>{cod_area_desc}</span></p></div></li></ul></div>";

        }
    };

    var cut_str = function (str, len) {
        var char_length = 0;
        for (var i = 0; i < str.length; i++) {
            var son_str = str.charAt(i);
            encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5;
            if (char_length >= len) {
                var sub_len = char_length == len ? i + 1 : i;
                return str.substr(0, sub_len) + "...";
            }
        }
        return str;
    };

    function updatePackingType(dataSource) {
        var pack_prod = $1("pack_prod_" + dataSource['order_sequence_id']);
        if (!dataSource.is_surpport_share_package && dataSource.shop_id > 0) {
            $h(pack_prod);
        } else {
            var element = $1("packing_type_" + dataSource['order_sequence_id']);
            //        if (dataSource['order_sequence_id'] == "0_0") {
            element.innerHTML = PACKING_TYPE_TEMPLATE;

            // add events
            var radios = element.getElementsByTagName("INPUT"), i;
            for (i = 0; i < radios.length; i++) {
                var radio = radios[i];

                if (radio.type === "radio") {
                    radio.onclick = onPackingTypeChanged;
                }

            }
            // _dis(pack_prod);

            // set packing type value;  如果是礼品包装那么强制合包选项，否则取用户之前选择的 20140528 孟凡威
            var packingType = dataSource.is_valid_product_package ? 2 : getPackingTypeFromDataSource(dataSource);
            setPackingType(packingType);

            // update status
            updatePackingTypeStatus(dataSource);
        }
    }
    function getShipDateType() {
        var temp_ship_date_type = 3; //默认 时间不限
        if (m_ship_type == 1) {
            temp_ship_date_type = sel_ship_time_1.value;
        }
        else if (m_ship_type == 12) {
            temp_ship_date_type = sel_ship_time_12.value;
        }
        else if (m_ship_type == 13) {
            temp_ship_date_type = 4; // 夜间送
        }
        return temp_ship_date_type;
    }
    function onPackingTypeChanged() {
        var packingType = this.value;

        var temp_ship_date_type = getShipDateType();
        checkPackingType(packingType, m_ship_type, temp_ship_date_type, false, function (result) {
            var order = getOrderBySequenceID(result.order_list, m_data_source.order_sequence_id);

            // show package preview dialog after choose split package.
            if (packingType === "1") {
                rd_shipinfo.setDisabledByValue(18, true);
                showPackagePreviewDialog(order);
            } else {
                rd_shipinfo.setDisabledByValue(18, false);
            }

            show_shipping_fee(order);

            // callback order.
            if (m_packing_type_changed != null) {
                m_packing_type_changed(result);
            }
        });
    }

    function onShipTypeChanged() {
        var packingType = getPackingType();

        var temp_ship_date_type = getShipDateType();
        checkPackingType(packingType, m_ship_type, temp_ship_date_type, true, function (result) {
            var order = getOrderBySequenceID(result.order_list, m_data_source.order_sequence_id);
            // update packing type.
            updatePackingTypeStatus(order);

            show_shipping_fee(order);

            // callback order.
            if (m_packing_type_changed != null) {
                m_packing_type_changed(result);
            }
        });
    }
    function checkPackingType(packingType, shipType, shipDateType, async, success) {
        var packing_type_ajax = new Ajax("/shipment/change");
        packing_type_ajax.OnSucceed(function (result) {
            if (success) {
                success(result);
            }
        });

        var post = new Hashtable();
        post["order_sequence_id"] = m_data_source['order_sequence_id'];
        post["packing_type"] = packingType;
        post["ship_type"] = shipType;
        post["ship_date_type"] = shipDateType;
        packing_type_ajax.invokeServer(post, "POST", async);
    }

    function getOrderBySequenceID(orders, orderSequenceID) {
        for (var i = 0; i < orders.length; i++) {
            if (orders[i].order_sequence_id == orderSequenceID) {
                return orders[i];
            }
        }
    }

    function showPackagePreviewDialog(order) {
        var iWidth = 390; //弹出窗口的宽度;
        var iHeight = 370; //弹出窗口的高度;
        var scrolltop = 0;
        var scrollleft = 0;
        var cheight = 0;
        var cwidth = 0;
        if (document.compatMode == "BackCompat") {
            cwidth = document.body.clientWidth;
            cheight = document.body.clientHeight;
            sWidth = document.body.scrollWidth;
            sHeight = document.body.scrollHeight;
            scrollleft = document.body.scrollLeft;
            scrolltop = document.body.scrollTop;
        } else { //document.compatMode == \"CSS1Compat\"
            cwidth = document.documentElement.clientWidth;
            cheight = document.documentElement.clientHeight;
            sWidth = document.documentElement.scrollWidth;
            sHeight = document.documentElement.scrollHeight;
            scrollleft = document.documentElement.scrollLeft == 0 ? document.body.scrollLeft : document.documentElement.scrollLeft;
            scrolltop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
        }
        var left = (cwidth - iWidth) / 2 + scrollleft;
        var top = (cheight - iHeight) / 2 + scrolltop;

        $1("package_preview_dialog").innerHTML = getPackagePreviewDialogHtml(order);

        var dialog = new DivModelDialogMove("package_preview_container", "package_preview_title", "package_preview_close", "div_shield", "", "", false);
        dialog.show(left, top);
        $1("package_preview_ok").onclick = function (cur_dialog) {
            return function () {
                cur_dialog.closeDialog();
            };
        }(dialog);
    }

    function getProductsHtml(products) {
        var builder = new StringBuilder();
        for (var i = 0; i < products.length; i++) {
            var product = products[i];
            builder.appendFormat("<dd>{product_name}</dd>", {
                product_name: nTruncate(product.product_name, 28)
            });
        }
        return builder.toString();
    }

    function getPackagesHtml(packages) {
        var builder = new StringBuilder();
        for (var i = 0; i < packages.length; i++) {
            var package = packages[i];
            builder.appendFormat(PACKAGE_PREVIEW_ITEM, {
                send_time: package.send_time,
                package_shipping_fee: package.package_shipping_fee,
                products: getProductsHtml(package.product_list)
            });
        }
        return builder.toString();
    }

    function getPackagePreviewDialogHtml(order) {
        var builder = new StringBuilder();
        builder.appendFormat(PACKAGE_PREVIEW_DIALOG, {
            packages: getPackagesHtml(order.package_list)
        });
        return builder.toString();
    }

    function setPackingType(packingType) {
        var element = $1("packing_type_" + m_data_source['order_sequence_id']);
        var radios = element.getElementsByTagName("INPUT");
        for (var i = 0; i < radios.length; i++) {
            if (+radios[i].value === +packingType) {
                radios[i].checked = true;
            }
        }
    }

    function getPackingType() {
        var element = $1("packing_type_" + m_data_source['order_sequence_id']);
        var radios = element.getElementsByTagName("INPUT");
        for (var i = 0; i < radios.length; i++) {
            if (!radios[i].disabled && radios[i].checked) {
                return radios[i].value;
            }
        }
        return "0"; // default packing type
    }

    function updatePackingTypeStatus(dataSource) {
        var container = $1("packing_type_" + dataSource.order_sequence_id);
        //如果不支持分合包或者该订单的礼品包装订单或者该订单为预约送货，那么控制置灰不可用 孟凡威 20140528
        var disabled = !dataSource.is_surpport_share_package || dataSource.is_valid_product_package || m_ship_type == 18;
        var radios = container.getElementsByTagName("INPUT");
        var pack_prod = $1("pack_prod_" + dataSource['order_sequence_id']);
        for (var i = 0; i < radios.length; i++) {
            radios[i].disabled = disabled;
        }

        var labels = container.getElementsByTagName("LABEL");
        for (var i = 0; i < labels.length; i++) {
            labels[i].style.color = disabled ? "#b5b5b5" : "";
        }
        if (!dataSource.is_surpport_share_package) {
            $h(pack_prod);
            var radios = container.getElementsByTagName("INPUT");
            for (var i = 0; i < radios.length; i++) {
                $h(radios[i]);
            }
            var labels = container.getElementsByTagName("LABEL");
            for (var i = 0; i < labels.length; i++) {
                $h(labels[i]);
            }
        } else {
            _dis(pack_prod);
            for (var i = 0; i < radios.length; i++) {
                _dis(radios[i]);
            }
            for (var i = 0; i < labels.length; i++) {
                _dis(labels[i]);
            }
        }
    }

    function getPackingTypeFromDataSource(dataSource) {
        return dataSource.cust_choice_package;
    }

    function dataBindPickUpInfo(m_city_id, m_data_source) {
        bindDdlControl(m_city_id);
        if (input_pick_up_address != null && input_pick_up_address.value != "") {
            $1("pick_up_address").value = input_pick_up_address.value;
        } else {
            input_pick_up_address = $1("pick_up_address");
            input_pick_up_address.value = m_data_source['ship_address'];
        }
        //        if (input_pick_up_address.value == "") {
        //            input_pick_up_address.value = m_data_source['ship_address'];
        //        }
        btn_pickup_search = $1("btn_pickup_search_" + m_data_source['order_sequence_id']);
        btn_pickup_search.onclick = searchMapClick;
        searchMapClick();
    }
}

function searchMapCheck() {
    var isCheck = true;
    var span_pick_up_address_valid_msg = $1("span_pick_up_address_valid_msg");

    var MSG_SHIP_ADDRESS_EMPTY = "请填写详细的街道地址，要求3个汉字或以上";
    var MSG_SHIP_DDL_PICK_UP_TOWN_EMPTY = "请先选择完整的自提点地址";
    var townId = ddl_pick_up_town.getValue();
    if (townId == 0) {
        span_pick_up_address_valid_msg.innerHTML = SHIPMENT_ICON_WARN + MSG_SHIP_DDL_PICK_UP_TOWN_EMPTY;
        isCheck = false;
        return isCheck;
    }

    else {
        span_pick_up_address_valid_msg.innerHTML = '';

    }
    if ($1("pick_up_quarter").style.display != "none" && ddl_pick_up_quarter.getValue() == 0) {
        span_pick_up_address_valid_msg.innerHTML = SHIPMENT_ICON_WARN + MSG_SHIP_DDL_PICK_UP_TOWN_EMPTY;
        isCheck = false;
        return isCheck;
    } else {
        span_pick_up_address_valid_msg.innerHTML = '';
    }
    var shipAddress = $1('pick_up_address').value.trim();
    input_pick_up_address.value = shipAddress;
    return isCheck;
}
function ShipmentPickUp(container_id) {
    var m_shipment_pickup_panel = new JSPanel(container_id);
    m_shipment_pickup_panel.Template = SHIPMENT_PICKUP_TEMPLATE;
    m_shipment_pickup_panel.DataBind();
}

function _dis(obj) {
    obj.style.display = "";
}

// tj 2013-08-30 add
var quarter_pick_up_tips_info_ajax_succeed = function (quarter_id, result, is_refresh) {
    if (quarter_id > 0 && result != null && result['error_code'] == 0) {
        if (is_refresh && result["pickupsiteinfo"].length > 0) {
            if (quarter_id != -1) {
                pick_up_quarter_cache[quarter_id] = result;
            }
        }
        $1("ul_pick_up_list").className = 'list-area';
        m_rpt_pick_up_site_info.DataSource = result['pickupsiteinfo'];
        m_rpt_pick_up_site_info.OnItemDataBinding = function (dataItem, obj_tpl) {
            dataItem['name'] = dataItem['name'].replace('（已选）', '');
        };
        m_rpt_pick_up_site_info.DataBind();
        pick_up_img_dialog = new DivModelDialog('span_pick_up_img', 'pick_up_img_title', 'pick_up_img_box', 'div_shield', 'pick_up_img_content', 'pick_up_img_loading_bar');
        pick_up_map_dialog = new DivModelDialog('span_pick_up_map', 'pick_up_map_title', 'pick_up_map_box', 'div_shield', 'pick_up_map_content', 'pick_up_map_loading_bar');

        var m_is_selected = false;
        if (current_pick_up_id > 0) {
            m_rpt_pick_up_site_info.setValue(current_pick_up_id); //用户已经选中了自提信息
            m_is_selected = true;
        }
        if (!m_is_selected) {
            var pickupsiteinfo = result["pickupsiteinfo"];
            for (var i = 0; i < pickupsiteinfo.length; i++) {
                if (pickupsiteinfo[i]["id"] == pick_up_id) {
                    m_rpt_pick_up_site_info.setValue(pick_up_id);
                    m_is_selected = true;
                }
            }
            if (!m_is_selected) {
                m_rpt_pick_up_site_info.setValue(result["pickupsiteinfo"][0]["id"]);
                pick_up_id = m_rpt_pick_up_site_info.getValue();
            }
        }
    }
    pickUpInfoCutOut();
    changePageStatus(result);

};

var pick_up_tips_info_ajax_succeed = function (town_id, result, is_refresh) {
    if (town_id > 0 && result != null && result['error_code'] == 0) {
        if (is_refresh && result["pickupsiteinfo"].length > 0) {
            if (town_id != -1) {
                pick_up_town_cache[town_id] = result;
            }
        }
        $1("ul_pick_up_list").className = 'list-area';
        m_rpt_pick_up_site_info.DataSource = result['pickupsiteinfo'];
        m_rpt_pick_up_site_info.OnItemDataBinding = function (dataItem, obj_tpl) {
            dataItem['name'] = dataItem['name'].replace('（已选）', '');
        };
        m_rpt_pick_up_site_info.DataBind();
        pick_up_img_dialog = new DivModelDialog('span_pick_up_img', 'pick_up_img_title', 'pick_up_img_box', 'div_shield', 'pick_up_img_content', 'pick_up_img_loading_bar');
        pick_up_map_dialog = new DivModelDialog('span_pick_up_map', 'pick_up_map_title', 'pick_up_map_box', 'div_shield', 'pick_up_map_content', 'pick_up_map_loading_bar');
        var m_is_selected = false;
        if (current_pick_up_id > 0) {
            m_rpt_pick_up_site_info.setValue(current_pick_up_id); //用户已经选中了自提信息
            m_is_selected = true;
        }
        if (!m_is_selected) {
            var pickupsiteinfo = result["pickupsiteinfo"];
            for (var i = 0; i < pickupsiteinfo.length; i++) {
                if (pickupsiteinfo[i]["id"] == pick_up_id) {
                    m_rpt_pick_up_site_info.setValue(pick_up_id);
                    m_is_selected = true;
                }
            }
            if (!m_is_selected) {
                m_rpt_pick_up_site_info.setValue(result["pickupsiteinfo"][0]["id"]);
                pick_up_id = m_rpt_pick_up_site_info.getValue();
            }
        }
    }
    pickUpInfoCutOut();
    changePageStatus(result);
};

var pick_up_tips_info_map_ajax_succeed = function (result) {
    if (result != null && result['error_code'] == 0 && result['pickupsiteinfo'] != null && result['pickupsiteinfo'].length > 0) {
        $1("pick_up_address").innerHTML = "  <p id='p_pick_up_count' class='hide'>共<span id='pick_up_count'></span>个自提点</p><div id='div_pick_up_address'></div>";
        pick_up_map_json = result['pickupsiteinfo'];
        for (var i = 0; i < pick_up_map_json.length; i++) {
            if (pick_up_map_json[i]["id"] == pick_up_id) {
                var pick_up_json_add_temp = pick_up_map_json[i];
                pick_up_map_json.splice(i, 1);
                pick_up_json_add_temp['name'] = pick_up_json_add_temp['name'].replace('（已选）', '');
                pick_up_map_json.unshift(pick_up_json_add_temp);
                break;
            }
        }
        showPickUp(1);
        if (pick_up_map_json != null && pick_up_map_json.length > 0) {
            $1("pick_up_count").innerHTML = pick_up_map_json.length;
            $1("p_pick_up_count").className = 'result_title';
        }
        else {
            $1("p_pick_up_count").className = 'hide';
        }
    }
    else if (keyword != null && keyword.length > 0) {
        $1("pick_up_address").innerHTML = "<div class='worry'>对不起，您所查询的地区暂无自提点。</div>";
    }
    $1("pick_up_address_parent").innerHTML = $1("pick_up_address_parent").innerHTML;
};

//根据五级id获取下边有哪些自提点信息
var showQuarterPickUpTipsInfo = function (quarter_id, type) {
    isChangePickUpTownDropDownList = false;
    var cache_result = pick_up_quarter_cache[quarter_id];
    if (cache_result != null) {
        if (type == 1) {
            quarter_pick_up_tips_info_ajax_succeed(quarter_id, cache_result, false);
        }
        else {
            pick_up_tips_info_map_ajax_succeed(cache_result);
        }
        return;
    }
};
//根据四级id获取下边有那些自提点信息
var showPickUpTipsInfo = function (town_id, type) {
    var cache_result = pick_up_town_cache[town_id];
    if (cache_result != null) {
        if (type == 1) {
            pick_up_tips_info_ajax_succeed(town_id, cache_result, false);
        }
        else {
            pick_up_tips_info_map_ajax_succeed(cache_result);
        }
        return;
    }

};
function pickUpInfoCutOut() {/*截字*/
    var obj = $1("ul_pick_up_list").childNodes;
    for (var j = 0; j < obj.length; j++) {
        var p = obj[j].childNodes[2];
        var text = p.innerHTML;
        if (text.length > 37) {
            p.innerHTML = text.substring(0, 37) + '...';
        }
    }
}
//cj获取自提点信息
function getPickUpInfo(point) {
    searchMapdate = new Hashtable();
    searchMapdate['page_index'] = pickup_page_index;
    searchMapdate['request_type'] = 'pick_up';
    searchMapdate['point_x'] = point.lng;
    searchMapdate['point_y'] = point.lat;
    searchMapdate['town_id'] = ddl_pick_up_town.getValue();
    searchMapdate['quarter_id'] = ddl_pick_up_quarter.getValue();
    searchMapdate['page_size'] = 5;
}

//cj组装地址调用百度API返回坐标点
var searchMapClick = function () {
    var isCheck = searchMapCheck();
    if (!isCheck) {
        $H("pick_up_detail_address");
        return;
    }
    var address = ddl_pick_up_town.getText();
    if (ddl_pick_up_quarter.getValue() > 0) {
        address += ddl_pick_up_quarter.getText();
    }
    address += input_pick_up_address.value;
    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(address, function (point) {
        if (!point) {
            point = new Hashtable();
            point.lat = -1;
            point.lng = -1;
        }
        getPickUpInfo(point);

        pick_up_site_info_ajax.OnSucceed
        (
            function (result) {
                if (result != null && result['error_code'] == 0) {
                    if (searchMapdate['quarter_id'] > 0) {
                        quarter_pick_up_tips_info_ajax_succeed(searchMapdate['quarter_id'], result, true);
                    } else {
                        pick_up_tips_info_ajax_succeed(searchMapdate['town_id'], result, true);
                    }
                    var imhere_lat = 0;
                    var imhere_lng = 0;
                    if (point && point.lat) {
                        imhere_lat = point.lat;
                    }
                    if (point && point.lng) {
                        imhere_lng = point.lng;
                    }
                    result["Imhere"] = { "lat": imhere_lat, "lng": imhere_lng };

                    if (is_support_baidu_map == 1) {
                        baiduAPI = new BaiDuAPI("allMap");
                        baiduAPI.setCallBackFunc(function (pick_up_id) { m_rpt_pick_up_site_info.setValue(pick_up_id); });
                        baiduAPI.showPickUpInMap(result);
                    }
                    cache_pickupsiteinfo_result = result["pickupsiteinfo"];
                    $S("pick_up_detail_address");
                } else {
                    changePageStatus(result);
                    $H("pick_up_detail_address");
                }
            }
        );
        pick_up_site_info_ajax.invokeServer(searchMapdate, 'POST', false);

    }, m_city_name);
};
//选中自提点
function showBindPopupPickUpInfo() {
    var pickUpId = m_rpt_pick_up_site_info.getValue();
    current_pick_up_id = pickUpId;
    for (var i = 0; i < cache_pickupsiteinfo_result.length; i++) {
        if (cache_pickupsiteinfo_result[i]["id"] == pickUpId) {
            if (is_support_baidu_map == 1) {
                baiduAPI.resetMapCenterAndZoom();
                baiduAPI.showPickUpDetailWindow(pickUpId);
            }
        }
    }
}

//分页按钮状态
function changePageStatus(result) {
    if (result != null && result['error_code'] == 0) {
        $1('pickup_numer').innerHTML = result['record_count'];
        $1('sum_pickup_page').innerHTML = '&frasl;&nbsp;' + result['page_count'];
        $1('cur_pickup_page').innerHTML = result['page_index'];

        var pageIndex = parseInt(result['page_index']);
        var lastPageIndex = parseInt(result['page_count']);
        if (pageIndex == 1) {
            $1('pick_up_prev').className = "prev_lastpage";
        } else {
            $1('pick_up_prev').className = "previous";
        }
        if (pageIndex == lastPageIndex) {
            $1('pick_up_next').className = "next_lastpage";
        }
        else {
            $1('pick_up_next').className = "next";
        }
    }
}
//分页显示自提点信息cj
function changePagePickupInfo(action) {
    if (action == "up") {
        pickup_page_index = +($1('cur_pickup_page').innerHTML);
        if (pickup_page_index == 1) {
            return;
        }
        else {
            pickup_page_index -= 1;
        }
    } else {
        pickup_page_index = +($1('cur_pickup_page').innerHTML);
        if (pickup_page_index == +($1('sum_pickup_page').innerHTML.substring(7))) {
            return;
        }
        else {
            pickup_page_index += 1;
        }
    }

    searchMapClick();
}
var searchByStationName = function () {
    key_point = null;
    map.clearOverlays();
    keyword = $1("pick_up_api_search_key").value;
    var searchResult;
    localSearch.setSearchCompleteCallback(function (searchResult) {
        key_point = searchResult.getPoi(0);
        if (key_point != null) {
            map.clearOverlays();
            map.centerAndZoom(key_point.point, 13);
            addMarker(key_point.point, 2, 1, '我在这里', null, null);
            var bounds = map.getBounds();
            showPickUpTipsMap(bounds.minX, bounds.maxX, bounds.minY, bounds.maxY, m_city_id);
        }
        else {
            map.centerAndZoom(new BMap.Point(116.404, 39.930), 11);
            $1("pick_up_address").innerHTML = "<div class='worry'><p style='color:#cc3300'>找不到和\"" + keyword + "\"相关的地址。</div>";
        }
    });
    if (keyword.length > 0) {
        localSearch.search(keyword);
    }
    else {
        $1("pick_up_address").innerHTML = "<div class='worry'>请输入关键字查找自提点。</div>";
    }
};

var pick_up_map_click = function (obj) {
    var win_size = getposOffset_c(obj);
    pick_up_map_dialog.show(win_size[0] - 220, win_size[1] - 100);
    initmap();
};

var loadmapapijs = function (o) {
    if (js_state == 1) {
        pick_up_map_click(o);
    }
    else {
        addscriptcssfile('http://api.map.baidu.com/getscript?v=1.0&key=5118209889bc6f8ab07d9e2dfb0d78e5&services=true', 'map_api_getscript', 1, o);
    }
};

var showPickUpTipsMap = function (min_x, max_x, min_y, max_y, city_id) {
    pick_up_site_info_ajax.OnSucceed
    (
        function (result) {
            pick_up_tips_info_map_ajax_succeed(result);
        }
    );
    pick_up_site_info_ajax.invokeServer('min_x=' + min_x + '&max_x=' + max_x + '&min_y=' + min_y + '&max_y=' + max_y + '&city_id=' + city_id, 'POST', false);
};

function initmap() {
    map = new BMap.Map("container");
    map.addControl(new BMap.NavigationControl());
    var point = new BMap.Point(116.404, 39.930);
    map.centerAndZoom(point, 11);
    localSearch = new BMap.LocalSearch(map, {
        renderOptions: {
            pageCapacity: 8,
            autoViewport: true,
            selectFirstResult: false
        }
    });
    key_point = null;
    $1("pick_up_serach").onclick = function () { searchByStationName(); };
    var town_name = ddl_pick_up_town.getText();
    if (town_name != null && town_name.length > 0 && town_name != "请选择") {
        $1("pick_up_api_search_key").value = town_name;
    }
    m_rpt_pick_up_address = new JSRepeater('div_pick_up_address');
    m_rpt_pick_up_address.ItemTemplate = RPT_PICKUPSITEINFO_ADDRESS;
    m_rpt_pick_up_address.PageSize = 3;
    m_rpt_pick_up_address.PageLength = 3;
    m_rpt_pick_up_address.PageMaxNum = 10;
    m_rpt_pick_up_address.PageNumberTemplate = "  <a onclick='{0}' href='{1}' name='{2}' title='{3}' class='{4}'>{5}</a>  ";
    m_rpt_pick_up_address.Pagelinkonclick = 'showPickUp({0});';
    m_rpt_pick_up_address.Pagelinkhref = '###1';
    m_rpt_pick_up_address.Pagelinkname = 'nextpage_pick_up';
    m_rpt_pick_up_address.Pagelinkcss = 'page_Simplified';
    m_rpt_pick_up_address.Pagelinktitle = '';
    m_rpt_pick_up_address.Pagelinkclass = '';
    if (pick_up_town_id > 0) {
        showPickUpTipsInfo(pick_up_town_id, 2);
    }
    else {
        $1("pick_up_api_search_key").value = "";
        $1("pick_up_address").innerHTML = "";
    }
};

function addscriptcssfile(url, id, type, o) {
    var os = document.getElementById(id);
    var obj = null;
    if (type == 1) {
        obj = document.createElement('script');
        obj.type = "text/javascript";
    }
    else {
        obj = document.createElement('link');
        obj.rel = 'stylesheet';
        obj.type = "text/css";
    }
    obj.id = id;
    obj.src = url;
    var h = document.documentElement.firstChild;
    if (os != null) {
        h.replaceChild(obj, os);
    }
    else {
        h.appendChild(obj);
    }

    obj.onload = obj.onreadystatechange = function () {
        if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
            this.onload = this.onreadystatechange = null;
            if (type == 1) {
                js_state = 1;
                pick_up_map_click(o);
            }
            if (type == 0) {
                css_state = 1;
            }
        }
    };
};

function pick_up_img_info_click(obj, id) {
    var win_size = getposOffset_c(obj);
    $1('pick_up_img').src = 'http://img4.ddimg.cn/pickupbycustomer/' + id + '.jpg';
    pick_up_img_dialog.show(win_size[0] - 300, win_size[1] - 100);
};

function showPickUp(pageindex) {
    m_rpt_pick_up_address.onItemDataBind = function (dataItem, obj_tpl) {
        if (dataItem['id'] == pick_up_id) {
            dataItem['title_css'] = 'nonce';
            dataItem['name'] = dataItem['name'].replace('（已选）', '') + "（已选）";
            dataItem['pick_up_select'] = "<span class=now>到这里自提</span>";
        }
        else {
            dataItem['title_css'] = '';
            dataItem['name'] = dataItem['name'].replace('（已选）', '');
            dataItem['pick_up_select'] = "<a  href='javascript:for_99click();' name='sel_pbc_readmap' onclick='save_map_select(" + dataItem['id'] + "," + dataItem['town_id'] + ")' id='pick_up_id_" + dataItem['id'] + "'>到这里自提</a>";
        }
    };
    if (pick_up_map_json != null && pick_up_map_json.length > 0) {
        var pick_up_json_length = pick_up_map_json.length;

        var pagetotal = Math.ceil(pick_up_json_length / m_rpt_pick_up_address.PageSize);
        var index_pick_up_json = new Array();
        var start = (pageindex - 1) * m_rpt_pick_up_address.PageSize;
        if (start < 0 || start >= pick_up_json_length) {
            return;
        }
        map.clearOverlays();
        if (key_point != null) {
            map.centerAndZoom(key_point.point, 13);
            addMarker(key_point.point, 2, 1, '我在这里', null, null);
        }
        for (var i = start; i < start + m_rpt_pick_up_address.PageSize && i < pick_up_json_length; i++) {
            var k = i - start;
            var dict = pick_up_map_json[i];
            dict["indexB"] = indexA[k % 10];
            dict["indexA"] = k;
            index_pick_up_json.push(dict);
            addMarker(new BMap.Point(dict["point_x"], dict["point_y"]), 1, k, dict["name"], dict["address"], dict["contact_tel"]);
        }

        m_rpt_pick_up_address.PageIndex = pageindex;
        if (pagetotal > 1) {
            m_rpt_pick_up_address.TotalPages = pagetotal;
        }
        else {
            m_rpt_pick_up_address.TotalPages = "";
        }
        m_rpt_pick_up_address.DataSource = index_pick_up_json;
        m_rpt_pick_up_address.DataBind();
        if (pagetotal > 1) {
            document.getElementById("nextpage_pick_up").style.display = "block";
        }
        else {
            document.getElementById("nextpage_pick_up").style.display = "none";
        }
        $1("div_pick_up_address").className = "";
        //20100619 准对IE6 分页css丢失 不知道啥原因这样做居然可以解决问题
        $1("pick_up_address_parent").innerHTML = $1("pick_up_address_parent").innerHTML;
    }
    else {
        $1("pick_up_address").innerHTML = "<div class='worry'>对不起，您所查询的地区暂无自提点</div>";
    }
};

function addMarker(point, type, index, name, address, contact_tel) {
    var title = null;
    var img_offset = 0;
    if (type == 1) {
        title = "当当网自提点： " + name;
        img_offset = 0 - (index > 9 ? 11 : index) * 25; // 设置图片偏移
    }
    else {
        var img_offset = 0 - 10 * 25; // 设置图片偏移
    }
    var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), { offset: new BMap.Size(10, 25), imageOffset: new BMap.Size(0, img_offset) });
    var marker = new BMap.Marker(point, { icon: myIcon });
    if (type == 1) {
        var infoWindow = new BMap.InfoWindow("<b>" + title + "</b><br>地址：" + address + "<br>电话：" + contact_tel, { offset: new BMap.Size(0, -25) });
        marker.addEventListener("click", function () { this.openInfoWindow(infoWindow); });
        marker.setTitle(title);
    }
    marker.setLabel(new BMap.Label(name, { offset: new BMap.Size(10, -25) }));
    map.addOverlay(marker);
};

function save_map_select(id, pick_up_townid) {
    pick_up_town_id = pick_up_townid;
    ddl_pick_up_town.setValue(pick_up_town_id);
    showPickUpTipsInfo(pick_up_town_id, 1);
    pick_up_id = id;
    if (pick_up_id > 0) {
        m_rpt_pick_up_site_info.setValue(pick_up_id);
    }
    pick_up_map_dialog.closeDialog();
};
//#endregion
