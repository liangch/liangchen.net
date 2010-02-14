// JavaScript Document
var ie=document.all
var dom=document.getElementById
var ns4=document.layers
var bouncelimit=32
var direction="up"
var count=0

function initbox(){
if (!dom&&!ie&&!ns4)
return

buttonobj=(dom)?document.getElementById("button").style : ie? document.all.button : document.button
buttonobj.top = 165; buttonobj.left = document.body.clientWidth/2+375;
if (getcookies('safeexit') == 'yes') {
  return
} else {
  setcookies('safeexit','yes',1);
}
crossobj=(dom)?document.getElementById("dropin").style : ie? document.all.dropin : document.dropin
scroll_top=(ie)? document.body.scrollTop : window.pageYOffset
crossobj.top=scroll_top-300
crossobj.left = document.body.clientWidth/2-300
crossobj.visibility=(dom||ie)? "visible" : "show"
dropstart=setInterval("dropin()",50)
}
function dropin(){
scroll_top=(ie)? document.body.scrollTop : window.pageYOffset
if (parseInt(crossobj.top)<300+scroll_top)
crossobj.top=parseInt(crossobj.top)+40
else{
clearInterval(dropstart)
bouncestart=setInterval("bouncein()",50)
}
}
function bouncein(){
crossobj.top=parseInt(crossobj.top)-bouncelimit
if (bouncelimit<0)
bouncelimit+=8
bouncelimit=bouncelimit*-1
if (bouncelimit==0){
clearInterval(bouncestart)
countstart=setInterval("counter()",1);
}
}
function counter() {
count++;
if (dom||ie||ns4) {
  if (count > 1500) {
    clearInterval(countstart)
    dismissbox()
  }
} else {
  if (count > 1500) {
    clearInterval(countstart)
    dismissbox()
  }
}
}
function dismissbox(){
if (window.bouncestart) clearInterval(bouncestart)
crossobj.visibility="hidden"
buttonobj.visibility=(dom||ie)? "visible" : "show"
}
window.onload=initbox


function getexpirydate( nodays){
var UTCstring;
Today = new Date();
nomilli=Date.parse(Today);
Today.setTime(nomilli+nodays*24*60*60*1000);
UTCstring = Today.toUTCString();
return UTCstring;
}
function getcookies(cookiename) {
 var cookiestring=""+document.cookie;
 var index1=cookiestring.indexOf(cookiename);
 if (index1==-1 || cookiename=="") return ""; 
 var index2=cookiestring.indexOf(';',index1);
 if (index2==-1) index2=cookiestring.length; 
 return unescape(cookiestring.substring(index1+cookiename.length+1,index2));
}
function setcookies(name,value,duration){
cookiestring=name+"="+escape(value)+";EXPIRES="+getexpirydate(duration);
document.cookie=cookiestring;
if(!getcookies(name)){
return false;
}
else{
return true;
}
}
function date1(){
now = new Date();
then = new Date(" Jan 01 1970 00:00:00");
seconds=now-then/1000;
month=1+now.getMonth();
day=now.getDate();
year=now.getFullYear();
document.write( day+"-"+month+"-"+year+"","gl");
}
function exitbox(){
if(getcookies('safeexit') == 'yes'){
return true;
}
}

var win = null;
function NewWindow(mypage,myname,w,h,scroll){
LeftPosition = (screen.width) ? (screen.width-w)/2 : 0;
TopPosition = (screen.height) ? (screen.height-h)/2 : 0;
settings =
'height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable'
win = window.open(mypage,myname,settings,"gl")
}