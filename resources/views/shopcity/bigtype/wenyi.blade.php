<!DOCTYPE html>
<html>
<head>
    <title>全部商品分类页</title>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta content="telephone=no" name="format-detection">
    <link media="all" href="{{ asset('css/index1.css') }}" type="text/css" rel="stylesheet">
     <!-- <script src="{{ asset('js/typejs/pagetop2015_0827.js') }}" charset="gb2312" type="text/javascript"></script> -->
    <!--<script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="classification_list" src="{{ asset('js/typejs/classification_list.js') }}"></script>-->
    <script src="{{ asset('jscss/jquery-1.8.3.js') }}"></script>
    <!--<script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="underscore" src="{{ asset('js/typejs/underscore.min.js') }}"></script>
    
</head>
<body class="original_index">
    <! 页头begin -->
    
<!--<script type="text/javascript">
    eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('z(N 1v=="O"){l 1w=1;l Y="1x.1y";l Z=\'1z\';l 18={19:0,1A:"",C:8,1a:o(a){l b=k.19?"1B":"1C";l c="";P(l i=0;i<a.B*4;i++){c+=b.1b((a[i>>2]>>((i%4)*8+4))&1c)+b.1b((a[i>>2]>>((i%4)*8))&1c)}w c},1d:o(x,e){x[e>>5]|=1D<<((e)%32);x[(((e+1E)>>>9)<<4)+14]=e;l a=1F;l b=-1G;l c=-1H;l d=1I;P(l i=0;i<x.B;i+=16){l f=a;l g=b;l h=c;l j=d;a=k.p(a,b,c,d,x[i+0],7,-1J);d=k.p(d,a,b,c,x[i+1],12,-1K);c=k.p(c,d,a,b,x[i+2],17,1L);b=k.p(b,c,d,a,x[i+3],22,-1M);a=k.p(a,b,c,d,x[i+4],7,-1N);d=k.p(d,a,b,c,x[i+5],12,1O);c=k.p(c,d,a,b,x[i+6],17,-1P);b=k.p(b,c,d,a,x[i+7],22,-1Q);a=k.p(a,b,c,d,x[i+8],7,1R);d=k.p(d,a,b,c,x[i+9],12,-1S);c=k.p(c,d,a,b,x[i+10],17,-1T);b=k.p(b,c,d,a,x[i+11],22,-1U);a=k.p(a,b,c,d,x[i+12],7,1V);d=k.p(d,a,b,c,x[i+13],12,-1W);c=k.p(c,d,a,b,x[i+14],17,-1X);b=k.p(b,c,d,a,x[i+15],22,1Y);a=k.r(a,b,c,d,x[i+1],5,-1Z);d=k.r(d,a,b,c,x[i+6],9,-24);c=k.r(c,d,a,b,x[i+11],14,25);b=k.r(b,c,d,a,x[i+0],20,-26);a=k.r(a,b,c,d,x[i+5],5,-27);d=k.r(d,a,b,c,x[i+10],9,28);c=k.r(c,d,a,b,x[i+15],14,-29);b=k.r(b,c,d,a,x[i+4],20,-2a);a=k.r(a,b,c,d,x[i+9],5,2b);d=k.r(d,a,b,c,x[i+14],9,-2c);c=k.r(c,d,a,b,x[i+3],14,-2d);b=k.r(b,c,d,a,x[i+8],20,2e);a=k.r(a,b,c,d,x[i+13],5,-2f);d=k.r(d,a,b,c,x[i+2],9,-2g);c=k.r(c,d,a,b,x[i+7],14,2h);b=k.r(b,c,d,a,x[i+12],20,-2i);a=k.u(a,b,c,d,x[i+5],4,-2j);d=k.u(d,a,b,c,x[i+8],11,-2k);c=k.u(c,d,a,b,x[i+11],16,2l);b=k.u(b,c,d,a,x[i+14],23,-2m);a=k.u(a,b,c,d,x[i+1],4,-2n);d=k.u(d,a,b,c,x[i+4],11,2o);c=k.u(c,d,a,b,x[i+7],16,-2p);b=k.u(b,c,d,a,x[i+10],23,-2q);a=k.u(a,b,c,d,x[i+13],4,2r);d=k.u(d,a,b,c,x[i+0],11,-2s);c=k.u(c,d,a,b,x[i+3],16,-2t);b=k.u(b,c,d,a,x[i+6],23,2u);a=k.u(a,b,c,d,x[i+9],4,-2v);d=k.u(d,a,b,c,x[i+12],11,-2w);c=k.u(c,d,a,b,x[i+15],16,2x);b=k.u(b,c,d,a,x[i+2],23,-2y);a=k.v(a,b,c,d,x[i+0],6,-2z);d=k.v(d,a,b,c,x[i+7],10,2A);c=k.v(c,d,a,b,x[i+14],15,-2B);b=k.v(b,c,d,a,x[i+5],21,-2C);a=k.v(a,b,c,d,x[i+12],6,2D);d=k.v(d,a,b,c,x[i+3],10,-2E);c=k.v(c,d,a,b,x[i+10],15,-2F);b=k.v(b,c,d,a,x[i+1],21,-2G);a=k.v(a,b,c,d,x[i+8],6,2H);d=k.v(d,a,b,c,x[i+15],10,-2I);c=k.v(c,d,a,b,x[i+6],15,-2J);b=k.v(b,c,d,a,x[i+13],21,2K);a=k.v(a,b,c,d,x[i+4],6,-2L);d=k.v(d,a,b,c,x[i+11],10,-2M);c=k.v(c,d,a,b,x[i+2],15,2N);b=k.v(b,c,d,a,x[i+9],21,-2O);a=k.A(a,f);b=k.A(b,g);c=k.A(c,h);d=k.A(d,j)}w Q(a,b,c,d)},D:o(q,a,b,x,s,t){w k.A(k.1e(k.A(k.A(a,q),k.A(x,t)),s),b)},p:o(a,b,c,d,x,s,t){w k.D((b&c)|((~b)&d),a,b,x,s,t)},r:o(a,b,c,d,x,s,t){w k.D((b&d)|(c&(~d)),a,b,x,s,t)},u:o(a,b,c,d,x,s,t){w k.D(b^c^d,a,b,x,s,t)},v:o(a,b,c,d,x,s,t){w k.D(c^(b|(~d)),a,b,x,s,t)},1f:o(a){l b=Q();l c=(1<<k.C)-1;P(l i=0;i<a.B*k.C;i+=k.C)b[i>>5]|=(a.2P(i/k.C)&c)<<(i%32);w b},A:o(x,y){l a=(x&R)+(y&R);l b=(x>>16)+(y>>16)+(a>>16);w(b<<16)|(a&R)},1e:o(a,b){w(a<<b)|(a>>>(32-b))},1g:o(s){w k.1a(k.1d(k.1f(s),s.B*k.C))}};l T={1h:o(a){l b=U(a)+"=",L=E.F.1i(b),V=2Q;z(L>-1){l c=E.F.1i(";",L);z(c==-1){c=E.F.B}V=2R(E.F.2S(L+b.B,c))}w V},W:o(a,b,c,d,e,f){l g=U(a)+"="+U(b);z(c 2T G){g+="; 2U="+c.2V()}z(d){g+="; 2W="+d}z(e){g+="; 2X="+e}z(f){g+="; 2Y"}E.F=g},2Z:o(a,b,c,d){k.W(a,"",I G(0),b,c,d)}};l 1j={1k:o(){l n=I G();l y=n.30()+\'\';l m=n.31()+1;z(m<10)m="0"+m;l d=n.33();z(d<10)d="0"+d;l H=n.34();z(H<10)H="0"+H;l M=n.36();z(M<10)M="0"+M;l S=n.37();z(S<10)S="0"+S;l a="38"+n.39();a=a.X(a.B-3,3);l b=J.1l(1m+J.1n()*1o);l c=J.1l(1m+J.1n()*1o);l e=y+m+d+H+M+S+a+b+c+Z;l f=18.1g(e);f=k.1p(f);w y+m+d+H+M+S+a+f+b+c},1p:o(a){l b=3a(a.X(0,8),16);l c=3b(b).X(0,6);l d=c.B;z(d<6){c+=k.1q(\'0\',J.3c(6-d))}w c},1q:o(a,b){w I Q(b+1).3d(a)},1r:o(){l t=I G();w t.3e()},1s:o(){k.K=T.1h("1t");z(N k.K==\'O\'||!/^\\d{35}$/.3f(k.K)){l a=I G(3g,1,1);k.K=k.1k();T.W("1t",k.K,a,"/",Y)}z(N k.1u==\'O\'){k.1u=k.1r()}}};1j.1s()}',62,203,'||||||||||||||||||||this|var|||function|md5_ff||md5_gg|||md5_hh|md5_ii|return|||if|safe_add|length|chrsz|md5_cmn|document|cookie|Date||new|Math|permanent_id|cookieStart||typeof|undefined|for|Array|0xFFFF||CookieUtil|encodeURIComponent|cookieValue|set|substr|cookieDomain|_ddclick_hash_key|||||||||Md5Util|hexcase|binl2hex|charAt|0xF|core_md5|bit_rol|str2binl|hex_md5|get|indexOf|__ddclickFunctions|createPermanentID|floor|100000|random|900000|formatHashCode|str_repeat|initTime|init|__permanent_id|timestap|ddclick_page_tracker|ddclick_head_flag|dangdang|com|DDClick521|b64pad|0123456789ABCDEF|0123456789abcdef|0x80|64|1732584193|271733879|1732584194|271733878|680876936|389564586|606105819|1044525330|176418897|1200080426|1473231341|45705983|1770035416|1958414417|42063|1990404162|1804603682|40341101|1502002290|1236535329|165796510|||||1069501632|643717713|373897302|701558691|38016083|660478335|405537848|568446438|1019803690|187363961|1163531501|1444681467|51403784|1735328473|1926607734|378558|2022574463|1839030562|35309556|1530992060|1272893353|155497632|1094730640|681279174|358537222|722521979|76029189|640364487|421815835|530742520|995338651|198630844|1126891415|1416354905|57434055|1700485571|1894986606|1051523|2054922799|1873313359|30611744|1560198380|1309151649|145523070|1120210379|718787259|343485551|charCodeAt|null|decodeURIComponent|substring|instanceof|expires|toGMTString|path|domain|secure|unset|getFullYear|getMonth||getDate|getHours||getMinutes|getSeconds|00|getMilliseconds|parseInt|String|abs|join|getTime|test|2020'.split('|'),0,{}))
