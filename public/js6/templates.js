var RPT_OVERSEAS_TAX_ITEM_TEMPLATE = "<p class='p-child {overseas_tax_display}'><span class='span-w160'>订单{sort_num}税费：</span><span class='{default_class}'>&yen;{overseas_tax}</span></p>";
var cartItemHeaderTemplate =
   "<div class=\"title\">"
 + "    <ul>"
 + "        <li>"
 + "            <div class=\"col1\">商品名称</div>"
 + "            <div class=\"col-error\"></div>"
 + "            <div class=\"col2\">当当价</div>"
 + "            <div class=\"col3\">促销价</div>"
 + "            <div class=\"col4\">数量</div>"
 + "            <div class=\"col5\">小计</div>"
 + "            <div class=\"col-collect title\">操作</div>"
 + "        </li>"
 + "    </ul>"
 + "</div>";
var cartItemSelfHeaderTemplate =
   "<div class=\"title\">"
 + "    <ul>"
 + "        <li>"
 + "            <div class=\"col1\">商品名称</div>"
 + "            <div class=\"col-error\"></div>"
 + "            <div class=\"col-cang\">所在仓库</div>"
 + "            <div class=\"col2\">当当价</div>"
 + "            <div class=\"col3\">促销价</div>"
 + "            <div class=\"col4\">数量</div>"
 + "            <div class=\"col5\">小计</div>"
 + "            <div class=\"col-collect title\">操作</div>"
 + "        </li>"
 + "    </ul>"
 + "</div>";
var cartItemDirectBuySelfHeaderTemplate =
   "<div class=\"title\">"
 + "    <ul>"
 + "        <li>"
 + "            <div class=\"col1\">商品名称</div>"
 + "            <div class=\"col-error\"></div>"
 + "            <div class=\"col-cang\">所在仓库</div>"
 + "            <div class=\"col2\">当当价</div>"
 + "            <div class=\"col3\">促销价</div>"
 + "            <div class=\"col4\">数量</div>"
 + "            <div class=\"col5\">小计</div>"
 + "        </li>"
 + "    </ul>"
 + "</div>";
var cartItemDirectBuyHeaderTemplate =
   "<div class=\"title\">"
 + "    <ul>"
 + "        <li>"
 + "            <div class=\"col1\">商品名称</div>"
 + "            <div class=\"col-error\"></div>"
 + "            <div class=\"col2\">当当价</div>"
 + "            <div class=\"col3\">促销价</div>"
 + "            <div class=\"col4\">数量</div>"
 + "            <div class=\"col5\">小计</div>"
 + "        </li>"
 + "    </ul>"
 + "</div>";
cartItemDepositPresaleHeaderTemplate =
   "<div class=\"title\">"
 + "    <ul>"
 + "        <li>"
 + "            <div class=\"col1\">商品名称</div>"
 + "            <div class=\"col-error\"></div>"
 + "            <div class=\"col2\">定金</div>"
 + "            <div class=\"col3\">尾款</div>"
 + "            <div class=\"col4\">数量</div>"
 + "            <div class=\"col5\">小计</div>"
 + "        </li>"
 + "    </ul>"
 + "</div>";
var cartItemTemplate =
   "<div class=\"item {lastClassName} {errorClassName}\">"
 + "    <ul id=\"order{order_sequence_id}Item{item_index}SubItems\">"
 + "        <!-- add sub items -->"
 + "    </ul>"
 + "    <div class=\"{gift_card_charge_visiable}\" style=\"padding:0 0 5px 15px;\">"
 + "        <p style=\"color:#F40000\">*本商品使用礼品卡将产生手续费</p>"
 + "    </div>"
 + "</div>";
var cartSubItemTemplate =
   "<li class=\"{errorClassName}\">"
 + "    <div class=\"col1\">"
 + "        <p>"
 + "            <span class=\"{product_type_class_name}\">{product_type_name}</span>"
 + "            {product_name_template}"
 + "        </p>"
 + "    </div>"
 + "    <div class=\"col-error\">{error_name}</div>"
 + "    <div class=\"col2\"><span>{dangdang_price_name}{discount_name}</span></div>"
 + "    <div class=\"col3 {sale_price_class_name}\">{sale_price_name}</div>"
 + "    <div class=\"col4\">{product_count_name}</div>"
 + "    <div class=\"col5\">{amount_name}</div>"
 + "    <div class=\"col-collect\"><a href=\"javascript:void(0)\" data-click=\"uncheckCartItem({deleteKey})\">{operation_name}</a></div>"
 + "</li>";
var cartSubItemSelfTemplate =
   "<li class=\"{errorClassName}\">"
 + "    <div class=\"col1\">"
 + "        <p>"
 + "            <span class=\"{product_type_class_name}\">{product_type_name}</span>"
 + "            {product_name_template}"
 + "        </p>"
 + "        <span class='{giftPackagingClassName}'>"
 + "            不支持礼品包装"
 + "            <em></em>"
 + "        </span>"
 + "    </div>"
 + "    <div class=\"col-error\">{error_name}</div>"
 + "    <div class=\"col-cang\">{store_name}</div>"
 + "    <div class=\"col2\"><span>{dangdang_price_name}{discount_name}</span></div>"
 + "    <div class=\"col3 {sale_price_class_name}\">{sale_price_name}</div>"
 + "    <div class=\"col4\">{product_count_name}</div>"
 + "    <div class=\"col5\">{amount_name}</div>"
 + "    <div class=\"col-collect\"><a href=\"javascript:void(0)\" data-click=\"uncheckCartItem({deleteKey})\">{operation_name}</a></div>"
 + "</li>";
var cartSubItemDirectBuyTemplate =
    "<li class=\"{errorClassName}\">"
 + "    <div class=\"col1\">"
 + "        <p>"
 + "            <span class=\"{product_type_class_name}\">{product_type_name}</span>"
 + "            {product_name_template}"
 + "        </p>"
 + "    </div>"
 + "    <div class=\"col-error\">{error_name}</div>"
 + "    <div class=\"col2\"><span>{dangdang_price_name}{discount_name}</span></div>"
 + "    <div class=\"col3 {sale_price_class_name}\">{sale_price_name}</div>"
 + "    <div class=\"col4\">{product_count_name}</div>"
 + "    <div class=\"col5\">{amount_name}</div>"
 + "</li>";
var cartSubItemDepositPresaleTemplate =
    "<li class=\"{errorClassName}\">"
 + "    <div class=\"col1\">"
 + "        <p>"
 + "            <span class=\"{product_type_class_name}\">{product_type_name}</span>"
 + "            {product_name_template}"
 + "        </p>"
 + "    </div>"
 + "    <div class=\"col-error\">{error_name}</div>"
 + "    <div class=\"col2\"><span>{deposit_amount}</span></div>"
 + "    <div class=\"col3\">{balance_amount}</div>"
 + "    <div class=\"col4\">{product_count_name}</div>"
 + "    <div class=\"col5\">{amount_name}</div>"
 + "</li>";
var cartSubItemDirectBuySelfTemplate =
    "<li class=\"{errorClassName}\">"
 + "    <div class=\"col1\">"
 + "        <p>"
 + "            <span class=\"{product_type_class_name}\">{product_type_name}</span>"
 + "            {product_name_template}"
 + "        </p>"
 + "    </div>"
 + "    <div class=\"col-error\">{error_name}</div>"
 + "    <div class=\"col-cang\">{store_name}</div>"
 + "    <div class=\"col2\"><span>{dangdang_price_name}{discount_name}</span></div>"
 + "    <div class=\"col3 {sale_price_class_name}\">{sale_price_name}</div>"
 + "    <div class=\"col4\">{product_count_name}</div>"
 + "    <div class=\"col5\">{amount_name}</div>"
 + "</li>";
var cartSubItemCMobileTemplate =
        "<li class=\"{errorClassName}\">"
 + "    <div class=\"col1\">"
 + "        <p>"
 + "            <span class=\"{product_type_class_name}\">{product_type_name}</span>"
 + "            {product_name_template}"
 + "        </p>"
 + "    </div>"
 + "    <div class=\"col-error\">{error_name}</div>"
 + "    <div class=\"col2\"><span>{dangdang_price_name}{discount_name}</span></div>"
 + "    <div class=\"col3 {sale_price_class_name}\">{sale_price_name}</div>"
 + "    <div class=\"col4\">{product_count_name}</div>"
 + "    <div class=\"col5\">{amount_name}</div>"
 + "</li>"
 + "<li class=\"{errorClassName}\">"
 + "    <div class=\"col1\">"
 + "        <p>"
 + "            <span class=\"{product_type_class_name}\">{product_type_name}</span>"
 + "            [号码]{sim_card_id}({sim_card_province_name})"
 + "        </p>"
 + "    </div>"
 + "    <div class=\"col-error\">{error_name}</div>"
 + "    <div class=\"col2\"><span>{sim_card_balance}</span></div>"
 + "    <div class=\"col3 {sale_price_class_name}\">{discount_amount}</div>"
 + "    <div class=\"col4\">{product_count_name}</div>"
 + "    <div class=\"col5\">{sim_card_balance_bargin_price}</div>"
 + "</li>";
