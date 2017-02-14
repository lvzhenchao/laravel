
var DISTRIBUTION_TEMPLATE =
    "<div class='popup-wrap popup-payArea' style='left:930px; top:1080px;position:absolute;display:none;z-index:10001;'   id='distribution_container'>"
  + "<div class='popup-title'   id='distribution_title'>"
      + " <h3>查看可货到付款地区</h3>"
      + " <a class='btn-popup-close' href='javascript:for_99click();' id='distribution_close'></a>"
   + "</div>"
   + "<div class='popup-cont'>"
        + "<div class='intro'>如您需了解所在地区的配送范围、时间及运费，可在下方选择相应省市地区查看</div> "
        + "<div class='filter-bar' id='div_distribution_addr_{order_sequence_id}'>"
    	    + "<select class='select-h22' name='' id='pop_sel_country_{order_sequence_id}'></select>"
            + "<select class='select-h22' name='' id='pop_sel_province_{order_sequence_id}'></select>"
            + "<select class='select-h22' name='' id='pop_sel_city_{order_sequence_id}'></select>"
            + "<select class='select-h22' name='' id='pop_sel_town_{order_sequence_id}'></select>"
    	    + "<a class='btn btn-small-grey' id='search_distribution_{order_sequence_id}'>查 询</a>"
    	 + "</div>"
    	 + "<div class='area-data' id='distribution_data'>"
            +"<div class='area-data-table'>"
                +"<div class='table-th-wrap dib-wrap'>"
                    +"<div class='item-table dib w85'>"
                        +"<div class='item-td'>"
                        +"<p>"
                        +"<span>送货方式</span>"
                        +"</p>"
                        +"</div>"
                    +"</div>"
                    +"<div class='item-table dib w115'>"
                        +"<div class='item-td'>"
                        +"<p>"
                        +"<span>送货范围</span>"
                        +"</p>"
                        +"</div>"
                    +"</div>"
                    +"<div class='item-table dib w170'>"
                        +"<div class='item-td'>"
                        +"<p>"
                        +"<span>送货时间<br>(自出库后)</span>"
                        +"</p>"
                        +"</div>"
                    +"</div>"
                    +"<div class='item-table dib w85'>"
                        +"<div class='item-td'>"
                        +"<p>"
                        +"<span>运费</span>"
                        +"</p>"
                        +"</div>"
                    +"</div>"
                    +"<div class='item-table dib w85'>"
                        +"<div class='item-td'>"
                        +"<p>"
                        +"<span>送货优惠</span>"
                        +"</p>"
                        +"</div>"
                    +"</div>"
                    +"<div class='item-table dib w85'>"
                        +"<div class='item-td'>"
                        +"<p>"
                        +"<span>是否支持<br>上门换货</span>"
                        +"</p>"
                        +"</div>"
                    +"</div>"
                    +"<div class='item-table dib w85'>"
                        +"<div class='item-td'>"
                        +"<p>"
                        +"<span>是否支持<br>上门退货</span>"
                        +"</p>"
                        +"</div>"
                    +"</div>"
                + "</div>"
            + "<div id='distribution_range_data'></div>"
            + "<div class='prompt'>"
            + "<strong>特别提示：</strong>"
                + "<div class='prompt-cont'>"
                    + "<div class='prompt-cont-item'>"
                        + "<span class='item-num'>1.</span>"
                        + "<p>如果您填写的是单位地址，周六周日和法定节假日的送货时间将相应顺延。</p>"
                    + "</div>"
                    + "<div class='prompt-cont-item'>"
                        + "<span class='item-num'>2.</span>"
                        + "<p>订单中同时含有出版物和百货则不支持加急快递。</p>"
                    + "</div>"
                    + "<div class='prompt-cont-item'>"
                        + "<span class='item-num'>3.</span>"
                        + "<p>针对预付款加急订单，提交订单成功后请即刻付款，付款后才能按时送达。 </p>"
                    + "</div>"
                    + "<div class='prompt-cont-item'>"
                        + "<span class='item-num'>4.</span>"
                        + "<p>当当网中的部分商品是由与当当网签订合同的商家提供的，这些商品的送货方式和费用由商家决定。</p>"
                    + "</div>"
                    + "<div class='prompt-cont-item'>"
                        + "<span class='item-num'>5.</span>"
                        + "<p>特快专递服务是选用速度较快的送货公司进行配送，其中包含EMS、顺丰、圆通等，港澳台地区使用顺丰快递配送。</p>"
                    + "</div>"
                    + "<div class='prompt-cont-item'>"
                        + "<span class='item-num'>6.</span>"
                        + "<p>加急订单配送时间说明：<br>北京、上海、广州、深圳：发货订单，前日21:00-当日9:00间下单，当日18:00前送达，当日9:00-当日21:00下单，次日中午12:00前送达<br>廊坊：北京发货订单，当日9:00-当日20:00下单，次日中午12:00前送达<br>天津：北京发货订单，前日21:00-当日8:00下单，当日18:00前送达，当日8:00-当日21:00下单，次日中午12:00前送达</p>"
                    + "</div>"
                    + "<div class='prompt-cont-item'>"
                        + "<span class='item-num'>7.</span>"
                        + "<p>邮局包裹分类说明： </p>"
                        + "<table width='90%' cellspacing='0' cellpadding='0' border='0'>"
                            + "<tbody>"
                                + "<tr>"
                                    + "<th>包裹单号前两位</th>"
                                    + "<th>包裹类型</th>"
                                    + "<th>其它说明</th>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>KA</td>"
                                    + "<td>邮局快递包裹</td>"
                                    + "<td>只送包裹单，需客户到邮局自取包裹</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>SA/SB/SQ</td>"
                                    + "<td>挂号印刷品</td>"
                                    + "<td>只送包裹单，需客户到邮局自取包裹</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>PA</td>"
                                    + "<td>邮局普通包裹</td>"
                                    + "<td>只送包裹单，需客户到邮局自取包裹</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>AA</td>"
                                    + "<td>中邮物流包裹</td>"
                                    + "<td>只限收货地址为广东的客户，邮局送货上门</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>开头两位和末尾两位为字母</td>"
                                    + "<td>EMS特快专递包裹</td>"
                                    + "<td>邮局送货上门</td>"
                                + "</tr>"
                            + "</tbody>"
                        + "</table>"
                    + "</div>"
                + "</div>"
            + "</div>"
        + "</div>"
        
   + "</div>"
    //+ "</div>"
 + "</div>";

