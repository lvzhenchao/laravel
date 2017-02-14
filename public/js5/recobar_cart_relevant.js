/* var com_conf = {
     'reco_type': 'alsobuy',
     'pids': 1033099101,
     'type': 12,
     'div': 'search_tuijian_content_alsobuy',
     'url': 'http://tuijian.dangdang.com/recobar2/',
     'css': 'shoppingcart_tuijian.css'
 };*/
if(typeof(window.DDAD_RDM) == 'undefined') {
    window.DDAD_RDM = (new Date().getTime()).toString() + parseInt(Math.random()*(999999999-100000000)+100000000);
}
(function(window, $, com_conf, data){

    function loadJss(jss){
        var srcs = $.isArray(jss) ? jss : [jss];
        var head = document.getElementsByTagName('HEAD')[0], script = '';
        for(var i in srcs) {
            var script = document.createElement('SCRIPT');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', srcs[i]);
            head.appendChild(script);
        }        
    }

    function loadCss(css){
        var h=document.getElementsByTagName('head'),link=document.createElement('link');
        link.rel="stylesheet";
        link.type="text/css";
        link.href=css;
        h[0].appendChild(link);        
    }

    function loadJs(src, callback){
        var head = document.getElementsByTagName('HEAD')[0];
        var script = document.createElement('SCRIPT');
        var args = Array.prototype.slice.call(arguments, 2);
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', src);
        if(typeof(callback) != 'undefined') {
            script.onload = function() {callback(args)};
            script.onreadystatechange = function() {
                if(this.readyState == 'complete' || this.readyState == 'loaded') {
                    callback(args);
                }
            }
        }
        head.appendChild(script);              
    }

    function initRender(args){
        try{
            var div = args[0];
            var recobar_data = eval('recobar_data'+args[1]);
            recobar_data.data = recobar_data.data.replace(/\\'/g,"'");
            $("#"+div).empty().append(recobar_data.data);
            var conf = {
                'container': $("#"+div).find('div.shoppingcart_recommend_list > ul'),
                'LPAGE': $("#"+div).find('div.left'),
                'RPAGE': $("#"+div).find('div.right'),
                'PAGES': $("#"+div).find('div.recommend_fanye > span'),
                'PIC': $("#"+div).find('div.pic'),
                'showdiv':$("#"+div).attr('name'),
                'ad_showlogurl':'http://per.dangdang.com/'
            }
            RECOBAR(conf, recobar_data).init();
        }catch(e){

        }
    }

    function loadData(com_conf){
        var reco_type = com_conf.reco_type.split(',');
        var div = com_conf.div.split(',');
        var src;
        for(var i in reco_type) {
            src = com_conf.url + "jsonp.php?type=" + com_conf.type + "&pids=" + com_conf.pids + "&reco_type=" + reco_type[i];
            if(typeof(window.DDAD_RDM) != 'undefined'){
                src += "&rdm="+window.DDAD_RDM;
            }
            loadJs(src, initRender, div[i], reco_type[i]);
        }
    }

    function initBase(com_conf){
        //loadJss(com_conf.js);
        loadCss(com_conf.url + '/css/' + com_conf.css);
        loadData(com_conf);
    };

    function initConf(conf){
        return {
            'container': conf.container ? conf.container : '',
            'LPAGE': conf.LPAGE ? conf.LPAGE : '',
            'RPAGE': conf.RPAGE ? conf.RPAGE : '',
            'PAGES': conf.PAGES ? conf.PAGES : '',
            'PIC': conf.PIC ? conf.PIC : '',
            'showdiv': conf.showdiv ? conf.showdiv : '',
            'ad_showlogurl': conf.ad_showlogurl ? conf.ad_showlogurl : ''
        };
    }

    function initData(data){
        var data = data ? data : []; 
        data = $(data).find("div.lie");
        return data;
    }

    function Element(conf, data){
        this.CONF = initConf(conf);
        this.DATA = initData(data.data);
        this.IP = data.ip;
        this.RDM = data.rdm;
        this.PERM_ID = data.perm_id;
    };

    var elementEvents = {
        init : function(){
           this.initEvent();
        },
        initEvent : function(){
            $(this.CONF.container).find('.lie').eq(0).show().siblings().hide()
            this.hover();
            this.lrloop();
            this.pageindex();
            this.per_click(this.CONF.showdiv,this.IP,this.PERM_ID,this.RDM);
            this.per(this.CONF.showdiv,this.IP,this.PERM_ID,this.RDM);
        },
        per : function(showdiv,ip,perm_id,rdm){
            var fun = this;
            $self = $(self);$self.bind('scroll',function(){
               fun.per_click(showdiv,ip,perm_id,rdm);
            });
        },
        per_click : function(showdiv,ip,perm_id,rdm){
            if(typeof(window.DDAD_RDM) == 'undefined'){
                window.DDAD_RDM = rdm;
            }
            var logurl = this.CONF.ad_showlogurl;
            $("div[name="+showdiv+"] ul .lie:visible li").each(function(index){
                var ad_id=$(this).attr('ad_id');
                var ad_extra = '-';if(!this.issend && ad_id != 0){if($(document).scrollTop()<$(this).offset().top+$(this).height() && $(this).offset().top<$(document).scrollTop()+$(window).height() && $(document).scrollLeft()+$(window).width()>$(this).offset().left && $(document).scrollLeft()<$(this).offset().left+$(this).width()){var pagenum=(showdiv=='midcart_alsobuy') ? 8:4;var page = $("div[name="+showdiv+"] .now").html();if(typeof(page)=='undefined') page=1;index += (page-1)*pagenum;loadJs(logurl+'logurl.htm?tp=1&seq='+index+'&pos=109&ad_id='+ad_id+'&extra='+ad_extra+'&extra_org='+ad_extra+'&ip='+ip+'&permanent_id='+perm_id+'&rdm='+window.DDAD_RDM+'&style=old&showdiv='+showdiv);this.issend=true;}};
            });
        },
        lrloop : function(){
            var pages = this.DATA.length;
            var pagenum = 0;
            var that = this;

            $(this.CONF.LPAGE).bind('click', function(){
                pagenum = that.currentpage();
                if(--pagenum < 0) {
                    pagenum = pages-1;
                }
                that.pageRender(pagenum);
            });
            $(this.CONF.RPAGE).bind('click', function(){
                pagenum = that.currentpage();
                if(++pagenum > pages-1) {
                    pagenum = 0;
                }
                that.pageRender(pagenum);
            });
        },
        hover: function(){
            $(this.CONF.PIC).hover(function(){
               $(this).find('.pic_link .hover_cover_wrap').fadeIn(300);
               $(this).find('.hover_btn').css('display','block'); 
            },function(){
               $(this).find('.pic_link .hover_cover_wrap').fadeOut(0);
               $(this).find('.hover_btn').css('display','none');
           })
        },
        currentpage : function(){
            var pagenum = 0;
            $(this.CONF.PAGES).each(function(index, ele){
                if($(ele).hasClass('now')){
                    pagenum = index;
                }
            });
            return pagenum;    
        },
        pageindex : function(){
            var that = this;
            $(this.CONF.PAGES).each(function(index, ele){
                $(ele).bind('click', function(){
                    that.pageRender(index);
                });
            });
        },
        pageRender : function(index){
            var node = this.DATA[index] ? this.DATA[index] : undefined;
            var span = $(this.CONF.PAGES);

            if(node === undefined){
                return false;
            }

            $(span).each(function(i, j){
                if($(j).hasClass('now')){
                    $(j).removeClass('now');                            
                }
            });

            if(!$(span[index]).hasClass('now')){
                $(span[index]).addClass('now');
            }
        //    $(this.CONF.container).empty().append($(node));
            $(this.CONF.container).find('.lie').eq(index).show().siblings().hide();
            this.hover();
            this.per_click(this.CONF.showdiv,this.IP,this.PERM_ID,this.RDM);
          //  this.per('J_alsoview',this.IP,this.PERM_ID,this.RDM);
        }
    };
    Element.prototype = elementEvents;
    window.RECOBAR = function (conf, data){
        return new Element(conf, data);
    }
    initBase(com_conf); 
})(window, jQuery, com_conf, {})
