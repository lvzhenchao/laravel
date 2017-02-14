var SELFPICKUP_READONLY_TEMPLATE =
"<h4>自提免运费服务<span class='icon_new'></span></h4>"
+ "<p class='listcon spadding choosen' id='self_pick_up_icon'><input type='hidden' id='input_pick_up_id' value='{id}'><a href='#' class='fr mr-10' id='self_pickup_change'>[更多自提点]</a><span class='check_new' id='self_pick_up_check'></span><span class='mr-10'></span><span class='mr-10'>{name}</span>{address}<span class='ml-65'>联系电话:{tel}</span></p>"

var SELFPICKUP_DIALOG_TEMPLATE =
"<div class='popup_self' style='left:10px; top:200px;position:absolute;display:none;z-index:10000;' id='self_pickup_container'>"
	+ "<div class='title' id='self_pickup_title'><a class='btn-popup-close' href='#' id='self_pickup_close'></a>选择自提点</div>"
	+ "<div class='step'><span></span>选择自提并下单<span class='ml-15 sp2'></span>收到取货短信(或订单状态为“等待自提”)<span class='ml-15 sp3'></span>到自提点自提</div>"
	+ "<div class='search'><select name='' id='pick_up_town'><option value ='0'>请选择</option></select><select name='' id='pick_up_quarter' style='display:none;'><option value ='0'>请选择</option></select></select><input type='text' id='pick_up_address' maxlength='120' value=''/><a href='#' id='pick_up_search'>搜索</a><label id='label_pick_up_address_valid_msg' style='color:red; padding-left:10px;'></label><label id='self_pickup_default_close'></label></div>"
	+ "<div class='map' id='pick_up_detail_address'>"
	   + "<div class='detail_address clearfix'>"
		 + "<div class='shadow shadow_address'>"
		   + "<div class='choose_address'>"
		   + "<p class='title_num'>共有<span class='number' id='pickup_numer'>100</span>个自提点</p>"
		   + "<ul id='point_ul' class='list-area'>"
           + "</ul>"
           + "<div class='turn_prev_next_page'>"
	            + "<span class='prev_lastpage' id='pick_up_prev'></span>"
	            + "<strong class='now' id='cur_pickup_page'>1</strong><strong class='total' id='sum_pickup_page'>⁄&nbsp;50</strong>"
	            + "<span class='next' id='pick_up_next'></span>"
	       + "</div>"
          + "</div>"
         + "</div>"
		 + "<div class='shadow shadow_map'>"
			+ "<div class='address_map'>"
			  + "<div class='address_map_img' id='allMap'>"
			  + "</div>"
		  + "</div>"
	   + "</div>"
	+ "</div>"
	+ "</div>"
	+ "<p class='tip'><em></em>温馨提示:为保证您的货品安全，请自提时携带收件人身份证。</p>"
	+ "<div class='btn_area'><a href='#' class='cancel' id='self_pickup_cancel'>取消</a><a href='#' class='btn' id='self_pickup_submit'>确认收货方式</a></div>"
+ "</div>";

var RPT_PICKUPSITEINFO_ITEMTEMPLATE = "<li class='point'><label for=''>"
+ "<input type='radio' name='pbc_station' class='point_radio'value='{id}'><strong>{display_id}-{name}</strong></label><span class='phone_number'>{contact_tel}</span>"
+ "<p class='text_indent' title='{address}'>{address}</p>"
+ "</li>";

