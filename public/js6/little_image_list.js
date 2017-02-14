/*
包装图预览列表
*/
function LittleImageList(objDiv) {

    var littleImageList = new JSRepeater(objDiv);
    var imageListData;

    littleImageList.ItemTemplate = "<div class='packing_pic' id='pp_little_image_{list}'><img style='width: 26px; height:26px;' src='{little_image_url}' alt=''><div class='packing_pic_big hide' style='right: -155px;z-index:100;height:150px;width:150px;background-color:white' id='pp_big_image_{list}'><img id='preview_big_image_{list}' src='{big_image_url}'  alt='' /></div></div>";
    //  little_image_list.DataSource = "{'image_list':[{'list':'1'},{'list':'2'}]}";
    var addEvent = function () {
        for (var i = 0; i < imageListData.length; i++) {
            var objLittle = "pp_little_image_" + imageListData[i].list;
            var objBig = "pp_big_image_" + imageListData[imageListData.length - 1].list;
            var objBigImage = "preview_big_image_" + imageListData[imageListData.length - 1].list;
            var bigImageUrl = imageListData[i].big_image_url;
            GiftCommon.mouseOverImage(objLittle, objBig, objBigImage, bigImageUrl);
        }
    };
    this.initData = function (result) {
        imageListData = result;
        littleImageList.DataSource = imageListData;
        littleImageList.DataBind();
        addEvent&&addEvent();
    };

   
}