var cartSubItemCMobileSelfTemplate =
        "<li class=\"{errorClassName}\">"
 + "    <div class=\"col1\">"
 + "        <p>"
 + "            <span class=\"{product_type_class_name}\">{product_type_name}</span>"
 + "            {product_name_template}"
 + "        </p>"
 + "    </div>"
 + "    <div class=\"col-error\">{error_name}</div>"
 + "    <div class=\"col-cang\">{store_name}</div>"
 + "    <div class=\"col2\"><span>{dangdang_price_name}{discount_name}</span></div>"
 + "    <div class=\"col3 {sale_price_class_name}\">{sale_price_name}</div>"
 + "    <div class=\"col4\">{product_count_name}</div>"
 + "    <div class=\"col5\">{amount_name}</div>"
 + "</li>"
 + "<li class=\"{errorClassName}\">"
 + "    <div class=\"col1\">"
 + "        <p>"
 + "            <span class=\"{product_type_class_name}\">{product_type_name}</span>"
 + "            [号码]{sim_card_id}({sim_card_province_name})"
 + "        </p>"
 + "    </div>"
 + "    <div class=\"col-error\">{error_name}</div>"
 + "    <div class=\"col-cang\">{store_name}</div>"
 + "    <div class=\"col2\"><span>{sim_card_balance}</span></div>"
 + "    <div class=\"col3 {sale_price_class_name}\">{discount_amount}</div>"
 + "    <div class=\"col4\">{product_count_name}</div>"
 + "    <div class=\"col5\">{sim_card_balance_bargin_price}</div>"
 + "</li>";

var productNameTemplate =
   "<span class=\"{product_class_name}\" title=\"{product_name}\">{product_name_trunc}</span>";
var setProductNameTemplate =
   "<span class=\"{product_class_name}\" title=\"{product_name}\">{product_name_trunc}</span>";
var cartItemErrorLack =
   "<p>"
 + "    <span class=\"icon icon-warn\"></span>"
 + "    该商品暂时缺货，建议您选购其它商品或将此商品"
 + "    <a href=\"javascript:void(0)\" data-click=\"addFavorite({deleteKey})\">移入收藏</a>"
 + "</p>";
var cartItemErrorRegionLack =
   "<p>"
 + "    <span class=\"icon icon-warn\"></span>"
 + "    该商品暂不能配送到{address_name}，您可以将商品"
 + "    <a href=\"javascript:void(0)\" data-click=\"addFavorite({deleteKey})\">移入收藏</a> 或者 "
 + "    <a href=\"javascript:void(0)\" data-click=\"changeConsignee()\">修改地址</a>"
 + "</p>";
var cartItemErrorPartialLack =
   "<p>"
 + "    <span class=\"icon icon-warn\"></span>"
 + "    该商品库存不足，目前最多可购买{stock_count}件，建议"
 + "    <a href=\"http://shopping.dangdang.com/shoppingcart/shopping_cart.aspx?ref=checkout-0-D\">返回购物车</a> 修改或将商品"
 + "    <a href=\"javascript:void(0)\" data-click=\"addFavorite({deleteKey})\">移入收藏</a>"
 + "</p>";
var cartItemErrorExchangeLack =
   "<p>"
 + "    <span class=\"icon icon-warn\"></span>"
 + "    换购商品暂时缺货，可以将该商品"
 + "    <a href=\"javascript:void(0)\" data-click=\"deleteCartItem({deleteKey})\">删除</a> 或"
 + "    <a href=\"http://shopping.dangdang.com/shoppingcart/shopping_cart.aspx?ref=checkout-0-D\">返回购物车</a>"
 + "</p>";
var cartItemErrorExchangeParentLack =
   "<p>"
 + "    <span class=\"icon icon-warn\"></span>"
 + "    由于商品“{parent_product_name}”暂不能配送，换购商品将不再发货"
 + "</p>";
var cartItemErrorGiftLack =
   "<p>"
 + "    <span class=\"icon icon-warn\"></span>"
 + "    赠品暂时缺货，您可以将赠品"
 + "    <a href=\"javascript:void(0)\" data-click=\"deleteCartItem({deleteKey})\">删除</a> 或"
 + "    <a href=\"http://shopping.dangdang.com/shoppingcart/shopping_cart.aspx?ref=checkout-0-D\">返回购物车</a>"
 + "</p>";
var cartItemErrorMoreGiftLack =
   "<p>"
 + "    <span class=\"icon icon-warn\"></span>"
 + "    赠品暂时缺货，您可以将赠品"
 + "    <a href=\"javascript:void(0)\" data-click=\"deleteCartItemMore({deleteKey})\">删除</a>"
 + "</p>";
var cartItemErrorGiftParentLack =
   "<p>"
 + "    <span class=\"icon icon-warn\"></span>"
 + "    由于商品“{parent_product_name}”暂不能配送，赠品将不再发货"
 + "</p>";
var cartItemErrorSetLack =
   "<p>"
 + "    <span class=\"icon icon-warn\"></span>"
 + "    该商品暂时缺货，您可以"
 + "    <a href=\"javascript:void(0)\" data-click=\"deleteSet({deleteKey})\">删除套餐</a> 或将该商品"
 + "    <a href=\"javascript:void(0)\" data-click=\"deleteCartItem({deleteKey})\">删除</a>，其他商品将不再享受套餐优惠</p>"
 + "</p>";
var cartItemErrorUnsupportShipment =
   "<p>"
 + "    <span class=\"icon icon-warn\"></span>"
 + "    该商品暂不支持{shipment_name}配送，您可以"
 + "    <a href=\"javascript:void(0)\" data-click=\"changeShipment()\">修改送货方式</a>"
 + "</p>";
var cartItemErrorUnsupportPayment =
   "<p>"
 + "    <span class=\"icon icon-warn\"></span>"
 + "    该商品暂不支持{payment_name}配送，您可以"
 + "    <a href=\"javascript:void(0)\" data-click=\"changePayment()\">修改支付方式</a>"
 + "</p>";
var cartItemErrorPromotionMaxLimit =
   "<p>"
 + "    <span class=\"icon icon-warn\"></span>"
 + "    每账户限购{limit_buy_count}件，您已购买{buyed_prd_count}件，{can_buy_desc}您可以"
 + "    <a href=\"http://shopping.dangdang.com/shoppingcart/shopping_cart.aspx?ref=checkout-0-D\">返回修改购物车</a> 或"
 + "    <a href=\"javascript:void(0)\" data-click=\"addFavorite({deleteKey})\">移入收藏</a>"
 + "</p>";
var cartItemErrorProductMaxLimit =
   "<p>"
 + "    <span class=\"icon icon-warn\"></span>"
 + "    该商品为限购品，最多还可以购买{max_buy_count}件，您可以"
 + "    <a href=\"http://shopping.dangdang.com/shoppingcart/shopping_cart.aspx?ref=checkout-0-D\">返回购物车</a> 修改数量，或将商品"
 + "    <a href=\"javascript:void(0)\" data-click=\"addFavorite({deleteKey})\">移入收藏</a>"
 + "</p>";
var cartItemErrorVipMaxLimit =
   "<p>"
 + "    <span class=\"icon icon-warn\"></span>"
 + "    该商品为VIP限购品，最多还可以购买{max_buy_count}件，您可以"
 + "    <a href=\"http://shopping.dangdang.com/shoppingcart/shopping_cart.aspx?ref=checkout-0-D\">返回购物车</a> 修改数量，或将商品"
 + "    <a href=\"javascript:void(0)\" data-click=\"addFavorite({deleteKey})\">移入收藏</a>"
 + "</p>";
var cartItemErrorMinLimit =
   "<p>"
 + "    <span class=\"icon icon-warn\"></span>"
 + "    该商品需{min_buy_count}件以上方可购买，您可以"
 + "    <a href=\"http://shopping.dangdang.com/shoppingcart/shopping_cart.aspx?ref=checkout-0-D\">返回购物车</a> 修改数量，或将商品"
 + "    <a href=\"javascript:void(0)\" data-click=\"addFavorite({deleteKey})\">移入收藏</a>"
 + "</p>";
var cartItemErrorCollectionGiftError =
   "<p>"
 + "    <span class=\"icon icon-warn\"></span>"
 + "    商品总额减少，已不满足赠送条件，您可以将赠品"
 + "    <a href=\"javascript:void(0)\" data-click=\"deleteCartItem({deleteKey})\">删除</a> 或"
 + "    <a href=\"http://shopping.dangdang.com/shoppingcart/shopping_cart.aspx?ref=checkout-0-D\">返回购物车</a>"
 + "</p>";
