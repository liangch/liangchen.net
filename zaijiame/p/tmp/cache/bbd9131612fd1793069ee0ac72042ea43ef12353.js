if(!Array.forEach){Array.prototype.forEach=function(D,E){var C=E||window;for(var B=0,A=this.length;B<A;++B){D.call(C,this[B],B,this)}};Array.prototype.map=function(E,F){var D=F||window;var A=[];for(var C=0,B=this.length;C<B;++C){A.push(E.call(D,this[C],C,this))}return A}}if(!Array.remove){Array.remove=function(D,C,B){var A=D.slice((B||C)+1||D.length);D.length=C<0?D.length+C:C;return D.push.apply(D,A)}}Function.prototype.method=function(A,B){this.prototype[A]=B;return this};Function.prototype.augmentProto=function(A){for(key in A){this.prototype[key]=A[key]}return this};window.twttr=window.twttr||{};twttr.augmentObject=function(B,C){for(var A in C){B[A]=C[A]}return B};twttr.augmentObject(twttr,{namespaceOf:function(A){return twttr.is.object(A)?A:window},extend:function(B,C){var A=function(){};A.prototype=C.prototype;B.prototype=new A();B.prototype.constructor=B;B.uber=C.prototype;if(C.prototype.constructor==Object.prototype.constructor){C.prototype.constructor=C}},klass:function(A,B){return twttr.magic(A,B)},augmentAndExtend:function(A,B,C){ns=twttr.namespaceOf(A);ns[B]=function(){ns[B].uber.constructor.apply(this,arguments)};twttr.extend(ns[B],C);return ns[B]},auxo:function(C,D,B){var A=twttr.is.object(B)?B:twttr;return twttr.augmentAndExtend(A,C,D)},augmentString:function(C,A){var B=window;C.split(".").forEach(function(F,E,D){B=B[F]=B[F]||(twttr.is.def(D[E+1])?{}:A)});return B},magic:function(B,A){if(twttr.is.string(B)){return twttr.augmentString(B,A)}else{return twttr.augmentObject(B,A)}},inspect:function(B){console.clear();var C=$(B);var H=C.data("events");var A=0;var G=0;var E=[];var D=[];for(key in H){E.push(key);A++;D.push("\n*******************\n");D.push("Events for "+key+"\n\n");for(fn in H[key]){var F=H[key][fn];G++;D.push(F.toString()+"\n")}}console.log("************* Summary *************");console.log("for element",C);console.log(A+" types of events",E);console.log(G,"Total Event Listeners");console.log("Event listeners assigned to element");console.log(D.join(" "))},is:{bool:function(A){return typeof A==="boolean"},def:function(A){return !(typeof A==="undefined")},number:function(A){return typeof A==="number"&&isFinite(A)},fn:function(A){return typeof A==="function"},array:function(A){return A?this.number(A.length)&&this.fn(A.splice):false},string:function(A){return typeof A==="string"},object:function(A){return(A&&(typeof A==="object"||this.fn(A)))||false}}});if(!window.console){var names=["log","debug","info","warn","error","assert","dir","dirxml","group","groupEnd","time","timeEnd","count","trace","profile","profileEnd"];window.console={};for(var i=0;i<names.length;++i){window.console[names[i]]=function(){}}}function _(C,A){if(twttr.i18n){var B=twttr.i18n[C];if(B){C=B}}return replaceParams(C,A)}function replaceParams(B,A){if(A){for(var C in A){B=B.replace(new RegExp("\\%\\{"+C+"\\}","gi"),A[C])}}return B}var h=function(){var A=$("<div/>");return function(B){return B?A.text(B).html().replace(/\"/gi,"&quot;"):B}}();function unh(A){return A?A.replace(/&(amp;)+/g,"&").replace(/&[a-z]+;/gi,function(B){if(unh.HTML_ESCAPE_TOKENS[B]){return unh.HTML_ESCAPE_TOKENS[B]}return B}):A}window.unh.HTML_ESCAPE_TOKENS={"&lt;":"<","&gt;":">","&quot;":'"'};function addSlashes(A){return A.replace(/\'/g,"\\'").replace(/\"/g,'\\"')}var reverseString=function(A){return A?A.split("").reverse().join(""):A};var numberWithDelimiter=function(B,A,C){A=A?A:",";C=C?C:".";parts=(""+B).split(".");parts[0]=reverseString(reverseString(parts[0]).replace(/(\d\d\d)/g,"$1"+A));if(parts[0][0]==A){parts[0]=parts[0].substring(1)}return parts.join(C)};var timeAgo=function(C){if(!C){return false}var H=new Date();var G=new Date(C);if(document.all){G=Date.parse(C.replace(/( \+)/," UTC$1"))}var D=H-G;var B=1000,F=B*60,A=F*60;if(isNaN(D)||D<0){return false}var E=-1;$.each([5,10,20],function(){if(D<this*B){E=this;return false}});if(E!=-1){return _("less than %{time} seconds ago",{time:E})}if(D<B*40){return _("half a minute ago")}if(D<F){return _("less than a minute ago")}if(D<B*90){return _("1 minute ago")}if(D<F*45){return _("%{time} minutes ago",{time:Math.round(D/F)})}if(D<F*90){return _("about 1 hour ago")}if(D<A*24){return _("about %{time} hours ago",{time:Math.round(D/A)})}return false};var updateTimeAgo=function(){$(".timestamp").each(function(){var B=$(this);var A=timeAgo(B.meta().time);if(A&&B.find("*").length==0){B.html(A)}});$(".timestamp-title").each(function(){var B=$(this);var A=timeAgo(B.meta().time);if(A){B.attr("title",A)}})};var DEBUG=false;$.extend({log:function(A){if(window.console){console.log(A)}},debug:function(A){if(DEBUG){console.log(A)}},inspect:function(B){var A="{\n";for(var C in B){A+="\t"+C+": "+B[C]+"\n"}A+="}";console.log(A);return A}});(function(){if(document.all){if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var A=new Number(RegExp.$1);if(A>=8){$.browser.msie8=true}else{if(A>=7){$.browser.msie7=true}else{$.browser.msie6=true}}}}})();var _tmp={};twttr.augmentObject(twttr,{timeouts:{},processJson:function(json){if(typeof (json)=="object"){var evals=[];$.each(json,function(selector,content){var c=selector.charAt(0);if(c=="$"){evals.push(content)}else{if(c=="!"){var notification=window[selector.substring(1)+"Notification"];if(notification){(new notification()).setMessage(content).show()}}else{var $contentPadded=$("<div></div>").html(content);var $content=$(selector,$contentPadded);if($content.length==1){$(selector).replaceWith($content)}else{$(selector).html(content)}$(selector).show()}}});$.each(evals,function(index,js){if(js){eval(parseJS(js))}})}},truncateToHeight:function(B,C,G,A,E){if(!E){E={}}if(!E.minlength){E.minlength=0}if(!E.extra_text){E.extra_text=""}if(E.minlength&&(B.length<E.minlength)){C.text(B);return B}var F=B.substring(0,E.minlength);for(var D=E.minlength;D<B.length;D++){F+=B.charAt(D);C.text(F+"..."+E.extra_text);if(A>=0&&G.height()>A){C.text(F=F.substring(0,F.length-1)+"...");return F}}C.text(F);return F},googleAnalytics:function(A){if(window.pageTracker){window.pageTracker._trackEvent("Ajax","refresh",A,null)}},trackPageView:function(C,B,D){if(window.pageTracker){var A;if(C){A=C.toString();if(B){A="/search/tweets/"+encodeURIComponent(h(page.query))}if(D){A=A+D}window.pageTracker._trackPageview(A)}else{window.pageTracker._trackPageview()}}},fadeAndReplace:function(A,B){$(A).fadeOut("medium",function(){$(A).html(B)});$(A).fadeIn("medium")},error:function(A){alert(A?A:_("Whoops! Something went wrong. Please refresh the page and try again!"))},loading:function(){$("#loader").fadeIn(200)},loaded:function(){$("#loader").fadeOut(200)},updateLocation:function(A,E){if(!E){E=document}if(A){var D=A.replace(/^https?:\/\/.+?\//,"").replace(/#/gi,"%23").replace(/\s/gi,"+");var C=D.replace(/[^\w\d_-].*$/,"");var B=(C.length>0)?$(E).find("#"+C):[];if(B.length>0){B.get(0).id=C+"_tmp_for_update_location"}E.location.hash=D;if(B.length>0){B.get(0).id=C}}},NON_CHAR_KEY_CODES:[8,9,16,17,18,19,20,27,33,34,35,36,37,38,39,40,45,46,91,92,93],isNonCharKeyCode:function(A){return $.inArray(A.keyCode,twttr.NON_CHAR_KEY_CODES)!=-1||((A.ctrlKey||A.metaKey)&&$.inArray(A.keyCode,[67,88])!=-1)}});$.extend($.expr[":"],{onthepage:"($(elem).is(':visible') && $(elem).parents(':hidden').length == 0)"});$.fn.move=function(A){var B=$(this).html();$(this).remove();$(A).html(B)};$.fn.meta=function(){var B={type:"attr",name:"data"};var C=$(this);if(C.length==1){return C.metadata(B)}else{var A=[];C.each(function(){A.push($(this).metadata(B))});return A}};$.fn.isLoading=function(){$(this).addClass("loading")};$.fn.isLoaded=function(){$(this).removeClass("loading")};$.fn.replace_text=function(C,B){var A=$(this).html();if(A){$(this).html(A.replace(C,B))}};var pluralize=function(C,B,A){return C==1?B:A};var setDocumentTitle=function(A){document.title=unh(A)||""};var addCountToDocumentTitle=function(A){document.title=(A?"("+numberWithDelimiter(A)+") ":"")+document.title.replace(/\([^)]*[0-9]\)\s+/gi,"")};var getCurrentUserScreenName=function(){return page.user_screenname||$('meta[name="session-user-screen_name"]:first').get(0).content};var sessionUserIsPageUser=function(){try{return $('meta[name="session-user-screen_name"]:first').get(0).content==$('meta[name="page-user-screen_name"]:first').get(0).content}catch(A){return false}};$.fn.focusEnd=function(){return this.each(function(){var A=this;if(A.style.display!="none"){if($.browser.msie){A.focus();var B=A.createTextRange();B.collapse(false);B.select()}else{A.setSelectionRange(A.value.length,A.value.length);A.focus()}}})};$.fn.focusFirstTextField=function(){return this.find("input[type=text]:visible:enabled:first").focus().length>0},$.fn.focusFirstTextArea=function(){return this.find("textarea:visible:enabled:first").focus().length>0};$.fn.focusFirstTextElement=function(){return this.focusFirstTextField()||this.focusFirstTextArea()};$.fn.maxLength=function(A){return this.each(function(){$(this).keydown(function(B){return this.value.length<=A||twttr.isNonCharKeyCode(B)})})};$.fn.isSelectAll=function(A){return this.each(function(){var B=$(this);if(typeof (A)=="string"){var D=$(A).find("input[type=checkbox]")}else{var D=A}function C(){var E=true;D.each(function(){if(!this.checked){E=false;return false}});B.get(0).checked=E}B.click(function(){var E=B.get(0).checked;D.each(function(){this.checked=E});$(this).trigger("select-all-changed",E)});D.click(function(){C();$(this).trigger("checkbox-changed",this.checked)})})};function bodyElement(){return $("body")}Function.prototype.pBind=function(B){var A=this;return function(){return A.apply(B,arguments)}};var updateCount=function(A,F,D){try{var E=$(A);var C=parseInt(E.html().replace(/[^0-9]/g,""))+F;return setCount(A,C,D)}catch(B){return false}};var setCount=function(A,C,D){try{var E=$(A);if(D){E.fadeOut(D,function(){E.html(numberWithDelimiter(C)).fadeIn(D)})}else{E.html(numberWithDelimiter(C))}return C}catch(B){return false}};var updateFollowingCount=function(A){return updateCount("#following_count",A)};var updateFollowersCount=function(A){return updateCount("#follower_count",A)};twttr.forbiddenAccess={decider:function(A){twttr.forbiddenAccess.unauthed(A)},unauthed:function(req){var message;try{message=eval(parseJS("("+req.responseText+")")).error}catch(err){}if(!message){if(req.status==403){message=_("You are not authorized to perform this operation.")}}if(message){new ShortNotification().setMessage(message).show()}},revoked:function(){window.location.reload()}};$.fn.isAlertBox=function(){return this.each(function(){var A=$(this);A.find("a").click(function(){var B=$(this).attr("href");$.ajax({type:"POST",dataType:"text",data:{authenticity_token:twttr.form_authenticity_token},url:"/account/clear_user_alert",success:function(){A.slideUp("fast");window.location=parseURL(B)}});return false})})};$.fn.isUpdateForm=function(){return this.each(function(){var K=$(this);var F=K.find("textarea").isCharCounter();var A=K.find("input[type=submit]");var B=K.find("label.doing");var G=K.find(".char-counter");var E=/^\s*@(\w+)\W+/;var D=/^\s*[dD][mM]?\s+(?:(\w+)\W+)?/;function J(){var L=F.val();if(L.length>140){alert(_("That tweet is over 140 characters!"));return false}else{if(L.replace(/s\*/g,"")==""){return false}else{A.attr("disabled","disabled");return true}}}function H(L){A.removeAttr("disabled","disabled");var M=L.text;if(L.messageForFlash){(new ShortNotification()).setMessage(L.messageForFlash).show()}else{if(L.errorForFlash){(new InfoNotification()).setMessage(L.errorForFlash).show()}else{if($("body").attr("id")!="home"){(new ShortNotification()).setMessage(_("Your status has been updated!")).show()}else{if(L.status_li){$("#timeline tr.hentry:first").removeClass("latest-status");$.Timeline.prepend(L.status_li)}}setCount("#update_count",L.status_count,250);if(L.latest_status){updateTimeAgo();$("#latest_status").html(L.latest_status).isCurrentStatus(true)}}}F.val("").focusEnd();$("#in_reply_to_status_id").val("");$("#in_reply_to").val("");C("");F.trigger("change");G.removeClass("loading");if(document.all){G.text("140")}else{G.css("color","#ccc")}}function C(M){var L;if(L=M.match(D)){B.html(L[1]?_("Direct message %{person}:",{person:L[1]}):_("Direct message:"));A.val(_("send"))}else{if(L=M.match(E)){B.html(_("Reply to %{screen_name}:",{screen_name:L[1]}));A.val(_("reply"))}else{B.html(_("What’s happening?"));A.val(_("update"))}}}F.bind("keyup blur focus",function(){C($(this).val())});K.submit(function(){if(J()){twttr.googleAnalytics("/status/update/refresh");var Q=F.val();var P={authenticity_token:twttr.form_authenticity_token,status:Q,twttr:true};var M=window.location.href;if($("body").attr("id")=="home"&&((M.indexOf("page=")==-1)||M.match(/page=1(?!\d)/))){P.return_rendered_status=true}var L=$("#in_reply_to_status_id").val();var O;if(L&&(O=Q.match(E))){if(O[1]==$("#in_reply_to").val()){P.in_reply_to_status_id=L}}var N=$("#source").val();if(N){P.source=N}$.ajax({type:"POST",dataType:"json",url:"/status/update",data:P,beforeSend:function(){G.addClass("loading");if(document.all){G.html("&nbsp;&nbsp;&nbsp;&nbsp;")}else{G.css("color","transparent")}},success:H,error:twttr.forbiddenAccess.decider})}return false});try{F.focusEnd()}catch(I){}})};$.fn.isLocationTrends=function(){return this.each(function(){var J=$(this);var I=$("#location_menu");var G=$("#location_done, #location_close");var A=$("#change_location");var B=J.find("#local_trend_locations");var N=$("#trends .trends-links");var M=$("#local_trends_notice");var L=$("#location_notice_set");var F=$("#location_notice_close");function H(R){B.find("a.active-parent").removeClass("active-parent");var O=$(R).attr("parents");if(O){var P=O.split(" ");for(var Q=0;Q<P.length;Q++){$("."+P[Q]).addClass("active-parent")}}var S=$(R).attr("child_class");if(S){$("."+S).addClass("active-parent")}}function E(){return $.cookie("trend_loc")}function D(O){if(O){$.cookie("trend_loc",O)}else{$.cookie("trend_loc",0)}}G.click(function(){B.hide();A.removeClass("active");if(!E()){D(0)}});A.click(function(){B.toggle();M.hide();A.toggleClass("active");return false});L.click(function(){M.hide();B.toggle();return false});F.click(function(){M.hide();if(!E()){D(0)}return false});B.find("a").click(function(){var O=$(this);var P=O.attr("id").replace("trend_loc_","");B.find(".active").removeClass("active");B.find("#trend_loc_"+P).parent().addClass("active");H(O);if(P){$.ajax({type:"GET",dataType:"json",url:"/users/location_trends",data:{twttr:true,trend_location_id:P},beforeSend:function(){$("#trends_loading").show()},success:function(Q){N.hide();N.fadeIn();$("#trends_loading").hide();if(Q){var R=[];N.html("");$.each(Q.trends,function(){var S=this;var V=S.name;var U=$('<a class="search_link" href="/search?q='+encodeURIComponent(S.query)+'"name="'+V+'" title="'+V+'">'+V+"</a>");U.isSearchLink();var T=S.description;if(T){N.append($("<li></li>").append(U).append($("<em></em>").append(T)))}else{N.append($("<li></li>").append(U))}});I.html(Q.location["name"]);loadTrendDescriptions();D(Q.location["id"])}else{}},error:function(Q){$.debug("error: "+Q.responseText)},complete:function(){$("#trends_loading").hide()}})}return false});var C=E();if(C){var K=$("#trend_loc_"+C);K.parent().addClass("active");H(K)}})};$.fn.isDirectMessageForm=function(){return this.each(function(){var L=$(this);var D=L.find("textarea").isCharCounter();var B=/^\s*[dD][mM]?\s+([A-Za-z0-9]{1,20})[^A-Za-z0-9]/;var F=L.find("select");var A=L.find("#dm-submit");var E=L.find(".char-counter");var G="";L.find("input[type=submit]").attr("disabled","disabled").addClass("disabled");try{D.focusEnd()}catch(I){}function C(N){if(F.val()){return }if((matches=N.match(B))&&matches[1]&&(G!=matches[1])){var M=true;F.find("option").each(function(){if(this.innerHTML.toLowerCase()==matches[1].toLowerCase()){F.val(this.value);M=false;return false}});if(M){F.append(_('<option value="%{screen_name}">%{screen_name}</option>',{screen_name:matches[1]}));F.val(matches[1])}G=matches[1]}}A.click(function(M){var P=D.val();var N=P.match(B);var O=F.find("option[value="+F.val()+"]");if(N&&N[1]&&N[1].toLowerCase()==O.text().toLowerCase()){D.val(P.replace(B,""))}return true});F.change(function(M){D.trigger("update",M)});D.bind("keyup blur focus",function(M){C($(this).val());D.trigger("update",M)});function H(M){(new ShortNotification()).setMessage(M.messageForFlash).show();if($("body").attr("id")=="sent"){$.Timeline.prepend(M.direct_message_li)}D.val("");F.val("");G="";D.trigger("change");E.removeClass("loading");if(document.all){E.text("140")}else{E.css("color","#ccc")}}if(F.length>0){function J(){if(F.length&&(F.find("option").length==0)){$.ajax({type:"GET",dataType:"json",url:"/direct_messages/recipients_list",data:{twttr:true},success:function(N){if(N){var M=[];$.each(N,function(){var O=this;if((O.length>1)&&O[0]&&O[1]){M.push('<option value="'+O[0]+'">'+O[1]+"</option>")}});F.html('<option value="" selected="selected"></option>'+M.join(""))}},error:function(M){$.debug("error: "+M.responseText)}})}}var K=$("body").attr("id");if(K=="direct_messages"||K=="inbox"||K=="sent"){J()}L.bind("loadrecipients",null,function(M){J()});L.submit(function(){twttr.googleAnalytics("/direct_messages/create/refresh");var N=D.val();var M={authenticity_token:twttr.form_authenticity_token,text:N,"user[id]":F.val(),twttr:true};$.ajax({type:"POST",dataType:"json",url:"/direct_messages/create",data:M,beforeSend:function(){E.addClass("loading");if(document.all){E.text("")}else{E.css("color","transparent")}},success:H,error:twttr.forbiddenAccess.decider});return false})}})};$.fn.isTimelineTabLink=function(){return this.each(function(){var A=$(this);A.click(function(B){document.body.id=A.meta().dispatch_action}).bind("loading",null,function(B){A.parent("li").addClass("loading")}).bind("loaded",null,function(B){A.parent("li").removeClass("loading")}).bind("aborted",null,function(B){A.parent("li").removeClass("loading")})})};$.fn.isEmbeddedMediaExpander=function(){return this.livequery(function(){var A=$(this);var B=A.parent().find(".embedded_media");A.click(function(){B.slideToggle("normal",function(){if(A.hasClass("embedded_media_icon_active")){A.removeClass("embedded_media_icon_active")}else{A.addClass("embedded_media_icon_active")}})})})};$.fn.isCharCounter=function(){return this.each(function(){var A=true;var F=$(this);var J=F.parents("form");var E=J.find(".char-counter");var H=J.find("input[type=submit]");var D=J.find("select");function C(){H.attr("disabled","disabled").addClass("disabled");A=true}function G(){if(A){H.removeAttr("disabled").removeClass("disabled");A=false}}function B(){var L=F.val();var K=L.length;E.html(""+(140-K));if(K<=0){E.css("color","#cccccc");C()}else{if(K<=140&&(D.length==0||D.val())){G()}else{C()}if(K>130){E.css("color","#d40d12")}else{if(K>120){E.css("color","#5c0002")}else{E.css("color","#cccccc")}}}}var I="blur focus change "+($.browser.mozilla?"paste input":"keyup");F.bind(I,function(K){B()});D.change(function(K){B()});F.focus()})};$.fn.isCurrentStatus=function(A){return this.each(function(){var G=$(this);var C=G.find("#latest_text");var F=C.find(".status-text");var D=$(this).parent("#currently");var H=D.find("strong");$("#latest_text_full, #latest_text").click(function(){$("#latest_text_full, #latest_text").toggle()});C.css("color","transparent");var B=$("#latest_text_full .status-text").text();var E=$("#latest_text_full #latest_text .retweet-source-user, #latest_text_full #latest_text .retweeted-by-you-meta").text();twttr.truncateToHeight(B,$("#latest_text .status-text"),$("#latest_text"),40,{minlength:40,extra_text:E});C.css("color","");if(A){if(D.css("visibility")=="hidden"){D.css("visibility","visible")}var I=D.find("span, strong");I.each(function(){$(this).data("old_color",$(this).css("color")).animate({color:"#333"},500)});clearTimeout(twttr.timeouts.latest_status_timeout);twttr.timeouts.latest_status_timeout=setTimeout(function(){I.each(function(){$(this).animate({color:$(this).data("old_color")},1500,function(){$(this).css("color","")})})},1500)}})};function initializeTimeline(){$.Statuses.initialize($("#timeline"))}function getListItemFromChild(A){return A.parents(".hentry:first")}function getStatusIdFromListItem(B){var A=/status_(.*)/i.exec(B.attr("id"));return(A)?A[1]:null}function getScreenNameFromListItem(B){var A=/u-([A-Za-z0-9_]+)/i.exec(B.attr("class"));return(A)?A[1]:null}function getShareIdFromListItem(B){var A=/(.)* s-([\d]+)(.)*/i.exec(B.attr("class"));return(A)?A[2]:getStatusIdFromListItem(B)}function timelineRefresh(D,A){var C=$("#results_update");if(C.length==0){return }if(!D||(("home,replies,inbox".indexOf(D)==-1)&&!D.match(/^\/?list/))){return }if(!A){A=($("#results_update").attr("href").replace(/^\//,"")||window.location.hash.replace(/^#/,"")||D).replace(/^([^\/])/,"/$1")}A=A.replace(/\/?list\//,"/");var B=$("#new_results_notification").meta().timeline;$("#new_results_notification").data("count",0);if(page.timelineRefresher){if(page.timelineRefresher.dispatchAction==D){return }else{page.timelineRefresher.stop()}}page.newResults=null;page.timelineRefresher=new Occasionally(B.delay*1000,B.max_delay*1000,function(){var E=false;if($("ol#timeline").length){$.ajax({method:"GET",dataType:"json",url:A,data:{since_id:getMaxStatusIdFromTimeline(),refresh:true},success:function(F){processTimelineRefresh(F,D)},error:function(){if(page.timelineRefresher){page.timelineRefresher.stop();page.timelineRefresher=null}}})}},function(){return page.newResults},B.decay);page.timelineRefresher.dispatchAction=D;page.timelineRefresher.start()}function getMaxStatusIdFromTimeline(){var A=0;$("ol#timeline > li").each(function(){var B=parseInt(this.id.replace(/^[A-Z_]+/gi,""));if(A<B){A=B}});return A}function processTimelineRefresh(J,D){var G=$("#new_results_notification").meta().timeline;var K=$("<div>"+J["#timeline"]+"</div>");var A=$("#content ol#timeline");K.find("#timeline > li").each(function(){if(A.find("li#"+this.id).length){$(this).remove()}});var F=K.find("ol > li");var C=F.length;var E=($("#new_results_notification").data("count")||0)+C;if(C){A.prepend(F.addClass("buffered"));K.remove();A.find("li.buffered:gt("+(G.max_refresh_size-1)+")").remove();var B={results_count:numberWithDelimiter(E),username:getCurrentUserScreenName()};var H=$("#results_update").is(":visible")?"":' style="display:none;"';var I='<a id="results_update" class="minor-notification" href="/'+D+'" accesskey="n"'+H+">";if(D=="inbox"){I+=((E==1)?_("1 new message."):_("%{results_count} new messages.",B))}else{if(D=="replies"){I+=((E==1)?_("1 new mention of @%{username}.",B):_("%{results_count} new mentions of @%{username}.",B))}else{I+=((E==1)?_("1 new tweet."):_("%{results_count} new tweets.",B))}}I+="</a>";$("#results_update").replaceWith(I);$("#results_update").click(function(){$("#content ol#timeline > li.buffered").addClass("unbuffered").removeClass("buffered");if($("#new_results_notification").data("count")>G.max_refresh_size){$("#content ol#timeline > li:not(.unbuffered)").remove();var M=$("#content ol#timeline > li").attr("id").replace(/^[^0-9]+/,"");var L=($("#results_update").attr("href")||window.location.hash||D).replace(/^([^\/])/,"/$1")+"?max_id="+M+"&page=3&twttr=true";$("#pagination").html('<div id="#pagination"><a id="more" class="round more" rel="next" href="'+L+'">'+_("more")+"</a></div>")}else{$("#content ol#timeline > li.last-on-refresh").removeClass("last-on-refresh");$("#content ol#timeline > li.unbuffered:last").addClass("last-on-refresh")}updateTimeAgo();$("#content ol#timeline > li.unbuffered").removeClass("unbuffered");$("#results_update").hide();addCountToDocumentTitle();$.Timeline.triggerPageHeightChangedEvent();$("#new_results_notification").data("count",0);return false});$("#new_results_notification").data("count",E);$("#results_update:hidden").slideDown("normal",$.Timeline.triggerPageHeightChangedEvent);addCountToDocumentTitle(E)}else{K.remove()}page.newResults=(C>0)}$(document).ready(function(){$().Page();initializeTimeline();$("#pagination #more").isMoreButton();$("body").bind("ajaxSuccess",twttr.setupRetweetTips);twttr.setupRetweetTips();$("span.byline a").tipsy({gravity:"n"})});twttr.augmentObject(twttr,{RETWEETING_BACKGROUND_COLOR:"#FFFFE5",applyTipsy:function(A,C,B){if(!A.data("tipsy_applied")){A.data("tipsy_applied",true);A.attr("title",A.attr("title")+C);A.tipsy(B)}},setupRetweetTips:function(){$("span.status-body span.shared-content a.screen-name, div.shared-by-avatar-tiles a.profile-pic img.photo").each(function(){var A=$(this);if(A.data("tipsy_applied")){return }var B="left-align";var C="";if($("body#home").length>0&&!A.hasClass("you")){var C=_('<div class="retweet_tip_tip">Tip: To hide/show retweets from this user, click on their username and look for the retweet setting <div class="retweet-icon"></div></div>');B+=" retweet-tooltip"}twttr.applyTipsy(A,C,{gravity:"l",hideTimeout:10000,additionalCSSClass:B})});$("span.big-retweet-icon").each(function(){if($("body#profile").length==0){twttr.applyTipsy($(this),"",{gravity:"s",hideTimeout:10000})}else{$(this).attr("title","")}})},getStatusBodyParent:function(A){return A.parents(".status-body").parent()},setRetweetingStyles:function(B,E,D){var A=getListItemFromChild(B);var C=twttr.getStatusBodyParent(B);C.append("<span class='retweeting loading'>"+E+"</span>");A.addClass("no-hover");if($("body.status").length==0){A.css("background-color",twttr.RETWEETING_BACKGROUND_COLOR)}},unsetRetweetingStyles:function(B){var A=getListItemFromChild(B);var C=twttr.getStatusBodyParent(B);A.removeClass("no-hover");C.find(".retweeting.loading").remove()},animateStatusReplacement:function(B,D){var C=getListItemFromChild(B);var F=$(D.status_li);F.hide();C.after(F);if(C.hasClass("latest-status")){F.addClass("latest-status")}var A=F.height();var E=C.height();F.remove().show().height(E);if($("body.status").length==0){F.css("background-color",twttr.RETWEETING_BACKGROUND_COLOR)}C.replaceWith(F);if(A!=E){F.animate({height:A},500,function(){F.css("height",null);twttr.animateStatusColorChange(F)})}else{twttr.animateStatusColorChange(F)}if(D.latest_status){$("#latest_status").html(D.latest_status).isCurrentStatus(true)}},animateStatusColorChange:function(A){A.animate({backgroundColor:"#FFF"},1500,function(){A.css("background-color",null)})}});$.fn.Page=function(){var A=$('meta[name="session-user-screen_name"]:first').get(0);var D=$('meta[name="page-user-screen_name"]:first').get(0);var B=$('meta[name="session-userid"]:first').get(0);var C=A&&D&&A.content==D.content;if(typeof (page)=="undefined"){page={}}page=$.extend(page,{timeline:null,sessionUserScreenName:(A?A.content:null),sessionUserId:(B?B.content:null),pageUserScreenName:(D?D.content:null),loggedIn:$('meta[name="session-loggedin"][content="y"]').length>0,hideUnfavorited:C,isTimelineChange:false,currentTimelineChange:{},$oldTimelineLink:""})};$.Statuses={initialize:function(A){if(page.loggedIn){var B=$(A).find(".hentry");$.each($.Statuses.actions,function(){var C=this;C.apply(B)})}},actions:{isTweet:function(){this.livequery(function(){var A=$("body#show.status").length>0;var B=$("body#profile").length>0;if(!A&&!B){var C=$(this).find("a.hashtag");C.isSearchLink(SEARCH_CALLBACKS.hashtagLink)}})},isHoverable:function(){if($("body.ie,body.ie6").get(0)){this.livequery(function(){var A=$(this);A.hover(function(){A.addClass("hover")},function(){A.removeClass("hover")})})}},isFavoriteable:function(){this.find(".fav-action").live("click",function(){var D=$(this);if(D.hasClass("blocked")){return false}var B=D.parents(".hentry:first");var E=B.attr("id").replace(/status_/,"");var C=D.hasClass("fav")?"destroy":"create";twttr.googleAnalytics("/favorites/"+C+"/refresh/"+E);function A(){var F=D.hasClass("fav");D.removeClass(F?"fav":"non-fav").addClass(F?"non-fav":"fav").attr("title",(F?_("favorite this tweet"):_("un-favorite this tweet")))}$.ajax({type:"POST",dataType:"json",url:"/favorites/"+C+"/"+E,data:{authenticity_token:twttr.form_authenticity_token},beforeSend:function(){A();D.addClass("blocked")},complete:function(){D.removeClass("blocked")}});return false})},isReplyable:function(){this.find(".reply").live("click",function(){var E=$(this);var C=E.parents(".hentry:first");var G=C.attr("id").replace(/status_/,"");var A=C.attr("class").match(/u-([A-Za-z0-9_]+)/);var B=A[1];if(!B){alert(_("Whoops! Something went wrong. Please refresh the page and try again!"));return }if(C.hasClass("direct_message")){var F=$("#text");twttr.googleAnalytics("/direct_messages/reply/"+B+"/"+G);var D=$("#direct_message_user_id");if(!D.find("option[text='"+B+"']").attr("selected",true).length){D.append('<option value="'+B+'" selected="selected">'+B+"</option>")}F.trigger("update");$("#text").focusEnd()}else{if(C.hasClass("status")||C.hasClass("share")){var F=$("#status");twttr.googleAnalytics("/reply/"+B+"/"+G);if(F.size()){F.val("@"+B+" "+F.val().replace(RegExp("@"+B+" ?","i"),"")).trigger("update");$("#status").focusEnd();$("#in_reply_to_status_id").val(G);$("#in_reply_to").val(B);window.scroll(0,0)}else{window.location=parseURL(E.find("a").attr("href"));return false}}}window.scroll(0,0);return false})},isRetweetable:function(){this.find(".retweet-link").live("click",function(A){new RetweetInlineForm().show({targetNode:$(this)});A.preventDefault()})},isDeleteable:function(){this.find(".del").live("click",function(D){var C=$(this);var A=C.parents(".hentry:first");var F=A.attr("id").replace(/[^\d]*/,"");var E=A.hasClass("latest-status");var B;if(A.hasClass("direct_message")){B="/direct_messages/destroy"}else{B="/status/destroy"}if(confirm(_("Sure you want to delete this tweet? There is NO undo!"))){twttr.googleAnalytics(B+"/refresh/"+F);$.ajax({type:"POST",url:B+"/"+F,data:{authenticity_token:twttr.form_authenticity_token,latest_status:E},dataType:(B=="/status/destroy"?"json":null),beforeSend:function(){A.fadeOut(500);updateCount("#update_count",-1,250)},success:function(G){A.remove();if(B=="/status/destroy"){if(E){twttr.processJson(G);updateLatest()}}setCount("#update_count",G.status_count)},error:function(){A.fadeIn(0);(new InfoNotification()).setMessage(_("Whoops! Something went wrong. Please try again!")).show()}})}D.preventDefault()})},isUndoable:function(){this.find(".undo").live("click",function(){var C=$(this);var B=C.parents(".hentry:first");var A=B.attr("id").replace(/status_/,"");$.ajax({type:"POST",url:"/statuses/"+A+"/retweet",data:{_method:"delete",authenticity_token:twttr.form_authenticity_token,controller_name:page.controller_name,action_name:page.action_name,user_screenname:page.pageUserScreenName},dataType:"json",beforeSend:function(){C.attr("title","").removeClass("undo");twttr.setRetweetingStyles(C,_("Undoing..."))},success:function(D){if(D.status_li){twttr.animateStatusReplacement(C,D)}else{B.fadeOut(500,function(){var E=$("ol#timeline .hentry:visible:first");if(!E.hasClass("share")){E.addClass("latest-status")}})}(new InfoNotification()).setMessage(_("Your followers will no longer see the tweet as retweeted by you.")).show()},complete:function(){twttr.unsetRetweetingStyles(B)}});return false})}}};$.Timeline={prepend:function(A){$("#timeline").prepend(A);$.Timeline.triggerTimelineChanged()},append:function(A){$("#timeline").append(A);$.Timeline.triggerTimelineChanged()},registerTimelineEvent:function(A){$("body").bind("timeline-changed",A)},unregisterTimelineEvent:function(A){$("body").unbind("timeline-changed",A)},triggerTimelineChanged:function(){$("body").trigger("timeline-changed")},registerPageHeightChangedEvent:function(A){$("body").bind("page-height-changed",A)},unregisterPageHeightChangedEvent:function(A){$("body").unbind("page-height-changed",A)},triggerPageHeightChangedEvent:function(){$("body").trigger("page-height-changed")}};function basicMoreButtonHandler(A){return function(){var C=$(this);C.blur();if(C.hasClass("loading")){return false}var B=C.attr("href");var D=$("#more").text();$.ajax(jQuery.extend({type:"GET",url:B,dataType:"json"},A));return false}}$.fn.isMoreButton=function(){return this.live("click",basicMoreButtonHandler({beforeSend:function(){$("#timeline li:last-child").addClass("last-on-page");$("#more").addClass("loading").html("")},success:function(A){updateTimeAgo();$("#timeline").append($(A["#timeline"]).find(".hentry"));$("#pagination").html(A["#pagination"]);if(window.onPageChange){onPageChange()}$.Timeline.triggerTimelineChanged()},error:function(){$("#timeline li:last-child").removeClass("last-on-page");$("#more").removeClass("loading").text(_("more"));(new ShortNotification()).setMessage(_("Whoops! Something went wrong. Please try again!")).show()}}))};$(function(){var request=function(data,success){return function(){var self=this;var $this=$(this);var notification=(new ProgressNotification()).setProgressMessage($this.attr("progress")).setCompletedMessage($this.attr("completed"));$.ajax({type:$this.attr("method"),dataType:"json",url:$this.attr("href")||$this.attr("action"),data:data.apply(self),success:function(){notification.done();if(success){success.apply(self)}},beforeSend:function(){twttr.loading();notification.show()},complete:twttr.loaded});return false}};$("form.restful").livequery("submit",request(function(){return $(this).serializeArray()},function(){$(this).trigger("submitted")}));$("a.restful").livequery("click",request(function(){return eval(parseJS("("+$(this).attr("data")+")"))}))});function updateLatest(){var A=$("#latest_status");if(A.length){A.isCurrentStatus(true)}$("#timeline li:first").addClass("latest-status")}function setTitleAndHeading(C){var K=$("#timeline_heading h1");var I=$("#timeline_heading h2");var C=C||$("body").attr("id");var A=h(page.query);var D=getCurrentUserScreenName();if(!twttr.titles_and_headings){var H={user:D,name:page.user_fullname};twttr.titles_and_headings={home:{title:_("Home"),heading:_("Home")},replies:{title:("@"+D),heading:_("Tweets mentioning @%{user}",H)},favorites:{title:_("Your Favorites"),heading:_("Your Favorites")},inbox:{title:_("Direct Messages"),heading:_("Direct messages sent only to you")},direct_messages:{title:_("Direct Messages"),heading:_("Direct messages sent only to you")},sent:{title:_("Sent Direct Messages"),heading:_("Direct messages you've sent")},retweets_by_others:{title:_("Retweets",H),heading:"&nbsp;"},profile_favorites:{title:_("%{user}'s Favorites",H),heading:_("%{user}'s Favorites",H)},profile:{title:_("%{name} (%{user}) on Twitter",H),heading:null}}}var E;if(C=="search"){E={title:_("Search - %{query}",{query:page.query})};var B=$("#side #saved_searches ul.sidebar-menu li.active");var J;if(B.length){var F=B.attr("id").replace("ss_","");J='<a href="/saved_searches/destroy/'+F+'" title="'+A+'" class="delete-search-link">'+_("Remove this saved search")+"</a></label>"}else{J='<a href="/saved_searches/create" class="save-search-link" title="'+A+'">'+_("Save this search")}J="<label>"+J+"</a></label>";if(page.searchResults){E.heading=J+_("Real-time results for <b>%{query}</b>",{query:A})}else{E.heading=J+_("No results for <b>%{query}</b>",{query:A})}}else{E=twttr.titles_and_headings[C]}if(E){var G=(C=="profile")?"":"Twitter / ";setDocumentTitle(G+E.title);I.remove();if(E.heading){K.html(E.heading);K.parent("div").show()}else{K.parent("div").hide()}if(C=="search"){K.find(".save-search-link").isSaveSearchLink().end().find(".delete-search-link").isRemoveSearchLink()}}}$.fn.isSaveSearchLink=function(){return this.each(function(){var A=$(this);var B=$("#saved_searches");var C=B.find("ul.sidebar-menu");A.click(function(){if(C.find("li").length>=10){(new InfoNotification()).setMessage(_("You can only save ten searches. To remove a saved search, select the search and click <strong>remove this saved search</strong>.")).show();return false}var E=A.attr("title");var D=$('<li><a href="/search?q='+encodeURIComponent(E)+'" class="search-link" title="'+h(E)+'"><span>'+h(E)+"</span></a></li>");D.find("a").isSearchLink(SEARCH_CALLBACKS.savedSearchLink);D.fadeOut(1,function(){C.append(D);D.fadeIn(100)});if(B.hasClass("collapsed")){B.trigger("expand")}B.fadeIn();$("#side ul.sidebar-menu li").removeClass("active");$("#side #custom_search").removeClass("active");D.addClass("active");$.ajax({type:"POST",dataType:"json",url:"/saved_searches/create",data:{q:E,authenticity_token:twttr.form_authenticity_token,twttr:true},beforeSend:function(){A.replaceWith('<span class="loading">'+_("Save this search")+"</span>")},success:function(F){D.attr("id","ss_"+F.id);setTitleAndHeading("search")},error:function(F){(new InfoNotification()).setMessage(F.responseText).show();D.remove()}});return false})})};$.fn.isRemoveSearchLink=function(){return this.each(function(){var A=$(this);var C=A.attr("title");var B=A.attr("href");A.click(function(){var D=$("#side #saved_searches li a[title='"+C+"']").parent("li");D.fadeOut(100,function(){D.remove();var E=$("#saved_searches ul.sidebar-menu a");if(E.length==0){$("#saved_searches").hide()}setTitleAndHeading("search");$("#side #custom_search").addClass("active")});$.ajax({type:"POST",url:B,data:{authenticity_token:twttr.form_authenticity_token,twttr:true},beforeSend:function(){A.replaceWith('<span class="loading">'+_("Remove this saved search")+"</span>")},error:function(){(new InfoNotification()).setMessage(_("Whoops! Something went wrong. Please refresh the page and try again!")).show()}});return false})})};function initializePage(A){if(("home,search".indexOf(A)==-1)&&($("body#list_show").length==0)){twttr.updateLocation(A)}initializeSidebar();$("#side form#sidebar_search").isSearchForm();$("#side .collapsible").isCollapsibleMenu();onPageChange(true);timelineRefresh(A);$(".in-page-link").isInPageLink();$.fn.isListInPageLink&&$(".in-page-list-link").isListInPageLink();$(".saved-search-links li a").isSearchLink(SEARCH_CALLBACKS.savedSearchLink);$(".trends-links li a").isSearchLink(SEARCH_CALLBACKS.trendLink);$("#dm_tabs a, #retweet_tabs a").isTimelineTabLink();$("div.bulletin").isBulletin();$("ul.sidebar-menu a").isSidebarTab()}function initializeSidebar(){if($("#side ul.sidebar-menu li.active").length==0){var B=$("body").attr("id");var A=null;if(B=="search"){B=page.query;if(B){var C=$.grep($("#side ul.sidebar-menu li a"),function(D){return $(D).attr("title")==page.query})[0];if(C){A=$(C).parent("li")}else{$("#side #custom_search").addClass("active")}}}else{if(B){if(B=="sent"||B=="inbox"){B="direct_messages"}A=$("#side ul.sidebar-menu li#"+B+"_tab")}}if(A&&A.length){$(A.get(0)).addClass("active")}}}$.fn.isCollapsibleMenu=function(){function A(){var B=[];$("#side .collapsible").each(function(){var C=$(this);var E=C.find("h2.sidebar-title").attr("id");if(E){E=E.replace("_menu","")}else{return true}var D=C.hasClass("collapsed")?"C":"O";B.push(E+D)});$.cookie("menus",B.join("_"))}return this.each(function(){var D=$(this);var B=D.find("h2.sidebar-title");function F(G){$.ajax({type:"GET",url:G,dataType:"html",beforeSend:function(){D.addClass("loading")},success:function(H){D.find(".sidebar-menu").remove();B.after(H);C()},complete:function(){D.removeClass("loading")}})}function C(){var G=D.find(".sidebar-menu");D.find("#friends_view_all").fadeIn();G.slideDown(100,function(){D.removeClass("collapsed");A()})}function E(){var G=D.find(".sidebar-menu");D.find("a.xref").fadeOut(100);D.find("div#friends_view_all").fadeOut(100);G.slideUp(100,function(){D.addClass("collapsed");A()})}D.bind("expand",function(){C()});D.bind("collapse",function(){E()});B.click(function(H){if(H.target.nodeName.toLowerCase()=="a"){return true}var G=D.find("a.fetch-contents");if(D.hasClass("collapsed")){D.find("a.xref").fadeIn(100);if(G.length){F(G.attr("href"));G.remove()}else{C()}}else{E()}})})};$.fn.isSidebarTab=function(){return this.each(function(){var A=$(this);A.click(function(){if(A.parents("#side").length>0){$(window).scrollTop(0);$("#side ul.sidebar-menu li, #trends_list li").removeClass("active");$("#side #custom_search").removeClass("active");A.parent("li").addClass("active")}}).bind("loading",null,function(B){A.parent("li").addClass("loading")}).bind("loaded",null,function(B){A.parent("li").removeClass("loading")}).bind("aborted",null,function(B){A.parent("li").removeClass("loading")})})};$.fn.isInPageLink=function(A){return this.each(function(){var B=$(this);var E=B.parent("li");var C=B.meta();var D=C.dispatch_action;B.click(function(H){var F=H.srcElement||H.originalTarget||H.target;if(F.tagName.toLowerCase()=="em"){H.stopImmediatePropagation();return true}if($.browser.msie){this.hideFocus=true}var G=B.attr("href");page.query="";if(page.isTimelineChange){page.currentTimelineChange.abort();page.$oldTimelineLink.trigger("aborted")}page.currentTimelineChange=$.ajax({type:"GET",url:G,dataType:"json",beforeSend:function(){page.isTimelineChange=true;B.trigger("loading");page.$oldTimelineLink=B},success:function(I){twttr.processJson(I);twttr.updateLocation(D=="list"?"/list"+G:G);if(D){page.action_name=D;$("body").attr("id",D);if(D=="direct_messages"||D=="inbox"||D=="sent"){$("#direct_message_form").trigger("loadrecipients")}}if(page.timelineRefresher){page.timelineRefresher.stop();page.timelineRefresher=null}addCountToDocumentTitle();timelineRefresh(D,G);$.Timeline.triggerPageHeightChangedEvent()},complete:function(){$("#sidebar_search_q").val("").blur();onPageChange();$("body").addClass("replyable");B.trigger("loaded");page.isTimelineChange=false;if(A){A(B)}}});return false})})};function reloadTimeline(B){var A=(window.location.hash||B).toString().replace(/^#?([^\/])/,"/$1").replace(/^\/?list/,"");page.currentTimelineChange=$.ajax({type:"GET",url:A,dataType:"json",beforeSend:function(){page.isTimelineChange=true},success:function(C){twttr.processJson(C);if(page.timelineRefresher){page.timelineRefresher.stop();page.timelineRefresher=null}addCountToDocumentTitle();timelineRefresh(B,A)},error:function(){(new InfoNotification()).setMessage(_("Whoops! Something went wrong. Please refresh the page and try again!")).show()},complete:function(){$("#sidebar_search_q").val("").blur();onPageChange();$("body").addClass("replyable");initializeTimeline();$("#timeline").removeClass("loading");page.isTimelineChange=false;if(B.match(/\/?list\//)){var C=$(".lists-links a[href="+h(A)+"]");$("#side ul.sidebar-menu li, #trends_list li").removeClass("active");$("#side #custom_search").removeClass("active");if(C.length){C.parent("li").addClass("active");setTimelineForListInPageLink(C)}}}})}$.fn.isBulletin=function(){return this.each(function(){var A=$(this);var B=A.find("a.close, a.hide");B.click(function(){A.fadeOut();return false})})};$.fn.isBrowserUpgradeBulletin=function(A){return this.each(function(){var B=$(this);B.find("a.close, a.hide").click(function(){$.cookie(A+"_upgrade","y")})})};$.fn.isDeviceFailBulletin=function(){return this.each(function(){var A=$(this);var B=A.find("a.hide-fail-notice, a.close, a.hide");var C=B.attr("id").replace("hide_device_","");B.click(function(){$.ajax({type:"POST",dataType:"text",url:"/devices/update/"+C,data:{authenticity_token:twttr.form_authenticity_token,"device[fail_alert]":"0",twttr:true},success:function(D){if(D.match(/success/)){A.fadeOut(200)}else{twttr.error()}},beforeSend:null,complete:null});return false})})};$.fn.isBouncingEmailBulletin=function(){return this.each(function(){var A=$(this);A.find("a.close, a.hide").click(function(){$.ajax({type:"POST",dataType:"text",url:"/bouncers/reset",data:{authenticity_token:twttr.form_authenticity_token,twttr:true},beforeSend:null,complete:function(){(new InfoNotification()).setMessage(_("Your email notifications should resume shortly.")).show()}});return false})})};$.fn.isNotificationSetting=function(){return this.each(function(){var B=$(this);var A=B.attr("id").replace("notify_on_","").replace("notify_off_","");B.click(function(){var C=B.attr("value");$.ajax({type:"POST",dataType:"text",url:"/friendships/device_"+C+"/"+A,data:{authenticity_token:twttr.form_authenticity_token,twttr:true},success:function(D){if(D.match(/success/)){$(".follow-control").trigger("refresh",["notify_"+(C=="follow"?"on":"off")])}else{twttr.error()}}})})})};$.fn.isNudgable=function(){return this.each(function(){var A=$(this);A.click(function(){var B=A.parents("form");B.find("input[name=authenticity_token]").val(twttr.form_authenticity_token);B.submit();return false})})};$.fn.isSlugField=function(B,A){return this.bind("keyup",function(){var C=slug($(this).val());if(B){B.val(C)}if(A){A.text(C)}})};var slug=function(A){return A.toLowerCase().replace(/[^a-z0-9]/g,"-").replace(/-+/g,"-").replace(/^[_-]+|[_-]+$/g,"")};$.fn.isDeleteButton=function(A){if(!confirm(A)){return false}};$.fn.disable=function(){$(this).attr("disabled","disabled").addClass("disabled")};$.fn.enable=function(){$(this).removeAttr("disabled").removeClass("disabled")};$.fn.textAreaSizeLimiter=function(C){var D=$(this);var A=C.maxLength;var B=C.infoMessageSelector;var E=D.parents("form").find("input[type=submit]");D.keyup(function(){var F=D.val().length;if(F>A){E.attr("disabled","DISABLED").removeClass("btn").addClass("dbtn");$(B).show()}else{E.removeAttr("disabled").removeClass("dbtn").addClass("btn");$(B).hide()}})};$.fn.isFollowRequestLinks=function(){return this.each(function(){var B=$(this);var D=B.hasClass("ifr-profile");var F=D?B.attr("id").replace("ifr_",""):"";var A=B.find("#accept_all_requests");var C=B.find("#deny_all_requests");function E(G){var H={decision:G,authenticity_token:twttr.form_authenticity_token};if(D){H.id=F;H.source="profile"}$.ajax({type:"POST",url:"/friend_requests/"+(D?"decision":"all"),dataType:"text",data:H,cache:false,success:function(I){if(I=="fail"){alert(_("Whoops! Something went wrong. Please refresh the page and try again!"))}else{if(D){B.fadeOut("medium",function(){B.html(I)});B.fadeIn("medium")}else{var J=window.location;uri=J.protocol+"//"+J.host+"/";window.location=parseURL(uri)}}}})}A.click(function(){E("accept");return false});C.click(function(){E("deny");return false})})};$.fn.isPasswordStrengthField=function(A,B){return this.each(function(){if(!A){return }if(!B){B={}}var H=$(this);var J=$(A);J.append('<span class="pstrength-text"></span>');var F=J.find(".pstrength-text");function E(K){J.children().each(function(){var L=$(this);if(L.hasClass("pstrength-text")){if(K){L.show()}else{L.hide()}}else{if(K){L.hide()}else{L.show()}}})}function I(K){var M=0;var L=B.minlength?B.minlength:6;if(K.length<L){return{score:K.length,message:_("Too short"),className:"password-invalid"}}if(B.username){var N=(typeof (B.username)=="function")?B.username():B.username;if(N&&(K.toLowerCase()==N.toLowerCase())){return{score:0,message:_("Too obvious"),className:"password-invalid"}}}if($.inArray(K.toLowerCase(),twttr.BANNED_PASSWORDS)!=-1){return{score:0,message:_("Too obvious"),className:"password-invalid"}}M+=K.length*4;M+=(D(1,K).length-K.length)*1;M+=(D(2,K).length-K.length)*1;M+=(D(3,K).length-K.length)*1;M+=(D(4,K).length-K.length)*1;if(K.match(/(.*[0-9].*[0-9].*[0-9])/)){M+=5}if(K.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)){M+=5}if(K.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)){M+=10}if(K.match(/([a-zA-Z])/)&&K.match(/([0-9])/)){M+=15}if(K.match(/([!,@,#,$,%,^,&,*,?,_,~])/)&&K.match(/([0-9])/)){M+=15}if(K.match(/([!,@,#,$,%,^,&,*,?,_,~])/)&&K.match(/([a-zA-Z])/)){M+=15}if(K.match(/^\w+$/)||K.match(/^\d+$/)){M-=10}if(M<0){M=0}if(M>100){M=100}if(M<34){return{score:M,message:_("Weak"),className:"password-weak"}}if(M<50){return{score:M,message:_("Good"),className:"password-good"}}if(M<75){return{score:M,message:_("Strong"),className:"password-strong"}}return{score:M,message:_("Very Strong"),className:"password-verystrong"}}function D(L,O){var K="";for(var N=0;N<O.length;N++){var P=true;for(var M=0;M<L&&(M+N+L)<O.length;M++){P=P&&(O.charAt(M+N)==O.charAt(M+N+L))}if(M<L){P=false}if(P){N+=L-1;P=false}else{K+=O.charAt(N)}}return K}function C(K){if(K&&J.hasClass(K)){return false}J.removeClass("password-weak").removeClass("password-good").removeClass("password-strong").removeClass("password-verystrong").removeClass("password-invalid");return true}function G(){var L=H.val();if(L.length==0){C();E(false)}else{if(L.length){E(true)}}if(L.length>0){var K=I(L);F.html(K.message);if(C(K.className)){J.addClass(K.className)}}}H.bind("show-password-meter",function(){J.show()});H.bind("hide-password-meter",function(){J.hide()});H.keyup(function(){G()});H.blur(function(){if(this.value.length==0){C();H.trigger("hide-password-meter")}});if(H.val()){G();J.show()}})};$.fn.isOAuthApplication=function(){return this.each(function(){var C=$(this);var B=C.attr("id").replace("oauth_application_","");var A=C.find(".revoke-access");A.click(function(){$.ajax({type:"POST",dataType:"json",url:"/oauth/revoke",data:{authenticity_token:twttr.form_authenticity_token,token:B,twttr:true},success:function(D){if(D.revoked){C.addClass("revoked")}else{C.removeClass("revoked")}A.text(D.label)}});return false})})};$.fn.screenName=function(){return $(this).find(".screen-name").text()||page.sessionUserScreenName};$.fn.userId=function(){var A;if(A=$(this).attr("id")){return A.replace("user_","")}else{return page.sessionUserId}};twttr.klass("twttr.MinimumDelayCallback",function(A){this.waitUntil=twttr.getTimeMillis()+A}).method("delay",function(C){var A=twttr.getTimeMillis();var B=this.waitUntil-A;if(B>0){setTimeout(function(){this.delay(C)}.pBind(this),B)}else{C.apply()}});twttr.augmentObject(twttr,{getTimeMillis:function(){return new Date().getTime()}});jQuery.fn.pulsate=function(F,C){var D=$(this);var E=1;var A=function(){E=E+0.5;var G=E>F?function(){}:B;D.fadeIn(C,G)};var B=function(){E=E+0.5;D.fadeOut(C,A)};B()};var searchSummize=function(E,B,F,A){page.query=E;var D=$("body#search #timeline :first-child").attr("id");if(D&&page.retainTimeline){page.maxId=D.substring(7)}else{page.maxId=null}var C={q:page.query,rpp:20,maxId:page.maxId,callback:F||window.SEARCH_CALLBACKS.summize,layout:"none"};if(A){C.page=A}$("#side #q").val(E);B.trigger("loading");return $.ajax({url:page.summizeSearchUrl,data:C,dataType:"script",cache:false,complete:function(){$("#side #primary_nav li").removeClass("active");$("body").attr("id","search");var H="";if($("body.front").length){H=$("#trends_list li.active").length?"front/trends":"front/custom_search"}else{var G=$("#side li.active a.search-link").parents("div#trends, div#saved_searches");H=G.length==0?$("#side div#custom_search.active").attr("id"):G.attr("id")}twttr.trackPageView($("body").attr("id"),(page.query&&page.query.length>0?page.query:null),"/"+H+(!page.retainTimeline?"/ajax":"/ajax/more"));B.trigger("loaded");page.retainTimeline=null;page.isTimelineChange=false}})};var processSummize=function(B){var J=page.trendDescriptions[page.query];if(J){$("#trend_info").hide();$("#trend_description span").text(_("%{trend} is a popular topic on Twitter right now.",{trend:J[0]}));$("#trend_description p").html(J[1]);$("#trend_description").show()}else{$("#trend_description").hide();$("#trend_info").show()}var H=$(B);var M=$(".homepage #timeline").length;var C=M&&!$(".homepage #timeline li").length;var F=$("#timeline");var L=(page.query!="");$("body").attr("id","search");var N=1;$pageBtn=H.find(".paginator a.next");var E;if($pageBtn.length){E=$pageBtn.attr("href");E.match(/\?.*page=([0-9]+)/gi);N=RegExp.$1;N=N?parseInt(N):1}var D=[];if(L){if(!page.retainTimeline){$("#timeline").empty();$("#pagination").empty();$("#content .no-results").remove();$("#results_update").hide()}D=renderResultsFromSummize(H,F,M)}$("#container, #side_base").show();F.find(".msgtxt a").each(twttr.appendClassesToSearchResults);F.find(".msgtxt").prev().addClass("tweet-url screen-name");F.find("span.vcard a").addClass("tweet-url profile-pic");F.find(".status-body a,.vcard a").each(function(){var Q=$(this);var O=Q.attr("href");if(O.match(/^\/search\?q=([^&]+)/)){Q.removeAttr("target");var P=decodeURIComponent(RegExp.$1);Q.attr("title",P);Q.isSearchLink(P.match(/^#/)?SEARCH_CALLBACKS.hashtagLink:SEARCH_CALLBACKS.inResultsLink)}else{if(O.match(/^https?:\/\/twitter\.com/)){Q.removeAttr("target")}}});if(page.searchResults=(D.length>0&&L)){if(!M){enfavoriteSummize(D)}page.maxId=D[0];if(E){$("#pagination").empty().html('<a id="search_more" class="round more" rel="next" href="'+E+'">'+_("more")+"</a>").find("a").isSearchMoreButton(M)}else{$("#pagination").empty().html('<p class="no-more-tweets">'+_("Older tweets are temporarily unavailable.")+"</p>")}}else{var I=[_("Try a more general search."),_("Try using different words.")];var K='<div class="no-results">'+_("Suggestions:")+"<ol>";for(var G=0;G<I.length;G++){K+="<li>"+_(I[G])+"</li>"}K+="</ol></div>";setTimeout(function(){$("#timeline_heading").after(K)},1)}twttr.updateLocation("search?q="+encodeURIComponent(page.query));initializeSidebar();var A=$("#sidebar_search_q, #home_search_q");if(A.val()!=page.query){A.val(page.query);A.css("color","#000")}onPageChange(C);$("#side #rssfeed a.search-rss").attr("href","http://search.twitter.com/search.atom?q="+h(encodeURIComponent(page.query)));summizeRefresh()};if(!window.SEARCH_CALLBACKS){window.SEARCH_CALLBACKS={summize:"processSummize",load:"pageLoadSearch",searchLink:"processSearchLink",trendLink:"processTrendLink",savedSearchLink:"processSavedSearchLink",searchForm:"processSearchForm",hashtagLink:"processHashtagLink",inResultsLink:"processInResultsLink",more:"processSearchMore",refresh:"processSearchRefresh"};$.each(window.SEARCH_CALLBACKS,function(){window[this]=window.processSummize})}function renderResultsFromSummize(C,B,A){var D=[];C.find(".result").each(function(){var I=$(this);I.find(".location,.thread,.to_av,p.clearleft,.expand,#share").remove();var F=$(I.find(".avatar").get(0));F.replaceWith('<span class="thumb vcard author">'+F.html()+"</span>");var K=$(I.find(".info").get(0));var L,G,E;K.find("a.lit").each(function(){E=$(this).attr("href");var O=E.match(/\/(\w+)\/statuses\/(\d+)/);L=O[2];D.push(L);G=O[1]});var H=K.find(".source").remove();K.find("a").remove();K.html('<a href="'+E+'">'+K.html()+"</a>");K.append(H);var N='<span class="meta">'+K.html().replace(/\u00B7/g,"")+"</span>";K.remove();var M=$(I.find(".msg").get(0));M.replaceWith('<span class="status-body">'+($.browser.msie6?'<img src="http://s.twimg.com/a/1262981812/images/white.png" width="1" height="50" align="left">':"")+M.html().replace(/a>\s*:\s*<span/,"a> <span")+N+"</span>");var J=I.html();if(!A){J+='<span class="actions"><a href="#" class="fav-action non-fav" id="status_star_'+L+'"> &nbsp; </a><a href="/home?status=@'+G+"%20&in_reply_to_status_id="+L+"&in_reply_to="+G+'" class="reply"> &nbsp; </a></span>'}B.append('<li class="hentry status search_result u-'+G+'" id="status_'+L+'">'+J+"</li>")});return D}function enfavoriteSummize(A){if(page.loggedIn&&A.length>0){$timeline=$("#timeline");$.ajax({type:"POST",dataType:"json",url:"/favourings/intersect_for_search",data:{authenticity_token:twttr.form_authenticity_token,"status_id[]":A,twttr:true},beforeSend:null,success:function(B){$.map(B,function(C){$timeline.find("#status_"+C+" .non-fav").addClass("fav").removeClass("non-fav")})},complete:null})}}function summizeRefresh(){if(page.timelineRefresher){page.timelineRefresher.stop();page.timelineRefresher=null;addCountToDocumentTitle()}var B=$("#results_update");B.data("count",0);var A=$("#new_results_notification").meta().search;if(page.summizeRefresher||$("#results_update").length==0){return }page.newResults=null;page.summizeRefresher=new Occasionally(A.delay*1000,A.max_delay*1000,function(){var C=false;$.ajax({dataType:"script",url:page.summizeSearchUrl,data:{q:page.query,since_id:page.maxId,refresh:true,callback:"processSummizeRefresh"},cache:false,callback:null})},function(){return page.newResults},A.decay);page.summizeRefresher.start()}function processSummizeRefresh(B){if(decodeURIComponent(B.query).replace(/\+/g," ")==page.query&&B.total){page.maxId=B.max_id;var C=page.summizeRefreshResults=(page.summizeRefreshResults||0)+B.total;var A=$("#results_update").is(":visible")?"":' style="display:none;"';var D='<a id="results_update" class="minor-notification"'+A+">";D+=(C==1)?_("1 more tweet since you started searching."):_("%{results_count} more tweets since you started searching.",{results_count:numberWithDelimiter(C)});D+="</a>";$("#results_update").replaceWith(D);$("#results_update:hidden").slideDown();$("#results_update").attr("title",page.query).attr("href","/search?q="+encodeURIComponent(h(page.query))).isSearchLink(SEARCH_CALLBACKS.refresh).click(function(){addCountToDocumentTitle();return false});if(C){addCountToDocumentTitle(C)}page.newResults=true}else{page.newResults=false}}$.fn.isSearchMoreButton=function(A){return this.each(function(){var B=$(this);B.click(function(){B.blur();var D=B.attr("href");D.match(/\?.*page=([0-9]+)/gi);var C=RegExp.$1;page.retainTimeline=true;$("#timeline li:last-child").addClass("last-on-page");searchSummize(page.query,B,SEARCH_CALLBACKS.more,C);B.addClass("loading").html("");return false})})};function onPageChange(A){var B=$("body").attr("id");setTitleAndHeading(B);if(!A){if(page.summizeRefresher){page.summizeRefresher.stop();page.summizeRefresher=null;page.summizeRefreshResults=null}$("#results_update").hide();$(".no-results").remove();$("#new_results_count").html("0")}if(B=="list"||B=="list_show"){B=(window.location.hash||window.location.pathname).replace(/^#/,"").replace(/^([^\/])/,"/$1");if(B.indexOf("/list")!=0){B="/list"+B}}twttr.trackPageView(B,(page.query&&page.query.length>0?page.query:null),A?null:"/ajax")}$.fn.isSearchLink=function(A){return this.each(function(){var B=$(this);B.click(function(C){C.preventDefault();if($.browser.msie){this.hideFocus=true}if(page.isTimelineChange&&page.currentTimelineChange){page.currentTimelineChange.abort();page.$oldTimelineLink.trigger("aborted");page.isTimelineChange=false}page.isTimelineChange=true;page.currentTimelineChange=searchSummize(B.attr("name")?B.attr("name"):B.attr("title"),B,A);if(B.parents("#side").length>0){$("#side ul.sidebar-menu li").removeClass("active");B.parent("li").addClass("active")}$("#trends_list li.active a").removeClass("active")})})};$.fn.isSearchForm=function(){return this.each(function(){var B=$(this);var A=$(B.find('input[type="text"]')[0]);var C=B.find("#sidebar_search_submit");A.Watermark(_("Search")).focus(function(){A.select();return true});C.click(function(){B.submit()});B.submit(function(){var D=A.val();if(D!=""){C.addClass("loading");searchSummize(D,B,SEARCH_CALLBACKS.searchForm)}$("#side ul.sidebar-menu li").removeClass("active");$("#side #custom_search").addClass("active");return false});B.bind("loaded",null,function(D){C.removeClass("loading")})})};function loadTrendDescriptions(){$("#trends a").each(function(){var A=$(this);var C=A.parent().find("em");if(C.length){var B=A.text();var D=C.text().replace(new RegExp(B.replace(/([^\w])/gi,"\\$1"),"gi"),"<strong>"+B+"</strong>");page.trendDescriptions[A.attr("title")]=[B,D]}})}$(document).ready(function(){$("#tweet_search_submit").click(function(){$("#tweet_search").submit()});$("#content #trend_description img").tipsy({gravity:"s"});page.trendDescriptions={};loadTrendDescriptions();if($("body").attr("id")=="search"){onCondition(function(){return page.summizeResults},function(){window[SEARCH_CALLBACKS.summize](page.summizeResults)})}});twttr.appendClassesToSearchResults=function(){var A=$(this);A.addClass("tweet-url");if(A.text().match(/^@/)){A.addClass("username")}else{if(A.text().match(/^#/)){A.addClass("hashtag")}else{A.addClass("web")}}};var LIST_PUBLIC_MODE="public";var LIST_PRIVATE_MODE="private";var LIST_MAX_NAME_LENGTH=25;var LIST_MAX_DESCRIPTION_LENGTH=100;var numeric_mode=function(A){switch(A){case"public":return 0;case"private":return 1;default:return 0}};var updateListFollowersCount=function(A){return updateCount("#subscribers_tab .stat-count",A)};var updateListFollowingCount=function(A){return updateCount("#members_tab .stat-count",A)};var fadeUserOnListUnfollow=function(A){A.fadeOut("medium",function(){A.remove()})};var onListMembersPage=function(A){return $("body").hasClass("lists_members")&&$('.list-header h2 a[href="'+A.uri+'"]').length==1};var linkToList=function(A,B){A.dispatch_action="list";return'<li><a class="list_'+A.id+'" href="'+A.uri+'" data="'+h(JSON.stringify(A))+'">'+(B?"<em />":"")+"<span>"+listDisplayName(A)+"</span></a></li>"};var listDisplayName=function(A){return"<b>@</b>"+h(A.user)+"/<wbr/>"+h(A.slug)+lockIconForList(A)};var lockIconForList=function(A){return(A.mode==LIST_PRIVATE_MODE)?'<span class="lock-icon" title="Private List"></span>':""};var findListIndexBySlug=function(A,B){return jQuery.map(A,function(D,C){if(D.slug==B){return C}else{return null}})};$.fn.isUserListMenu=function(){var A=$("#list_menu");return this.one("click",function(){var D=$(this);var E=D.parents(".user");var C={};$.map(E.meta().lists,function(F){C[F.slug]=true});$("body").click();D.addClass("clicked").after(A.html());var B=D.siblings("ul");if(B.find("li:not(.new-list)").size()>=twttr.ListPerUserLimit){B.find(".new-list").remove()}B.find("li").each(function(){var F=$(this);if(F.hasClass("new-list")){F.isNewListLink()}else{F.isUserListItem(C[F.find('input[type="checkbox"]').meta().slug])}});$("html").one("click",function(){D.removeClass("clicked").blur().siblings("ul").remove().end().isUserListMenu();return false});return false})};$.fn.isUserListItem=function(D){var A=function(I,H,F,G){I.show();H.hide();var E=(G=="POST");H.attr("checked",E);F.unbind("click.checkbox");F.bind("click.while-processing",function(){return false})};var C=function(H,G,F,E){H.hide();G.show();F.unbind("click.while-processing");F.bind("click.checkbox",function(I){B.call(this,F,G,H,E);return false})};var B=function(M,F,I,L){var H=L?"DELETE":"POST";var G=M.parents(".user");var K=G.attr("id").replace("user_","");var J={authenticity_token:twttr.form_authenticity_token,twttr:true};var E=M.find('input[type="checkbox"]').meta().uri+"/members";if(H=="POST"){J["member[id]"]=K}else{E+="/"+K}$.ajax({type:H,dataType:"json",url:E,data:J,beforeSend:function(){A(I,F,M,H)},complete:function(){C(I,F,M,L)},success:function(N){L=(H=="POST");F.attr("checked",L);if(H=="POST"){addListToUser(G,N);if(onListMembersPage(N)){updateListFollowingCount(1)}}else{removeListFromUser(G,N);if(onListMembersPage(N)){fadeUserOnListUnfollow(G);updateListFollowingCount(-1)}}},error:function(){F.attr("checked",L)}})};return this.each(function(){var E=$(this);var F=E.find('input[type="checkbox"]');var H=E.find(".loading-spinner");var G=false;if(D){G=F.attr("checked",true)}E.bind("click.checkbox",function(I){B.call(this,E,F,H,G);return false})})};$.fn.isNewListLink=function(){return this.click(function(){var A=$(this).parents(".user");if(A.length==0){A=null}$(this).parent(".ul").remove();openListDialog(true,{userObject:A})})};$.fn.isEditListLink=function(){return this.click(function(){openListDialog(false,$(this).meta())})};var openListDialog=function(C,E){if(!E){E={}}var F=$("#list_dialog");var A=$(F.html());A.attr("id",null);var D="";if(C){A.addClass("create-list-dialog")}else{D=E.description;A.addClass("update-list-dialog").find('input[type="submit"]').val(_("Update list")).end().find(".list-name").val(E.name).end().find(".list-slug-title-and-slug").show().end().find(".list-description").val(D).end().find(".list-link span").text(E.slug).end().find('input[name="list[mode]"][value="'+numeric_mode(E.mode)+'"]').attr("checked",true);var B=A.find(".private-warning");A.find('input[name="list[mode]"]').change(function(){if(this.value==numeric_mode(LIST_PRIVATE_MODE)&&this.checked){B.show()}else{B.hide()}})}$(".list-description",A).maxLength(LIST_MAX_DESCRIPTION_LENGTH-2);$("body").append(A);A.find(".list-name").focus().end().isListDialog(C,E);return A};$.fn.isListDialog=function(B,A){return this.each(function(){var F=$(this);var E=A.userObject;F.find(".close").click(function(){F.remove()}).end();$(document).keydown(function(G){if(G.which==27){F.remove()}});var C=F.find("form");C.find(".list-name").one("keyup",function(){$(this).siblings(".list-slug-title-and-slug").show()}).isSlugField(C.find(".list-slug-field"),C.find(".list-link span"));if(E){C.find(".list-member-id").val(E.userId())}var D=$(this).find('input[type="submit"]');C.submit(function(H){var G=C.serialize();if(!B){G+="&"+$('<input type="hidden" name="_method" value="PUT" />').serialize()}$.ajax({type:"POST",dataType:"json",url:B?C.attr("action"):A.uri,data:G,beforeSend:function(){D.attr("disabled","disabled")},success:function(I){F.remove();if(B){addListToMenu(I);if(E){addListToUser(E,I)}addListToLists(I);(new ShortNotification()).setMessage(_("Yay! Your list was created.")).show()}else{window.location=parseURL(I.uri)}},error:function(I){(new InfoNotification()).setMessage(I.responseText).show()},complete:function(){D.removeAttr("disabled","disabled")}});H.preventDefault()})})};$.fn.isDestroyListLink=function(){return this.click(function(D){var C=$(this);var A=C.next("form");var B=A.attr("action");if(confirm(_("Are sure you want to delete this list? There is NO undo!"))){$.ajax({url:B,type:"POST",dataType:"json",data:{_method:"delete",authenticity_token:twttr.form_authenticity_token,twttr:true},beforeSend:function(){C.disable()},success:function(){document.location=parseURL("/")},error:function(){C.enable()}})}return false})};$.fn.isSubscribeListLink=function(){return this.click(function(B){var A=$(this);$.ajax({url:A.attr("href"),type:"POST",dataType:"json",data:{authenticity_token:twttr.form_authenticity_token,twttr:true},beforeSend:function(){A.disable()},complete:function(){A.enable()},success:function(){A.parents(".list").addClass("subscriber");updateListFollowersCount(1)},error:function(){A.parents(".list").removeClass("subscriber")}});return false})};$.fn.isUnsubscribeListLink=function(){return this.click(function(B){var A=$(this);$.ajax({url:A.attr("href"),type:"POST",dataType:"json",data:{_method:"delete",authenticity_token:twttr.form_authenticity_token,twttr:true},success:function(){A.parents(".list").removeClass("subscriber");var C=$("#lists_subscribers #follow_grid #user_"+page.sessionUserId);fadeUserOnListUnfollow(C);updateListFollowersCount(-1)},error:function(){A.parents(".list").addClass("subscriber")}});B.preventDefault()})};$.fn.isListInPageLink=function(){return this.each(function(){var A=$(this);A.isInPageLink(setTimelineForListInPageLink)})};var setTimelineForListInPageLink=function(A){var F=$(this);$("#timeline_heading").show();var E=$("#timeline_heading h1");var D=$("#timeline_heading h2");var C=A.meta();var B=h(C.uri);var G=listDisplayName(C);D.remove();E.html(G);E.after('<h2 class="list-subheading"><p class="list-numbers"><a href="'+B+'/members">'+_("Following:")+" <span>"+h(C.member_count)+"</span></a>"+(C.mode==LIST_PRIVATE_MODE?"":'<a href="'+B+'/subscribers">'+_("Followers:")+" <span>"+h(C.subscriber_count)+"</span></a>")+'</p><p class="list-link"><a href="'+B+'">'+_("View list page")+"<span> ›</span></a></p></h2>");if(C.member_count==0){$("#timeline_heading h2").append($(C.user==page.sessionUserScreenName?"#list_no_members_owner":"#list_no_members").html())}setDocumentTitle("Twitter / "+C.full_name)};var addListToUser=function(B,A){return B.each(function(){if(findListIndexBySlug(B.meta().lists,A.slug).length==0){B.meta().lists.push(A);if(B.find(".list-tags").length>0){B.find(".list-tags-outer:hidden").show();B.find(".list-tags").append(linkToList(A))}}})};var removeListFromUser=function(B,A){$.each(findListIndexBySlug(B.meta().lists,A.slug),function(){Array.remove(B.meta().lists,this);B.find(".list-tags .list_"+A.id).each(function(){$(this).parent("li").remove()});if(B.meta().lists.length==0){B.find(".list-tags-outer:visible").hide()}})};var addListToMenu=function(B){var A=$("#list_menu");A.find(".new-list").before('<li><img class="loading-spinner" src="http://s.twimg.com/a/1262981812/images/spinner.gif" style="display: none;" alt="waiting" title="waiting" height="14" width="14"/><input type="checkbox" id="list_'+B.id+'" data="'+h(JSON.stringify(B))+'" /> <label for="list_'+B.id+'">'+h(B.name)+lockIconForList(B)+"</label></li>")};var isInPageLists=function(){return $("#side_lists.in-page-lists").length==1};var addListToLists=function(C){var B=isInPageLists();var A=$("ul.lists-links").siblings(".no-lists").remove().end().append(linkToList(C,B)).find(".list_"+C.id);if(B){A.addClass("in-page-list-link").isListInPageLink().isSidebarTab().click()}};var bindAdminListActions=function(){$("#admin_list a.destroy-list").isDestroyListLink();$("#admin_list a.edit-list").isEditListLink()};var isMoreButton=function(){$("#lists_pagination #more").live("click",basicMoreButtonHandler({beforeSend:function(){$("#more").addClass("loading").html("")},success:function(A){$("#lists_table tbody").append($(A["#lists"]));$("#lists_pagination").html(A["#pagination"])},error:function(){$("#more").removeClass("loading").text(_("more"));(new ShortNotification()).setMessage(_("Whoops! Something went wrong. Please try again!")).show()}}))};$.fn.equals=function(A){return this.length==1&&A.length==1&&this.get(0)==A.get(0)};$.fn.hasParent=function(A){return jQuery.inArray(A[0],this.parents())>-1};function InlineForm(A){this.initialize(A)}jQuery.extend(InlineForm.prototype,{defaultOptions:{title:"",submitBtnValue:"",showCancel:true,closeOnOutsideClick:true,formClass:"",timelineChangedEvents:false,pageHeightChangedEvents:false},overrideDefaultOptions:{},initialize:function(A){this.options=jQuery.extend({},this.defaultOptions);jQuery.extend(this.options,this.overrideDefaultOptions);jQuery.extend(this.options,A);this.$form=$('<div class="inline-form '+this.options.formClass+'"></div>');this.$buttonParent=$('<div class="inline-form-buttons"></div>');this.$button=$('<button type="button" class="btn">'+this.options.submitBtnValue+"</button>");if(this.options.showCancel){this.$cancel=$('<span class="cancel">&nbsp;</span>')}this.$form_inner=$('<div class="inline-form-inner"></div>');this.$input=$('<textarea class="inline-form-input"></textarea>');this.$inputsPrompt=$('<div class="inline-inputs-prompt"></div>');this.$title=$('<div class="title">'+this.options.title+"</div>");this.$body=$('<div class="body">'+(this.options.body||"")+"</div>");this.initEvents()},initEvents:function(){this.buttonEvent=this.submitForm.pBind(this);this.closeEvent=this.close.pBind(this);this.outsideClickEvent=this.destroyFromEvent.pBind(this);this.timelineEvent=this.timelineEvent.pBind(this);if(this.options.timelineChangedEvents){$.Timeline.registerTimelineEvent(this.timelineEvent)}if(this.options.pageHeightChangedEvents){this.pageHeightChangedEvent=this.pageHeightChangedEvent.pBind(this);$.Timeline.registerPageHeightChangedEvent(this.pageHeightChangedEvent)}},addEvents:function(){this.$button.click(this.buttonEvent);if(this.options.showCancel){this.$cancel.click(this.closeEvent)}if(this.options.closeOnOutsideClick){$(window).click(this.outsideClickEvent)}},removeEvents:function(){this.$button.unbind("click",this.buttonEvent);if(this.options.showCancel){this.$cancel.unbind("click",this.closeEvent)}if(this.options.closeOnOutsideClick){$(window).unbind("click",this.outsideClickEvent)}if(this.options.timelineChangedEvents){$.Timeline.unregisterTimelineEvent(this.timelineEvent)}$.Timeline.unregisterPageHeightChangedEvent(this.pageHeightChangedEvent)},onSendError:function(A){if(this.sendNotification){this.sendNotification.cancel()}(new InfoNotification()).setMessage(_("Whoops! Something went wrong. Please refresh the page and try again!")).show();this.close()},onSendSuccess:function(A){},formAction:function(){},timelineEvent:function(){},pageHeightChangedEvent:function(){this.positionForm()},postData:function(){},beforePost:function(){},onComplete:function(){},submitForm:function(){this.$button.disable();var A={authenticity_token:twttr.form_authenticity_token};jQuery.extend(A,this.postData());if(this.progressNotificationText){this.sendNotification=(new ProgressNotification()).setProgressMessage(this.progressNotificationText).setCompletedMessage(_("Ok, done.")).show()}this.beforePost();$.ajax({type:"POST",dataType:"json",dataFilter:function(B){if(!jQuery.trim(B)){return null}return B},url:this.formAction(),data:A,error:function(B){this.onSendError(B)}.pBind(this),success:function(B){this.onSendSuccess(B);this.close();if(this.sendNotification){this.sendNotification.done()}}.pBind(this),beforeSend:twttr.loading,complete:function(){twttr.loaded();this.onComplete()}.pBind(this)})},arrange:function(){var A=$('<div class="inline-form-inputs"></div>');if(this.options.showCancel){this.$buttonParent.append(this.$cancel)}this.$buttonParent.append(this.$button);this.$form_inner.append(A.append(this.$title).append(this.$body).append(this.$inputsPrompt).append(this.$input)).append(this.$buttonParent);this.$form.append(this.$form_inner);this.$form.hide();this.baseElement().append(this.$form)},baseElement:function(){return this.$parentNode||$(document.body)},show:function(A){this.addEvents();this.$targetNode=A.targetNode;this.$parentNode=A.parentNode;this.positionForm();this.arrange();this.$form.fadeIn(100);this.currentlyShown=true;this.afterShow()},afterShow:function(){},positionForm:function(){if(this.$targetNode.width()>0){var C=this.position();var B=C[0];var A=C[1];this.$form.css("top",B).css("left",A)}else{this.close()}},close:function(){this.removeEvents();this.$form.remove();this.currentlyShown=false;this.afterClose()},afterClose:function(){},destroyFromEvent:function(B){var A=$(B.target);if(A.equals(this.$targetNode)||jQuery.inArray(this.$targetNode.get(0),A.parents())!=-1||A.equals(this.$form)||A.hasParent(this.$form)){return }this.close()},position:function(){var A=this.$targetNode.offset();return[A.top,A.left]}});RetweetInlineForm=function(){var A=_("Yes");var B=_("Retweet to your followers?");this.initialize({title:B,submitBtnValue:A})};RetweetInlineForm.prototype=new InlineForm();jQuery.extend(RetweetInlineForm.prototype,{overrideDefaultOptions:{formClass:"retweet-dlg",pageHeightChangedEvents:true},formAction:function(){var B=getListItemFromChild(this.$targetNode);var A=getStatusIdFromListItem(B);return"/statuses/"+A+"/retweet"},postData:function(){return{controller_name:page.controller_name,action_name:page.action_name}},beforePost:function(){this.close();twttr.setRetweetingStyles(this.$targetNode,_("Updating..."))},onSendSuccess:function(A){twttr.animateStatusReplacement(this.$targetNode,A)},onComplete:function(){twttr.unsetRetweetingStyles(this.$targetNode)},afterShow:function(){getListItemFromChild(this.$targetNode).addClass("perma-hover");this.$targetNode.find("a").blur()},afterClose:function(){getListItemFromChild(this.$targetNode).removeClass("perma-hover")},position:function(){var A=this.$targetNode.offset();return[parseInt(A.top)+20,parseInt(A.left)-220]}});RetweetContextDlgForm=function(){var B=_("Close");var C=_("Wondering who this is?");var A=_('Someone you follow thought this was worth retweeting, which is why you are seeing it in your Home timeline. <a target="_blank" href="http://help.twitter.com/forums/10711/entries/77606">Learn more</a>.');this.initialize({title:C,body:A,submitBtnValue:B})};RetweetContextDlgForm.prototype=new InlineForm();jQuery.extend(RetweetContextDlgForm.prototype,{overrideDefaultOptions:{showCancel:false,closeOnOutsideClick:false,formClass:"retweet-ctx-dlg",timelineChangedEvents:true},formAction:function(){return"/users/"+page.sessionUserId},postData:function(){return{_method:"put","user[has_dismissed_retweet_contextual_dialog]":"1"}},position:function(){return[this.$parentNode.height(),-9]},timelineEvent:function(){if(!this.currentlyShown){this.showIfElementExists()}},afterShow:function(){this.$targetNode.css("z-index","300");var A=parseInt($.cookie("retweet_contextual_count"))||0;if(A<5){$.cookie("retweet_contextual_count",A+1)}else{this.close();this.submitForm();$.cookie("retweet_contextual_count",null)}},afterClose:function(){this.$targetNode.css("z-index",null)},showIfElementExists:function(){var A=$(".rt-dlg");if(A.length){this.show({targetNode:A,parentNode:A})}}});$(document).ready(function(){new RetweetContextDlgForm().showIfElementExists()});$(document).ready(function(){try{var A="share-text-active";$(".status").each(function(){var E=$(this);var C=E.find(".retweet-link");var D=E.find(".share-text");C.hover(function(){D.addClass(A)},function(){D.removeClass(A)})})}catch(B){}});(function(){jQuery.inherits=function(A,C){function B(){}B.prototype=C.prototype;A.prototype=new B();A.prototype.constructor=A}})();(function(){jQuery.fn.equals=function(A){return this.get(0)==A.get(0)}})();(function(){jQuery.fn.hasParent=function(A){var B=false;this.parents().map(function(){if($(this).equals(A)){B=true}});return B}})();function Notification(B){this.$bar=jQuery('<div class="notification-bar"></div>');this.$barContainer=jQuery('<div class="notification-bar-container"></div>');this.$barContents=jQuery('<div class="notification-bar-contents"></div>');this.$barBackground=jQuery('<div class="notification-bar-bkg"></div>');this.$message=jQuery('<div class="message"></div>');this.$bar.hide();this.$barBackground.hide();var A=this;this.$bar.click(function(C){A.removeAfterEvent(C)});this.className=B}Notification.SLIDE_SPEED_IN_MS=300;Notification.prototype.remove=function(){var A=this;this.slideUp(function(){A.$bar.remove();A.$barBackground.remove();window.clearTimeout(A.timeout)})};Notification.prototype.removeAfterEvent=function(B){var A=$(B.target);if(A.get(0).nodeName.toLowerCase()=="a"&&A.hasParent(this.$message)){return }this.remove()};Notification.prototype.setMessage=function(A){this.msg=A;return this};Notification.prototype.show=function(){this.$message.addClass(this.className).html(this.msg);this.$barContainer.append(this.$barBackground).append(this.$bar.append(this.$barContents.append(this.$message)));jQuery("#notifications").append(this.$barContainer);this.$barBackground.height(this.$bar.height());this.showBar();if(this.onShow){this.onShow()}return this};Notification.prototype.removeInMilliseconds=function(){var A=this;this.timeout=window.setTimeout(function(){A.remove()},A.timeoutInMilliseconds)};Notification.prototype.showBar=function(){this.$bar.show();this.$barBackground.show()};Notification.prototype.onShow=function(){this.removeInMilliseconds()};Notification.prototype.slideUp=function(A){this.$bar.slideUp(Notification.SLIDE_SPEED_IN_MS);this.$barBackground.slideUp(Notification.SLIDE_SPEED_IN_MS,A)};function ShortNotification(){Notification.call(this,"message-info");this.timeoutInMilliseconds=3000}jQuery.inherits(ShortNotification,Notification);ShortNotification.prototype.showBar=function(){this.$bar.slideDown(Notification.SLIDE_SPEED_IN_MS);this.$barBackground.slideDown(Notification.SLIDE_SPEED_IN_MS)};function InfoNotification(){Notification.call(this,"message-info");this.timeoutInMilliseconds=6000}jQuery.inherits(InfoNotification,Notification);InfoNotification.prototype.showBar=function(){this.$bar.slideDown(Notification.SLIDE_SPEED_IN_MS);this.$barBackground.slideDown(Notification.SLIDE_SPEED_IN_MS)};function ProgressNotification(){Notification.call(this,"message-progress");this.timeoutInMilliseconds=1000}jQuery.inherits(ProgressNotification,Notification);ProgressNotification.prototype.setProgressMessage=function(A){return this.setMessage(A)};ProgressNotification.prototype.setCompletedMessage=function(A){this.completedMsg=A;return this};ProgressNotification.prototype.onShow=function(){};ProgressNotification.prototype.cancel=function(){this.timeoutInMilliseconds=0;this.removeInMilliseconds()};ProgressNotification.prototype.done=function(){this.$message.addClass("message-progress-done").removeClass(this.className).html(this.completedMsg);this.removeInMilliseconds()};function ErrorNotification(){Notification.call(this,"message-error");this.timeoutInMilliseconds=8000}jQuery.inherits(ErrorNotification,Notification);function Occasionally(A,D,C,B,E){this.interval=A;this.maxDecayTime=D;this.job=C;this.decayCallback=B;this.timesRun=0;this.decayRate=1;this.decayMultiplier=E||1.25;this.maxRequests=360}Occasionally.prototype.start=function(){this.stop();this.run()};Occasionally.prototype.stop=function(){if(this.worker){window.clearTimeout(this.worker)}};Occasionally.prototype.run=function(){var A=this;this.decayRate=this.decayCallback()?Math.max(1,this.decayRate/this.decayMultiplier):this.decayRate*this.decayMultiplier;var B=this.interval*this.decayRate;B=(B>=this.maxDecayTime)?this.maxDecayTime:B;this.worker=window.setTimeout(function(){A.execute()},Math.floor(B))};Occasionally.prototype.execute=function(){this.job();if(++this.timesRun<this.maxRequests){this.run()}};twttr.countClick=function(){var A=twttr.createTrackingParameters(this);twttr.asyncClickCount(A)};twttr.asyncClickCount=function(A){(new Image()).src=parseURL("/abacus?"+$.param(A))};twttr.createTrackingParameters=function(F){var B=$(F);var A=function(){var K=B.attr("class");var I=["hashtag","profile-pic","screen-name","username","web"];for(var J in I){if(K.indexOf(I[J])!==-1){return I[J]}}}();var E=B.closest(".status").find(".meta").children("a").get(0).href.split("/");var G=E[E.length-1];var H=$('meta[name="session-userid"]');var D=H.attr("content")||-1;var C=twttr.form_authenticity_token||$('input[name="authenticity_token"]').attr("value");return{url:F.href,linkType:A,tweetId:G,userId:D,authenticity_token:C,time:(new Date).getTime()}};$(document).ready(function(){var A=$("#content a.tweet-url");A.live("mousedown",twttr.countClick)});/*
    http://www.JSON.org/json2.js
    2009-09-21

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html

    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
*/

/*jslint evil: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!this.JSON) {
    this.JSON = {};
}

(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval(parseJS('(' + text + ')'));

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
(function(A){A.fn.log=function(B){this.click(function(){A.ajax({type:"POST",url:B.url,data:{log:JSON.stringify(B.log.call(this)),authenticity_token:twttr.form_authenticity_token,twttr:true}})});return this}})(jQuery);/*
 * Copyright (c) 2007 Josh Bush (digitalbush.com)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:

 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/*
 * Version: Beta 1
 * Release: 2007-06-01
 */
(function($) {
	var map=new Array();
	$.Watermark = {
		ShowAll:function(){
			for (var i=0;i<map.length;i++){
				if(map[i].obj.val()==""){
					map[i].obj.val(map[i].text);
					map[i].obj.css("color",map[i].WatermarkColor);
				}else{
				    map[i].obj.css("color",map[i].DefaultColor);
				}
			}
		},
		HideAll:function(){
			for (var i=0;i<map.length;i++){
				if(map[i].obj.val()==map[i].text)
					map[i].obj.val("");
			}
		}
	}

	$.fn.Watermark = function(text,color) {
		if(!color)
			color="#aaa";
		return this.each(
			function(){
				var input=$(this);
				var defaultColor=input.css("color");
				map[map.length]={text:text,obj:input,DefaultColor:defaultColor,WatermarkColor:color};
				function clearMessage(){
					if(input.val()==text)
						input.val("");
					input.css("color",defaultColor);
				}

				function insertMessage(){
					if(input.val().length==0 || input.val()==text){
						input.val(text);
						input.css("color",color);
					}else
						input.css("color",defaultColor);
				}

				input.focus(clearMessage);
				input.blur(insertMessage);
				input.change(insertMessage);

				insertMessage();
			}
		);
	};
})(jQuery);
/*
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */

(function(jQuery){

	// We override the animation for all of these color styles
	jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor', 'borderColor'], function(i,attr){
		jQuery.fx.step[attr] = function(fx){
			if ( fx.state == 0 ) {
				fx.start = getColor( fx.elem, attr );
				fx.end = getRGB( fx.end );
			}

			fx.elem.style[attr] = "rgb(" + [
				Math.max(Math.min( parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)
			].join(",") + ")";
		}
	});

	// Color Conversion functions from highlightFade
	// By Blair Mitchelmore
	// http://jquery.offput.ca/highlightFade/

	// Parse strings looking for color tuples [255,255,255]
	function getRGB(color) {
		var result;

		// Check if we're already dealing with an array of colors
		if ( color && color.constructor == Array && color.length == 3 )
			return color;

		// Look for rgb(num,num,num)
		if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
			return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

		// Look for rgb(num%,num%,num%)
		if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
			return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];

		// Look for #a0b1c2
		if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
			return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];

		// Look for #fff
		if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
			return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];

		// Otherwise, we're most likely dealing with a named color
		return colors[jQuery.trim(color).toLowerCase()];
	}

	function getColor(elem, attr) {
		var color;

		do {
			color = jQuery.curCSS(elem, attr);

			// Keep going until we find an element that has color, or we hit the body
			if ( color != '' && color != 'transparent' || jQuery.nodeName(elem, "body") )
				break;

			attr = "backgroundColor";
		} while ( elem = elem.parentNode );

		return getRGB(color);
	};

	// Some named colors to work with
	// From Interface by Stefan Petre
	// http://interface.eyecon.ro/

	var colors = {
		aqua:[0,255,255],
		azure:[240,255,255],
		beige:[245,245,220],
		black:[0,0,0],
		blue:[0,0,255],
		brown:[165,42,42],
		cyan:[0,255,255],
		darkblue:[0,0,139],
		darkcyan:[0,139,139],
		darkgrey:[169,169,169],
		darkgreen:[0,100,0],
		darkkhaki:[189,183,107],
		darkmagenta:[139,0,139],
		darkolivegreen:[85,107,47],
		darkorange:[255,140,0],
		darkorchid:[153,50,204],
		darkred:[139,0,0],
		darksalmon:[233,150,122],
		darkviolet:[148,0,211],
		fuchsia:[255,0,255],
		gold:[255,215,0],
		green:[0,128,0],
		indigo:[75,0,130],
		khaki:[240,230,140],
		lightblue:[173,216,230],
		lightcyan:[224,255,255],
		lightgreen:[144,238,144],
		lightgrey:[211,211,211],
		lightpink:[255,182,193],
		lightyellow:[255,255,224],
		lime:[0,255,0],
		magenta:[255,0,255],
		maroon:[128,0,0],
		navy:[0,0,128],
		olive:[128,128,0],
		orange:[255,165,0],
		pink:[255,192,203],
		purple:[128,0,128],
		violet:[128,0,128],
		red:[255,0,0],
		silver:[192,192,192],
		white:[255,255,255],
		yellow:[255,255,0]
	};

})(jQuery);
/* Copyright (c) 2008 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.0.3
 * Requires jQuery 1.1.3+
 * Docs: http://docs.jquery.com/Plugins/livequery
 */

