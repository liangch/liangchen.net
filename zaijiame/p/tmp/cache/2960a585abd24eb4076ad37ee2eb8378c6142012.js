(function (){var l=true,m=null,o=false,p;var r=this;function aa(a,b){a=a.split(".");b=b||r;for(var c;c=a.shift();)if(b[c])b=b[c];else return m;return b}function s(){}
function t(a){var b=typeof a;if(b=="object")if(a){if(a instanceof Array||!(a instanceof Object)&&Object.prototype.toString.call(a)=="[object Array]"||typeof a.length=="number"&&typeof a.splice!="undefined"&&typeof a.propertyIsEnumerable!="undefined"&&!a.propertyIsEnumerable("splice"))return"array";if(!(a instanceof Object)&&(Object.prototype.toString.call(a)=="[object Function]"||typeof a.call!="undefined"&&typeof a.propertyIsEnumerable!="undefined"&&!a.propertyIsEnumerable("call")))return"function"}else return"null";
else if(b=="function"&&typeof a.call=="undefined")return"object";return b}function ba(a){var b=t(a);return b=="array"||b=="object"&&typeof a.length=="number"}function u(a){return typeof a=="string"}function v(a){return t(a)=="function"}function ca(a){a=t(a);return a=="object"||a=="array"||a=="function"}function da(a){if(a.hasOwnProperty&&a.hasOwnProperty(w))return a[w];a[w]||(a[w]=++ea);return a[w]}var w="closure_hashCode_"+Math.floor(Math.random()*2147483648).toString(36),ea=0;
function fa(a){var b=t(a);if(b=="object"||b=="array"){if(a.T)return a.T.call(a);b=b=="array"?[]:{};for(var c in a)b[c]=fa(a[c]);return b}return a}function x(a,b){function c(){}c.prototype=b.prototype;a.R=b.prototype;a.prototype=new c}
var y=Array.prototype,ga=y.indexOf?function(a,b,c){return y.indexOf.call(a,b,c)}:function(a,b,c){c=c==m?0:c<0?Math.max(0,a.length+c):c;a=u(a)?a.split(""):a;for(c=c;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},ha=y.forEach?function(a,b,c){y.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=u(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};function ia(a){if(t(a)=="array")return a.concat();else{for(var b=[],c=0,d=a.length;c<d;c++)b[c]=a[c];return b}}var ja=/^[a-zA-Z0-9\-_.!~*'()]*$/;
function ka(a){a=String(a);if(!ja.test(a))return encodeURIComponent(a);return a}function z(a,b){if(b)return a.replace(la,"&amp;").replace(ma,"&lt;").replace(na,"&gt;").replace(oa,"&quot;");else{if(!pa.test(a))return a;if(a.indexOf("&")!=-1)a=a.replace(la,"&amp;");if(a.indexOf("<")!=-1)a=a.replace(ma,"&lt;");if(a.indexOf(">")!=-1)a=a.replace(na,"&gt;");if(a.indexOf('"')!=-1)a=a.replace(oa,"&quot;");return a}}var la=/&/g,ma=/</g,na=/>/g,oa=/\"/g,pa=/[&<>\"]/;
function qa(a){if(A(a,"&"))return"document"in r&&!A(a,"<")?ra(a):sa(a);return a}function ra(a){var b=r.document.createElement("a");b.innerHTML=parseHTML(a);b.normalize&&b.normalize();a=b.firstChild.nodeValue;b.innerHTML=parseHTML("");return a}function sa(a){return a.replace(/&([^;]+);/g,function(b,c){switch(c){case "amp":return"&";case "lt":return"<";case "gt":return">";case "quot":return'"';default:if(c.charAt(0)=="#"){c=Number("0"+c.substr(1));if(!isNaN(c))return String.fromCharCode(c)}return b}})}
function A(a,b){return a.indexOf(b)!=-1}
function B(a,b){var c=0;a=String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split(".");b=String(b).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split(".");for(var d=Math.max(a.length,b.length),e=0;c==0&&e<d;e++){var f=a[e]||"",g=b[e]||"",h=new RegExp("(\\d*)(\\D*)","g"),j=new RegExp("(\\d*)(\\D*)","g");do{var i=h.exec(f)||["","",""],k=j.exec(g)||["","",""];if(i[0].length==0&&k[0].length==0)break;c=C(i[1].length==0?0:parseInt(i[1],10),k[1].length==0?0:parseInt(k[1],10))||C(i[2].length==0,k[2].length==0)||C(i[2],
k[2])}while(c==0)}return c}function C(a,b){if(a<b)return-1;else if(a>b)return 1;return 0}(Date.now||function(){return+new Date})();function ta(a,b,c){for(var d in a)b.call(c,a[d],d,a)}var D,E,F,ua,G;function va(){return r.navigator?r.navigator.userAgent:m}function H(){return r.navigator}(function(){G=ua=F=E=D=o;var a;if(a=va()){var b=H();D=a.indexOf("Opera")==0;E=!D&&a.indexOf("MSIE")!=-1;ua=(F=!D&&a.indexOf("WebKit")!=-1)&&a.indexOf("Mobile")!=-1;G=!D&&!F&&b.product=="Gecko"}})();
var wa=D,I=E,xa=G,J=F,K=function(){var a=H();return a&&a.platform||""}();(function(){A(K,"Mac");A(K,"Win");A(K,"Linux");H()&&A(H().appVersion||"","X11")})();var L=function(){var a="",b;if(wa&&r.opera){a=r.opera.version;a=typeof a=="function"?a():a}else{if(xa)b=/rv\:([^\);]+)(\)|;)/;else if(I)b=/MSIE\s+([^\);]+)(\)|;)/;else if(J)b=/WebKit\/(\S+)/;if(b)a=(a=b.exec(va()))?a[1]:""}return a}(),M={};function N(){}N.prototype.J=o;N.prototype.z=function(){if(!this.J){this.J=l;this.r()}};N.prototype.r=function(){};
function O(a,b){this.type=a;this.currentTarget=this.target=b}x(O,N);O.prototype.r=function(){delete this.type;delete this.target;delete this.currentTarget};O.prototype.G=o;O.prototype.ga=l;function P(a,b){a&&this.D(a,b)}x(P,O);p=P.prototype;p.target=m;p.relatedTarget=m;p.offsetX=0;p.offsetY=0;p.clientX=0;p.clientY=0;p.screenX=0;p.screenY=0;p.button=0;p.keyCode=0;p.charCode=0;p.ctrlKey=o;p.altKey=o;p.shiftKey=o;p.metaKey=o;p.K=m;
p.D=function(a,b){var c=this.type=a.type;this.target=a.target||a.srcElement;this.currentTarget=b;if(b=a.relatedTarget){if(xa)try{b=b.nodeName&&b}catch(d){}}else if(c=="mouseover")b=a.fromElement;else if(c=="mouseout")b=a.toElement;this.relatedTarget=b;this.offsetX=a.offsetX!==undefined?a.offsetX:a.layerX;this.offsetY=a.offsetY!==undefined?a.offsetY:a.layerY;this.clientX=a.clientX!==undefined?a.clientX:a.pageX;this.clientY=a.clientY!==undefined?a.clientY:a.pageY;this.screenX=a.screenX||0;this.screenY=
a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||(c=="keypress"?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.K=a;delete this.ga;delete this.G};I&&(M["8"]||(M["8"]=B(L,"8")>=0));P.prototype.r=function(){P.R.r.call(this);this.relatedTarget=this.currentTarget=this.target=this.K=m};
function Q(a,b){this.N=b;this.k=[];if(a>this.N)throw Error("[goog.structs.SimplePool] Initial cannot be greater than max");for(b=0;b<a;b++)this.k.push(this.e?this.e():{})}x(Q,N);Q.prototype.e=m;Q.prototype.I=m;function ya(a){if(a.k.length)return a.k.pop();return a.e?a.e():{}}function R(a,b){a.k.length<a.N?a.k.push(b):za(a,b)}function za(a,b){if(a.I)a.I(b);else if(v(b.z))b.z();else for(var c in b)delete b[c]}Q.prototype.r=function(){Q.R.r.call(this);for(var a=this.k;a.length;)za(this,a.pop());delete this.k};
var Aa,Ba;(function(){Ba=(Aa="ScriptEngine"in r&&r.ScriptEngine()=="JScript")?r.ScriptEngineMajorVersion()+"."+r.ScriptEngineMinorVersion()+"."+r.ScriptEngineBuildVersion():"0"})();var S=Aa,Ca=Ba;function Da(){}var Ea=0;p=Da.prototype;p.key=0;p.v=o;p.H=o;p.D=function(a,b,c,d,e,f){if(v(a))this.M=l;else if(a&&a.handleEvent&&v(a.handleEvent))this.M=o;else throw Error("Invalid listener argument");this.F=a;this.P=b;this.src=parseURL(c);this.type=d;this.capture=!!e;this.X=f;this.H=o;this.key=++Ea;this.v=o};
p.handleEvent=function(a){if(this.M)return this.F.call(this.X||this.src,a);return this.F.handleEvent.call(this.F,a)};var T,Fa,U,Ga,Ha,Ia,Ja,Ka;
(function(){function a(){return{p:0,u:0}}function b(){return[]}function c(){function q(Za){return g.call(q.src,q.key,Za)}return q}function d(){return new Da}function e(){return new P}var f=S&&!(B(Ca,"5.7")>=0),g;Ga=function(q){g=q};if(f){T=function(q){R(h,q)};Fa=function(){return ya(j)};U=function(q){R(j,q)};Ha=function(){R(i,c())};Ia=function(q){R(k,q)};Ja=function(){return ya(n)};Ka=function(q){R(n,q)};var h=new Q(0,600);h.e=a;var j=new Q(0,600);j.e=b;var i=new Q(0,600);i.e=c;var k=new Q(0,600);
k.e=d;var n=new Q(0,600);n.e=e}else{T=s;Fa=b;Ia=Ha=U=s;Ja=e;Ka=s}})();var V={},W={},La={},Ma={};function Na(a){if(!V[a])return o;var b=V[a];if(b.v)return o;var c=b.src,d=b.type,e=b.P,f=b.capture;if(c.removeEventListener){if(c==r||!c.ma)c.removeEventListener(d,e,f)}else c.detachEvent&&c.detachEvent(Oa(d),e);c=da(c);e=W[d][f][c];if(La[c]){var g=La[c],h=ga(g,b);h>=0&&y.splice.call(g,h,1).length==1;g.length==0&&delete La[c]}b.v=l;e.O=l;Pa(d,f,c,e);delete V[a];return l}
function Pa(a,b,c,d){if(!d.A)if(d.O){for(var e=0,f=0;e<d.length;e++)if(d[e].v){var g=d[e].P;g.src=parseURL(m);Ha(g);Ia(d[e])}else{if(e!=f)d[f]=d[e];f++}d.length=f;d.O=o;if(f==0){U(d);delete W[a][b][c];W[a][b].p--;if(W[a][b].p==0){T(W[a][b]);delete W[a][b];W[a].p--}if(W[a].p==0){T(W[a]);delete W[a]}}}}function Oa(a){if(a in Ma)return Ma[a];return Ma[a]="on"+a}
function Qa(a,b,c,d,e){var f=1;b=da(b);if(a[b]){a.u--;a=a[b];if(a.A)a.A++;else a.A=1;try{for(var g=a.length,h=0;h<g;h++){var j=a[h];if(j&&!j.v)f&=Ra(j,e)!==o}}finally{a.A--;Pa(c,d,b,a)}}return Boolean(f)}function Ra(a,b){b=a.handleEvent(b);a.H&&Na(a.key);return b}
Ga(function(a,b){if(!V[a])return l;a=V[a];var c=a.type,d=W;if(!(c in d))return l;d=d[c];var e,f;if(I){e=b||aa("window.event");b=l in d;var g=o in d;if(b){if(e.keyCode<0||e.returnValue!=undefined)return l;a:{var h=o;if(e.keyCode==0)try{e.keyCode=-1;break a}catch(j){h=l}if(h||e.returnValue==undefined)e.returnValue=l}}h=Ja();h.D(e,this);e=l;try{if(b){for(var i=Fa(),k=h.currentTarget;k;k=k.parentNode)i.push(k);f=d[l];f.u=f.p;for(var n=i.length-1;!h.G&&n>=0&&f.u;n--){h.currentTarget=i[n];e&=Qa(f,i[n],
c,l,h)}if(g){f=d[o];f.u=f.p;for(n=0;!h.G&&n<i.length&&f.u;n++){h.currentTarget=i[n];e&=Qa(f,i[n],c,o,h)}}}else e=Ra(a,h)}finally{if(i){i.length=0;U(i)}h.z();Ka(h)}return e}f=new P(b,this);try{e=Ra(a,f)}finally{f.z()}return e});function Sa(a){if(a[1]){var b=a[0],c=b.indexOf("#");if(c>=0){a.push(b.substr(c));a[0]=b=b.substr(0,c)}c=b.indexOf("?");if(c<0)a[1]="?";else if(c==b.length-1)a[1]=undefined}return a.join("")}var Ta=/#|$/;
function Ua(a,b){var c=a.search(Ta),d;a:{d=0;for(var e=b.length;(d=a.indexOf(b,d))>=0&&d<c;){var f=a.charCodeAt(d-1);if(f==38||f==63){f=a.charCodeAt(d+e);if(!f||f==61||f==38||f==35){d=d;break a}}d+=e+1}d=-1}if(d<0)return m;else{e=a.indexOf("&",d);if(e<0||e>c)e=c;d+=b.length+1;return decodeURIComponent(a.substr(d,e-d).replace(/\+/g," "))}}
function Va(a,b){ta(b,function(c,d){if(d=="style")a.style.cssText=c;else if(d=="class")a.className=c;else if(d=="for")a.htmlFor=c;else if(d in Wa)a.setAttribute(Wa[d],c);else a[d]=c})}var Wa={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",rowspan:"rowSpan",valign:"vAlign",height:"height",width:"width",usemap:"useMap",frameborder:"frameBorder",type:"type"};
function Xa(a,b){var c=b[0],d=b[1];if(I&&d&&(d.name||d.type)){c=["<",c];d.name&&c.push(' name="',z(d.name),'"');if(d.type){c.push(' type="',z(d.type),'"');d=fa(d);delete d.type}c.push(">");c=c.join("")}var e=a.createElement(c);if(d)if(u(d))e.className=d;else Va(e,d);if(b.length>2){function f(g){if(g)e.appendChild(u(g)?a.createTextNode(g):g)}for(d=2;d<b.length;d++){c=b[d];ba(c)&&!(ca(c)&&c.nodeType>0)?ha(Ya(c)?ia(c):c,f):f(c)}}return e}function X(){return Xa(document,arguments)}
J&&(M["522"]||(M["522"]=B(L,"522")>=0));function Ya(a){if(a&&typeof a.length=="number")if(ca(a))return typeof a.item=="function"||typeof a.item=="string";else if(v(a))return typeof a.item=="function";return o}function Y(a){this.a=S?[]:"";a!=m&&this.append.apply(this,arguments)}
if(S){Y.prototype.C=0;Y.prototype.append=function(a,b){if(b==m)this.a[this.C++]=a;else{this.a.push.apply(this.a,arguments);this.C=this.a.length}return this}}else Y.prototype.append=function(a,b){this.a+=a;if(b!=m)for(var c=1;c<arguments.length;c++)this.a+=arguments[c];return this};Y.prototype.clear=function(){if(S)this.C=this.a.length=0;else this.a=""};Y.prototype.toString=function(){if(S){var a=this.a.join("");this.clear();a&&this.append(a);return a}else return this.a};
function $a(a,b,c){a=a||document;c=c&&c!="*"?c.toLowerCase():"";if(a.querySelectorAll&&(c||b)&&(!J||1))b=a.querySelectorAll(c+(b?"."+b:""));else if(b&&a.getElementsByClassName){a=a.getElementsByClassName(b);if(c){for(var d={},e=0,f=0,g;g=a[f];f++)if(c==g.nodeName.toLowerCase())d[e++]=g;d.length=e;b=d}else b=a}else{a=a.getElementsByTagName(c||"*");if(b){d={};for(f=e=0;g=a[f];f++){c=g.className;if(typeof c.split=="function"&&ga(c.split(" "),b)>=0)d[e++]=g}d.length=e;b=d}else b=a}if(b.length>=1)return b[0];
else throw Error();}function ab(a){return document.createTextNode(a)}function bb(a,b){if(b instanceof Array){for(var c=0;c<b.length;c++)a=a.replace("%"+(c+1),b[c]);return a}else return a.replace("%1",b)}var cb=new RegExp("<(/s*(blockquote|body|center|dd|dir|div|dl|dt|form|h1|h2|h3|h4|h5|h6|head|html|hr|isindex|li|menu|noframes|ol|p|table|td|th|tr|title|ul)[^>]*|s*br[^>]*)>","gi"),db=/<[^>]*>/gi,eb=/</g,fb=/>/g;
function gb(a,b){if(!a)return"";if(b)a=a.replace(cb," ");a=a.replace(db,"");return a.replace(eb,"&lt;").replace(fb,"&gt;")}function hb(a,b){if(a.length<=b)return a;var c=a.split(/\s+/);a=[];for(var d=0,e=0;e<c.length&&d<=b;e++){a.push(c[e]);d+=c[e].length+(e?1:0)}a=a.join(" ");if(e!=c.length)a+="...";return a}var ib={};function jb(a){a in ib||(ib[a]=Ua(window.location.search,a));return ib[a]}
function kb(a){if(jb("hl"))a=Sa([a,"&","hl","=",ka("en")]);var b=jb("gl");if(b)a=Sa([a,"&","gl","=",ka(b)]);return a}
var Z={},lb={blue:{j:"#fff",i:"#bccceb",o:"#090992",m:"#bccceb",l:"#1010c8",g:"#7a7ee0",h:"#e5ecf9",f:"#898de9"},green:{j:"#fff",i:"#d8dbbc",o:"#2d8509",m:"#d8dbbc",l:"#58bf2f",g:"#97e07a",h:"#f5fbeb",f:"#adb094"},slate:{j:"#123",i:"#345",o:"#5e805e",m:"#5e6f80",l:"#abc",g:"#5e6f80",h:"#152939",f:"#abc"},gray:{j:"#fff",i:"#ccc",o:"#666",m:"#ccc",l:"#999",g:"#ccc",h:"#eee",f:"#aaa"},khaki:{j:"#f2e9ca",i:"#8e7c6a",o:"#d52",m:"#cba",l:"#543",g:"#ba9",h:"#eae0c6",f:"#987"},pink:{j:"#fff",i:"#aaa",o:"#d69",
m:"#ddd",l:"#e684ad",g:"#ebc",h:"#fcf0f7",f:"#a88"},black:{j:"#000",i:"#aaa",o:"#ccc",m:"#d8dbbc",l:"#d52",g:"#7a2b0e",h:"#111",f:"#999"}},mb={margin:0,padding:0,background:"transparent none",border:"none",textAlign:"left",textIndent:"0",textDecoration:"none",fontWeight:"normal"};
function nb(a,b){"GRC_c"in window||(window.GRC_c=0);this.B="readerpublishermodule"+window.GRC_c++;this.d=a;this.Q=Z.c;this.S=Z.t;this.ja=Z.s=="true";this.L=Z.b=="true";this.ia=Z.n=="true";this.ka=Z.w=="true";if(b){b.innerHTML=parseHTML("");b.id=this.B;ob(this,document.getElementById(this.B))}else{document.write('<div id="'+this.B+'" class="reader-publisher-module"></div>',"gl");var c=this;window.setTimeout(function(){ob(c,document.getElementById(c.B))},0)}}function pb(a){Z=a}
function ob(a,b){function c(q){return q}var d=qb(a);$(a,d.fa,b);if(a.S){var e=X("h3");$(a,d.ea,e);e.appendChild(ab(a.S));b.appendChild(e)}e=X("ul");$(a,d.da,e);for(var f=0,g;g=a.d.items[f];f++)if(g.alternate){var h=X("li");$(a,d.ca,h);var j=X("a",{href:c(g.alternate.href),title:g.title,"class":"i"});$(a,d.$,j);var i=gb(g.title||g.content);/^[\s\xa0]*$/.test(i==m?"":String(i))||(i=hb(i,48));j.appendChild(ab(i));h.appendChild(j);if(a.ja&&!a.L&&g.origin.title){var k=g.origin;j=X("div",{"class":"s"});
$(a,d.ba,j);h.appendChild(j);i=k.title;if(i.length>48)i=i.substring(0,48);j.innerHTML=parseHTML(bb("from <a>%1</a>",i));if(k.htmlUrl){k=X("a",{href:c(k.htmlUrl)});k.innerHTML=parseHTML(i);$(a,d.aa,k);j.replaceChild(k,j.getElementsByTagName("a")[0])}}if(a.ia&&!a.L){j="";g=g.annotations||[];for(i=0;k=g[i];i++)if(A(a.d.id,k.userId)&&k.content.length>0){j=k.content;break}if(j.length>0){g=X("div");$(a,d.Z,g);if(j.length>48)j=j.substring(0,48);g.innerHTML=parseHTML('"'+j+'"');h.appendChild(g)}}e.appendChild(h)}b.appendChild(e);e=X("div",
{"class":"f"});$(a,d.W,e);if(a.ka){f=X("a",{href:"http://www.google.com/webelements"});$(a,d.la,f);e.appendChild(f)}if(a.d.id){f=a.d.id.search(/^user\/(\d+)\/bundle\//)!=-1;h=a.d.id.indexOf("feed/")==0;g=a.d.alternate&&a.d.alternate.href;if(!h||f||g){g=X("a");$(a,d.f,g);g.appendChild(ab(qa("View all &raquo;")));if(f){var n=kb("http://www.google.com/reader/bundle/"+a.d.id);f=rb({Y:n,ha:"Preview &raquo;"});e.appendChild(f);$(a,d.V,$a(f,"gr-bundle-table"));$(a,d.U,$a(f,"gr-show-all"));$a(f,"gr-subscribe-button").onclick=
function(){window.location.href=parseURL(n)}}else{g.href=parseURL(h?a.d.alternate.href:kb("http://www.google.com/reader/shared/"+a.d.id));e.appendChild(g)}}}b.appendChild(e)}
function qb(a){if(a.Q=="-")return{};a=lb[a.Q];return{fa:{fontFamily:"arial, sans-serif",fontSize:"10pt",background:a.j,border:"solid 1px "+a.i,margin:"0.5em"},ea:{padding:"0.2em 0.5em",background:a.h,borderBottom:"solid 1px "+a.m,color:a.o},da:{padding:"0.2em",margin:"0 0.5em",overflow:"hidden"},ca:{listStyleType:"none",padding:"0.4em 0 0.4em 0"},$:{color:a.l,borderBottom:"solid 1px "+a.g},ba:{color:a.g},aa:{color:a.g},Z:{color:"#777",fontStyle:"italic"},W:{textAlign:"right",borderTop:"solid 1px "+
a.i,background:a.h,padding:"0.2em 8px",fontSize:"small",whiteSpace:"nowrap",overflow:"hidden"},f:{color:a.f,textDecoration:"underline"},V:{width:"100%"},U:{textAlign:"right"},la:{cssFloat:"left",styleFloat:"left",display:"block",width:"130px",height:"20px",background:I&&L<7?"none":"url(http://www.google.com/reader/ui/web-elements-logo.png)",filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(src=http://www.google.com/reader/ui/web-elements-logo.png,sizingMethod=crop)"}}}
function $(a,b,c){if(b){for(var d in mb)c.style[d]=mb[d];for(var e in b)c.style[e]=b[e]}}window.GRC_p=pb;window.GRC=nb;function rb(a,b){var c=b||new Y;c.append('<div><table class="gr-bundle-table"><tr><td><input class="gr-subscribe-button" type="button" value="',"Subscribe",'"></td><td class="gr-show-all"><a href="',z(String(a.Y)),'">',a.ha,"</a></td></tr></table></div>");if(!b){b=c.toString();c=document;a=c.createElement("div");a.innerHTML=parseHTML(b);if(a.childNodes.length==1)a=a.firstChild;else{for(b=c.createDocumentFragment();a.firstChild;)b.appendChild(a.firstChild);a=b}return a}};})();