var cartItemErrorSelfExceptionError =
   "<p>"
 + "    <span class=\"icon icon-warn\"></span>"
 + "    该商品不支持{payment_name}，您可以"
 + "    <a href=\"javascript:void(0)\" data-click=\"changePayment()\">修改支付方式</a>"
 + "</p>";
var cartItemErrorTimeoutError =
   "<p>"
 + "    <span class=\"icon icon-warn\"></span>"
 + "    已超过20分钟的保留时限，建议您重新放入购物车或选购其他商品"
 + "    <a href=\"http://product.dangdang.com/main/product.aspx?product_id={product_id}\" target=\"_blank\" data-click=\"deleteCartItem({deleteKey})\">继续购物</a>"
 + "</p>";
var cartItemErrorNoCommonShipmentError =
   "<p>"
 + "    <span class=\"icon icon-warn\"></span>"
 + "    该商品暂不能和其他商品选择相同的发货方式，您可以将商品"
 + "    <a href=\"javascript:void(0)\" data-click=\"addFavorite({deleteKey})\">移入收藏</a> 或者 "
 + "    <a href=\"http://product.dangdang.com/main/product.aspx?product_id={product_id}\" target=\"_blank\" data-click=\"deleteCartItem({deleteKey})\">单独购买</a>"
 + "</p>";

var couponAndReturnTemplate =
"<p id=\"shop_overseas_nocashpay_tip\" class=\"hide\"><span class=\"color-red\">海外购商品</span>只允许用礼券和优惠码支付。</p>"
 //余额
+ "<div id=\"cf_pay_title\" class=\"pay_title\"><a href=\"javascript:for_99click()\" class=\"op up\" id=\"expandCash\">&nbsp;</a><span id='cashwenan' class=\"title\">余&nbsp;&nbsp;额</span><span id=\"usedCustCashSummary\" style=\"display:none\">您当前使用<b class=\"color-red mlr-10\">¥{custCashUsed}</b>余额支付订单<a href=\"javascript:for_99click()\" id=\"cancelCustCash\" class=\"ml-15\">取消使用</a></span></div>"
+ "<p class=\"pay_detail\">账户余额<b class=\"color-red mlr-10\">¥{custCash}</b><span id=\"custCashBtnArea\">您可以重置使用余额<input class=\"input-w87 ver-m ml-10\" type=\"text\" style=\"_vertical-align:middle\" maxlength=\"8\" id=\"iptUseCustCash\"><a href=\"javascript:for_99click()\" class=\"btn btn-small-orange ml-20 mr-10 pos-r-1\" id=\"submitCash\">使 用</a></span></p>"
//礼品卡
+ "<div id=\"cf_giftcard\" class=\"pay_title\">"
+ "<p style=\"display:none\">如果您使用礼品卡余额支付订单剩余金额，需要使用0.00元，其中手续费为0.00元</p>"
+ "<a href=\"javascript:for_99click()\" class=\"op up\" id=\"expandGiftcard\">&nbsp;</a><span id='giftCardwenan' class=\"title\">礼品卡</span></div>"
+ "<p class=\"pay_detail\" id=\"giftCardNotSupport\" style=\"display:none\">您的订单中<span class=\"used\" id=\"giftCardNotSupportDetail\">部分商家</span>不支持使用当当礼品卡和图书专用卡<span id='giftCardNotSupportTips' class='remind_info remind_info2' style=\"display:none\"><i class='tips_arrow'></i></span></p>"
+ "<p class=\"pay_detail\" id=\"giftCardAmountArea\" style=\"display:none\">您的<span id=\"commonVipGiftCard\" style=\"display:none\"><span class=\"used\" id=\"commonVipName\">全品类卡</span>余额为<span class=\"balance\" id=\"commonVipBalance\">¥{commonVipBalance}</span></span><span id=\"splitFlagAfterVipCard\" style=\"display:none\">，</span><span id=\"categoryGiftCard\" style=\"display:none\"><span class=\"used\" id=\"categoryGiftCardName\">当当礼品卡</span>余额为<span class=\"balance\" id=\"allCategoryGiftCardBalance\">¥{custAllCategoryGiftCard}</span></span><span id=\"splitFlagAfterAllCategory\" style=\"display:none\">，</span><span id=\"bookGiftCard\" style=\"display:none\"><span class=\"used\" id=\"bookGiftCardName\">图书专用卡</span>余额为<span class=\"balance\" id=\"bookGiftCardBalance\">¥{custBookGiftCard}</span></span><span id=\"bookGiftCardNotUseHint\" style=\"display:none;\">，<span id='orderNotSupportTips'>您订单中的商品不支持使用当当礼品卡和图书专用卡</span></span><span id=\"giftCartNameHint\" style=\"display:none;\">当当礼品卡不支持海外购、当当礼品卡、图书专用卡及部分商家商品使用<i class=\"tips_arrow\"></i></span></p>"
+ "<p class=\"pay_detail\" id=\"usedGiftcardSummary\" style=\"display:none;\">您当前使用<b class=\"color-red mlr-10\">¥{custGiftCardUsed}</b><span id=''>礼品卡支付订单</span><a href=\"javascript:for_99click()\" class=\"ml-15\" id=\"cancelGiftCard\">取消使用</a></p>"
+ "<p id=\"cf_category_giftcard_detail\" class=\"pay_detail\" style=\"display: none;\"><span id=\"categoryGiftCardBtnArea\"><span id='giftCardInputTips'>您可以使用礼品卡</span><input class=\"input-w87 ver-m ml-10\" type=\"text\" style=\"_vertical-align:middle\" maxlength=\"8\" id=\"iptCategoryUseGiftCard\"> 元<a href=\"javascript:for_99click()\" class=\"btn btn-small-orange ml-20 mr-10 pos-r-1\" id=\"submitCategoryGiftCard\">使 用</a></span></p>"
//+ "<p id=\"cf_book_giftcard_detail\" class=\"pay_detail\" style=\"display: block;\"><span id=\"bookGiftCartBtnArea\">您可以使用图书专用卡<input class=\"input-w87 ver-m ml-10\" type=\"text\" style=\"_vertical-align:middle\" maxlength=\"8\" id=\"iptUseBookGiftCard\"> 元<a href=\"javascript:for_99click()\" class=\"btn btn-small-orange ml-20 mr-10 pos-r-1\" id=\"submitBookGiftCard\">使 用</a></span></p>"
//+ "<p id=\"cf_giftcard_detail\" class=\"pay_detail\" style=\"display: block;\"><span id=\"giftCardBtnArea\">您可以使用礼品卡<input class=\"input-w87 ver-m ml-10\" type=\"text\" style=\"_vertical-align:middle\" maxlength=\"8\" id=\"iptUseGiftCard\"> 元<a href=\"javascript:for_99click()\" class=\"btn btn-small-orange ml-20 mr-10 pos-r-1\" id=\"submitGiftCard\">使 用</a></span></p>"

+ "<p id=\"cf_select\" class=\"pay_detail\" style=\"display: none;\"><span id=\"categoryGiftCardBtnArea\">您可以使用<select id='giftCardType' name='giftCardType' class='input-w87 ml-5'></select><input class=\"input-w87 ver-m ml-10\" type=\"text\" style=\"_vertical-align:middle\" maxlength=\"8\" id=\"giftCardTypeVal\"> 元<a href=\"javascript:for_99click()\" class=\"btn btn-small-orange ml-20 mr-10 pos-r-1\" id=\"submitGiftCardType\">使 用</a></span></p>"
//+ "<div class=\"pay_detail\">账户余额<b class=\"color-red mlr-10\">¥{custGiftCard}</b><span id=\"giftCardBtnArea\">您可以重置使用礼品卡<input class=\"input-w87 ver-m ml-10\" type=\"text\" style=\"_vertical-align:middle\" maxlength=\"8\" id=\"iptUseGiftcard\"><a href=\"javascript:for_99click()\" class=\"btn btn-small-orange ml-20 mr-10 pos-r-1\"  id=\"submitGiftCard\">使 用</a></span>"
+ "<div class=\"pay_detail\" id=\"giftCartActiveArea\">"
+ "<a href=\"javascript:for_99click()\" id=\"activeNewGiftcard\">激活新的礼品卡</a>"
+ "<p class=\"pt-5 color-orange\"><br>使用礼品卡可能会产生手续费 <a href=\"http://help.dangdang.com/details/page24\" class=\"ml-5\" target=\"_blank\">详细说明</a></p>"
+"</div>"
//积分
+ "<div id=\"cf_point_pay_title\" class=\"pay_title\"><a href=\"javascript:for_99click()\" class=\"op up\" id=\"expandPoint\">&nbsp;</a><span id=\"cf_point_title\" class=\"title\">积&nbsp;&nbsp;分</span><span id=\"usedPointSummary\" style=\"display:none\">您当前使用<b class=\"color-red mlr-10\">{custPointUsed}</b>积分（<b class=\"color-red\">¥{custPointUsedAsMoney}</b>）支付订单<a href=\"javascript:for_99click()\" class=\"ml-15\"  id=\"cancelPoint\">取消使用</a></span></div>"
+ "<p id=\"cf_point_pay_detail\" class=\"pay_detail\">账户积分<b class=\"color-red mlr-10\">{custPoint}</b>可抵扣{custPointAsMoney}元  <span id=\"pointBtnArea\">您本次可使用<input class=\"input-w87 ver-m ml-10\" type=\"text\" style=\"_vertical-align:middle\" maxlength=\"6\" id=\"iptUsePoint\"> 元<a href=\"javascript:for_99click()\" class=\"btn btn-small-orange ml-20 mr-10 pos-r-1\" id=\"submitPoint\">使 用</a>"
 + "<i id=\"pointRateTip\" class=\"question-mark\"><em  style=\"display:none\" class=\"ji-tips\">每{custPointRate}积分可抵1元，最小兑换0.1元，详情见“我的积分”中的说明。<i class=\"tips_arrow\"></i></em></i></span></p>"
