/**
 * Created by wai on 2015/7/6.
 */

//ʵ�ֵ��������ڰ�ť���ұߣ��ҵ������ڵױߺͰ�ť�ױ߸߶�һ��
function setRightTopLocation( btn, btn_pop, lnum ){//����id���ֱ��ǰ�ť�͵����ť�����Ĳ˵�, lnum��btn-pop����btn���ұ��ڼ���num������
    var left, top, width, t, pop;

    t = document.getElementById( btn );
    pop = document.getElementById( btn_pop );

    width = t.offsetWidth;
    top = getTop( t );//offsetHeight�Ǹ߼��ڱ߾�
    left = getLeft( t );
    //console.log(pop.offsetHeight+" " + t.offsetHeight);//���Բ��ֵ�Ԫ�ص�offsetHeightΪ0����

    pop.style.top = top - 31 + "px";// 31��btn-pop��btn�ĸ�31�����أ�����Ϊ������
    pop.style.left = left + width + lnum + "px";
}

var imgArray, numArray, index, timer;//ȫ�ֱ���(ͼƬ�л���
var daohangArray, booksSceneArray;//�������л���

$(document).ready( function(){

    /************���****************/
    //���þ��Բ��ֵĵ������ڵ�λ��
    setRightTopLocation( "body-left-select1", "body-left-pop1", 3 );
    setRightTopLocation( "body-left-select2", "body-left-pop2", 3 );
    setRightTopLocation( "body-left-select3", "body-left-pop3", 3 );
    setRightTopLocation( "body-left-select4", "body-left-pop4", 3 );

    //����
   $("#body-left-select1").bind( "mouseover", body_left_select_over1 );
   $("#body-left-pop1").bind( "mouseover", body_left_select_over1 );

    $("#body-left-select2").bind( "mouseover", body_left_select_over2 );
    $("#body-left-pop2").bind( "mouseover", body_left_select_over2 );

    $("#body-left-select3").bind( "mouseover", body_left_select_over3 );
    $("#body-left-pop3").bind( "mouseover", body_left_select_over3 );

    $("#body-left-select4").bind( "mouseover", body_left_select_over4 );
    $("#body-left-pop4").bind( "mouseover", body_left_select_over4 );

    //����
    $("#body-left-select1").bind( "mouseleave", body_left_select_leave1 );
    $("#body-left-pop1").bind( "mouseleave", body_left_select_leave1 );

    $("#body-left-select2").bind( "mouseleave", body_left_select_leave2 );
    $("#body-left-pop2").bind( "mouseleave", body_left_select_leave2 );

    $("#body-left-select3").bind( "mouseleave", body_left_select_leave3 );
    $("#body-left-pop3").bind( "mouseleave", body_left_select_leave3 );

    $("#body-left-select4").bind( "mouseleave", body_left_select_leave4 );
    $("#body-left-pop4").bind( "mouseleave", body_left_select_leave4 );

    /**************�м�****************/
    //ͼƬ�л�
    imgArray = $(".body-center-title-img");//���ϱ���
    numArray = $(".body-center-title-num");
    for( var i=0; i < numArray.length; i++ ){
        numArray[i].id = i;//[0,7]
        //����id������������ҳ���ϴ������¼����ɸ���id��������Ӧҳ�ţ�����indexֵ
    }

    index = 0;//��ǰ��ʾ��ͼƬ���±꣨ȫ�ֱ�����
    timer = setInterval( body_center_title, 2000 );//ÿ2sִ��һ��

    $(" .body-center-title-num").bind( "mouseover", function(){
        index = Math.floor(this.id);//��ǰԪ�ص�id��Ϊҳ��
        //Ҫ��ȡ��������ֱ�Ӹ�ֵindex����ַ��ͣ����Ժ���+1����ǿ��ת��Ϊ�ַ������ַ����ϲ�
        //console.log("change:" + index);
    });

    //ͨ���б����л���ͬ����
    daohangArray = $(".body-center-daohang-li");//�������б�
    booksSceneArray = $(".body-center-books");//������ĳ���

    //��ʼ��Ϊ��ѡ��״̬����ʾ��һ��������
    daohangArray.eq( 0 ).addClass("style_body-center-daohang-li-mouseover");
    booksSceneArray.eq( 0 ).css( "display", "block" );

    $.each( daohangArray, function( i, v ){
       daohangArray[i].id = 10 + i; //[10, 15]
        //����id�����������ڵ����ϴ������¼����ɸ���id��������Ӧ������
    });

    $(".body-center-daohang-li").bind( "mouseover", function(){
        var t = Math.floor( this.id );//ȡ��
        t = t - 10;
        $.each( booksSceneArray, function( i, v ){
            booksSceneArray.eq( i ).css( "display", "none" );//��������ʾ
            daohangArray.eq( i ).removeClass("style_body-center-daohang-li-mouseover");
            //��Ӧ������û��ѡ��
        });
        booksSceneArray.eq( t ).css( "display", "block" );
        $(this).addClass("style_body-center-daohang-li-mouseover");/*��ѡ�е�״̬*/
    });

});

