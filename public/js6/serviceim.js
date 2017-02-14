function serviceIm() {
    this.load = function (order_flow_data) {
        var sys_param = { entrance_code: 'pc_checkout_home', position_code: 'main', action: 'stats' };
        var im_param = { shop_id: "", order_price: "", products: [] };

        var order_array = order_flow_data['order_list'];

        for (var i = 0; i < order_array.length; i++) {
            if (i > 0) {
                im_param['shop_id'] += ",";
                im_param['order_price'] += ",";
            }
            im_param['shop_id'] += order_array[i]['shop_id'];
            im_param['order_price'] += order_array[i]['order_bargin_total'];
        }
        showImDialog(sys_param, im_param);
    }
}