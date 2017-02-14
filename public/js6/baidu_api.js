function BaiDuAPI(container_id) {

    if (!(this instanceof BaiDuAPI)) return new BaiDuAPI();

    var m_data_source = null;

    var m_baidu_api_data = {
        points_array: new Array(), //点集合
        map: null,
        zoom: 15, //地图缩放级别
        center_points: new BMap.Point(116.446976, 39.965852),
        pick_up_points: null, //我在这里 和 自提数据
        call_back_func: null
    };

    var initMap = function () {
        //百度地图API功能
        m_baidu_api_data.map = new BMap.Map(container_id);
        //计算合适的中心点坐标 和 合适的比例尺
        setZoom();
        //设置中心点和比例尺
        m_baidu_api_data.map.centerAndZoom(m_baidu_api_data.center_points, m_baidu_api_data.zoom);
        //设置地图滚轮效果
        setScrollWheelZoom();
        //添加默认缩放平移控件
        m_baidu_api_data.map.addControl(new BMap.NavigationControl());
    };

    // 编写自定义函数,创建标注
    var addMarker = function (point) {
        var marker = new BMap.Marker(point);
        m_baidu_api_data.map.addOverlay(marker);
    };

    // 设置地图滚轮效果
    var setScrollWheelZoom = function () {
        m_baidu_api_data.map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
        m_baidu_api_data.map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
    };

    // 创建我自己所需要的格式
    var createDataSource = function (pick_pu_points) {
        m_data_source = new Array();
        // 获取“我在这里”
        if (pick_pu_points.Imhere.lat > 0 && pick_pu_points.Imhere.lng > 0) {
            m_baidu_api_data.points_array.push(new BMap.Point(pick_pu_points.Imhere.lng, pick_pu_points.Imhere.lat));
            m_data_source.push(new PickUpPointObject(0, pick_pu_points.Imhere.lat, pick_pu_points.Imhere.lng, "我在这里", "", "", "", 0));
        }
        for (var i = 0; i < pick_pu_points.pickupsiteinfo.length; i++) {
            var point = pick_pu_points.pickupsiteinfo[i];
            m_baidu_api_data.points_array.push(new BMap.Point(point.point_x,point.point_y));
            m_data_source.push(new PickUpPointObject(point.id, point.point_y,point.point_x, point.name, point.open_time, point.address, point.contact_tel, point.display_id));
        }
    }

    // 根据自提点ID获取自提点信息
    var getPickUpInfoByPickUpID = function (pick_up_id) {
        var pick_up_info;
        for (var i = 0; i < m_data_source.length; i++) {
            if (m_data_source[i]._id == pick_up_id) {
                pick_up_info = m_data_source[i];
                break;
            }
        }
        return pick_up_info;
    }

    // 设置合适的比例尺
    var setZoom = function () {
        var viewport = m_baidu_api_data.map.getViewport(m_baidu_api_data.points_array);
        m_baidu_api_data.zoom = viewport.zoom;
        m_baidu_api_data.center_points = viewport.center;
    }

    // 设置回调函数
    this.setCallBackFunc = function (callbackFunc) {
        m_baidu_api_data.call_back_func = callbackFunc;
    }

    // 重置地图的中心点和比例尺
    this.resetMapCenterAndZoom = function () {
        m_baidu_api_data.map.centerAndZoom(m_baidu_api_data.center_points, m_baidu_api_data.zoom);
    }

    // 展示自提点详细信息弹框
    this.showPickUpDetailWindow = function (pick_up_id) {
        var message_window;
        // 隐藏所有的弹框
        for (var i = 0; i < m_data_source.length; i++) {
            if (m_data_source[i]._id == 0) continue;
            message_window = document.getElementById("popup_infor_area_" + m_data_source[i]._id);
            if (message_window) message_window.style.display = "none";
        }
        message_window = document.getElementById("popup_infor_area_" + pick_up_id);
        if (message_window) {
            message_window.style.display = "";
        } else {
            var pick_up_info = getPickUpInfoByPickUpID(pick_up_id);
            if (pick_up_info) {
                m_baidu_api_data.map.addOverlay(new ComplexCustomOverlay(new BMap.Point(pick_up_info._lng, pick_up_info._lat), 3, 0, pick_up_id, pick_up_info._address, pick_up_info._contactTel, pick_up_info._openTime));
            }
        }
    }

    // 在地图中展示5个自提每一页
    this.showPickUpInMap = function (pick_pu_points) {
        //if (pick_pu_points == null) return;

        // 将自定义覆盖物添加到地图当中
        //var result = "{'Imhere':{'lat':116.446976,'lng':39.965852},'errorCode':0,'errorMessage':'','page_count':1,'page_index':1,'page_size':5,'pickupsiteinfo':[{'address':'测试自提点42','city_id':1,'contac_tel':'','contact':'','display_id':1,'distance':3814.880800074305,'id':20047,'is_cod':0,'is_cod_pos':0,'name':'测试自提点42','open_time':'','point_x':116.446976,'point_y':39.988852,'quarter_id':111010801,'town_id':1110108},{'address':'清华大学紫荆公寓2号楼西侧','city_id':1,'contac_tel':'01062935166','contact':'匡召祥','display_id':2,'distance':15133.362000074305,'id':12706,'is_cod':0,'is_cod_pos':0,'name':'清华大学自提点','open_time':'','point_x':116.436976,'point_y':39.965852,'quarter_id':0,'town_id':1110108},{'address':'北京市海淀区定慧东里3号楼1楼102','city_id':1,'contac_tel':'01088110840','contact':'李明军','display_id':3,'distance':15133.362000074305,'id':12823,'is_cod':0,'is_cod_pos':0,'name':'海淀区定慧东里自提点','open_time':'','point_x':116.436976,'point_y':39.969852,'quarter_id':0,'town_id':1110108},{'address':'北京市海淀区清河镇朱房路68号楼北京凯旋星快捷酒店2间','city_id':1,'contac_tel':'01062935166','contact':'匡召祥','display_id':4,'distance':15133.362000074305,'id':12824,'is_cod':0,'is_cod_pos':0,'name':'海淀区清河自提点','open_time':'','point_x':116.448976,'point_y':39.961852,'quarter_id':0,'town_id':1110108}],'record_count':4,'statusCode':0}";
        //var result_json = eval("(" + result + ")");
        //createDataSource(result_json);
        // 创建数据
        createDataSource(pick_pu_points);
        // 初始化地图
        initMap();
        // 将“点”展示到地图上
        for (var i = 0; i < m_data_source.length; i++) {
            if (m_data_source[i]._id == 0) {
                m_baidu_api_data.map.addOverlay(new ComplexCustomOverlay(new BMap.Point(m_data_source[i]._lng, m_data_source[i]._lat), 1, 0, 0));
            }
            else {
                m_baidu_api_data.map.addOverlay(new ComplexCustomOverlay(new BMap.Point(m_data_source[i]._lng, m_data_source[i]._lat), 2, m_data_source[i]._displayID, m_data_source[i]._id, m_data_source[i]._address, m_data_source[i]._contactTel, m_data_source[i]._openTime, m_data_source, m_baidu_api_data.call_back_func));
            }
        }
    };
}