(function($) {

$.extend($.fn, {
	livequery: function(type, fn, fn2) {
		var self = this, q;

		// Handle different call patterns
		if ($.isFunction(type))
			fn2 = fn, fn = type, type = undefined;

		// See if Live Query already exists
		$.each( $.livequery.queries, function(i, query) {
			if ( self.selector == query.selector && self.context == query.context &&
				type == query.type && (!fn || fn.$lqguid == query.fn.$lqguid) && (!fn2 || fn2.$lqguid == query.fn2.$lqguid) )
					// Found the query, exit the each loop
					return (q = query) && false;
		});

		// Create new Live Query if it wasn't found
		q = q || new $.livequery(this.selector, this.context, type, fn, fn2);

		// Make sure it is running
		q.stopped = false;

		// Run it immediately for the first time
		q.run();

		// Contnue the chain
		return this;
	},

	expire: function(type, fn, fn2) {
		var self = this;

		// Handle different call patterns
		if ($.isFunction(type))
			fn2 = fn, fn = type, type = undefined;

		// Find the Live Query based on arguments and stop it
		$.each( $.livequery.queries, function(i, query) {
			if ( self.selector == query.selector && self.context == query.context &&
				(!type || type == query.type) && (!fn || fn.$lqguid == query.fn.$lqguid) && (!fn2 || fn2.$lqguid == query.fn2.$lqguid) && !this.stopped )
					$.livequery.stop(query.id);
		});

		// Continue the chain
		return this;
	}
});

$.livequery = function(selector, context, type, fn, fn2) {
	this.selector = selector;
	this.context  = context || document;
	this.type     = type;
	this.fn       = fn;
	this.fn2      = fn2;
	this.elements = [];
	this.stopped  = false;

	// The id is the index of the Live Query in $.livequery.queries
	this.id = $.livequery.queries.push(this)-1;

	// Mark the functions for matching later on
	fn.$lqguid = fn.$lqguid || $.livequery.guid++;
	if (fn2) fn2.$lqguid = fn2.$lqguid || $.livequery.guid++;

	// Return the Live Query
	return this;
};

$.livequery.prototype = {
	stop: function() {
		var query = this;

		if ( this.type )
			// Unbind all bound events
			this.elements.unbind(this.type, this.fn);
		else if (this.fn2)
			// Call the second function for all matched elements
			this.elements.each(function(i, el) {
				query.fn2.apply(el);
			});

		// Clear out matched elements
		this.elements = [];

		// Stop the Live Query from running until restarted
		this.stopped = true;
	},

	run: function() {
		// Short-circuit if stopped
		if ( this.stopped ) return;
		var query = this;

		var oEls = this.elements,
			els  = $(this.selector, this.context),
			nEls = els.not(oEls);

		// Set elements to the latest set of matched elements
		this.elements = els;

		if (this.type) {
			// Bind events to newly matched elements
			nEls.bind(this.type, this.fn);

			// Unbind events to elements no longer matched
			if (oEls.length > 0)
				$.each(oEls, function(i, el) {
					if ( $.inArray(el, els) < 0 )
						$.event.remove(el, query.type, query.fn);
				});
		}
		else {
			// Call the first function for newly matched elements
			nEls.each(function() {
				query.fn.apply(this);
			});

			// Call the second function for elements no longer matched
			if ( this.fn2 && oEls.length > 0 )
				$.each(oEls, function(i, el) {
					if ( $.inArray(el, els) < 0 )
						query.fn2.apply(el);
				});
		}
	}
};

$.extend($.livequery, {
	guid: 0,
	queries: [],
	queue: [],
	running: false,
	timeout: null,

	checkQueue: function() {
		if ( $.livequery.running && $.livequery.queue.length ) {
			var length = $.livequery.queue.length;
			// Run each Live Query currently in the queue
			while ( length-- )
				$.livequery.queries[ $.livequery.queue.shift() ].run();
		}
	},

	pause: function() {
		// Don't run anymore Live Queries until restarted
		$.livequery.running = false;
	},

	play: function() {
		// Restart Live Queries
		$.livequery.running = true;
		// Request a run of the Live Queries
		$.livequery.run();
	},

	registerPlugin: function() {
		$.each( arguments, function(i,n) {
			// Short-circuit if the method doesn't exist
			if (!$.fn[n]) return;

			// Save a reference to the original method
			var old = $.fn[n];

			// Create a new method
			$.fn[n] = function() {
				// Call the original method
				var r = old.apply(this, arguments);

				// Request a run of the Live Queries
				$.livequery.run();

				// Return the original methods result
				return r;
			}
		});
	},

	run: function(id) {
		if (id != undefined) {
			// Put the particular Live Query in the queue if it doesn't already exist
			if ( $.inArray(id, $.livequery.queue) < 0 )
				$.livequery.queue.push( id );
		}
		else
			// Put each Live Query in the queue if it doesn't already exist
			$.each( $.livequery.queries, function(id) {
				if ( $.inArray(id, $.livequery.queue) < 0 )
					$.livequery.queue.push( id );
			});

		// Clear timeout if it already exists
		if ($.livequery.timeout) clearTimeout($.livequery.timeout);
		// Create a timeout to check the queue and actually run the Live Queries
		$.livequery.timeout = setTimeout($.livequery.checkQueue, 20);
	},

	stop: function(id) {
		if (id != undefined)
			// Stop are particular Live Query
			$.livequery.queries[ id ].stop();
		else
			// Stop all Live Queries
			$.each( $.livequery.queries, function(id) {
				$.livequery.queries[ id ].stop();
			});
	}
});

// Register core DOM manipulation methods
$.livequery.registerPlugin('append', 'prepend', 'after', 'before', 'wrap', 'attr', 'removeAttr', 'addClass', 'removeClass', 'toggleClass', 'empty', 'remove');

// Run Live Queries when the Document is ready
$(function() { $.livequery.play(); });


// Save a reference to the original init method
var init = $.prototype.init;

// Create a new init method that exposes two new properties: selector and context
$.prototype.init = function(a,c) {
	// Call the original init and save the result
	var r = init.apply(this, arguments);

	// Copy over properties if they exist already
	if (a && a.selector)
		r.context = a.context, r.selector = a.selector;

	// Set properties
	if ( typeof a == 'string' )
		r.context = c || document, r.selector = a;

	// Return the result
	return r;
};

// Give the init function the jQuery prototype for later instantiation (needed after Rev 4091)
$.prototype.init.prototype = $.prototype;

})(jQuery);/*
 * Metadata - jQuery plugin for parsing metadata from elements
 *
 * Copyright (c) 2006 John Resig, Yehuda Katz, J�örn Zaefferer, Paul McLanahan
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.metadata.js 3640 2007-10-11 18:34:38Z pmclanahan $
 *
 */

