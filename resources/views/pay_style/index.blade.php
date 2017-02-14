<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">


<title>订单结算--当当网</title>
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    
    <script type="text/javascript">
    	var BASE_PATH ="http://checkoutb.dangdang.com:80/web";
    	var ALIPAY_PATH = "http://checkoutb.dangdang.com/resources";
    </script>
    
	
    
    <script type="text/javascript" src="api"></script><script type="text/javascript" src="getscript"></script>
    <script type="text/javascript" src="js6/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="js6/jquery.md5.js"></script>
	<script type="text/javascript" src="js6/model_101207.js"></script>
    <script type="text/javascript" src="js6/virtual_gift_card.js"></script>
    <script type="text/javascript" src="js6/div_dialog_110402.js"></script>
    <script type="text/javascript" src="js6/field_valid_081103.js"></script>
    <script type="text/javascript" src="js6/region_101207.js"></script>
    <script type="text/javascript" src="js6/submit_form_101207.js"></script>
    <script type="text/javascript" src="js6/togethersend.js"></script>
    <script type="text/javascript" src="js6/dangdang_130120.js"></script>
    <script type="text/javascript" src="js6/tips_101207.js"></script>
    <script type="text/javascript" src="js6/consignee.js"></script>
    <script type="text/javascript" src="js6/consignee_common.js"></script>
    <script type="text/javascript" src="js6/consignee_edit.js"></script>
    <script type="text/javascript" src="js6/selfpickup.js"></script>
    <script type="text/javascript" src="js6/mobilecust.js"></script>
    <script type="text/javascript" src="js6/mobileplan.js"></script>
    <script type="text/javascript" src="js6/shipment.js"></script>
    <script type="text/javascript" src="js6/payment_2014.js"></script>
    <script type="text/javascript" src="js6/cartitems.js"></script>
    <script type="text/javascript" src="js6/serviceim.js"></script>
    <script type="text/javascript" src="js6/templates.js"></script>
    <script type="text/javascript" src="js6/custpoint.js"></script>
    <script type="text/javascript" src="js6/coupon.js"></script>
    
    
    <script type="text/javascript" src="js6/summary.js"></script>
    <script type="text/javascript" src="js6/checkcattle.js"></script>
    <script type="text/javascript" src="js6/order.js"></script>
    <script type="text/javascript" src="js6/invoice.js"></script>
    <script type="text/javascript" src="js6/distribution.js"></script>
    <script type="text/javascript" src="js6/shippingfee_piece_130120.js"></script>
    <script type="text/javascript" src="js6/illegal_product.js"></script>
    <script type="text/javascript" src="js6/product_package.js"></script>
    <script type="text/javascript" src="js6/big_image_list.js"></script>
    <script type="text/javascript" src="js6/gift_common.js"></script>
    <script type="text/javascript" src="js6/gift_mobile.js"></script>
    <script type="text/javascript" src="js6/gift_package_head.js"></script>
    <script type="text/javascript" src="js6/gift_package_main.js"></script>
    <script type="text/javascript" src="js6/gift_package_radio_button.js"></script>
    <script type="text/javascript" src="js6/greeting_card.js"></script>
    <script type="text/javascript" src="js6/greeting_card_content.js"></script>
    <script type="text/javascript" src="js6/little_image_list.js"></script>
    <script type="text/javascript" src="js6/print_price.js"></script>
    <script type="text/javascript" src="js6/baidu_api.js"></script>
    <script type="text/javascript" src="js6/consignee_modify_notice.js"></script>
    <script type="text/javascript" src="js6/degradation_notice.js"></script>
    <script type="text/javascript" src="js6/spu_limit.js"></script>
     
	<!-- <script type="text/javascript" src="Scripts/checkout.min.js?date=20141118"></script> -->
    <script type="text/javascript" src="js6/phoneauth.js"></script>
    <script type="text/javascript" src="js6/showvcode.js"></script>
    <script type="text/javascript" src="js6/pay_pass_set_source.js" charset="gb2312"></script>
    
    <script type="text/javascript">
	    $(document).ready(function(){ 
	  		gFo1K3();
	  	}); 
    </script>