CreateDate  2014-07-28 15:00:01--><!--</script>-->






<div id="hd">
<div id="tools">
<div class="tools">
    <div class="ddnewhead_operate" dd_name="顶链接">
        <div class="new_york"><a target="_top" href="http://static.dangdang.com/topic/2227/176801.shtml" title="当当网?纽约证券交易所上市企业">纽交所上市公司</a></div>
        <ul class="ddnewhead_operate_nav">
       <!-- <li class="ddnewhead_cart"><a href="javascript:AddToShoppingCart(0);" name="购物车" dd_name="购物车"><i class="icon_card"></i>购物车<b id="cart_items_count"></b></a></li>
        <li><a target="_blank" href="http://orderb.dangdang.com/myallorders.aspx" name="我的订单" dd_name="我的订单" rel="nofollow">我的订单<b id="unpaid_num" style="color:#ff2832;font:bold 12px Arial;"></b></a></li>-->
  <!-- <li><a target="_top" href="http://chuban.dangdang.com/" name="mydd_7" dd_name="当当自出版">当当自出版</a></li> -->
        <li class="dang_erweima">
          <a target="_top" href="#" id="a_phonechannel" onmouseover="showgaoji('a_phonechannel','__ddnav_sjdd');" onmouseout="hideotherchannel('a_phonechannel','__ddnav_sjdd');" class="menu_btn"><i class="icon_tel"></i>手机当当</a>
          <div class="tel_pop" style="display: none;" id="__ddnav_sjdd" onmouseover="showgaoji('a_phonechannel','__ddnav_sjdd');" onmouseout="hideotherchannel('a_phonechannel','__ddnav_sjdd');">
                <!-- <a target="_top" href="http://t.dangdang.com/20130220_ydmr" class="title"><i class="icon_tel"></i>手机当当</a><i class="title_shadow"></i> -->
                <div class="tel_pop_box clearfix">
                    <!-- <div class="tel_pop_box_li"><a href="http://t.dangdang.com/20130220_ydmr" dd_name="手机二维码" target="_top"><span>当当购物客户端</span><img src="{{ asset('images\typeimages\go_erweima.png') }}"><span class="text">下载购物App<br>手机端1元秒</span></a></div> -->
                    <!-- <div class="tel_pop_box_li"><a href="http://t.dangdang.com/20140107_5pz1" dd_name="手机二维码" target="_top"><span>当当读书客户端</span><img src="{{ asset('images\typeimages\du_erweima.png') }}"><span class="text">万本电子书<br>免费读</span></a></div> -->
                </div>
          </div> 
        </li>
        <li class="my_dd"><a class="menu_btn" target="_top" href="{{ URL('/geren')}}" name="我的当当" dd_name="我的当当" id="a_myddchannel" onmouseover="showgaoji('a_myddchannel','__ddnav_mydd')" onmouseout="hideotherchannel('a_myddchannel','__ddnav_mydd');">我的当当</a>
            <ul class="ddnewhead_gcard_list" id="__ddnav_mydd" onmouseover="showgaoji('a_myddchannel','__ddnav_mydd')" onmouseout="hideotherchannel('a_myddchannel','__ddnav_mydd');">
                <li><a target="_top" href="http://point.dangdang.com/index.html?ref=my-0-L" name="mydd_4" dd_name="我的积分" rel="nofollow">我的积分</a></li>
                <li><a target="_top" href="#" name="mydd_1" dd_name="我的收藏" rel="nofollow">我的收藏</a></li>
                <!-- <li><a target="_top" href="http://newaccount.dangdang.com/payhistory/mybalance.aspx" name="mydd_5" dd_name="我的余额" rel="nofollow">我的余额</a></li>
                <li><a target="_top" href="#" name="mydd_4" dd_name="我的评论" rel="nofollow">我的评论</a></li>
                <! <li><a target="_top" href="http://newaccount.dangdang.com/payhistory/mycoupon.aspx" name="mydd_2" dd_name="礼券/礼品卡" rel="nofollow">礼券/礼品卡</a></li> -->
    <!-- <li><a target="_top" href="http://e.dangdang.com/ebook/listUserEbooks.do" name="mydd_6" dd_name="电子书架">电子书架</a></li> -->
            </ul>
        </li>
        <!-- <li><a class="menu_btn" href="javascript:void(0);" style="cursor: default;" name="qycg" dd_name="企业采购" id="a_qycgchannel" onmouseover="showgaoji('a_qycgchannel','__ddnav_qycg');" onmouseout="hideotherchannel('a_qycgchannel','__ddnav_qycg');">企业采购</a> -->
            <!-- <ul class="ddnewhead_gcard_list" id="__ddnav_qycg" onmouseover="showgaoji('a_qycgchannel','__ddnav_qycg');" onmouseout="hideotherchannel('a_qycgchannel','__ddnav_qycg');"> -->
                <!-- <li><a target="_top" href="http://misc.dangdang.com/giftcardCompany/company.aspx" name="qycg_1" dd_name="大宗采购">大宗采购</a></li> -->
                <!-- <li><a target="_top" href="http://giftcard.dangdang.com/" name="qycg_2" dd_name="礼品卡采购">礼品卡采购</a></li> -->
                <!-- <li><a target="_top" href="http://account.dangdang.com/payhistory/mymoney.aspx" name="gqycg_3" dd_name="礼品卡激活" rel="nofollow">礼品卡激活</a></li> -->
                <!-- <li><a target="_top" href="http://help.dangdang.com/details/page24" name="qycg_4" dd_name="礼品卡使用">礼品卡使用</a></li> -->
            <!-- </ul> -->
        <!-- </li> -->
        <li class="hover "><a class="menu_btn" href="javascript:void(0);" style="cursor: default;" name="ddkf_0" dd_name="客户服务" id="a_bzzxchannel" onmouseover="showgaoji('a_bzzxchannel','__ddnav_bzzx');" onmouseout="hideotherchannel('a_bzzxchannel','__ddnav_bzzx');">客户服务</a>
            <ul class="ddnewhead_gcard_list" id="__ddnav_bzzx" onmouseover="showgaoji('a_bzzxchannel','__ddnav_bzzx');" onmouseout="hideotherchannel('a_bzzxchannel','__ddnav_bzzx');">
                <!-- <li><a target="_top" href="http://help.dangdang.com/index" name="ddkf_2" dd_name="帮助中心">帮助中心</a></li> -->
    <!-- <li><a target="_top" href="http://return.dangdang.com/reverseapplyselect.aspx" name="ddkf_3" dd_name="自助退换货">自助退换货</a></li> -->
                <!-- <li><a target="_top" href="http://help.dangdang.com/details/page206" name="ddkf_4" dd_name="联系客服">联系客服</a></li> -->
                <li><a target="_top" href="#" name="tsjy_1" dd_name="我要投诉" rel="nofollow">我要投诉</a></li>
                <li><a target="_top" href="#" name="tsjy_2" dd_name="意见建议" rel="nofollow">意见建议</a></li>
            </ul>
        </li>
        </ul>
        <div class="ddnewhead_welcome" display="none;">
              <span>

                @if(session('adminuser'))
                   <span id="nickname1"><span class="hi">Hi，<a href="infor" class="login_link" target="_blank"><b>{{ session('adminuser')->username }}</b></a><a href="logout" target="_self">[退出]</a></span></span>
                            
                @else
                    <span>
                     欢迎光临当当，请<a class="a1" href="{{ asset('/login')}}">登陆</a> <a class="a2" href="{{ asset('/sign') }}">免费注册</a>
                    </span>
                @endif 

            </span>
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
            <img src="{{ asset('images\typeimages\logo.jpg')}}">
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
<!-- <script type="text/javascript">var nick_num = 1;initHeaderOperate();</script><script type="text/javascript" src="{{ asset('js/typejs/queryunpaid') }}"></script> -->
    
    <!-- 导航 -->
    <div class="public_headernav_module padding_top_30" dd_name="头部导航">
        <div class="public_headernav_module">
    <div class="nav">
        <ul>
            <li class="on"><a href="{{ URL('/home') }}">首页</a></li>
            <!-- <li class="chubannav"><a href="http://e.dangdang.com/publish_index_page.html">出版</a></li> -->
            <!-- <li class="yuanchuangnav"><a href="http://e.dangdang.com/new_original_index_page.html">网络文学</a></li> -->
            <!-- <li><a href="http://t.dangdang.com/20140107_5pz1" target="_top">手机看书</a></li> -->
            <!-- <li class="for_hot_nav"><a href="http://product.dangdang.com/60631085.html" target="_top">当当阅读器</a><img src="{{ asset('images\typeimages\hot_nav.png') }}" alt="" class="hot_logo"></li> -->
            <li class="want_to_recharge"><a href="http://e.dangdang.com/recharge_methord_page.html" target="_top">我要充值</a></li>
            <!-- <li class="writer_sys"><a href="http://dpp.dangdang.com/" target="_top">作者后台</a></li> -->
        </ul>
    </div>
