<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class contantController extends Controller
{
   public function upd()
   {
        $list = \DB::table('contant')->get();
        //dd($list);
        return view('/admin.content.system-category')->with('list',$list);
   }
   public function del($id)
   {
        // dd($id);
        $list = \DB::table('contant')->where('id',$id)->delete();
        $data = \DB::table('contant')->get();
        return view('/admin.content.system-category')->with('list',$data);
   }

   public function add()
   {
        return view('/admin.content.system-add');
   }

   public function urlAdd(Request $request)
   {
        $data = $request->only('name','url');
        \DB::table('contant')->insert($data);
        $list = \DB::table('contant')->get();
        //dd($list);
        return view('/admin.content.system-category')->with('list',$list);
   }
}
