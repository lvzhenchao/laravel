String.prototype.startsWith = function (s) {
    return s != null && s.length <= this.length && this.substring(0, s.length) == s;
};
String.prototype.endsWith = function (s) {
    return s != null && s.length <= this.length && this.substring(this.length - s.length) == s;
};
String.prototype.trim = function () {
    return this.replace(/(\s*$)|(^\s*)/g, '');
};
function $1(id) {
    return document.getElementById(id);
};
function $wait(id) {
    $1(id).style.cursor = 'wait';
};
function $disabled(id) {
    $1(id).disabled = true;
};
function $enabled(id) {
    $1(id).disabled = false;
};
function $h(o) {
    o.style.display = 'none'
};
function $s(o) {
    o.style.display = 'block';
};
function _h(o) {
    o.style.visibility = 'hidden';
};
function _s(o) {
    o.style.visibility = 'visible';
};
function $H(id) {
    var o = $1(id);
    if (o != null) $h(o);
};
function $S(id) {
    var o = $1(id);
    if (o != null) $s(o);
};
function _H(id) {
    var o = $1(id);
    if (o != null) o.className = 'hide';
};
function $F(id) {
    var o = $1(id);
    if (o == null) return null;
    return o.value.trim();
};
function $C(id) {
    var o = $1(id);
    if (o != null) o.value = '';
};
function for_99click() { };
function nTruncate(o, L) {
    if (o == null || L == 0) return null;
    var len = o.length;
    var c = 0;
    var j = 0;
    var sb = new StringBuilder();
    for (var i = 0; i < len; i++) {
        if (o.charCodeAt(i) > 127)
            j++;
        j++;
        if ((j % 2 == 0 ? j : j + 1) > L * 2)
            return sb.append('...').toString();
        sb.append(o.charAt(i));
    }
    return sb.toString();
};
function formatFloat(f) {
    var oNumberObject = new Number(f);
    return oNumberObject.toFixed(2);
};
function parsePrice(s) {
    if (s == null || s == '' || s == '0' || s == 0) {
        return 0;
    }
    if (!parseFloat(s))
        return s.replace(/￥/g, '');

    return s;
};
function getposOffset_c(what) {
    var parentEl = what.offsetParent;
    var x_offset = what.offsetLeft;
    var y_offset = what.offsetTop;
    while (parentEl != null) {
        x_offset += parentEl.offsetLeft;
        y_offset += parentEl.offsetTop;
        parentEl = parentEl.offsetParent;
    }
    return [x_offset, y_offset];
};
var Try =
{
    these: function () {
        var return_value = null;
        for (var i = 0; i < arguments.length; i++) {
            try {
                return_value = arguments[i]();
                break;
            }
            catch (e) { }
        }
        return return_value;
    }
};
function Ajax(url) {
    var isRuning = false;
    var m_OnSucceed = function () { };
    var m_OnReading = function () { };
    var m_timer = null;
    var m_timer_Interval = null;
    this.Url = BASE_PATH + url;
    var m_xmlReq = Try.these(
        function () {
            return new ActiveXObject('Msxml2.XMLHTTP');
        },
        function () {
            return new XMLHttpRequest();
        },
        function () {
            return new ActiveXObject('Microsoft.XMLHTTP');
        }
    ) || false;
    this.OnReading = function (reading) {
        m_OnReading = reading;
    };
    this.OnSucceed = function (succeed) {
        m_OnSucceed = succeed;
    };
    this.OnTimeout = function (timeout, times) {
        m_timer = window.setTimeout(timeout, times || 5000);
    };
    this.Abort = function () {
        isRuning = false;
        if (!m_xmlReq) {
            return;
        }
        m_xmlReq.abort();
    };
    this.invokeServer = function (send_data, method, asyc, cache) {
        if (!m_xmlReq) return;
        isRuning = true;
        send_data = send_data || "";
        var url = this.Url;
        if (!cache && method == "GET") {
            url += (/\?/.test(url) ? "&" : "?") + (send_data.toString() ? send_data.toString() + "&_=" : "_=") + (new Date()).getTime();
        }
        m_xmlReq.open(method, url, asyc);
        if (method == 'POST') {
            m_xmlReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        }
        if (!asyc) {
            m_xmlReq.send(send_data.toString(true));
            deal();
            return;
        };
        m_xmlReq.onreadystatechange = function () {
            if (m_xmlReq.readyState == 1) { m_OnReading(); }
            else if (m_xmlReq.readyState == 4 && m_xmlReq.status == 200) {
                deal();
            }
        };
        m_xmlReq.send(send_data.toString(true));


    };
    var deal = function () {
        var result = null;
	if (m_xmlReq.responseURL && m_xmlReq.responseURL.endsWith("error.html")) {
	    window.document.location = m_xmlReq.responseURL;
	    return;
	} else if (m_xmlReq.responseText && m_xmlReq.responseText.indexOf("checkout.intercept.html") > 0) {
	    window.document.write(m_xmlReq.responseText);
	    return;
	}
        eval('result=' + m_xmlReq.responseText); //wx解决ajax出现换行符
        if (m_timer != null) window.clearTimeout(m_timer);
        if (m_timer_Interval != null) window.clearInterval(m_timer_Interval);
        isRuning = false;
        if(result && result['error_code'] && result['error_code']==1024 && result['error_message'] && result['error_message']=='登录超时'){
        	window.document.location.reload();
        	return;
        }
        m_OnSucceed(result);
    };
    this.clearInterval = function () {
        if (m_timer_Interval != null) window.clearInterval(m_timer_Interval);
    };
    this.OnInterval = function (interval) {
        m_timer_Interval = window.setInterval(interval, 20000);
    };
};

