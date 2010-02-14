/* Copyright 2008 Google Inc. */ (function() { var b=true,j=null,k=false,m=m||{};m.global=this;m.DEBUG=b;m.LOCALE="en";m.b=j;m.provide=function(a){m.d(a)};m.d=function(a,c,d){a=a.split(".");d=d||m.global;!(a[0]in d)&&d.execScript&&d.execScript("var "+a[0]);for(var e;a.length&&(e=a.shift());)if(!a.length&&m.isDef(c))d[e]=c;else d=d[e]?d[e]:(d[e]={})};m.getObjectByName=function(a,c){a=a.split(".");c=c||m.global;for(var d;d=a.shift();)if(c[d])c=c[d];else return j;return c};m.globalize=function(a,c){c=c||m.global;for(var d in a)c[d]=a[d]};
m.addDependency=function(){};m.require=function(){};m.useStrictRequires=k;m.basePath="";m.nullFunction=function(){};m.identityFunction=function(){return arguments[0]};m.abstractMethod=function(){throw Error("unimplemented abstract method");};m.addSingletonGetter=function(a){a.getInstance=function(){return a.f||(a.f=new a)}};
m.typeOf=function(a){var c=typeof a;if(c=="object")if(a){if(a instanceof Array||!(a instanceof Object)&&Object.prototype.toString.call(a)=="[object Array]"||typeof a.length=="number"&&typeof a.splice!="undefined"&&typeof a.propertyIsEnumerable!="undefined"&&!a.propertyIsEnumerable("splice"))return"array";if(!(a instanceof Object)&&(Object.prototype.toString.call(a)=="[object Function]"||typeof a.call!="undefined"&&typeof a.propertyIsEnumerable!="undefined"&&!a.propertyIsEnumerable("call")))return"function"}else return"null";
else if(c=="function"&&typeof a.call=="undefined")return"object";return c};m.g=function(a,c){if(c in a)for(var d in a)if(d==c&&Object.prototype.hasOwnProperty.call(a,c))return b;return k};m.h=function(a,c){return a instanceof Object?Object.prototype.propertyIsEnumerable.call(a,c):m.g(a,c)};m.isDef=function(a){return a!==undefined};m.isNull=function(a){return a===j};m.isDefAndNotNull=function(a){return a!=j};m.isArray=function(a){return m.typeOf(a)=="array"};
m.isArrayLike=function(a){var c=m.typeOf(a);return c=="array"||c=="object"&&typeof a.length=="number"};m.isDateLike=function(a){return m.isObject(a)&&typeof a.getFullYear=="function"};m.isString=function(a){return typeof a=="string"};m.isBoolean=function(a){return typeof a=="boolean"};m.isNumber=function(a){return typeof a=="number"};m.isFunction=function(a){return m.typeOf(a)=="function"};m.isObject=function(a){a=m.typeOf(a);return a=="object"||a=="array"||a=="function"};
m.getHashCode=function(a){if(a.hasOwnProperty&&a.hasOwnProperty(m.a))return a[m.a];a[m.a]||(a[m.a]=++m.e);return a[m.a]};m.removeHashCode=function(a){"removeAttribute"in a&&a.removeAttribute(m.a);try{delete a[m.a]}catch(c){}};m.a="closure_hashCode_"+Math.floor(Math.random()*2147483648).toString(36);m.e=0;m.cloneObject=function(a){var c=m.typeOf(a);if(c=="object"||c=="array"){if(a.clone)return a.clone.call(a);c=c=="array"?[]:{};for(var d in a)c[d]=m.cloneObject(a[d]);return c}return a};
m.bind=function(a,c){var d=c||m.global;if(arguments.length>2){var e=Array.prototype.slice.call(arguments,2);return function(){var h=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(h,e);return a.apply(d,h)}}else return function(){return a.apply(d,arguments)}};m.partial=function(a){var c=Array.prototype.slice.call(arguments,1);return function(){var d=Array.prototype.slice.call(arguments);d.unshift.apply(d,c);return a.apply(this,d)}};m.mixin=function(a,c){for(var d in c)a[d]=c[d]};
m.now=Date.now||function(){return+new Date};
m.globalEval=function(a){if(m.global.execScript)m.global.execScript(a,"JavaScript");else if(m.global.eval){if(m.b==j){m.global.eval(parseJS("var _et_ = 1;"));if(typeof m.global._et_!="undefined"){delete m.global._et_;m.b=b}else m.b=k}if(m.b)m.global.eval(parseJS(a));else{var c=m.global.document,d=c.createElement("script");d.type="text/javascript";d.defer=k;d.appendChild(c.createTextNode(a));c.body.appendChild(d);c.body.removeChild(d)}}else throw Error("goog.globalEval not available");};m.typedef=b;
m.getCssName=function(a,c){a=a+(c?"-"+c:"");return m.c&&a in m.c?m.c[a]:a};m.setCssNameMapping=function(a){m.c=a};m.getMsg=function(a,c){c=c||{};for(var d in c)a=a.replace(new RegExp("\\{\\$"+d+"\\}","gi"),c[d]);return a};m.exportSymbol=function(a,c,d){m.d(a,c,d)};m.exportProperty=function(a,c,d){a[c]=d};m.inherits=function(a,c){function d(){}d.prototype=c.prototype;a.i=c.prototype;a.prototype=new d;a.prototype.constructor=a};m.MODIFY_FUNCTION_PROTOTYPES=b;
if(m.MODIFY_FUNCTION_PROTOTYPES){Function.prototype.bind=function(a){if(arguments.length>1){var c=Array.prototype.slice.call(arguments,1);c.unshift(this,a);return m.bind.apply(j,c)}else return m.bind(this,a)};Function.prototype.partial=function(){var a=Array.prototype.slice.call(arguments);a.unshift(this,j);return m.bind.apply(j,a)};Function.prototype.inherits=function(a){m.inherits(this,a)};Function.prototype.mixin=function(a){m.mixin(this.prototype,a)}};function n(a){if(a.readyState==4)if(a.status==200){a=a.responseText;if(!(a.length<1))if(!(a[0]!=100||a.length!=3)){var c="watch"+a[1]+"@"+a[2];a=window.document.getElementsByName(c);c=window.document.getElementsByName(c+"_img");for(var d=0;d<a.length;d++){a[d].setAttribute("value",0);c[d].src=parseURL("/groups/img/watched_n.gif");a[d].blur()}}}}var p=["Click the star to watch this topic","Watching this topic","Click the envelope to receive email updates","Receiving thread updates via email"];
function q(a,c,d){this.id="rating_holder_"+a;this.rating=c;this.text=d}m.exportSymbol("RAT_RatingHolder",q);var u=j;function v(){u=j;window.document.body.parentNode.onmouseup=j}function w(a,c,d){u=d;window.document.body.parentNode.onmouseup=v;x(a,c)}m.exportSymbol("RAT_startTrackingStars",w);function y(a){window.is_ie&&u!=j&&a.button==0&&v()}m.exportSymbol("RAT_mouseMove",y);function z(a,c,d,e,h){if(u!=j&&u==e){x(c,d);A(a,c,d,e,h);u=j}}m.exportSymbol("RAT_mouseUpInStar",z);
function A(a,c,d,e,h){window._SendServerRequest(window._G2_UrlBuilder.makeGroupUrl("/ratings?did="+c+"&rat="+d+"&tok="+h));e.rating=d;e.text="Rating Saved";a=window.document.getElementById("ratings_text_"+c);a.innerHTML=parseHTML(e.text);if(e.text=="Text for clearing space")a.style.display="none"}
function B(a,c,d){if(!(u!=j&&u!=d)){if(u!=j&&u==d)x(a,c);else for(d=1;d<=c;d++)window.document.getElementById("s"+d+"_"+a+"_img").src=parseURL("/groups/img/yellow_star_lite.gif");a=window.document.getElementById("ratings_text_"+a);a.style.display="inline";switch(c){case "1":a.innerHTML=parseHTML("Poor, I would not recommend this post");break;case "2":a.innerHTML=parseHTML("Below Average");break;case "3":a.innerHTML=parseHTML("Average");break;case "4":a.innerHTML=parseHTML("Above Average");break;case "5":a.innerHTML=parseHTML("Excellent, I would recommend this post");
break;default:break}}}m.exportSymbol("RAT_hesitateStars",B);function C(a,c,d){x(a,d.rating);a=window.document.getElementById("ratings_text_"+a);a.innerHTML=parseHTML(d.text);if(d.text=="Text for clearing space")a.style.display="none"}m.exportSymbol("RAT_unhesStars",C);
function x(a,c){for(var d=1;d<=5;d++)if(d<=c)window.document.getElementById("s"+d+"_"+a+"_img").src=parseURL("/groups/img/yellow_star_blue_outline.gif");else window.document.getElementById("s"+d+"_"+a+"_img").src=parseURL("/groups/img/clear_star_blue_outline.gif")}m.exportSymbol("RAT_lightStars",x);
function D(a,c,d,e){var h="watch"+c+"@"+d,g=window.document.getElementsByName(h);h=window.document.getElementsByName(h+"_img");var i="threadsub"+c+"@"+d,l=window.document.getElementsByName(i),o=window.document.getElementsByName(i+"_img"),r=window.document.getElementsByName(i+"_lnk0");i=window.document.getElementsByName(i+"_lnk2");if(g.length<1)return k;var s;try{s=parseInt(g[0].getAttribute("value"),10)}catch(J){s=1}if(l.length<1)if(e==2)return k;var t;try{t=parseInt(l[0].getAttribute("value"),10)}catch(K){t=
0}if(e==1)for(var f=0;f<g.length;f++){if(s==0){g[f].setAttribute("value",1);h[f].src=parseURL("/groups/img/watched_y.gif");h[f].title=p[1]}else{g[f].setAttribute("value",0);h[f].src=parseURL("/groups/img/watched_n.gif");h[f].title=p[0]}g[f].blur()}else for(f=0;f<l.length;f++){if(t==0){l[f].setAttribute("value",1);if(o.length>f)o[f].src=parseURL("/groups/img/threadsub_y.gif");if(o.length>f)o[f].title=p[3];if(r.length>f)r[f].style.display="";if(i.length>f)i[f].style.display="none"}else{l[f].setAttribute("value",0);if(o.length>f)o[f].src=
parseURL("/groups/img/threadsub_n.gif");if(o.legnth>f)o[f].title=p[2];if(r.length>f)r[f].style.display="none";if(i.length>f)i[f].style.display=""}l[f].blur()}g=2*t+s;a=window._G2_UrlBuilder.makeGroupUrlForGroup(window._G2_createGroup(c),"/watch_topic?Action.JS=1&WebToken="+a+"&tid="+d+"&oldstate="+g+"&email="+(e==2?"1":"0"));window._StartGETRequest(a,n);if(a=window.is_ie?window.event:this)if(window.is_ie){a.cancelBubble=b;a.returnValue=k}return k}m.exportSymbol("toggleStar",D);
function E(a,c,d,e){var h="watch"+d+"_"+e;d=window.document.getElementsByName(h);h=window.document.getElementsByName(h+"_img");if(!(d.length<1)){var g;try{g=parseInt(d[0].getAttribute("value"),10)}catch(i){g=1}for(var l=0;l<d.length;l++){if(g==1){d[l].setAttribute("value",0);h[l].src=parseURL("/groups/img/watched_n.gif")}else{d[l].setAttribute("value",1);h[l].src=parseURL("/groups/img/watched_y.gif")}d[l].blur()}a=window._G2_UrlBuilder.makeGroupUrlForGroup(window._G2_createGroup(c),"/watch_topic?Action.JS=1&WebToken="+
a+"&tid="+e+"&oldstate="+g+"&email=0");window._SendServerRequest(a);if(a=window.is_ie?window.event:this){if(window.is_ie){a.cancelBubble=b;a.returnValue=k}return k}return k}}m.exportSymbol("toggle_watch",E);function F(a,c){a="threadsub"+a+"@"+c;a=window.document.getElementsByName(a);if(a.length<1)return k;var d;try{d=parseInt(a[0].getAttribute("value"),10)}catch(e){return k}return d?b:k}m.exportSymbol("TS_isThreadSubbed",F);
function G(a,c,d,e){if(a.readyState<=3){c.style.display="none";d.style.display="inline";e.style.display="none"}else{c.style.display="none";d.style.display="none";e.style.display="inline"}}
function H(a,c,d,e){a=window.document.getElementById("thrsp"+c);var h=a.getElementsByTagName("div");window._StartGETRequest(window._G2_UrlBuilder.makeGroupUrl("/spam_rating?thread="+c+"&tok="+d),function(g){G(g,h[0],h[1],h[2]);if(e&&g.readyState==4){var i=document.getElementsByName("spam_report");for(g=0;g<i.length;++g)i[g].style.display="none";i=document.getElementsByName("spam_progress");for(g=0;g<i.length;++g)i[g].style.display="none";i=document.getElementsByName("spam_reported");for(g=0;g<i.length;++g)i[g].style.display=
"inline"}});return b}m.exportSymbol("reportThreadSpam",H);function I(a,c,d){a="sp"+c;a=window.document.getElementById(a);var e=a.getElementsByTagName("div");window._StartGETRequest(window._G2_UrlBuilder.makeGroupUrl("/spam_rating?msg="+c+"&tok="+d),function(h){G(h,e[0],e[1],e[2])});return b}m.exportSymbol("reportMessageSpam",I); })()