//优惠码
+ "<div id=\"cf_discount_code_title\" class=\"pay_title\"><a href=\"javascript:for_99click()\" class=\"op up\" id=\"expandDiscountCode\">&nbsp;</a><span class=\"title\">优惠码</span><span id=\"usedDiscountCodeSummary\" style=\"display:none\"><span>您当前使用优惠码总额减</span><b class=\"color-red mlr-10\">¥0.00</b><a href=\"javascript:for_99click()\" class=\"ml-15\"  id=\"cancelDiscountCode\">取消使用</a></span></div>"
+ "<p id=\"cf_discount_code_detail\" class=\"pay_detail\"><input class=\"input-w178 ver-m\" type=\"text\" style=\"_vertical-align:middle;text-transform: uppercase\"  maxlength=\"16\" id=\"iptUseDiscountCode\"><a href=\"javascript:for_99click()\" class=\"btn btn-small-orange ml-20 mr-10 pos-r-1\"  id=\"submitDiscountCode\">使用</a></p>"
//礼券
+ "<div id=\"cf_coupon_title\" class=\"pay_title\"><a href=\"javascript:for_99click()\" class=\"op up\" id=\"expandCoupon\">&nbsp;</a><span id=\"wenan\" class=\"title\">礼&nbsp;&nbsp;券</span><span  id=\"usedCouponSummary\" style=\"display:none\">您当前使用礼券总额减<b class=\"color-red mlr-10\">¥{couponAmount}</b><a href=\"javascript:for_99click()\" class=\"ml-15\"  name=\"cancelCoupon\" >取消使用</a></span></div>"
+ "    <div id=\"coupon\">"
+ "        <!-- coupon template -->"
+ "    </div>"
//返券
+ "    <div id=\"couponReturn\">"
+ "        <!-- coupon return template -->"
+ "    </div>"
//冲突提示
+ "                <div  id=\"submitCouponPopup\" class=\"popup-wrap popup-normal hide\" >"
+ "                    <div class=\"popup-title\">"
+ "                        <h3>温馨提示</h3>"
+ "                        <a id=\"closeSubmitCoupon\" class=\"btn-popup-close\" href=\"javascript:void(0)\"></a>"
+ "                    </div>"
+ "                    <div class=\"popup-cont\">"
+ "                        <p>使用礼券，礼品卡将会失效，同时支付金额将发生变化，您确定使用礼券吗？</p>"
+ "                        <p class=\"btn-bar\">"
+ "                            <a id=\"submitCoupon\" href=\"javascript:void(0)\" class=\"btn btn-small-grey mr-10\">确&nbsp;定</a>"
+ "                            <a id=\"cancelSubmitCoupon\" href=\"javascript:void(0)\" class=\"btn btn-small-grey\">取&nbsp;消</a>"
+ "                        </p>"
+ "                    </div>"
+ "                </div>"
//激活礼券弹框
+ "                <div id=\"bindCouponPopup\" class=\"popup-wrap popup-normal popup-wrap-w258 hide\" style=\"top:300px;\">"
+ "                    <div class=\"popup-title clearfix\">"
+ "                        <h3>"
+ "                            激活新礼券</h3>"
+ "                        <a id=\"closeBindCoupon\" class=\"btn-popup-close\" href=\"javascript:void(0)\"></a>"
+ "                    </div>"
+ "                    <div class=\"popup-cont\" style=\"height:105px;\">"
+ "                        <p style='margin:5px 0 10px;'>"
+ "                            <label class=\"label-w40\" for=\"\">"
+ "                                卡号：</label><input id=\"couponUserName\" class=\"input-w172\" type=\"text\" />"
+ "                            <span id=\"couponCardError\"></span>"
+ "                        </p>"
+ "                        <p class=\"mt-10\">"
+ "                            <label class=\"label-w40\" for=\"\">"
+ "                                密码：</label><input id=\"couponPassword\" class=\"input-w172\" type=\"password\" />"
+ "                            <span id=\"couponPwdError\"></span>"
+ "                        </p>"
+ "                        <p class=\"btn-bar btn-bar-left mt-10\">"
+ "                            <a id=\"bindCoupon\" href=\"javascript:void(0)\" class=\"btn btn-small-grey\" style=\"margin-left: 5px;\">激&nbsp;活</a>"
+ "                            <span id=\"couponBindErrorWrap\" class=\"help-inline help-inline-error help-inline-middle\">"
+ "                                   <span class=\"icon icon-warn\"></span><span id=\"couponBindError\"></span>"
+ "                            </span>"
+ "                        </p>"
+ "                    </div>"
+ "                </div>"
+ "            </div>"
//激活礼品卡弹框
+ "<div id='bindGiftcard'  style=\"position: absolute;z-index:10000;display:none\">"
+ "<div class='popup-wrap popup-normal popup-wrap-w258' style='left:10px;top:-10px;'>"
+ "  <div class='popup-title clearfix'>"
+ "      <h3>激活新礼品卡</h3>"
+ "      <a id='closeBindGiftCard' class='btn-popup-close' href='javascript:for_99click();'></a>"
+ " </div>"
+ "  <div class='popup-cont'>"
+ "      <p><label class='label-w40' >卡号：</label><input id='iptGiftCardNum' class='input-w172' type='text' maxlength='20'/></p>"
+ "      <p class='mt-10'><label class='label-w40' >密码：</label><input id='iptGiftCardPassword' class='input-w172' type='password' maxlength='20'/></p>"
+ "      <p class='btn-bar-left mt-10'>"
+ "         <label for='' class='label-w40'></label>"
+ "         <a id='btnBindGiftCard' href='javascript:for_99click();' class='btn btn-small-grey' style='margin-left:-3px;*margin-left:0px;margin-left:0px\9;'>激&nbsp;活</a>"
+ "      </p>"
+ "  </div>"
+ "</div>"
+ "</div>";

var validCouponItemTemplate =
 "<div id=\"coupons\" class=\"pay_detail\">"
+ "<span class=\"mr-10\">{title}</span>"
    + "<select class=\"select-h22\" name=\"\" id=\"orderCouponSlt_{order_sequence_id}\">"
    + "{sub_coupon_item}"
    +"</select>"
    + "<a href=\"javascript:for_99click()\" class=\"btn btn-small-orange ml-20 mr-10 pos-r-1\" id=\"submitCoupon_{order_sequence_id}\"  name=\"submitCoupon\" valueid=\"orderCouponSlt_{order_sequence_id}\" orderid=\"{order_sequence_id}\">使 用</a>"
    + "<span id=\"usedCouponTitle_{order_sequence_id}\"></span>"
    + "<a href=\"javascript:for_99click()\" class=\"btn btn-small-grey pos-r-1\" name=\"cancelCoupon\" num=\"\" style=\"display:none\">取 消</a>"
+"</div>";
var validCouponFooterTemplate = "<div id=\"couponc\" class=\"pay_detail\"><a href=\"http://newaccount.dangdang.com/payhistory/mycoupon.aspx\"  target=\"_blank\">查看我的礼券</a><a href=\"javascript:for_99click()\" class=\"ml-10\" id=\"showBindCoupon\">激活新的礼券</a></div>";
var crossOrderCouponReadonlyTemplate = "<p class=\"pt-5\">{coupon_desc}<a href=\"javascript:for_99click()\" class=btn btn-small-grey pos-r-1  name=\"cancelCoupon\" num=\"{coupon_num}\">取 消</a></p>";
var couponNormalLinkTemplate =
"<a href='http://misc2.dangdang.com/coupon_product/index.php?apply={apply_id}&type={type_id}' target='_blank'>{linkName}</a>";
var couponShopLinkTemplate =
"<a href='http://shop.dangdang.com/{shop_id}' target='_blank'>{linkName}</a>";
var couponShopProductLinkTemplate =
"<a href='http://shop.dangdang.com/{shop_id}/?act=list&apply_id={apply_id}&type={type_id}' target='_blank'>{linkName}</a>";
var definedCouponProductLinkTemplate = "<a href='{coupon_url}' target='_blank'>{linkName}</a>";
var couponItemTemplate = "<option value=\"{coupon_num}\">购买{coupon_link}可用（有效期至{end_date}） {money}元</option>";
var couponReturnTemplate =
   "<h4>返券明细</h4>"
 + "<ul id=\"couponReturnItems\" class=\"return-ticket\">"
 + "    <!-- coupon return items -->"
 + "</ul>";
