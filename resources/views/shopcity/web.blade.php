<!DOCTYPE html>
@if($inf[0]->switch=='0')
<center><h1>网站维护中,敬请期待666</h1></center>
@else
<html>
<head>
<meta content="text/html; charset=UTF-8" http-equiv="Content-Type">

    
    
    
    <title>{{ $inf[0]->title }}</title>
<script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="index" src="{{ asset('jscss/index.js') }}"></script><script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="jquery" src="{{ asset('jscss/jquery.min.js') }}"></script><script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="underscore" src="{{ asset('jscss/underscore.min.js') }}"></script><script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="backbone" src="{{ asset('jscss/backbone.min.js') }}"></script><script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="lazyload" src="{{ asset('jscss/jquery.lazyload.min.js') }}"></script>
<link media="all" href="{{ asset('jscss/index.css') }}" type="text/css" rel="stylesheet">
</head>
<body>

<!-- 公共头 -->
 

<script type="text/javascript">
    eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('z(N 1v=="O"){l 1w=1;l Y="1x.1y";l Z=\'1z\';l 18={19:0,1A:"",C:8,1a:o(a){l b=k.19?"1B":"1C";l c="";P(l i=0;i<a.B*4;i++){c+=b.1b((a[i>>2]>>((i%4)*8+4))&1c)+b.1b((a[i>>2]>>((i%4)*8))&1c)}w c},1d:o(x,e){x[e>>5]|=1D<<((e)%32);x[(((e+1E)>>>9)<<4)+14]=e;l a=1F;l b=-1G;l c=-1H;l d=1I;P(l i=0;i<x.B;i+=16){l f=a;l g=b;l h=c;l j=d;a=k.p(a,b,c,d,x[i+0],7,-1J);d=k.p(d,a,b,c,x[i+1],12,-1K);c=k.p(c,d,a,b,x[i+2],17,1L);b=k.p(b,c,d,a,x[i+3],22,-1M);a=k.p(a,b,c,d,x[i+4],7,-1N);d=k.p(d,a,b,c,x[i+5],12,1O);c=k.p(c,d,a,b,x[i+6],17,-1P);b=k.p(b,c,d,a,x[i+7],22,-1Q);a=k.p(a,b,c,d,x[i+8],7,1R);d=k.p(d,a,b,c,x[i+9],12,-1S);c=k.p(c,d,a,b,x[i+10],17,-1T);b=k.p(b,c,d,a,x[i+11],22,-1U);a=k.p(a,b,c,d,x[i+12],7,1V);d=k.p(d,a,b,c,x[i+13],12,-1W);c=k.p(c,d,a,b,x[i+14],17,-1X);b=k.p(b,c,d,a,x[i+15],22,1Y);a=k.r(a,b,c,d,x[i+1],5,-1Z);d=k.r(d,a,b,c,x[i+6],9,-24);c=k.r(c,d,a,b,x[i+11],14,25);b=k.r(b,c,d,a,x[i+0],20,-26);a=k.r(a,b,c,d,x[i+5],5,-27);d=k.r(d,a,b,c,x[i+10],9,28);c=k.r(c,d,a,b,x[i+15],14,-29);b=k.r(b,c,d,a,x[i+4],20,-2a);a=k.r(a,b,c,d,x[i+9],5,2b);d=k.r(d,a,b,c,x[i+14],9,-2c);c=k.r(c,d,a,b,x[i+3],14,-2d);b=k.r(b,c,d,a,x[i+8],20,2e);a=k.r(a,b,c,d,x[i+13],5,-2f);d=k.r(d,a,b,c,x[i+2],9,-2g);c=k.r(c,d,a,b,x[i+7],14,2h);b=k.r(b,c,d,a,x[i+12],20,-2i);a=k.u(a,b,c,d,x[i+5],4,-2j);d=k.u(d,a,b,c,x[i+8],11,-2k);c=k.u(c,d,a,b,x[i+11],16,2l);b=k.u(b,c,d,a,x[i+14],23,-2m);a=k.u(a,b,c,d,x[i+1],4,-2n);d=k.u(d,a,b,c,x[i+4],11,2o);c=k.u(c,d,a,b,x[i+7],16,-2p);b=k.u(b,c,d,a,x[i+10],23,-2q);a=k.u(a,b,c,d,x[i+13],4,2r);d=k.u(d,a,b,c,x[i+0],11,-2s);c=k.u(c,d,a,b,x[i+3],16,-2t);b=k.u(b,c,d,a,x[i+6],23,2u);a=k.u(a,b,c,d,x[i+9],4,-2v);d=k.u(d,a,b,c,x[i+12],11,-2w);c=k.u(c,d,a,b,x[i+15],16,2x);b=k.u(b,c,d,a,x[i+2],23,-2y);a=k.v(a,b,c,d,x[i+0],6,-2z);d=k.v(d,a,b,c,x[i+7],10,2A);c=k.v(c,d,a,b,x[i+14],15,-2B);b=k.v(b,c,d,a,x[i+5],21,-2C);a=k.v(a,b,c,d,x[i+12],6,2D);d=k.v(d,a,b,c,x[i+3],10,-2E);c=k.v(c,d,a,b,x[i+10],15,-2F);b=k.v(b,c,d,a,x[i+1],21,-2G);a=k.v(a,b,c,d,x[i+8],6,2H);d=k.v(d,a,b,c,x[i+15],10,-2I);c=k.v(c,d,a,b,x[i+6],15,-2J);b=k.v(b,c,d,a,x[i+13],21,2K);a=k.v(a,b,c,d,x[i+4],6,-2L);d=k.v(d,a,b,c,x[i+11],10,-2M);c=k.v(c,d,a,b,x[i+2],15,2N);b=k.v(b,c,d,a,x[i+9],21,-2O);a=k.A(a,f);b=k.A(b,g);c=k.A(c,h);d=k.A(d,j)}w Q(a,b,c,d)},D:o(q,a,b,x,s,t){w k.A(k.1e(k.A(k.A(a,q),k.A(x,t)),s),b)},p:o(a,b,c,d,x,s,t){w k.D((b&c)|((~b)&d),a,b,x,s,t)},r:o(a,b,c,d,x,s,t){w k.D((b&d)|(c&(~d)),a,b,x,s,t)},u:o(a,b,c,d,x,s,t){w k.D(b^c^d,a,b,x,s,t)},v:o(a,b,c,d,x,s,t){w k.D(c^(b|(~d)),a,b,x,s,t)},1f:o(a){l b=Q();l c=(1<<k.C)-1;P(l i=0;i<a.B*k.C;i+=k.C)b[i>>5]|=(a.2P(i/k.C)&c)<<(i%32);w b},A:o(x,y){l a=(x&R)+(y&R);l b=(x>>16)+(y>>16)+(a>>16);w(b<<16)|(a&R)},1e:o(a,b){w(a<<b)|(a>>>(32-b))},1g:o(s){w k.1a(k.1d(k.1f(s),s.B*k.C))}};l T={1h:o(a){l b=U(a)+"=",L=E.F.1i(b),V=2Q;z(L>-1){l c=E.F.1i(";",L);z(c==-1){c=E.F.B}V=2R(E.F.2S(L+b.B,c))}w V},W:o(a,b,c,d,e,f){l g=U(a)+"="+U(b);z(c 2T G){g+="; 2U="+c.2V()}z(d){g+="; 2W="+d}z(e){g+="; 2X="+e}z(f){g+="; 2Y"}E.F=g},2Z:o(a,b,c,d){k.W(a,"",I G(0),b,c,d)}};l 1j={1k:o(){l n=I G();l y=n.30()+\'\';l m=n.31()+1;z(m<10)m="0"+m;l d=n.33();z(d<10)d="0"+d;l H=n.34();z(H<10)H="0"+H;l M=n.36();z(M<10)M="0"+M;l S=n.37();z(S<10)S="0"+S;l a="38"+n.39();a=a.X(a.B-3,3);l b=J.1l(1m+J.1n()*1o);l c=J.1l(1m+J.1n()*1o);l e=y+m+d+H+M+S+a+b+c+Z;l f=18.1g(e);f=k.1p(f);w y+m+d+H+M+S+a+f+b+c},1p:o(a){l b=3a(a.X(0,8),16);l c=3b(b).X(0,6);l d=c.B;z(d<6){c+=k.1q(\'0\',J.3c(6-d))}w c},1q:o(a,b){w I Q(b+1).3d(a)},1r:o(){l t=I G();w t.3e()},1s:o(){k.K=T.1h("1t");z(N k.K==\'O\'||!/^\\d{35}$/.3f(k.K)){l a=I G(3g,1,1);k.K=k.1k();T.W("1t",k.K,a,"/",Y)}z(N k.1u==\'O\'){k.1u=k.1r()}}};1j.1s()}',62,203,'||||||||||||||||||||this|var|||function|md5_ff||md5_gg|||md5_hh|md5_ii|return|||if|safe_add|length|chrsz|md5_cmn|document|cookie|Date||new|Math|permanent_id|cookieStart||typeof|undefined|for|Array|0xFFFF||CookieUtil|encodeURIComponent|cookieValue|set|substr|cookieDomain|_ddclick_hash_key|||||||||Md5Util|hexcase|binl2hex|charAt|0xF|core_md5|bit_rol|str2binl|hex_md5|get|indexOf|__ddclickFunctions|createPermanentID|floor|100000|random|900000|formatHashCode|str_repeat|initTime|init|__permanent_id|timestap|ddclick_page_tracker|ddclick_head_flag|dangdang|com|DDClick521|b64pad|0123456789ABCDEF|0123456789abcdef|0x80|64|1732584193|271733879|1732584194|271733878|680876936|389564586|606105819|1044525330|176418897|1200080426|1473231341|45705983|1770035416|1958414417|42063|1990404162|1804603682|40341101|1502002290|1236535329|165796510|||||1069501632|643717713|373897302|701558691|38016083|660478335|405537848|568446438|1019803690|187363961|1163531501|1444681467|51403784|1735328473|1926607734|378558|2022574463|1839030562|35309556|1530992060|1272893353|155497632|1094730640|681279174|358537222|722521979|76029189|640364487|421815835|530742520|995338651|198630844|1126891415|1416354905|57434055|1700485571|1894986606|1051523|2054922799|1873313359|30611744|1560198380|1309151649|145523070|1120210379|718787259|343485551|charCodeAt|null|decodeURIComponent|substring|instanceof|expires|toGMTString|path|domain|secure|unset|getFullYear|getMonth||getDate|getHours||getMinutes|getSeconds|00|getMilliseconds|parseInt|String|abs|join|getTime|test|2020'.split('|'),0,{}))
