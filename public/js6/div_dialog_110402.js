
var isIE = !!(window.attachEvent && !window.opera);
function setLocation(obj, x, y) {
    if (!isIE) { x += 'px'; y += 'px'; }
    obj.style.left = x; obj.style.top = y;
};
function setDimension(obj, w, h) {
    if (!isIE) {
        w += 'px'; h += 'px';
    }
    obj.style.width = w;
    obj.style.height = h;
};
//window.onerror = function () {
//    return true;
//};
function getWinSize() {
    /*with(document.body)
    { 
    return [clientWidth,clientHeight]
    };*/
    with (window.screen) {
        return [width, height];
    }

};
function getScrollTop() {
    if (typeof (window.pageYOffset) != 'undefined') {
        return window.pageYOffset;
    }
    else if (typeof (document.compatMode) != 'undefined' && document.compatMode != 'BackCompat') {
        return document.documentElement.scrollTop;
    }
    else if (typeof (document.body) != 'undefined') {
        return document.body.scrollTop;
    }
};
function showWindowLoading(divid) {
    var locdiv = $1(divid);
    locdiv.style.top = getScrollTop() + 3 + 'px';
    locdiv.style.left = (window.screen.width - 158) + 'px';
    locdiv.style.display = 'block';
};
function hideLocSelect(itemName) {
    $1(itemName).style.display = 'none';
};
function DivModelDialog(div_id, title_bar_id, xbox_id, shield_id, content_id, loading_bar_id) {
    var can_move = false, PX, PY,
    obj_move = $1(div_id),
    obj_xbox = $1(xbox_id),
    obj_shield = $1(shield_id),
    obj_content = $1(content_id),
    obj_loading_bar = $1(loading_bar_id);
    var closeW = function () {
        $h(obj_move);
        _cl();
        $h(obj_shield);
        if (obj_content != null)
            $s(obj_content);
        setDDLVisable(true);
        document.onmouseup = null;
        document.onmousemove = null;
    };
    var mDown = function (e) {
        var pos = getEventPosition(e);
        var objPos = getposOffset_c(obj_move);
        can_move = true;
        if (isIE)
            obj_move.setCapture();
        pX = pos[0] - objPos[0];
        pY = pos[1] - objPos[1];
    };
    var getEventPosition = function (e) {
        if (isIE) return [event.x, event.y];
        return [e.pageX, e.pageY];
    };
    var mMove = function (e) {
        if (!can_move) return;
        var pos = getEventPosition(e);
        var win_size = getWinSize();
        if (pos[0] < 0 || pos[1] < 0 || pos[0] > win_size[0] || pos[1] > win_size[1]) return;
        setLocation(obj_move, pos[0] - pX, pos[1] - pY);
    };
    var mUp = function () {
        if (!can_move) return;
        if (isIE) obj_move.releaseCapture();
        can_move = false;
    };
    var setDDLVisable = function (is_show) {
        if (!isIE)
            return;
        var obj_consignee_addr = $1('div_consignee_addr');
        var obj_sel_ship_time = $1('sel_ship_time');
        var obj_pick_up_town = $1('pick_up_town');
        var obj_iv = $1('invoice_content');
        if (is_show) {
            if (obj_consignee_addr != null) _s(obj_consignee_addr);
            if (obj_sel_ship_time != null) _s(obj_sel_ship_time);
            if (obj_pick_up_town != null) _s(obj_pick_up_town);
            if (obj_iv != null) _s(obj_iv);
        }
        else {
            if (obj_consignee_addr != null) _h(obj_consignee_addr);
            if (obj_sel_ship_time != null) _h(obj_sel_ship_time);
            if (obj_pick_up_town != null) _h(obj_pick_up_town);
            if (obj_iv != null) _h(obj_iv);
        }
    };
    this.setLoading = function () {
        $h(obj_content);
        obj_loading_bar.innerHTML = "<img src='images/loading.gif'/><p>\u8BF7\u7A0D\u5019...</p>";
        $s(obj_loading_bar);
        _h(obj_xbox);
    };
    var _cl = function () {
        if (obj_content != null)
            $s(obj_content);
        if (obj_loading_bar != null) {
            obj_loading_bar.innerHTML = '';
            $h(obj_loading_bar);
        }
        _s(obj_xbox);
    };
    this.closeLoading = function () {
        _cl();
    };
    this.show = function (x, y) {
        //var win_size=getWinSize();
        _scrollWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);
        _scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        setDimension(obj_shield, _scrollWidth, _scrollHeight + 100); setLocation(obj_move, x, y);
        setDDLVisable(false);

        $s(obj_move);
        $s(obj_shield);

        document.onmouseup = mUp;
        document.onmousemove = function (e) { mMove(e); };
    };
    this.closeDialog = closeW;
    $1(title_bar_id).onmousedown = function (e) {
        mDown(e);
    };
    obj_xbox.onclick = function () {
        closeW();
        $h(obj_shield);
        setDDLVisable(true);
    };
};