var TR_INFO_TEMPLATE =
"<div class='table-td-wrap dib-wrap'>"
+ "<div class='item-table dib w85'>"
    + "<div class='item-td'>"
        + "<p>"
        + "<span>{type_name}</span>"
        + "</p>"
    + "</div>"
+ "</div>"
+ "<div class='item-table dib w115'>"
    + "<div class='item-td'>"
        + "<p>"
        + "<span>{cod_area_desc}</span>"
        + "</p>"
    + "</div>"
+ "</div>"
+ "<div class='item-table dib w170'>"
    + "<div class='item-td'>"
        + "<p>"
        + "<span>{send_time}</span>"
        + "</p>"
    + "</div>"
+ "</div>"
+ "<div class='item-table dib w85'>"
    + "<div class='item-td'>"
        + "<p>"
        + "<span>{ship_type_desc}</span>"
        + "</p>"
    + "</div>"
+ "</div>"
+ "<div class='item-table dib w85'>"
    + "<div class='item-td'>"
        + "<p>"
        + "<span>{shipping_fee_explain}</span>"
        + "</p>"
    + "</div>"
+ "</div>"
+ "<div class='item-table dib w85'>"
    + "<div class='item-td'>"
        + "<p>"
        + "<span>{exchange_desc}</span>"
        + "</p>"
    + "</div>"
+ "</div>"
+ "<div class='item-table dib w85'>"
    + "<div class='item-td'>"
        + "<p>"
        + "<span>{return_desc}</span>"
        + "</p>"
    + "</div>"
+ "</div>"
+"</div>";
//货到付款区域弹出
var distribution_click = function (countryID, provinceID, cityID, townID, orderSeqID, objSelRegion, orderType, shopID, orderProductsType) {
    var distribution = new DistributionDlg("div_distribution");
    distribution.show(countryID, provinceID, cityID, townID, orderSeqID, objSelRegion, orderType, shopID, orderProductsType);
}

