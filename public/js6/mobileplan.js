//#region mobile_plan
var MOBILE_PLAN_READONLY_TEMPLATE =
"<h4>套餐信息<a class='ml-10' href='http://product.dangdang.com/product.aspx?product_id={product_id}&ref=checkout-0-A'>返回套餐选择页修改</a></h4>"
   + "<p class='contact-title'><b>您选择的合约套餐：{plan_name}</b></p>"
   + "<div class='net-infro'><i class='infro_title'>套餐网别：</i>{net_type}</div>"
   + "<div class='net-infro'><i class='infro_title'>套餐资费类型：</i>{plan_fee_type_name}</div>"
   + "<div class='net-infro'><i class='infro_title'>签约期：</i>{plan_period}个月</div>"
   + "<div class='net-infro'><i class='infro_title'>优惠购机：</i>{mobile_price}元</div>"
   + "<div class='net-infro'><i class='infro_title'>预存款：</i>{prestore_fee}元</div>"
   + "<div class='net-infro'><i class='infro_title'>号码预存话费：</i>{sim_card_balance}元</div>"
   + "<div class='net-infro'><i class='infro_title'>套餐月费：</i>{monthly_fee}元</div>"
   + "<div class='net-infro'><i class='infro_title'>每月返还金额：</i>{monthly_return_fee}元</div>"
   + "<div class='net-infro'><i class='infro_title'>入网当月返还金额：</i>{first_month_return_fee}元</div>"
   + "<div class='net-infro'><i class='infro_title'>返费金额说明：</i>{return_money_description}</div>"
   + "<div class='net-infro'><i class='infro_title'>送费金额说明：</i>{send_money_description}</div>"
   + "<div class='net-infro'><i class='infro_title'>超出短信资费：</i>{over_sms_cost}</div>"
   + "<div class='net-infro'><i class='infro_title'>城市：</i>{sim_card_province_name}，{sim_card_city_name}</div>"
   + "<div class='net-infro' style='height:auto'><i class='infro_title'>首月资费标准：</i>{first_month_fee_intro}</div>"




function MobilePlan(container_id) {
    var m_data_source = null;
    var m_mobile_plan_panel = new JSPanel(container_id);

    this.show = function() {
        m_mobile_plan_panel.Template = MOBILE_PLAN_READONLY_TEMPLATE;
        m_mobile_plan_panel.DataBind();
    };

    this.setDataSource = function (data_source) {
        m_data_source = data_source;
        m_mobile_plan_panel.DataSource = data_source;
    };
}
//#endregion mobile_plan