<!--CreateDate  2014-07-28 15:00:01--></script>

<script charset="gb2312" type="text/javascript">var width = 1; narrow = 0;</script>
<script type="text/javascript">var newsuggesturl = "http://schprompt.dangdang.com/suggest_new.php?";</script>
<script src="{{ asset('jscss/pagetop2015_0827.js') }}" charset="gb2312" type="text/javascript"></script>
<script src="{{ asset('jscss/dd.menu-aim.js') }}" charset="gb2312" type="text/javascript"></script>
<script src="{{ asset('jscss/jquery-1.8.3.min.js') }}" charset="gb2312" type="text/javascript"></script>
<script src="{{ asset('jscss/jquery-1.8.3.js') }}"></script>
<!-- 首页滚动图 -->
<!-- <script src="{{ asset('jscss/jquery-1.8.3.min.js') }}"></script> -->
 
<!--Luara js文件-->
<script src="{{ asset('jscss/jquery.luara.0.0.1.min.js') }}"></script>


<div id="hd">
<div id="tools">
<div class="tools">
    <div class="ddnewhead_operate" dd_name="顶链接">
        <div class="new_york"><a target="_top" href="http://static.dangdang.com/topic/2227/176801.shtml" title="当当网?纽约证券交易所上市企业">纽交所上市公司</a></div>
        <ul class="ddnewhead_operate_nav">
        <!-- <li class="ddnewhead_cart"><a href="javascript:AddToShoppingCart(0);" name="购物车" dd_name="购物车"><i class="icon_card"></i>购物车<b id="cart_items_count"></b></a></li> -->
        <li><a target="_blank" href="http://orderb.dangdang.com/myallorders.aspx" name="我的订单" dd_name="我的订单" rel="nofollow">我的订单<b id="unpaid_num" style="color:#ff2832;font:bold 12px Arial;"></b></a></li>
  <!-- <li><a target="_top" href="http://chuban.dangdang.com/" name="mydd_7" dd_name="当当自出版">当当自出版</a></li> -->
        <li class="dang_erweima">
          <a target="_top" href="http://t.dangdang.com/20130220_ydmr" id="a_phonechannel" onmouseover="showgaoji('a_phonechannel','__ddnav_sjdd');" onmouseout="hideotherchannel('a_phonechannel','__ddnav_sjdd');" class="menu_btn"><i class="icon_tel"></i>手机当当</a>
          
        </li>
        <li class="my_dd"><a class="menu_btn" target="_top" href="{{ url('/geren') }}" name="我的当当" dd_name="我的当当" id="a_myddchannel" onmouseover="showgaoji('a_myddchannel','__ddnav_mydd')" onmouseout="hideotherchannel('a_myddchannel','__ddnav_mydd');">个人中心</a>
            <ul class="ddnewhead_gcard_list" id="__ddnav_mydd" onmouseover="showgaoji('a_myddchannel','__ddnav_mydd')" onmouseout="hideotherchannel('a_myddchannel','__ddnav_mydd');">
                <li><a target="_top" href="http://point.dangdang.com/index.html?ref=my-0-L" name="mydd_4" dd_name="我的积分" rel="nofollow">我的积分</a></li>
                <li><a target="_top" href="http://wish.dangdang.com/wishlist/cust_wish_list.aspx?ref=my-0-L" name="mydd_1" dd_name="我的收藏" rel="nofollow">我的收藏</a></li>
                <!-- <li><a target="_top" href="http://newaccount.dangdang.com/payhistory/mybalance.aspx" name="mydd_5" dd_name="我的余额" rel="nofollow">我的余额</a></li> -->
                <li><a target="_top" href="http://comm.dangdang.com/review/reviewbuy.php?ref=my-0-L" name="mydd_4" dd_name="我的评论" rel="nofollow">我的评论</a></li>
                <!-- <li><a target="_top" href="http://newaccount.dangdang.com/payhistory/mycoupon.aspx" name="mydd_2" dd_name="礼券/礼品卡" rel="nofollow">礼券/礼品卡</a></li> -->
    <li><a target="_top" href="http://e.dangdang.com/ebook/listUserEbooks.do" name="mydd_6" dd_name="电子书架">电子书架</a></li>
            </ul>
        </li>
        <li><a class="menu_btn" href="javascript:void(0);" style="cursor: default;" name="qycg" dd_name="企业采购" id="a_qycgchannel" onmouseover="showgaoji('a_qycgchannel','__ddnav_qycg');" onmouseout="hideotherchannel('a_qycgchannel','__ddnav_qycg');">企业采购</a>
            <ul class="ddnewhead_gcard_list" id="__ddnav_qycg" onmouseover="showgaoji('a_qycgchannel','__ddnav_qycg');" onmouseout="hideotherchannel('a_qycgchannel','__ddnav_qycg');">
                <!-- <li><a target="_top" href="http://misc.dangdang.com/giftcardCompany/company.aspx" name="qycg_1" dd_name="大宗采购">大宗采购</a></li> -->
                <!-- <li><a target="_top" href="http://giftcard.dangdang.com/" name="qycg_2" dd_name="礼品卡采购">礼品卡采购</a></li> -->
                <!-- <li><a target="_top" href="http://account.dangdang.com/payhistory/mymoney.aspx" name="gqycg_3" dd_name="礼品卡激活" rel="nofollow">礼品卡激活</a></li> -->
                <!-- <li><a target="_top" href="http://help.dangdang.com/details/page24" name="qycg_4" dd_name="礼品卡使用">礼品卡使用</a></li> -->
            </ul>
        </li>
        <li class="hover "><a class="menu_btn" href="javascript:void(0);" style="cursor: default;" name="ddkf_0" dd_name="客户服务" id="a_bzzxchannel" onmouseover="showgaoji('a_bzzxchannel','__ddnav_bzzx');" onmouseout="hideotherchannel('a_bzzxchannel','__ddnav_bzzx');">客户服务</a>
            <ul class="ddnewhead_gcard_list" id="__ddnav_bzzx" onmouseover="showgaoji('a_bzzxchannel','__ddnav_bzzx');" onmouseout="hideotherchannel('a_bzzxchannel','__ddnav_bzzx');">
                <li><a target="_top" href="http://help.dangdang.com/index" name="ddkf_2" dd_name="帮助中心">帮助中心</a></li>
    <li><a target="_top" href="http://return.dangdang.com/reverseapplyselect.aspx" name="ddkf_3" dd_name="自助退换货">自助退换货</a></li>
                <li><a target="_top" href="http://help.dangdang.com/details/page206" name="ddkf_4" dd_name="联系客服">联系客服</a></li>
                <li><a target="_top" href="http://help.dangdang.com/email_contact" name="tsjy_1" dd_name="我要投诉" rel="nofollow">我要投诉</a></li>
                <li><a target="_top" href="http://help.dangdang.com/email_contact" name="tsjy_2" dd_name="意见建议" rel="nofollow">意见建议</a></li>
            </ul>
        </li>
        </ul>
        <div class="ddnewhead_welcome" display="block;">
 
            <span>

                @if(session('adminuser'))
                   <span id="nickname1"><span class="hi">Hi，<a href="infor" class="login_link" target="_blank"><b>{{ session('adminuser')->username }}</b></a><a href="logout" target="_self">[退出]</a></span></span>
                            
                @else
                    <span>
                     欢迎光临当当，请<a class="a1" href="{{ asset('/login')}}">登陆</a> <a class="a2" href="{{ asset('/sign') }}">免费注册</a>
                    </span>
                @endif 

            </span>
 <!--            <div class="tel_pop" style="display: none;" id="__ddnav_sjdd" onmouseover="showgaoji('a_phonechannel','__ddnav_sjdd');" onmouseout="hideotherchannel('a_phonechannel','__ddnav_sjdd');">
                <a target="_top" href="http://t.dangdang.com/20130220_ydmr" class="title"><i class="icon_tel"></i>手机当当</a><i class="title_shadow"></i>
                <ul class="tel_pop_box">
                    <li><a href="http://t.dangdang.com/20130220_ydmr" dd_name="手机二维码"><span>当当手机客户端</span><img src="{{ asset('jscss/erweima2.png') }}"><span class="text">随手查订单<br>随时享优惠</span></a></li>
                </ul>
            </div> -->
        </div>
        <div class="ddnewhead_area" style="display: none;">
            <!-- <a href="javascript:void(0);" id="area_one" class="ddnewhead_area_a" onmouseover="show_area_list();" onmouseout="hidden_area_list();">送至：<span id="curent_area">北京</span></a> -->
           
        </div>
        <div class="new_head_znx" id="znx_content" style="display: none;"></div>
    </div>
