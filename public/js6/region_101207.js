//#region region
function Region(div_region_id,m_order_id,prefix,type) {
    //var m_order_sequence_id = m_order_id;
    //var array = div_region_id.split('_');
    var CHINA_REGION_ID = 9000;
    var RESET_DROPDOWN = 0;
    var REGION_ICON_WARN = "<span class='icon icon-warn'></span>";
    var REGION_ERROR_MSG = "请您选择完整的收货地址信息";
    var ddlCountry = null;
    var ddlProvince = null;
    var ddlCity = null;
    var ddlTown = null;
    var ddlQuarter = null;
    var sel_province = null;
    var sel_city = null;
    var sel_town = null;
    var sel_quarter = null;
    var div_country_province_city = null;
    var span_region_id_valid_msg = null;

    //0-添加   1-编辑
    if (type == 0) {
        ddlCountry = new DropDownList(prefix + '_sel_country');
        ddlProvince = new DropDownList(prefix + '_sel_province');
        ddlCity = new DropDownList(prefix + '_sel_city');
        ddlTown = new DropDownList(prefix + '_sel_town');
        ddlQuarter = new DropDownList(prefix + '_sel_quarter');

        sel_province = $1(prefix + '_sel_province');
        sel_city = $1(prefix + '_sel_city');
        sel_town = $1(prefix + '_sel_town');
        sel_quarter = $1(prefix + '_sel_quarter');
        div_country_province_city = $1("div_country_province_city");
        span_region_id_valid_msg = $("#span_region_id_valid_msg");
    }
    else if (type == 1) {
        ddlCountry = new DropDownList(prefix + '_sel_country_edit');
        ddlProvince = new DropDownList(prefix + '_sel_province_edit');
        ddlCity = new DropDownList(prefix + '_sel_city_edit');
        ddlTown = new DropDownList(prefix + '_sel_town_edit');
        ddlQuarter = new DropDownList(prefix + '_sel_quarter_edit');

        sel_province = $1(prefix + '_sel_province_edit');
        sel_city = $1(prefix + '_sel_city_edit');
        sel_town = $1(prefix + '_sel_town_edit');
        sel_quarter = $1(prefix + '_sel_quarter_edit');
        div_country_province_city = $1("div_country_province_city");
        span_region_id_valid_msg = $("#span_region_id_valid_msg_edit");
    }
    else if (type == 2)
    {
        ddlCountry = new DropDownList(prefix + '_sel_country_' + m_order_id);
        ddlProvince = new DropDownList(prefix + '_sel_province_' + m_order_id);
        ddlCity = new DropDownList(prefix + '_sel_city_' + m_order_id);
        ddlTown = new DropDownList(prefix + '_sel_town_' + m_order_id);
        ddlQuarter = new DropDownList(prefix + '_sel_quarter_' + m_order_id);

        sel_province = $1(prefix + '_sel_province_' + m_order_id);
        sel_city = $1(prefix + '_sel_city_' + m_order_id);
        sel_town = $1(prefix + '_sel_town_' + m_order_id);
        sel_quarter = $1(prefix + '_sel_quarter_' + m_order_id);
        div_country_province_city = $1("div_country_province_city_" + m_order_id);
        span_region_id_valid_msg = $("#span_region_id_valid_msg_" + m_order_id);
    }



    //合约机证件所在地
    var ddlCertProvince = new DropDownList('sel_cert_province');
    var ddlCertCity = new DropDownList('sel_cert_city');


    var region_ajax = new Ajax('/consignee/findRegion');
    var regions_cache = new Object();
    var cert_regions_cache = new Object();
    var is_town_id_check = true;
    var is_quarter_id_check = true;
    var has_special_town = false;
    var province_parent_id;
    var city_parent_id;
    var town_parent_id;
    var quarter_parent_id;
    var is_directly_control_city;
    var m_order_type = 0;
    var m_shop_id = 0;
    var m_order_products_type = 0;

    ddlCountry.DataTextField = ddlProvince.DataTextField = ddlCity.DataTextField = ddlTown.DataTextField = ddlQuarter.DataTextField = ddlCertProvince.DataTextField = ddlCertCity.DataTextField = 'name';
    ddlCountry.DataValueField = ddlProvince.DataValueField = ddlCity.DataValueField = ddlTown.DataValueField = ddlQuarter.DataValueField = ddlCertProvince.DataValueField = ddlCertCity.DataValueField = 'id';

    var region_ajax_succeed = function (control, parent_id, result, is_refresh) {
        if (result != null && result['error_code'] == 0) {
            var text = '请选择';
            if (control == ddlProvince) {
                province_parent_id = parent_id;
                //text = '请选择省';
            }
            else if (control == ddlCity) {
                city_parent_id = parent_id;
                //text = '请选择市';
            }
            else if (control == ddlTown) {

                town_parent_id = parent_id;
                //text = '请选择区';
            }
            else if (control == ddlQuarter) {
                if (sel_quarter == null) {
                    return;
                }
                quarter_parent_id = parent_id;
                //text = '请选择';
            }

            if (is_refresh && result["regions"]!=null && result["regions"].length > 0) {
                if (parent_id != -1) {
                    result['regions'].unshift({ 'name': text, 'id': '0', 'zip_format': '', 'phone_number_prefix': '' });
                }

                //五级城市支持货到付款的地区加星号
                if (control == ddlQuarter) {
                    var len = result["regions"].length;
                    for (var i = 0; i < len; i++) {
                        if (result["regions"][i]["is_cod"] == 1) {
                            result["regions"][i]["name"] = result["regions"][i]["name"] + "*";
                        }
                    }
                }

                regions_cache[parent_id] = result;
            }

            control.DataSource = result['regions'];
            control.DataBind();
        }
    };
    //证件地址相关
    var cert_region_ajax_succeed = function (control, parent_id, result, is_refresh) {
        if (result != null && result['errorCode'] == 0) {
            if (control == ddlProvince)
                province_parent_id = parent_id;
            else if (control == ddlCity)
                city_parent_id = parent_id;
            else if (control == ddlTown)
                town_parent_id = parent_id;
            else if (control == ddlCertProvince)
                cert_province_parent_id = parent_id;
            else if (control == ddlCertCity)
                cert_city_parent_id = parent_id;

            if (is_refresh && result["regions"].length > 0) {
                if (parent_id != -1)
                    result['regions'].unshift({ 'name': '请选择', 'id': '0', 'zip_format': '' });

                cert_regions_cache[parent_id] = result;
            }
            if (result["regions"].length == 0) {
                result['regions'].push({ 'name': '请选择', 'id': '0', 'zip_format': '' });
            }

            control.DataSource = result['regions'];
            control.DataBind();
        }
    };
    //绑定证件地址
    var bindCertDdlControl = function (ddl_control, parent_id) {
        if (parent_id == 0) {
            ddl_control.DataSource = [{ 'name': '--------', 'id': '0', 'zip_format': '', 'phone_number_prefix': '' }];
            ddl_control.DataBind();
            return;
        }
        var cache_result = cert_regions_cache[parent_id];
        if (cache_result != null && cache_result['errorCode'] == 0) {
            region_ajax_succeed(ddl_control, parent_id, cache_result, false);
            return;
        }
        region_ajax.OnSucceed(
            function (result) {
                cert_region_ajax_succeed(ddl_control, parent_id, result, true);
            }
        );
        region_ajax.OnTimeout(
		    function () {
		        region_ajax.Abort();
		    }
        );
        region_ajax.invokeServer('parent_id=' + parent_id, 'POST', false);
    };

    var bindDdlControl = function (ddl_control, parent_id) {
        var text = '请选择';
        if (ddl_control == ddlProvince) {
            //text = '请选择省';
        }
        else if (ddl_control == ddlCity) {
            //text = '请选择市';
        }
        else if (ddl_control == ddlTown) {
            //text = '请选择区';
        }
        else if (ddl_control == ddlQuarter) {
            if (sel_quarter == null) {
                return;
            }
            //text = '请选择';
        }

        if (parent_id == 0) {
            ddl_control.DataSource = [{ 'name': text, 'id': '0', 'zip_format': '', 'phone_number_prefix': '' }];
            ddl_control.DataBind();
            return;
        }
        var cache_result = regions_cache[parent_id];
        if (cache_result != null && cache_result['errorCode'] == 0) {
            region_ajax_succeed(ddl_control, parent_id, cache_result, false);
            return;
        }
        region_ajax.OnSucceed
        (
            function (result) {
                region_ajax_succeed(ddl_control, parent_id, result, true);
            }
        );
        region_ajax.OnTimeout
        (
		    function () {
		        region_ajax.Abort();
		    }
        );
        //region_ajax.invokeServer('parentId=' + parent_id + '&orderType=' + m_order_type + '&shopId=' + m_shop_id + '&order_products_type=' + m_order_products_type, 'POST', false);
        region_ajax.invokeServer('parentId=' + parent_id + '&orderType=' + m_order_type + '&shopId=' + m_shop_id, 'POST', false);// + '&order_products_type=' + m_order_products_type
    };

    var ddlCountry_SelectedIndexChanged = function () {
        var country_id = ddlCountry.getValue();
        bindDdlControl(ddlProvince, country_id);
        if (country_id == CHINA_REGION_ID) {
            bindDdlControl(ddlProvince, country_id);
            sel_province.className = 'select-h22';
            sel_city.className = 'select-h22';
            sel_town.className = 'select-h22';
            is_town_id_check = true;
        }
        else {
            sel_province.className = 'hide';
            sel_city.className = 'hide';
            sel_town.className = 'hide';
        }

        setControlClass(sel_quarter, 'hide');
        bindDdlControl(ddlCity, 0);
        bindDdlControl(ddlTown, 0);
        bindDdlControl(ddlQuarter, 0);

        var span_ship_name_valid_msg = $1("span_ship_name_valid_msg");
        var span_ship_address_valid_msg = $1("span_ship_address_valid_msg");
        var txt_ship_name = $1("txt_ship_name");
        var txt_ship_address = $1("txt_ship_address");
        //国外的地址
        if (country_id != 9000 && country_id != 0) {

            //if (txt_ship_name && txt_ship_name.value == "") {
            //    span_ship_name_valid_msg.style.display = 'inline-block';
            //    span_ship_name_valid_msg.className = 'help-inline color-orange';
            //    span_ship_name_valid_msg.innerHTML = '请用英文填写收货人姓名';
            //}
            ////如果选了国外地址，那么以前的错误提示不是针对国外地址的，都隐藏掉
            //if (span_ship_name_valid_msg.style.display == 'inline-block' && span_ship_name_valid_msg.innerHTML != '请用英文填写收货人姓名') {
            //    span_ship_name_valid_msg.style.display = 'none';
            //    span_ship_name_valid_msg.className = 'hide';
            //}
            //if (txt_ship_address && txt_ship_address.value == "") {
            //    span_ship_address_valid_msg.style.display = 'inline-block';
            //    span_ship_address_valid_msg.className = 'help-inline color-orange';
            //    span_ship_address_valid_msg.innerHTML = '请用英文填写详细地址信息，至少五个字母';
            //}
            ////如果选了国外地址，那么以前的错误提示不是针对国外地址的，都隐藏掉
            //if (span_ship_address_valid_msg.style.display == 'inline-block' && span_ship_address_valid_msg.innerHTML != '请用英文填写详细地址信息，至少五个字母') {
            //    span_ship_address_valid_msg.style.display = 'none';
            //    span_ship_address_valid_msg.className = 'hide';
            //}

            span_ship_name_valid_msg.style.display = 'inline-block';
            span_ship_name_valid_msg.className = 'help-inline color-orange';
            span_ship_name_valid_msg.innerHTML = '请用英文填写收货人姓名';

            span_ship_address_valid_msg.style.display = 'inline-block';
            span_ship_address_valid_msg.className = 'help-inline color-orange';
            span_ship_address_valid_msg.innerHTML = '请用英文填写详细地址信息，至少五个字母';
        }
        else {

            var reg = /英文/;

            //收货人姓名，如果选了国内地址，那么以前的错误提示不是针对国内地址的，都隐藏掉
            var ship_name_msg_content = span_ship_name_valid_msg.innerHTML;
            if (reg.test(ship_name_msg_content)) {
                span_ship_name_valid_msg.style.display = 'none';
                span_ship_name_valid_msg.className = 'hide';
            }

            //详细地址，如果选了国内地址，那么以前的错误提示不是针对国内地址的，都隐藏掉
            var ship_address_msg_content = span_ship_address_valid_msg.innerHTML;
            if (reg.test(ship_address_msg_content)) {
                span_ship_address_valid_msg.style.display = 'none';
                span_ship_address_valid_msg.className = 'hide';
            }
        }
    };

    var ddlProvince_SelectedIndexChanged = function () {
        var province_id = ddlProvince.getValue();
        var province_index = ddlProvince.getSelectedIndex();
        if (ddlProvince.DataSource[province_index]) {
            is_directly_control_city = ddlProvince.DataSource[province_index]["is_directly_control_city"];
        }
        bindDdlControl(ddlCity, province_id);

        if (is_directly_control_city == 1) {
            sel_city.className = 'hide';
        } else {
            sel_city.className = 'select-h22';
        }


        setControlClass(sel_quarter, 'hide');
        bindDdlControl(ddlTown, 0);
        bindDdlControl(ddlQuarter, 0);

        if (ddlCity.DataSource.length == 2) {
            ddlCity.setValue(ddlCity.DataSource[1].id);
            ddlCity_SelectedIndexChanged();
        }
    };

    var ddlCity_SelectedIndexChanged = function () {
        var city_id = ddlCity.getValue();
        bindDdlControl(ddlTown, city_id);
        if (ddlTown==null || ddlTown.DataSource==null || ddlTown.DataSource.length == 0 || ddlTown.DataSource.length == 1) {
            sel_town.className = 'hide';
            is_town_id_check = false;
        }
        else {
            sel_town.className = 'select-h22';
            is_town_id_check = true;
        }

        setControlClass(sel_quarter, 'hide');
        is_quarter_id_check = false;
        bindDdlControl(ddlQuarter, 0);
    };

    var ddlTown_SelectedIndexChanged = function () {
        var town_id = ddlTown.getValue();
        var town_index = ddlTown.getSelectedIndex();
        var town_level = ddlTown.DataSource[town_index]["level"];
        bindDdlControl(ddlQuarter, town_id);
        if (ddlQuarter == null || ddlQuarter.DataSource == null || ddlQuarter.DataSource.length == 0 || ddlQuarter.DataSource.length == 1) {
            setControlClass(sel_quarter, 'hide');
            is_quarter_id_check = false;
        }
        else {
            setControlClass(sel_quarter, 'select-h22');
            is_quarter_id_check = true;
        }

        if (town_level == 5) {
            has_special_town = true;
        }
        else {
            has_special_town = false;
        }
    };

    var ddlQuarter_SelectedIndexChanged = function () {
        var quarter_id = ddlQuarter.getValue();
    };
    //证件地址：二级城市
    var ddlCertProvince_SelectedIndexChanged = function () {

        var cert_province_id = ddlCertProvince.getValue();
        bindCertDdlControl(ddlCertCity, cert_province_id);

        if (ddlCertProvince.DataSource.length == 2) {
            ddlCertProvince.setValue(ddlCertProvince.DataSource[1].id);
            ddlCertCity_SelectedIndexChanged();
        }
    };
    //证件地址：三级城市
    var ddlCertCity_SelectedIndexChanged = function () {
        var cert_city_id = ddlCertCity.getValue();
    };

    function setDivCountryProvinceCityDisplay(region_name) {
        var region_name;
        var country_name = ddlCountry.getText();
        switch (region_name) {
            case "country":
                region_name = country_name + "，";
                break;
            case "province":
                region_name = country_name + "，" + ddlProvince.getText() + "，";
                break;
            case "city":
                region_name = country_name + "，" + ddlProvince.getText() + "，" + ddlCity.getText() + "，";
                break;
            default:
                region_name = getRegionName();
                break;
        }
        div_country_province_city.innerHTML = region_name;
        div_country_province_city.className = '';
    };

    ddlCountry.OnSelectedIndexChanged = ddlCountry_SelectedIndexChanged;
    ddlProvince.OnSelectedIndexChanged = ddlProvince_SelectedIndexChanged;
    ddlCity.OnSelectedIndexChanged = ddlCity_SelectedIndexChanged;
    ddlTown.OnSelectedIndexChanged = ddlTown_SelectedIndexChanged;
    ddlQuarter.OnSelectedIndexChanged = ddlQuarter_SelectedIndexChanged;
    //证件地址相关
    ddlCertProvince.OnSelectedIndexChanged = ddlCertProvince_SelectedIndexChanged;
    //证件地址相关
    ddlCertCity.OnSelectedIndexChanged = ddlCertCity_SelectedIndexChanged;

    this.setValue = function (country_id, province_id, city_id, town_id, quarter_id, order_type, shop_id, order_products_type) {
        m_order_type = order_type;
        m_shop_id = shop_id;
        m_order_products_type = order_products_type;

        province_id = addressInfoCheck(province_id);
        city_id = addressInfoCheck(city_id);
        town_id = addressInfoCheck(town_id);
        quarter_id = addressInfoCheck(quarter_id);

        span_region_id_valid_msg.html("");
        span_region_id_valid_msg.hide();


        bindDdlControl(ddlCountry, -1);
        if (country_id == 0) {
            country_id = CHINA_REGION_ID;
        }
        ddlCountry.setValue(country_id);
        //lpf
        country_id = ddlCountry.getValue();
        if (country_id != CHINA_REGION_ID) {
            sel_province.className = 'hide';
            sel_city.className = 'hide';
            sel_town.className = 'hide';
        }
        else {
            sel_province.className = 'select-h22';
            sel_city.className = 'select-h22';
            sel_town.className = 'select-h22';
        }

        setControlClass(sel_quarter, 'hide');
        is_quarter_id_check = false;

        bindDdlControl(ddlProvince, country_id);
        bindDdlControl(ddlCity, province_id);
        if (province_id != 0) {
            ddlProvince.setValue(province_id);
            if (country_id == CHINA_REGION_ID) {
                ddlProvince_SelectedIndexChanged();
            }
        }

        bindDdlControl(ddlTown, city_id);
        if (city_id != 0) {
            if (ddlTown==null || ddlTown.DataSource==null || ddlTown.DataSource.length == 0 || ddlTown.DataSource.length == 1) {
                sel_town.className = 'hide';
                is_town_id_check = false;
            }
            else {
                sel_town.className = 'select-h22';
                is_town_id_check = true;
            }

            ddlCity.setValue(city_id);
        }


        //三级城市下设五级城市特殊处理（显示时还原）
        if (city_id == town_id && town_id != quarter_id && quarter_id != 0) {
            town_id = quarter_id;
        }

        bindDdlControl(ddlQuarter, town_id);
        if (town_id != 0) {
            if (ddlQuarter.DataSource == null || ddlQuarter.DataSource.length == 0 || ddlQuarter.DataSource.length == 1) {
                setControlClass(sel_quarter, 'hide');
                is_quarter_id_check = false;
            }
            else {
                setControlClass(sel_quarter, 'select-h22');
                is_quarter_id_check = true;
            }

            ddlTown.setValue(town_id);
            var town_index = ddlTown.getSelectedIndex();


            if (town_index > 0) {
                var town_level = 0;
                if (ddlTown.DataSource[town_index]) {
                    town_level = ddlTown.DataSource[town_index]["level"];
                }
                if (town_level == 5) {
                    has_special_town = true;
                }
                else {
                    has_special_town = false;
                }
            }
            else {
                has_special_town = false;
            }
        }

        if (quarter_id != 0) {
            ddlQuarter.setValue(quarter_id);
        }
    };

    this.getCountryId = function () {
        var country_id = ddlCountry.getValue();

        if (!isNaN(country_id)) {
            return country_id;
        }
        else {
            return 0;
        }
    };

    this.getValue = function () {
        var country_id = ddlCountry.getValue();
        if (country_id == '' || country_id == '0') {
            span_region_id_valid_msg.html(REGION_ICON_WARN + REGION_ERROR_MSG);
            span_region_id_valid_msg.css("display", "inline-block");
            span_region_id_valid_msg.attr("class", "help-inline help-inline-error");
            return false;
        }
        else {
            span_region_id_valid_msg.html("");
        }

        if (country_id == CHINA_REGION_ID) {
            var province_id = ddlProvince.getValue();
            var city_id = ddlCity.getValue();
            var town_id = ddlTown.getValue();
            var quarter_id = ddlQuarter.getValue();

            if (!is_town_id_check) {
                town_id = city_id;
            }
            if (!is_quarter_id_check) {
                quarter_id = town_id;
            }

            if (province_id == '' || province_id == '0') {
                span_region_id_valid_msg.html(REGION_ICON_WARN + REGION_ERROR_MSG);
                span_region_id_valid_msg.css("display", "inline-block");
                span_region_id_valid_msg.attr("class", "help-inline help-inline-error");
                return false;
            }
            else {
                span_region_id_valid_msg.html("");
            }

            if (city_id == '' || city_id == '0') {
                span_region_id_valid_msg.html(REGION_ICON_WARN + REGION_ERROR_MSG);
                span_region_id_valid_msg.css("display", "inline-block");
                span_region_id_valid_msg.attr("class", "help-inline help-inline-error");
                return false;
            }
            else {
                span_region_id_valid_msg.html("");
            }

            if (is_town_id_check && (town_id == '' || town_id == '0')) {
                span_region_id_valid_msg.html(REGION_ICON_WARN + REGION_ERROR_MSG);
                span_region_id_valid_msg.css("display", "inline-block");
                span_region_id_valid_msg.attr("class", "help-inline help-inline-error");
                return false;
            }
            else {
                span_region_id_valid_msg.html("");
                span_region_id_valid_msg.hide();
            }

            if (is_quarter_id_check && (quarter_id == '' || quarter_id == '0')) {
                span_region_id_valid_msg.html(REGION_ICON_WARN + REGION_ERROR_MSG);
                span_region_id_valid_msg.css("display", "inline-block");
                span_region_id_valid_msg.attr("class", "help-inline help-inline-error");
                return false;
            }
            else {
                span_region_id_valid_msg.html("");
                //span_region_id_valid_msg.css("class", "hide");
                span_region_id_valid_msg.hide();
            }

            if (is_town_id_check) {
                if ((province_parent_id != country_id) || (city_parent_id != province_id) || (town_parent_id != city_id)) {
                    span_region_id_valid_msg.html(REGION_ICON_WARN + '省市县不匹配！');
                    span_region_id_valid_msg.css("display", "inline-block");
                    span_region_id_valid_msg.attr("class", "help-inline help-inline-error");
                    return false;
                }
                else {
                    if (is_quarter_id_check) {
                        if (quarter_parent_id != town_id) {
                            span_region_id_valid_msg.html(REGION_ICON_WARN + '省市县不匹配！');
                            span_region_id_valid_msg.css("display", "inline-block");
                            span_region_id_valid_msg.attr("class", "help-inline help-inline-error");
                            return false;
                        }
                    }
                    span_region_id_valid_msg.html("");
                    //span_region_id_valid_msg.css("class", "hide");
                    span_region_id_valid_msg.hide();
                }
            }
            else {
                if ((province_parent_id != country_id) || (city_parent_id != province_id)) {
                    span_region_id_valid_msg.html(REGION_ICON_WARN + '省市不匹配！');
                    span_region_id_valid_msg.css("display", "inline-block");
                    span_region_id_valid_msg.attr("class", "help-inline help-inline-error");
                    return false;
                }
                else {
                    span_region_id_valid_msg.html("");
                    // span_region_id_valid_msg.css("class", "hide");
                    span_region_id_valid_msg.hide();
                }

            }

            //三级城市下设五级城市特殊处理
            if (has_special_town == true) {
                return { 'country_id': country_id, 'province_id': province_id, 'city_id': city_id, 'town_id': city_id, 'quarter_id': town_id };
            }
            else {
                return { 'country_id': country_id, 'province_id': province_id, 'city_id': city_id, 'town_id': town_id, 'quarter_id': quarter_id };
            }
        }
        else {
            return { 'country_id': country_id, 'province_id': country_id, 'city_id': country_id, 'town_id': country_id, 'quarter_id': country_id }
        }
    };

    this.getCityZipFormat = function () {
        var index = ddlCity.getSelectedIndex();
        if (index < 0) {
            return '';
        }
        return ddlCity.DataSource[index]['zip_format'];
    };

    this.getCityProperty = function () {
        var index = ddlCity.getSelectedIndex();
        if (index < 0) {
            return null;
        }
        return ddlCity.DataSource[index];
    };

    this.getText = function () {
        var region_names = new Object();
        region_names['country_name'] = ddlCountry.getText();
        region_names['province_name'] = ddlProvince.getText();
        region_names['city_name'] = ddlCity.getText();
        region_names['town_name'] = ddlTown.getText();
        region_names['quarter_name'] = ddlQuarter.getText();
        return region_names;
    };

    var getRegionName = function () {
        var region_name = "";
        var country_id = ddlCountry.getValue();
        var town_id = ddlTown.getValue();
        var country_name = ddlCountry.getText();

        if (country_id == CHINA_REGION_ID) {
            var province_name = ddlProvince.getText();
            var city_name = ddlCity.getText().replace("*", '').trim();

            if (!is_town_id_check) {
                if (sel_city.className == "hide") {
                    region_name = country_name + "，" + province_name;
                } else {
                    region_name = country_name + "，" + province_name + "，" + city_name;
                }
            }
            else {
                var town_name = ddlTown.getText();
                town_name = town_name.replace("*", '').trim();
                if (sel_city.className == "hide") {
                    region_name = country_name + "，" + province_name + "，" + town_name;
                } else {
                    region_name = country_name + "，" + province_name + "，" + city_name + "，" + town_name;
                }

                if (is_quarter_id_check) {
                    var quarter_name = ddlQuarter.getText();
                    quarter_name = quarter_name.replace("*", '').trim();
                    region_name = region_name + "，" + quarter_name;
                }
            }
        }
        else {
            region_name = country_name;
        }

        return region_name + "，";
    };

    this.getCountryProvinceCity = function () {
        return getRegionName();
    };

    this.isSelected = function () {
        var country_id = ddlCountry.getValue();
        if (country_id != '' && country_id != '0' && country_id != '9000') {
            return true;
        }
        var province_id = ddlProvince.getValue();
        if (province_id != '' && province_id != '0') {
            return true;
        }
        var city_id = ddlCity.getValue();
        if (city_id != '' && city_id != '0') {
            return true;
        }
        var town_id = ddlTown.getValue();
        if (town_id != '' && town_id != '0') {
            return true;
        }
        var quarter_id = ddlQuarter.getValue();
        if (quarter_id != '' && quarter_id != '0') {
            return true;
        }
        return false;
    };

    var setControlClass = function (control, class_name) {
        if (control != null) {
            control.className = class_name;
        }
    };

    this.isTownHidden = function () {
        if (sel_town.className == 'hide') {
            return true;
        }
        else {
            return false;
        }
    };

    this.isQuarterHidden = function () {
        if (sel_quarter.className == 'hide') {
            return true;
        }
        else {
            return false;
        }
    };

    var addressInfoCheck = function (address_id, illegal_value, default_value) {

        if (!arguments[1]) illegal_value = CHINA_REGION_ID;
        if (!arguments[2]) default_value = RESET_DROPDOWN;

        return address_id == illegal_value ? default_value : address_id;
    };

    this.setCertValue = function (cert_province_id, cert_city_id) {
        bindCertDdlControl(ddlCertProvince, 9000);
        bindCertDdlControl(ddlCertCity, cert_province_id);
        if (cert_province_id != 0)
            ddlCertProvince.setValue(cert_province_id);
        if (cert_city_id != 0)
            ddlCertCity.setValue(cert_city_id);
        else
            bindCertDdlControl(ddlCertCity, cert_province_id);
    };

    this.getCertValue = function () {
        var cert_province_id = ddlCertProvince.getValue();
        var cert_city_id = ddlCertCity.getValue();

        if (cert_province_id == '' || cert_province_id == '0') {
            $1('cert_address_valid_msg').innerHTML = '<span class="icon icon-warn"></span>请选择省份！';
            //$1('cert_address_valid_msg').style.visibility = 'visible';
            return false;
        }
        else {
            $1('cert_address_valid_msg').innerHTML = '';
        }

        if (cert_city_id == '' || cert_city_id == '0') {
            $1('cert_address_valid_msg').innerHTML = '<span class="icon icon-warn"></span>请选择城市！';
            //$1('cert_address_valid_msg').style.visibility = 'visible';
            return false;
        }
        else {
            $1('cert_address_valid_msg').innerHTML = '';
        }

        if (cert_city_parent_id != cert_province_id) {
            $1('cert_address_valid_msg').innerHTML = '<span class="icon icon-warn"></span>省市不匹配！';
            //$1('cert_address_valid_msg').style.visibility = 'visible';
            return false;
        }
        else {
            $1('cert_address_valid_msg').innerHTML = '';
        }

        return { 'cert_province_id': cert_province_id, 'cert_city_id': cert_city_id };
    };
};
//#endregion
