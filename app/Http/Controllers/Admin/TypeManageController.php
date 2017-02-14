<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class TypeManageController extends Controller
{
    //遍历列表
	public function index()
	{
		//return 'nihaoma ';
		$list=\DB::select("select *,concat(path,'-',id) as npat from type order by npat asc");
		//dd($list);
		//return view('admin.content.product-list')->with('list',$list);
		/* echo '<pre>';
		var_dump($list);
		echo '</pre>'; */
		return view('admin.content.product-list')->with('list',$list);
	}
	
	
	//执行删除
	public function dodel($id=null)
	{
			
			$a=\DB::table('type')->where('id',$id)->value('pid');
			//return $a;
			if($a==0)  //pid=0为大类,那么去判断，这个大类底下是否还有小类，也就是
			//说小类的pid是否为大类的ID,
			{
				$result=\DB::table('type')->where('pid','=',$id)->get();
				if($result)
				{
					$a=\DB::table('type')->where('id','=',$id)->delete();
					//return redirect('admin.product-list');
					return '这是大类底下还有小类不能删';
				}
				else
				{
					return '这是大类，底下没有小类，可以删';
					//return redirect('admin.product-list');
				
				}
			
			}
			else
			{
				//如果是小类，那么就判断，这个小类底下是否还有商品，如果还有商品不能删除，如果没有就可以删除
				$d=\DB::table('goods')->where('tid','=',$id)->get();
				if(!empty($d))
				{
					return '这是小类，底下还有商品不能删';
					//return redirect('admin.product-list');
				
				}
				else
				{
					$a=\DB::table('type')->where('id','=',$id)->delete();
					if($a)
					{
						return '这是小类，底下没有商品可以删';
						//return redirect('admin.product-list');
					}
					else
					{
						return '这是小类，底下有商品不可以删';
						//return redirect('admin.product-list');
					}
				
				}
			
			}
	
	
	}
	
	
}