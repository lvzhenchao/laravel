function SpuLimit(){
	var m_left = 0;
    var m_top = 0;
	var m_data_source=null;
	var m_checkout_type=0;
	var deleteCartItemAjax = new Ajax("/cartitem/remove");
	
	var backCartCallback;
    var dialog = null;
	
	//设置窗口的位置
	function SetSpuLimitPopPositon() {
        var iWidth = 580; //弹出窗口的宽度;
        var iHeight = 320; //弹出窗口的高度;
        var scrolltop = 0;
        var scrollleft = 0;
        var cheight = 0;
        var cwidth = 0;
        if (document.compatMode == "BackCompat") {
            cwidth = document.body.clientWidth;
            cheight = document.body.clientHeight;
            scrollleft = document.body.scrollLeft;
            scrolltop = document.body.scrollTop;
        } else { 
            cwidth = document.documentElement.clientWidth;
            cheight = document.documentElement.clientHeight;
            scrollleft = document.documentElement.scrollLeft == 0 ? document.body.scrollLeft : document.documentElement.scrollLeft;
            scrolltop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
        }
        m_left = (cwidth - iWidth) / 2 + scrollleft;
        m_top = (cheight - iHeight) / 2 + scrolltop;
    }
	
	//渲染限购的商品信息
	function showLimitItem(container_id,data){
		var spu_limit_item_rpt = new JSRepeater(container_id);
		spu_limit_item_rpt.ItemTemplate = SPU_LIMIT_ITEM_RPT_TEMPLATE;
		spu_limit_item_rpt.DataSource = data;
		spu_limit_item_rpt.DataBind();
	}
	
	//把商品放回购物车
	function backCart() {
        var productKeys="";
		for (var i = 0; i < m_data_source.length; i++){
			var items = m_data_source[i]['spu_limit_buy_items']
			for(var j=0;j<items.length;j++){
				productKeys += items[j].item_id + '_0_' + items[j].product_id+',';
			}
		}
		if (productKeys != "") {
            productKeys = productKeys.substring(0, productKeys.length - 1);
        }
		
		var postData = new Hashtable();
        postData.product_keys = productKeys;
        postData.is_uncheck_operation = true;

        deleteCartItemAjax.OnSucceed(function (result) {
			if ((+result.error_code) === 0) {
			   if (backCartCallback) {
					backCartCallback(result);
					dialog.closeDialog();
				}
			} else {
				alert("无法将商品放回购物车");
			}
        });
        deleteCartItemAjax.invokeServer(postData, "POST", true);
    }; 
	
	this.setDataSource = function (data_source) {
        m_data_source = data_source;
    };
	
	this.setCheckoutType = function (checkout_type) {
        m_checkout_type = checkout_type;
    };
	
	//显示限购弹窗
	this.show = function () {
        document.getElementById('shield_frame').style.height = document.body.clientHeight + "px";
		//渲染弹窗的标题和底部
		var spu_limit_panel = new JSPanel('spu_limit_dialog')
		spu_limit_panel.Template = SPU_LIMIT_TEMPLATE;
		spu_limit_panel.DataBind();
		//渲染spu信息
		var spu_limit_rpt = new JSRepeater('spu_limit_content');
		spu_limit_rpt.ItemTemplate = SPU_LIMIT_RPT_TEMPLATE;
		spu_limit_rpt.DataSource = m_data_source;
		spu_limit_rpt.DataBind();

		for (var i = 0; i < m_data_source.length; i++) {
			//渲染spu所属的商品信息
			showLimitItem('spu_limit_item_rpt_'+m_data_source[i]['main_product_id'],m_data_source[i]['spu_limit_buy_items']);
		}
		if(m_checkout_type == 5 || m_checkout_type == 7){
			$("#btn_back_cart").hide();
			$("#btn_go_cart").text("返回单品页修改数量");
			var productId=0;
			for (var i = 0; i < m_data_source.length; i++){
				var items = m_data_source[i]['spu_limit_buy_items']
				productId = items[0].product_id;
				break;
			}
			$("#btn_go_cart").click(function () { 
				location.replace("http://product.dangdang.com/"+productId+".html");
			});
		}else{
			//返回购物车
			$("#btn_go_cart").click(function () { 
				location.replace("http://shopping.dangdang.com/shoppingcart/shopping_cart.aspx");
			});
			//把限购品返回购物车
			$("#btn_back_cart").click(function (){ backCart();});
		}
		dialog = new DivModelDialogMove('spu_limit_container', 'spu_limit_title', 'spu_limit_close', 'div_shield', 'distribution_table', 'spu_limit_content', false);
        
		if (dialog != null) {
            SetSpuLimitPopPositon();
            dialog.show(m_left, m_top);
        }
    }
	//检查是否有spu限购商品
	this.check  = function(data){
		if(data!=null && data.length>0){
			return true;
		}
		return false;
	}
	
	//设置把商品放回购物车后的回调事件
	this.setBackCartSuccessCallback = function (fnCallback) {
        backCartCallback = fnCallback;
    };
}
