
var PIECE_TEMPLATE =
    "<div class='popup-wrap popup-addOrder' style='left:10px; top:200px;position:absolute;display:none;z-index:10000;'   id='shippingfee_piece_container'>"
  + "<div class='popup-title'   id='shippingfee_piece_title'>"
      + " <h3>运费凑单</h3>"
      + " <span class='color-orange' id='shippingfee_piece_subtitle'></span> "
      + " <a class='btn-popup-close' href='javascript:for_99click();' id='shippingfee_piece_close'></a>"
   + "</div>"
   + "<div class='popup-cont'>"
      + " <div class='popup-cont-inner'> "
    	 + "<div class='tabs clearfix' id='piece_tabs' style='display:none;'>"
        	 + "<a class='active' href='javascript:for_99click();' title='' id='piece_nav_pub'>出版物</a>"
            + " <a href='javascript:for_99click();' title='' id='piece_nav_gm'>非出版物</a>"
         + "</div>"
    	 + "<div class='mainCont' id='piece_maincont'></div>"
       + "  <div class='btns' id='piece_btns'>"
            + " <a class='btn-prev' href='javascript:for_99click();' title='' id='piece_btn_prev' ></a>"
            + " <a class='btn-next-disabled' href='javascript:for_99click();' title='' id='piece_btn_next'></a>"
        + " </div>"
     + "</div>"
 + "  </div>"
 + "</div>";



//凑单弹出
//var piece_click = function (order_sequence_id) {
//    var shipping = new ShippingFeePiece("div_shippingfeepiece");
//    shipping.show(order_sequence_id);
//}

