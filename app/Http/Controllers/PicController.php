<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class PicController extends Controller
{
     public function artpic()
    {
        $list1 = \DB::select("select * from type where pid=1");
        $list2 = \DB::select("select * from goods where tid in(select id from type where pid='1')");

        $list[]=$list1;
        $list[]=$list2;
        // dd($list[1]);
        // dd($list);
        //return view('shopcity.web')->with("list",$list);
        $inf = \DB::table('web')->where('id',1)->get();
        //dd($inf);
        return view('shopcity.web')->with(["list"=>$list,"inf"=>$inf]);
    }

    //遍历具体书
    public function search($id){
        dd($id);
       
        return "$id";
    }



    //将头像信息写入数据库
    public function headPic(Request $request){
    	// dd ($request->all());
    	$id = $request->id;
    	$headpic = $request->headpic;
    	$affected = \DB::update("update user set headpic = '".$headpic."' where id = ?", [$id]);
    	$ob = \DB::table('user')->where("id",$id)->first();
    	session()->set("adminuser",$ob);
    }
    //上传头像
    public function picupdate(Request $request) {
        // echo "111";
        //判断是否有上传
        if($request->hasFile("Myfile")){
            // echo $request->id;
            //获取上传信息
            $file = $request->file("Myfile");
            //确认上传的文件是否成功
            if($file->isValid()){
                $picname = $file->getClientOriginalName(); //获取上传原文件名
                $ext = $file->getClientOriginalExtension(); //获取上传文件名的后缀名
                //执行移动上传文件
                $filename = time().rand(1000,9999).".".$ext;
                                
                $file->move("images",$filename);
                $id = $request->id;
                
                $str = "images/".$filename;
                // echo $headpic;
                // echo $headpic;
                $affected = \DB::update("update user set headpic = '".$str."' where id = ?", [$id]);
                $ob = \DB::table('user')->where("id",$id)->first();
                session()->set("adminuser",$ob);
                // exit();
            }
        }
    }


    //二级页面左侧边栏遍历
    public function zmune()
    {
        $list1 = \DB::table('type')->get();
        $list2 = \DB::table('goods')->get();
        $list[]=$list1;
        $list[]=$list2;
        return view('shopcity.bigtype.wenyi')->with("list",$list);
        // dd($list);
    }
    //二级页面图书遍历
    public function bianli(Request $request)
    {
        // echo $request->id;
        // echo $request->order;

        if(!empty($request->id) && !empty($request->order)){
            $blist = \DB::table('goods')->where('tid',$request->id)->orderBy($request->order,'desc')->get();
        }elseif(empty($request->id)){
            $blist = \DB::table('goods')->orderBy($request->order,'desc')->get();
        }elseif(empty($request->order)){
            $blist = \DB::table('goods')->where('tid',$request->id)->get();
        }
        return $blist;
    }


    //后台的系统配置方法
    public function upsys(Request $request)
    {
        $data = $request->only('title','keyword','des','copyight','switch');
        $v = \DB::table('web')->where('id','=',1)->update($data);
        return view('admin.content.system-base');
    }

}
