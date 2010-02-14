var how_many_ads = 4;
var now = new Date();
var sec = now.getSeconds();
var num = sec % how_many_ads;
num +=1;
var ad_content=new Array(); 

ad_content[1] ='<table width=948 border=0 bgcolor=#fbfeea align=center><tr><td> <a href="http://list.6park.com/parks/out.php?perm=timecool.com" target="_blank"><img src="http://am.6park.com/img/timecool/46860a.gif" width="468" height="60" border="0"></a></td><td><A HREF="http://list.6park.com/parks/out.php?perm=utocn" target=_blank><img src=http://img.6park.com/img/utocn/46860.gif WIDTH=468 HEIGHT=60 BORDER=0></A></td></tr></table>'
ad_content[2] ='<table width=948 border=0 bgcolor=#fbfeea align=center><tr><td><A HREF=http://list.6park.com/parks/out.php?perm=liyi99 target=_blank><img src=http://am.6park.com/img/liyi468.gif WIDTH=468 HEIGHT=60 BORDER=0></A></td><td> <a href=http://list.6park.com/parks/out.php?perm=jojosf target=_blank><img src=http://am.6park.com/img/jojosf/46860.gif width=468 height=60 border=0></a></td></tr></table>'
ad_content[3] ='<table width=948 border=0 bgcolor=#fbfeea align=center><tr><td><a href="http://list.6park.com/parks/out.php?perm=buy0086" target=_blank><img src=http://img.6park.com/img/buy0086/46860.gif width=468 height=60 border=0></a></td><td><a href="http://list.6park.com/parks/out.php?perm=jojosf" target="_blank"><img src="http://am.6park.com/img/jojosf/46860.gif" width="468" height="60" border="0"></a></td></tr></table>'
ad_content[4] ='<table width=948 border=0 bgcolor=#fbfeea align=center><tr><td><a href=http://list.6park.com/parks/out.php?perm=dafa46860 target=_blank><img src=http://am.6park.com/img/dafapoker/46860.gif width=468 height=60 border=0></a></td><td><a href="http://web.6park.com/bid/adufri.php" target=_blank><img src=http://am.6park.com/images/asianadult.gif width=468 height=60 border=0></a></td></tr></table>'


document.write( ad_content[num] ,"gl")