function ShippingFeePiece(container_id) {
    var m_order_sequence_id = null;
    var m_shipment_panel = new JSPanel(container_id);
    var m_piece_buy_success = function () { };
    var town_id = 0;
    var m_left = 0;
    var m_top = 0;

    var PIECE_MAX_PRODUCT = 40;
    var PIECE_PAGE_SIZE = 8;
    var PIECE_CURRENT_PAGE = 1;
    var PIECE_CURRENT_MEDIUM = 1;
    var PIECE_DATA = null;

    var real_time_shippingfee_piece_subtitle = ""; //实时的免运费凑单文字提示


    this.show = function (orderid) {
        document.getElementById('shield_frame').style.height = document.body.clientHeight + "px";
        //
        m_order_sequence_id = orderid;

        m_shipment_panel.Template = PIECE_TEMPLATE;
        m_shipment_panel.DataBind();
        //
        var shippingfee_piece_Dialog = new DivModelDialogMove('shippingfee_piece_container', 'shippingfee_piece_title', 'shippingfee_piece_close', 'div_shield', 'shippingfee_piece_content', 'piece_maincont', false);


        if (shippingfee_piece_Dialog != null) {
            piece_set_positon();
            shippingfee_piece_Dialog.show(m_left, m_top);
        }
        var shippingfee_piece_ajax = new Ajax('/Assem/FindAssemProduct');
        shippingfee_piece_ajax.OnReading
        (
            function () {
                piece_loading();
            }
        );
        shippingfee_piece_ajax.OnSucceed
        (
            function (result) {
                if (result != null && result['error_code'] == 0) {
                    PIECE_DATA = result;
                    piece_init_products();
                }
                else {
                    piece_null_error();
                }
            }
        );
        var shippingfee_piece_data = new Hashtable();
        shippingfee_piece_data['orderSeqId'] = m_order_sequence_id;
        shippingfee_piece_ajax.invokeServer(shippingfee_piece_data, 'POST', true);
    }
    this.close = function () {
        shippingfee_piece_Dialog.closeDialog();
    }
    this.setPieceBuySuccess = function (fnCallback) {
        m_piece_buy_success = fnCallback;
    }

    var piece_set_positon = function () {
        var iWidth = 900;
        var iHeight = 288;
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
    //凑单初始化
    var piece_init_products = function () {
        real_time_shippingfee_piece_subtitle = PIECE_DATA["shipping_fee_desc"];
        var medium = 1;
        var order_item_type = PIECE_DATA["order_item_type"];
        town_id = PIECE_DATA["town_id"];
        $s($1('piece_tabs'));
        if (order_item_type == 0) {
            medium = 0;

            $h($1('piece_nav_pub'));
            $s($1('piece_nav_gm'));
        }
        if (order_item_type == 1) {
            medium = 1;

            $s($1('piece_nav_pub'));
            $h($1('piece_nav_gm'));
        }
        if (order_item_type == 2) {
            medium = 1;

            $s($1('piece_nav_pub'));
            $s($1('piece_nav_gm'));
            $1('piece_nav_pub').className = 'active';
            $1('piece_nav_gm').className = '';
        }

        if (PIECE_DATA["shop_id"] > 0) {
            $h($1('piece_nav_pub'));
            $h($1('piece_nav_gm'));

            $h($1('piece_tabs'));
        }

        piece_set_product(medium, 1);
    }
    //凑单图书、百货nav
    var piece_nav_click = function (medium) {

        if (medium == 0) {
            $1('piece_nav_pub').className = '';
            $1('piece_nav_gm').className = 'active';
        }
        if (medium == 1) {
            $1('piece_nav_pub').className = 'active';
            $1('piece_nav_gm').className = '';
        }

        piece_set_product(medium, 1);
    }
    //凑单翻页
    var piece_prev_click = function () {
        if ($1('piece_btn_prev').className == 'btn-prev') {
            piece_set_product(PIECE_CURRENT_MEDIUM, PIECE_CURRENT_PAGE - 1);
        }
    }
    var piece_next_click = function () {
        if ($1('piece_btn_next').className == 'btn-next') {
            piece_set_product(PIECE_CURRENT_MEDIUM, PIECE_CURRENT_PAGE + 1);
        }
    }
    //error
    var piece_error = function () {
        $1('piece_btns').className = 'btns hide';
        $1('piece_maincont').innerHTML = '<p class="error"><span class="icon icon-error-freight"></span><span class="text">对不起系统崩溃，请您刷新</span></p>';
    }
    //piece null error
    var piece_null_error = function () {
        $1('piece_btns').className = 'btns hide';
        $1('piece_maincont').innerHTML = '<p class="error"><span class="icon icon-error-freight"></span><span class="text">我们尚未获取到为您推荐的商品。您可以<a href="http://promo.dangdang.com" target="_blank">查看促销</a></span></p>';
    }

    //loadding
    var piece_loading = function () {
        $1('piece_btns').className = 'btns hide';
        $1('piece_maincont').innerHTML = '<p class="error"><img src="images/loading.gif">请稍候..</p>';
    }
    //set html medium 0 gm 1 pub
    var piece_set_product = function (medium, currentpage) {
        PIECE_CURRENT_MEDIUM = medium;
        PIECE_CURRENT_PAGE = currentpage;
        var current_data = null;
        if (medium == 0) {
            current_data = PIECE_DATA["products_gm"];
        }
        if (medium == 1) {
            current_data = PIECE_DATA["products_pub"];
        }

        //验证页数
        var product_count = current_data.length;
        if (product_count > PIECE_MAX_PRODUCT) product_count = PIECE_MAX_PRODUCT;
        var allpage = Math.ceil(product_count / PIECE_PAGE_SIZE);
        init_event();
        if (currentpage < 0 || currentpage > allpage) {
            piece_null_error();
            return;
        }

        var begincount = (currentpage - 1) * PIECE_PAGE_SIZE;
        var endcount = begincount + PIECE_PAGE_SIZE;
        if (endcount > product_count) endcount = product_count;

        //set btn
        $1('piece_btns').className = 'btns';
        $1('piece_btn_prev').className = 'btn-prev';
        $1('piece_btn_next').className = 'btn-next';
        if (currentpage == 1) {
            $1('piece_btn_prev').className = 'btn-prev-disabled';
        }
        if (currentpage == allpage) {
            $1('piece_btn_next').className = 'btn-next-disabled';
        }
        if (allpage == 1) {
            $1('piece_btn_prev').className = 'btn-prev-disabled';
            $1('piece_btn_next').className = 'btn-next-disabled';
        }

        //subtitle
        $1('shippingfee_piece_subtitle').innerHTML = real_time_shippingfee_piece_subtitle;
        //page
        var product_info = "<div class='item'><div class='filter-bar'><span class='page-info' id='piece_page_info'>";
        product_info += "<strong class='color-orange'>" + currentpage + "</strong>/" + allpage + "</span></div>";
        product_info += "<div class='cont' id='shippingfee_piece_content'>";
        //products
        product_info += "<ul class='clearfix '>";
        for (var i = begincount; i < endcount; i++) {
            var product_id = current_data[i]["product_id"];
            var product_name = current_data[i]["product_name"];
            var original_price = current_data[i]["original_price"];
            var bargain_price = current_data[i]["bargain_price"];
            var medium_scope_id = current_data[i]["medium_scope_id"];
            var product_img = current_data[i]["product_img"];

            product_info += " <li>"
                + "<div class='good-list clearfix'>"
                    + "<div class='col-l'>"
                        // tj 2013-06-17 add 跳转到单品页
                        //+ "<img src='" + product_img + "' alt='" + product_name + "' />"
                        //+ "<a href='http://product.dangdang.com/product.aspx?product_id=" + product_id + "#ddclick_reco_checkout_freightage' target='_blank' style='border:0px;'><div style='width:70px; height:70px; text-align:center;'><img src='" + product_img + "' alt='" + product_name + "'  style='width:auto; height:auto;'/></div></a>"
                        + "<div style='width:70px; height:70px;'><a href='http://product.dangdang.com/" + product_id + ".html#ddclick_reco_checkout_freightage' target='_blank' style='border:0px;'><img src='" + product_img + "' alt='" + product_name + "'/></a></div>"
                    + "</div>"
                    + "<div class='col-r'>"
                        // tj 2013-06-17 add 跳转到单品页
                        //+ "<p class='title'>" + product_name + "</p>"
                        //+ "<p class='title'><a href='http://product.dangdang.com/product.aspx?product_id=" + product_id + "#ddclick_reco_checkout_freightage' target='_blank'>" + product_name + "</a></p>"
                        + "<p class='title'><a href='http://product.dangdang.com/" + product_id + ".html#ddclick_reco_checkout_freightage' target='_blank'>" + product_name + "</a></p>"
                        + "<p class='price'>"
                            + "<span class='price-d'>&yen;" + bargain_price + "</span>"
                        + " <span class='price-r'>&yen;" + original_price + "</span>"
                        + "</p>"
                        + "<p class='submit'>"
                            + "<input type='text' id='piece_txt_product_" + product_id + "' value='1' />"
                            // tj 2013-06-17 add 修改ID
                            //+ "<a href='javascript:for_99click();' class='btn btn-small-orange' id='piece_btn_buy_" + product_id + "'>加入订单</a>"
                            + "<a href='javascript:for_99click();' class='btn btn-small-orange' id='ddclick_reco_checkout_freightage_" + product_id + "'>加入订单</a>"
                            + "<span class='warn-empty' style='display:none;' id='piece_btn_tip_" + product_id + "'>卖光了</span>"
                        + " </p>"
                + " </div>"
            + " </div>"
            + " </li>";
        }
        product_info += "</ul>";
        product_info += "</div></div>";

        $1("piece_maincont").innerHTML = product_info;

        init_event();

        for (var i = begincount; i < endcount; i++) {
            var _product_id = current_data[i]["product_id"];
            (function (_product_id) { $1("ddclick_reco_checkout_freightage_" + _product_id).onclick = function () { piece_buy_click(_product_id); } })(_product_id);
        }
    }
    var show_shippingfee_piece_subtitle = function (result) {
        if (result == null || result["order_list"] == null || result["order_list"].length == null || result["order_list"].length <= 0) return;
        for (var i = 0; i < result["order_list"].length; i++) {
            var cur_order = result["order_list"][i];
            if (cur_order["shop_id"] != null && cur_order["shop_id"] == 0) {
                if (cur_order["free_shippingfee_gap"] != null && cur_order["free_shippingfee_gap"] > 0) {
                    real_time_shippingfee_piece_subtitle = "再购买" + cur_order["free_shippingfee_gap"] + "元商品，订单即可免运费";
                    $1('shippingfee_piece_subtitle').innerHTML = real_time_shippingfee_piece_subtitle;
                }
                else {
                    real_time_shippingfee_piece_subtitle = "订单已免运费";
                    $1('shippingfee_piece_subtitle').innerHTML = "订单已免运费";
                }
            }
        }
    }

    //购买
    var piece_buy_click = function (productid) {
        if ($1('ddclick_reco_checkout_freightage_' + productid).className == "btn btn-small-orange") {
            var productcount = $1('piece_txt_product_' + productid).value;
            if (!checknumber(productcount)) {
                alert("请输入商品数量");
                return;
            }
            piece_buy_error(productid, "请稍候...", 0); //<img src='images/loading.gif'>

            var shippingfee_piece_add_order_ajax = new Ajax('/Assem/BuyAssemProducts');
            shippingfee_piece_add_order_ajax.OnSucceed
            (
                function (result) {
                    if (result != null && result['error_code'] == 0) {
                        piece_buy_success_tip(productid, "加入成功", 1);
                        m_piece_buy_success(result);
                        change_car_count(CKCookie.getCookie("cart_items_count"));
                        show_shippingfee_piece_subtitle(result);
                    }
                    else {
                        piece_buy_error(productid, "卖光了", 1);
                    }
                }
            );
            var shippingfee_piece_add_data = new Hashtable();
            shippingfee_piece_add_data['productId'] = productid;
            shippingfee_piece_add_data['productCount'] = productcount;
            //shippingfee_piece_add_data['town_id'] = town_id;

            shippingfee_piece_add_order_ajax.invokeServer(shippingfee_piece_add_data, 'POST', true);
            shippingfee_piece_add_order_ajax.OnTimeout
            (
    	        function () {
    	            shippingfee_piece_add_order_ajax.Abort();
    	        }
            );
        }
    }
    //购买失败
    var piece_buy_error = function (productid, content, timeout) {
        $1('piece_btn_tip_' + productid).innerHTML = content;
        $1('ddclick_reco_checkout_freightage_' + productid).className = "btn btn-small-grey-disabled";
        $s($1('piece_btn_tip_' + productid));
        if (timeout == 1) {
            setTimeout(function () { $h($1('piece_btn_tip_' + productid)) }, 3000);
        }
    }

    var piece_buy_success_tip = function (productid, content, timeout) {
        $1('ddclick_reco_checkout_freightage_' + productid).className = "btn btn-small-orange";
        $1('piece_btn_tip_' + productid).innerHTML = content;
        $s($1('piece_btn_tip_' + productid));
        if (timeout == 1) {
            setTimeout(function () { $h($1('piece_btn_tip_' + productid)) }, 3000);
        }
    }

    var init_event = function () {
        if ($1("piece_btn_prev") != null) {
            $1("piece_btn_prev").onclick = piece_prev_click;
        }
        if ($1("piece_btn_next") != null) {
            $1("piece_btn_next").onclick = piece_next_click;
        }
        if ($1("piece_nav_pub") != null) {
            $1("piece_nav_pub").onclick = function () { piece_nav_click('1'); };
        }
        if ($1("piece_nav_gm") != null) {
            $1("piece_nav_gm").onclick = function () { piece_nav_click('0'); };
        }
    }
    var checknumber = function (input) {
        var reg = /^[1-9]*[1-9][0-9]*$/;
        return reg.test(input);
    }
}
   