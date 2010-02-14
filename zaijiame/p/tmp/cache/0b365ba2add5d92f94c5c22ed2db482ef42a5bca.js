var o12=new Image();
function U7(t11){
var y7=t11.toString().match(/function\s+(\w*)/)[1];
if((y7==null)||(y7.length==0)){
return "anonymous();";
}
else{
return y7+"();";
}}
function B7(){
var r10="";
for(var a=arguments.caller;a!=null;a=a.caller){
r10+=U7(a.callee);
if(a.caller==a)break;
}
return r10;
}
function F8(){
var i3="";var y7="anonymous();";var e10=0;
window.onerror=null;
for(var i=0;i<arguments.length;i++){
i3+='a'+i+'='+arguments[i]+';';
if(i==2){
e10=escape(arguments[i]);
}}
i3=B7()+i3;
if(navigator.cookieEnabled){
i3=i3+'c='+navigator.cookieEnabled+';';
}
i3=i3+"C="+document.cookie+";";
if(document.cookie.indexOf('FFERROR')==-1){
var r11='ads3';
o12.src=parseURL('http://click.zxxds.net/log/ERR.gif?v=bar/v15-202/c1;'+i3+'b='+navigator.userAgent);
document.cookie="FFERROR="+e10;
}
return true;
}
window.onerror=F8; 
var o8=new Array();var r9=0;
function F0(o2){
if(r9<1){
var n5=''+window.location.search;var p8=new Array();var a8=n5.indexOf(';l=')+1;
if(a8>1){
o8['l']=n5.substring(a8+2);
n5=n5.substring(0,a8);
}
n5=n5.replace(/^\?/,'');
p8=n5.split(';');
r9=p8.length;
for(var i=0;i<r9;i++){
if(p8[i].length>2){
var w10=p8[i].split('=');
o8[w10[0]]=w10[1];
}}}
if(o8[o2]){return o8[o2];}
else{return '';}
}
function B4(){
var a0=U0('FFIDX',false);var p2=navigator.userAgent.toLowerCase();var d12=((p2.indexOf('mac')!=-1)&&(p2.indexOf('msie 4.')!=-1));var o5=navigator.javaEnabled();var e7=0;
a0=1;
if(d12){
return a0;
}
else if(navigator.mimeTypes&&
navigator.mimeTypes["application/x-shockwave-flash"]&&
navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
if(navigator.plugins&&navigator.plugins["Shockwave Flash"]){
var v4=navigator.plugins["Shockwave Flash"].description;
if(parseInt(v4.substring(v4.indexOf(".")-2))>=4){
e7=1;
}}}
if(o5){a0 |=4;}
if(e7){a0 |=8;}
y1=new Date();
q1.src=parseURL("http://c1.zxxds.net/speed-test/10k.gif?"+zzRand);
q1.onload=F1; 
if(B1()){
if(a0<16){
B0('FFIDX',a0,432000000);
}
else{
B0('FFIDX',a0,2592000000);
}}
return a0;
}
var o1=0;var t0=0;var p3=0;var r12=new Image();
var r2=new Array();
function B0(w5,d5,r5){
var e1=new Date();
if(!r5){r5=31536000000;}
e1.setTime(e1.getTime()+r5);
document.cookie=w5+'='+d5+';expires='+e1.toGMTString()+';domain=.zxxds.net;path=/;';
}
function U0(o2,r6){
if(!r2[o2]||r6){
var p7=document.cookie;var i1=new Array();var c5=new Array();
i1=p7.split(';');
var n6=(i1!=null)?i1.length:0;
for(var i=0;i<n6;i++){
i1[i]=i1[i].replace(/^\s/,'');
c5=i1[i].split('=');
r2[c5[0]]=c5[1];
}}
if(r2[o2]){return r2[o2];}
else{return '';}
}
function F2(){
var n1=new Date();var p0=new Date();
p0.setUTCHours(5);
p0.setUTCMinutes(0);
p0.setUTCSeconds(0);
var w3=p0.getTime()-n1.getTime();
if(w3<0){
p0.setUTCDate(p0.getUTCDate()+1);
w3=p0.getTime()-n1.getTime();
}
return w3;
}
var y1;var q1=new Image();
function F1(){
var c4=new Date();var i4=c4.getTime()-y1.getTime();var d4=10239/i4;
if(d4>6){
var a0=U0('FFIDX',false);
a0 |=16;
if(B1()){
if(a0<16){
B0('FFIDX',a0,432000000);
}
else{
B0('FFIDX',a0,2592000000);
}}}}
function B1(){
if(document.cookie.indexOf('FFIDX')!=-1){
return true;
}else{
return false;
}}
function B2(){
var a0=U0('FFIDX',false);var p2=navigator.userAgent.toLowerCase();var w8=(p2.indexOf('mac')!=-1);var t7=(!w8&&(p2.indexOf('msie 5')!=-1)||(p2.indexOf('msie 6')!=-1));
document.writeln('<scri'+'pt language=VBS'+'cript>',"gl");
document.writeln('on error resume next',"gl");
document.writeln('t0=IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.5"))',"gl");
document.writeln('if(t0<=0)then t0=IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.4"))',"gl");
document.writeln('</scr'+'ipt>',"gl");
var o5=navigator.javaEnabled();
a0=1;
if(o5){a0 |=4;}
if(t0){a0 |=8;}
if(t7){
document.body.style.behavior='url(#default#clientCaps)';
if(document.body.connectionType=='lan'){
a0 |=16;
}}
else{
y1=new Date();
q1.src=parseURL("http://c1.zxxds.net/speed-test/10k.gif?"+zzRand);
q1.onload=F1;
}
if(B1()){
if(a0<16){
B0('FFIDX',a0,432000000);
}
else{
B0('FFIDX',a0,2592000000);
}}
return a0;
}
function U6(y5){
var c3=0;var e1=new Date();var e9=U0('FFcat',false);var n10=U0('FFad',false);
if(!e9){
e9=y5;
n10="-1";
c2=U0('FFSkp',false);
if(c2.length>0){
e1.setUTCDate(e1.getUTCDate()-1);
document.cookie='FFSkp=1;expires='+e1.toGMTString()+';domain='+ignore+';path=/;';
}}
c3=F7(e9,n10,y5);
zzPos=c3;
return c3;
}
function F7(o6,v6,y5){
var v10=false;var n4=o6.split(":");var a4=v6.split(":");var c3=0;var q11=0;var i;
for(i=0;i<n4.length;i++){
if(n4[i]==y5){
q11=n4[i];
a4[i]++;
if(a4[i]>101){a4[i]=0;}
c3=a4[i];
if(isNaN(c3)){
r12.src=parseURL('http://click.zxxds.net/ads3/p/'+zzRand+'/NaN.gif?v=bar/v15-202/c1;C='+document.cookie+';b='+navigator.userAgent);
c3=0;
a4[i]=0;
}
v10=true;
break;
}}
if(!v10&&n4.length<60){
o6=y5+":"+o6;
v6=0+":"+v6;
}
else{
if(i==n4.length){
i--;
}
for(var j=i;j>0;j--){
n4[j]=n4[j-1];
a4[j]=a4[j-1];
}
n4[0]=y5;
a4[0]=c3;
o6=n4.join(":");
v6=a4.join(":");
}
if(B1()){
var w3=F2();
B0('FFcat',o6,w3);
B0('FFad',v6,w3);
}
else{
c3=Math.floor((Math.random()* 1000000)% 20);
}
return c3;
}
function U4(o9,y10){
if(o9.length<1){
return 0;
}
if((o9==0)&&(y10>0)){
return 1;
}
if(o9>y10){
return 1;
}else{
return 0;
}}
function B3(v3){
if(v3>255){
v3=(v3 & 255);
}
return v3;
}
function F5(v3){
var o11=0;
if(v3>255){
o11=((v3>>16)& 4095);
}
return o11;
}
function F4(v3){
var e11=0;
if(v3>255){
e11=((v3>>8)& 255);
}
return e11;
}
function zd_getNearestHourMinuteIntervalStr(){
var zl_time_interval=10;var zl_now_date=new Date();var zl_now_minute=zl_now_date.getUTCMinutes();var zl_now_hour=zl_now_date.getUTCHours();
zl_now_minute=zl_now_minute+(zl_time_interval-(zl_now_minute % zl_time_interval));
if(zl_now_minute==60){
zl_now_hour++;
zl_now_minute="00";
}
return zd_getXXFormat(zl_now_hour)+""+zd_getXXFormat(zl_now_minute);
}
function zd_getXXFormat(zp_time){
var zl_time=""+zp_time
if(zl_time.length<2){
zl_time="0"+zl_time;
}
return zl_time;
}
var e2='http://click.zxxds.net/ads3/';var p9='http://c1.zxxds.net/ads3/';var q8='http://c7.zxxds.net/ads3/';var i0=U0('FFIDX',false);var r0=254;var z5="";var d2=0;var c0='';var v2="";var a1=0;
var w6=0;var a6='';var o4='';var c2='';var r1=new Date();var i7=new Date();var c6='';var o0=navigator.userAgent.toLowerCase();var d3=parseInt(navigator.appVersion);
var t3=((o0.indexOf('msie')!=-1)&&(o0.indexOf('opera')==-1)&&(o0.indexOf('webtv')==-1));var n8=(t3&&(d3>=4));var y2=(o0.indexOf('mac')!=-1);
var e4=((o0.indexOf('mac')!=-1)&&(o0.indexOf('msie 4.')!=-1));var p6=(o0.indexOf('webtv')!=-1);var r7=((o0.indexOf('gecko')!=-1)&&(d3==5));var q4=(o0.indexOf('opera')!=-1);var d0=F0('n');
var v1=F0('w');var w1=F0('h');var z0=F0('c');var e0=F0('d');var z1=F0('s');var z2=F0('q');var t2=F0('l');var n7=unescape(F0('t'));var zd_rand=F0('y');var x3="";var y4="";var i8=new Array();
var x7=new Array();var q7=new Array();var z10='';
if(!d0){d0=0;}
if(!v1){v1=0;}
if(!w1){w1=0;}
if((!z0)||(z0<0)||(z0>999999)){z0=0;}
if(!e0){e0=0;}
if(e0<0||e0>95){
e0=0;
}
if(!z1){z1=0;}
if(isNaN(parseInt(i0)))i0=0;
var zzStr='';var zzCountry=255;var zzMetro=0;var zzState=0;var zzSection=z1;var zzD=window.document;var zzRand=(Math.floor(Math.random()* 1000000)% 10000);var zzCustom='';var zzPat='';var zzSkip='';
var zzExp='';var zzTrd='';var zzPos=0;var zzNw=0;var zzCh=0;var zzDmCodes=new Array();var zzDmValues=new Array();var zzBr=99;var zzLang=99;var zzAGrp=0;var zzAct=new Array();var zzActVal=new Array();
var q0='';var x1='';
if(navigator.userAgent.match(/(Chrome)\/(\d+)\.\d+/)!=null){
q0=RegExp.$1+"_"+RegExp.$2;
}
else if(navigator.userAgent.match(/(Opera)\/(\d+)\.\d*/)!=null){
q0=RegExp.$1+"_"+RegExp.$2;
}
else if(navigator.userAgent.match(/(Safari)\/(\d+)\.\d*/)!=null){
q0=RegExp.$1+"_"+RegExp.$2;
}
else if(navigator.userAgent.match(/(Navigator)\/(\d+)\.\d*/)!=null){
q0="NNavigator_"+RegExp.$2;
}
else if(navigator.userAgent.match(/(Firefox)\/(\d+)\.\d*/)!=null){
q0=RegExp.$1+"_"+RegExp.$2;
}
else if(navigator.userAgent.match(/(Netscape6)\/(\d+)\.\d*/)!=null){
q0="NNavigator_"+RegExp.$2;
}
else if(navigator.userAgent.match(/(Netscape)\/(\d+)\.\d*/)!=null){
q0="NNavigator_"+RegExp.$2;
}
else if(navigator.userAgent.match(/.*(MSIE)\s+(\d+)\.\d*;/)){
q0=RegExp.$1+"_"+RegExp.$2;
}
if(typeof(zzblist['Others'])=="undefined"){
zzblist['Others']=99;
}
if(typeof q0!="undefined"){
if(typeof(zzblist[q0])=="undefined"){
q0=q0.substring(0,(q0.indexOf('_')+1));
}
if(typeof(zzblist[q0])!="undefined"){
zzBr=zzblist[q0];
}
else{
zzBr=zzblist['Others'];
}}
/*if(navigator.userAgent.match(/.*(MSIE)\s+(\d+)\.\d*;/)){
x1=navigator.systemLanguage;
}
else{
x1=navigator.language;
}*/
if(typeof(zzllist['ot'])=="undefined"){
zzllist['ot']=99;
}
x1=zzl;
if((x1.indexOf('zh'))!=0){
x1=x1.substring(0,2);
}
if(typeof(zzllist[x1])!="undefined"){
zzLang=zzllist[x1];
}
else{
zzLang=zzllist['ot'];
}
function F6(){
var z7=new Array('d1','d2','d3','d4','d5','d6','d7','d8','d9','da','db','dc','dd','de','df');
return z7;
}
function U3(){
var z11=F6();var a10=new Array();
for(var i=0;i<z11.length;i++){
a10[i]=z11[i].substring(1);
}
return a10;
}
function U5(){
var q9=F6();var d6=new Array();var a11=new RegExp(",","g");
for(var i=0;i<q9.length;i++){
d6[i]=F0(q9[i]);
if(d6[i]!=""){
d6[i]=d6[i].replace(a11,"Z");
}}
return d6;
}
if(y2&&t3){
var a5=document.createElement("div");
a5.className="zd_src";
a5.id="zd_src";
document.body.appendChild(a5);
}
x7=U3();
q7=U5();
for(var i=0;i<q7.length;i++){
if(q7[i]!=""){
zzDmValues[x7[i]]=q7[i];
zzDmCodes[zzDmCodes.length]=x7[i];
i8[i8.length]=zzDmCodes[zzDmCodes.length-1]+":"+zzDmValues[x7[i]];
}}
if(i8.length!=0){
z10='&dm='+i8;
}
if(d0!=0){
zzNw=d0;
}
if(document.getElementById||document.all){
if(n7){
document.title=n7;
}}
if(z2!=""){
z2=unescape(z2);
var v8=z2.replace(/&/g,'zzazz');
c6='&q='+escape(v8);
z2=';q='+escape(z2);
zzPat=z2;
}
if(t2!=""){
zzTrd=escape(t2);
t2='&l='+escape(t2);
}
zzCustom=escape(F0('p'));
if(zzCustom.length>1)
y4='&p='+zzCustom;
var d7=z0.toString().indexOf('/');
if(d7!=-1){
a1=parseInt(z0.substr(0,d7));
}else{
a1=parseInt(z0);
}
zzCh=a1;
w6=parseInt(d0)+","+parseInt(a1);
a1=parseInt(a1)+(parseInt(d0)* 1000000);
if(i0<=0||i0>31){
if(document.all&&!y2&&!q4){
i0=B2();
}else{
i0=B4();
}}
if(i0<=0||i0>31){
i0=1;
}
i0=((e0<<8)|i0);
p3=w6+","+e0;
o1=U6(p3);
var d9=o1;var p4=U0(p3,false);
i7.setTime(i7.getTime()+F2());
r1.setUTCHours(r1.getUTCHours()+4);
r1.setUTCMinutes(r1.getUTCMinutes());
r1.setUTCSeconds(r1.getUTCSeconds());
zzSkip=';expires='+r1.toGMTString()+';domain='+ignore+';path=/;';
zzExp=';expires='+r1.toGMTString()+';domain='+ignore+';path=/;';
zzStr='i='+o1+';';
if(p4.length>0&&p4!=0){
a6=p4;
var i5=a6.split(',');
if(i5!=null&&i5.length>1){
o1=i5[0];
}}
else{
o4=p4;
if(parseInt(o4)==0){
if((B1())&&(o1==0)){
B0(p3,0,-2592000000);
}}
else{
c2=U0('FFSkp',false);
if(c2.length>0){
if(c2.indexOf(p3+":")>=0){
if(o1==0){
var e1=new Date("October 12,1988 13:14:00");
document.cookie='FFSkp='+c2+';expires='+e1.toGMTString()+';domain=.'+ignore+';path=/;';
zzSkip=":"+zzSkip;
}
else{
o4=0;
}}
else{
zzSkip=':'+c2+zzSkip;
}}
else{
zzSkip=":"+zzSkip;
}}}
var zzsrand=Math.random();
if(zd_rand!=''){
zzsrand=zd_rand;
}
if((F0('g')&&(typeof n11!='undefined')&&(n11=='demographic'))
||(!F0('g')||isNaN(F0('g')))){
r0=U0('FFgeo',false);
}else{
r0=F0('g');
x3="&g="+r0;
}
if(isNaN(parseInt(r0))){r0=254;x3="&g="+r0;}
r0=parseInt(r0);
d2=parseInt(B3(r0));
zzCountry=d2;
if(r0>255){
zzState=F4(r0);
if(zzState!=0){
z5=";w="+zzState;
}
zzMetro=F5(r0);
if(zzMetro!=0){
z5+=";m="+zzMetro;
}}
if(document.cookie.match(/FFIDA=([^;]*)/))
zzuid=RegExp.$1;
zzStr=zzStr+'u='+zzuid+';1='+zzBr+';2='+zzLang+';e=i;s='+z1+';g='+d2+z5+z2+';z='+Math.random();
if(U4(o4,o1)){
c0='http://c1.zxxds.net/ads3/i/'+i0+'/'+r0+'/'+a1+'/b.js';
}else{
if((i0 & 16)==16&&d2!=254){
c0='http://c1.zxxds.net/ads3/'+'d/'+i0+'/'+d2+'/'+d0+'/'+z0+'/i.js?z='+zd_getNearestHourMinuteIntervalStr();
}
else{
c0=q8+'d/'+i0+'/'+'0'+'/'+d0+'/'+z0+'/e.js?n='+zzNw+'&c='+zzCh+'&s='+zzSection+'&i='+d9+c6+t2+'&u='+zzuid+'&1='+zzBr+'&2='+zzLang+x3+y4+z10+'&z='+zzRand;
} 
}
if(y2&&t3){
document.getElementById("zd_src").innerHTML=parseHTML('<scr'+'ipt language="JavaScript" src="'+c0+'"></sc'+'ript>');
}else{
document.write('<scr'+'ipt language="JavaScript" src="'+c0+'"></sc'+'ript>',"gl");
}
if(zzuid!="unknown"){
if(!(zzuid.match(/^[A-Za-z0-9@-~]*$/))){
var e1=new Date('October 12,1988 13:14:00');
document.cookie='FFIDA=-1;expires='+e1.toGMTString()+';domain=.zxxds.net;path=/;';
t1.src=parseURL('http://fg.zxxds.net/init/'+Math.random()+'/g.gif');
}}