</div>
</div>
<div id="header_end"></div>
<!--CreateDate  2015-11-25 18:00:02--></div>
<form action="http://search.dangdang.com/search.aspx" id="bootpagetopSearch" name="bootpagetopSearch" method="GET"></form>
<!--<script type="text/javascript">var nick_num = 1;initHeaderOperate();</script>-->


    
 <!--二级导航开始-->
    <div class="public_child_nav" dd_name="导航浮层" style="display: none;">
        <div class="public_headerchildnav_module">
            <div class="childrennav">
                <div class="chuban" style="display: none;">
                    <div class="inner">
                        <a target="_top" href="http://e.dangdang.com/classification_list_page.html?category=WY1&amp;dimension=dd_sale&amp;order=0">文艺</a>|
                        <a target="_top" href="http://e.dangdang.com/classification_list_page.html?category=JG&amp;dimension=dd_sale&amp;order=0">经管</a>|
                        <a target="_top" href="http://e.dangdang.com/classification_list_page.html?category=SK&amp;dimension=dd_sale&amp;order=0">社科</a>|
                        <a target="_top" href="http://e.dangdang.com/classification_list_page.html?category=SH&amp;dimension=dd_sale&amp;order=0">生活</a>|
                        <a target="_top" href="http://e.dangdang.com/classification_list_page.html?category=JY&amp;dimension=dd_sale&amp;order=0">教育</a>|
                        <a target="_top" href="http://e.dangdang.com/classification_list_page.html?category=KJ&amp;dimension=dd_sale&amp;order=0">科技</a>|
                        <a target="_top" href="http://e.dangdang.com/classification_list_page.html?category=TS&amp;dimension=dd_sale&amp;order=0">童书</a>|
                        <a target="_top" href="http://e.dangdang.com/classification_list_page.html?category=JKS&amp;dimension=dd_sale&amp;order=0">进口书</a>|
                        <a target="_top" href="http://e.dangdang.com/classification_list_page.html?category=QKZZ&amp;dimension=dd_sale&amp;order=0">期刊杂志</a>
                    </div>
                </div>
                <div class="yuanchuang" style="display: none;">
                    <div class="inner">
                        <a href="http://e.dangdang.com/original_index_page.html?originalSex=man" class="boy" id="publicChildMan"><i class="on"></i>男频</a>|
                        <a href="http://e.dangdang.com/original_index_page.html?originalSex=woman" class="girl" id="publicChildWoman"><i></i>女频</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
