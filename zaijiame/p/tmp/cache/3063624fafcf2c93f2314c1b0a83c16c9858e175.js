function winload()
{
layer1.style.top=260;
layer1.style.left=16;
layer2.style.top=260;
layer2.style.right=16;


layer3.style.top=1560;
layer3.style.left=16;
layer4.style.top=1560;
layer4.style.right=16;
}

if(document.body.offsetWidth>1200){
	{
document.write("<div id=layer1 style='position: absolute;visibility:visible;z-index:1'><a href=http://list.6park.com/parks/out.php?perm=forex100300 target=_blank><img src='http://am.6park.com/img/forex/100300.gif' WIDTH=100 HEIGHT=300 border=0></a><br><img src='http://www.6park.com/wap/close.gif' onClick='javascript:window.hide()' width='100' height='14' border='0' vspace='3' alt='关闭对联广告'></div>"
	+"<div id=layer2 style='position: absolute;visibility:visible;z-index:1'><a href=http://list.6park.com/parks/out.php?perm=shengfa target=_blank><img src='http://am.6park.com/img/shengfa/100300.gif' WIDTH=100 HEIGHT=300 border=0></a><br><img src='http://www.6park.com/wap/close.gif' onClick='javascript:window.hide()' width='100' height='14' border='0' vspace='3' alt='关闭对联广告'></div>"
	+"<div id=layer3 style='position: absolute;visibility:visible;z-index:1'><a href=http://www.talkfor.com target=_blank><img src='http://img.6park.com/img/talkfor/100300.jpg' WIDTH=100 HEIGHT=300 border=0></a><br><img src='http://www.6park.com/wap/close.gif' onClick='javascript:window.hide2()' width='100' height='14' border='0' vspace='3' alt='关闭对联广告'></div>"
	+"<div id=layer4 style='position: absolute;visibility:visible;z-index:1'><a href=http://asiafriendfinder.com/go/f155839 target=_blank><img src='http://img.6park.com/img/asiafriend/100300.gif' WIDTH=100 HEIGHT=300 border=0></a><br><img src='http://www.6park.com/wap/close.gif' onClick='javascript:window.hide2()' width='100' height='14' border='0' vspace='3' alt='关闭对联广告'></div>","gl");
	}
  winload()
}


function hide()  
{

layer1.style.visibility="hidden"; 
layer2.style.visibility="hidden";
}


function hide2()  
{   
layer3.style.visibility="hidden"; 
layer4.style.visibility="hidden";
}