/**
 * Sets the type of metadata to use. Metadata is encoded in JSON, and each property
 * in the JSON will become a property of the element itself.
 *
 * There are four supported types of metadata storage:
 *
 *   attr:  Inside an attribute. The name parameter indicates *which* attribute.
 *          
 *   class: Inside the class attribute, wrapped in curly braces: { }
 *   
 *   elem:  Inside a child element (e.g. a script tag). The
 *          name parameter indicates *which* element.
 *   html5: Values are stored in data-* attributes.
 *          
 * The metadata for an element is loaded the first time the element is accessed via jQuery.
 *
 * As a result, you can define the metadata type, use $(expr) to load the metadata into the elements
 * matched by expr, then redefine the metadata type and run another $(expr) for other elements.
 * 
 * @name $.metadata.setType
 *
 * @example <p id="one" class="some_class {item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("class")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from the class attribute
 * 
 * @example <p id="one" class="some_class" data="{item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("attr", "data")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a "data" attribute
 * 
 * @example <p id="one" class="some_class"><script>{item_id: 1, item_label: 'Label'}</script>This is a p</p>
 * @before $.metadata.setType("elem", "script")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a nested script element
 * 
 * @example <p id="one" class="some_class" data-item_id="1" data-item_label="Label">This is a p</p>
 * @before $.metadata.setType("html5")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a series of data-* attributes
 *
 * @param String type The encoding type
 * @param String name The name of the attribute to be used to get metadata (optional)
 * @cat Plugins/Metadata
 * @descr Sets the type of encoding to be used when loading metadata for the first time
 * @type undefined
 * @see metadata()
 */