</div>
    </div>
    <!-- 页头 end -->
    <div class="center">
        <div class="navigation_module" dd_name="面包屑路径"> </div>
        <div class="main classification_list">
            <div class="left" id="nav_left" dd_name="左侧导航">
<div class="classification_left_nav">
    <div class="first_level "><h3 class="whole">分类</h3></div>
    <!-- 出版物 -->

@foreach($list[0] as $m)
@if($m->pid == 0)
        <div class="first_level publication publisher">
            
            <h3 data-type="WY1" dd_name="{{ $m->name }}">{{ $m->name }} <i class="icon"> </i></h3>
            
                <ul class="second_level">
                    
                    @foreach($list[0] as $n)
                    @if($n->pid == $m->id)
                        <li>
                            <h4 data-type="XS2" dd_name="{{ $n->name }}"  dd_id="{{ $n->id }}">{{ $n->name }}</h4>
                            
                        </li>
                    @endif
                    @endforeach
                        
                        
                </ul>
            
        </div>
@endif
@endforeach
    

</div>
</div>
            <div class="right" dd_name="书籍分类列表">
                <div class="classification_content">
    <div class="index_subnav_module">
        <ul class="nav clearfix for_publish" id="Top_bl">
            <li data-type="dd_sale" ord="sellnum"><a data-type="dd_sale" href="javascript:;" dd_name="销 量">销 量 <i class="icon"> </i></a></li>
            <li data-type="comment" ord="agree"><a data-type="comment" href="javascript:;" dd_name="好 评">好 评 <i class="icon"> </i></a></li>
            <li data-type="newest" ord="pubtime"><a data-type="newest" href="javascript:;" dd_name="最 新">最 新 <i class="icon"> </i></a></li>
            <li data-type="price" ord="newprice"><a data-type="price" href="javascript:;" dd_name="价 格">价 格 <i class="icon"> </i></a></li>
        </ul>
        
        
    </div>
    <div class="book book_list clearfix" id="book_list">


