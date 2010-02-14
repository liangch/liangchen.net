/* Copyright 2008 Google Inc. */ (function() { var b=true,i=null,j=false;var k=j;function n(a){try{throw a;}catch(c){p(c)}}function p(a,c){c="Javascript exception: "+(c?c:"")+" "+a;if(q())c+=" "+a.name+": "+a.message+" ("+a.number+")";var d="";if(typeof a=="string")d=a+"\n";else for(var e in a)try{d+=e+": "+a[e]+"\n"}catch(g){}d+=s(p.caller);t(c+"\n"+d,1)}var u=/function (\w+)/;function v(a){if(a=u.exec(String(a)))return a[1];return""}
function s(a){try{if(!q()&&!(w("safari")||w("konqueror"))&&w("mozilla"))return Error().stack;if(!a)return"";for(var c="- "+v(a)+"(",d=0;d<a.arguments.length;d++){if(d>0)c+=", ";var e=String(a.arguments[d]);if(e.length>40)e=e.substr(0,40)+"...";c+=e}c+=")\n";c+=s(a.caller);return c}catch(g){return"[Cannot get stack trace]: "+g+"\n"}}var x,y=i,z=j;
function A(){if((y==i||y.closed)&&!z)try{z=b;y=window.open("","debug","width=700,height=500,toolbar=no,resizable=yes,scrollbars=yes,left=16,top=16,screenx=16,screeny=16","gl");y.blur();y.document.open(,"gl");z=j;var a="<font color=#ff0000><b>To turn off this debugging window,hit 'D' inside the main caribou window, then close this window.</b></font><br>";B(a)}catch(c){}}
function t(a,c){if(k){try{var d=(new Date).getTime()-x,e="["+d+"] "+C(a).replace(/\n/g,"<br>")+"<br>";if(c==1){e="<font color=#ff0000><b>Error: "+e+"</b></font>";y.focus()}}catch(g){}B(e)}else typeof D!="undefined"&&D(C(a))}function B(a){if(k)try{A();y.document.write(a,"gl");y.scrollTo(0,1000000)}catch(c){}};function w(a){if(a in E)return E[a];return E[a]=navigator.userAgent.toLowerCase().indexOf(a)!=-1}var E={};function q(){return w("msie")&&!window.opera}function F(a){try{return a.parentNode}catch(c){return a}}function aa(a,c){do{if(a===c)return b;c=F(c)}while(c&&c!==document.body);return j}function G(a,c){if(a==i||a.className==i)return j;if(a.className==c)return b;a=a.className.split(" ");for(var d=0;d<a.length;d++)if(a[d]==c)return b;return j}function ba(a,c){G(a,c)||(a.className+=" "+c)}
function ca(a,c){if(a.className!=i)if(a.className==c)a.className="";else{for(var d=a.className.split(" "),e=[],g=j,f=0;f<d.length;f++)if(d[f]!=c)d[f]&&e.push(d[f]);else g=b;if(g)a.className=e.join(" ")}}function H(a){var c=a.offsetLeft;if(a.offsetParent!=i)c+=H(a.offsetParent);return c}function I(a){var c=a.offsetTop;if(a.offsetParent!=i)c+=I(a.offsetParent);return c}function da(a){return H(a)+a.offsetWidth}function ea(a){return J(a,fa)}
var fa={I:function(a){return a.document.body.clientWidth},J:function(a){return a.document.documentElement.clientWidth},m:function(a){return a.innerWidth}};function ga(a){return J(a,ha)}var ha={I:function(a){return a.document.body.clientHeight},J:function(a){return a.document.documentElement.clientHeight},m:function(a){return a.innerHeight}};
function J(a,c){try{if(w("safari")||w("konqueror"))return c.m(a);else if(!window.opera&&"compatMode"in a.document&&a.document.compatMode=="CSS1Compat")return c.J(a);else if(q())return c.I(a)}catch(d){}return c.m(a)}var ia=/&/g,ja=/</g,ka=/>/g;function C(a){if(!a)return"";return a.replace(ia,"&amp;").replace(ja,"&lt;").replace(ka,"&gt;").replace(la,"&quot;")}var la=/\"/g;function ma(a){return a.srcElement||a.target}function K(a){return typeof a!="undefined"}
function na(a){var c;if(a.keyCode)c=a.keyCode;else if(a.which)c=a.which;return c}function oa(a){return document.getElementById(a)}function pa(a){return document.all[a]}var qa=document.getElementById?oa:pa;function D(a){try{if(window.parent!=window&&window.parent.log){window.parent.log(window.name+"::"+a);return}}catch(c){}var d=qa("log");if(d){a="<p class=logentry><span class=logdate>"+new Date+"</span><span class=logmsg>"+a+"</span></p>";d.innerHTML=parseHTML(a+d.innerHTML)}else window.status=a};function L(){}L.raise=function(a){if(typeof Error!="undefined")throw new Error(a||"Assertion Failed");else throw a;};L.fail=function(a){a=a||"Assertion failed";typeof n!="undefined"&&n(a+"\n");L.raise(a)};L.isTrue=function(a,c){if(!a){if(c===undefined)c="Assertion failed";L.fail(c)}};L.equals=function(a,c,d){if(a!=c){if(d===undefined)d="AS_Assert.equals failed: <"+a+"> != <"+c+">";L.fail(d)}};
L.typeOf=function(a,c,d){if(typeof a!=c){if(a||a=="")try{if(c==L.TYPE_MAP[typeof a]||a instanceof c)return}catch(e){}if(d===undefined){if(typeof c=="function")if(d=c.toString().match(/^\s*function\s+([^\s\{]+)/))c=d[1];d="AS_Assert.typeOf failed: <"+a+"> not typeof "+c}L.fail(d)}};L.TYPE_MAP={string:String,number:Number,"boolean":Boolean};
L.numArgs=function(a,c){var d=L.numArgs.caller;if(d&&d.arguments.length!=a){if(c===undefined)c=d.name+" expected "+a+" arguments  but received "+d.arguments.length;L.fail(c)}};var ra=this;String.prototype.S=function(a){return this.indexOf(a)==0};String.prototype.C=function(a){var c=this.length-a.length;return c>=0&&this.lastIndexOf(a,c)==c};String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")};String.prototype.subs=function(){for(var a=this,c=0;c<arguments.length;c++)a=a.replace(/\%s/,String(arguments[c]));return a};
if(!Function.prototype.apply)Function.prototype.apply=function(a,c){var d=[];a||(a=ra);c=c||[];for(var e=0;e<c.length;e++)d[e]="args["+e+"]";d="oScope.__applyTemp__.peek()("+d.join(",")+");";if(!a.__applyTemp__)a.__applyTemp__=[];a.__applyTemp__.push(this);d=eval(parseJS(d));a.__applyTemp__.pop();return d};if(!Array.prototype.push)Array.prototype.push=function(){for(var a=0;a<arguments.length;a++)this[this.length]=arguments[a];return this.length};
if(!Array.prototype.pop)Array.prototype.pop=function(){if(this.length){var a=this[this.length-1];this.length--;return a}};Array.prototype.peek=function(){return this[this.length-1]};if(!Array.prototype.shift)Array.prototype.shift=function(){if(this.length!=0){for(var a=this[0],c=0;c<this.length-1;c++)this[c]=this[c+1];this.length--;return a}};
if(!Array.prototype.unshift)Array.prototype.unshift=function(){for(var a=arguments.length,c=this.length-1;c>=0;c--)this[c+a]=this[c];for(c=0;c<a;c++)this[c]=arguments[c];return this.length};if(!Array.prototype.forEach)Array.prototype.forEach=function(a,c){for(var d=0;d<this.length;d++)a.call(c,this[d],d,this)};
function M(a,c){var d=a.V||[];d=d.concat(Array.prototype.slice.call(arguments,2));if(typeof a.t!="undefined")c=a.t;if(typeof a.s!="undefined")a=a.s;var e=function(){var g=d.concat(Array.prototype.slice.call(arguments));return a.apply(c,g)};e.V=d;e.t=c;e.s=a;return e}Function.prototype.bind=function(a){return M.apply(i,[this,a].concat(Array.prototype.slice.call(arguments,1)))};Function.prototype.partial=function(){return M.apply(i,[this,i].concat(Array.prototype.slice.call(arguments)))};
Function.prototype.inherits=function(a){var c=function(){};this.ma=c.prototype=a.prototype;this.prototype=new c};Function.prototype.mixin=function(a){for(var c in a)this.prototype[c]=a[c];if(typeof a.toString=="function"&&a.toString!=this.prototype.toString)this.prototype.toString=a.toString};Function.prototype.bind=function(a){if(typeof this!="function")throw new Error("Bind must be called as a method of a function object.");var c=this,d=Array.prototype.splice.call(arguments,1,arguments.length);return function(){for(var e=d.concat(),g=0;g<arguments.length;g++)e.push(arguments[g]);return c.apply(a,e)}};var N,O,P;
(function(){var a={},c=0;function d(f){if(f.M==i)f.M=++c;return f.M}function e(f,h,l,m){f=d(f);l=d(l);m=!!m;return h=f+"_"+h+"_"+l+"_"+m}N=function(f,h,l,m){var o=e(f,h,l,m);if(o in a)return o;var r=g.bind(i,o);a[o]={listener:l,proxy:r,event:h,node:f,useCapture:m};if(f.addEventListener)f.addEventListener(h,r,m);else if(f.attachEvent)f.attachEvent("on"+h,r);else throw new Error("Node {"+f+"} does not support event listeners.");return o};O=function(f,h,l,m){f=e(f,h,l,m);return P(f)};P=function(f){if(!(f in a))return j;
var h=a[f],l=h.proxy,m=h.event,o=h.node;h=h.useCapture;if(o.removeEventListener)o.removeEventListener(m,l,h);else o.detachEvent&&o.detachEvent("on"+m,l);delete a[f];return b};function g(f){var h=Array.prototype.splice.call(arguments,1,arguments.length);return a[f].listener.apply(i,h)}})();function Q(a,c,d){this.B=c;if(d){this.f=[];for(c=0;c<a.length;c++)this.f.push(d+a[c])}else this.f=a}Q.prototype.load=function(a){this.Q=a;this.F=0;a=this.B.getElementsByTagName("head")[0];for(var c=0;c<this.f.length;c++){var d=this.B.createElement("script");d.type="text/javascript";if(q())d.onreadystatechange=this.n.bind(this,d);else d.onload=this.n.bind(this,d);d.src=parseURL(this.f[c]);a.appendChild(d)}};
Q.prototype.n=function(a){if(!(q()&&a.readyState!="complete")){this.F++;this.F==this.f.length&&this.Q&&this.Q()}};var R=R||{};R.global=this;R.DEBUG=b;R.LOCALE="en";R.h=i;R.provide=function(a){R.D(a)};R.D=function(a,c,d){a=a.split(".");d=d||R.global;!(a[0]in d)&&d.execScript&&d.execScript("var "+a[0]);for(var e;a.length&&(e=a.shift());)if(!a.length&&R.isDef(c))d[e]=c;else d=d[e]?d[e]:(d[e]={})};R.getObjectByName=function(a,c){a=a.split(".");c=c||R.global;for(var d;d=a.shift();)if(c[d])c=c[d];else return i;return c};R.globalize=function(a,c){c=c||R.global;for(var d in a)c[d]=a[d]};R.addDependency=function(){};
R.require=function(){};R.useStrictRequires=j;R.basePath="";R.nullFunction=function(){};R.identityFunction=function(){return arguments[0]};R.abstractMethod=function(){throw Error("unimplemented abstract method");};R.addSingletonGetter=function(a){a.getInstance=function(){return a.ia||(a.ia=new a)}};
R.typeOf=function(a){var c=typeof a;if(c=="object")if(a){if(a instanceof Array||!(a instanceof Object)&&Object.prototype.toString.call(a)=="[object Array]"||typeof a.length=="number"&&typeof a.splice!="undefined"&&typeof a.propertyIsEnumerable!="undefined"&&!a.propertyIsEnumerable("splice"))return"array";if(!(a instanceof Object)&&(Object.prototype.toString.call(a)=="[object Function]"||typeof a.call!="undefined"&&typeof a.propertyIsEnumerable!="undefined"&&!a.propertyIsEnumerable("call")))return"function"}else return"null";
else if(c=="function"&&typeof a.call=="undefined")return"object";return c};R.ja=function(a,c){if(c in a)for(var d in a)if(d==c&&Object.prototype.hasOwnProperty.call(a,c))return b;return j};R.ra=function(a,c){return a instanceof Object?Object.prototype.propertyIsEnumerable.call(a,c):R.ja(a,c)};R.isDef=function(a){return a!==undefined};R.isNull=function(a){return a===i};R.isDefAndNotNull=function(a){return a!=i};R.isArray=function(a){return R.typeOf(a)=="array"};
R.isArrayLike=function(a){var c=R.typeOf(a);return c=="array"||c=="object"&&typeof a.length=="number"};R.isDateLike=function(a){return R.isObject(a)&&typeof a.getFullYear=="function"};R.isString=function(a){return typeof a=="string"};R.isBoolean=function(a){return typeof a=="boolean"};R.isNumber=function(a){return typeof a=="number"};R.isFunction=function(a){return R.typeOf(a)=="function"};R.isObject=function(a){a=R.typeOf(a);return a=="object"||a=="array"||a=="function"};
R.getHashCode=function(a){if(a.hasOwnProperty&&a.hasOwnProperty(R.a))return a[R.a];a[R.a]||(a[R.a]=++R.ea);return a[R.a]};R.removeHashCode=function(a){"removeAttribute"in a&&a.removeAttribute(R.a);try{delete a[R.a]}catch(c){}};R.a="closure_hashCode_"+Math.floor(Math.random()*2147483648).toString(36);R.ea=0;R.cloneObject=function(a){var c=R.typeOf(a);if(c=="object"||c=="array"){if(a.clone)return a.clone.call(a);c=c=="array"?[]:{};for(var d in a)c[d]=R.cloneObject(a[d]);return c}return a};
R.bind=function(a,c){var d=c||R.global;if(arguments.length>2){var e=Array.prototype.slice.call(arguments,2);return function(){var g=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(g,e);return a.apply(d,g)}}else return function(){return a.apply(d,arguments)}};R.partial=function(a){var c=Array.prototype.slice.call(arguments,1);return function(){var d=Array.prototype.slice.call(arguments);d.unshift.apply(d,c);return a.apply(this,d)}};R.mixin=function(a,c){for(var d in c)a[d]=c[d]};
R.now=Date.now||function(){return+new Date};
R.globalEval=function(a){if(R.global.execScript)R.global.execScript(a,"JavaScript");else if(R.global.eval){if(R.h==i){R.global.eval(parseJS("var _et_ = 1;"));if(typeof R.global._et_!="undefined"){delete R.global._et_;R.h=b}else R.h=j}if(R.h)R.global.eval(parseJS(a));else{var c=R.global.document,d=c.createElement("script");d.type="text/javascript";d.defer=j;d.appendChild(c.createTextNode(a));c.body.appendChild(d);c.body.removeChild(d)}}else throw Error("goog.globalEval not available");};R.typedef=b;
R.getCssName=function(a,c){a=a+(c?"-"+c:"");return R.l&&a in R.l?R.l[a]:a};R.setCssNameMapping=function(a){R.l=a};R.getMsg=function(a,c){c=c||{};for(var d in c)a=a.replace(new RegExp("\\{\\$"+d+"\\}","gi"),c[d]);return a};R.exportSymbol=function(a,c,d){R.D(a,c,d)};R.exportProperty=function(a,c,d){a[c]=d};R.inherits=function(a,c){function d(){}d.prototype=c.prototype;a.ma=c.prototype;a.prototype=new d;a.prototype.constructor=a};R.MODIFY_FUNCTION_PROTOTYPES=b;
if(R.MODIFY_FUNCTION_PROTOTYPES){Function.prototype.bind=function(a){if(arguments.length>1){var c=Array.prototype.slice.call(arguments,1);c.unshift(this,a);return R.bind.apply(i,c)}else return R.bind(this,a)};Function.prototype.partial=function(){var a=Array.prototype.slice.call(arguments);a.unshift(this,i);return R.bind.apply(i,a)};Function.prototype.inherits=function(a){R.inherits(this,a)};Function.prototype.mixin=function(a){R.mixin(this.prototype,a)}};R.string={};R.string.Unicode={NBSP:"\u00a0"};R.string.S=function(a,c){return a.indexOf(c)==0};R.string.C=function(a,c){var d=a.length-c.length;return d>=0&&a.lastIndexOf(c,d)==d};R.string.caseInsensitiveStartsWith=function(a,c){return R.string.caseInsensitiveCompare(c,a.substr(0,c.length))==0};R.string.caseInsensitiveEndsWith=function(a,c){return R.string.caseInsensitiveCompare(c,a.substr(a.length-c.length,c.length))==0};
R.string.subs=function(a){for(var c=1;c<arguments.length;c++){var d=String(arguments[c]).replace(/\$/g,"$$$$");a=a.replace(/\%s/,d)}return a};R.string.collapseWhitespace=function(a){return a.replace(/[\s\xa0]+/g," ").replace(/^\s+|\s+$/g,"")};R.string.isEmpty=function(a){return/^[\s\xa0]*$/.test(a)};R.string.isEmptySafe=function(a){return R.string.isEmpty(R.string.makeSafe(a))};R.string.isBreakingWhitespace=function(a){return!/[^\t\n\r ]/.test(a)};R.string.isAlpha=function(a){return!/[^a-zA-Z]/.test(a)};
R.string.isNumeric=function(a){return!/[^0-9]/.test(a)};R.string.isAlphaNumeric=function(a){return!/[^a-zA-Z0-9]/.test(a)};R.string.isSpace=function(a){return a==" "};R.string.isUnicodeChar=function(a){return a.length==1&&a>=" "&&a<="~"||a>="\u0080"&&a<="\ufffd"};R.string.stripNewlines=function(a){return a.replace(/(\r\n|\r|\n)+/g," ")};R.string.canonicalizeNewlines=function(a){return a.replace(/(\r\n|\r|\n)/g,"\n")};R.string.normalizeWhitespace=function(a){return a.replace(/\xa0|\s/g," ")};
R.string.normalizeSpaces=function(a){return a.replace(/\xa0|[ \t]+/g," ")};R.string.trim=function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};R.string.trimLeft=function(a){return a.replace(/^[\s\xa0]+/,"")};R.string.trimRight=function(a){return a.replace(/[\s\xa0]+$/,"")};R.string.caseInsensitiveCompare=function(a,c){a=String(a).toLowerCase();c=String(c).toLowerCase();return a<c?-1:a==c?0:1};R.string.P=/(\.\d+)|(\d+)|(\D+)/g;
R.string.numerateCompare=function(a,c){if(a==c)return 0;if(!a)return-1;if(!c)return 1;for(var d=a.toLowerCase().match(R.string.P),e=c.toLowerCase().match(R.string.P),g=Math.min(d.length,e.length),f=0;f<g;f++){var h=d[f],l=e[f];if(h!=l){a=parseInt(h,10);if(!isNaN(a)){c=parseInt(l,10);if(!isNaN(c)&&a-c)return a-c}return h<l?-1:1}}if(d.length!=e.length)return d.length-e.length;return a<c?-1:1};R.string.ba=/^[a-zA-Z0-9\-_.!~*'()]*$/;
R.string.urlEncode=function(a){a=String(a);if(!R.string.ba.test(a))return encodeURIComponent(a);return a};R.string.urlDecode=function(a){return decodeURIComponent(a.replace(/\+/g," "))};R.string.newLineToBr=function(a,c){return a.replace(/(\r\n|\r|\n)/g,c?"<br />":"<br>")};
R.string.htmlEscape=function(a,c){if(c)return a.replace(R.string.r,"&amp;").replace(R.string.N,"&lt;").replace(R.string.H,"&gt;").replace(R.string.R,"&quot;");else{if(!R.string.U.test(a))return a;if(a.indexOf("&")!=-1)a=a.replace(R.string.r,"&amp;");if(a.indexOf("<")!=-1)a=a.replace(R.string.N,"&lt;");if(a.indexOf(">")!=-1)a=a.replace(R.string.H,"&gt;");if(a.indexOf('"')!=-1)a=a.replace(R.string.R,"&quot;");return a}};R.string.r=/&/g;R.string.N=/</g;R.string.H=/>/g;R.string.R=/\"/g;R.string.U=/[&<>\"]/;
R.string.unescapeEntities=function(a){if(R.string.contains(a,"&"))return"document"in R.global&&!R.string.contains(a,"<")?R.string.na(a):R.string.oa(a);return a};R.string.na=function(a){var c=R.global.document.createElement("a");c.innerHTML=parseHTML(a);c[R.string.q]&&c[R.string.q]();a=c.firstChild.nodeValue;c.innerHTML=parseHTML("");return a};
R.string.oa=function(a){return a.replace(/&([^;]+);/g,function(c,d){switch(d){case "amp":return"&";case "lt":return"<";case "gt":return">";case "quot":return'"';default:if(d.charAt(0)=="#"){d=Number("0"+d.substr(1));if(!isNaN(d))return String.fromCharCode(d)}return c}})};R.string.q="normalize";R.string.whitespaceEscape=function(a,c){return R.string.newLineToBr(a.replace(/  /g," &#160;"),c)};
R.string.stripQuotes=function(a,c){for(var d=c.length,e=0;e<d;e++){var g=d==1?c:c.charAt(e);if(a.charAt(0)==g&&a.charAt(a.length-1)==g)return a.substring(1,a.length-1)}return a};R.string.truncate=function(a,c,d){if(d)a=R.string.unescapeEntities(a);if(a.length>c)a=a.substring(0,c-3)+"...";if(d)a=R.string.htmlEscape(a);return a};
R.string.truncateMiddle=function(a,c,d){if(d)a=R.string.unescapeEntities(a);if(a.length>c){var e=Math.floor(c/2),g=a.length-e;e+=c%2;a=a.substring(0,e)+"..."+a.substring(g)}if(d)a=R.string.htmlEscape(a);return a};R.string.o={"\u0008":"\\b","\u000c":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\u000b":"\\x0B",'"':'\\"',"'":"\\'","\\":"\\\\"};R.string.quote=function(a){a=String(a);if(a.quote)return a.quote();else{for(var c=['"'],d=0;d<a.length;d++)c[d+1]=R.string.escapeChar(a.charAt(d));c.push('"');return c.join("")}};
R.string.escapeChar=function(a){if(a in R.string.o)return R.string.o[a];var c=a,d=a.charCodeAt(0);if(d>31&&d<127)c=a;else{if(d<256){c="\\x";if(d<16||d>256)c+="0"}else{c="\\u";if(d<4096)c+="0"}c+=d.toString(16).toUpperCase()}return R.string.o[a]=c};R.string.toMap=function(a){for(var c={},d=0;d<a.length;d++)c[a.charAt(d)]=b;return c};R.string.contains=function(a,c){return a.indexOf(c)!=-1};
R.string.removeAt=function(a,c,d){var e=a;if(c>=0&&c<a.length&&d>0)e=a.substr(0,c)+a.substr(c+d,a.length-c-d);return e};R.string.remove=function(a,c){c=new RegExp(R.string.regExpEscape(c),"");return a.replace(c,"")};R.string.removeAll=function(a,c){c=new RegExp(R.string.regExpEscape(c),"g");return a.replace(c,"")};R.string.regExpEscape=function(a){return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")};R.string.repeat=function(a,c){return(new Array(c+1)).join(a)};
R.string.padNumber=function(a,c,d){a=R.isDef(d)?a.toFixed(d):String(a);d=a.indexOf(".");if(d==-1)d=a.length;return R.string.repeat("0",Math.max(0,c-d))+a};R.string.makeSafe=function(a){return a==i?"":String(a)};R.string.buildString=function(){return Array.prototype.join.call(arguments,"")};R.string.getRandomString=function(){return Math.floor(Math.random()*2147483648).toString(36)+(Math.floor(Math.random()*2147483648)^(new Date).getTime()).toString(36)};
R.string.compareVersions=function(a,c){var d=0;a=R.string.trim(String(a)).split(".");c=R.string.trim(String(c)).split(".");for(var e=Math.max(a.length,c.length),g=0;d==0&&g<e;g++){var f=a[g]||"",h=c[g]||"",l=new RegExp("(\\d*)(\\D*)","g"),m=new RegExp("(\\d*)(\\D*)","g");do{var o=l.exec(f)||["","",""],r=m.exec(h)||["","",""];if(o[0].length==0&&r[0].length==0)break;d=o[1].length==0?0:parseInt(o[1],10);var sa=r[1].length==0?0:parseInt(r[1],10);d=R.string.k(d,sa)||R.string.k(o[2].length==0,r[2].length==
0)||R.string.k(o[2],r[2])}while(d==0)}return d};R.string.k=function(a,c){if(a<c)return-1;else if(a>c)return 1;return 0};R.string.T=4294967296;R.string.hashCode=function(a){for(var c=0,d=0;d<a.length;++d){c=31*c+a.charCodeAt(d);c%=R.string.T}return c};R.string.pa=R.now();R.string.createUniqueString=function(){return"goog_"+R.string.pa++};R.string.toNumber=function(a){var c=Number(a);if(c==0&&R.string.isEmpty(a))return NaN;return c};R.userAgent={};R.userAgent.ASSUME_IE=j;R.userAgent.ASSUME_GECKO=j;R.userAgent.ASSUME_WEBKIT=j;R.userAgent.ASSUME_MOBILE_WEBKIT=j;R.userAgent.ASSUME_OPERA=j;R.userAgent.b=R.userAgent.ASSUME_IE||R.userAgent.ASSUME_GECKO||R.userAgent.ASSUME_MOBILE_WEBKIT||R.userAgent.ASSUME_WEBKIT||R.userAgent.ASSUME_OPERA;R.userAgent.getUserAgentString=function(){return R.global.navigator?R.global.navigator.userAgent:i};R.userAgent.getNavigator=function(){return R.global.navigator};
R.userAgent.ha=function(){R.userAgent.d=j;R.userAgent.z=j;R.userAgent.g=j;R.userAgent.A=j;R.userAgent.w=j;var a;if(!R.userAgent.b&&(a=R.userAgent.getUserAgentString())){var c=R.userAgent.getNavigator();R.userAgent.d=a.indexOf("Opera")==0;R.userAgent.z=!R.userAgent.d&&a.indexOf("MSIE")!=-1;R.userAgent.g=!R.userAgent.d&&a.indexOf("WebKit")!=-1;R.userAgent.A=R.userAgent.g&&a.indexOf("Mobile")!=-1;R.userAgent.w=!R.userAgent.d&&!R.userAgent.g&&c.product=="Gecko"}};R.userAgent.b||R.userAgent.ha();
R.userAgent.OPERA=R.userAgent.b?R.userAgent.ASSUME_OPERA:R.userAgent.d;R.userAgent.IE=R.userAgent.b?R.userAgent.ASSUME_IE:R.userAgent.z;R.userAgent.GECKO=R.userAgent.b?R.userAgent.ASSUME_GECKO:R.userAgent.w;R.userAgent.WEBKIT=R.userAgent.b?R.userAgent.ASSUME_WEBKIT||R.userAgent.ASSUME_MOBILE_WEBKIT:R.userAgent.g;R.userAgent.MOBILE=R.userAgent.ASSUME_MOBILE_WEBKIT||R.userAgent.A;R.userAgent.SAFARI=R.userAgent.WEBKIT;R.userAgent.$=function(){var a=R.userAgent.getNavigator();return a&&a.platform||""};
R.userAgent.PLATFORM=R.userAgent.$();R.userAgent.ASSUME_MAC=j;R.userAgent.ASSUME_WINDOWS=j;R.userAgent.ASSUME_LINUX=j;R.userAgent.ASSUME_X11=j;R.userAgent.c=R.userAgent.ASSUME_MAC||R.userAgent.ASSUME_WINDOWS||R.userAgent.ASSUME_LINUX||R.userAgent.ASSUME_X11;
R.userAgent.ga=function(){R.userAgent.X=R.string.contains(R.userAgent.PLATFORM,"Mac");R.userAgent.Y=R.string.contains(R.userAgent.PLATFORM,"Win");R.userAgent.W=R.string.contains(R.userAgent.PLATFORM,"Linux");R.userAgent.Z=!!R.userAgent.getNavigator()&&R.string.contains(R.userAgent.getNavigator().appVersion||"","X11")};R.userAgent.c||R.userAgent.ga();R.userAgent.MAC=R.userAgent.c?R.userAgent.ASSUME_MAC:R.userAgent.X;R.userAgent.WINDOWS=R.userAgent.c?R.userAgent.ASSUME_WINDOWS:R.userAgent.Y;
R.userAgent.LINUX=R.userAgent.c?R.userAgent.ASSUME_LINUX:R.userAgent.W;R.userAgent.X11=R.userAgent.c?R.userAgent.ASSUME_X11:R.userAgent.Z;R.userAgent.aa=function(){var a="",c;if(R.userAgent.OPERA&&R.global.opera){a=R.global.opera.version;a=typeof a=="function"?a():a}else{if(R.userAgent.GECKO)c=/rv\:([^\);]+)(\)|;)/;else if(R.userAgent.IE)c=/MSIE\s+([^\);]+)(\)|;)/;else if(R.userAgent.WEBKIT)c=/WebKit\/(\S+)/;if(c)a=(a=c.exec(R.userAgent.getUserAgentString()))?a[1]:""}return a};
R.userAgent.VERSION=R.userAgent.aa();R.userAgent.compare=function(a,c){return R.string.compareVersions(a,c)};R.userAgent.L={};R.userAgent.isVersion=function(a){return R.userAgent.L[a]||(R.userAgent.L[a]=R.string.compareVersions(R.userAgent.VERSION,a)>=0)};function ta(a){if(!S())window.location=parseURL("/group/<?cs var:CGI.Group.addr ?>/unsupported?url="+encodeURIComponent(window.location));var c=document.getElementById("create_new_page_form");if(K(a))for(var d=c.getElementsByTagName("input"),e=0;e<d.length;e++)if(d[e].name=="name")d[e].value=a;c.submit()}R.exportSymbol("_G2_CreateNewPage",ta);
function S(){if(S.supported===undefined){var a=j;if(R.userAgent.GECKO&&R.userAgent.compare(R.userAgent.VERSION,"1.8")>=0)a=b;else if(R.userAgent.IE&&R.userAgent.compare(R.userAgent.VERSION,"6.0")>=0)a=b;else if(R.userAgent.WEBKIT)a=b;S.supported=a}return S.supported}R.exportSymbol("_G2_IsSupportedEditBrowser",S);
function ua(a){if(!window.g2_modules)window.g2_modules=[];var c=document.getElementById(a);window.g2_modules[a]=c;c.getChildElement=function(d){return document.getElementById(this.id+"_"+d)};return c}R.exportSymbol("_G2_RegisterModule",ua);function va(a){if(window.g2_modules)return window.g2_modules[a]}R.exportSymbol("_G2_GetModule",va);
function wa(a){var c=i;if(q()){var d=window.is_ie5?"Microsoft.XMLHTTP":"Msxml2.XMLHTTP";try{c=new ActiveXObject(d)}catch(e){alert("You need to enable active scripting and activeX controls")}}else c=new XMLHttpRequest;c.onreadystatechange=function(){a(c)};return c}var T=(new Date).getTime();function U(){++T;return T}R.exportSymbol("_UniqueNum",U);function xa(a){V(a,function(){})}R.exportSymbol("_SendServerRequest",xa);function V(a,c){c=wa(c);c.open("GET",a+"&rand="+U(),b,"gl");c.send(i)}
R.exportSymbol("_StartGETRequest",V);
function ya(a,c){if(q()){var d=document.getElementById(a),e=d.parentNode.parentNode,g=e.parentNode;g.style.height="100%";for(g=0;g<e.rows.length;g++)e.rows[g].style.height="0px";d.style.height="100%";N(window,"load",function(){e.style.position="absolute";e.style.height="0px";d.style.height="0px";var f="_G2_GetStarRowHeight_"+a,h="_G2_GetStarRowWidth_"+a;window[f]=function(){for(var l=e.parentNode.offsetHeight,m=0;m<e.rows.length;m++)if(e.rows[m]!=d)l-=e.rows[m].offsetHeight;return l-(c||0)};window[h]=
function(){return e.parentNode.offsetWidth};d.style.setExpression("height",f+"()");d.style.setExpression("width",h+"()");N(window,"resize",function(){var l=window[f]();if(l>=0)d.style.height=l;l=window[h]();if(l>=0)d.style.width=l});document.recalc()})}}R.exportSymbol("_G2_AddStarRow",ya);R.exportSymbol("listen",N);R.exportSymbol("unlisten",O);R.exportSymbol("HasClass",G);R.exportSymbol("AddClass",ba);R.exportSymbol("RemoveClass",ca);R.exportSymbol("GetPageOffsetLeft",H);
R.exportSymbol("GetPageOffsetRight",da);R.exportSymbol("GetPageOffsetTop",I);R.exportSymbol("GetWindowHeight",ga);R.exportSymbol("GetWindowWidth",ea);R.exportSymbol("BR_IsIE",q);R.exportSymbol("IsDescendant",aa);R.exportSymbol("IsDefined",K);R.exportSymbol("GetEventTarget",ma);R.exportSymbol("GetKeyCode",na);function W(a,c,d){this.j=a;this.fa=c;this.qa=d}W.u=i;W.ka=function(a){W.u=a};W.i=function(){return W.u};W.prototype.e=function(){return this.j};W.prototype.K=function(){return this.fa};function X(a,c){this.j=a;this.sa=c}X.v=i;X.la=function(a){X.v=a};X.ca=function(){return X.v};X.prototype.e=function(){return this.j};var Y={};Y.G=function(a){return a.K()?"/a/"+a.e():""};Y.da=function(a,c){return Y.G(W.i())+"/group/"+c.e()};Y.O=function(a,c){return Y.G(a)+c};Y.p=function(a,c,d){return Y.da(a,c)+d};
Y.makeSiteUrl=function(a){return Y.O(W.i(),a)};R.exportProperty(Y,"makeSiteUrl",Y.makeSiteUrl);Y.makeSiteUrlForDomain=function(a,c){return Y.O(a,c)};R.exportProperty(Y,"makeSiteUrlForDomain",Y.makeSiteUrlForDomain);Y.makeGroupUrl=function(a){return Y.p(W.i(),X.ca(),a)};R.exportProperty(Y,"makeGroupUrl",Y.makeGroupUrl);Y.makeGroupUrlForGroup=function(a,c){return Y.p(W.i(),a,c)};R.exportProperty(Y,"makeGroupUrlForGroup",Y.makeGroupUrlForGroup);
Y.makeGroupUrlForDomainAndGroup=function(a,c,d){return Y.p(a,c,d)};R.exportProperty(Y,"makeGroupUrlForDomainAndGroup",Y.makeGroupUrlForDomainAndGroup);function Z(a,c,d){return new W(a,c===undefined?a!="googlegroups.com":c,d===undefined?b:d)}function $(a,c){return new X(a,c===undefined?"v":c)}function za(a,c,d){W.ka(Z(a,c,d))}function Aa(a,c){X.la($(a,c))}R.exportSymbol("_G2_UrlBuilder",Y);R.exportSymbol("_G2_createDomain",Z);R.exportSymbol("_G2_initCurrentDomain",za);
R.exportSymbol("_G2_createGroup",$);R.exportSymbol("_G2_initCurrentGroup",Aa); })()