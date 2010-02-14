var how_many_ads = 10;
var now = new Date();
var sec = now.getSeconds();
var num = sec % how_many_ads;
var ad_content=new Array(); 

ad_content[0] ='<A HREF=http://list.6park.com/parks/out.php?perm=vodgo.com><img src=http://am.6park.com/img/vodgo/vodgo3.jpg WIDTH=468 HEIGHT=60 BORDER=0></A>'

ad_content[1] ='<A HREF=http://list.6park.com/parks/out.php?perm=vodgo.com><img src=http://am.6park.com/img/vodgo/vodgo3.jpg WIDTH=468 HEIGHT=60 BORDER=0></A>'

ad_content[2] ='<A HREF=http://list.6park.com/parks/out.php?perm=straw><img src=http://img.6park.com/img/straw.gif WIDTH=468 HEIGHT=60 BORDER=0></A>'

ad_content[3] ='<A HREF=http://list.6park.com/parks/out.php?perm=liyi99><img src=http://img.6park.com/img/liyi99/46860.gif WIDTH=468 HEIGHT=60 BORDER=0></A>'

ad_content[4] ='<A HREF=http://list.6park.com/parks/out.php?perm=nforex468><img src=http://img.6park.com/img/forex/forex468.gif WIDTH=468 HEIGHT=60 BORDER=0></A>'

ad_content[5] ='<A HREF=http://list.6park.com/parks/out.php?perm=nforex468><img src=http://img.6park.com/img/forex/forex468.gif WIDTH=468 HEIGHT=60 BORDER=0></A>'

ad_content[6] ='<A HREF=http://list.6park.com/parks/out.php?perm=youzigift.com><img src=http://am.6park.com/img/youzigift/46860.gif WIDTH=468 HEIGHT=60 BORDER=0></A>'

ad_content[7] ='<A HREF=http://list.6park.com/parks/out.php?perm=italkbb><img src=http://img.6park.com/img/italkbb/46860us.gif WIDTH=468 HEIGHT=60 BORDER=0></A>'

ad_content[8] ='<A HREF=http://list.6park.com/parks/out.php?perm=xoom><img src=http://img.6park.com/img/xoom/46860.gif WIDTH=468 HEIGHT=60 BORDER=0></A>'

ad_content[9] ='<A HREF=http://list.6park.com/parks/out.php?perm=dreamlifeus><img src=http://img.6park.com/img/dreamlife/us46860.gif WIDTH=468 HEIGHT=60 BORDER=0></A>'

document.write( ad_content[num]  ,"gl")