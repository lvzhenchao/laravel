/**
 * Created by wai on 2015/7/5.
 */

function setRightLocation( btn, btn_pop ){//����id���ֱ��ǰ�ť�͵����ť�����Ĳ˵�
    var left, top, width, t, pop;

    t = document.getElementById( btn );
    width = t.offsetWidth;
    top = getTop( t );
    left = getLeft( t );

    pop = document.getElementById( btn_pop );
    pop.style.top = top  + "px";
    pop.style.left = left + width + "px";
}

$(document).ready( function(){

    //���þ��Բ��ֵĵ������ڵ�λ��
    setUnderLocation( "text-btn", "text-btn-pop" );
    setRightLocation( "text_input", "text-btn" );

    $("a").click( function(){//�����������תҳ��
        location.assign("local.html");//������ҳ��
    });

   $("#text_input").click( function(){
     $(this).val("");//�޸�����Ϊ��
   });

    //��ȫ�����ࡱ��ť�����˵�����
    $(".text-btn").bind( "mouseover", text_btn_pop_over );
    $(".text-btn-pop").bind( "mouseover", text_btn_pop_over );
    $(".text-btn").bind( "mouseleave", text_btn_pop_leave );
    $(".text-btn-pop").bind( "mouseleave", text_btn_pop_leave );

});

function text_btn_pop_over(){
    $(".text-btn-pop").css("display", "block");
}
function text_btn_pop_leave(){
    $(".text-btn-pop").css("display", "none");
}