function DivModelDialogMove(div_id, title_bar_id, xbox_id, shield_id, content_id, loading_bar_id, can_move) {
    var PX, PY,
    obj_move = $1(div_id),
    obj_xbox = $1(xbox_id),
    obj_shield = $1(shield_id),
    obj_content = $1(content_id),
    obj_loading_bar = $1(loading_bar_id)
    xboxClick = null;
    var closeW = function () {
        $h(obj_move);
        _cl();
        $h(obj_shield);
        if (obj_content != null)
            $s(obj_content);
        setDDLVisable(true);
        document.onmouseup = null;
        document.onmousemove = null;
    };
    var mDown = function (e) {
        if (!can_move) return;
        var pos = getEventPosition(e);
        var objPos = getposOffset_c(obj_move);
        if (isIE)
            obj_move.setCapture();
        pX = pos[0] - objPos[0];
        pY = pos[1] - objPos[1];
    };
    var getEventPosition = function (e) {
        if (isIE) return [event.x, event.y];
        return [e.pageX, e.pageY];
    };
    var mMove = function (e) {
        if (!can_move) return;
        var pos = getEventPosition(e);
        var win_size = getWinSize();
        if (pos[0] < 0 || pos[1] < 0 || pos[0] > win_size[0] || pos[1] > win_size[1]) return;
        setLocation(obj_move, pos[0] - pX, pos[1] - pY);
    };
    var mUp = function () {
        if (!can_move) return;
        if (isIE) obj_move.releaseCapture();
    };
    var setDDLVisable = function (is_show) {
        if (!isIE)
            return;
    };
    this.setLoading = function () {
        $h(obj_content);
        obj_loading_bar.innerHTML = "<img src='images/loading.gif'/><p>\u8BF7\u7A0D\u5019...</p>";
        $s(obj_loading_bar);
        _h(obj_xbox);
    };
    var _cl = function () {
        if (obj_content != null)
            $s(obj_content);
        if (obj_loading_bar != null) {
            //obj_loading_bar.innerHTML = '';
            $h(obj_loading_bar);
        }
        _s(obj_xbox);
    };
    this.closeLoading = function () {
        _cl();
    };
    this.show = function (x, y) {
        //var win_size=getWinSize();
        _scrollWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);
        _scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        setDimension(obj_shield, _scrollWidth, _scrollHeight + 100);

        obj_move.style.left = x + "px";
        obj_move.style.top = y + "px"; 
        //setLocation(obj_move, x, y);
        setDDLVisable(false);

        $s(obj_move);
        $s(obj_shield);
        if (can_move) {
            document.onmouseup = mUp;
            document.onmousemove = function (e) { mMove(e); };
        }
    };
    this.closeDialog = closeW;
    $1(title_bar_id).onmousedown = function (e) {
        if (can_move) {
            mDown(e);
        }
    };
    
    this.setXboxClick = function (func) {
    	xboxClick = func;
    }
    
    obj_xbox.onclick = function () {
    	if(xboxClick != null) {
    		xboxClick();
    	} else {
    		closeW();
    	}
    };
};

    

