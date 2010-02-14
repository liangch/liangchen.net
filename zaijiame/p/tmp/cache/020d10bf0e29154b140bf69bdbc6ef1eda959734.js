/*******************************************************************
%# -*- coding=utf-8 -*-
**--> Description: test
**--> Author：lizus.com@gmail.com
**--> WebSite：http://lizus.com
*******************************************************************/

$(function(){	
	ad_show_init();
});

function ad_show_init(){
	var id='btn_ad_show';//设定要从右下角移动使用的块的ID号码;
	var ad_width='350px';//设定块的宽度;
	var ad_height='320px';//设定块的高度;
	var i='content';//设定移动内容的ID后内容,一般无需设置,除非正好有相同ID;
	var close_type='close';//右上角Close按钮设置动作选项,可以设置值:close(表示点击则关闭),menu(表示缩小在底部);
	var ad_id=$('#'+id).attr('id');
	var html=document.getElementById(ad_id).innerHTML;
	//document.getElementById(ad_id).innerHTML=parseHTML('<div id=\''+id+i+'\'><div id=\''+id+i+'html\''+html+'</div><a href=\'#\' id=\'close_'+i+'\'><span>Close</span></a><div id=\''+id+i+'menu\'><a href=\'#\' id=\'open_'+i+'\'><img src=\'http://reviews.imp3.net/onda/vx575hd/c46.jpg\' width=\'300px\' height=\'60px\' alt=\'open\' /></a></div></div>');//其中img的src可设置缩小时显示图的地址,后面的width,height分别设置图的宽和高;
	document.getElementById(ad_id).innerHTML=parseHTML('<div id=\''+id+i+'\'><div id=\''+id+i+'html\''+html+'</div><a href=\'#\' id=\'close_'+i+'\'></a><div id=\''+id+i+'menu\'><a href=\'#\' id=\'open_'+i+'\'><img src=\'http://reviews.imp3.net/onda/vx575hd/c46.jpg\' width=\'300px\' height=\'60px\' alt=\'open\' /></a></div></div>');//其中img的src可设置缩小时显示图的地址,后面的width,height分别设置图的宽和高;
	$('#'+id).css({
		width:ad_width,
		height:ad_height,
		position:'absolute',
		overflow:'hidden'
	})
	div_init(id,ad_width,ad_height);
	$('#'+id+i).css({
		width:ad_width,
		height:ad_height,
		position:'absolute',
		left:0,
		bottom:'-'+ad_height
	})
	$('#close_'+i).css({//调整Close样式和位置;左右移动位置的话请删除right:0,更改为left:0,其中的值为至左的距离,除0之外请添加px,形式如width的值;
		color:'#fff',
		position:'absolute',
		display:'block',
		width:'30px',
		height:'20px',
		'line-height':'20px',
		'text-align':'center',
		right:0,
		top:0
	});
	
	$('#'+id+i+'menu').css({
		position:'absolute',
		left:0,
		top:0,
		height:'20px',
		width:ad_width,
		'line-height':'20px',
		display:'none'
	});
	var tt=setTimeout(ad_show,5000);//载入广告;


	function ad_show(){
		
		$('#'+id+i).animate({bottom:0},2000);//此处可修正块移动速度;
		if (close_type=='close') {
			$('#close_'+i).live('click',function(){
				$('#'+id+i).stop();
				html=document.getElementById(id+i+'html').innerHTML;
				document.getElementById(id+i+'html').innerHTML=parseHTML('<span></span>');
				$('#'+id).hide();
				return false;
			});
		}
		if (close_type=='menu') {
			$('#close_'+i).live('click',function(){
				$('#'+id+i).stop();
				html=document.getElementById(id+i+'html').innerHTML;
				document.getElementById(id+i+'html').innerHTML=parseHTML('<span></span>');
				$('#'+id+i).animate({bottom:'-'+(parseInt(ad_height)-20)+'px'},100);
				$('#'+id+i+'menu').show();
				return false;
			});
		}
		$('#open_'+i).live('click',function(){
			document.getElementById(id+i+'html').innerHTML=parseHTML(html);
			$('#'+id+i).animate({bottom:0},2500);//此处可修正块移动速度;
			$('#'+id+i+'menu').hide();
			return false;
		});
		
		
		$(window).scroll(function(){//窗口滚动时动态跟随,无须修改;
			div_init(id,ad_width,ad_height);
		})
		$(window).resize(function(){//窗口改变大小时动态跟随,无须修改;
			div_init(id,ad_width,ad_height);
		})
		
	}
}


function div_init(id,ad_width,ad_height){//设定块定位的函数,无须修改;
	var top=window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop
                || 0;
	var left=window.pageXOffset
                || document.documentElement.scrollLeft
                || document.body.scrollLeft
                || 0;
	var add_top=document.documentElement.clientHeight
	var add_left=document.documentElement.clientWidth
	// var ad_left=left+add_left-parseInt(ad_width)+'px';//调整块的左边定位;
	var ad_left="0px";
	var ad_top=top+add_top-parseInt(ad_height)+'px';//调整块的上边定位;
	$('#'+id).css({
		left:ad_left,
		top:ad_top
	})
}