//HashTable
function Hashtable() {
    var defined = function (p) {
        return typeof (p) != 'undefined';
    };
    this.contains = function (key) {
        return defined(this[key]);
    };
    this.remove = function (key) {
        if (!this.contains(key)) return false;
        delete this[key];
    };
    this.clear = function () {
        for (var k in this) delete this[k];
    };
    this.toString = function (isUrlEncode) {
        var sb = new StringBuilder();
        var hasItem = false;
        for (var k in this) {
            if (typeof (this[k]) == 'function') continue;
            if (hasItem) sb.append('&');
            sb.append(k);
            sb.append('=');
            if(isUrlEncode && this[k] && typeof(this[k]) == 'string'){
            	sb.append(this[k].replace('%','%25'));
            }
            else{
            	sb.append(this[k]);
            }
            hasItem = true;
        }
        return sb.toString();
    };
};


var get_a_k =
{
    'object': function (a, k) { return a[1][k]; },
    'string': function (a, k) { return a[k - 0 + 1]; }
};
function StringBuilder(d) {
    this.s = new Array(d);
    this.append = function (d) {
        this.s.push(d);
        return this;
    };
    this.toString = function () {
        return this.s.join('');
    };
    this.clear = function () {
        this.s = new Array();
    };
    this.appendFormat = function () {
        var n = arguments.length;
        if (n == 0) return this;
        var f = arguments[0];
        if (n == 1) return this.append(f);
        var arg = arguments[1];
        if (arg == null) arg = '';
        var i, e, c, k, a_k = get_a_k[typeof (arg)];
        for (i = 0; i < f.length;) {
            c = f.charAt(i);
            if (c == '{') {
                e = f.indexOf('}', i);
                k = f.substring(i + 1, e);
                this.s.push(a_k(arguments, k));
                i = e + 1;
                continue;
            }
            this.s.push(c);
            i++;
        }
        return this;
    }
};
function contains(container, control) {
    if (container == null || control == null) return false;
    if (container == control) return true;
    if (!container.hasChildNodes()) return false;
    if (control.parentNode == container) return true;
    var child_count = container.childNodes.length;
    for (var i = 0; i < child_count; i++)
        if (contains(container.childNodes[i], control))
            return true;
};

