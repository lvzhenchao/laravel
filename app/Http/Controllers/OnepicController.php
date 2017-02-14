<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class OnepicController extends Controller
{
    //
	public function index(Request $request,$id=0)
	{
		//$request->session()->flush();
		$list=\DB::select("select * from goods where id=".$id);
		
		//var_dump($list);
		$schme=\DB::select("select content from discuss where gid=".$id);
		//var_dump($schme);

		//把商品xin加入session中
		//$a=array();
		//$b=session()->set($a[$id],$list);

		session()->set('sad',$list);
		//dd(session('adminuser'));
		// $molihua=array();
		 // $request->session()->push("molihua.".$id,$list);
		// dd( $request->session()->all());


			//$request->session()->put($id,$list);
		
		return view('shopcity.books.shu')->with('list',$list)->with('schme',$schme);
		
	
	
	
	}
	
	
	
}