<!--二级导航结束-->


<!-- 头部开始 -->
    <div class="public_headersearch_module" dd_name="头部搜索">
    <div class="clearfix">
        <a href="http://www.dangdang.com/" class="logo">
            <img src="{{ asset('jscss/logo.jpg') }}">
        </a>
        <div class="search">
            <input value="作品、作者、出版社" class="searchtext" type="text">
            <span type="button" value="提交" class="searchbtn"></span>
        </div>
        <ul class="header_fun clearfix">
            <li class="header_cart">
                    <a href="javascript:AddToShoppingCart(0);" name="购物车" dd_name="购物车">
                        <i class="icon"></i>
                        购物车
                        <b id="cart_items_count">0</b>
                    </a>
            </li>
            <li class="header_order">
                <a href="javascript:void(0)" id="headerMyOrder">
                    <i class="icon"></i>
                    我的订单
                </a>
            </li>
            <li class="header_my">
                <a href="javascript:void(0)" id="readingCenterBtn">
                    <i class="icon"></i>
                    阅读中心
                </a>
            </li>
        </ul>
    </div>
</div>
<!-- 头部结束 -->
<script type="text/javascript">var nick_num = 1;initHeaderOperate();</script><script type="text/javascript" src="queryunpaid"></script>
    <!-- 导航开始 -->
    <div class="public_headernav_module padding_top_30" dd_name="头部导航">
        <div class="public_headernav_module">
            <div class="nav">
               <ul>
         <li class="on"><a href="{{ url('/home') }}" class="on">首页</a></li>
         <!-- <li class="chubannav"><a href="http://e.dangdang.com/publish_index_page.html">出版</a></li> -->
             <!-- <li class="yuanchuangnav"><a href="http://e.dangdang.com/new_original_index_page.html">网络文学</a></li> -->
        <!-- <li><a target="_top" href="http://t.dangdang.com/20140107_5pz1">手机看书</a></li> -->
                <!-- <li class="for_hot_nav"><a target="_top" href="http://product.dangdang.com/60631085.html">当当阅读器</a><img src="hot_nav.png" alt="" class="hot_logo"></li> -->
        <li class="want_to_recharge"><a href="{{ url('/payfor') }}" target="_top">我要充值</a></li>
        <!-- <li class="writer_sys"><a href="http://dpp.dangdang.com/" target="_top">作者后台</a></li> -->
        </ul>
            </div>
        </div>
    </div>
    <!-- 导航结束 -->

    <!-- 首页分类 + 轮播图 -->
    <div class="index_class_focus padding_top_10">
        <div class="index_class_wrap">
            <div class="index_class_module" dd_name="图书分类">
                <dl>
                    <dt>图书分类</dt>
                    <dd class=""><a target="_top" href="{{ url('childpage') }}" class="wy">文艺</a></dd>
                    <dd class="odd"><a target="_top" href="{{ url('childpage') }}" class="jg">经管</a></dd>
                    <dd class=""><a target="_top" href="{{ url('childpage') }}" class="sk">社科</a></dd>
                    <dd class="odd"><a target="_top" href="{{ url('childpage') }}" class="sh">生活</a></dd>
                    <dd class=""><a target="_top" href="{{ url('childpage') }}" class="jy">教育</a></dd>
                    <dd class="odd"><a target="_top" href="{{ url('childpage') }}" class="kj">科技</a></dd>
                    <dd class=""><a target="_top" href="{{ url('childpage') }}" class="ts">童书</a></dd>
                    <dd class="odd"><a target="_top" href="{{ url('childpage') }}" class="jks">进口书</a></dd>
                    <dd class=""><a target="_top" href="{{ url('childpage') }}" class="net">期刊杂志</a></dd>
                    <dd class="odd"><a target="_top" href="{{ url('childpage') }}" class="woman">网文女频</a></dd>
                    <dd class=""><a target="_top" href="{{ url('childpage') }}">网文男频</a></dd>
                </dl>

                
                <div class="class_hover_layer" style="display:none; top: 0px;">
                    <ul class="index_classtwo clearfix">
                                <li class="index_classtwocell_module">
                                    <p class="title"><a target="_top" href="http://e.dangdang.com/classification_list_page.html?category=XS2&amp;dimension=dd_sale&amp;order=0" class="XS2">小说</a></p>
                                    <div>
                                        <div class="cover">
                                            <a target="_top" href="http://e.dangdang.com/classification_list_page.html?category=XS2&amp;dimension=dd_sale&amp;order=0" class="XS2">
                                                <img class="one" onerror="this.src='{{asset('jscss/book_def_74_105.png')}}'" src="{{ asset('jscss/catetory_ddds-dzs-wy1-xs2.jpg') }}" data-src="http://e.dangdang.com/media/images/column/catetory_DDDS-DZS-WY1-XS2.jpg" data-status="0">
                                                <img class="two" onerror="this.src='{{asset('jscss/book_def_74_105.png')}}'" src="{{ asset('jscss/catetory_ddds-dzs-wy1-xs22.jpg') }}" data-src="http://e.dangdang.com/media/images/column/catetory_DDDS-DZS-WY1-XS22.jpg" data-status="0">
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li class="index_classtwocell_module">
                                    <p class="title"><a target="_top" href="http://e.dangdang.com/classification_list_page.html?category=WX&amp;dimension=dd_sale&amp;order=0" class="WX">文学</a></p>
                                    <div>
                                        <div class="cover">
                                            <a target="_top" href="http://e.dangdang.com/classification_list_page.html?category=WX&amp;dimension=dd_sale&amp;order=0" class="WX">
                                                <img class="one" onerror="this.src='{{asset('jscss/book_def_74_105.png')}}'" src="{{ asset('jscss/catetory_ddds-dzs-wy1-wx.jpg') }}" data-src="http://e.dangdang.com/media/images/column/catetory_DDDS-DZS-WY1-WX.jpg" data-status="0">
                                                <img class="two" onerror="this.src='{{asset('jscss/book_def_74_105.png')}}'" src="{{ asset('jscss/catetory_ddds-dzs-wy1-wx2.jpg') }}" data-src="http://e.dangdang.com/media/images/column/catetory_DDDS-DZS-WY1-WX2.jpg" data-status="0">
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li class="index_classtwocell_module">
                                    <p class="title"><a target="_top" href="http://e.dangdang.com/classification_list_page.html?category=QCWX&amp;dimension=dd_sale&amp;order=0" class="QCWX">青春文学</a></p>
                                    <div>
                                        <div class="cover">
                                            <a target="_top" href="http://e.dangdang.com/classification_list_page.html?category=QCWX&amp;dimension=dd_sale&amp;order=0" class="QCWX">
                                                <img class="one" onerror="this.src='{{asset('jscss/book_def_74_105.png')}}'" src="{{ asset('jscss/catetory_ddds-dzs-wy1-qcwx.jpg') }}" data-src="http://e.dangdang.com/media/images/column/catetory_DDDS-DZS-WY1-QCWX.jpg" data-status="0">
                                                <img class="two" onerror="this.src='{{asset('jscss/book_def_74_105.png')}}'" src="{{ asset('jscss/catetory_ddds-dzs-wy1-qcwx2.jpg') }}" data-src="http://e.dangdang.com/media/images/column/catetory_DDDS-DZS-WY1-QCWX2.jpg" data-status="0">
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li class="index_classtwocell_module">
                                    <p class="title"><a target="_top" href="http://e.dangdang.com/classification_list_page.html?category=DMYM&amp;dimension=dd_sale&amp;order=0" class="DMYM">动漫/幽默</a></p>
                                    <div>
                                        <div class="cover">
                                            <a target="_top" href="http://e.dangdang.com/classification_list_page.html?category=DMYM&amp;dimension=dd_sale&amp;order=0" class="DMYM">
                                                <img class="one" onerror="this.src='{{asset('jscss/book_def_74_105.png')}}'" src="{{ asset('jscss/catetory_ddds-dzs-wy1-dmym.jpg') }} " data-src="http://e.dangdang.com/media/images/column/catetory_DDDS-DZS-WY1-DMYM.jpg" data-status="0">
                                                <img class="two" onerror="this.src='{{asset('jscss/book_def_74_105.png')}}'" src="{{ asset('jscss/catetory_ddds-dzs-wy1-dmym2.jpg') }}" data-src="http://e.dangdang.com/media/images/column/catetory_DDDS-DZS-WY1-DMYM2.jpg" data-status="0">
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li class="index_classtwocell_module">
                                    <p class="title"><a target="_top" href="http://e.dangdang.com/classification_list_page.html?category=YS&amp;dimension=dd_sale&amp;order=0" class="YS">艺术</a></p>
                                    <div>
                                        <div class="cover">
                                            <a target="_top" href="http://e.dangdang.com/classification_list_page.html?category=YS&amp;dimension=dd_sale&amp;order=0" class="YS">
                                                <img class="one" onerror="this.src='{{asset('jscss/book_def_74_105.png')}}'" src="{{ asset('jscss/catetory_ddds-dzs-wy1-ys.jpg') }}" data-src="http://e.dangdang.com/media/images/column/catetory_DDDS-DZS-WY1-YS.jpg" data-status="0">
                                                <img class="two" onerror="this.src='{{asset('jscss/book_def_74_105.png')}}'" src="{{ asset('jscss/catetory_ddds-dzs-wy1-ys2.jpg') }}" data-src="http://e.dangdang.com/media/images/column/catetory_DDDS-DZS-WY1-YS2.jpg" data-status="0">
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li class="index_classtwocell_module">
                                    <p class="title"><a target="_top" href="http://e.dangdang.com/classification_list_page.html?category=ZJ&amp;dimension=dd_sale&amp;order=0" class="ZJ">传记</a></p>
                                    <div>
                                        <div class="cover">
                                            <a target="_top" href="http://e.dangdang.com/classification_list_page.html?category=ZJ&amp;dimension=dd_sale&amp;order=0" class="ZJ">
                                                <img class="one" onerror="this.src='{{asset('jscss/book_def_74_105.png')}}'" src="{{ asset('jscss/catetory_ddds-dzs-sk-zj.jpg') }}" data-src="http://e.dangdang.com/media/images/column/catetory_DDDS-DZS-SK-ZJ.jpg" data-status="0">
                                                <img class="two" onerror="this.src='{{asset('jscss/book_def_74_105.png')}}'" src="{{ asset('jscss/catetory_ddds-dzs-sk-zj2.jpg') }}" data-src="http://e.dangdang.com/media/images/column/catetory_DDDS-DZS-SK-ZJ2.jpg" data-status="0">
                                            </a>
                                        </div>
                                    </div>
                                </li>
                    </ul>
                </div>  
 

            </div>

            <script type="text/javascript">
                //获取选项卡中节点
               $('dl dd').mouseover(function(){
                    if($(this).attr('class') == 'odd'){
                        // alert(11);
                        $(this).removeClass('odd');
                        
                    }    
                    $('.class_hover_layer').attr("style","display:block");
                }).mouseout(function(){
                    // alert(22);
                    $('dl dd:odd').addClass('odd');
                    $('.class_hover_layer').attr("style","display:none");
                })
            </script>

            <div class="index_focusone_module" dd_name="轮播图" style="width: 998px; height: 420px; overflow: hidden;">
                <ul style="position: relative; left: -400%; width: 800%; height: 420px;">
                <!--
                            <li><a target="_blank" href="./special_page.html?stId="><img src="http://img63.ddimg.cn/upload_img/00646/ljg/xcj998-420.jpg" /></a></li>
                -->
               <li style="float: left; width: 998px;"><a target="_top" href="http://book.dangdang.com/20160923_aemn" "=""><img src="{{ asset('jscss/1.jpg') }}"></a></li>
                <!--
                            <li><a target="_blank" href="./special_page.html?stId="><img src="http://img63.ddimg.cn/ddreader/yuanchuang/yueduqi998-420guoqing.jpg" /></a></li>
                -->
               <li style="float: left; width: 998px;"><a target="_top" href="http://product.dangdang.com/60631086.html" "=""><img src="{{ asset('jscss/2.jpg') }}"></a></li>
                <!--
                            <li><a target="_blank" href="./special_page.html?stId=1405"><img src="http://img60.ddimg.cn/upload_img/00646/ljg/motie923a998X420.jpg" /></a></li>
                -->
                 <li style="float: left; width: 998px;"><a target="_top" href="http://e.dangdang.com/special_page.html?stId=1405"><img src="{{ asset('jscss/3.jpg') }}"></a></li>
                <!--
                            <li><a target="_blank" href="./special_page.html?stId=1425"><img src="http://img62.ddimg.cn/ddreader/ls2016/201609/0924dk998-420.jpg" /></a></li>
                -->
                 <li style="float: left; width: 998px;"><a target="_top" href="http://e.dangdang.com/special_page.html?stId=1425"><img src="{{ asset('jscss/4.jpg') }}"></a></li>
                <!--
                            <li><a target="_blank" href="./special_page.html?stId=1413"><img src="http://img63.ddimg.cn/upload_img/00480/ydq/changjiahigh998-420.jpg" /></a></li>
                -->
                 <li style="float: left; width: 998px;"><a target="_top" href="http://e.dangdang.com/special_page.html?stId=1413"><img src="{{ asset('jscss/5.jpg') }}"></a></li>
                <!--
                            <li><a target="_blank" href="./special_page.html?stId=1412"><img src="http://img62.ddimg.cn/upload_img/00646/ljg/lishihenkaopu998-420.jpg" /></a></li>
                -->
                 <li style="float: left; width: 998px;"><a target="_top" href="http://e.dangdang.com/special_page.html?stId=1412"><img src="{{ asset('jscss/6.jpg') }}"></a></li>
                <!--
                            <li><a target="_blank" href="./special_page.html?stId=1402"><img src="http://img60.ddimg.cn/upload_img/00480/ydq/0920jinqiu998-420.jpg" /></a></li>
                -->
                 <li style="float: left; width: 998px;"><a target="_top" href="http://e.dangdang.com/special_page.html?stId=1402"><img src="{{ asset('jscss/7.jpg') }}"></a></li>
                <!--
                            <li><a target="_blank" href="./special_page.html?stId=1433"><img src="http://img62.ddimg.cn/ddreader/ls2016/201609/0927cn998x420.jpg" /></a></li>
                -->
                 <!-- <li style="float: left; width: 998px;"><a target="_top" href="http://e.dangdang.com/special_page.html?stId=1433"><img src="0927cn998x420.jpg"></a></li> -->
                </ul>
                <ol class="dots" style="position: absolute; margin-left: -128px;">
                    <li class="dot"></li>
                    <li class="dot"></li>
                    <li class="dot"></li>
                    <li class="dot"></li>
                    <li class="dot active"></li>
                    <li class="dot"></li>
                    <li class="dot"></li>
                    <li class="dot"></li>
                </ol>
            </div>
        </div>
    </div>
        <script>
            $(function(){
                <!--调用Luara示例-->

                $(".index_focusone_module").luara({width:"998",height:"420",interval:3000,selected:"seleted",deriction:"left"});


             });
        </script>

    <!-- 首页各个模块 -->
    <div class="index_content padding_top_10">
        <!-- 左右 -->
        <div class="clearfix">
            <div class="index_content_left">

            </div>
            <!-- 新增榜单-->            
        </div>
        <!-- 首页大广告1 -->
        <div class="index_pdf_story padding_top_30 index_bang_story floor_level" dd_name="pc专享">
            <div class="index_subnav_module" id="pdf_nav_bar">
                <ul class="nav clearfix">
                    @foreach($list[0] as $list6)
                    <li class="class on" class_id="{{ $list6->id }}">
                        <a href="javascript:{{ $list6->id }};">
                            {{ $list6->name }}
                        </a>
                    </li>
                    @endforeach
                    
                </ul>
                <!-- <div class="bar" style="width: 92px;"></div> -->                
            </div>
            <div class="content clearfix" style="display: block;">
                    @foreach($list[1] as $list)
                    <div class="index_smallcell_module">
                        <div class="book clearfix">
                            <div class="bookcover">
                                <a target="_top" href="{{ url('/shu') }}/{{$list->id}}">
                                        <img src="{{ asset('jscss/xsq.png') }}" alt="限时抢" class="promotion_label">
                                <img src="{{ $list->pic }}" data-original="http://img60.ddimg.cn/digital/product/2/93/1900430293_ii_cover.jpg?version=48c195b5-b9e7-4010-8068-ce0e2b7f3777" onerror="this.src='img/book_def_180_260.png'"></a>
                            </div>
                          
                            <div class="bookinfo">
                                <div class="title"><a target="_top" href="http://e.dangdang.com/product/1900430293.html" title="微微一笑很倾城">{{ $list->bookname }}</a></div>
                                <div class="author">{{ $list->author }}</div>
                                <div class="startie">
                                    <div class="star">
                                                     <span class="has"></span><span class="has"></span><span class="has"></span><span class="has"></span><span class="has"></span>
                                    </div>
                                    <div class="tienum">
                                        (637)
                                    </div>
                                </div>
                                <div class="price">
                                        <span class="now"><i class="">¥0.99</i></span>|
                                        <span>￥2.00</span>
                                </div>
                                <div class="des">
                                    如果你“惨”遭抛弃后，忽然有个很强很拽很不可一世的男人向你求婚，你怎么反应？ 　　贝微微同学的反应是：“大神……你被盗号了么＝　＝” 　　这个世界也太不真实了吧！ 　　前脚“前夫”才“移情别恋”娶了第一美女，后脚就有第一高手来求婚？还说要给一个更盛大的婚礼？名校计算机系的系花贝微微一边囧着，一边……飞快地嫁了。 　　如果一个被无数人仰望的传奇人物、名校顶尖牛人，第一次见面就反问你，“我们什么时候不是那种关系了”，你会怎么反应？ 　　那人出身世家，运动全能，外表风雅，气质清华，举止从容，本质……土匪……还傲慢得要死要活…… 　　这这这样的男人……忽然送上门…… 　　贝微微抵抗无力，只能被他拖着拽着往前走了……
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    @endforeach                   
            </div>
        </div>
            
            <script type="text/javascript">
                //获取选项卡中节点

                $('#pdf_nav_bar ul li').on('click',
                    function ()
                    {
                        $('#pdf_nav_bar ul li').removeClass('class on');
                        $(this).addClass('class on');
                        // alert('1111');
                        var dd_id = $(this).attr('class_id');
                        alert();
                        $.ajax({
                            url:"search?id="+$(this).attr('dd_id'),
                            type:"get",
                            dataType:"html",
                            success:function(data){
                                alert("data");
                            }
                        })

                    });

            </script>       
    
        <div class="index_story index_hot_bar floor_level" dd_name="热门书吧">
            <div class="index_pindao_title">
                <div class="index_subnav_module">

                    <ul class="nav clearfix">
                        <li class="first on only_one"><a href="javascript:;">热门书吧</a></li>
                    </ul>
                    <div class="bar"></div>
                    <ul class="more">
                        <li><a href="##"></a></li>
                    </ul>
                </div>
            </div>

            <div class="index_hotbar_wrap">
                <div class="index_hotbar_inner_wrap">
                    <div class="index_hotbar_inner clearfix">
                                
                                <div class="index_hotbar_module">
                                    <div class="pic"><a href="http://e.dangdang.com/bar_detail_page.html?barId=2241748" target="_top"><img src="{{ asset('jscss/bdecab0aefb14dce81cd33d2124d8806_d.jpg') }}"></a></div>
                                    <div class="mes">
                                        <p class="title"><a href="http://e.dangdang.com/bar_detail_page.html?barId=2241748" target="_top">小麻雀的春天</a></p>
                                        <p class="des">&nbsp;&nbsp;&nbsp;&nbsp;谢华良编著的《小麻雀的春天》是中国儿童文学名家名作典藏书系之一，《小麻雀的春天》讲述了：他们是国内儿童文学创作的</p>
                                        <p class="dingyue"><a href="http://e.dangdang.com/bar_detail_page.html?barId=2241748" class="go_to_reading_btn" target="_top"><strong>+</strong>进入吧</a></p>
                                    </div>
                                </div>
 
                                <div class="index_hotbar_module">
                                    <div class="pic"><a href="http://e.dangdang.com/bar_detail_page.html?barId=37930" target="_top"><img src="{{ asset('jscss/2e9bf3fc33094aa4941c7b3065fe7a0d_d.jpg') }}"></a></div>
                                    <div class="mes">
                                        <p class="title"><a href="http://e.dangdang.com/bar_detail_page.html?barId=37930" target="_top">活着</a></p>
                                        <p class="des">人是为活着本身而活着的，而不是为活着之外的任何事物所活着。</p>
                                        <p class="dingyue"><a href="http://e.dangdang.com/bar_detail_page.html?barId=37930" class="go_to_reading_btn" target="_top"><strong>+</strong>进入吧</a></p>
                                    </div>
                                </div>
                                <div class="index_hotbar_module">
                                    <div class="pic"><a href="http://e.dangdang.com/bar_detail_page.html?barId=84210" target="_top"><img src="{{ asset('jscss/243d584c6b9d4c1aae4c31c2338a2fbc_d.jpg') }}"></a></div>
                                    <div class="mes">
                                        <p class="title"><a href="http://e.dangdang.com/bar_detail_page.html?barId=84210" target="_top">跟任何人都聊得来</a></p>
                                        <p class="des">在人生的道路上，当你的希望一个个落空的时候，你也要坚定，要沉着。</p>
                                        <p class="dingyue"><a href="http://e.dangdang.com/bar_detail_page.html?barId=84210" class="go_to_reading_btn" target="_top"><strong>+</strong>进入吧</a></p>
                                    </div>
                                </div>
                                <div class="index_hotbar_module">
                                    <div class="pic"><a href="http://e.dangdang.com/bar_detail_page.html?barId=930193" target="_top"><img src="{{ asset('jscss/ce55ac45603d4fb1a4916c66d754b60e_d.jpg') }}"></a></div>
                                    <div class="mes">
                                        <p class="title"><a href="http://e.dangdang.com/bar_detail_page.html?barId=930193" target="_top">六相全功</a></p>
                                        <p class="des">孕妇跳水自杀，上游却漂下一具男尸，诡异相合，更在清明之夜产下一个婴儿，婴儿生来邪性，被称作鬼婴，先有怨母鸟来抢，后有尸祖</p>
                                        <p class="dingyue"><a href="http://e.dangdang.com/bar_detail_page.html?barId=930193" class="go_to_reading_btn" target="_top"><strong>+</strong>进入吧</a></p>
                                    </div>
                                </div>
                                <div class="index_hotbar_module">
                                    <div class="pic"><a href="http://e.dangdang.com/bar_detail_page.html?barId=83268" target="_top"><img src="{{ asset('jscss/efd15f039f6b474caa4736ad6396b2e4_d.jpg') }}"></a></div>
                                    <div class="mes">
                                        <p class="title"><a href="http://e.dangdang.com/bar_detail_page.html?barId=83268" target="_top">幸存者</a></p>
                                        <p class="des">在人生的道路上，当你的希望一个个落空的时候，你也要坚定，要沉着。</p>
                                        <p class="dingyue"><a href="http://e.dangdang.com/bar_detail_page.html?barId=83268" class="go_to_reading_btn" target="_top"><strong>+</strong>进入吧</a></p>
                                    </div>
                                </div>
                                <div class="index_hotbar_module">
                                    <div class="pic"><a href="http://e.dangdang.com/bar_detail_page.html?barId=2272666" target="_top"><img src="{{ asset('jscss/6c0f22b9ef3741e7b1964469ff5d9710_d.jpg') }}"></a></div>
                                    <div class="mes">
                                        <p class="title"><a href="http://e.dangdang.com/bar_detail_page.html?barId=2272666" target="_top">摆渡人</a></p>
                                        <p class="des">每个人注定都会有自己的摆渡人，但是在这之前我们都要等待、努力成长，才会遇到命中注定的那个摆渡人。</p>
                                        <p class="dingyue"><a href="http://e.dangdang.com/bar_detail_page.html?barId=2272666" class="go_to_reading_btn" target="_top"><strong>+</strong>进入吧</a></p>
                                    </div>
                                </div>                               
                                
                    </div>


                </div>
            </div>
        </div>
        <!-- 热门书吧 end -->
    </div>
    <!-- 右侧快捷功能按钮 start -->
    <div class="returntop">
        <div class="public_sideecode_module" dd_name="右侧二维码">
            <div class="wrap">
                <a href="javascript:;" class="sao"><span class="ma"><i></i><img src="{{ asset('jscss/erweima.png') }}"></span></a>
                <span class="close"></span>
            </div>
        </div>
        <div class="public_totop_module" dd_name="右侧返回顶部" style="display: none;"></div>
    </div>
    <!-- 右侧快捷功能按钮 end -->
    <!-- 左侧楼层按钮 start-->
    <!-- <div class="go_to_floor" style="display: none;">
        <ul class="floor_nav">
            <li><a href="javascript:;" class="floor_num">1F</a><a href="javascript:;" class="floor_title">新书</a></li>
            <li><a href="javascript:;" class="floor_num">2F</a><a href="javascript:;" class="floor_title">特价</a></li>
            <li><a href="javascript:;" class="floor_num">3F</a><a href="javascript:;" class="floor_title">榜单</a></li>
            <li><a href="javascript:;" class="floor_num">4F</a><a href="javascript:;" class="floor_title">借阅</a></li>
            <li><a href="javascript:;" class="floor_num">5F</a><a href="javascript:;" class="floor_title">推荐</a></li>
            <li><a href="javascript:;" class="floor_num">6F</a><a href="javascript:;" class="floor_title">网文</a></li>
            <li><a href="javascript:;" class="floor_num">7F</a><a href="javascript:;" class="floor_title">频道</a></li>
            <li><a href="javascript:;" class="floor_num">8F</a><a href="javascript:;" class="floor_title">书吧</a></li>
        </ul>
    </div> -->
    <!-- 左侧楼层按钮 end-->

    <!-- 公共脚 -->
