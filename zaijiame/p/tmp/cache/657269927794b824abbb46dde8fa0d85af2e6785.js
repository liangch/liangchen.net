/*    HTTP Host:  static.ak.fbcdn.net                                          */
/*    Generated:  December 22nd 2009 12:14:46 PM PST                           */
/*      Machine:  10.16.140.104                                                */
/*       Source:  Global Cache                                                 */
/*     Location:  js/930uc0a40rok0800.pkg.js h:3slhnonx                        */
/*       Locale:  nu_ll                                                        */
/*         Path:  js/930uc0a40rok0800.pkg.js                                   */

if (window.CavalryLogger) { CavalryLogger.start_js(["js\/930uc0a40rok0800.pkg.js"]); }

function crc16(c){var a=65535;for(var b=0;b<c.length;b++){var d=((a>>8)^c.charCodeAt(b))&255;d^=d>>4;a=((a<<8)^(d<<12)^(d<<5)^d)&65535;}return a;}
function menubar_login(c){var a=ge('pass');if(a){var b=$('pass_placeholder');b.value=c;CSS.removeClass(b,'hidden_elem');CSS.addClass(a,'hidden_elem');b.onfocus=b.onclick=function(){b.parentNode.removeChild(b);CSS.removeClass(a,'hidden_elem');a.focus();};}}
function create_captcha(){var a={};if(Env.recaptcha_focus_on_load)a.callback=Recaptcha.focus_response_field;setTimeout(function(){Recaptcha.create("6LezHAAAAAAAADqVjseQ3ctG3ocfQs2Elo1FTa_a","captcha",a);},0);}function log_captcha_timeout(){new AsyncRequest().setURI('/ajax/captcha_timeout.php').setData({ua:navigator.userAgent,location:window.location.href}).setReadOnly(true).send();}var RecaptchaOptions;var RecaptchaDefaultOptions={tabindex:0,callback:null};var Recaptcha={widget:null,timer_id:-1,fail_timer_id:-1,type:'image',ajax_verify_cb:null,$:function(a){if(typeof(a)=="string"){return document.getElementById(a);}else return a;},create:function(c,a,b){Recaptcha.destroy();if(a)Recaptcha.widget=Recaptcha.$(a);Recaptcha._init_options(b);Recaptcha._call_challenge(c);},destroy:function(){var a=Recaptcha.$('recaptcha_challenge_field');if(a)a.parentNode.removeChild(a);if(Recaptcha.timer_id!=-1)clearInterval(Recaptcha.timer_id);Recaptcha.timer_id=-1;var b=Recaptcha.$('recaptcha_image');if(b)b.innerHTML=parseHTML("");if(Recaptcha.widget){Recaptcha.widget.style.display="none";Recaptcha.widget=null;}},focus_response_field:function(){var a=Recaptcha.$;var b=a('captcha_response');try{b.focus();}catch(ignored){}},get_challenge:function(){if(typeof(RecaptchaState)=="undefined")return null;return RecaptchaState.challenge;},get_response:function(){var a=Recaptcha.$;var b=a('captcha_response');if(!b)return null;return b.value;},ajax_verify:function(a){Recaptcha.ajax_verify_cb=a;var b=Recaptcha._get_api_server()+"/ajaxverify"+"?c="+encodeURIComponent(Recaptcha.get_challenge())+"&response="+encodeURIComponent(Recaptcha.get_response());Recaptcha._add_script(b);},_ajax_verify_callback:function(a){Recaptcha.ajax_verify_cb(a);},_get_api_server:function(){var a=window.location.protocol;var b;if(typeof(_RecaptchaOverrideApiServer)!="undefined"){b=_RecaptchaOverrideApiServer;}else if(a=='https:'){b="api-secure.recaptcha.net";}else b="api.recaptcha.net";return a+"//"+b;},_call_challenge:function(a){Recaptcha.fail_timer_id=setTimeout(Recaptcha.fail_timer_id==-1?"log_captcha_timeout(); create_captcha();":"create_captcha();",15000);var b=Recaptcha._get_api_server()+"/challenge?k="+a+"&ajax=1&xcachestop="+Math.random();if($('extra_challenge_params')!=null)b+="&"+$('extra_challenge_params').value;Recaptcha._add_script(b);},_add_script:function(a){Bootloader.requestResource('js',a);},_init_options:function(b){var a=RecaptchaDefaultOptions;var d=b||{};for(var c in d)a[c]=d[c];RecaptchaOptions=a;},challenge_callback:function(){clearTimeout(Recaptcha.fail_timer_id);var a=Recaptcha.widget;Recaptcha._reset_timer();if(window.addEventListener)window.addEventListener('unload',function(d){Recaptcha.destroy();},false);if(Recaptcha._is_ie()&&window.attachEvent)window.attachEvent('onbeforeunload',function(){});if(navigator.userAgent.indexOf("KHTML")>0){var b=document.createElement('iframe');b.src=parseURL("about:blank");b.style.height="0px";b.style.width="0px";b.style.visibility="hidden";b.style.border="none";var c=document.createTextNode("This frame prevents back/forward cache problems in Safari.");b.appendChild(c);DOMScroll.getScrollRoot().appendChild(b);}Recaptcha._finish_widget();},_finish_widget:function(){var a=Recaptcha.$;var c=RecaptchaState;var b=RecaptchaOptions;var d=document.createElement("input");d.type="password";d.setAttribute("autocomplete","off");d.style.display="none";d.name="recaptcha_challenge_field";DOM.setID(d,"recaptcha_challenge_field");a('captcha_response').parentNode.insertBefore(d,a('captcha_response'));a('captcha_response').setAttribute("autocomplete","off");a('recaptcha_image').style.width='300px';a('recaptcha_image').style.height='57px';Recaptcha.should_focus=false;Recaptcha._set_challenge(c.challenge,'image');if(b.tabindex)a('captcha_response').tabIndex=b.tabindex;if(Recaptcha.widget)Recaptcha.widget.style.display='';if(b.callback)b.callback();a('recaptcha_loading').style.display="none";},switch_type:function(b){var a=Recaptcha;a.type=b;a.reload(a.type=='audio'?'a':'v');},reload:function(d){var b=Recaptcha;var a=b.$;var c=RecaptchaState;if(typeof(d)=="undefined")d='r';var e=c.server+"reload?c="+c.challenge+"&k="+c.site+"&reason="+d+"&type="+b.type+"&lang="+Env.recaptcha_lang;if(a('extra_challenge_params')!=null)e+="&"+a('extra_challenge_params').value;b.should_focus=d!='t';b._add_script(e);},finish_reload:function(a,b){RecaptchaState.is_incorrect=false;Recaptcha._set_challenge(a,b);},_set_challenge:function(e,f){var b=Recaptcha;var c=RecaptchaState;var a=b.$;c.challenge=e;b.type=f;a('recaptcha_challenge_field').value=c.challenge;a('recaptcha_challenge_field').defaultValue=c.challenge;a('recaptcha_image').innerHtml="";if(f=='audio'){a("recaptcha_image").innerHTML=parseHTML(Recaptcha.getAudioCaptchaHtml());}else if(f=='image'){var d=c.server+'image?c='+c.challenge;a('recaptcha_image').innerHTML=parseHTML("<img style='display:block;' height='57' width='300' src='"+d+"'/>");}Recaptcha._css_toggle("recaptcha_had_incorrect_sol","recaptcha_nothad_incorrect_sol",c.is_incorrect);Recaptcha._css_toggle("recaptcha_is_showing_audio","recaptcha_isnot_showing_audio",f=='audio');b._clear_input();if(b.should_focus)b.focus_response_field();b._reset_timer();},_reset_timer:function(){var a=RecaptchaState;clearInterval(Recaptcha.timer_id);Recaptcha.timer_id=setInterval("Recaptcha.reload('t');",(a.timeout-60*5)*1000);},_clear_input:function(){var a=Recaptcha.$('captcha_response');a.value="";},_displayerror:function(b){var a=Recaptcha.$;a('recaptcha_image').empty();a('recaptcha_image').appendChild(document.createTextNode(b));},reloaderror:function(a){Recaptcha._displayerror(a);},_is_ie:function(){return (navigator.userAgent.indexOf("MSIE")>0)&&!window.opera;},_css_toggle:function(b,a,e){var d=Recaptcha.widget;if(!d)d=document.body;var c=d.className;c=c.replace(new RegExp("(^|\\s+)"+b+"(\\s+|$)"),' ');c=c.replace(new RegExp("(^|\\s+)"+a+"(\\s+|$)"),' ');c+=" "+(e?b:a);CSS.setClass(d,c);},playAgain:function(){var a=Recaptcha.$;a("recaptcha_image").innerHTML=parseHTML(Recaptcha.getAudioCaptchaHtml());},getAudioCaptchaHtml:function(){var b=Recaptcha;var c=RecaptchaState;var a=Recaptcha.$;var f=c.server+"image?c="+c.challenge;if(f.indexOf("https://")==0)f="http://"+f.substring(8);var g=c.server+"/img/audiocaptcha.swf?v2";var e;if(b._is_ie()){e='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="audiocaptcha" width="0" height="0" codebase="https://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab"><param name="movie" value="'+g+'" /><param name="quality" value="high" /><param name="bgcolor" value="#869ca7" /><param name="allowScriptAccess" value="always" /></object><br/>';}else e='<embed src="'+g+'" quality="high" bgcolor="#869ca7" width="0" height="0" name="audiocaptcha" align="middle" play="true" loop="false" quality="high" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://get.adobe.com/flashplayer" url="'+g+'"></embed> ';var d=(Recaptcha.checkFlashVer()?'<br/><a class="recaptcha_audio_cant_hear_link" href="#" onclick="Recaptcha.playAgain(); return false;">'+_tx("Play Again")+'</a>':'')+'<br/><a class="recaptcha_audio_cant_hear_link" target="_blank" href="'+f+'">'+_tx("Can't hear this")+'</a>';return e+d;},gethttpwavurl:function(){var a=RecaptchaState;if(Recaptcha.type=='audio'){var b=a.server+"image?c="+a.challenge;if(b.indexOf("https://")==0)b="http://"+b.substring(8);return b;}return "";},checkFlashVer:function(){var f=(navigator.appVersion.indexOf("MSIE")!=-1)?true:false;var h=(navigator.appVersion.toLowerCase().indexOf("win")!=-1)?true:false;var g=(navigator.userAgent.indexOf("Opera")!=-1)?true:false;var d=-1;if(navigator.plugins!=null&&navigator.plugins.length>0){if(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]){var i=navigator.plugins["Shockwave Flash 2.0"]?" 2.0":"";var c=navigator.plugins["Shockwave Flash"+i].description;var b=c.split(" ");var j=b[2].split(".");d=j[0];}}else if(f&&h&&!g)try{var a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");var e=a.GetVariable("$version");d=e.split(" ")[1].split(",")[0];}catch(e){}return d>=9;},getlang:function(){return Env.recaptcha_lang;}};function captcha_whatsthis(a){var b='<a onclick="window.open(\'http://recaptcha.net/popuphelp/\',\'recaptcha_popup\',\'width=460,height=570,location=no,menubar=no,status=no,toolbar=no,scrollbars=yes,resizable=yes\',"gl")">'+'ReCaptcha</a>';new ContextualDialog().setContext(a).setTitle(_tx("Security Check")).setBody('<div class="captcha_popup" style="padding: 5px;">'+_tx("This is a standard security test that we use to prevent spammers from creating fake accounts and spamming users.")+'<br/><br/>'+_tx("Our captchas are provided by {provider_link}.",{provider_link:b})+'</div>').setButtons(Dialog.OK).show();}
function reg_bootload(c,a,e,f,d){var b=function(g){Bootloader.loadComponents(['reg-util','editor'],function(){new RegKeyPressListen(c);new CaptchaBoxKeyPressListen(c,a,e);regform_focused(d);});};if(ge(f)){$(f).onclick=b;$(f).onkeypress=b;}}
function useragent(){var a={ffid:(typeof(Env.ffid)=="undefined"?0:Env.ffid)};if(!new RegExp('(^|\.)\146\141\143\145\142\157\157\153\.('+Env.tlds.join('|')+')([^.]*)(:(\d+))?(\/|$)','i').test(document.location))a.qp=document.location;var b=$('login_form');if(b&&b.action){var c=b.action.split('?')[0].split('#')[0];if(Env.ffver&&Env.ffver!=crc16(c))a.qm=b.action;}if(a.qp||a.qm)Bootloader.loadComponents('async-signal',function(){new AsyncSignal('/ajax/ua_callback.php',a).send();});}

if (window.Bootloader) { Bootloader.done(["js\/930uc0a40rok0800.pkg.js"]); }