<link rel="stylesheet" type="text/css" href="css6/index.css" media="all">
</head>
<body>
	
	<script type="text/javascript">
    eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('r(1c 1H=="O"){o U;(p(){o k={1d:"1I.1J",1e:\'1K\',D:\'O\',1f:\'O\'};k.1g={1h:0,1L:"",F:8,1i:p(a){o b=l.1h?"1M":"1N";o c="";P(o i=0;i<a.B*4;i++){c+=b.1j((a[i>>2]>>((i%4)*8+4))&1k)+b.1j((a[i>>2]>>((i%4)*8))&1k)}u c},1l:p(x,e){x[e>>5]|=1O<<((e)%32);x[(((e+1P)>>>9)<<4)+14]=e;o a=1Q;o b=-1R;o c=-1S;o d=1T;P(o i=0;i<x.B;i+=16){o f=a;o g=b;o h=c;o j=d;a=l.v(a,b,c,d,x[i+0],7,-1U);d=l.v(d,a,b,c,x[i+1],12,-1V);c=l.v(c,d,a,b,x[i+2],17,1W);b=l.v(b,c,d,a,x[i+3],22,-1X);a=l.v(a,b,c,d,x[i+4],7,-1Y);d=l.v(d,a,b,c,x[i+5],12,1Z);c=l.v(c,d,a,b,x[i+6],17,-24);b=l.v(b,c,d,a,x[i+7],22,-25);a=l.v(a,b,c,d,x[i+8],7,26);d=l.v(d,a,b,c,x[i+9],12,-27);c=l.v(c,d,a,b,x[i+10],17,-28);b=l.v(b,c,d,a,x[i+11],22,-29);a=l.v(a,b,c,d,x[i+12],7,2a);d=l.v(d,a,b,c,x[i+13],12,-2b);c=l.v(c,d,a,b,x[i+14],17,-2c);b=l.v(b,c,d,a,x[i+15],22,2d);a=l.w(a,b,c,d,x[i+1],5,-2e);d=l.w(d,a,b,c,x[i+6],9,-2f);c=l.w(c,d,a,b,x[i+11],14,2g);b=l.w(b,c,d,a,x[i+0],20,-2h);a=l.w(a,b,c,d,x[i+5],5,-2i);d=l.w(d,a,b,c,x[i+10],9,2j);c=l.w(c,d,a,b,x[i+15],14,-2k);b=l.w(b,c,d,a,x[i+4],20,-2l);a=l.w(a,b,c,d,x[i+9],5,2m);d=l.w(d,a,b,c,x[i+14],9,-2n);c=l.w(c,d,a,b,x[i+3],14,-2o);b=l.w(b,c,d,a,x[i+8],20,2p);a=l.w(a,b,c,d,x[i+13],5,-2q);d=l.w(d,a,b,c,x[i+2],9,-2r);c=l.w(c,d,a,b,x[i+7],14,2s);b=l.w(b,c,d,a,x[i+12],20,-2t);a=l.z(a,b,c,d,x[i+5],4,-2u);d=l.z(d,a,b,c,x[i+8],11,-2v);c=l.z(c,d,a,b,x[i+11],16,2w);b=l.z(b,c,d,a,x[i+14],23,-2x);a=l.z(a,b,c,d,x[i+1],4,-2y);d=l.z(d,a,b,c,x[i+4],11,2z);c=l.z(c,d,a,b,x[i+7],16,-2A);b=l.z(b,c,d,a,x[i+10],23,-2B);a=l.z(a,b,c,d,x[i+13],4,2C);d=l.z(d,a,b,c,x[i+0],11,-2D);c=l.z(c,d,a,b,x[i+3],16,-2E);b=l.z(b,c,d,a,x[i+6],23,2F);a=l.z(a,b,c,d,x[i+9],4,-2G);d=l.z(d,a,b,c,x[i+12],11,-2H);c=l.z(c,d,a,b,x[i+15],16,2I);b=l.z(b,c,d,a,x[i+2],23,-2J);a=l.A(a,b,c,d,x[i+0],6,-2K);d=l.A(d,a,b,c,x[i+7],10,2L);c=l.A(c,d,a,b,x[i+14],15,-2M);b=l.A(b,c,d,a,x[i+5],21,-2N);a=l.A(a,b,c,d,x[i+12],6,2O);d=l.A(d,a,b,c,x[i+3],10,-2P);c=l.A(c,d,a,b,x[i+10],15,-2Q);b=l.A(b,c,d,a,x[i+1],21,-2R);a=l.A(a,b,c,d,x[i+8],6,2S);d=l.A(d,a,b,c,x[i+15],10,-2T);c=l.A(c,d,a,b,x[i+6],15,-2U);b=l.A(b,c,d,a,x[i+13],21,2V);a=l.A(a,b,c,d,x[i+4],6,-2W);d=l.A(d,a,b,c,x[i+11],10,-2X);c=l.A(c,d,a,b,x[i+2],15,2Y);b=l.A(b,c,d,a,x[i+9],21,-2Z);a=l.C(a,f);b=l.C(b,g);c=l.C(c,h);d=l.C(d,j)}u V(a,b,c,d)},J:p(q,a,b,x,s,t){u l.C(l.1m(l.C(l.C(a,q),l.C(x,t)),s),b)},v:p(a,b,c,d,x,s,t){u l.J((b&c)|((~b)&d),a,b,x,s,t)},w:p(a,b,c,d,x,s,t){u l.J((b&d)|(c&(~d)),a,b,x,s,t)},z:p(a,b,c,d,x,s,t){u l.J(b^c^d,a,b,x,s,t)},A:p(a,b,c,d,x,s,t){u l.J(c^(b|(~d)),a,b,x,s,t)},1n:p(a){o b=V();o c=(1<<l.F)-1;P(o i=0;i<a.B*l.F;i+=l.F)b[i>>5]|=(a.30(i/l.F)&c)<<(i%32);u b},C:p(x,y){o a=(x&W)+(y&W);o b=(x>>16)+(y>>16)+(a>>16);u(b<<16)|(a&W)},1m:p(a,b){u(a<<b)|(a>>>(32-b))},1o:p(s){u l.1i(l.1l(l.1n(s),s.B*l.F))}};k.X={1p:p(a){o b=Y(a)+"=",Q=K.L.E(b),Z=1q;r(Q>-1){o c=K.L.E(";",Q);r(c==-1){c=K.L.B}Z=31(K.L.18(Q+b.B,c))}u Z},19:p(a,b,c,d,e,f){o g=Y(a)+"="+Y(b);r(c 33 N){g+="; 34="+c.36()}r(d){g+="; 37="+d}r(e){g+="; 38="+e}r(f){g+="; 39"}K.L=g},3a:p(a,b,c,d){l.19(a,"",G N(0),b,c,d)}};k.3b={3c:p(a){o b=G 3d();r(a.E("?")>0){o c=a.18(a.E("?")+1);r(c.E("#")>0){c=c.18(0,c.E("#"))}o d=c.1a("&");P(o i=0;i<d.B;i++){b[d[i].1a("=")[0]]=d[i].1a("=")[1]}}u b}};k.3e=p(a,b,c){r(a.1r){a.1r(b,c,1s)}R r(a.1t){a.1t("T"+b,c)}R{a["T"+b]=c}};k.3f=p(a,b,c){r(a.1u){a.1u(b,c,1s)}R r(a.1v){a.1v("T"+b,c)}R{a["T"+b]=1q}};k.3g=p(x){o a=3h(x);r(3i(a)){u 0.1w}o a=I.3j(x*1x)/1x;o b=a.3k();o c=b.E(\'.\');r(c<0){c=b.B;b+=\'.\'}3l(b.B<=c+2){b+=\'0\'}u b};k.1y=p(){o n=G N();o y=n.3m()+\'\';o m=n.3n()+1;r(m<10)m="0"+m;o d=n.3o();r(d<10)d="0"+d;o H=n.3p();r(H<10)H="0"+H;o M=n.3q();r(M<10)M="0"+M;o S=n.3r();r(S<10)S="0"+S;o a="1w"+n.3s();a=a.1b(a.B-3,3);o b=I.1z(1A+I.1B()*1C);o c=I.1z(1A+I.1B()*1C);o e=y+m+d+H+M+S+a+b+c+k.1e;o f=k.1g.1o(e);f=k.1D(f);u y+m+d+H+M+S+a+f+b+c};k.1D=p(a){o b=3t(a.1b(0,8),16);o c=3u(b).1b(0,6);o d=c.B;r(d<6){c+=k.1E(\'0\',I.3v(6-d))}u c};k.1E=p(a,b){u G V(b+1).3w(a)};k.1F=p(){o t=G N();u t.3x()};k.1G=p(){k.D=k.X.1p("D");r(1c k.D==\'O\'||!/^\\d{35}$/.3y(k.D)){o a=G N(3z,1,1);k.D=k.1y();k.X.19("D",k.D,a,"/",k.1d)}k.1f=k.1F()};U=k;U.1G()})()}',62,222,'|||||||||||||||||||||this|||var|function||if|||return|md5_ff|md5_gg|||md5_hh|md5_ii|length|safe_add|__permanent_id|indexOf|chrsz|new||Math|md5_cmn|document|cookie||Date|undefined|for|cookieStart|else||on|ddclick_head_functions|Array|0xFFFF|CookieUtil|encodeURIComponent|cookieValue|||||||||substring|set|split|substr|typeof|__cookieDomain|__ddclick_hash_key|__timestap|Md5Util|hexcase|binl2hex|charAt|0xF|core_md5|bit_rol|str2binl|hex_md5|get|null|addEventListener|false|attachEvent|removeEventListener|detachEvent|00|100|createPermanentID|floor|100000|random|900000|formatHashCode|str_repeat|initTime|init|ddclick_page_tracker|dangdang|com|DDClick521|b64pad|0123456789ABCDEF|0123456789abcdef|0x80|64|1732584193|271733879|1732584194|271733878|680876936|389564586|606105819|1044525330|176418897|1200080426|||||1473231341|45705983|1770035416|1958414417|42063|1990404162|1804603682|40341101|1502002290|1236535329|165796510|1069501632|643717713|373897302|701558691|38016083|660478335|405537848|568446438|1019803690|187363961|1163531501|1444681467|51403784|1735328473|1926607734|378558|2022574463|1839030562|35309556|1530992060|1272893353|155497632|1094730640|681279174|358537222|722521979|76029189|640364487|421815835|530742520|995338651|198630844|1126891415|1416354905|57434055|1700485571|1894986606|1051523|2054922799|1873313359|30611744|1560198380|1309151649|145523070|1120210379|718787259|343485551|charCodeAt|decodeURIComponent||instanceof|expires||toGMTString|path|domain|secure|unset|URLUtil|getKeyValueArray|Object|addEventHandler|removeEventHandler|changeTwoDecimal|parseFloat|isNaN|round|toString|while|getFullYear|getMonth|getDate|getHours|getMinutes|getSeconds|getMilliseconds|parseInt|String|abs|join|getTime|test|2020'.split('|'),0,{}))</script>

