var how_many_ads = 3;
var now = new Date();
var sec = now.getSeconds();
var num = sec % how_many_ads;
var ad_content=new Array(); 

ad_content[0] ='<A HREF=http://list.6park.com/parks/out.php?perm=nforex720a><img src=http://img.6park.com/img/forex/720a.gif WIDTH=728 HEIGHT=90 BORDER=0></A>'
ad_content[1] ='<A HREF=http://list.6park.com/parks/out.php?perm=nforex720a><img src=http://img.6park.com/img/forex/720a.gif WIDTH=728 HEIGHT=90 BORDER=0></A>'
ad_content[2] ='<A HREF=http://list.6park.com/parks/out.php?perm=nforex720b><img src=http://img.6park.com/img/forex/720b.gif WIDTH=728 HEIGHT=90 BORDER=0></A>'

document.write( ad_content[num]  ,"gl")