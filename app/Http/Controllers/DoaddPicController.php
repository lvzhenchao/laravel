<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class DoaddPicController extends Controller
{
    //
	
	public function deal(Request $request){
		//dd($request);
		//执行图片上传，必须上传了图片才能是插入数据库
	//return $request->input();
	if($request->hasFile('mypic'))
	{
			  $file=$request->file('mypic');

			 if($file->isValid())
			{
				$ext = $file->getClientOriginalExtension();//获得后缀 
				$filename = time().rand(1000,9999).".".$ext;//新文件名
			
				$file->move("./admins/upimages/",$filename);
				$filepath='./admins/upimages/'.$filename;  //获得图片地址，对应goods里的pic字段
						//把数据存入数据库
				 $arr=$request->input();
				//dd($arr);
				$a=array();
				foreach($arr as $key=>$value)
				{
					if($key!=='_token')
					{
						if(empty($value))
						{
							$value=null;
							$a[$key]=$value;
						
						
						}
						else
						{
							$a[$key]=$value;
						
						}
						
						
					}
				}
			} 
			$a['pic']=$filepath;
			//return $a;
			
			$b=\DB::table('goods')->insertGetId([
				'bookname'=>$a['bookname'],
				'author'=>$a['writer'],
				'pagenum'=>$a['pagenum'],
				'wordnum'=>$a['wordnum'],
				'publish'=>$a['publish'],
				'pubtime'=>$a['pubtime'],
				'isdn'=>$a['isdn'],
				'onsale'=>$a['onsale'],
				'newprice'=>$a['price'],
				'brief'=>$a['brief'],
				'pic'=>$a['pic']			
			]);
			if($b>0)
			{
				//return 'charucheng';
			
			} 
			
			if($request->has('sid'))
			{
				$xiaolei=$request->input('sid');
				$t=\DB::table('type')->where('name',$xiaolei)->value('id');
				if($t>0)
				{
					//return $t;
					$r=\DB::table('goods')->where('id',$b)->update(['tid'=>$t]);
					if($r>0)
					{
						return view('admin.content.picture-add');
					}
					else
					{
						return 'hiaisaosaoosoao';
					}
					
				}
				else
				{
					return 'shiai';
					
				}
			}
			
			
			
			
			
			
			
			
	}
	else
	{
		return '请上传为.jpg格式的图片';
		
	}  
		
		
			
			
		 
	}	 
	
	
	
	public function piclist(Request $request)
	{
		
		
		
		$list=\DB::select("select goods.*,type.name from goods,type where goods.tid=type.id");
		//dd($list);
		return view('admin.content.picture-list')->with('list',$list);
		
	
	
	
	
	
	}
	
	
	
	public function dodell($id=null)
	{
		$delnum=\DB::table('goods')->where('id','=',$id)->delete();
		if($delnum>0)
		{
			return redirect('admin/picture-list/');
		}
		else
		{
			return '删除失败';
		}
	
	}
	
	//执行上下架
	public function onsheet($id=null,$sale=null)
	{
		
		if($sale==null||$id==null)
		{
			return redirect('admin/picture-list/');
		
		
		}
		else
		{
			$affnum=\DB::table('goods')->where('id',$id)->first();
			if($affnum->onsale=='0')
			{
				$ko=\DB::table('goods')
						->where('id',$id)
						->update(['onsale'=>'1']);
				return redirect('admin/picture-list/');
				
			} 
			else
			{
				\DB::table('goods')
						->where('id',$id)
						->update(['onsale'=>'0']);
				//return redirect('/picture-list/');
				return redirect('admin/picture-list/');
			}
		
		
		
		
		}
		
		
		
		
	
	}
	
	
	//修改信息//分类如何选择
	public function mend($id=null)
	{
		
	
	$shame=\DB::table('goods')->where('id','=',$id)->first();
	//dd($shame);
	
	$tid=$shame->tid;
	
	$xa=$a=\DB::table('type')->where('id','=',$tid)->value('name');  //小类的名字
	
	
	$a=\DB::table('type')->where('id','=',$tid)->value('pid');  //得到pid
	//return $a;
	//$test=\DB::select("select name from type where id=('select pid from type where id=$tid)" );
	$b=\DB::table('type')->where('id','=',$a)->value('name');   //得到大类的名字
	//return $b;
	//return $test;
	
	return view('admin.content.picture-edit')->with('list',$shame)->with('sad',$b)->with('xa',$xa);
	
	}
	
	
	
	
	//执行修改信息
	public function domend(Request $request)
	{
		  //dd($request);
		 // return 111;
		 if($request->hasFile('mypic'))
		{
				  $file=$request->file('mypic');

				 if($file->isValid())
				{
					$ext = $file->getClientOriginalExtension();//获得后缀 
					$filename = time().rand(1000,9999).".".$ext;//新文件名
				
					$file->move("./admins/upimages/",$filename);
					$filepath='./admins/upimages/'.$filename; 
					 $arr=$request->input();
					//dd($arr);
					$a=array();
					 foreach($arr as $key=>$value)
					{
						if($key!=='_token')
						{
							$a[$key]=$value;
								
						}
					} 
				} 
				$a['pic']=$filepath;
				//dd($a);
				$d=\DB::table('goods')->where('id',$a['gid'])
					->update(['bookname'=>$a['bookname'],'author'=>$a['writer'],'publish'=>$a['publish'],'pagenum'=>$a['pagenum'],'wordnum'=>$a['wordnum'],'isdn'=>$a['isdn'],'newprice'=>$a['price']]);  
					$f=\DB::table('goods')->where('id',$a['gid'])->update(['author'=>$a['writer'],'bookname'=>$a['bookname'],'publish'=>$a['publish'],'pagenum'=>$a['pagenum'],'wordnum'=>$a['wordnum'],'isdn'=>$a['isdn'],'newprice'=>$a['price'],'pubtime'=>$a['pubtime'],'newprice'=>$a['price'],'brief'=>$a['brief'],'pic'=>$a['pic']]);
				if($f>0)
				{
					return redirect('admin/picture-list');
				}
				else
				{
					return redirect('admin/picture-list');
				}
					
		
		}
		else
		{
			$arr=$request->input();
			$a=array();
					 foreach($arr as $key=>$value)
					{
						if($key!=='_token')
						{
							$a[$key]=$value;
								
						}
					} 
			//dd($a);
			
		$t=\DB::table('goods')->where('id',$a['gid'])->update(['author'=>$a['writer'],'bookname'=>$a['bookname'],'publish'=>$a['publish'],'pagenum'=>$a['pagenum'],'wordnum'=>$a['wordnum'],'isdn'=>$a['isdn'],'newprice'=>$a['price'],'pubtime'=>$a['pubtime'],'newprice'=>$a['price'],'brief'=>$a['brief']]);
			if($t>0)
			{
				//return 123;
				return redirect('/admin/picture-list');
			}
			else
			{
				//return 123;
				return redirect('/admin/picture-list');
			
			
			} 
		
		} 
		
	
	
	
	
	}	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
}