var couponReturnItemTemplate =
   "<li>"
 + "    <p>"
 + "        <span>{description} 返{coupon_amt}元券"
 + "            (<a id=\"showCouponReturnSubItemsPopup{item_index}\" href=\"javascript:void(0)\">礼券详情</a>)"
 + "        </span>"
 + "    </p>"
 + "    <div id=\"couponReturnSubItemsPopup{item_index}\" class=\"hide\" style=\"float: left; position: relative;\">"
 + "        <div class=\"popup-wrap popup-normal\" style=\"right:-250px; bottom:20px; width:258px;\">"
 + "            <div class=\"popup-title\">"
 + "                <h3>礼券详情</h3>"
 + "                <a id=\"closeCouponReturnSubItemsPopup{item_index}\" data-item-index=\"{item_index}\" class=\"btn-popup-close\" href=\"javascript:void(0)\"></a>"
 + "            </div>"
 + "            <div id=\"couponReturnSubItems{item_index}\" class=\"popup-cont\">"
 + "                <!-- coupon return sub items -->"
 + "            </div>"
 + "        </div>"
 + "    </div>"
 + "</li>";
var couponReturnSubItemTemplate =
   "<p>"
 + "    &yen;{coupon_value} (购买{coupon_link}可用)×{coupon_num}"
 + "</p>";
//var discountCodeTemplate =
// "<h4 style=\"background-position:6px 19px;_background-position:6px 21px;\">优惠码<input class=\"input-w178 ver-m ml-10\" style=\"_vertical-align:middle;text-transform: uppercase\" type=\"text\" maxlength=\"12\" id=\"discountCode\">"
// + "<a href=\"javascript:for_99click();\" class=\"btn btn-small-orange ml-20 mr-10 pos-r-1\" id=\"submitDiscountCode\">使 用</a>"
// + "</h4>"
// + "<p class=\"pl-50 pt-2\" style=\"height:17px;\"><span class=\"help-inline help-inline-error help-inline-large\" id=\"discountCodeBindErrorWrap\"></span></p>";
//var discountCodeReadonlyTemplate = "<h4>优惠码:<span style=\"font-weight:normal; margin-left:10px\"><span  id=\"coupon_number\">{coupon_number}{public_coupon_number}</span><a style=\"margin-left:15px;\" href=\"javascript:for_99click();\" id=\"cancelDiscountCode\">取消优惠码</a></span></h4>"; 
//var custPointTemplate =
//    "<h4>可用积分</h4><p class=\"ml-15 mt-10\">您有<b>{cust_point}</b>积分，可抵扣<b class=\"price-d\">{point_amount}</b>元，本次使用<input class=\"input-w55 ver-m ml-10\" type=\"text\" style=\"_vertical-align:middle\" id=\"point_deduction_amount\">&nbsp;元"
//        + "<a href=\"javascript:for_99click();\" class=\"btn btn-small-orange ml-20 mr-10 pos-r-1\" id=\"submitCustPoint\">使 用</a><i class=\"question-mark\" id=\"point_tip_arrow\"><em class=\"hide\" id=\"point_tip\">每{point_rate}积分可抵扣1元，每张交易单最多可抵扣{point_max_amonut}元，详情见“我的积分”中的说明。<i class=\"tips_arrow\" ></i></em></i></p>"
//        + "<p class=\"pl-50 pt-2\" style=\"height:17px;\"><span class=\"help-inline help-inline-error help-inline-large\" id=\"custPointError\"></span></p>";

//var custPointUsedTemplate =
//    "<h4>可用积分</h4><p class=\"ml-15 mt-10\" >本次使用<b class=\"price-df14\">{cust_point_used}</b>积分，抵扣<b class=\"price-d f14\">&yen;{point_deduction_amount}</b><a href=\"javascript:for_99click();\" class=\"ml-10\" id=\"cancelCustPoint\">取消使用</a></p>"
//        + "<p class=\"pl-50 pt-2\" style=\"height:17px;\"><span class=\"help-inline help-inline-error help-inline-large\" id=\"custPointError\"></span></p>";

var errorTipIcon = "<span class=\"icon icon-warn\"></span>";
var ORDER_SUMMARY_TEMPLATE =
    "             	<div class='price-detail'>"
        + "                 	<ul>"
        + "                 	  <li id='div_product_total'>"
        + "                 	    <p><span class='span-w160'>商品金额：</span><span>&yen;{bargin_total}</span></p>"
        + "                 	  </li>"
		+ "                 	  <li id='div_deposit_total'>"
        + "                 	    <p><span class='span-w160'>定金合计：</span><span>&yen;{deposit_amount}</span></p>"
        + "                 	  </li>"
		+ "                 	  <li id='div_final_payment_total'>"
        + "                 	    <p><span class='span-w160'>尾款合计：</span><span>&yen;{balance_amount}</span></p>"
        + "                 	  </li>"
        + "                     <li id='total_privilege_code_discount_amount'>"
        + "	                    <p><span class='span-w160'>已优惠：</span><span class='plus-minus' >&yen;{privilege_code_discount_amount}</span></p>"
        + "                 	  </li>"
        + "                       <li  id='total_gift_package_price'>"
        + "	        <p><span class='span-w160'>礼品包装(含贺卡)：</span><span class='plus-minus' >&yen;{total_gift_package_price}</span></p>"
        + "                 	  </li>"
        + "                 	  </li>"
        + "                       <li  id='gift_package_price'>"
        + "	        <p><span class='span-w160'>礼品包装：</span><span class='plus-minus' >&yen;{total_gift_package_price}</span></p>"
        + "                 	  </li>"
        + "                       <li  id='greetingcard_price'>"
        + "	        <p><span class='span-w160'>贺卡费用：</span><span class='plus-minus' >&yen;{total_gift_package_price}</span></p>"
        + "                 	  </li>"
        + "                     <li id='total_shipping_fee_real' >"
        + "                 	    <p><span  class='span-w160'>运费：</span><span>&yen;{shipping_fee}</span><a href='javascript:for_99click();'  id='shipping_fee_detail_link'  ><i id='shipping_fee_detail_icon' class='icon icon-adress-close'></i></a></p>"
        + "                         <div id='rep_shipping_fee_real'></div>"
        + "                 	  </li>"
		+ "                     <li id='total_overseas_tax_real' >"
        + "                 	    <p><span  class='span-w160'><span id='oversea_icon_free' class='icon_event'><img src='" + ALIPAY_PATH + "/images/icon_free.png'></span>税费：</span><span id='order_flow_overseas_tax'>&yen;{overseas_tax}</span><a href='javascript:for_99click();'  id='overseas_tax_detail_link'  ><i id='overseas_tax_detail_icon' class='icon icon-adress-close'></i></a></p>"
        + "                         <div id='rep_overseas_tax_real'></div>"
        + "                 	  </li>"
        + "                       <li id='total_energy_saving_subsiby_amout'>"
        + "	        <p><span class='span-w160'>节能补贴：</span><span>-&yen;{energy_saving_subsiby_amout}</span></p>"
        + "                 	  </li>"
        + "                       <li id='total_promo_amount_real' >"
        + "                 	    <p><span  class='span-w160'>促销：</span><span>-&yen;{promo_discount_amount}</span><a href='javascript:for_99click();' id='promo_detail_link'><i  id='promo_detail_icon' class='icon icon-adress-close'></i></a></p>"
        + "                         <div id='rep_collection_promotion'></div>"
        + "                         <div id='rep_order_promotion' style='display:none;'></div>"
        + "                 	   </li>"
        + "                       <li id='total_giftcard_real' >"//coupon_and_giftcard_money_used
        + "                 	    <p ><span class='span-w160'>礼品卡：</span><span>-&yen;{gift_card_money_used}</span><a href='javascript:for_99click();' id='giftcard_detail_link' ><i id='giftcard_detail_icon' class='icon icon-adress-close'></i></a></p>"
        + "                         <div id='rep_dangdang_money'></div>"
        //+ "                         <p id='coupon_money_real' class='p-child'><span class='span-w160'>使用礼券：</span><span>-&yen;{coupon_amount}</span></p>"
        + "                 	  </li>"
        + "        <li id='total_gift_card_charge'>"
        + "	        <p><span class='span-w160'>礼品卡手续费：</span><span>&yen;{gift_card_charge}</span></p>"
        + "	    </li>"
        + "                       <li id='total_coupon_real' >"//hj增加开始
        + "                 	    <p ><span class='span-w160'>礼券：</span><span>-&yen;{coupon_used}</span><a href='javascript:for_99click();' id='coupon_detail_link' ><i id='coupon_detail_icon' class='icon icon-adress-close'></i></a></p>"
        //+ "                         <div id='rep_dangdang_money'></div>"
        + "                         <p id='coupon_money_real' class='p-child'><span class='span-w160'>使用礼券：</span><span>-&yen;{coupon_amount}</span></p>"
        + "                 	  </li>"//hj增加结束
        + "                 	  <li  id='total_discount_code_real'>"
        + "                 	    <p><span class='span-w160'>使用优惠码：</span><span>-&yen;{coupon_amount}</span></p>"
        + "                 	  </li>"
        + "                       <li id='total_cust_cash_real'>"
        + "	        <p><span class='span-w160'>余额：</span><span>-&yen;{cust_cash_used}</span></p>"
        + "                 	  </li>"
        + "                    <li id='total_cust_point_real'>"
        + "	        <p><span class='span-w160'>积分支付：</span><span>-&yen;{point_deduction_amount}</span></p>"
        + "                 	  </li>"
        + "                       <li>"
        + "                 	    <p class='p-total'><span class='span-w160'>*应付总额(含运费)：</span><span class='price-d {payable_amount_style}'>&yen;{payable_amount}</span></p>"
        + "                 	  </li>"
        + "                       <li id='div_set_password' > <p class='mt-10'><span class='span-w160 color-grey'>若使用余额或礼品卡，需 </span><a href='http://safe.dangdang.com/payment_pass.php' target='_blank' onclick='showSetPaymentPasswordWindow()'>设置支付密码</a></p></li>"
        + "                       <li id='div_pay_password'  ><p class='p-input'><label for=''>支付密码：<input id='input_pay_password' class='input-w90' type='password' /></label><a class='ml-5' target='_blank' href='http://safe.dangdang.com/payment_pass.php?action=find'>忘记密码</a></p></li>"
        + "                       <li id='div_yzm_word'  ><p class='p-input'><label for=''>验证码：<input  id='ipt_yzm' class='input-w55' type='text' /></label><a class='img ml-5'><img id='sign_img' style='height:22px; width:89px;' alt=''></a><a class='ml-5' id='btn_change_yzm' style='cursor:pointer'>换张图片</a></p></li>"
		+ "                       <li id='div_presale_mobile'><p class='p-input'><label for=''>支付尾款时通知号码：<input class='input-w87' type='text' maxlength='11' id='presale_mobile'></label></p></li>"
		+ "                       <li id='div_agree_pay_deposit'><p class='p-agree p-input'><span class='color-grey'><input type='checkbox' value='' id='agree_pay_deposit'>同意支付定金，取消订单定金不退</span></p></li>"
        + "                       <li id='div_ck_protocol' style='display:none;' ><p class='p-agree'><span class='span-w160 color-grey'><input type='checkbox' value='' id='ck_protocol' checked=checked />同意接受</span><a target='_blank' href='http://support.dangdang.com/helpcenter/api_cms/helpcenter/question_sort/2238/180367.shtml'>《当当交易条款》</a></p></li>"
        + "                       <li>"
        + "                      	<p class='btn-bar' id='order_submit_error_tips_bar' style='display:none'><span class='help-inline help-inline-error mr-35'><span class='icon icon-warn'></span><span id='order_submit_error_tips'></span></span></p>"
        + "                          <p class='btn-bar mt-20'><a class='btn btn-super-orange' href='javascript:for_99click();' id='submit' name='submit'>提交订单</a></p>"
        + "                        </li>"
        + "                 	</ul>"
        + "                 </div>";

