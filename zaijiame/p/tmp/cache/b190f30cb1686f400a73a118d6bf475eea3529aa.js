/*
	功能：Evolife主站评论模块快捷回复功能实现
	作者：董小波
	时间：2009-1-9
*/

var dialogID = "#quick_reply"; //快捷回复对话框ID
var dialogHeaderID = "#qr_header"; //对话框头部ID
var dialogTextareaID = "#qr_content"; //快捷回复内容textarea ID
var dialogIncreaseBtnID = "#qr_increase";
var dialogDecreaseBtnID = "#qr_decrease";
var dialogCloseBtnID = "#qr_close";
var dialogTipID = "#tip_field";
var dialogFormID = "#qr_form";
var dialogFormSubmitID = "#qr_submit";
var dialogRepliedID = "#replied_id";
var dialogAuthorID = "#qr_author";
var dialogPostID = "#comment_post_ID";
var commentListsID = "#comment_lists";
var dialogCommentContent = ".quoted_comment > fieldset > p";

/*
	功	能：弹出快捷回复对话框，并对回复ID进行初始化
	参	数：被回复评论ID
	返回值：成功，返回true；失败，返回false
*/
function dxbReply( repliedID ){
	try{
		//获取并初始化对话框top/left值
		var dialogPosition = dxbGetDialogPosition(); 
		if( dialogPosition == false ){
			alert( "脚本错误，请刷新页面重新尝试回复" );
			exit();
		}
		$( dialogID ).css( "top", dialogPosition.top );
		$( dialogID ).css( "left", dialogPosition.left );
		$( dialogRepliedID ).attr( "value", repliedID );
		$( ".qr_title > label" ).html( $("h3[class='til'] > a").text() );
		var quotedCommentID = "#comment-" + repliedID + " > div[class='txt'] > #comment_content > p";
		$( dialogCommentContent ).html( $( quotedCommentID ).text() );
		$( dialogID ).show( "drop" );
	}catch( e ){
		return false;
	}
}