function DistributionDlg(container_id) {
    var m_distribution_panel = new JSPanel(container_id);
    var m_left = 0;
    var m_top = 0;
    var objAddress = null;
    var obj_btn_search = null;
    var m_sel_region = null;
    var m_order_type = 0;
    var m_shop_id = 0;
    var m_order_products_type = 0;

    this.show = function (countryID, provinceID, cityID, townID, orderSeqID, objSelRegion, orderType, shopID, orderProductsType) {
        m_order_products_type = orderProductsType;
        m_order_type = orderType;
        m_shop_id = shopID;
        document.getElementById('shield_frame').style.height = document.body.clientHeight + "px";
        m_distribution_panel.Template = DISTRIBUTION_TEMPLATE;
        m_distribution_panel.DataSource = { "order_sequence_id": orderSeqID };
        m_distribution_panel.DataBind();
        //初始化控件id并绑定响应事件
        obj_btn_search = $1('search_distribution_' + orderSeqID);
        obj_btn_search.onclick = search_distribution_info;
        //
        var distribution_Dialog = new DivModelDialogMove('distribution_container', 'distribution_title', 'distribution_close', 'div_shield', 'distribution_table', 'distribution_data', false);

        if (distribution_Dialog != null) {
            distribution_set_positon();
            distribution_Dialog.show(m_left, m_top);
            //初始化四级地址下拉列表框
            init_address_info(countryID, provinceID, cityID, townID, orderSeqID);
        }
        get_distribution_info(townID);
        m_sel_region = objSelRegion;
    }
    this.close = function () {
        distribution_Dialog.closeDialog();
    }

    var distribution_set_positon = function () {
        var iWidth = 800;     //弹出窗口的宽度;
        var iHeight = 400;    //弹出窗口的高度;
        var scrolltop = 0;
        var scrollleft = 0;
        var cheight = 0;
        var cwidth = 0;
//        if (document.body.scrollTop) {//这是一个js的兼容
//            scrollleft = document.body.scrollLeft;
//            scrolltop = document.body.scrollTop;
//            cheight = document.body.clientHeight;
//            cwidth = document.body.clientWidth;
//        }
//        else {
//            scrollleft = document.documentElement.scrollLeft;
//            scrolltop = document.documentElement.scrollTop;
//            cheight = document.documentElement.clientHeight;
//            cwidth = document.documentElement.clientWidth;
//        }

//        m_left = (cwidth - iWidth) / 2 + scrollleft;
        //        m_top = (cheight - iHeight) / 2 + scrolltop;

        if (document.compatMode == "BackCompat") {
            cwidth = document.body.clientWidth;
            cheight = document.body.clientHeight;
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

    //货到付款地区数据初始化
    var init_distribution_info = function (distribution_data) {
        if (distribution_data == null) {
            $1('distribution_range_data').innerHTML = "";
        }
        else {
            //将得到的结果数据展示出来
            //                        var m_distribution_info = new JSRepeater("distribution_range_data");
            //                        m_distribution_info.ItemTemplate = TR_INFO_TEMPLATE;
            //                        m_distribution_info.DataSource = distribution_data;
            //                        var dataContent = m_distribution_info.GetJSRHTML();
            //                        var dataInfo = "<thead><tr><th width='13%'>送货方式</th><th width='16%'>送货范围</th><th width='23%'>送货时间<br>(自出库后)</th><th width='13%'>运费</th><th width='13%'>送货优惠</th><th width='11%'>是否支持<br>上门退货</th><th width='11%'>是否支持<br>上门换货</th></tr></thead><tbody id='distribution_range_data'>"+dataContent+"</tbody>";
            //                        var dataTemplate = "<table id='distribution_table'>"+dataInfo+"</table>";

            //                        $1('distribution_table_data').innerHTML = dataTemplate;

            var m_distribution_info = new JSRepeater("distribution_range_data");
            m_distribution_info.ItemTemplate = TR_INFO_TEMPLATE;
            m_distribution_info.DataSource = distribution_data;
            m_distribution_info.DataBind();
        }
    }

    //四级城市数据初始化
    var init_address_info = function (countryID, provinceID, cityID, townID, orderSeqID) {
        objAddress = new Region('div_distribution_addr_' + orderSeqID, orderSeqID, "pop");
        objAddress.setValue(countryID, provinceID, cityID, townID, 0, m_order_products_type);
    }

    //按照四级城市查找对应的送货方式信息描述信息
    var get_distribution_info = function (townID) {
        if (townID == 0) {
            init_distribution_info(null);
        }
        else {
            var distribution_ajax = new Ajax('ship_type_API.aspx');
            distribution_ajax.OnSucceed
        (
            function (resultDistributionInfo) {
                if (resultDistributionInfo['errorCode'] == 0 && resultDistributionInfo['ship_types'] != null) {
                    var length1 = resultDistributionInfo['ship_types'].length;
                    for (var i = 0; i < resultDistributionInfo['ship_types'].length; i++) {
                        if (resultDistributionInfo['ship_types'][i].send_time != null) {
                            var temp = resultDistributionInfo['ship_types'][i].send_time;
                            var tempSendInfo = "";
                            if (temp != null) {
                                //将字符串中的分号替换为回车
                                tempSendInfo = temp.replace(/;/g,"<br>");
                            }
                            resultDistributionInfo['ship_types'][i].send_time = tempSendInfo;
                        }
                    }
                    init_distribution_info(resultDistributionInfo['ship_types']);
                }
            }
        );
            var distribution_data = new Hashtable();
            distribution_data['city_id'] = townID;
            distribution_ajax.invokeServer(distribution_data, 'POST', false);
        }

    }

    //查询按钮的响应函数
    var search_distribution_info = function () {
        var townID = $1('pop_sel_town_' + m_distribution_panel.DataSource['order_sequence_id']).value;
        get_distribution_info(townID);
        var countryID = $1('pop_sel_country_' + m_distribution_panel.DataSource['order_sequence_id']).value;
        var provinceID = $1('pop_sel_province_' + m_distribution_panel.DataSource['order_sequence_id']).value;
        var cityID = $1('pop_sel_city_' + m_distribution_panel.DataSource['order_sequence_id']).value;
        m_sel_region.setValue(countryID, provinceID, cityID, townID, 0);
    }

}