var RPT_SHIPPING_FEE_ITEM_TEMPLATE = "<p class='p-child {shipping_fee_display}'><span class='span-w160'>订单{sort_num}运费：</span><span>&yen;{order_shipping_fee}</span></p>";

var RPT_PROMOTION_ITEM_TEMPLATE = "<p class='p-child {collection_promotion_display}'><span class='span-w160'  title='{collection_promotion_desc_tips}' >{collection_promotion_desc}：</span><span>-&yen;{order_direct_discount_amount}</span></p>";
var RPT_ORDER_PROMOTION_ITEM_TEMPLATE = "<p class='p-child {order_promotion_display}'><span class='span-w160' title='{shop_promo_msg_tips}' >{shop_promo_msg}：</span><span>-&yen;{order_prom_subtract}</span></p>";

//var RPT_COUPON_ITEM_TEMPLATE = "<p class='p-child {coupon_amount_display}'><span class='span-w160'>订单{sort_num}使用礼品卡：</span><span>-&yen;{cust_gift_card_used}</span></p>";
var RPT_COUPON_ITEM_TEMPLATE = "<p class='p-child {giftcard_amount_display}'><span class='span-w160'>订单{sort_num}使用礼品卡：</span><span>-&yen;{cust_gift_card_used}</span></p>";
var P_ORDER_SUBMIT_PROTOCOL_TIPS = "<span id='span_protocol_tips' class='objhide'>请选择</span> <input type='checkbox' id='ck_protocol' /> 请核对以上信息，点击“提交订单”即表示您同意接受<a href='http://static.dangdang.com/helpcenter2/1988/9251.shtml' name='checkrule' target='_blank'>当当网交易条款</a>";


//发票模板
var INVOICE_TEMPLATE_EDIT =
    "<a name='invoice_point_{order_sequence_id}'></a>"
      + "             <div class='item-invoice' id='div_invoice_expand_{order_sequence_id}'>"
        + "                 <div class='item-invoice-title'><b>订单{sort_num}:</b></div>"
        + "                 <div class='select-invoice'><span class='color-orange'>增值税电子普通发票是税务局认可的有效收付款凭证，具有售后维权的法律效力，也可作为企业报销的有效凭据。</span></div>"
        + "				   <div id='p_select_invoice_{order_sequence_id}' class='select-invoice'>"
        + "						<label id='lab_e_invoice_{order_sequence_id}' class='radio' for='rb_e_invoice_{order_sequence_id}' style='POSITION: relative'><input type='radio' name='invoice_type_{order_sequence_id}' id='rb_e_invoice_{order_sequence_id}'>电子发票</label>"
        + "						<label id='lab_invoice_{order_sequence_id}' class='radio' for='rb_invoice_{order_sequence_id}'><input type='radio' name='invoice_type_{order_sequence_id}' id='rb_invoice_{order_sequence_id}'>普通发票（纸质）</label>"
        + "						<label id='lab_VAT_invoice_{order_sequence_id}' class='radio' for='rb_VAT_invoice_{order_sequence_id}' style='POSITION: relative'><input type='radio' name='invoice_type_{order_sequence_id}' id='rb_VAT_invoice_{order_sequence_id}'>增值税专用发票<i id='div_not_have_VAT_invoice_mark_{order_sequence_id}' style='display:none;' class='question-mark'></i><i id='div_not_have_VAT_invoice_tips_{order_sequence_id}' style='display:none;' class='invoice-tips'>您的订单中含有图书商品，而根据《财税【2013】87号》文件，图书类商品不可开具增值税专用发票。<i class='tips_arrow'></i></i></label>"
        + "				   </div>"
        + "                 <div class='invoice-box' id='no_storage_jit_{order_sequence_id}'><div class='ml-15 color-orange' >您的发票将在订单状态变为“交易成功”后的15个工作日内由客服邮寄给您</div></div>"
        //电子发票
        + "                 <div class='invoice-box' id='div_e_invoice_{order_sequence_id}' >"
        + "                     <div class='ml-15 mt-10'>"
        + "                         <span class='span-w63'>发票抬头：</span>"
        + "                         <label class='radio'>"
        + "                             <input type='radio' value='0' id='e_invoice_title_person_{order_sequence_id}' name='rb_e_invoice_title_{order_sequence_id}' /><span>个人</span>"
        + "                         </label>"
        + "                         <label class='radio' id='e_invoice_title_company_label_{order_sequence_id}'>"
        + "                             <input type='radio' value='1' id='e_invoice_title_company_{order_sequence_id}' name='rb_e_invoice_title_{order_sequence_id}' class='radio'/><span>单位</span>"
        + "                         </label>"
        + "                         <span id='e_invoice_title_data_{order_sequence_id}'></span>"
        + "                         <span id='span_e_title_tips_{order_sequence_id}'></span>"
        + "                     </div>"
        + "                     <div id='div_e_invoice_content_{order_sequence_id}' class='ml-15 mt-10'>"
        + "                         <span class='span-w63'>发票内容：</span>"
        + "                         <select id='ddl_e_invoice_content_{order_sequence_id}' class='select-h22'></select>"
        + "                         <span id='span_e_content_tips_{order_sequence_id}'></span>"
        + "                         <p id='p_e_content_tips_{order_sequence_id}' class='span-fp'></p>"
        + "                     </div>"
        + "                     <div id='div_e_book_invoice_content_{order_sequence_id}' class='ml-15 mt-10'>"
        + "                         <span class='span-fp'>图书发票内容：</span>"
        + "                         <select id='ddl_e_book_invoice_content_{order_sequence_id}' class='select-h22'></select>"
        + "                         <span id='span_e_book_content_tips_{order_sequence_id}'></span>"
        + "                         <p id='p_e_book_content_tips_{order_sequence_id}' class='span-fp'></p>"
        + "                     </div>"
        + "                     <div id='div_e_nonbook_invoice_content_{order_sequence_id}' class='ml-15 mt-10'>"
        + "                         <span class='span-fp'>非图书发票内容：</span>"
        + "                         <select id='ddl_e_nonbook_invoice_content_{order_sequence_id}' class='select-h22'></select>"
        + "                         <span id='span_e_nonbook_content_tips_{order_sequence_id}'></span>"
        + "                         <p id='p_e_nonbook_content_tips_{order_sequence_id}' class='span-fp'></p>"
        + "                     </div>"
        + "                     <div class='info-list ml-15'>"
        + "                         <label class='span-w63' for=''><strong class='hot'>*</strong>手机号：</label>"
        + "                         <input id='e_invoice_tel_{order_sequence_id}' class='input-w87' type='text' placeholder=''>"
        + "                         <span id='e_invoice_tel_tips_{order_sequence_id}' class='help-inline help-inline-error'></span>"
        + "                     </div>"
        + "                             <p class='btn-bar'>"
        + "                                  <a class='btn btn-large-orange mr-5' href='javascript:for_99click();'  id='a_e_invoice_submit_{order_sequence_id}' >确认发票信息</a>"
        + "                                  <a class='btn btn-large-grey' href='javascript:for_99click();'  id='a_e_invoice_close_{order_sequence_id}' >暂不需要发票</a>"
        + "                                  <span  id='span_e_invoice_tips_{order_sequence_id}'></span>"
        + "                              </p>"
        + "                 </div>"    
        + "                 <div class='invoice-box hide' id='span_invoice_{order_sequence_id}' >"
        + "                     <div class='ml-15 mt-10'>"
        + "                         <span class='span-w63'>发票抬头：</span>"
        + "                         <label class='radio'>"
        + "                             <input type='radio' value='0'  id='invoice_title_person_{order_sequence_id}' name='rb_invoice_title_{order_sequence_id}' /><span>个人</span>"
        + "                         </label>"
        + "                         <label class='radio'>"
        + "                             <input type='radio' value='1'  id='invoice_title_company_{order_sequence_id}' name='rb_invoice_title_{order_sequence_id}' class='radio'/><span>单位</span>"
        + "                         </label>"
