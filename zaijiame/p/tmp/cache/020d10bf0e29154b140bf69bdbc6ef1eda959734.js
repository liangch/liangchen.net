/*******************************************************************
%# -*- coding=utf-8 -*-
**--> Description: test
**--> Author��lizus.com@gmail.com
**--> WebSite��http://lizus.com
*******************************************************************/

$(function(){	
	ad_show_init();
});

function ad_show_init(){
	var id='btn_ad_show';//�趨Ҫ�����½��ƶ�ʹ�õĿ��ID����;
	var ad_width='350px';//�趨��Ŀ��;
	var ad_height='320px';//�趨��ĸ߶�;
	var i='content';//�趨�ƶ����ݵ�ID������,һ����������,������������ͬID;
	var close_type='close';//���Ͻ�Close��ť���ö���ѡ��,��������ֵ:close(��ʾ�����ر�),menu(��ʾ��С�ڵײ�);
	var ad_id=$('#'+id).attr('id');
	var html=document.getElementById(ad_id).innerHTML;
	//document.getElementById(ad_id).innerHTML=parseHTML('<div id=\''+id+i+'\'><div id=\''+id+i+'html\''+html+'</div><a href=\'#\' id=\'close_'+i+'\'><span>Close</span></a><div id=\''+id+i+'menu\'><a href=\'#\' id=\'open_'+i+'\'><img src=\'http://reviews.imp3.net/onda/vx575hd/c46.jpg\' width=\'300px\' height=\'60px\' alt=\'open\' /></a></div></div>');//����img��src��������Сʱ��ʾͼ�ĵ�ַ,�����width,height�ֱ�����ͼ�Ŀ�͸�;
	document.getElementById(ad_id).innerHTML=parseHTML('<div id=\''+id+i+'\'><div id=\''+id+i+'html\''+html+'</div><a href=\'#\' id=\'close_'+i+'\'></a><div id=\''+id+i+'menu\'><a href=\'#\' id=\'open_'+i+'\'><img src=\'http://reviews.imp3.net/onda/vx575hd/c46.jpg\' width=\'300px\' height=\'60px\' alt=\'open\' /></a></div></div>');//����img��src��������Сʱ��ʾͼ�ĵ�ַ,�����width,height�ֱ�����ͼ�Ŀ�͸�;
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
	$('#close_'+i).css({//����Close��ʽ��λ��;�����ƶ�λ�õĻ���ɾ��right:0,����Ϊleft:0,���е�ֵΪ����ľ���,��0֮�������px,��ʽ��width��ֵ;
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
	var tt=setTimeout(ad_show,5000);//������;


	function ad_show(){
		
		$('#'+id+i).animate({bottom:0},2000);//�˴����������ƶ��ٶ�;
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
			$('#'+id+i).animate({bottom:0},2500);//�˴����������ƶ��ٶ�;
			$('#'+id+i+'menu').hide();
			return false;
		});
		
		
		$(window).scroll(function(){//���ڹ���ʱ��̬����,�����޸�;
			div_init(id,ad_width,ad_height);
		})
		$(window).resize(function(){//���ڸı��Сʱ��̬����,�����޸�;
			div_init(id,ad_width,ad_height);
		})
		
	}
}


function div_init(id,ad_width,ad_height){//�趨�鶨λ�ĺ���,�����޸�;
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
	// var ad_left=left+add_left-parseInt(ad_width)+'px';//���������߶�λ;
	var ad_left="0px";
	var ad_top=top+add_top-parseInt(ad_height)+'px';//��������ϱ߶�λ;
	$('#'+id).css({
		left:ad_left,
		top:ad_top
	})
}