var how_many_ads = 4;
var now = new Date();
var sec = now.getSeconds();
var num = sec % how_many_ads;
var ad_content=new Array(); 

ad_content[0] ='<table width=948 border=0><tbody><tr><td><A HREF=http://list.6park.com/parks/out.php?perm=payinone target=_blank><img src=http://am.6park.com/img/payinone/46860.gif WIDTH=468 HEIGHT=60 BORDER=0></A></td><td><a href=http://list.6park.com/parks/out.php?perm=dafa46860 target=_blank><img src=http://am.6park.com/img/dafapoker/46860.gif width=468 height=60 border=0></a></td></tr></tbody></table>'

ad_content[1] ='<table width=948 border=0><tbody><tr><td><A HREF=http://list.6park.com/parks/out.php?perm=timecool.com target=_blank><img src=http://am.6park.com/img/timecool/46860a.gif WIDTH=468 HEIGHT=60 BORDER=0></A></td><td><a href=http://list.6park.com/parks/out.php?perm=wofa46860 target=_blank><img src=http://am.6park.com/img/wofa/46860.gif width=468 height=60 border=0></a></td></tr></tbody></table>'

ad_content[2] ='<table width=948 border=0><tbody><tr><td><a href=http://list.6park.com/parks/out.php?perm=jojosf target=_blank><img src=http://am.6park.com/img/jojosf/46860.gif width=468 height=60 border=0></a></td><td><A HREF=http://list.6park.com/parks/out.php?perm=uncnhomea target=_blank><img src=http://am.6park.com/img/uncnhome/46860a.gif WIDTH=468 HEIGHT=60 BORDER=0></A> </td></tr></tbody></table>'

ad_content[3] ='<table width=948 border=0><tbody><tr><td><a href=http://list.6park.com/parks/out.php?perm=uncnhome1 target=_blank><img src=http://img.6park.com/img/uncnhome1/46860.gif width=468 height=60 border=0></a></td><td><a href="http://list.6park.com/parks/out.php?perm=youzigift.com" target=_blank><img src=http://am.6park.com/img/youzigift/46860.gif width=468 height=60 border=0></a></td></tr></tbody></table>'

document.write( ad_content[num] ,"gl")