//   + "                         <span class='select-div select-div-w205'>"
//   + "                              <span class='selc-text w205'>"
//   + "                                  <input type='text' id='invoice_title_{order_sequence_id}' maxlength='50'/>"
//   + "                                  <i id='invoice_danwei_{order_sequence_id}'></i>"
//   + "                              </span>"
//   + "                         </span>"
        + "                         <span id='invoice_title_data_{order_sequence_id}'></span>"
        + "                         <span id='span_title_tips_{order_sequence_id}'></span>"
        + "                     </div>"
        + "                     <div class='ml-15 mt-10'>"
        + "                         <span class='span-w63'>发票内容：</span>"
        + "                         <select id='invoice_content_{order_sequence_id}' class='select-h22'></select>"
        + "                         <span id='span_content_tips_{order_sequence_id}'></span>"
        + "                         <div class='invoice-info ml-65'>"
        + "                             <p id='p_content_tips_{order_sequence_id}'></p>"
        + "                             <p class='btn-bar'>"
        + "                                  <a class='btn btn-large-orange mr-5' href='javascript:for_99click();'  id='invoice_submit_{order_sequence_id}' >确认发票信息</a>"
        + "                                  <a class='btn btn-large-grey' href='javascript:for_99click();'  id='a_turn_off_invoice_{order_sequence_id}' >暂不需要发票</a>"
        + "                                  <span  id='span_invoice_tips_{order_sequence_id}'></span>"
        + "                              </p>"
        + "                         </div>"
        + "                     </div>"
        + "                 </div>"
        + "                  <div id='div_invoice_explain_{order_sequence_id}' class='invoice-box invoice-box2'>"
        + "						<div class='warn-box'>"
        + "							<p>1.购买图书商品，发票内容可开具图书、资料、办公用品；</p>"
        + "                         <p>2.使用礼品卡购买的商品不支持开具发票，请您在购买礼品卡时选择发票；</p>"
        + "                         <p>3.查看<a href='http://help.dangdang.com/details/page6' target='_blank' style='text-decoration:underline;'>发票制度说明</a>了解更多</p>"
        + "						</div>"
        + "					</div>"
        + "                  <div id='div_VAT_invoice_{order_sequence_id}' class='invoice-box hide'>"
        + "                      <div class='ml-15 mt-10'>"
        + "                          <span class='span-w63'>发票内容：</span>"
        + "                          <select id='ddl_VAT_invoice_content_{order_sequence_id}' class='select-h22'></select>"
        + "                          <span id='span_VAT_content_tips_{order_sequence_id}'></span>"
        + "                          <div class='invoice-info ml-65'>"
        + "                              <p id='p_VAT_content_tips_{order_sequence_id}'></p>"
        + "                              <p class='btn-bar'>"
        + "                                  <a href='javascript:for_99click();' class='btn btn-large-orange mr-5' id='a_VAT_invoice_submit_{order_sequence_id}'>确认发票信息</a>"
        + "                                  <a href='javascript:for_99click();' class='btn btn-large-grey' id='a_VAT_invoice_close_{order_sequence_id}'>暂不需要发票</a>"
        + "                                  <span id='span_VAT_invoice_tips_{order_sequence_id}'></span>"
        + "                              </p>"
        + "                          </div>"
        + "                      </div>"
        + "                  </div>"    
        + "                  <div id='div_VAT_invoice_explain_{order_sequence_id}' class='invoice-box invoice-box2 hide'>"
        + "						<div class='warn-box'>"
        + "							<p>如您是首次网上申请开具增值税专用发票，请您填写纳税人识别号等开票信息，并上传加盖公章的营业执照副本、税务登记证副本、一般纳税人资格证书及银行开户许可证扫描件，当当收到您的开票资料后，会尽快审核。我们会在资质信息审核通过，且订单状态变为“交易成功”后的7-15个工作日内，使用快递为您寄出发票（寄出时会短信通知），请您耐心等待；</p>"
        + "                          <p>资质上传及审核结果，您可以在 <a href='http://order.dangdang.com/InvoiceApply/VatCertificate.aspx' target='_blank' style='text-decoration:underline;'>我的增值税专用发票信息</a> 页面查询。</p>"
        + "                          <p id='p_VAT_invoice_explain_{order_sequence_id}'>注意：1、有效增值税专用发票开票资质仅为一个；2、化妆品、箱包皮具、食品、服装类商品暂不支持开增值税专用发票；3、为了不耽误商品使用，优先配送货物，增值税专用发票另行寄送。</p>"
        + "						</div>"
        + "					</div>"
   + "             </div>";


var INVOICE_TITLE_RPT_TEMPLATE = "<li id='invoice_title_{id}'  ><p>{invoice_title}</p><a id='title_delete_{id}' onclick='invoice_title_delete({id})' style='cursor:pointer;' class='hide'>删除</a></li>";
var E_INVOICE_TITLE_RPT_TEMPLATE = "<li id='e_invoice_title_{id}'  ><p>{invoice_title}</p><a id='e_title_delete_{id}' onclick='invoice_title_delete({id})' style='cursor:pointer;' class='hide'>删除</a></li>";
var NO_INVOICE_TEMPLATE_READONLY =
"<p class='listcon'>订单{sort_num}：<span class='mr-10'>暂不需要发票</span><a href='javascript:for_99click();' id='a_invoice_{order_sequence_id}'>编辑</a><font id='no_invoice_tips_{order_sequence_id}' color=\"#FF2832\" style='display:none'>&nbsp;&nbsp;&nbsp;&nbsp;您的订单应付金额为0元，不可开发票</font></p>";

var CONFIRM_INVOICE_TEMPLATE_READONLY =
"<p class='listcon'>订单{sort_num}：<span class='mr-10' id='confirm_order_info_{order_sequence_id}'></span><a href='javascript:for_99click();' id='invoice_modify_{order_sequence_id}'>编辑</a></p>";

var INTELLIGENT_TITLE_RPT_TEMPLATE = "<li id='intelligent_title_{id}'>{invoice_title}</li>";
var INTELLIGENT_E_TITLE_RPT_TEMPLATE = "<li id='intelligent_e_title_{id}'>{invoice_title}</li>";