function JSPanel(objDivid) {
    this.ObjDivid = objDivid;
    this.Template = null;
    this.DataSource = null;
    var bind_dict = function (format, dict) {
        var sb = new StringBuilder();
        sb.appendFormat(format, dict);
        return sb.toString();
    };
    this.DataBind = function() {
        document.getElementById(objDivid).innerHTML = this.GetJSPHTML();
    };
    this.GetJSPHTML = function() {
        return bind_dict(this.Template, this.DataSource);
    };
};
function DropDownList(ddl_id) {
    this.DataTextField = null;
    this.DataValueField = null;
    //this.DataIndexField = null;
    this.DataSource = null;
    this.OnItemDataBinding = null;
    this.OnSelectedIndexChanged = null;
    this.OnKeyPress = null;
    var m_ddl_id = ddl_id;
    this.DataBind = function () {
        var obj_ddl = document.getElementById(m_ddl_id);
        obj_ddl.innerHTML = '';
        if (this.DataSource == null) return;
        var count = this.DataSource.length;
        if (this.OnKeyPress != null)
            obj_ddl.onkeypress = this.OnKeyPress;
        if (this.OnSelectedIndexChanged != null)
            obj_ddl.onchange = this.OnSelectedIndexChanged;
        var data_item = null;
        for (var i = 0; i < count; i++) {
            data_item = this.DataSource[i];
            if (this.OnItemDataBinding != null)
                this.OnItemDataBinding(data_item);
            var cur_option = new Option(data_item[this.DataTextField], data_item[this.DataValueField]);
            // cur_option.setAttribute("py_index",data_item[this.DataIndexField]);
            obj_ddl.options.add(cur_option);
        }
    };
    this.appendFirstOption = function (txt, val) {
        $1(m_ddl_id).options.add(new Option(txt, val), 0);
    };
    this.show = function () {
        $1(m_ddl_id).style.visibility = 'visible';
    };
    this.hide = function () {
        $1(m_ddl_id).style.visibility = 'hidden';
    };
    this.getValue = function () {
        return $1(m_ddl_id).value;
    };
    this.setValue = function (val) {
        $1(m_ddl_id).value = val;
    };
    this.clear = function () {
        $1(m_ddl_id).innerHTML = '';
    };
    this.getText = function () {
        if ($1(m_ddl_id).selectedIndex == -1)
            $1(m_ddl_id).value = 0;
        return $1(m_ddl_id).options[$1(m_ddl_id).selectedIndex].text;

    };
    this.getSelectedIndex = function () {
        return $1(m_ddl_id).selectedIndex;
    };
    this.setSelectedIndex = function (val) {
        $1(m_ddl_id).selectedIndex = val;
    }

};
function JSRepeater(objDivid) {
    this.HeaderTemplate = null;
    this.ItemTemplate = null;
    this.SeparateTemplate = null;
    this.FooterTemplate = null;
    this.DataSource = null;
    this.onItemDataBind = null;
    var obj_div = null;

    this.GetJSRHTML = function () {
        var len = this.DataSource.length;
        var sb = new StringBuilder(this.HeaderTemplate);
        var obj_tpl = new Object();
        for (var i = 0; i < len; i++) {
            if (i > 0 && this.SeparateTemplate != null)
                sb.append(this.SeparateTemplate);
            obj_tpl.ItemTemplate = this.ItemTemplate;
            if (this.onItemDataBind != null)
                this.onItemDataBind(this.DataSource[i], obj_tpl);
            sb.appendFormat(obj_tpl.ItemTemplate, this.DataSource[i]);
        }
        sb.append(this.FooterTemplate);
        return sb.toString();
    }


    this.DataBind = function () {
        obj_div = document.getElementById(objDivid);
        obj_div.innerHTML = this.GetJSRHTML();
        this.Paging(); //分页绑定
    };

    this.getElementsByTagName = function(tag_name) {
        return obj_div.getElementsByTagName(tag_name);
    };

    // 分页相关

    //私有成员或临时变量
    var lowerBound = null;   //分页起始
    var upperBound = null;   //分页结束
    var obj_div_page = null; //分页节点
    var leftLength = null;   //左侧页码长度
    var rightLength = null;  //右侧页码长度 
    var temppagelinkname = null;   //分页页码名称属性
    var tempcurpagenum = null;     //当前应当事件绑定页
    var temppagelinkonclick = null; //当前页应当绑定事件名称 

    //公有成员
    this.PageIndex = null;   //当前页索引
    this.PageSize = null;    //每页显示记录数   需要初始化
    this.PageLength = null;  //显示页码长度     需要初始化
    this.PageMaxNum = null;  //最大显示页码长度 需要初始化   页码始终以1 2 3开始 (假页码)PageMaxNum 初始值需要和PageLength 相等  
    this.TotalPages = null;  //总页码  
    this.PageNumberTemplate = null;       //数字页码模板
    this.Pagelinkonclick = null;          //分页链接onclick事件字符串（预留一个页码参数）  需要初始化
    this.Pagelinkhref = null;             //分页链接url地址  需要初始化
    this.Pagelinkname = objDivid + '_Pages'; //分页链接名称     需要初始化 默认值为objDivid+'_Pages'
    this.Pagelinkcss = null;                 //分页链接名称
    this.Pagelinktitle = null;              //分页链接标题     需要初始化 默认值''
    this.Pagelinkclass = null;              //分页链接标题     需要初始化 默认值''

    //对外接口 DataBind调用
    this.Paging = function () {
        if ((parseInt(this.PageLength) > parseInt(this.TotalPages) ? parseInt(this.TotalPages) : parseInt(this.PageLength)) >= 1) {
            obj_div = document.getElementById(objDivid);
            obj_div_page = document.createElement('div');
            obj_div_page.setAttribute('id', this.Pagelinkname);
            obj_div_page.setAttribute('class', this.Pagelinkcss);
            this.AddPageLink(obj_div_page);
            if (document.getElementById(this.Pagelinkname) != null)
                obj_div.parentNode.removeChild(document.getElementById(this.Pagelinkname));
            obj_div.parentNode.insertBefore(obj_div_page, obj_div.nextSibling);
        }
    }

    this.AddPageLink = function (obj_div_page) {
        this.InitPageBounds();
        if (this.PageMaxNum != this.PageLength) {
            //this.AddFirstLink(obj_div_page);
            this.AddPreviousLink(obj_div_page);
            this.AddLinks(obj_div_page);
            this.AddNextLink(obj_div_page);
            //this.AddLastLink(obj_div_page);
        }
        else {
            this.AddLinks(obj_div_page);
        }
        obj_div_page.innerHTML += "<div class='clear'></div>";
    }

    this.AddFirstLink = function (obj_div_page) {
        if ((this.PageIndex > leftLength + 1) && (this.TotalPages > this.PageLength)) {
            tempcurpagenum = 1;
            temppagelinkname = this.Pagelinkname + '_first';
            temppagelinkonclick = string.Format(this.Pagelinkonclick, tempcurpagenum);
            obj_div_page.innerHTML += this.createLinkHTML(temppagelinkonclick, this.Pagelinkhref, temppagelinkname, this.Pagelinktitle, this.Pagelinkclass, "第一页...&nbsp;");
        }
    }

    this.AddLastLink = function (obj_div_page) {
        if (((this.PageIndex + rightLength) < this.TotalPages) && (this.TotalPages > this.PageLength)) {
            tempcurpagenum = this.TotalPages;
            temppagelinkname = this.Pagelinkname + '_last';
            temppagelinkonclick = string.Format(this.Pagelinkonclick, tempcurpagenum);
            obj_div_page.innerHTML += this.createLinkHTML(temppagelinkonclick, this.Pagelinkhref, temppagelinkname, this.Pagelinktitle, this.Pagelinkclass, "&nbsp;...最后一页");

        }
    }
    this.AddPreviousLink = function (obj_div_page) {
        if (this.PageIndex > 1) {
            tempcurpagenum = parseInt(this.PageIndex) - 1;
            temppagelinkname = this.Pagelinkname + '_pre';
            temppagelinkonclick = string.Format(this.Pagelinkonclick, tempcurpagenum);
            obj_div_page.innerHTML += this.createLinkHTML(temppagelinkonclick, this.Pagelinkhref, temppagelinkname, this.Pagelinktitle, "prevpage", " 上一页 ");
        }
    }
    this.AddNextLink = function (obj_div_page) {
        if (this.PageIndex < this.TotalPages) {
            tempcurpagenum = parseInt(this.PageIndex) + 1;
            temppagelinkname = this.Pagelinkname + '_next';
            temppagelinkonclick = string.Format(this.Pagelinkonclick, tempcurpagenum);
            obj_div_page.innerHTML += this.createLinkHTML(temppagelinkonclick, this.Pagelinkhref, temppagelinkname, this.Pagelinktitle, "nextpage", " 下一页 ");
        }
    }

    this.AddLinks = function (obj_div_page) {
        for (var i = lowerBound; i <= upperBound; i++) {
            tempcurpagenum = i;
            if (this.PageMaxNum == this.PageLength) {
                tempcurpagenum = parseInt(i) - parseInt(lowerBound) + 1;
            }
            temppagelinkname = this.Pagelinkname + '_' + i;
            temppagelinkonclick = string.Format(this.Pagelinkonclick, i);
            if (tempcurpagenum == this.PageIndex)
                obj_div_page.innerHTML += "<span>" + tempcurpagenum + "</span>";
            else
                obj_div_page.innerHTML += this.createLinkHTML(temppagelinkonclick, this.Pagelinkhref, temppagelinkname, this.Pagelinktitle, this.Pagelinkclass, tempcurpagenum);
        }
    }

    this.createLinkHTML = function (onclick, href, name, title, linkclass, txt) {
        return string.Format(this.PageNumberTemplate, onclick, href, name, title, linkclass, txt);
    }


    this.InitPageBounds = function () {
        if (this.PageLength <= 3)
            this.PageLength = 3;
        leftLength = parseInt(this.PageLength / 2);
        rightLength = parseInt(this.PageLength / 2);
        if (parseInt(this.PageLength) % 2 == 0)
            rightLength--;
        lowerBound = parseInt(this.PageIndex) - parseInt(leftLength);
        upperBound = parseInt(this.PageIndex) + parseInt(rightLength);

        if (parseInt(lowerBound) < 1) {
            upperBound += 1 - parseInt(lowerBound);
            lowerBound = 1;
        }
        if (upperBound > this.TotalPages) {
            lowerBound -= parseInt(upperBound) - parseInt(this.TotalPages);
            upperBound = parseInt(this.TotalPages);
        }
        if (lowerBound < 1) {
            lowerBound = 1;
        }
        if (upperBound > this.TotalPages) {
            upperBound = parseInt(this.TotalPages);
        }
    }


};