// 自提点对象
function PickUpPointObject(id, lat, lng, name, open_time, address, contact_tel, display_id) {
    this._id = id; //自提点ID
    this._lat = lat; //纬度 小值 
    this._lng = lng; //经度
    this._name = name; //自提点名称
    this._openTime = open_time; //营业时间
    this._address = address; //自提点地址
    this._contactTel = contact_tel; //电话
    this._displayID = display_id; //排序编码
}

// 复杂的自定义覆盖物
function ComplexCustomOverlay(point, type, number, pick_up_id, address, contact_tel, open_time, all_pick_up_info, call_back_func) {
    this._point = point;
    this._type = type; //类型：“我这这里”和自提点这两种
    this._number = number; //编号
    this._pick_up_id = pick_up_id; //自提点ID
    this._address = address; //地址
    this._contactTel = contact_tel; //电话
    this._openTime = open_time; //营业时间
    this._allPickUpInfo = all_pick_up_info; //所有自提点信息
    this._callBackFunc = call_back_func; //回调函数，用于点击地图自提点时，选中自提点列表radiobutton 
}
ComplexCustomOverlay.prototype = new BMap.Overlay();
ComplexCustomOverlay.prototype.initialize = function (map) {
    this._map = map;
    if (this._type == 1) {
        var arrow = this._arrow = document.createElement("span");
        arrow.setAttribute("class", "Imhere");
        arrow.style.position = "absolute";
        arrow.style.background = "url(" + ALIPAY_PATH + "/images/Imhere.png) no-repeat";
        arrow.style.display = "block";
        arrow.style.width = "51px";
        arrow.style.height = "49px";
        // background:url(../images/Imhere.png) no-repeat;display: block;left:180px;top:50px;width: 51px;height: 49px;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="../images/Imhere.png",sizingMethod="noscale");_background:none;

    } else if (this._type == 2) {
        var arrow = this._arrow = document.createElement("a");
        arrow.setAttribute("class", "stationary");
        arrow.style.position = "absolute";
        arrow.style.background = "url(" + ALIPAY_PATH + "/images/stationary.png) no-repeat";
        arrow.style.display = "block";
        arrow.style.width = "19px";
        arrow.style.height = "28px";
        arrow.style.color = "#f60";
        arrow.style.fontWeight = "bold";
        // background:url(../images/stationary.png) no-repeat;display: block;width: 19px;height: 28px;color:#f60;font-weight: bold;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="../images/stationary.png",sizingMethod="noscale");_background:none;

        var span = document.createElement("span");
        span.style.position = "absolute";
        span.style.display = "block";
        span.style.width = "15px";
        span.style.height = "15px";
        span.style.fontSize = "9px";
        span.style.color = "#f60";
        span.style.fontWeight = "bold";
        span.style.top = "-1px";
        span.style.left = "2px";
        span.style.textAlign = "center";
        //position: absolute;display: block;width: 15px;height: 15px;font-size: 9px;color:#f60;font-weight: bold;top:-1px;left: 2px;text-align: center;vertical-align: center;
        span.innerHTML = this._number;
        arrow.appendChild(span);
        // 当鼠标移进图标时
        arrow.onmouseover = function () {
            this.style.cursor = "pointer";
        }
        // 再次用到闭包
        arrow.onclick = function (map, point, pick_up_id, address, contact_tel, open_time, all_pick_up_info, call_back_func) {
            return function () {
                var message_window;
                // 隐藏所有的弹框
                for (var i = 0; i < all_pick_up_info.length; i++) {
                    if (all_pick_up_info[i]._id == 0) continue;
                    message_window = document.getElementById("popup_infor_area_" + all_pick_up_info[i]._id);
                    if (message_window) message_window.style.display = "none";
                }
                message_window = document.getElementById("popup_infor_area_" + pick_up_id);
                if (message_window) {
                    message_window.style.display = "";
                } else {
                    map.addOverlay(new ComplexCustomOverlay(point, 3, 0, pick_up_id, address, contact_tel, open_time));
                }
                if (call_back_func != null) call_back_func(pick_up_id);
            }
        } (this._map, this._point, this._pick_up_id, this._address, this._contactTel, this._openTime, this._allPickUpInfo, this._callBackFunc);
    } else if (this._type == 3) {
        var arrow = this._arrow = document.createElement("div");
        arrow.style.background = "url(../images/popup_infor_bg.png) repeat";
        arrow.style.position = "absolute";
        arrow.style.padding = "6px";
        arrow.style.width = "259px";
        //background:url(../images/popup_infor_bg.png) repeat;position: absolute;top:133px;left: 80px;padding: 6px; width: 259px;_background:none;

        arrow.setAttribute("class", "popup_infor_area");
        arrow.setAttribute("id", "popup_infor_area_" + this._pick_up_id);
        arrow.innerHTML =
        "<div class='ie6Popup'></div>" +
        "<div class='popup_infor'>" +
                "<span class='close' id='popup_close_" + this._pick_up_id + "'></span>" +
                "<p class='clearfix'><strong class='ie6_fl'>地址：</strong><span class='popup_address'>" + this._address + "</span></p>" +
                "<p><strong>电话：</strong><span>" + this._contactTel + "</span></p>" +
                "<p><strong>营业时间：</strong><span>" + this._openTime + "</span></p>" +
                "<span class='triangle_icon'></span>" +
        "</div>";
    }
    // 把创建好的元素添加到地图中
    this._map.getPanes().labelPane.appendChild(arrow);
    if (this._type == 3) {
        // 获取自提点关闭按钮
        var pick_up_point_message_close_element = document.getElementById('popup_close_' + this._pick_up_id);
        // 终于用了一回闭包
        pick_up_point_message_close_element.onclick = function (id) {
            return function () {
                document.getElementById("popup_infor_area_" + id).style.display = "none";
            };
        } (this._pick_up_id);
    }
    return arrow;
};
// 将点描绘在哪里
ComplexCustomOverlay.prototype.draw = function () {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);

    if (this._type == 3) {
        var height;
        var width;
        var message_window = document.getElementById("popup_infor_area_" + this._pick_up_id);
        if (message_window) {
            height = message_window.offsetHeight;
            width = message_window.offsetWidth;
        }
        if (height && width) {
            this._arrow.style.left = pixel.x - width + 122 + "px";
            this._arrow.style.top = pixel.y - height - 44 + "px";
        }
    }
    else {
        this._arrow.style.left = pixel.x - 25 + "px";
        this._arrow.style.top = pixel.y - 30 + "px";
    }
};