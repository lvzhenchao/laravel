
/**
商品选择包装后，礼品包装大图展开选择列表
**/
function BigImageList(obj_div) {
    var packageId = -1;
    var bigImageList = new JSRepeater(obj_div);
    bigImageList.ItemTemplate = "<li id='big_image_{list}' value='{package_name}'><img src='{big_image_url}' alt=''><span>¥{package_price}/单</span></li>";
    var imageListData;
    var addEvent = function () {
        for (var i = 0; i < bigImageList.DataSource.length; i++) {
            var obj = $1("big_image_" + bigImageList.DataSource[i].list);
            obj.onmouseover = (function () {
                return function () {
                    
                    if (this.className == "") {
                        this.className = 'after_click';
                    }
                };
            })();
            obj.onmouseout = (function () {
                return function () {
                    if (this.className != "after_click click") {
                        this.className = '';
                    }
                };
            })();
            obj.onclick = (function () {
                return function () {
                    //删掉
                    for (var j = 0; j < bigImageList.DataSource.length; j++) {
                        var obj_temp = $1("big_image_" + bigImageList.DataSource[j].list);
                        obj_temp.className = '';
                        if (this === obj_temp) {
                            imageClick(this, bigImageList.DataSource[j].package_name, bigImageList.DataSource[j].list,
                             bigImageList.DataSource[j].package_price, bigImageList.DataSource[j].little_image_url);
                        }
                    }
                    this.className = 'after_click click';
                    $1("big_image_list").className = 'hide';
                };
            })();
        }
    };
    //私有函数
    var init = function (result) {
        for (var i = 0; i < result.length; i++) {
            result[i].package_price = formatFloat(result[i].package_price);
        }
        bigImageList.DataSource = result;
        bigImageList.DataBind();
        addEvent();
    };
    

    this.initData = function (result) {
    	if(result){
    		imageListData = result;
    	}
        init && init(imageListData);
        if (bigImageList.DataSource) {

            for (var i = 0; i < bigImageList.DataSource.length; i++) {

                if (packageId === bigImageList.DataSource[i].list) {
                    var obj = $1("big_image_" + bigImageList.DataSource[i].list);
                    obj.className = "after_click click";
                }
            }
        }
    };

    //私有函数


    var imageClick;
    this.setImageClick = function (mImageClick) {
        imageClick = mImageClick;
    };

    this.getSelectName = function () {
        for (var i = 0; i < bigImageList.DataSource.length; i++) {
            var obj = $1("big_image_" + bigImageList.DataSource[i].list);
            if (obj.className == "after_click click") {
                return bigImageList.DataSource[i].package_name;

            }
        }
        return null;
    };


    this.getSelectType = function () {
        for (var i = 0; i < bigImageList.DataSource.length; i++) {
            var obj = $1("big_image_" + bigImageList.DataSource[i].list);
            if (obj.className == "after_click click") {
                return bigImageList.DataSource[i].list;
            }
        }
        return null;
    };

    this.getSelectPrice = function () {
        for (var i = 0; i < bigImageList.DataSource.length; i++) {
            var obj = $1("big_image_" + bigImageList.DataSource[i].list);
            if (obj.className == "after_click click") {
                return bigImageList.DataSource[i].package_price;
            }
        }
        return null;
    };



    this.setSelectItem = function (mIndex) {
        packageId = mIndex;
        this.initData();
    };

}