<script charset="gb2312" type="text/javascript">var width = 0; narrow = 1;</script>
<script src="js6/pagetop2015_0827.js" charset="gb2312" type="text/javascript"></script>
<script src="js6/dd.menu-aim.js" charset="gb2312" type="text/javascript"></script>

<div id="hd">
<div id="tools">
<div class="tools">
    <div class="ddnewhead_operate" dd_name="顶链接">
        <ul class="ddnewhead_operate_nav">
        <li class="ddnewhead_cart"><a href="javascript:AddToShoppingCart(0);" name="购物车" dd_name="购物车"><i class="icon_card"></i>购物车<b id="cart_items_count">1</b></a></li>
        <li><a target="_top" href="http://orderb.dangdang.com/myallorders.aspx" name="我的订单" dd_name="我的订单" rel="nofollow">我的订单<b id="unpaid_num" style="color: rgb(255, 40, 50); font: bold 12px Arial;">(2)</b></a></li>
	<li><a target="_top" href="http://e.dangdang.com/touch/special/goldenIP/index.html" name="mydd_7" dd_name="原创征文">原创征文</a></li>
        <li class="dang_erweima">
          <a target="_top" href="http://t.dangdang.com/20130220_ydmr" id="a_phonechannel" onmouseover="showgaoji('a_phonechannel','__ddnav_sjdd');" onmouseout="hideotherchannel('a_phonechannel','__ddnav_sjdd');" class="menu_btn"><i class="icon_tel"></i>手机当当</a>
          <div class="tel_pop" style="display: none;" id="__ddnav_sjdd" onmouseover="showgaoji('a_phonechannel','__ddnav_sjdd');" onmouseout="hideotherchannel('a_phonechannel','__ddnav_sjdd');">
                <a target="_top" href="http://t.dangdang.com/20130220_ydmr" class="title"><i class="icon_tel"></i>手机当当</a><i class="title_shadow"></i>
                <div class="tel_pop_box clearfix">
                    <div class="tel_pop_box_li"><a href="http://t.dangdang.com/20130220_ydmr" dd_name="手机二维码" target="_top"><span>当当购物客户端</span><img src="go_erweima.png"><span class="text">下载购物APP<br>手机端1元秒</span></a></div>
                    <div class="tel_pop_box_li"><a href="http://t.dangdang.com/20140107_5pz1" dd_name="手机二维码" target="_top"><span>当当读书客户端</span><img src="du_erweima.png"><span class="text">万本电子书<br>免费读</span></a></div>
                </div>
          </div>
        </li>
        <li class="my_dd"><a class="menu_btn" target="_top" href="http://myhome.dangdang.com/" name="我的当当" dd_name="我的当当" id="a_myddchannel" onmouseover="showgaoji('a_myddchannel','__ddnav_mydd')" onmouseout="hideotherchannel('a_myddchannel','__ddnav_mydd');">我的当当</a>
            <ul class="ddnewhead_gcard_list" id="__ddnav_mydd" onmouseover="showgaoji('a_myddchannel','__ddnav_mydd')" onmouseout="hideotherchannel('a_myddchannel','__ddnav_mydd');">
                <li><a target="_top" href="http://orderb.dangdang.com/myallorders.aspx" name="mydd_7" dd_name="新_我的订单">我的订单</a></li>
               <li><a target="_top" href="http://shopping.dangdang.com/shoppingcart/shopping_cart.aspx" name="mydd_8" dd_name="新_购物车" rel="nofollow">购物车</a></li>
                <li><a target="_top" href="http://my.dangdang.com/memberpoints/index.aspx?ref=my-0-L" name="mydd_4" dd_name="我的积分" rel="nofollow">积分抵现</a></li>
                <li><a target="_top" href="http://wish.dangdang.com/wishlist/cust_wish_list.aspx?ref=my-0-L" name="mydd_1" dd_name="我的收藏" rel="nofollow">我的收藏</a></li>
                <li><a target="_top" href="http://newaccount.dangdang.com/payhistory/mybalance.aspx" name="mydd_5" dd_name="我的余额" rel="nofollow">我的余额</a></li>
                <li><a target="_top" href="http://comm.dangdang.com/review/reviewbuy.php?ref=my-0-L" name="mydd_4" dd_name="我的评论" rel="nofollow">我的评论</a></li>
                <li><a target="_top" href="http://newaccount.dangdang.com/payhistory/mycoupon.aspx" name="mydd_2" dd_name="礼券/礼品卡" rel="nofollow">礼券/礼品卡</a></li>
		<li><a target="_top" href="http://e.dangdang.com/ebook/listUserEbooks.do" name="mydd_6" dd_name="电子书架">电子书架</a></li>
            </ul>
        </li>
        <li><a class="menu_btn" href="javascript:void(0);" style="cursor: default;" name="qycg" dd_name="企业采购" id="a_qycgchannel" onmouseover="showgaoji('a_qycgchannel','__ddnav_qycg');" onmouseout="hideotherchannel('a_qycgchannel','__ddnav_qycg');">企业采购</a>
            <ul class="ddnewhead_gcard_list" id="__ddnav_qycg" onmouseover="showgaoji('a_qycgchannel','__ddnav_qycg');" onmouseout="hideotherchannel('a_qycgchannel','__ddnav_qycg');">
                <li><a target="_top" href="http://giftcard.dangdang.com/giftcardCompany" name="qycg_1" dd_name="大宗采购">大宗采购</a></li>
                <li><a target="_top" href="http://giftcard.dangdang.com/" name="qycg_2" dd_name="礼品卡采购">礼品卡采购</a></li>
                <li><a target="_top" href="http://account.dangdang.com/payhistory/mymoney.aspx" name="gqycg_3" dd_name="礼品卡激活" rel="nofollow">礼品卡激活</a></li>
                <li><a target="_top" href="http://help.dangdang.com/details/page24" name="qycg_4" dd_name="礼品卡使用">礼品卡使用</a></li>
            </ul>
        </li>
        <li class="hover "><a class="menu_btn" href="javascript:void(0);" style="cursor: default;" name="ddkf_0" dd_name="客户服务" id="a_bzzxchannel" onmouseover="showgaoji('a_bzzxchannel','__ddnav_bzzx');" onmouseout="hideotherchannel('a_bzzxchannel','__ddnav_bzzx');">客户服务</a>
            <ul class="ddnewhead_gcard_list" id="__ddnav_bzzx" onmouseover="showgaoji('a_bzzxchannel','__ddnav_bzzx');" onmouseout="hideotherchannel('a_bzzxchannel','__ddnav_bzzx');">
                <li><a target="_top" href="http://help.dangdang.com/index" name="ddkf_2" dd_name="帮助中心">帮助中心</a></li>
		<li><a target="_top" href="http://return.dangdang.com/reverseapplyselect.aspx" name="ddkf_3" dd_name="自助退换货">自助退换货</a></li>
               <li><a target="_top" href="http://order.dangdang.com/InvoiceApply/InvoiceOnlineReissue.aspx" name="tsjy_2" dd_name="自助发票" rel="nofollow">自助发票</a></li>
                <li><a target="_top" href="http://help.dangdang.com/details/page206" name="ddkf_4" dd_name="联系客服">联系客服</a></li>
                <li><a target="_top" href="http://help.dangdang.com/email_contact" name="tsjy_1" dd_name="我要投诉" rel="nofollow">我要投诉</a></li>
                <li><a target="_top" href="http://help.dangdang.com/email_contact" name="tsjy_2" dd_name="意见建议" rel="nofollow">意见建议</a></li>
            </ul>
        </li>
        </ul>
        <div class="ddnewhead_welcome" display="none;">
            <span id="nickname"><span class="hi">Hi，<a href="http://myhome.dangdang.com/" class="login_link" target="_top"><b>157**…</b></a><a href="javascript:PageTopSignOut();" target="_self">[退出]</a></span></span>
            <div class="tel_pop" style="display: none;" id="__ddnav_sjdd" onmouseover="showgaoji('a_phonechannel','__ddnav_sjdd');" onmouseout="hideotherchannel('a_phonechannel','__ddnav_sjdd');">
                <a target="_top" href="http://t.dangdang.com/20130220_ydmr" class="title"><i class="icon_tel"></i>手机当当</a><i class="title_shadow"></i>
                <ul class="tel_pop_box">
                    <li><a href="http://t.dangdang.com/20130220_ydmr" dd_name="手机二维码"><span>当当手机客户端</span><img src="erweima2.png"><span class="text">随手查订单<br>随时享优惠</span></a></li>
                </ul>
            </div>
        </div>
        <div class="new_head_znx" id="znx_content" style="display: none;"></div>
    </div>
