﻿function ConsigneeCommon() {
    //收货人姓名 相关
    this.txt_ship_name_keyup = function (m_sel_region, ship_name, ship_name_msg) {
        var txtObj = $("#" + ship_name);
        var msgObj = $("#" + ship_name_msg);
        var country_id = m_sel_region.getCountryId();
        if (country_id != 9000 && country_id != 0) {
            if ($.trim(txtObj.val()) == '') {
                msgObj.show();
                msgObj.css("display", "inline-block");
                msgObj.attr("class", "help-inline color-orange");
                msgObj.text("请用英文填写收货人姓名");
            }
        }
        else {
            if (msgObj.attr("class") == "help-inline color-orange") {
                msgObj.hide();
            }
        }
    };
    this.txt_ship_name_check = function (ship_name, ship_name_msg, m_sel_region) {
        var txtObj = $("#" + ship_name);
        var msgObj = $("#" + ship_name_msg);
        msgObj.html("");
        var succeed = true;
        succeed = requireFieldValid(ship_name, ship_name_msg, CONSIGNEE_ICON_WARN + MSG_SHIP_NAME_EMPTY);

        if (succeed) {
            var ship_name_val = $.trim(txtObj.val());
            var badword = '<';
            var char = '';
            for (i = 0; i < ship_name_val.length; i++) {
                char = ship_name_val.charAt(i);
                if (badword.indexOf(char) >= 0) {
                    succeed = false;
                    break;
                }
            }
            if (succeed) {
                msgObj.html("");
            }
            else {
                msgObj.html(CONSIGNEE_ICON_WARN + MSG_INVALID_CHAR_ERROR.replace('{0}', char));
            }
        }
        if (succeed == true) {
            var country_id = m_sel_region.getCountryId();
            if (country_id != 9000 && country_id != 0) {
                succeed = nameEnglishCheck(ship_name, ship_name_msg);
            }
        }

        if (succeed) {
            msgObj.hide();
        }
        else {
            msgObj.show();
            msgObj.attr("class", "help-inline help-inline-error");
            msgObj.css("display", "inline-block");
        }
        return succeed;
    };
	this.txt_identity_num_check = function (ship_name, ship_name_msg, data) {
        var succeed = false;
        var txtObj = $("#" + ship_name);
        var msgObj = $("#" + ship_name_msg);
        msgObj.html("");
        if (data && data['conflic_code'] == 727) {
            data['conflic_code'] = 0;
            succeed = false;
        } else {
            var reg = /^\d{17}[\d\w]{1}$/;
            if (reg.test(txtObj.val())) {
                succeed = true;
            }
        }

        if (succeed) {
            msgObj.hide();
        }
        else {
            msgObj.html(CONSIGNEE_ICON_WARN + MSG_IDENTITY_NUM_ERROR);
            msgObj.show();
            msgObj.attr("class", "help-inline help-inline-error");
            msgObj.css("display", "inline-block");
        }
        return succeed;
    };
    var nameEnglishCheck = function (ship_name, ship_name_msg) {
        var txtObj = $("#" + ship_name);
        var msgObj = $("#" + ship_name_msg);
        //校验国外的收货人姓名：1.不能含有中文 2.不能全为数字 3.必须有英文
        var ship_name_val = $.trim(txtObj.val());
        var flag = true;
        var reg = /([\u4e00-\u9fa5])|(^\d+$)|(^[^a-zA-Z]+$)/;
        if (reg.test(ship_name_val)) {
            flag = false;
            msgObj.html(CONSIGNEE_ICON_WARN + MSG_SHIP_NAME_EMPTY2);
        }
        return flag;
    };


	this.txt_ship_mb_tel_focus = function(obj){
		//当手机号或者是固定电话获得焦点时，清空内容  2016-5-16屏蔽敏感信息需求
		if(obj){
			$(obj).val("");
		}
	}
	
    //手机号和电话 相关
    this.txt_ship_mb_tel_check = function (ship_mb, ship_tel, ship_mb_msg, regionObj, order_type,real_ship_mb_val,real_ship_tel_val) {
        var mbTxtObj = $("#" + ship_mb);
        var telTxtObj = $("#" + ship_tel);
        var msgObj = $("#" + ship_mb_msg);
        msgObj.html("");
        var ship_mb_val = $.trim(mbTxtObj.val());
        var ship_tel_val = $.trim(telTxtObj.val());
        var succeed = true;
        var region = regionObj.getValue();
		
        // author chenshuai  add if
        if (region != null && (region['province_id'] == 171 || region['province_id'] == 172 || region['province_id'] == 173)) {
            msgObj.show();
            msgObj.html(MSG_MB_TEL_GAT);
            msgObj.css("display", "inline-block");
            msgObj.attr("class", "help-inline color-orange");
            if (ship_mb_val == '' && ship_tel_val == '') {
                return false;
            }
            //实物礼品卡 必须要输入手机号
            if (order_type == 51) {
                if (ship_mb_val == '') {
                    msgObj.show();
                    msgObj.html(CONSIGNEE_ICON_WARN + MSG_PDDMONEY_SHIP_TEL_EMPTY);
                    msgObj.css("display", "inline-block");
                    msgObj.attr("class", "help-inline help-inline-error");

                }
            }
            if (ship_mb_val != '') {
                var region = regionObj.getValue();
                if (region != null && region['country_id'] == 9000) {
					if(ConsigneeCommon.isContainAterisk(ship_mb_val)){
						succeed = regularExpressionValid(real_ship_mb_val, REGEX_SHIP_TEL, ship_mb_msg, MSG_MB_TEL_GAT);
					}else{
						succeed = regularExpressionValid(ship_mb_val, REGEX_SHIP_TEL, ship_mb_msg, MSG_MB_TEL_GAT);
					}
                    
                }
            }
            if (ship_tel_val != '') {
				if(ConsigneeCommon.isContainAterisk(ship_tel_val)){
					succeed = succeed && regularExpressionValid(real_ship_tel_val, REGEX_SHIP_TEL, ship_mb_msg, MSG_MB_TEL_GAT);
				}else{
					succeed = succeed && regularExpressionValid(ship_tel_val, REGEX_SHIP_TEL, ship_mb_msg, MSG_MB_TEL_GAT);
				}
                //succeed = succeed && regularExpressionValid(ship_tel, REGEX_SHIP_TEL, ship_mb_msg, MSG_MB_TEL_GAT);
            }
            msgObj.html(MSG_MB_TEL_GAT);
            msgObj.show();
            msgObj.css("display", "inline-block");
            msgObj.attr("class", "help-inline color-orange");

            return succeed;
        }
        else {
            if (ship_mb_val == '' && ship_tel_val == '') {
                msgObj.show();
                msgObj.html(CONSIGNEE_ICON_WARN + MSG_MB_TEL_EMPTY);
                msgObj.css("display", "inline-block");
                msgObj.attr("class", "help-inline help-inline-error");

                return false;
            }
            //实物礼品卡 必须要输入手机号
            if (order_type == 51) {
                if (ship_mb_val == '') {
                    msgObj.show();
                    msgObj.html(CONSIGNEE_ICON_WARN + MSG_PDDMONEY_SHIP_TEL_EMPTY);
                    msgObj.css("display", "inline-block");
                    msgObj.attr("class", "help-inline help-inline-error");

                    return false;
                }
            }
            if (ship_mb_val != '') {
                var region = regionObj.getValue();
                if (region != null && region['country_id'] == 9000) {
					if(ConsigneeCommon.isContainAterisk(ship_mb_val)){
						succeed = regularExpressionValid(real_ship_mb_val, REGEX_SHIP_MB, ship_mb_msg, CONSIGNEE_ICON_WARN + MSG_SHIP_MB_ERROR);
					}else{
						succeed = regularExpressionValid(ship_mb_val, REGEX_SHIP_MB, ship_mb_msg, CONSIGNEE_ICON_WARN + MSG_SHIP_MB_ERROR);
					}
                    //succeed = regularExpressionValid(ship_mb, REGEX_SHIP_MB, ship_mb_msg, CONSIGNEE_ICON_WARN + MSG_SHIP_MB_ERROR);
                }
                else {
					if(ConsigneeCommon.isContainAterisk(ship_mb_val)){
						succeed = regularExpressionValid(real_ship_mb_val, REGEX_SHIP_TEL, ship_mb_msg, CONSIGNEE_ICON_WARN + MSG_SHIP_MB_ERROR);
					}else{
						succeed = regularExpressionValid(ship_mb_val, REGEX_SHIP_TEL, ship_mb_msg, CONSIGNEE_ICON_WARN + MSG_SHIP_MB_ERROR);
					}
                    //succeed = regularExpressionValid(ship_mb, REGEX_SHIP_TEL, ship_mb_msg, CONSIGNEE_ICON_WARN + MSG_SHIP_MB_ERROR);
                }
            }
            if (ship_tel_val != '') {
				if(ConsigneeCommon.isContainAterisk(ship_tel_val)){
					succeed = succeed && regularExpressionValid(real_ship_tel_val, REGEX_SHIP_TEL, ship_mb_msg, CONSIGNEE_ICON_WARN + MSG_SHIP_TEL_ERROR);
				}else{
					succeed = succeed && regularExpressionValid(ship_tel_val, REGEX_SHIP_TEL, ship_mb_msg, CONSIGNEE_ICON_WARN + MSG_SHIP_TEL_ERROR);
				}
                //succeed = succeed && regularExpressionValid(ship_tel, REGEX_SHIP_TEL, ship_mb_msg, CONSIGNEE_ICON_WARN + MSG_SHIP_TEL_ERROR);
            }
            return succeed;
        }
        return succeed;

    };
    //详细地址 相关
    var address_remind_ajax = new Ajax('/consignee/findAddressSuggest');
    var obj_ship_address_prompt_lis = null;
    var ship_address_array_len = 0;

    var bind_ship_address_prompt = function (ship_address_array, o, ship_address_prompt, ship_address, ship_address_msg, regionObj) {
        var txtObj = $("#" + ship_address);
        var msgObj = $("#" + ship_address_msg);
        var promptObj = $1(ship_address_prompt);

        index = -1;
        if (ship_address_array != null) {
            ship_address_array_len = ship_address_array.length;
        } else {
            ship_address_array_len = 0;
        }
        var consigneeCommon = new ConsigneeCommon();
        var li_ck = function (t) { o.value = t.innerHTML; $h(promptObj); consigneeCommon.txt_ship_address_check(ship_address, ship_address_msg, regionObj); };
        var sb = new StringBuilder();
        for (var i = 0; i < ship_address_array_len; i++) {
            sb.append("<li>");
            sb.append(ship_address_array[i]);
            sb.append('</li>');
        }
        promptObj.innerHTML = sb.toString();
        obj_ship_address_prompt_lis = promptObj.childNodes;
        for (var i = 0; i < ship_address_array_len; i++) {
            obj_ship_address_prompt_lis[i].onmouseover = function () { li_c(this); };
            obj_ship_address_prompt_lis[i].onmouseout = function () { li_r(this); };
            obj_ship_address_prompt_lis[i].onclick = function () { li_ck(this); };
        }

        setLocation(promptObj, 80, 23);
        setDimension(promptObj, 440, 200);

        if (ship_address_array_len == 0 || ship_address_array_len == undefined) {
            $h(promptObj);
        }
        else {
            $s(promptObj);
            promptObj.style.height = 'auto';

            document.onclick = function (e) {
                var sender = null;
                if (e) {
                    sender = e.target;
                }
                else if (event) {
                    sender = event.srcElement;
                }
                if (!contains(promptObj, sender) && sender != o) {
                    $h(promptObj);
                    document.onclick = null;
                }
            };
        }
    };
    this.txt_ship_address_keyup = function (o, e, ship_address_prompt, regionObj, ship_address, ship_address_msg) {
        var txtObj = $("#" + ship_address);
        var msgObj = $("#" + ship_address_msg);
        var promptObj = $1(ship_address_prompt);

        var k = null;
        if (e) {
            k = e.keyCode;
        }
        else if (event) {
            k = event.keyCode;
        }

        if (k == 9 || k == 16 || k == 17 || k == 18 || k == 20) {
            return;
        }

        //回车
        if (k == 13) {
            if (index == -1 || promptObj.childNodes == null || promptObj.childNodes.length == 0) {
                return;
            }
            o.value = promptObj.childNodes[index].innerHTML;
            $h(promptObj);
            return;
        }

        //上
        if (k == 38) {
            if (promptObj.childNodes == null || promptObj.childNodes.length == 0) {
                return;
            }
            if (index == -1) {
                index = promptObj.childNodes.length - 1;
            }
            else if (index == 0) {
                li_r(promptObj.childNodes[index]);
                index = promptObj.childNodes.length - 1;
            }
            else {
                li_r(promptObj.childNodes[index]);
                index--;
            }
            li_c(promptObj.childNodes[index]);
            return;
        }

        //下
        if (k == 40) {
            if (promptObj.childNodes == null || promptObj.childNodes.length == 0) {
                return;
            }
            if (index == -1) {
                index = 0;
            }
            else if (index == promptObj.childNodes.length - 1) {
                li_r(promptObj.childNodes[index]);
                index = 0;
            }
            else {
                li_r(promptObj.childNodes[index]);
                index++;
            }
            li_c(promptObj.childNodes[index]);
            return;
        }

        var region_value = null;
        if (!(region_value = regionObj.getValue())) {
            return;
        }

        var keyword = $.trim(txtObj.val());
        if (keyword == '') {
            return;
        }

        //        span_ship_address_valid_msg.style.display = 'none';

        var town_id = region_value['town_id'];

        address_remind_ajax.OnSucceed
        (
            function (result) {
                if (result != null && result['error_code'] == 0) {
                    var ship_address_array = result['addr_results'];
                    bind_ship_address_prompt(ship_address_array, o, ship_address_prompt, ship_address, ship_address_msg, regionObj);

                }
            }
        );

        address_remind_ajax.invokeServer('townId=' + town_id + '&keyword=' + keyword, 'POST', true);

        //国外地址验证
        var country_id = regionObj.getCountryId();
        if (country_id != 9000 && country_id != 0) {
            if ($.trim(txtObj.val()) == '') {

                msgObj.show();
                msgObj.css("display", "inline-block");
                msgObj.attr("class", "help-inline help-inline-error");
                msgObj.text("请用英文填写详细地址信息，至少五个字母");

                //span_ship_address_valid_msg.style.display = 'inline-block';
                //span_ship_address_valid_msg.className = 'help-inline color-orange';
                //span_ship_address_valid_msg.innerHTML = '请用英文填写详细地址信息，至少五个字母';
            }
        }
        else {
            if (msgObj.attr("class") == "help-inline help-inline-error") {
                msgObj.hide();
            }
            //msgObj.attr("class", "hide");
            //if (span_ship_address_valid_msg.className == 'help-inline color-orange') {
            //    span_ship_address_valid_msg.style.display = 'none';
            //    span_ship_address_valid_msg.className = 'hide';
            //}
        }
    };
    var addressEnglishCheck = function (ship_address, ship_address_msg, ship_address_val) {
        var msgObj = $("#" + ship_address_msg);
        var flag = requireFieldValid(ship_address, ship_address_msg, CONSIGNEE_ICON_WARN + MSG_SHIP_ADDRESS_EMPTY2);

        //校验国外的收货地址：1.不能含有中文 2.请用英文填写详细地址信息，至少五个字母
        if (flag == true) {
            var reg = /[\u4e00-\u9fa5]/;
            if (reg.test(ship_address_val)) {
                msgObj.html(CONSIGNEE_ICON_WARN + MSG_SHIP_ADDRESS_EMPTY2);
                flag = false;
            }
        }

        if (flag == true) {
            var reg = /^.*[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*$/;
            if (!reg.test(ship_address_val)) {
                msgObj.html(CONSIGNEE_ICON_WARN + MSG_SHIP_ADDRESS_EMPTY2);
                flag = false;
            }
        }
        return flag;
    };
    var addressChineseCheck = function (ship_address, ship_address_msg, ship_address_val) {
        var msgObj = $("#" + ship_address_msg);
        var flag = requireFieldValid(ship_address, ship_address_msg, CONSIGNEE_ICON_WARN + MSG_SHIP_ADDRESS_EMPTY);

        //校验长度
        if (flag == true) {
            var strlen = ship_address_val.replace(/[^\x00-\xff]/g, '**').length;
            if (strlen < 6) {
                flag = false;
                msgObj.html(CONSIGNEE_ICON_WARN + MSG_SHIP_ADDRESS_EMPTY);
            }
        }

        //是否含有三个汉字
        var reg_have_three_chinese = /^.*[\u4e00-\u9fa5].*[\u4e00-\u9fa5].*[\u4e00-\u9fa5].*$/;
        if (!reg_have_three_chinese.test(ship_address_val)) {
            flag = false;
            msgObj.html(CONSIGNEE_ICON_WARN + MSG_SHIP_ADDRESS_EMPTY);

        }
        return flag;
    };
    this.txt_ship_address_check = function (ship_address, ship_address_msg, regionObj) {
        var txtObj = $("#" + ship_address);
        var msgObj = $("#" + ship_address_msg);

        //获取需要校验的地址
        var ship_address_val = $.trim(txtObj.val());
        //清空错误提示
        msgObj.html("");
        var succeed = true;
        var badword = '<.';
        var char = '';
        for (i = 0; i < ship_address_val.length; i++) {
            char = ship_address_val.charAt(i);
            if (badword.indexOf(char) >= 0) {
                succeed = false;
                break;
            }
        }
        if (succeed) {
            msgObj.html("");
        } else {
            msgObj.html(CONSIGNEE_ICON_WARN + MSG_INVALID_CHAR_ERROR.replace('{0}', char));
        }

        //如果没选国外或者没选一级城市时候，要进行英文校验
        if (succeed == true) {
            var country_id = regionObj.getCountryId();
            if (country_id != 9000 && country_id != 0) {
                succeed = addressEnglishCheck(ship_address, ship_address_msg, ship_address_val);
            }
            else {
                succeed = addressChineseCheck(ship_address, ship_address_msg, ship_address_val);
            }
        }

        if (succeed) {
            msgObj.hide();
        }
        else {
            msgObj.show();
            msgObj.attr("class", "help-inline help-inline-error");
            msgObj.css("display", "inline-block'")
        }

        return succeed;
    };
    //没用
    var txt_ship_address_keyup = function () {
        var country_id = m_sel_region.getCountryId();
        if (country_id != 9000 && country_id != 0) {
            if ($.trim(txt_ship_address.value) == '') {
                span_ship_address_valid_msg.css("display", "inline-block");
                span_ship_address_valid_msg.attr("class", "help-inline help-inline-error");
                span_ship_address_valid_msg.text("请用英文填写详细地址信息，至少五个字母");

                //span_ship_address_valid_msg.style.display = 'inline-block';
                //span_ship_address_valid_msg.className = 'help-inline color-orange';
                //span_ship_address_valid_msg.innerHTML = '请用英文填写详细地址信息，至少五个字母';
            }
        }
        else {
            if (span_ship_address_valid_msg.attr("class") == "help-inline help-inline-error") {
                span_ship_address_valid_msg.hide();
            }
           // span_ship_address_valid_msg.attr("class", "hide");
            //if (span_ship_address_valid_msg.className == 'help-inline color-orange') {
            //    span_ship_address_valid_msg.style.display = 'none';
            //    span_ship_address_valid_msg.className = 'hide';
            //}
        }
    };


    //邮编相关
    var city_all_zip_ajax = new Ajax('/consignee/findZipcode');
    var city_all_zip_cache = new Object();
    var li_c = function (t) { t.className = 'active'; };
    var li_r = function (t) { t.className = ''; }
    var obj_zip_prompt_lis = null;
    var zip_array_len = 0;
    var bind_zip_prompt = function (zip_array, o, ship_zip_prompt, ship_zip, ship_zip_msg, regionObj) {
        var txtObj = $("#" + ship_zip);
        var msgObj = $("#" + ship_zip_msg);
        var promptObj = $1(ship_zip_prompt);

        zip_array_len = zip_array.length;
        var consigneeCommon = new ConsigneeCommon();
        var li_ck = function (t) { o.value = t.innerHTML; $h(promptObj); consigneeCommon.txt_ship_zip_check(ship_zip, ship_zip_msg, regionObj); };
        var sb = new StringBuilder();
        for (var i = 0; i < zip_array_len; i++) {
            sb.append("<li>");
            sb.append(zip_array[i]);
            sb.append('</li>');
        }
        promptObj.innerHTML = sb.toString();
        obj_zip_prompt_lis = promptObj.childNodes;
        for (var i = 0; i < zip_array_len; i++) {
            obj_zip_prompt_lis[i].onmouseover = function () { li_c(this); };
            obj_zip_prompt_lis[i].onmouseout = function () { li_r(this); };
            obj_zip_prompt_lis[i].onclick = function () { li_ck(this); };
        }

        setLocation(promptObj, 80, 23);
        setDimension(promptObj, 178, 200);

        if (zip_array_len < 15) {
            promptObj.style.height = 'auto';
        }

        show_zip_prompt(promptObj, o);
    };
    this.txt_ship_zip_focus = function (o, regionObj, ship_zip_prompt, ship_zip, ship_zip_msg) {
        var txtObj = $("#" + ship_zip);
        var msgObj = $("#" + ship_zip_msg);
        //var promptObj = $1(ship_zip_prompt);
        var region_value = null;
        if (!(region_value = regionObj.getValue())) {
            return;
        }

        //        span_ship_zip_valid_msg.style.display = 'none';

        var city_id = region_value['city_id'];
        var city_all_zip_cache_value = city_all_zip_cache[city_id];
        if (city_all_zip_cache_value != null) {
            bind_zip_prompt(city_all_zip_cache_value, o, ship_zip_prompt, ship_zip, ship_zip_msg, regionObj);
            return;
        }

        city_all_zip_ajax.OnSucceed
        (
            function (result) {
                if (result != null && result['error_code'] == 0) {
                    var zip_array = result['zip'];
                    bind_zip_prompt(zip_array, o, ship_zip_prompt, ship_zip, ship_zip_msg, regionObj);
                    city_all_zip_cache[city_id] = zip_array;
                }
            }
        );

        city_all_zip_ajax.invokeServer('cityId=' + city_id, 'POST', true);
    };
    var show_zip_prompt = function (z, o) {
        $s(z);
        document.onclick = function (e) {
            var sender = null;
            if (e) {
                sender = e.target;
            }
            else if (event) {
                sender = event.srcElement;
            }
            if (!contains(z, sender) && sender != o) {
                $h(z);
                document.onclick = null;
            }
        };
    };
    this.txt_ship_zip_keyup = function (o, e) {
        var k = null;
        if (e) {
            k = e.keyCode;
        }
        else if (event) {
            k = event.keyCode;
        }

        if (k == 9) {
            return;
        }

        var ov = o.value;
        var lisi = null;
        var j = 0;
        for (var i = 0; i < zip_array_len; i++) {
            lisi = obj_zip_prompt_lis[i];
            if (lisi.innerHTML.startsWith(ov)) {
                $s(lisi);
                j++;
            }
            else $h(lisi);
        }

        if (j == 0) {
            $h(ul_zip_prompt);
        }
        else if (j < 15) {
            $s(ul_zip_prompt);
            ul_zip_prompt.style.height = 'auto';
        }
        else {
            $s(ul_zip_prompt);
            ul_zip_prompt.style.height = '200px';
        }
    };
    this.txt_ship_zip_check = function (ship_zip, ship_zip_msg, regionObj) {
        var txtObj = $("#" + ship_zip);
        var msgObj = $("#" + ship_zip_msg);
        msgObj.html("");
        var ship_zip_val = $.trim(txtObj.val());
        var zip_format = regionObj.getCityZipFormat();

        if (zip_format == '') {
            return true;
        }
        if (ship_zip_val == '' && zip_format != '') {
            msgObj.html(CONSIGNEE_ICON_WARN + MSG_SHIP_ZIP_ERROR);
            msgObj.show();
            msgObj.css("display", "inline-block");
            msgObj.attr("class", "help-inline help-inline-error");

            return false;
        }
        if (!regularExpressionValid(ship_zip_val, REGEX_SHIP_ZIP, ship_zip_msg, CONSIGNEE_ICON_WARN + MSG_SHIP_ZIP_ERROR)) {
            return false;
        }

        //邮编的前四位验证
        if (false && zip_format != '' && zip_format.indexOf(ship_zip.substring(0, 4)) < 0) {
            msgObj.show();
            msgObj.html(CONSIGNEE_ICON_WARN + MSG_SHIP_ZIP_ERROR);
            msgObj.css("display", "inline-block");
            msgObj.attr("class", "help-inline help-inline-error");
            
            return false;
        }

        msgObj.html("");
        msgObj.hide();
        //msgObj.attr("class", "hide");
        return true;
    };
}

ConsigneeCommon.getConsigneeSaveData = function (custSettingData, data_source, order_sequence_Ids) {
    var shop_id = data_source['shop_id'];
	var old_town_id = data_source['quarter_id'];
    var consi_data = new Hashtable();
    var region_value = null;
    if (custSettingData.selRegion != null) {
        region_value = custSettingData.selRegion.getValue();
    } 
    var cur_ship_name = filter_var($.trim(custSettingData.shipName));
    var cur_town_id = region_value == null ? 0 : region_value['quarter_id'];
    var cur_ship_address = filter_var($.trim(custSettingData.shipAddress));
    consi_data['ship_name'] = cur_ship_name;
	consi_data['identity_num'] = custSettingData.identityNum;
    consi_data['country_id'] = region_value == null ? 0 : region_value['country_id'];
    consi_data['province_id'] = region_value == null ? 0 : region_value['province_id'];
    consi_data['city_id'] = region_value == null ? 0 : region_value['city_id'];
    consi_data['town_id'] = region_value == null ? 0 : region_value['town_id'];
    consi_data['quarter_id'] = cur_town_id;
    consi_data['ship_zip'] = filter_var($.trim(custSettingData.shipZip));
    consi_data['ship_mb'] = filter_var($.trim(custSettingData.shipMb));
    consi_data['ship_tel'] = filter_var($.trim(custSettingData.shipTel));
    consi_data['ship_address'] = cur_ship_address;
    consi_data['address_status'] = (custSettingData.addressStatus == true) ? 1 : 2;
	consi_data['old_town_id'] = old_town_id;
    if (region_value == null) {
        consi_data['address_status'] = 0;
    }

    if (custSettingData.townIdInBook > 0 && (cur_town_id != custSettingData.townIdInBook || cur_ship_name != custSettingData.shipNameInBook || cur_ship_address != custSettingData.shipAddressInBook)) {
        consi_data['addr_id'] = custSettingData.addressId;
        consi_data['is_valid_address'] = 0;
    }
    else {
        consi_data['addr_id'] = custSettingData.addressId;
        consi_data['is_valid_address'] = custSettingData.isValidAddress;
    }
    consi_data['town_id_in_book'] = custSettingData.townIdInBook;
    consi_data['ship_name_in_book'] = custSettingData.shipNameInBook;
    consi_data['ship_address_in_book'] = custSettingData.shipAddressInBook;
    consi_data['cur_edit_area'] = 0;
    consi_data['shop_id'] = shop_id;
    //consi_data['order_sequence_id'] = order_sequence_id;
    consi_data['inherit_status'] = false;
    consi_data['order_sequence_ids'] = order_sequence_Ids;

    return consi_data;
}
ConsigneeCommon.getFormatIdentityNum = function (identityNum) {
    if (identityNum) {
        return identityNum.substring(0, 5) + '********' + identityNum.substring(14);
    }
    return '';
}

//格式化固定电话后四位为****
ConsigneeCommon.getFormatShipTel = function(shipTel){
	if(shipTel && shipTel.length>4){
		return shipTel.substring(0,shipTel.length-4)+"****";
	}else{
		return shipTel;
	}
}

//格式化手机号中间四位为****
ConsigneeCommon.getFormatShipMb = function(shipMb){
	if(shipMb){
		return shipMb.substring(0,3)+"****"+shipMb.substring(7);
	}
	return "";
}

//判断是否包含*（星号）
//判断是否包含*（星号）
ConsigneeCommon.isContainAterisk = function(value){
	if(value){
		return value.indexOf("****")>0;
	}
	return false;
}

//格式化详细地址，少于4个字，隐藏2个，否则隐藏前4个
ConsigneeCommon.getFormatAddress = function(address){
	if(address){
		if(address.length<=4){
			return "**"+address.substring(2);
		}
		else{
			return "****"+address.substring(4);
		}
	}
	return "";
}


function IdentityNumTip(dataSource, buttonId, parentId, iframeId, shipNameId, identityNumId, m_sel_region) {
    this.dataSource = dataSource;
    this.button = $('#' + buttonId);
    this.parent = $('#' + parentId);
    this.iframe = $('#' + iframeId);
    this.shipName = $('#' + shipNameId);
    this.identityNum = $('#' + identityNumId);
    this.m_sel_region = m_sel_region;

    this.init = function () {
        var that = this;
        that.parent.html('');
        that.parent.hide();
        that.button.click(function () {
            if (that.parent.html() == '') {
                if (dataSource && dataSource.length > 0) {
                    var html = '';
                    var count = 0;
                    var htId = new Hashtable();
                    for (var i = 0; i < dataSource.length; i++) {
                        var key = dataSource[i]["ship_name"] + "_" + dataSource[i]["identity_num"];
                        if (dataSource[i]["identity_num"] && dataSource[i]["identity_num"] != '' && !htId.contains(key)) {
                            count++;
                            htId[key] = 1;
                            html += '<li class="clearfix" sn="' + dataSource[i]["ship_name"] + '" ic="' + dataSource[i]["identity_num"] + '"><span class="left">' + dataSource[i]["ship_name"] + '</span><span>' + ConsigneeCommon.getFormatIdentityNum(dataSource[i]["identity_num"]) + '</span></li>';
                        }
                    }
                    if (count > 0) {
                        that.parent.html(html);
                        that.iframe.attr("style", "height:" + (count * 23 + 1) + "px;display:block;");
                        that.iframe.show();
                        that.parent.show();
                        that.parent.find('li').each(function () {
                            var li = $(this);
                            li.hover(function () {
                                li.css("background-color", "#f7f0e8");
                            }, function () {
                                li.css("background-color", "#fff");
                            });
                            li.click(function() {
                                that.shipName.val(li.attr('sn'));
                                that.identityNum.val(li.attr('ic'));
                                that.parent.html('');
                                that.parent.hide();
                                that.iframe.attr("style", "display:none;");
                                var consigneeCommon = new ConsigneeCommon();
                                consigneeCommon.txt_ship_name_check('txt_id_ship_name', 'span_id_ship_name_valid_msg', that.m_sel_region);
                                consigneeCommon.txt_identity_num_check('txt_identity_num', 'span_identity_num_valid_msg');
                                consigneeCommon.txt_ship_name_check('txt_id_ship_name_edit', 'span_id_ship_name_valid_msg_edit', that.m_sel_region);
                                consigneeCommon.txt_identity_num_check('txt_identity_num_edit', 'span_identity_num_valid_msg_edit');
                            });
                        });
                    }
                }
            } else {
                that.parent.html('');
                that.parent.hide();
                that.iframe.attr("style", "display:none;");
            }
        });
    }

}