string = {};
string.Format = function () {
    var param = [];
    for (var i = 0, length = arguments.length; i < length; i++) {
        param.push(arguments[i]);
    }
    var format = param[0];
    param.shift();
    return format.replace(/\{(\d+)}/g, function (m, i) { return param[i]; });
}


Array.prototype.each = function (wht9Y3) {
    for (var ro4yR3 = 0; ro4yR3 < this.length; ro4yR3++) {
        wht9Y3(this[ro4yR3]);
    }
};

Array.prototype.indexOf = function (elt, from) {
    var len = this.length >>> 0;
    var from = Number(arguments[1]) || 0;
    from = (from < 0) ? Math.ceil(from) : Math.floor(from);
    if (from < 0) from += len;
    for (; from < len; from++) {
        if (from in this && this[from] === elt) return from;
    }
    return -1;
};
Array.prototype.contains = function (item) {
    for (i = 0; i < this.length; i++) {
        if (this[i] == item) { return true; }
    }
    return false;
};
function RadioButtonList(div_id, order_sequence_id) {
    this.HeaderTemplate = null;
    this.ItemTemplate = null;
    this.FooterTemplate = null;
    this.DataSource = null;
    this.OnItemDataBinding = null;
    var OnSelectedIndexChanged = null;
    var obj_div = null;
    this.DataBind = function () {
        obj_div = document.getElementById(div_id);
        if (this.DataSource == null) return;
        var count = this.DataSource.length;
        //if(count==0) return;
        var sb = new StringBuilder(this.HeaderTemplate);
        var obj_tpl = new Object();
        for (var i = 0; i < count; i++) {
            obj_tpl.ItemTemplate = this.ItemTemplate;
            if (this.OnItemDataBinding != null)
                this.OnItemDataBinding(this.DataSource[i], obj_tpl);
            sb.appendFormat(obj_tpl.ItemTemplate, this.DataSource[i]);
        }
        sb.append(this.FooterTemplate);
        obj_div.innerHTML = sb.toString();
        if (OnSelectedIndexChanged == null) return;
        var inputs = obj_div.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].getAttribute("type") == "radio" && inputs[i].getAttribute("name") && inputs[i].getAttribute("name").match("other_pay_rd_message") != "other_pay_rd_message") {
                inputs[i].onclick = function () {
                    OnSelectedIndexChanged(this);
                }
            }
        }
    };
    this.setOnSelectedIndexChanged = function (selected_changed) {
        OnSelectedIndexChanged = selected_changed;
    };
    this.getValue = function (n) {
        var inputs = $1(div_id).getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++)
            if (inputs[i].checked && (n == null || inputs[i].name == n))
                return inputs[i].value;
        return null;
    };
    this.getSelectedControl = function (n) {
        var inputs = obj_div.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++)
            if (inputs[i].checked && (n == null || inputs[i].name == n))
                return inputs[i];
        return null;
    };
    this.setValue = function (val, id, name) {
        var inputs = obj_div.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++)
            if (inputs[i].value == val && (id == undefined || inputs[i].id == id) && (name == undefined || inputs[i].name == name)) {
                inputs[i].checked = true; return true;
            }
        return false;
    };
    this.setValueOnClick = function (val, id, name) {
        var inputs = obj_div.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++)
            if (inputs[i].value == val && (id == undefined || inputs[i].id == id) && (name == undefined || inputs[i].name == name)) {
                inputs[i].checked = true;
                inputs[i].click();
                return true;
            }
        return false;
    };
    this.setFirstValueOnClick = function (name) {
        var inputs = obj_div.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++)
            if ((name == undefined || inputs[i].name == name) && !inputs[i].disabled) {
                inputs[i].checked = true;
                inputs[i].click();
                return true;
            }
        return false;
    };
    //为支付方式继承定制added by mlx on 2013.3.2
    this.findPayType = function (id, type) {
        var inputs = obj_div.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++)
            if (inputs[i].value == type && inputs[i].id == id && inputs[i].disabled == false) {
                return true;
            }
        return false;
    }
    //为地址本定制
    this.setnextValue = function (val, n) {
        if (val == 0)
        { $1('rd_new_addr_' + order_sequence_id).click(); $1('div_consignee_edit_info_' + order_sequence_id).className = 'address-new'; return true; }
        var inputs = obj_div.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].value == val && (n == null || inputs[i].name == n)) {
                inputs[i - 1].checked = true;
                inputs[i].parentNode.childNodes[3].className = '';
                return true;
            }
            else {
                if (inputs[i].parentNode.childNodes[3] != null)
                    inputs[i].parentNode.childNodes[3].className = 'hide';
            }

        }

        return false;
    };



    this.getSelectedIndex = function (n) {
        var inputs = obj_div.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++)
            if (inputs[i].checked && (n == null || inputs[i].name == n)) return i;
        return -1;
    };

    this.setDisabledByValue = function (val, disabled) {
        var inputs = obj_div.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].value == val) {
                inputs[i].disabled = disabled;
                break;
            }
        }
        var labels = obj_div.getElementsByTagName("LABEL");
        if (labels.length > i) {
            labels[i].style.color = disabled ? "#b5b5b5" : "";
        }
    }
};