function SelfPickup(container_id) {
    /* 普通变量 */
    var m_left = 0;
    var m_top = 0;
    var m_data_source;
    var m_dialog;
    var m_have_quarter_pickup = false; //是否存在五级自提点
    var pickup_page_index = 1; //自提点当前页码
    var baiduAPI;
    // 选中的自提点
    var selected_pick_up = {
        id: 0,
        name: "",
        address: "",
        tel: ""
    };

    /* js缓存 */
    var pick_up_town_cache = new Array(); //拥有自提点的四级城市
    var pick_up_quarter_cache = new Array(); //拥有自提点的五级城市
    var pick_up_town_list_cache = new Array(); //四级城市有哪些自提点
    var pick_up_quarter_list_cache = new Array(); //五级城市有哪些自提点
    var pick_up_list_result_cache;

    /* 控件 */
    var m_self_pickup_panel = new JSPanel(container_id);
    var m_self_pickup_dialog = new JSPanel("div_selfpickup");
    var ddl_pick_up_town = new DropDownList('pick_up_town');
    var ddl_pick_up_quarter = new DropDownList('pick_up_quarter');
    var m_rpt_pick_up_list = new RadioButtonList('point_ul');

    /* Ajax */
    var pick_up_town_ajax = new Ajax("/pickupsite/regionUnderCity");
    var pick_up_quarter_ajax = new Ajax("/pickupsite/regionUnderTown");
    var pick_up_list_ajax = new Ajax("/pickupsite/town");
    var pick_up_subimt_ajax = new Ajax("/shipment/pickupchecked");

    /* 用户操作提示 */
    var MSG_SHIP_ADDRESS_EMPTY = "请填写详细的街道地址，要求3个汉字或以上";
    var MSG_SHIP_DDL_PICK_UP_TOWN_EMPTY = "请先选择完整的自提点地址";

    /* 回调方法 */
    var refershShipment = null;

    this.setDataSource = function (data_source) {
        m_data_source = data_source;
        if (m_data_source != null) {
            selected_pick_up.id = data_source["pick_up_id"];
            selected_pick_up.name = data_source["pick_up_name"];
            selected_pick_up.address = data_source["pick_up_address"];
            selected_pick_up.tel = data_source["pick_up_tel"];
        }
        m_self_pickup_panel.DataSource = selected_pick_up;
    };

    var piece_set_positon = function () {
        var iWidth = 780;
        var iHeight = 660;
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
        else {
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

    var change = function () {
		pickup_page_index = 1;
	
        m_self_pickup_dialog.Template = SELFPICKUP_DIALOG_TEMPLATE;
        m_self_pickup_dialog.DataBind();

        ddl_pick_up_town.DataTextField = 'name';
        ddl_pick_up_town.DataValueField = 'id';
        ddl_pick_up_town.OnSelectedIndexChanged = ddlPickupTown_SelectedIndexChanged;

        ddl_pick_up_quarter.DataTextField = 'name';
        ddl_pick_up_quarter.DataValueField = 'id';
        ddl_pick_up_quarter.OnSelectedIndexChanged = ddlPickupQuarter_SelectedIndexChanged;

        m_rpt_pick_up_list.ItemTemplate = RPT_PICKUPSITEINFO_ITEMTEMPLATE;
        m_rpt_pick_up_list.setOnSelectedIndexChanged(showBindPopupPickUpInfo);// showBindPopupPickUpInfo

        $("#self_pickup_cancel").unbind("click").bind("click", function (event) {
            event.preventDefault();
            dialog_close();
        });

        $("#self_pickup_close").unbind("click").bind("click", function (event) {
            event.preventDefault();
            dialog_close();
        });

        $("#self_pickup_submit").unbind("click").bind("click", function (event) {
            event.preventDefault();
            dialog_submit();
        });

        m_dialog = new DivModelDialogMove('self_pickup_container', 'self_pickup_title', 'self_pickup_default_close', 'div_shield', '', '', false);
        if (m_dialog != null) {
            piece_set_positon();
            m_dialog.show(m_left, m_top);

            // 给自提四级城市下拉框绑定数据
            bindTownDDLControl(m_data_source["city_id"]);
            // 给自提点详细地址栏绑定数据
            $("#pick_up_address").val(m_data_source['ship_address']);

            // 给自提点搜索按钮绑定单击事件
            $("#pick_up_search").unbind("click").bind("click", function (event) {
                event.preventDefault();
                searchMapClick();
            });
            searchMapClick();
        }
    };

    var bindEvent = function () {
        $("#self_pick_up_check").unbind("click").bind("click", function () {
            var checked = false;
            if ($("#self_pick_up_icon").attr("class") == "listcon spadding choosen") {
                checked = false;
            } else {
                checked = true;
            }

            pick_up_subimt_ajax.OnSucceed(
                function (result) {
                    if (result == null || result["error_code"] == null || result["error_code"] != 0) {
                        return;
                    }
                    if ($("#self_pick_up_icon").attr("class") == "listcon spadding choosen") {
                        $("#self_pick_up_icon").removeClass("choosen");
                    } else {
                        $("#self_pick_up_icon").addClass("choosen");
                    }
                    //刷新送货方式模块
                    refershShipment(checked);
                }
            );

            pick_up_subimt_ajax.OnTimeout(
                function () {
                    pick_up_subimt_ajax.Abort();
                }
            );
            var date = new Hashtable();
            var pick_up_id = parseInt(selected_pick_up.id); //$("#input_pick_up_id").val()
            if (!checked) {
                pick_up_id = 0;
            }
            date["pick_up_id"] = pick_up_id;
            date["checked"] = checked;
            pick_up_subimt_ajax.invokeServer(date, 'POST', false);
        });

        $("#self_pickup_change").unbind("click").bind("click", function (event) {
            event.preventDefault();
            change();
        });
    }

    this.setResetShipment = function (func) {
        refershShipment = func;
    };

    this.show = function () {
        m_self_pickup_panel.Template = SELFPICKUP_READONLY_TEMPLATE;
        m_self_pickup_panel.DataBind();

        bindEvent();

        $("#self_pick_up_icon").attr("class", "listcon spadding");
        if (m_data_source["is_check_self_pick_up"] == true) {
            $("#self_pick_up_icon").addClass("choosen");
        }
    };

    this.hide = function () {
        m_self_pickup_panel.Template = "";
        m_self_pickup_panel.DataBind();
    }

    var dialog_close = function () {
        if (m_dialog != null) {
            m_dialog.closeDialog();
        }
    };

    var dialog_submit = function () {
        if (selected_pick_up.id == 0 && $("#self_pick_up_icon").attr("class") == "listcon spadding") {
            $("#self_pick_up_icon").addClass("choosen");
            return;
        }

        pick_up_subimt_ajax.OnSucceed(
            function (result) {
                if (result == null || result["error_code"] == null || result["error_code"] != 0) {
                    return;
                }
				var checked = false;
                if ($("#self_pick_up_icon").attr("class") == "listcon spadding") {
                    $("#self_pick_up_icon").addClass("choosen");
					checked = true;
                }
                m_self_pickup_panel.DataSource = selected_pick_up;
                m_self_pickup_panel.Template = SELFPICKUP_READONLY_TEMPLATE;
                m_self_pickup_panel.DataBind();

                bindEvent();

                if (m_dialog != null) {
                    m_dialog.closeDialog();
                }
                //刷新送货方式模块
                refershShipment(checked);
            }
        );
        var date = new Hashtable();
        date["pick_up_id"] = selected_pick_up.id;
        date["checked"] = true;
        pick_up_subimt_ajax.invokeServer(date, 'POST', false);
    };

    // 给自提四级城市下拉框绑定数据
    var bindTownDDLControl = function (city_id) {
        if (city_id == 0) {
            ddl_pick_up_town.DataSource = [{ 'name': '--------', 'id': '0' }];
            ddl_pick_up_town.DataBind();
            return;
        }
        var cache_result = pick_up_town_cache[city_id]; //全局自提点下拉框四级城市缓存变量
        if (cache_result != null) {
            pick_up_town_ajax_succeed(city_id, cache_result, false);
            return;
        }

        pick_up_town_ajax.OnSucceed(
            function (result) {
                pick_up_town_ajax_succeed(city_id, result, true);
            }
        );

        pick_up_town_ajax.OnTimeout(
            function () {
                pick_up_town_ajax.Abort();
            }
        );
        var date = new Hashtable();
        date["city_id"] = city_id;
        pick_up_town_ajax.invokeServer(date, 'POST', false);
    };

    var pick_up_town_ajax_succeed = function (city_id, result) {
        if (result == null || result['error_code'] != 0 || result["regions"] == null) {
            return;
        }
        if (result["regions"].length > 0) {
            pick_up_town_cache[city_id] = result;
        }
        var havePleaseChoice = false; // 数据中是否已经存在“请选择”
        for (var i = 0; i < result["regions"].length; i++) {
            if (result["regions"][i].name == "请选择") {
                havePleaseChoice = true;
                break;
            }
        }
        if (!havePleaseChoice) {
            result["regions"].unshift({ 'name': '请选择', 'id': '0' });
        }
        ddl_pick_up_town.DataSource = result["regions"];
        ddl_pick_up_town.DataBind();
        if (m_data_source["pick_up_town_id"] > 0) {
            ddl_pick_up_town.setValue(m_data_source["pick_up_town_id"]);
            if (ddl_pick_up_town.getValue() <= 0) {
                ddl_pick_up_town.setValue(0);
            }
            bindQuarterDDLControl(m_data_source["pick_up_town_id"]);
        }
    };

    var ddlPickupTown_SelectedIndexChanged = function () {
        var town_id = ddl_pick_up_town.getValue();
        pickup_page_index = 1;
        if (town_id != 0) {
            bindQuarterDDLControl(town_id);
        } else {
            $H("pick_up_quarter");
        }
    };

    // 给自提五级城市下拉框绑定数据
    var bindQuarterDDLControl = function (town_id) {
        if (town_id == 0) {
            ddl_pick_up_quarter.DataSource = [{ 'name': '--------', 'id': '0' }];
            ddl_pick_up_quarter.DataBind();
            return;
        }

        var cache_result = pick_up_quarter_cache[town_id];
        if (cache_result != null) {
            pick_up_quarter_ajax_succeed(town_id, cache_result, false);
            return;
        }

        pick_up_quarter_ajax.OnSucceed(
            function (result) {
                pick_up_quarter_ajax_succeed(town_id, result, true);
            }
        );

        pick_up_quarter_ajax.OnTimeout(
            function () {
                pick_up_quarter_ajax.Abort();
            }
        );
        var date = new Hashtable();
        date["town_id"] = town_id;
        pick_up_quarter_ajax.invokeServer(date, 'POST', false);
    };

    var pick_up_quarter_ajax_succeed = function (town_id, result) {
        if (result == null || result['error_code'] != 0 || result["regions"] == null || result["regions"].length == 0) {
            $("#pick_up_quarter").hide(); //隐藏自提点五级城市下拉框
            return;
        }
        $("#pick_up_quarter").show(); //显示自提点五级城市下拉框
        if (result["regions"].length > 0) {
            pick_up_quarter_cache[town_id] = result;
        }
        var havePleaseChoice = false; // 数据中是否已经存在“请选择”
        for (var i = 0; i < result["regions"].length; i++) {
            if (result["regions"][i].name == "请选择") {
                havePleaseChoice = true;
                break;
            }
        }
        if (!havePleaseChoice) {
            result["regions"].unshift({ 'name': '请选择', 'id': '0' });
        }
        ddl_pick_up_quarter.DataSource = result["regions"];
        ddl_pick_up_quarter.DataBind();
        if (m_data_source["pick_up_quarter_id"] > 0) {
            ddl_pick_up_quarter.setValue(m_data_source["pick_up_quarter_id"]);
            if (ddl_pick_up_quarter.getValue() <= 0) {
                ddl_pick_up_quarter.setValue(0);
            }
        }
    };

    var ddlPickupQuarter_SelectedIndexChanged = function () {
        pickup_page_index = 1;
    };

    // 校验自提点详细地址是否合法
    var searchMapCheck = function () {
        var isCheck = true;
        var $valid_msg = $("#span_pick_up_address_valid_msg");

        var townId = ddl_pick_up_town.getValue();
        if (townId == 0) {
            $valid_msg.html(SHIPMENT_ICON_WARN + MSG_SHIP_DDL_PICK_UP_TOWN_EMPTY);
            isCheck = false;
            return isCheck;
        } else {
            $valid_msg.html("");

        }
        if ($("#pick_up_quarter").css("display") != "none" && ddl_pick_up_quarter.getValue() == 0) {
            $valid_msg.html(SHIPMENT_ICON_WARN + MSG_SHIP_DDL_PICK_UP_TOWN_EMPTY);
            isCheck = false;
            return isCheck;
        } else {
            $valid_msg.html("");
        }
        return isCheck;
    };

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
        address += $("#pick_up_address").val();
        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(address, function (point) {
            if (!point) {
                point = new Hashtable();
                point.lat = -1;
                point.lng = -1;
            }
            var searchMapdate = new Hashtable();
            searchMapdate['page_index'] = pickup_page_index;
            searchMapdate['request_type'] = 'pick_up';
            searchMapdate['point_x'] = point.lng;
            searchMapdate['point_y'] = point.lat; 
            searchMapdate['town_id'] = ddl_pick_up_town.getValue();
            searchMapdate['quarter_id'] = ddl_pick_up_quarter.getValue();
            searchMapdate['page_size'] = 5;
            pick_up_list_ajax.OnSucceed
            (
                function (result) {
                    if (result != null && result['error_code'] == 0) {
                        // 给自提点列表绑定数据
                        pick_up_list_ajax_succeed(result);

                        // 地图绑定数据
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
                            baiduAPI.setCallBackFunc(function (pick_up_id) { m_rpt_pick_up_list.setValue(pick_up_id); });
                            baiduAPI.showPickUpInMap(result);
                        }
                        pick_up_list_result_cache = result["pickupsiteinfo"];
                        $S("pick_up_detail_address");
                    } else {
                        changePageStatus(result);
                        $H("pick_up_detail_address");
                    }
                }
            );
            pick_up_list_ajax.invokeServer(searchMapdate, 'POST', false);

        }, m_city_name);
    };

    var pick_up_list_ajax_succeed = function (result) {
        if (result["pickupsiteinfo"] == null || result["pickupsiteinfo"].length == 0) {
            return;
        }
        m_rpt_pick_up_list.DataSource = result['pickupsiteinfo'];
        m_rpt_pick_up_site_info.OnItemDataBinding = function (dataItem, obj_tpl) {
            var text = dataItem['name'];
            if (text != null && text.length > 37) {
                dataItem['name'] = text.substring(0, 37) + '...';
            }
        };
        m_rpt_pick_up_list.DataBind();
        //如果用户已经选过自提 或者 地址簿有自提点信息，那么就选中自提点
        if (selected_pick_up.id > 0) {
            m_rpt_pick_up_list.setValue(selected_pick_up.id);
        }
        //分页展示
        $("#pickup_numer").html(result['record_count']);
        $("#sum_pickup_page").html('&frasl;&nbsp;' + result['page_count']);
        $("#cur_pickup_page").html(result['page_index']);

        var pageIndex = parseInt(result['page_index']);
        var lastPageIndex = parseInt(result['page_count']);
        if (pageIndex == 1) {
            $("#pick_up_prev").attr("class", "prev_lastpage");
        } else {
            $("#pick_up_prev").attr("class", "previous");
        }
        if (pageIndex == lastPageIndex) {
            $("#pick_up_next").attr("class", "next_lastpage");
        }
        else {
            $("#pick_up_next").attr("class", "next");
        }
        //给“上一页”绑定事件
        $("#pick_up_prev").unbind("click").bind("click", function () {
            pickup_page_index = parseInt($("#cur_pickup_page").html());
            if (pickup_page_index == 1) {
                return;
            }
            else {
                pickup_page_index -= 1;
            }
            searchMapClick();
        });
        //给“下一页”绑定事件
        $("#pick_up_next").unbind("click").bind("click", function () {
            pickup_page_index = parseInt($("#cur_pickup_page").html());
            if (pickup_page_index == parseInt(($("#sum_pickup_page").html().substring(7)))) {
                return;
            }
            else {
                pickup_page_index += 1;
            }
            searchMapClick();
        });
    };

    var showBindPopupPickUpInfo = function () {
        var pickUpId = m_rpt_pick_up_list.getValue();
        for (var i = 0; i < pick_up_list_result_cache.length; i++) {
            if (pick_up_list_result_cache[i]["id"] == pickUpId) {
                var pickup = pick_up_list_result_cache[i];
                selected_pick_up.id = pickup["id"];
                selected_pick_up.name = pickup["name"];
                selected_pick_up.address = pickup["address"];
                selected_pick_up.tel = pickup["contact_tel"];
                if (is_support_baidu_map == 1) {
                    baiduAPI.resetMapCenterAndZoom();
                    baiduAPI.showPickUpDetailWindow(pickUpId);
                }
            }
        }
    }
}