</div>
</div>
<div id="header_end"></div>
<!--CreateDate  2016-10-16 03:00:02--></div>
<form action="http://search.dangdang.com/search.aspx" id="bootpagetopSearch" name="bootpagetopSearch" method="GET"></form>
<script type="text/javascript">var nick_num = 0;initHeaderOperate();</script><script src="queryunpaid" type="text/javascript"></script>
  
	
    <div id="div_shield" class="popup-wrap-bg hide">
        <iframe src="index_1.html" id="shield_frame" frameborder="0" height="100%"></iframe>
    </div>
    <div id="divSetPaymentPassword" class="hide" style="left: 50%; top: 50%; position: fixed; margin-left: -205px; margin-top: -79px; z-index: 10001;">
        <div class="popup-title">
            <h3>设置支付密码</h3>
            <a id="CloseSetPaymentPasswordWindow" class="btn-popup-close" href="javascript:for_99click();"></a>
        </div>
        <div class="popup-cont">
            <p>请您先设置支付密码，支付密码设置成功后才能成功提交订单。</p>
            <p class="btn-bar"><a id="setPaymentPasswordCompleted" href="javascript:for_99click();" class="btn btn-small-orange mr-10">设置完成</a><a href="http://support.dangdang.com/helpcenter/api_cms/helpcenter/question_sort/2247/227484.shtml" target="_top" class="btn btn-small-grey">设置遇到问题</a></p>
            <p class="text"><a href="http://safe.dangdang.com/payment_pass.php" target="_top">返回重新设置支付密码</a></p>
        </div>
    </div>
    <div style="display: block;" class="checkout-wrap" id="div_ajax_canvas">
        <!-- topbar -->
        <div class="topbar">
            <h2>
                <a href="http://www.dangdang.com/" title="返回首页">
                    <img src="dangdang_logo.jpg" alt="当当" title="返回首页"></a></h2>
            <div class="shopcar-nav">
                <strong class="title">填写订单</strong>
                <div class="cont">
                    <ul class="step2">
                        <li class="first"><span>1、</span><a href="http://shopping.dangdang.com/shoppingcart/shopping_cart">我的购物车</a><i></i></li>
                        <li class="second"><span>2、</span>填写订单<i></i></li>
                        <li class="third"><span>3、</span>完成订单</li>
                    </ul>
                    <span class="shopcar-nav" style="left: 20px;"></span><span class="shopcar-nav" style="left: 50px;"></span>
                </div>
            </div>
            <div class="btn-bar pt-20">
                
                <a class="btn btn-normal-grey pull-right" href="http://shopping.dangdang.com/shoppingcart/shopping_cart" title="">返回修改购物车</a>
            </div>
            <div class="objhide" id="div_checkout_tips">
            </div>
        </div>
        <div id="Div1" style="clear: both; margin-top: 10px;">
        </div>
        <h3 class="order-h3"><span>收货相关信息</span></h3><div class="order-box"><div class="order-info"><div class="cont" id="receivingInfo"><div id="div_consignee"></div><div id="div_mobilecust"></div><div class="item-list" id="div_self_pickup"></div><div class="item-list" id="shipmentList"><h4 style="">送货方式<a class="ml-15" href="javascript:for_99click();" id="shipmentCollapse"></a></h4><p id="shipmentGroup_1" class="listcon" style="display: none;" sortnum="1">订单1：<span class="mr-10">自动发货</span><span class="mr-10"></span></p><div id="div_shipment_0_98" class="item-list" style=""><p class="listcon">订单1：<span class="mr-10">自动发货</span><span class="mr-10">款项到达当当网账户后，系统将立即为您开通电子书在线阅读权限，您可以到“我的当当-数字商品”下阅读您购买的电子书</span></p></div><p id="together_send_id" class="listcon"><input checked="checked" id="together_send_checkbox" name="together_send_checkbox" value="" class="mr-5" style="vertical-align: text-bottom;" type="checkbox">不同订单合并一起发货（<a href="http://help.dangdang.com/details/page214" target="_top">为什么？</a>）</p></div><div class="item-list" id="paymentList"><h4 style="">支付方式<a class="ml-15" href="javascript:for_99click();" id="paymentCollapse"></a></h4><div id="div_payment_0_98" class="item-list"><a name="payment_point_0_98"></a><div class="item-pay"><div class="item-pay-title"><b>订单1：</b></div>     <div class="pay-box">    <div id="cust_cash_area_0_98" class="hide">        <p>        余额：您当前有<strong class="color-price">0.00</strong>元余额可用<span id="span_cust_account_0_98" class="hide">，您已使用<strong class="color-price" id="p_cust_cash_used_0_98">0.00</strong>元        </span>        </p>    </div><div class="by-gift" id="by-gift_0"><p><span id="remain_gift_card_0_98" class="hide">礼品卡：您当前有<strong class="color-price" id="remain_gift_card_account_0_98">0.00</strong>元礼品卡可用</span><span id="span_ddmoney_0_98" class="hide">，您已使用<strong class="color-price" id="p_ddmoney_used_0_98">0.00</strong>元 </span></p></div><p id="dd_cust_giftcard_limit_tips_0_98" style="color: rgb(204, 51, 0); padding: 0px 40px 5px;" class="hide"></p><p id="dd_cust_cash_tips_0_98" style="color: rgb(204, 51, 0); padding: 0px 40px 5px;" class="hide"></p><div class="by-other"><p id="dd_money_payable_tips_0_98"> 您还需为订单支付<strong class="color-price">15.00</strong>元，请选择以下支付方式：</p><span id="span_product_choice_payment_0_98" style="position: absolute; display: none; z-index: 10; width: 1261px;"><div id="div_product_choice_payment_info_0_98" class="new_window"><div class="wind_top" id="product_choice_payment_title_0_98"><div class="title_left">付款方式限制提示</div><div class="w_close"><a id="product_choice_payment_box_0_98" name="product_choice_payment_close" href="javascript:for_99click();" title="关闭">关闭窗口</a></div></div><div class="window_content" id="product_choice_payment_content_0_98"><div class="wind_split wind_limit"><p>以下商品暂不支持货到付款</p><p><span></span><span></span></p><p>您可以<a id="a_openPayment_edit_0_98" name="a_openPayment_edit" href="http://checkoutb.dangdang.com/checkout.aspx">修改付款方式</a>或<a name="cod_to_shopping" id="cod_to_shopping_0_98" href="http://checkoutb.dangdang.com/checkout.aspx?product_ids=&amp;type=3&amp;ref=checkout-0-C" target="_top">返回修改购物车&gt;&gt;</a></p></div><div class="" id="product_choice_payment_loading_bar_0_98"></div></div></div></span><ul id="rd_pay_id_0_98"><li><p><label class="radio" for=""><input name="rd_pay_id_0_98" value="1" id="-1" type="radio">网上支付</label><span class=""><span class="hide" id="bank_memo_1_-1_0_98"></span></span><span class="zhidian" style="display: none;" id="zhi_dian_desc_1_-1_0_98"></span></p><div class="hide" id="bank_memo_detail_1_-1_0_98"></div></li><li><p><label class="radio label-w145" for=""><input name="rd_pay_id_0_98" value="6" id="100" type="radio">他人代付</label><span class="hide" id="bank_memo_6_100_0_98" style="margin-right: 0px;">TA的邮箱：<input class="input-w210 ver-m" value="选填" id="other_pay_email_0_98" maxlength="50" type="text"></span><span id="area_other_pay_error_0_98" class="hide"><span class="icon icon-warn"></span><span id="span_other_pay_error_0_98">请输入正确的邮箱</span></span></p><p class="hide" id="bank_memo_description_6_100_0_98">（代付链接将发送至您填写的邮箱中）</p><div class="hide" id="bank_memo_detail_6_100_0_98"><p class="pay-instead-messages">给TA留言：<label><input id="other_pay_rd_message_10_0_98" name="other_pay_rd_message_0_98" checked="checked" value="10" type="radio">默认留言</label><label><input id="other_pay_rd_message_11_0_98" name="other_pay_rd_message_0_98" value="11" type="radio">雪中送炭</label><label><input id="other_pay_rd_message_12_0_98" name="other_pay_rd_message_0_98" value="12" type="radio">温馨甜蜜</label><label><input id="other_pay_rd_message_13_0_98" name="other_pay_rd_message_0_98" value="13" type="radio">亲情无限</label><label><input id="other_pay_rd_message_14_0_98" name="other_pay_rd_message_0_98" value="14" type="radio">衷心请求</label></p><div style="padding-left: 63px;" class="clearfix"><textarea id="other_pay_message_0_98" value="请帮忙给我支付一下这件商品吧"></textarea><span class="help-inline help-inline-error help-inline-large fl" style="margin-top: 65px; white-space: nowrap;" id="other_pay_message_error_0_98"><span style="color: rgb(135, 130, 127);" id="other_pay_message_length_0_98">0/35</span></span><p id="other_pay_public_name_panel_0_98" class="pay-instead-pub fl"><label><input checked="checked" name="name_other_pay_public_name_0_98" id="other_pay_public_name_0_98" type="checkbox">对TA公开收货人姓名</label></p></div></div></li></ul><p class="btn-bar mt-10 pb-15"><a style='background-color:orange' class="btn btn-large-orange" id="btn_payment_save_0_98" href="javascript:for_99click();">确认支付方式</a><span id="area_payment_save_tips_0_98" class="hide">    <span class="icon icon-warn"></span>    <span id="span_payment_save_tips_0_98"></span></span></p><div class="clear"></div><p></p></div></div></div></div></div><div style="display: none;" class="item-list" id="invoiceList"><h4 style="display: none;">发票信息<a class="ml-15" href="javascript:for_99click();" id="invoiceCollapse">修改</a></h4></div><div id="div_mobileplan" class="item-contact contact-form"></div></div></div></div><div id="rpt_order"><h3 id="order_title_0_98" class="order-h3"><span>订单<span id="order_sort_number_0_98">1</span></span><small>(<span id="order_sender_description_0_98">当当电子书</span>)</small><a title="" href="###" id="part_order_tips_0_98" class="hide">为什么分订单?</a>  <div id="part_order_tips_box_0_98" class="popup-wrap popup-normal" style="left: 10px; margin-top: -100px; display: none;"> <div class="popup-title">     <h3>为什么分订单？</h3>     <a class="btn-popup-close" href="javascript:void(0)" id="part_order_tips_close_0_98"></a>  </div>  <div class="popup-cont">     <p>由于您购买的商品是由不同商家配送的，因此需要分订单。</p>  </div>  </div> </h3><div id="div_orderflow_0_98" class="order-box"><div class="order-list"><div class="cont"><div class="cont" id="cart_item_rep_0_98"><div class="title">    <ul>        <li>            <div class="col1">商品名称</div>            <div class="col-error"></div>            <div class="col2">当当价</div>            <div class="col3">促销价</div>            <div class="col4">数量</div>            <div class="col5">小计</div>            <div class="col-collect title">操作</div>        </li>    </ul></div><div class="item last ">    <ul id="order0_98Item0SubItems"><li class="">    <div class="col1">        <p>            <span class="restrict_buy">限购</span>            <span class="" title="魔鬼经济学：揭示隐藏在表象之下的真实世界.1(电子书)">魔鬼经济学：揭示隐藏在表象之下的真实世界.1(电子书)</span>        </p>    </div>    <div class="col-error"></div>    <div class="col2"><span>¥28.80(6折)</span></div>    <div class="col3 ">¥15.00</div>    <div class="col4">1</div>    <div class="col5">¥15.00</div>    <div class="col-collect"><a href="javascript:void(0)" data-click="uncheckCartItem(81682263_0_1900564423_3839732)">放回购物车</a></div></li></ul>    <div class="hide" style="padding: 0px 0px 5px 15px;">        <p style="color: rgb(244, 0, 0);">*本商品使用礼品卡将产生手续费</p>    </div></div></div><div class="pricebar clearfix"><div id="div_giftpacking"></div><div class="price-total"><span class="mr-10" style="margin-right: 70px; display: none;" id="gift_card_charge_0_98"><strong>礼品卡手续费：</strong>¥<span id="gift_card_charge_value_0_98">0.00</span></span><span class="mr-10"><strong>运费：</strong><span id="obj_order_shipping_fee_0_98">免运费</span> <a style="visibility: hidden;" href="javascript:void(0)" class="" id="shippingfee_piece_tips_0_98">(想免运费?)</a>    <div id="order_shipping_fee_tips_0_98" class="popup-wrap popup-normal" style="left: 0px; top: -85px; display: none;">    <div class="popup-title">        <h3>免运费说明？</h3>        <a class="btn-popup-close" href="javascript:void(0)" id="shipping_fee_close_tips_close_0_98"></a>     </div>     <div class="popup-cont">         <p style="display: block;" id="shippingfee_tip_0_98"><span id="pub_free_shippingfee_0_98"></span><span id="gm_free_shippingfee_0_98"></span> 可免运费</p>         <p style="display: none;" id="shop_shippingfee_tip_0_98"></p>     </div>    </div></span><span class="mr-10" style="display: none;" id="order_overseas_tax_0_98"> <strong>税费：</strong> <strong class="" id="overseas_tax_0_98">¥0</strong> <span class="question_icon" style="display: none;" id="order_assemble_tax_icon_0_98"></span> </span> <span class="mr-10"><strong>小计总额：</strong><strong class="color-price">¥<span id="obj_order_bargin_total_0_98">15.00</span></strong></span><a class="btn btn-small-grey" href="javascript:for_99click();" style="color: rgb(51, 51, 51); visibility: hidden;" id="btn_shipping_fee_0_98">免运费凑单</a></div> <div class="jump_pannel" style="display: none;" id="order_assemble_tax_0_98">    <div class="tax"><span class="tax_name">关税：</span><span class="price" id="tariff_0_98">¥</span></div>    <div class="tax"><span class="tax_name">消费税：</span><span class="price" id="excise_0_98">¥</span></div>    <div class="tax"><span class="tax_name">增值税：</span><span class="price" id="vat_0_98">¥</span></div>  </div> </div></div><div class="cont"><div style="display: none;" class="item-list virtual" id="user_key_div_0_98"></div>    <div style="display: none;" id="shop_message_0_98" class="item-message">    <p id="shop_message_prompt_0_98" class="item-message-prompt hide">    <span class="help-inline help-inline-error help-inline-large"><span class="icon icon-warn"></span>已超过字数上限，请精简语言</span>    </p>    <p>    <label for="">给商家留言：</label>    <textarea name="" id="text_shop_message_0_98" cols="48" rows="1" style="overflow-x: hidden;"></textarea>    <span id="shop_message_length_0_98" class="help-inline">0/200</span>    <span id="placeholder_text_0_98" class="placeholder-text">最多可输入200个字</span>    </p>    </div></div></div></div></div>
        <div style="display: none;" class="order-box order-box-special mt-20" id="order_flow_loading">
            <div class="order-info clearfix">
                <div class="shoppingcart_loading">
                    <img src="loading.gif" height="36" width="36">
                </div>
            </div>
        </div>
        <div class="order-box order-box-special order-box-orderSubmit mt-20" id="order_flow_summary" style="display: block;">
            <div class="order-info clearfix">
                <div id="div_coupon" class="col-l pt-20"><p id="shop_overseas_nocashpay_tip" class="hide"><span class="color-red">海外购商品</span>只允许用礼券和优惠码支付。</p><div id="cf_pay_title" class="pay_title"><a href="javascript:for_99click()" class="op" id="expandCash">&nbsp;</a><span id="cashwenan" class="title">余&nbsp;&nbsp;额</span><span id="usedCustCashSummary" style="display: none;">您当前使用<b class="color-red mlr-10">¥0.00</b>余额支付订单<a href="javascript:for_99click()" id="cancelCustCash" class="ml-15">取消使用</a></span></div><p style="display: none;" class="pay_detail">账户余额<b class="color-red mlr-10">¥0.00</b><span style="display: none;" id="custCashBtnArea">您可以重置使用余额<input value="" class="input-w87 ver-m ml-10" style="_vertical-align:middle" maxlength="8" id="iptUseCustCash" type="text"><a href="javascript:for_99click()" class="btn btn-small-orange ml-20 mr-10 pos-r-1" id="submitCash">使 用</a></span></p><div id="cf_giftcard" class="pay_title"><p style="display: none;">如果您使用礼品卡余额支付订单剩余金额，需要使用0.00元，其中手续费为0.00元</p><a href="javascript:for_99click()" class="op" id="expandGiftcard">&nbsp;</a><span id="giftCardwenan" class="title">礼品卡</span></div><p class="pay_detail" id="giftCardNotSupport" style="display: none;">您的订单中<span class="used" id="giftCardNotSupportDetail">部分商家</span>不支持使用当当礼品卡和图书专用卡<span id="giftCardNotSupportTips" class="remind_info remind_info2" style="display: none;"><i class="tips_arrow"></i></span></p><p class="pay_detail" id="giftCardAmountArea" style="display: none;">您的<span id="commonVipGiftCard" style="display: none;"><span class="used" id="commonVipName">全品类卡</span>余额为<span class="balance" id="commonVipBalance">¥0.00</span></span><span id="splitFlagAfterVipCard" style="display: none;">，</span><span id="categoryGiftCard" style="display: none;"><span class="used" id="categoryGiftCardName">当当礼品卡</span>余额为<span class="balance" id="allCategoryGiftCardBalance">¥0.00</span></span><span id="splitFlagAfterAllCategory" style="display: none;">，</span><span id="bookGiftCard" style="display: none;"><span class="used" id="bookGiftCardName">图书专用卡</span>余额为<span class="balance" id="bookGiftCardBalance">¥0.00</span></span><span id="bookGiftCardNotUseHint" style="display: none;">，<span id="orderNotSupportTips">您订单中的商品不支持使用当当礼品卡和图书专用卡</span></span><span id="giftCartNameHint" style="display: none;">当当礼品卡不支持海外购、当当礼品卡、图书专用卡及部分商家商品使用<i class="tips_arrow"></i></span></p><p class="pay_detail" id="usedGiftcardSummary" style="display: none;">您当前使用<b class="color-red mlr-10">¥0.00</b><span id="">礼品卡支付订单</span><a href="javascript:for_99click()" class="ml-15" id="cancelGiftCard">取消使用</a></p><p id="cf_category_giftcard_detail" class="pay_detail" style="display: none;"><span id="categoryGiftCardBtnArea"><span id="giftCardInputTips">您可以使用礼品卡</span><input value="" class="input-w87 ver-m ml-10" style="_vertical-align:middle" maxlength="8" id="iptCategoryUseGiftCard" type="text"> 元<a href="javascript:for_99click()" class="btn btn-small-orange ml-20 mr-10 pos-r-1" id="submitCategoryGiftCard">使 用</a></span></p><p id="cf_select" class="pay_detail" style="display: none;"><span id="categoryGiftCardBtnArea">您可以使用<select id="giftCardType" name="giftCardType" class="input-w87 ml-5"></select><input value="" class="input-w87 ver-m ml-10" style="_vertical-align:middle" maxlength="8" id="giftCardTypeVal" type="text"> 元<a href="javascript:for_99click()" class="btn btn-small-orange ml-20 mr-10 pos-r-1" id="submitGiftCardType">使 用</a></span></p><div style="display: none;" class="pay_detail" id="giftCartActiveArea"><a href="javascript:for_99click()" id="activeNewGiftcard">激活新的礼品卡</a><p class="pt-5 color-orange"><br>使用礼品卡可能会产生手续费 <a href="http://help.dangdang.com/details/page24" class="ml-5" target="_top">详细说明</a></p></div><div id="cf_point_pay_title" class="pay_title"><a href="javascript:for_99click()" class="op" id="expandPoint">&nbsp;</a><span id="cf_point_title" class="title">积&nbsp;&nbsp;分</span><span id="usedPointSummary" style="display: none;">您当前使用<b class="color-red mlr-10">0</b>积分（<b class="color-red">¥0.00</b>）支付订单<a href="javascript:for_99click()" class="ml-15" id="cancelPoint">取消使用</a></span></div><p style="display: none;" id="cf_point_pay_detail" class="pay_detail">账户积分<b class="color-red mlr-10">0</b>可抵扣0元  <span style="display: none;" id="pointBtnArea">您本次可使用<input value="" class="input-w87 ver-m ml-10" style="_vertical-align:middle" maxlength="6" id="iptUsePoint" type="text"> 元<a href="javascript:for_99click()" class="btn btn-small-orange ml-20 mr-10 pos-r-1" id="submitPoint">使 用</a><i id="pointRateTip" class="question-mark"><em style="display: none;" class="ji-tips">每3000积分可抵1元，最小兑换0.1元，详情见“我的积分”中的说明。<i class="tips_arrow"></i></em></i></span></p><div id="cf_discount_code_title" class="pay_title"><a href="javascript:for_99click()" class="op" id="expandDiscountCode">&nbsp;</a><span class="title">优惠码</span><span id="usedDiscountCodeSummary" style="display: none;"><span>您当前使用优惠码总额减</span><b class="color-red mlr-10">¥0.00</b><a href="javascript:for_99click()" class="ml-15" id="cancelDiscountCode">取消使用</a></span></div><p style="display: none;" id="cf_discount_code_detail" class="pay_detail"><input value="" class="input-w178 ver-m" style="text-transform: uppercase;" maxlength="16" id="iptUseDiscountCode" type="text"><a href="javascript:for_99click()" class="btn btn-small-orange ml-20 mr-10 pos-r-1" id="submitDiscountCode">使用</a></p><div id="cf_coupon_title" class="pay_title"><a href="javascript:for_99click()" class="op" id="expandCoupon">&nbsp;</a><span id="wenan" class="title">礼&nbsp;&nbsp;券<font color="#FF2832">&nbsp;&nbsp;&nbsp;&nbsp;此订单暂无可用的礼券</font></span><span id="usedCouponSummary" style="display: none;">您当前使用礼券总额减<b class="color-red mlr-10">¥0.00</b><a href="javascript:for_99click()" class="ml-15" name="cancelCoupon">取消使用</a></span></div>    <div style="display: none;" id="coupon"><div id="couponc" class="pay_detail"><a href="http://newaccount.dangdang.com/payhistory/mycoupon.aspx" target="_top">查看我的礼券</a><a href="javascript:for_99click()" class="ml-10" id="showBindCoupon">激活新的礼券</a></div></div>    <div class="hide" id="couponReturn"><h4>返券明细</h4><ul id="couponReturnItems" class="return-ticket"></ul></div>                <div style="display: none;" id="submitCouponPopup" class="popup-wrap popup-normal hide">                    <div class="popup-title">                        <h3>温馨提示</h3>                        <a id="closeSubmitCoupon" class="btn-popup-close" href="javascript:void(0)"></a>                    </div>                    <div class="popup-cont">                        <p>使用礼券，礼品卡将会失效，同时支付金额将发生变化，您确定使用礼券吗？</p>                        <p class="btn-bar">                            <a id="submitCoupon" href="javascript:void(0)" class="btn btn-small-grey mr-10">确&nbsp;定</a>                            <a id="cancelSubmitCoupon" href="javascript:void(0)" class="btn btn-small-grey">取&nbsp;消</a>                        </p>                    </div>                </div>                <div id="bindCouponPopup" class="popup-wrap popup-normal popup-wrap-w258 hide" style="top: 300px; display: none;">                    <div class="popup-title clearfix">                        <h3>                            激活新礼券</h3>                        <a id="closeBindCoupon" class="btn-popup-close" href="javascript:void(0)"></a>                    </div>                    <div class="popup-cont" style="height: 105px;">                        <p style="margin: 5px 0px 10px;">                            <label class="label-w40" for="">                                卡号：</label><input value="" id="couponUserName" class="input-w172" type="text">                            <span id="couponCardError"></span>                        </p>                        <p class="mt-10">                            <label class="label-w40" for="">                                密码：</label><input id="couponPassword" class="input-w172" type="password">                            <span id="couponPwdError"></span>                        </p>                        <p class="btn-bar btn-bar-left mt-10">                            <a id="bindCoupon" href="javascript:void(0)" class="btn btn-small-grey" style="margin-left: 5px;">激&nbsp;活</a>                            <span id="couponBindErrorWrap" class="hide">                                   <span class="icon icon-warn"></span><span id="couponBindError"></span>                            </span>                        </p>                    </div>                </div>            <div id="bindGiftcard" style="position: absolute; z-index: 10000; display: none;"><div class="popup-wrap popup-normal popup-wrap-w258" style="left: 10px; top: -10px;">  <div class="popup-title clearfix">      <h3>激活新礼品卡</h3>      <a id="closeBindGiftCard" class="btn-popup-close" href="javascript:for_99click();"></a> </div>  <div class="popup-cont">      <p><label class="label-w40">卡号：</label><input value="" id="iptGiftCardNum" class="input-w172" maxlength="20" type="text"></p>      <p class="mt-10"><label class="label-w40">密码：</label><input id="iptGiftCardPassword" class="input-w172" maxlength="20" type="password"></p>      <p class="btn-bar-left mt-10">         <label for="" class="label-w40"></label>         <a id="btnBindGiftCard" href="javascript:for_99click();" class="btn btn-small-grey" style="margin-left: -3px;">激&nbsp;活</a>      </p>  </div></div></div></div>
                <div id="div_summary" class="col-r">             	<div class="price-detail">                 	<ul>                 	  <li id="div_product_total">                 	    <p><span class="span-w160">商品金额：</span><span>¥15.00</span></p>                 	  </li>                 	  <li class="hide" id="div_deposit_total">                 	    <p><span class="span-w160">定金合计：</span><span>¥0.00</span></p>                 	  </li>                 	  <li class="hide" id="div_final_payment_total">                 	    <p><span class="span-w160">尾款合计：</span><span>¥0.00</span></p>                 	  </li>                     <li class="hide" id="total_privilege_code_discount_amount">	                    <p><span class="span-w160">已优惠：</span><span class="plus-minus">¥0.00</span></p>                 	  </li>                       <li class="hide" id="total_gift_package_price">	        <p><span class="span-w160">礼品包装(含贺卡)：</span><span class="plus-minus">¥0.00</span></p>                 	  </li>                 	                         <li class="hide" id="gift_package_price">	        <p><span class="span-w160">礼品包装：</span><span class="plus-minus">¥0.00</span></p>                 	  </li>                       <li class="hide" id="greetingcard_price">	        <p><span class="span-w160">贺卡费用：</span><span class="plus-minus">¥0.00</span></p>                 	  </li>                     <li class="hide" id="total_shipping_fee_real">                 	    <p><span class="span-w160">运费：</span><span>¥0.00</span><a href="javascript:for_99click();" id="shipping_fee_detail_link"><i id="shipping_fee_detail_icon" class="icon icon-adress-open"></i></a></p>                         <div style="display: none;" id="rep_shipping_fee_real"></div>                 	  </li>                     <li class="hide" id="total_overseas_tax_real">                 	    <p><span class="span-w160"><span id="oversea_icon_free" class="icon_event"><img src="icon_free.png"></span>税费：</span><span id="order_flow_overseas_tax">¥0.00</span><a href="javascript:for_99click();" id="overseas_tax_detail_link"><i id="overseas_tax_detail_icon" class="icon icon-adress-open"></i></a></p>                         <div style="display: none;" id="rep_overseas_tax_real"></div>                 	  </li>                       <li class="hide" id="total_energy_saving_subsiby_amout">	        <p><span class="span-w160">节能补贴：</span><span>-¥0</span></p>                 	  </li>                       <li class="hide" id="total_promo_amount_real">                 	    <p><span class="span-w160">促销：</span><span>-¥0.00</span><a href="javascript:for_99click();" id="promo_detail_link"><i id="promo_detail_icon" class="icon icon-adress-close"></i></a></p>                         <div class="hide" id="rep_collection_promotion"></div>                         <div id="rep_order_promotion" style="display: none;"></div>                 	   </li>                       <li class="hide" id="total_giftcard_real">                 	    <p><span class="span-w160">礼品卡：</span><span>-¥0.00</span><a href="javascript:for_99click();" id="giftcard_detail_link"><i id="giftcard_detail_icon" class="icon icon-adress-close"></i></a></p>                         <div id="rep_dangdang_money"></div>                 	  </li>        <li class="hide" id="total_gift_card_charge">	        <p><span class="span-w160">礼品卡手续费：</span><span>¥0.00</span></p>	    </li>                       <li class="hide" id="total_coupon_real">                 	    <p><span class="span-w160">礼券：</span><span>-¥0.00</span><a href="javascript:for_99click();" id="coupon_detail_link"><i id="coupon_detail_icon" class="icon icon-adress-close"></i></a></p>                         <p id="coupon_money_real" class="p-child"><span class="span-w160">使用礼券：</span><span>-¥0.00</span></p>                 	  </li>                 	  <li class="hide" id="total_discount_code_real">                 	    <p><span class="span-w160">使用优惠码：</span><span>-¥0.00</span></p>                 	  </li>                       <li class="hide" id="total_cust_cash_real">	        <p><span class="span-w160">余额：</span><span>-¥0.00</span></p>                 	  </li>                    <li class="hide" id="total_cust_point_real">	        <p><span class="span-w160">积分支付：</span><span>-¥0.00</span></p>                 	  </li>                       <li>                 	    <p class="p-total"><span class="span-w160">*应付总额(含运费)：</span><span class="price-d f18">¥15.00</span></p>                 	  </li>                       <li style="display: none;" id="div_set_password"> <p class="mt-10"><span class="span-w160 color-grey">若使用余额或礼品卡，需 </span><a href="http://safe.dangdang.com/payment_pass.php" target="_top" onclick="showSetPaymentPasswordWindow()">设置支付密码</a></p></li>                       <li style="display: none;" id="div_pay_password"><p class="p-input"><label for="">支付密码：<input id="input_pay_password" class="input-w90" type="password"></label><a class="ml-5" target="_top" href="http://safe.dangdang.com/payment_pass.php?action=find">忘记密码</a></p></li>                       <li style="display: none;" id="div_yzm_word"><p class="p-input"><label for="">验证码：<input value="" id="ipt_yzm" class="input-w55" type="text"></label><a class="img ml-5"><img src="show_vcode.php" id="sign_img" style="height: 22px; width: 89px;" alt=""></a><a class="ml-5" id="btn_change_yzm" style="cursor:pointer">换张图片</a></p></li>                       <li class="hide" id="div_presale_mobile"><p class="p-input"><label for="">支付尾款时通知号码：<input value="" class="input-w87" maxlength="11" id="presale_mobile" type="text"></label></p></li>                       <li class="hide" id="div_agree_pay_deposit"><p class="p-agree p-input"><span class="color-grey"><input value="" id="agree_pay_deposit" type="checkbox">同意支付定金，取消订单定金不退</span></p></li>                       <li id="div_ck_protocol" style="display: none;"><p class="p-agree"><span class="span-w160 color-grey"><input value="" id="ck_protocol" checked="checked" type="checkbox">同意接受</span><a target="_top" href="http://support.dangdang.com/helpcenter/api_cms/helpcenter/question_sort/2238/180367.shtml">《当当交易条款》</a></p></li>                       <li>                      	<p class="btn-bar" id="order_submit_error_tips_bar" style="display: none;"><span class="help-inline help-inline-error mr-35"><span class="icon icon-warn"></span><span id="order_submit_error_tips"></span></span></p>                          <p class="btn-bar mt-20"><a style='background-color:orange' class="btn btn-super-orange" href="javascript:for_99click();" id="submit" name="submit">提交订单</a></p>                        </li>                 	</ul>                 </div></div>
            </div>
        </div>
        <div id="__zhongdianpin" style="display: none;">
        </div>
        <div id="search_tuijian_content" style="display: none;">
        </div>
        <div id="div_shadow">
        </div>
    </div>
    
    