/*
	功	能：通过获得当前屏幕的分辨率，计算回复对话框的top/left值
	参	数：无
	返回值：成功，返回包含回复对话框top/left值的对象直接量；失败，返回false
*/
function dxbGetDialogPosition(){
	try{
		var position = { top:0, left:0 };
		var clientHeight, clientWidth;
		var scrollTop, scrollLeft;
		if( isIE() ){ //IE浏览器
			clientHeight = (document.documentElement && document.documentElement.clientHeight) ? document.documentElement.clientHeight : document.body.offsetHeight;
			clientWidth = ( document.documentElement && document.documentElement.clientWidth ) ? document.documentElement.clientWidth : document.body.offsetWidth;
			scrollTop = (document.documentElement && document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop;
			scrollLeft = (document.documentElement && document.documentElement.scrollLeft) ? document.documentElement.scrollLeft : document.body.scrollLeft;
		}else{ //非IE浏览器
			clientHeight = window.innerHeight;
			clientWidth = window.innerWidth;
			scrollTop = window.pageYOffset;
			scrollLeft = window.pageXOffset;
		}
		var dialogHeight = $( dialogID ).height();
		var dialogWidth = $( dialogID ).width();
		position.top = scrollTop + clientHeight/2 - dialogHeight/2;
		position.left = scrollLeft + clientWidth/2 - dialogWidth/2;
		return position;
	}catch( e ){
		return false;
	}
}

/*
	功	能：判断当前浏览器是否为IE
	参	数：无
	返回值：是，则返回true；否，则返回false
*/
function isIE(){
	return ( navigator.userAgent.indexOf( "MSIE" ) > 0 );
}

/*
	功	能：去除字符串首、尾部的空白字符、空格、制表符、换页符等
	参	数：字符串
	返回值：字符串
*/
function trim( str ){
	return str.replace( /(^\s*)|(\s*$)/g, "" );
}

/*
	功	能：初始化回复对话框各项属性和响应事件
	参	数：无
	返回值：无
*/
function dxbInitDialog(){
	try{

		//鼠标在回复对话框头部按住左键不放时，鼠标指针变成十字形状
		$( dialogHeaderID ).mousedown( function(){
			$( this ).css( "cursor", "move" );
			$( dialogID ).draggable(); //使回复对话框可拖动
		} );
		//松开左键，鼠标指针恢复正常的指针
		$( dialogHeaderID ).mouseup( function(){
			$( this ).css( "cursor", "default" );
			$( dialogID ).draggable( "destroy" ); //使回复对话框可拖动
		} );
		//调整评论输入框高度
		$( dialogIncreaseBtnID ).mouseover( function(){
			$( this ).css( "background", "url(http://www.izaobao.us/wp-content/themes/illacrimo/images/ta-increase-b.gif) center center no-repeat" );
		} );
		$( dialogIncreaseBtnID ).mouseout( function(){
			$( this ).css( "background", "url(http://www.izaobao.us/wp-content/themes/illacrimo/images/ta-increase.gif) center center no-repeat" );
		} );
		$( dialogDecreaseBtnID ).mouseover( function(){
			$( this ).css( "background", "url(http://www.izaobao.us/wp-content/themes/illacrimo/images/ta-decrease-b.gif) center center no-repeat" );
		} );
		$( dialogDecreaseBtnID ).mouseout( function(){
			$( this ).css( "background", "url(http://www.izaobao.us/wp-content/themes/illacrimo/images/ta-decrease.gif) center center no-repeat" );
		} );
		$( dialogIncreaseBtnID ).click( function(){ //减少评论输入框高度
			var $ta = $( dialogTextareaID );
			$ta.height( $ta.height() - 20 );
		} );
		$( dialogDecreaseBtnID ).click( function(){ //增加评论输入框高度
			var $ta = $( dialogTextareaID );
			$ta.height( $ta.height() + 20 );
		} );
		$( dialogTextareaID ).focus();
		$( dialogCloseBtnID ).click( function(){
			$( dialogID ).hide( "drop" );
		} );
		$( dialogTextareaID ).click( function(){ 
			$( dialogTipID ).hide();
		} );
		$( dialogFormID ).submit( function(){ //快捷回复递交后响应事件
			//$( dialogFormSubmitID ).attr( "disabled", "true" );
			//$( dialogFormSubmitID ).html( "请稍候..." );
			//$( dialogTextareaID ).attr( "disabled", "true" );
			var commentContent = $( dialogTextareaID ).val();
			if( trim( commentContent ) == "" ){ //判断用户输入的内容是否为空
				$( dialogTipID ).html( "请填写评论的内容，谢谢合作^^" );
				$( dialogTipID ).show();
				$( dialogTextareaID ).focus();
				return false;
			}else{
				$( dialogFormSubmitID ).attr( "disabled", "true" );
				$( dialogFormSubmitID ).html( "请稍候..." );
				$( dialogTextareaID ).attr( "disabled", "true" );
				commentContent = escape( commentContent );
				commentContent = commentContent.replace( /%0A/ig, "<br/>" ); //将回车替换为<br/>
				commentContent = commentContent.replace( /%20/ig, "&nbsp;" ); //将空格键转换为&nbsp;
				commentContent = unescape( commentContent );
				$.post(
					"http://www.izaobao.us/wp-comments-post.php?inajax=1",
					{ comment_post_ID : $( dialogPostID ).val(), author : $( dialogAuthorID ).val(), comment : commentContent, reply_to : $( dialogRepliedID ).val() },
					function( data ){
						$( dialogID ).hide( "drop" );
						$( dialogFormSubmitID ).removeAttr( "disabled" );
						$( dialogFormSubmitID ).html( "提交留言" );
						$( dialogTextareaID ).removeAttr( "disabled" );
						window.location.href = parseURL(data);
						window.location.reload();
						//alert( data );
					}
				);
				return false;
			}
			return false;
		} );

		var targetAnchor = window.location.hash; //实现页面刷新后锚点跳转
		var anchorTop = $( targetAnchor ).offset().top;
		window.scrollTo( 0, anchorTop );

	}catch( e ){
	}
}

/*
	功	能：对用户评论进行打分操作
	参	数：comment_id - 被打分的评论的ID; score - 对评论所评分数；
	返回值：成功，返回指定ID评论某个等级的总得票数；失败，返回false
*/
function dxbDeclare( cid, user_score ){
	cid = parseInt( cid );
	user_score = parseInt( user_score );
	$.post( 
		"http://www.izaobao.us/gezi-quick-reply.php?inajax=1",
		{ score : user_score, comment_id : cid },
		function( data ){
			data = parseInt( data );
			if( data > 0 ){
				switch( user_score ){
					case 1:
						$( "#supported_" + cid ).html( "<span class=\"red\">已支持[" + data + "]</span>" );
					break;
					case 0:
						$( "#neutral_" + cid ).html( "[已中立" + data + "]" );
					break;
					case -1:
						$( "#opposed_" + cid ).html( "已反对[" + data + "]" );
					break;
					default:
						alert( "Unknown score." );
						return;
					break;
				}
			}else{
				alert( data );
				return;
			}
		}
	);
}

$( document ).ready( function(){
	dxbInitDialog();
} );