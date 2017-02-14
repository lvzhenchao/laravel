/**
 * 购物车中间页
 * @version 1.1 上线版本号
 * log 修改alsobuy翻页曝光两行bug
 */
(function (window, $) {

    /**
     * 获取cookie
     **/
    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

    var config = {server: "http://recosys.dangdang.com/realdata/collect.jpg", intervalTime: 400, state: 'dev'};
    var MODULE = {
        midcart_alsobuy: "midcart_alsobuy", // 购物车中间页买了还买模块
        midcart_alsoview: "midcart_alsoview" //购物车中间页为你推荐模块
    };
    var perm_id = getCookie("__permanent_id");//用户标识
    var main_pid = addProID; //主商品id，被添加商品
    var alsobuy_timer = null;//周期运行
    var reco_timer = null; //周期运行
    var alsobuy_list = null;
    var alsoview_list = null;//为你推荐

    /**
     * 发送点击信息
     * @param strvalue
     */
    function report_click(strvalue) {
        strvalue = config.server + '?' + strvalue + '&type=1&random_id=' + Math.random();
        $(document.body).append("<img style=\"display: none;\" src=\"" + strvalue + "\"/>");
    }

    /**
     * 发送曝光数据
     * @param li 数据
     */
    function report(li) {
        var position = $(li).attr("position");
        var traced = $(li).attr("traced");
        if (position != null && traced != 1) {
            var src = config.server + "?" + position + "&type=0&random_id=" + Math.random();
            $(document.body).append("<img style=\"display: none;\" src=\"" + src + "\"/>");
            $(li).attr("traced", 1)
        }
    }

    function report_list(li_list) {
        for (var i = 0; i < li_list.length; i++) {
            var position = $(li_list[i]).attr("position");
            var traced = $(li_list[i]).attr("traced");
            if (position != null && traced != 1) {
                var src = config.server + "?" + position + "&type=0&random_id=" + Math.random();
                $(document.body).append("<img style=\"display: none;\" src=\"" + src + "\"/>");
                $(li_list[i]).attr("traced", 1); //曝光标记
            }
        }
    }

    function get_alsobuy_visible_list() {
        var div_list = $("#JL_alsobuy").find("div.lie");
        for (var i = 0; i < div_list.length; i++) {
            var display = $(div_list[i]).css('display');
            if (display != 'none') {
                return div_list[i];
            }
        }
    }

    /**
     * 监测是否进入可视区
     * @param page 翻页
     * @param clientHeight
     * @param scrollTop
     */
    function trace(page, clientHeight, scrollTop) {
        if (page != null) {
            var li_list = $(page).find("li");
            if (li_list != null && li_list.length > 0) {
                for (var i = 0; i < li_list.length; i++) {
                    var offsetTop = $(li_list[i]).offset().top;
                    var height = $(li_list[i]).height();
                    if (offsetTop < scrollTop) {
                        //已经滚动到可视取上方
                        if ((offsetTop + height) > scrollTop && (offsetTop + height) < (clientHeight + scrollTop)) {
                            //露出尾部
                            report(li_list[i]);
                            $(page).attr("traced", 1);
                        } else if ((offsetTop + height) < scrollTop) {
                            //上方不可见位置
                        }
                    } else if (offsetTop < clientHeight + scrollTop) {
                        //进入可视区
                        report(li_list[i]);
                        $(page).attr("traced", 1);
                    } else {
                        //在可视区下方
                    }
                }
            }
        }

    }

    /**
     * 分页触发事件
     */
    function alsobuy_trace_page() {
        var div_visible = get_alsobuy_visible_list(); //获取可见的图书页
        var clientHeight = $(window).height();
        var scrollTop = $(document).scrollTop();
        trace(div_visible, clientHeight, scrollTop);
    }


    /*
     *买了还买模块监控
     *addProID为上下文main_id信息
     */
    function test_alsobuyData() {
        var alsobuy_div = $("#J_alsobuy");
        alsobuy_list = $(alsobuy_div).find("#JL_alsobuy li");
        if (alsobuy_list.length > 0) {
            var request_id = $("#JL_alsobuy").attr("request_id");
            for (var i = 0; i < alsobuy_list.length; i++) {
                var url = $(alsobuy_list[i]).find("a.pic_link").attr("href");
                var reco_pid = /\d+/.exec(url)[0];
                var position = i + 1;
                var params = {
                    request_id: request_id,
                    perm_id: perm_id,
                    module: MODULE.midcart_alsobuy,
                    main_pid: main_pid,
                    reco_pid: reco_pid,
                    position: position,
                    state: config.state, // 状态
                    client: "PC"
                };
                var paramsstr = $.param(params);
                $(alsobuy_list[i]).attr("position", paramsstr);

                //添加点击事件
                $(alsobuy_list[i]).find("a").click(function () {
                    var position = $($(this).parent()).parent().attr("position");
                    report_click(position);
                })
            }

            //添加分页事件
            var prev = $(alsobuy_div).find("div.left span").click(function () {
                setTimeout(alsobuy_trace_page, 400); //延迟执行
            });
            var next = $(alsobuy_div).find("div.right span").click(function () {
                setTimeout(alsobuy_trace_page, 400); //延迟执行
            });
            var topage = $(alsobuy_div).find("div.recommend_fanye span").click(function () {
                setTimeout(alsobuy_trace_page, 400);
            });

            //第一页曝光
            var clientHeight = $(window).height();
            var scrollTop = $(document).scrollTop();
            var div_visible = get_alsobuy_visible_list();
            trace(div_visible, clientHeight, scrollTop);
            clearInterval(alsobuy_timer);

            //添加滚动事件
            $(window).scroll(function () {
                var clientHeight = $(window).height();
                var scrollTop = $(document).scrollTop();
                var page = get_alsobuy_visible_list();
                trace(page, clientHeight, scrollTop);
            });


        }

    }

    /*alsoview分页事件*/
    function alsoview_trace_page() {
        var div_visible = get_alsoview_visible_list(); //获取可见的图书页
        var li_list = $(div_visible).find("li");
        if (li_list.length > 0) {
            $(div_visible).attr("traced", 1);
            report_list(li_list);
        }
    }


    /*获取alsoview可见模块*/
    function get_alsoview_visible_list() {
        var div_list = $("#JL_alsoview").find("div.lie");
        for (var i = 0; i < div_list.length; i++) {
            var display = $(div_list[i]).css('display');
            var traced = $(div_list[i]).attr("traced");
            if (display != 'none' && traced != 1) {
                return div_list[i];
            }
        }
    }


    /*
     *alsoview(为你推荐)模块监控
     *addProID为上下文main_id
     */
    function test_recoData() {
        var alsoview_div = $("#J_alsoview");
        alsoview_list = $(alsoview_div).find("#JL_alsoview li");
        if (alsoview_list.length > 0) {
            var request_id = $("#JL_alsoview").attr("request_id");
            for (var i = 0; i < alsoview_list.length; i++) {
                var url = $(alsoview_list[i]).find("a.pic_link").attr("href");
                var reco_pid = /\d+/.exec(url)[0];
                var position = i + 1;
                var params = {
                    request_id: request_id,
                    perm_id: perm_id,
                    module: MODULE.midcart_alsoview,
                    main_pid: main_pid,
                    reco_pid: reco_pid,
                    position: position,
                    state: config.state, // 状态
                    client: "PC"
                };
                var paramsstr = $.param(params);
                $(alsoview_list[i]).attr("position", paramsstr);


                //添加点击事件
                $(alsoview_list[i]).find("a").click(function () {
                    var position = $($(this).parent()).parent().attr("position");
                    report_click(position);
                })
            }

            //添加分页事件---alsoview
            //左翻页
            var prev = $(alsoview_div).find("div.left span").click(function () {
                setTimeout(alsoview_trace_page, 400);
            });
            //右翻页
            var next = $(alsoview_div).find("div.right span").click(function () {
                setTimeout(alsoview_trace_page, 400);
            });
            //圆点点击
            var topage = $(alsoview_div).find("div.recommend_fanye span").click(function () {
                setTimeout(alsoview_trace_page, 400);
            });

            //第一页曝光---alsoview
            var clientHeight = $(window).height();
            var scrollTop = $(document).scrollTop();
            var div_visible = get_alsoview_visible_list();
            trace(div_visible, clientHeight, scrollTop);
            clearInterval(reco_timer);

            //添加滚动事件---alsoview
            $(window).scroll(function () {
                var clientHeight = $(window).height();
                var scrollTop = $(document).scrollTop();
                var page = get_alsoview_visible_list();
                trace(page, clientHeight, scrollTop);
            });
        }

    }


    /**
     * 购物车中间页
     */
    function midcart_start() {
        //买了还买模块监控
        alsobuy_timer = setInterval(test_alsobuyData, config.intervalTime);
        //为你推荐模块监控
        reco_timer = setInterval(test_recoData, config.intervalTime);
        //alert("购物车中间页");
    }

    window.CC = {
        //购物车中间页
        midcart: function () {
            midcart_start();
        }
    }
})(window, jQuery);