//过滤ASCII码在32以下及126以上的特殊字符
function filter_var(s) {
    var rs = html_encode(s);
    rs = html_decode(rs);
    return rs;
}
function html_encode(html) {
    var len = html.length;
    var output = '';
    for (var i = 0; i < len; i++) {
        var ch = html.substr(i, 1);
        var code = ch.charCodeAt();
        if ((code < 0x20) && (code != 0x0D) && (code != 0x0A) && (code != 0x09)) {
            continue;
        }
        if (ch == '%') {
            output += '%037';
        }
        else if (code > 126 && code < 256) {
            output = output + '%' + code;
        }
        else {
            output += ch;
        }
    }
    return output;
}
function html_decode(html) {
    var len = html.length;
    var output = '';
    for (var i = 0; i < len; i++) {
        var ch = html.substr(i, 1);
        if (ch == '%') {
            var code = html.substr(i + 1, 3);
            if (code == '037') {
                output += '%';
                i = i + 3;
            }
            else {
                output += String.fromCharCode(code);
                i = i + 3;
            }
        }
        else {
            output += ch;
        }
    }
    return output;
}
var CKCookie =
{   //读取cookies
    getCookie: function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return (arr[2]);
        else
            return null;
    }
};
// 兼容谷歌浏览器的锚点跳转
function fixHash() {
    /// <summary>兼容谷歌浏览器的锚点跳转 孟凡威 20121022</summary>
    /// <param name="userId" type="int"></param>
    /// <param name="cityId" type="int"></param>
    /// <returns type="Void" />

    try {
        var explorer = window.navigator.userAgent;
        if (explorer && explorer.indexOf("Chrome") >= 0) {
            window.location = window.location;
        }
    } catch (e) { }
}