<div id="footer">
<div class="footer">
	<div class="footer_nav_box">
		<div class="footer_copyright"><span>Copyright (C) 当当网 2004-2014, All Rights Reserved</span><a href="http://www.hd315.gov.cn/beian/view.asp?bianhao=010202001051000098" target="_top" class="footer_img" rel="nofollow"><img src="{{ asset('validate.gif') }}"></a><span><a href="http://www.miibeian.gov.cn/" target="_top" rel="nofollow">京ICP证041189号</a></span><span>出版物经营许可证&nbsp;新出发京批字第直0673号</span></div>
	</div>
</div>
</div>
    <div class="foot_tip_ad">广告</div>
    
<script src="js6/check_snbrowse.js" type="text/javascript"></script>
<script type="text/javascript">login_session.browsePageOperate();</script>
<script src="js6/utopia.js" type="text/javascript"></script>
<script type="text/javascript" src="js6/js_tracker.js"></script>
<script type="text/javascript" src="js6/jquery-1.4.2.min.js"></script>
 
	
    <div id="div_order_flow_submit"><form action="http://checkoutb.dangdang.com/checkout.aspx" id="order_flow_get_submit" method="get"><input id="grand_order_id" name="grand_order_id" type="hidden"><input id="pre_submit_count" name="pre_submit_count" type="hidden"><input id="order_type" name="order_type" type="hidden"></form></div>
    <div id="div_shippingfeepiece">
    </div>
	<div id="div_selfpickup">
    </div>
    <div class="box_loading" id="window_loading">
        <img src="window_loading.gif" alt="载入状态"><p>
            请稍候...
        </p>
    </div>
    <div id="div_distribution">
    </div>
    <div id="package_preview_dialog">
    </div>
    <div id="edit_consignee_dialog"></div>
    <div id="consignee_modify_notice_dialog"></div>
    <div id="degradation_notice_dialog"></div>
    <div id="spu_limit_dialog"></div>

    <script type="text/javascript">
    	setTimeout(
    			function asyncImg() {
    				var images = document.images;
    				if (images) {
    					for (var imgnum in images) {
    						var image = images[imgnum];
    						var name = Object.prototype.toString.call(image);
    						if(name != "[object HTMLImageElement]"){
    							continue;
    						}
    						if ((image.readyState == 'complete' || image.readyState == "loaded") || image.complete) {
    							// ok
    						} else {
    							var picsrc = image.src;
    							if (picsrc) {
    								image.src = "";
    							}
    						}
    					}
    				}
    			}, 2000);
	</script>
</body>
</html>