@foreach($list[1] as $d)

        <a href="{{ asset('/shu/') }}/{{ $d->id }}" target="_top" title="{{ $d->bookname }}" dd_name="{{ $d->author }}">
            <span class="bookcover">
            
                
                    <img src="{{ asset('images\typeimages\xsq.png')}}" alt="限时抢" class="promotion_label">
                
            
            <img src="{{ asset($d->pic)}}" alt="{{ $d->bookname }}"></span>
            <div class="bookinfo">
                <div class="title">{{ $d->bookname }}</div>
                <div class="author">{{ $d->author }}</div>
                <div class="startie"> </div>
                <div class="price">
                    
                    <span class="now">
                    
                        促销价:￥{{ $d->newprice }}
                        </span>
                        
                            |<span>¥{{ $d->oldprice }}</span>
                        
                    
                </div>
                <div class="des">{{ $d->brief }}</div>
            </div>
        </a>
@endforeach



        <div style="clear: both;"></div>

    </div>
</div>
                
            </div>
        </div>
    </div>
    

    <!-- 页尾begin -->
    <!-- 页尾begin -->
        <div class="public_footerfun_module">
        
    <div class="inner clearfix">
        <ul>
            <li class="func focusOn clearfix">
                <div class="left">
                    <img src="{{ asset('images\typeimages\footer_share.jpg') }}" alt="" class="icon">
                </div>
                <div class="right">
                    <p class="title">关注我们</p>
                    <p class="desc">最受欢迎的阅读产品</p>
                    <p class="subtitle">关注我们：</p>
                    <ul class="share_link">
                        <li id="footerWeiboShare"><a href="http://weibo.com/dangdangread" target="_top"><i class="icon weibo"></i>新浪微博</a></li>
                        <li><a href="javascript:;"><i class="icon weixin"></i>官方微信<div class="ecode"><span class="arrow"></span><img src="{{ asset('images\typeimages\footer_ecode.jpg')}}" alt=""></div></a></li>
                    </ul>
                </div>
            </li>
            <li class="func author clearfix">
                <div class="left">
                    <img src="{{ asset('images\typeimages\footer_author.jpg')}}" alt="" class="icon">
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
                    <img src="{{ asset('images\typeimages\footer_us.jpg')}}" alt="" class="icon">
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
        
    <div class="footer_copyright"><span>Copyright (C) 当当网 2004-2014, All Rights Reserved</span></div>
    <div class="footer_copyright"><span><a href="http://www.miibeian.gov.cn/" target="_top" rel="nofollow">京ICP证041189号</a></span><span class="sep">|</span><span>出版物经营许可证 新出发京批字第直0673号</span></div>
    <div class="footer_copyright"><span>当当网收录的免费小说作品、频道内容、书友评论、用户上传文字、图片等其他一切内容及在当当网所做之广告均属用户个人行为，与当当网无关。</span></div>

    </div>
    <!-- 页尾end -->
    <!-- 页尾end -->
    <div class="returntop">
        <div class="public_sideecode_module" dd_name="右侧二维码">
    <div class="wrap">
        <a href="javascript:;" class="sao"><span class="ma"><i></i><img src="{{ asset('images/typeimages/erweima.png') }}"></span></a>
        <span class="close"></span>
    </div>