var SINGLE_INVOICE_TITLE = "  <span class='select-div select-div-w205'>"
   + "                              <span class='selc-text w205'>"
   + "                                  <input type='text' id='invoice_title_{order_sequence_id}' maxlength='50' class='w195'/>"
   + "                              </span>"
   + "                         </span>";

var MULTIPLE_INVOICE_TITLE = "  <span class='select-div select-div-w205'>"
   + "                              <span class='selc-text w205'>"
   + "                                  <input type='text' id='invoice_title_{order_sequence_id}' maxlength='50'/>"
   + "                                  <i id='invoice_danwei_{order_sequence_id}'></i>"
   + "                              </span>"
   + "                         </span>";


var SINGLE_E_INVOICE_TITLE = "  <span class='select-div select-div-w205'>"
	   + "                              <span class='selc-text w205'>"
	   + "                                  <input type='text' id='e_invoice_title_{order_sequence_id}' maxlength='50' class='w195'/>"
	   + "                              </span>"
	   + "                         </span>";

var MULTIPLE_E_INVOICE_TITLE = "  <span class='select-div select-div-w205'>"
	   + "                              <span class='selc-text w205'>"
	   + "                                  <input type='text' id='e_invoice_title_{order_sequence_id}' maxlength='50'/>"
	   + "                                  <i id='e_invoice_danwei_{order_sequence_id}'></i>"
	   + "                              </span>"
	   + "                         </span>";


var GIFT_PACKING_TEMPLATE_SECOND = "<div class='item_giftpacking' id='div_giftpacking'>" +
"<div class='choose'><input name='' type='checkbox' value='' id='cb_gift_packing'><label>此订单作为礼品赠送他人</label><span class='ml-10'><a class='edit' id='gift_packing_edit' href='javascript:void(0)'>修改</a></span><span class='ml-10'><a href='javascript:void(0)' class='edit' id='gift_packing_delete' >取消</a></span></div>" +
"<div id='gift_packing_detail' class='hide'>" +
//是否选择包装
"<div class='giftpacking_choose clearfix' style='z-index:50'><div class='giftpacking_line'><label class='left_part'><strong>*</strong>礼品是否包装</label><label for='' class='radio_wrap' id='packageproductyeslabel' ><a class='simulate_radio' id='packageproductyes'></a><span class='text'>是</span></label><label for='' class='radio_wrap' id='packageproductnolabel'><a class='simulate_radio after_click' id='packageproductno'></a><span class='text'>否</span></label>" +
//包装选择小图
"<div class='packing_pic_wrap' id='preview_pack_image_list' style='z-index:10;'></div>" +
"<div id='package_name'class='giftpacking_price'><img id='package_name_image' style='width: 26px; height:26px;' src='{little_image_url}' alt=''><span id='package_name_info'>{package_name}&nbsp;&nbsp;¥{gift_package_price}</span></div><span id='product_package_tips' class='giftpacking_error'>包装订单默认合包发送</span></div></div>" +
"<div id='illegal_product_operate' class='giftpacking_order hide'>" +
"<div id='illegal_product' class='giftpacking_order_popup' style='left: 207px;z-index:40;background-color:white;'>" +

    "</div></div> " +
"<div class='giftpacking_order hide'><p class='giftpacking_error hide'><i class='giftpacking_hotspot'>订单中没有可以包装的商品<span class='triangle'></span>请&nbsp;</i><a href=''>放回购物车</a></p>" +
"<div class='giftpacking_order_popup' style='left:195px;_left:150px;'>艾格ES春季彩条落肩针织衫13031700699_彩色,155/34/XSAlexis Leroy里珞 欧美新款流苏装饰女式浅口平底单鞋</div></div>" +

"<ul class='giftpacking_choose_pic clearfix hide' id='big_image_list'></ul>" +
//是否需要贺卡
"<div class='giftpacking_line' style='z-index:9;'><label class='left_part'><strong>*</strong>是否需要贺卡</label><label for='' class='radio_wrap' id='greetingcardyeslabel'><a class='simulate_radio' id='greetingcardyes'></a><span class='text'>是</span></label><label for='' class='radio_wrap' id='greetingcardnolabel'><a class='simulate_radio after_click' id='greetingcardno'></a><span class='text'>否</span></label>" +
"<div class='giftpacking_price' style='z-index:5;' id='card_image_preview'><img style='height: 26px; width:26px;' src='{card_little_image_url}' alt=''><span id='card_price_span'>&nbsp;&nbsp;¥{card_price}</span></div><div id='card_image_big' class='packing_pic_big hide' style='left: 322px; width: 152px; height: 152px;'><img src='{card_big_image_url}' alt=''></div></div>  " +
"<div class='giftpacking_letter hide' id='greeting_card_main'><input type='text' value='{gift_message_receiver}' class='giftpacking_letter_title' id='card_nick_name'  tabindex='401' maxlength='10'><input type='text' maxlength='10' value='{gift_message_sender}' class='giftpacking_letter_end' id='card_sender_name'  tabindex='403'><textarea  id='card_main_body'  tabindex='402'>{gift_message}</textarea><p class='giftpacking_letter_tips'>还可以输入<span id='card_number'>10</span>个字符</p></div>" + //
//是否显示价格
"<div class='giftpacking_line' style='z-index:4;'><label class='left_part'><strong>*</strong>清单是否显示价格</label><label for='' class='radio_wrap' id='printpriceyeslabel'><a class='simulate_radio' id='printpriceyes'></a><span class='text'>是</span></label><label for='' class='radio_wrap' id='printpricenolabel'><a class='simulate_radio after_click' id='printpriceno' ></a><span class='text'>否</span></label><div class='packing_pic' id='print_price_preview'><img src='http://checkoutb.dangdang.com/resources/images/bar_code.jpg' alt=''></div><div class='packing_pic_big hide' id='print_price_big' style='left:272px;width:180px;height:180px;top:20px;'><img src='http://checkoutb.dangdang.com/resources/images/barcode_big_no.png' alt=''></div><p class='giftpacking_error'>3C商品默认附送发票</p></div>" +
//短信通知
"<div class='giftpacking_line' style='z-index:3;'><label class='left_part'>短信通知我</label><input type='text' id='txt_gift_sender_phone' class='giftpacking_input' value='{gift_sender_phone}' maxlength='11' ><span id='illegal_phone_tip' class='help-inline help-inline-error help-inline-large hide'><span class='icon icon-warn'></span>手机号码不正确，请重新输入</span></div>" +
"<p class='giftpacking_btn'><a href='javascript:;' class='giftpacking_btn_yes' id='gift_packing_submit'>确&nbsp;定</a><a href='javascript:;' class='giftpacking_btn_no' id='gift_packing_cancel'>取&nbsp;消</a>" +
    "<span id='area_giftpackage_save_tips' class='hide'>" +
    "<span class='icon icon-warn'></span>" +
    "<span id='span_area_giftpackage_save_tips'></span>" +
    "</span>" +
   "</p>" +
"</div>" +
"</div>";

var PREVIEW_IMAGE_LIST = "<div class='packing_pic'><img src='http://checkoutb.dangdang.com/resources/images/giftpacking_{list}.jpg' alt=''></div>";
var BIG_IMAGE_LIST = "<li><img src='http://checkoutb.dangdang.com/resources/images/price_pic{list}.jpg' alt=''><span>¥20.00/单</span></li>";

//spu限购
var SPU_LIMIT_TEMPLATE="<div id='spu_limit_container' class='popup-wrap popup-limit' style='z-index:10001;'><div class='popup-title' id='spu_limit_title'><h3>商品限购</h3>"
+ " <a class='btn-popup-close' href='javascript:for_99click();' id='spu_limit_close'></a></div><div class='popup-cont' id='spu_limit_content'></div>"
+ " <p class='btn-bar'><a href='javascript:for_99click();' id='btn_back_cart' class='btn btn-small-orange mr-10'>放回购物车</a><a href='javascript:for_99click();' id='btn_go_cart' class='btn btn-small-grey'>返回购物车修改数量</a></p></div>"

var SPU_LIMIT_RPT_TEMPLATE="<div class='tips'><span class='icon icon-warn'></span>以下同一商品的不同色码或规格共限购<span class='help-inline-error'>{limit_buy_count}</span>件，请返回购物车修改数量</div>"
+"	  <dl class='goods_list'><dt id='spu_limit_item_rpt_{main_product_id}'></dt><dd class='num_l'>已购数量<b class='red'>{buyed_prd_count}</b>限购数量<b class='red'>{limit_buy_count}</b></dd>"
+"	  </dl>";

var SPU_LIMIT_ITEM_RPT_TEMPLATE="<div class='goods'><div class='name'><p>{product_name}</p><p class=pt-5>{sale_attributes}</p></div><div class=num>购买数量：{product_count}</div></div>";

