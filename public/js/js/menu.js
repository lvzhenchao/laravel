/**
 * Created by wai on 2015/7/5.
 */

//��ȡ���Բ��ֵĿؼ����������ڣ���λ��
function getTop( e ){
    var offset = e.offsetTop;
    if(e.parent != null ) offset += getTop( e.offsetParent );
    return offset;
}
function getLeft( e ){
    var offset = e.offsetLeft;
    if(e.parent != null ) offset += getLeft( e.offsetParent );
    return offset;
}

//ʵ�ֵ��������ڰ�ť�����·�
function setUnderLocation( btn, btn_pop ){//����id���ֱ��ǰ�ť�͵����ť�����Ĳ˵�
    var left, top, height, t, pop;

    t = document.getElementById( btn );
    height = t.offsetHeight;
    top = getTop( t );
    left = getLeft( t );

    pop = document.getElementById( btn_pop );
    pop.style.top = top + height + "px";
    pop.style.left = left + "px";
}


$(document).ready( function() {

    //���þ��Բ��ֵĵ������ڵ�λ��
    setUnderLocation( "right-menu-ul2-li1", "right-menu-ul2-li1-pop" );
    setUnderLocation( "right-menu-ul2-li2", "right-menu-ul2-li2-pop" );
    setUnderLocation( "right-menu-ul3-li1", "right-menu-ul3-li1-pop" );
    setUnderLocation( "right-menu-ul3-li2", "right-menu-ul3-li2-pop" );

    //ul2
    $(".right-menu-ul2-li1").bind("mouseover", fun_over21 );
    $(".right-menu-ul2-li1").bind("mouseleave", fun_leave21 );
    $(".right-menu-ul2-li1-pop").bind("mouseover", fun_over21 );
    $(".right-menu-ul2-li1-pop").bind("mouseleave", fun_leave21 );

    //������ͬ���ķ���
    $(".right-menu-ul2-li2").bind("mouseover", fun_over22 );
    $(".right-menu-ul2-li2").bind("mouseleave", fun_leave22 );
    $(".right-menu-ul2-li2-pop").bind("mouseover", fun_over22 );
    $(".right-menu-ul2-li2-pop").bind("mouseleave", fun_leave22 );

    //ul3
    $(".right-menu-ul3-li1").bind("mouseover", fun_over31 );
    $(".right-menu-ul3-li1").bind("mouseleave", fun_leave31 );
    $(".right-menu-ul3-li1-pop").bind("mouseover", fun_over31 );
    $(".right-menu-ul3-li1-pop").bind("mouseleave", fun_leave31 );

    $(".right-menu-ul3-li2").bind("mouseover", fun_over32 );
    $(".right-menu-ul3-li2").bind("mouseleave", fun_leave32 );
    $(".right-menu-ul3-li2-pop").bind("mouseover", fun_over32 );
    $(".right-menu-ul3-li2-pop").bind("mouseleave", fun_leave32 );

});

//ul2
function fun_over21(){
    $(".right-menu-ul2-li1").addClass("menu-li-style");
    $(".right-menu-ul2-li1-pop").css("display", "block");
}
function fun_leave21(){
    $(".right-menu-ul2-li1").removeClass("menu-li-style");
    $(".right-menu-ul2-li1-pop").css("display", "none");
}

function fun_over22(){
    $(".right-menu-ul2-li2").addClass("menu-li-style");
    $(".right-menu-ul2-li2-pop").css("display", "block");
}
function fun_leave22(){
    $(".right-menu-ul2-li2").removeClass("menu-li-style");
    $(".right-menu-ul2-li2-pop").css("display", "none");
}

//ul3
function fun_over31(){
    $(".right-menu-ul3-li1").addClass("menu-li-style");
    $(".right-menu-ul3-li1-pop").css("display", "block");
}
function fun_leave31(){
    $(".right-menu-ul3-li1").removeClass("menu-li-style");
    $(".right-menu-ul3-li1-pop").css("display", "none");
}

function fun_over32(){
    $(".right-menu-ul3-li2").addClass("menu-li-style");
    $(".right-menu-ul3-li2-pop").css("display", "block");
}
function fun_leave32(){
    $(".right-menu-ul3-li2").removeClass("menu-li-style");
    $(".right-menu-ul3-li2-pop").css("display", "none");
}