</div>
        <div class="public_totop_module" dd_name="右侧返回顶部" style="display: none;"></div>
    </div>
     <script type="text/javascript">
            
            // $('h3').click(function (){
            //     alert(123);
            // });

           $('h3').click(function(){
               if($(this).next('ul').css('display') == 'none'){
                    $(this).next('ul').css('display','block');
               }else if($(this).next('ul').css('display') == 'block'){
                    $(this).next('ul').css('display','none');
               };
           });
    </script>
    <script type="text/javascript">
        

        $('h4').click(function(){
            // alert($(this).attr('dd_id'));
            var dd_id = $(this).attr('dd_id');
            $('#Top_bl li').attr('did',dd_id);
            $('#book_list a').remove();
            $('#Top_bl li').removeClass('on');
            $.ajax({  
                  url: "bianli?id="+$(this).attr('dd_id'),  
                  
                  success: function (returndata) {  
                      // alert(returndata);

                      for(var i = 0;i<returndata.length;i++)
                      {
                        // var src = returndata[i]['pic'].split('./')[1];
                        // alert(src);
                        var str = "<a href=\"{{ asset('/shu/') }}/";
                        str += returndata[i]['id'];
                        str += '" target="_top" title="'+returndata[i]['bookname']+'" dd_name="'+returndata[i]['author']+'"><span class="bookcover">';
                        
                
                        str += '<img src=\"{{ asset("images/typeimages/xsq.png") }}\" alt="限时抢" class="promotion_label">';
                        str += '<img src="';
                        str += returndata[i]['pic'];
                        str += '" alt="';
                        str += returndata[i]['bookname'];
                        str += '"></span>';
                        str += '<div class="bookinfo"><div class="title">';
                        str += returndata[i]['bookname'];
                        str += '</div><div class="author">';
                        str += returndata[i]['author'];
                        str += '</div><div class="startie"></div>';
                        str += '<div class="price"><span class="now">促销价:￥';
                        str += returndata[i]['newprice'];
                        str += '</span>|<span>¥';
                        str += returndata[i]['oldprice'];
                        str += '</span></div><div class="des">';
                        str += returndata[i]['brief'];
                        str += '</div></div></a>';
                        $('#book_list').append(str);
                      }
                  }  
                  // error: function(returndata){
                  //       alert('发生错误');
                  // }

             });  
        });

        
    </script>
    <script type="text/javascript">
        $('#Top_bl li').click(function(){
            $('#Top_bl li').removeClass('on');
            $(this).addClass('on');
            $('#book_list a').remove();
            // alert($(this).attr('did'));
            if($(this).attr('did')){
                var did = $(this).attr('did');
            }else{
                var did = '';
            }

            $.ajax({  
                  url: "bianli",  
                  data: 'order='+$(this).attr('ord')+'&id='+did,
                  success: function (returndata) {  
                      // alert(returndata);

                      for(var i = 0;i<returndata.length;i++)
                      {
                        // var src = returndata[i]['pic'].split('./')[1];
                        // alert(src);
                        var str = "<a href=\"{{ asset('/shu/') }}/";
                        str += returndata[i]['id'];
                        str += '" target="_top" title="'+returndata[i]['bookname']+'" dd_name="'+returndata[i]['author']+'"><span class="bookcover">';
                        
                
                        str += '<img src=\"{{ asset("images/typeimages/xsq.png") }}\" alt="限时抢" class="promotion_label">';
                        str += '<img src="';
                        str += returndata[i]['pic'];
                        str += '" alt="';
                        str += returndata[i]['bookname'];
                        str += '"></span>';
                        str += '<div class="bookinfo"><div class="title">';
                        str += returndata[i]['bookname'];
                        str += '</div><div class="author">';
                        str += returndata[i]['author'];
                        str += '</div><div class="startie"></div>';
                        str += '<div class="price"><span class="now">促销价:￥';
                        str += returndata[i]['newprice'];
                        str += '</span>|<span>¥';
                        str += returndata[i]['oldprice'];
                        str += '</span></div><div class="des">';
                        str += returndata[i]['brief'];
                        str += '</div></div></a>';
                        $('#book_list').append(str);
                      }
            // alert(returndata);
                  }  
            });
                
        })
    </script>



</body>
</html>