<!-- 页尾begin -->
        <div class="public_footerfun_module">
        
    <div class="inner clearfix">
        <ul>
            <li class="func focusOn clearfix">
                <div class="left">
                    <img src="{{ asset('jscss/footer_share.jpg') }}" alt="" class="icon">
                </div>
                <div class="right">
                    <p class="title">关注我们</p>
                    <p class="desc">最受欢迎的阅读产品</p>
                    <p class="subtitle">关注我们：</p>
                    <ul class="share_link">
                        <li id="footerWeiboShare"><a href="http://weibo.com/dangdangread" target="_top"><i class="icon weibo"></i>新浪微博</a></li>
                        <li><a href="javascript:;"><i class="icon weixin"></i>官方微信<div class="ecode"><span class="arrow"></span><img src="{{ asset('jscss/footer_ecode.jpg') }}" alt=""></div></a></li>
                    </ul>
                </div>
            </li>
            <li class="func author clearfix">
                <div class="left">
                    <img src="{{ asset('jscss/footer_author.jpg') }}" alt="" class="icon">
                </div>
                <div class="right">
                    <p class="title"><a href="http://dpp.dangdang.com/" target="_top">作者后台</a></p>
                    <p class="desc">加入当当原创网，尊享作者</p>
                    <p class="subtitle">福利，成就网文大神</p>
                    <div class="btn"><a href="http://chuban.dangdang.com/" target="_top">我要写书<i></i></a></div>
                </div>
            </li>
            <li class="func about_us clearfix">
                <div class="left">
                    <img src="{{ asset('jscss/footer_us.jpg') }}" alt="" class="icon">
                </div>
                <div class="right">
                    <p class="title">关于我们</p>
                    <p class="desc">欢迎反馈宝贵意见给我们</p>
                    <p class="subtitle">客服书吧：当当读书5.0问答</p>
                    <div class="btn"><a href="http://e.dangdang.com/bar_detail_page.html?barId=2618070" target="_top">意见反馈<i></i></a></div>
                </div>
            </li>
        </ul>
    </div>

    </div>
    <div class="public_footermes_module">
        
    <div class="footer_copyright"><span>{{ $inf[0]->keyword }}</span></div>
    <div class="footer_copyright"><span><a href="http://www.miibeian.gov.cn/" target="_top" rel="nofollow">{{ $inf[0]->copyight }}</a></span><span class="sep">|</span><span></span></div>
    <div class="footer_copyright"><span>{{ $inf[0]->des }}</span></div>

    </div>
    <!-- 页尾end -->        <script type="text/javascript" src="{{ asset('jscss/js_tracker.js') }}"></script>
        <script type="text/javascript">
            var require = {urlArgs: "v=1447729249617"}
        </script>
        <script type="text/javascript" src="{{ asset('jscss/require.min.js') }}" data-main="./js/index"></script>
        <script>
            require.config({
                baseUrl: "./js",
                paths: {
                    "jquery": "../lib/jquery.min",
                    "underscore": "../lib/underscore.min",
                    "backbone": "../lib/backbone.min",
                    "lazyload":"../lib/jquery.lazyload.min"
                },
                shim:{
                    'lazyload': ['jquery']
                }
            });
        </script>

</div></body>
</html>
@endif 