(function($) {

$.extend({
  metadata : {
    defaults : {
      type: 'class',
      name: 'metadata',
      cre: /({.*})/,
      single: 'metadata'
    },
    setType: function( type, name ){
      this.defaults.type = type;
      this.defaults.name = name;
    },
    get: function( elem, opts ){
      var settings = $.extend({},this.defaults,opts);
      // check for empty string in single property
      if ( !settings.single.length ) settings.single = 'metadata';
      
      var data = $.data(elem, settings.single);
      // returned cached data if it already exists
      if ( data ) return data;
      
      data = "{}";
      
      var getData = function(data) {
        if(typeof data != "string") return data;
        
        if( data.indexOf('{') < 0 ) {
          data = eval(parseJS("(" + data + ")"));
        }
      }
      
      var getObject = function(data) {
        if(typeof data != "string") return data;
        
        data = eval(parseJS("(" + data + ")"));
        return data;
      }
      
      if ( settings.type == "html5" ) {
        var object = {};
        $( elem.attributes ).each(function() {
          var name = this.nodeName;
          if(name.match(/^data-/)) name = name.replace(/^data-/, '');
          else return true;
          object[name] = getObject(this.nodeValue);
        });
      } else {
        if ( settings.type == "class" ) {
          var m = settings.cre.exec( elem.className );
          if ( m )
            data = m[1];
        } else if ( settings.type == "elem" ) {
          if( !elem.getElementsByTagName ) return;
          var e = elem.getElementsByTagName(settings.name);
          if ( e.length )
            data = $.trim(e[0].innerHTML);
        } else if ( elem.getAttribute != undefined ) {
          var attr = elem.getAttribute( settings.name );
          if ( attr )
            data = attr;
        }
        object = getObject(data.indexOf("{") < 0 ? "{" + data + "}" : data);
      }
      
      $.data( elem, settings.single, object );
      return object;
    }
  }
});

/**
 * Returns the metadata object for the first member of the jQuery object.
 *
 * @name metadata
 * @descr Returns element's metadata object
 * @param Object opts An object contianing settings to override the defaults
 * @type jQuery
 * @cat Plugins/Metadata
 */
$.fn.metadata = function( opts ){
  return $.metadata.get( this[0], opts );
};

})(jQuery);//Licensed under The MIT License
//Copyright (c) 2008 Jason Frame (jason@onehackoranother.com)