/**********���************/
//����������
function body_left_select_over1(){
    $("#body-left-select1").addClass("style_body_left_select");
    $("#body-left-select1").css( "padding", "8px 15px");//ԭ�������ڱ߾���9px����ȥ�߿�1px��������8px
    $("#body-left-select1").css( "background-color", "white");//д��css����ûЧ����

    $("#body-left-pop1").css( "display", "block" );
}
function body_left_select_over2(){
    $("#body-left-select2").addClass("style_body_left_select");
    $("#body-left-select2").css( "padding", "8px 15px");
    $("#body-left-select2").css( "background-color", "white");

    $("#body-left-pop2").css( "display", "block" );
}
function body_left_select_over3(){
    $("#body-left-select3").addClass("style_body_left_select");
    $("#body-left-select3").css( "padding", "8px 15px");
    $("#body-left-select3").css( "background-color", "white");

    $("#body-left-pop3").css( "display", "block" );
}
function body_left_select_over4(){
    $("#body-left-select4").addClass("style_body_left_select");
    $("#body-left-select4").css( "padding", "8px 15px");
    $("#body-left-select4").css( "background-color", "white");

    $("#body-left-pop4").css( "display", "block" );
}

//����뿪
function body_left_select_leave1(){
    $("#body-left-select1").removeClass("style_body_left_select");
    $("#body-left-select1").css( "padding", "9px 15px");//�ָ�����
    $("#body-left-select1").css( "background-color", "#eee");//�޸�Ϊ����ɫ

    $("#body-left-pop1").css( "display", "none" );
}
function body_left_select_leave2(){
    $("#body-left-select2").removeClass("style_body_left_select");
    $("#body-left-select2").css( "padding", "9px 15px");
    $("#body-left-select2").css( "background-color", "#eee");

    $("#body-left-pop2").css( "display", "none" );
}
function body_left_select_leave3(){
    $("#body-left-select3").removeClass("style_body_left_select");
    $("#body-left-select3").css( "padding", "9px 15px");
    $("#body-left-select3").css( "background-color", "#eee");

    $("#body-left-pop3").css( "display", "none" );
}
function body_left_select_leave4(){
    $("#body-left-select4").removeClass("style_body_left_select");
    $("#body-left-select4").css( "padding", "9px 15px");
    $("#body-left-select4").css( "background-color", "#eee");

    $("#body-left-pop4").css( "display", "none" );
}

/*********�м�***********/
function body_center_title(){//ͼƬ�л�
    $.each( imgArray, function( i, v ){
        imgArray.eq( i ).css( "z-index", "1" );//ͼƬ
        numArray.eq( i ).css({//ҳ��
            color : "black",
            "background-color" : "white"
        });
    });
    imgArray.eq( index ).css( "z-index", "2"  );//ͼƬ�ö�
    numArray.eq( index ).css({//�޸�ҳ����ʽ
        color : "white",
        "background-color" : "red"
    });
    //console.log(index);
    //console.log( (index+1) );//ûȡ��ʱ����index= 3���˹��޸ĺ��index��1���Ϊ31
    index = ( index+1 ) % 8;//ѭ������
}