(function($) {
    $.fn.tipsy = function(opts) {

        opts = $.extend({fade: false, gravity: 'n'}, opts || {});
        // ...Added by andy@twitter.com 20090717
        if(!opts['offsetTop']) { opts['offsetTop'] = 0; }
        if(!opts['offsetLeft']) { opts['offsetLeft'] = 0; }
        if(!opts['header']) { opts['header'] = ''; }
        if(!opts['footer']) { opts['footer'] = ''; }
        if(!opts['hideTimeout']) { opts['hideTimeout'] = 100; }
        if(!opts['showTimeout']) { opts['hideTimeout'] = 0; }
        if(!opts['additionalCSSClass']) { opts['additionalCSSClass'] = ''; }
        var showTimeoutKey = false;
        // ...Added by andy@twitter.com 20090717
        var tip = null, cancelHide = false;
        this.hover(function() {

            // ...Added by andy@twitter.com 20090717
            var linkText = $(this).text();
            var header = opts['header'].replace('%{link}', linkText);
            var footer = opts['footer'].replace('%{link}', linkText);
            // ...Added by andy@twitter.com 20090717

            $.data(this, 'cancel.tipsy', true);

            var tip = $.data(this, 'active.tipsy');
            if (!tip) {
                $('.tipsy').hide();
                tip = $('<div class="tipsy '+ opts['additionalCSSClass'] +'"><div class="tipsy-inner">' + header + $(this).attr('title') + footer + '</div></div>');
                tip.css({position: 'absolute', zIndex: 100000});
                $(this).attr('title', '');
                $.data(this, 'active.tipsy', tip);
            // Added by rael@twitter.com 20090628...
            } else if ($(this).attr('title') != '') {
              tip.find('.tipsy-inner').html($(this).attr('title'));
              $(this).attr('title', '');
            // ...Added by rael@twitter.com 20090628
            }

            var pos = $.extend({}, $(this).offset(), {width: this.offsetWidth, height: this.offsetHeight});
            // ...Added by andy@twitter.com 20090717
            pos.top = pos.top + opts['offsetTop'];
            pos.left = pos.left + opts['offsetLeft'];

            // remove open tips if timeout to fade
            $('.tipsy').hide();
            // ...Added by andy@twitter.com 20090717
            tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).appendTo(document.body);
            var actualWidth = tip[0].offsetWidth, actualHeight = tip[0].offsetHeight;

            switch (opts.gravity.charAt(0)) {
                case 'n':
                    tip.css({top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}).addClass('tipsy-north');
                    break;
                case 'l':
                    //left north align
                    tip.css({top: pos.top + pos.height, left: pos.left + pos.width / 2 - 18}).addClass('tipsy-north');
                    break;
                case 's':
                    tip.css({top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}).addClass('tipsy-south');
                    break;
                case 'e':
                    tip.css({top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}).addClass('tipsy-east');
                    break;
                case 'w':
                    tip.css({top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}).addClass('tipsy-west');
                    break;
            }
            // ...Added by andy@twitter.com 20090717
            function show() {
              if (opts.fade) {
                  tip.css({opacity: 0, display: 'block', visibility: 'visible'}).animate({opacity: 1});
              } else {
                  tip.css({visibility: 'visible'});
              }
            }
            if(opts['showTimeout']) {
              showTimeoutKey = setTimeout(show, opts['showTimeout']);
            } else {
              show();
            }
        }, function() {
            clearTimeout(showTimeoutKey);
            // ...Added by andy@twitter.com 20090717
            $.data(this, 'cancel.tipsy', false);
            var self = this;
            setTimeout(function() {
                if ($.data(this, 'cancel.tipsy')) return;
                var tip = $.data(self, 'active.tipsy');
                if (opts.fade) {
                    tip.stop().fadeOut(function() { $(this).remove(); });
                } else {
                    tip.remove();
                }
            }, opts['hideTimeout']);
        });

    };
})(jQuery);
