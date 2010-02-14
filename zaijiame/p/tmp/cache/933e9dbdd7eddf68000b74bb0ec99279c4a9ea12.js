
var Xmarks		= window['Xmarks'] || {};



(function() {



// Scope globals to locals
var Ajax		= window['Ajax'];
var Element		= window['Element'];
var Event		= window['Event'];



var X = Xmarks;

var C = X.Common = X.Common || {};
var K = X.Cookie = X.Cookie || {};
var L = X.Lightbox = X.Lightbox || {};
var M = X.Perfmon = X.Perfmon || {};
var S = X.Suggest = X.Suggest || {};
var T = X.Translate = X.Translate || {};



/*  Prototype extensions */

Element.addMethods({
	// Scroll 'target' element such that it is visible within
	// the Element instance.  Assumes that 'target' is a descendent
	// of the Element.
    scrollTo: function(self, target) {
        var s = $(self),
            t = $(target);

        var	th = t.clientHeight,
            tt = t.offsetTop - s.clientTop,
            tb = th + t.offsetTop,
            sh = s.clientHeight,
            st = s.scrollTop,
            sb = sh + st;
        if (!((st < tt) && (sb > tb))) {
        	s.scrollTop = (tt - sh) + th + Math.ceil(sh / 2);
        }

        var tw = t.clientWidth,
        	tl = t.offsetLeft - s.clientLeft,
        	tr = tw + t.offsetLeft,
        	sw = s.clientWidth,
        	sl = s.scrollLeft,
        	sr = sw + sl;
        if (!((sl < tl) && (sr > tr))) {
        	s.scrollLeft = (tl - sw) + tw + Math.ceil(sw / 2);
        }

        return s;
    }
});

/* Xmarks */

X.__debug__ = false;

X.MOD_STR					= 'Xmarks';
X.COOKIE_HAS_JS				= 'has_js';
X.CLS_GSFN_FEEDBACK			= 'gsfn-feedback';
X.ID_HOME_LINK				= 'home_link';
X.ID_HOME_LOGO				= 'home_logo';
X.ID_JS_LOG_IMAGE			= 'js_log_image';
X.ID_NAV_HOME_LINK			= 'nav_home_link';
X.ID_NAV_LOGIN_LINK			= 'nav_login_link';
X.ID_SEARCH_BUTTON			= 'search_button';
X.ID_SEARCH_INPUT			= 'search_input';
X.ID_SEARCH_UI_ACTION		= 'search_ui_action';
X.ID_TOP_SITE_BANNER_PROMO	= 'top_site_banner_promo';

/* Xmarks Config: Settings, Defaults */
X.config				= null;
X.getSatFeedbackWidget	= null;
X.gizmoURL				= 'http://gizmo.xmarks.com';
X.homePage				= false;
X.homeURL				= 'http://www.xmarks.com';
X.jsPerfLogging			= false;
X.language				= X.language || 'en';
X.languageText			= X.languageText || 'English';
X.username				= '';


X.init = function(args) {

	// Store initialization arguments in config object.
	X.config = args;
	// Set incoming args dynamically.
	for (var a in args) { X[a] = args[a]; }
	// Specify special cases for args overrides.
	X.__debug__ = args['debug'] || X.__debug__;
	if (args['trackerURL']) {
		X.jsLog.setHost(args['trackerURL']);
	}

	C.init();
	M.init();
	S.init();

	// Set up GetSet feedback widget
	if (args['getSatFeedbackWidget'] && window['GSFN']) {
	    var GSFN = window['GSFN'];
		X.getSatFeedbackWidget = new GSFN.feedback_widget({
			'display':		'overlay',
			'company':		'foxmarks',
			'placement':	'hidden',
			'color'	:		'#222',
			'style'	:		'question'
		});
	}

	X.init = function(){};
}

X.onload = function() {
	// TODO: Check to make sure we want to read & log this.
	if (X.__debug__) {
		var REQUEST_TIME = Number(X.Cookie.get(M.COOKIE_REQ_TIME, 0));
		var START_TIME = window['START_TIME'];
		var END_TIME = (new Date()).getTime();

		if (REQUEST_TIME) {
			var st = START_TIME - REQUEST_TIME;
			X.log('Elapsed Server Time: %s ms', st);
		}

		var ct = END_TIME - START_TIME;
		X.log('Elapsed Client Time: %s ms', ct);

		if (REQUEST_TIME) {
			var tt = END_TIME - REQUEST_TIME;
			X.log('Elapsed Total Time: %s ms', tt);
			var cp = Math.round((ct / tt) * 1000) / 10;
			var sp = 100 - cp;
			X.log('Server / Client %: %s / %s', sp, cp);

			// Don't log anything which took more than 3 minutes.
			// It's probably bogus, a cancelled page load which
			// returns much later.
			if (st < (3 * 60 * 1000)) {
				X.jsLog({
					'req_total_time': tt,
					'req_server_time': st,
					'req_client_time': ct,
					'req_referrer': document.location.pathname
				});
			}
		}

		X.Cookie.set(M.COOKIE_REQ_TIME, 0);
	}

	X.Cookie.set(X.COOKIE_HAS_JS, 'true');
	var imgs = document.getElementsByTagName('img'),
		i = 0,
		n = imgs.length;
	for (i = 0; i < n; i++) {
		var img = imgs[i];
		var pl = img.src.indexOf('postload=');
		if (pl > -1) {
			var src = img.src.substr(pl + 9);
			img.src = parseURL(src);
		}
	}

	if (X.getSatFeedbackWidget) {
		var flinks = $$('.' + X.CLS_GSFN_FEEDBACK);
		n = flinks.length;
		for (i = 0; i < n; i++) {
			(function(elem) {
				Event.observe(elem, 'click', function(event) {
					event.stop();
					X.getSatFeedbackWidget.show();
				});
			})(flinks[i]);
		}
	}
}
Event.observe(window, 'load', X.onload);

X.isArray = function(obj) {
	return !!(obj instanceof Array);
}

X.googleAnalytics = function(action, suppressPath) {
	// Record via Google Analytics
	action = action || '';
	var path = '';
	if (!suppressPath) {
		var loc = document.location;
		path = loc.href.substr(loc.href.indexOf(loc.host) + loc.host.length + 1);
	}
	if (path) {
		if (action.lastIndexOf('/') != (action.length - 1)) { action += '/'; }
	}
	var url = '/click/js' + action + path;
	var pageTracker = window['pageTracker'];
	if (pageTracker._trackPageview) { pageTracker._trackPageview(url); }
}

X.getAjax = function(target, url, handler, params) {
	return X._ajax(target, url, handler, params, 'get');
}

X.postAjax = function(target, url, handler, params) {
	return X._ajax(target, url, handler, params, 'post');
}

X.jsLog = function(params, doPost, handler) {
	params = params || {};
	var q = '';
	for (var p in params) {
		q += p + '=' + encodeURIComponent(params[p]) + '&';
	}

	var uri = X.jsLog.URI;
	if (q.length) {
		q = q.substr(0, q.length - 1);
		uri += '?' + q;
	}
	if (!$(X.ID_JS_LOG_IMAGE)) {
		var img = new Image();
		img.id = X.ID_JS_LOG_IMAGE;
		img.width = 1;
		img.height = 1;
		img.style.display = 'none';
		img.alt = '';
		img.border = 0;
		document.body.appendChild(img);
	}
	$(X.ID_JS_LOG_IMAGE).src = parseURL(uri);
	X.log('Xmarks.jslog: %o', params);
}
X.jsLog.PATH = '/tracking/impressions.gif';
X.jsLog.URI = 'http://tr.xmarks.com' + X.jsLog.PATH;
X.jsLog.setHost = function(host) {
	X.jsLog.URI = host + X.jsLog.PATH;
	X.log('Xmarks.jsLog.URI: ' + X.jsLog.URI);
}

X._ajax = function(target, url, handler, params, method) {
	handler = handler || function(){};
	params = params || '';
	var args = {
		method: method,
		onComplete: function(response) {
			if (!X.ajaxResponseRedirect(response)) {
				handler(response);
			}
		},
		onException: function(request, error) {
			if (X.__debug__) { X.log('Ajax error: %o', error); }
		},
		parameters: params
	};
	if (target) {
		new Ajax.Updater(target, url, args);
	} else {
		new Ajax.Request(url, args);
	}
	return false;
}

X.ajaxResponseRedirect = function(response) {
	var loc = response.getHeader('Location');
    if (loc) {
    	M.logUnload();
		document.location.href = parseURL(loc);
		return true;
	}
	return false;
}

X.onGizmoTopSiteError = function(img) {
	img.onerror = function() {
		X.onGizmoTopSiteErrorError(img);
	};
	img.src = parseURL(X.gizmoURL + '/top_site/error');
}

X.onGizmoTopSiteErrorError = function(img) {
	img.onerror = null;
	$(X.ID_TOP_SITE_BANNER_PROMO).style.display = 'none';
}



/* Common */

C.ID_SITE_INFO_FORM				= 'get_site_info_form';
C.SEARCH_INPUT_DEFAULT_TEXT		= 'Enter a topic or web site';

C.init = function() {

	// Enable search field event handlers.
	var si = $(X.ID_SEARCH_INPUT);
	if (si) {
		Event.observe(si, 'focus', function() {
			si.addClassName = 'active';
			si.select();
		});
		Event.observe(si, 'blur', function() {
			si.removeClassName = 'active';
		});
		C.seedDefaultSearchInputText();
		C.initSearchFormHandlers();
	}

	// Enable search button event handlers.
	var sb = $(X.ID_SEARCH_BUTTON);
	if (sb) {
		// Tell angstrom that the search button was pressed.
		Event.observe(sb, 'mouseup', function() {
			$(X.ID_SEARCH_UI_ACTION).value = 'button_press';
		});
	}

	// Remove hyperlink which points to drift home page
	// when already viewing the home page.
	var hl = $(X.ID_HOME_LINK);
	if (hl) {
		var loc = document.location;
		var p = loc.pathname;
		if ((p === '/') || (p === '/login')) {
			var h = loc.hostname;
			if (h.indexOf('www.') > -1 ||
				h.indexOf('drift') > -1) {

				// Header Xmarks Logo
				var logoCell = hl.up();
				var homeLogo = $(X.ID_HOME_LOGO).remove();
				hl.remove();
				logoCell.insert(homeLogo);

				// Header Nav "Home" Link
				$(X.ID_NAV_HOME_LINK).innerHTML = parseHTML('Home');
			} else if (h.indexOf('login') > -1) {
				var loginLink = $(X.ID_NAV_LOGIN_LINK);
				if (loginLink) {
					loginLink.innerHTML = parseHTML('Log In');
				}
			}
		}
	}
	C.init = function(){};
}

C.seedDefaultSearchInputText = function() {
	var inp = $(X.ID_SEARCH_INPUT);
	if (inp.value === '') {
		inp.value = C.SEARCH_INPUT_DEFAULT_TEXT;
	}
}

C.initSearchFormHandlers = function() {
	var frm = $(C.ID_SITE_INFO_FORM);
	var inp = $(X.ID_SEARCH_INPUT);
	if (frm && inp) {
		Event.observe(inp, 'focus', function(event) {
			if (inp.value === C.SEARCH_INPUT_DEFAULT_TEXT) {
				inp.value = '';
			}
		});
		Event.observe(inp, 'blur', function(event) {
			if (inp.value === '') {
				inp.value = C.SEARCH_INPUT_DEFAULT_TEXT;
			}
		});
		Event.observe(frm, 'submit', function(event) {
			if ((inp.value.search(/\S/) === -1) ||
			   (inp.value === C.SEARCH_INPUT_DEFAULT_TEXT)) {
				Event.stop(event);
			} else {
				M.logUnload();
			}
		});
	}
}

var _stop = function(event) {
	event.stop();
};



/* Lightbox */

L.ID_LIGHTBOX_DIALOG	= 'xmarks_lightbox_dialog';

L.lightboxShadow		= null;

L.display = function(args) {
	var title = args.title || '';
	var html = args.html || '';
	var ondisplay = args.ondisplay || new Function();
	var onclose = args.onclose || new Function();
	var cancel = args.cancel ? (X.isArray(args.cancel) ? args.cancel : [args.cancel]) : [];
	var div = L.showLightbox();

	div.innerHTML = parseHTML(html);

	var tdiv = $('lightbox_title');
	tdiv.title = title;
	tdiv.innerHTML = parseHTML(title);

	var cancelFunc = function(event) {
		var returnCode = onclose(event);
		if (returnCode !== false) {
			L.hideLightbox();
		}
	};

	cancel.push('lightbox_close_control');
	for (var c = 0, n = cancel.length; c < n; c++) {
		var cbut = $(cancel[c]);
		Event.observe(cbut, 'click', cancelFunc);
	}

	ondisplay();
}

L.showLightbox = function() {
	$(L.lightboxShadow || _makeLightboxShadow()).show();
	Event.observe(document.body, 'DOMMouseScroll', _stop);
	Event.observe(document.body, 'mousewheel', _stop);

	var div = document.createElement('div');
	div.id = L.ID_LIGHTBOX_DIALOG;
	div.className = 'xmarks-lightbox-frame';
	div.align = 'center';

	var lb = document.createElement('div');
	lb.className = 'xmarks-lightbox-dialog';
    div.appendChild(lb);
    document.body.appendChild(div);

	if (X.__debug__) { Event.observe($(L.lightboxShadow), 'click', L.hideLightbox); }

	return lb;
}

L.hideLightbox = function() {
	$(L.lightboxShadow).hide();
	Event.stopObserving(document.body, 'DOMMouseScroll', _stop);
	Event.stopObserving(document.body, 'mousewheel', _stop);

	var div = $(L.ID_LIGHTBOX_DIALOG).remove();
}

var _makeLightboxShadow = function() {
	var div = L.lightboxShadow = new Element(
		'div', { 'class': 'xmarks-lightbox' }
	).update(
		'<img src="/common/images/blank.gif" width="100%" height="100%" />'
	).setStyle({
		'display': 'none'
	}).setOpacity('.20');
	document.body.appendChild(div);
	return div;
};



/* Suggest */

S.MOD_STR					= X.MOD_STR + '.Suggest';

S.CLS_SELECTED_RESULT       = 'selected-result';
S.ID_SEARCH_SUGGESTIONS 	= 'search_suggestions';
S.MIN_SUGGEST_INTERVAL		= 210; //ms.

S.SUGGEST_LINE_HEIGHT 		= 16; //px.  Changes with #search_suggestions CSS.
S.SUGGEST_BOX_HEIGHT 		= 230; //px.  Changes with #search_suggestions CSS.

S.isActive					= false;
S.literalSearchQuery        = '';
S.selectedResult            = null;
S.suppressNextClick			= false;
S.suppressNextKeyUp			= false;

S.init = function() {
	if (X.config['killSuggest'] === true) { return; }
	var si = $(X.ID_SEARCH_INPUT),
		doKeyUp = function(event) {
			if (S.suppressNextKeyUp) {
				S.suppressNextKeyUp = false;
			} else {
				S.getSearchSuggestions();
			}
		},
		doClick = function(event) {
			event.stop();
			if (S.suppressNextClick) {
				S.suppressNextClick = false;
			} else {
				S.isActive ? S.hide(event) : S.getSearchSuggestions();
			}
		},
		doDocumentClick = function(event) {
			S.hide(event, true);
		},
		doFocus = function(event) {
			S.suppressNextClick = true;
			S.getSearchSuggestions();
			event.stop();
		},
		doBlur = function(event) {
			S.hide(event);
		};

	Event.observe(document, 'click', doDocumentClick);
	Event.observe(document, 'keydown', S.keydown);
	Event.observe(si, 'click', doClick);
	Event.observe(si, 'focus', doFocus);
	Event.observe(si, 'keyup', doKeyUp);
	Event.observe(window, 'blur', doBlur);
	Event.observe(window, 'resize', S.reposition);

	S.init = function(){};
}

S.suggest = function(query, callback, params) {
	// Don't prepend X.homeURL here.  The local server must handle the request.
	// The /suggest code is common and will be inherited and routed properly
	// by controllers who care about it.
	var url = '/suggest/' + encodeURIComponent(query);
	X.getAjax(null, url, callback, params);
}

S.getSearchSuggestions = function() {
	S.isActive = true;
	var _s = S.getSearchSuggestions;
	var si = $(X.ID_SEARCH_INPUT);
	var query = si.value.toLowerCase();
	if (query.indexOf('www.') === 0) {
		query = query.substr(4);
	}
	if (query.length < 1) {
		S.hide(true);
		return;
	}
	var now = (new Date()).getTime();
	var lastReq = _s.lastReq || 0;
	var diff = now - lastReq;
	if (diff < S.MIN_SUGGEST_INTERVAL) {
		return window.setTimeout(S.getSearchSuggestions, S.MIN_SUGGEST_INTERVAL - diff);
	}

	S.suggest(query, S.gotSearchSuggestions, {
		'timestamp': now,
		'query': query
	});
	_s.lastReq = now;
}

S.gotSearchSuggestions = function(response) {
	var _s = S.gotSearchSuggestions;
	// Compare response timestamp to last one, to make sure
	// earlier requests don't display after later ones in
	// variable latency network situations.
	var reqTime = response.request.parameters.timestamp;
	var lastTime = _s.lastTime || 0;
	if (lastTime > reqTime) { return; }
	else { _s.lastTime = reqTime; }

	var data = eval(parseJS(response.responseText));

	var si = $(X.ID_SEARCH_INPUT);
	var ss = $(S.ID_SEARCH_SUGGESTIONS);

	var count = 0;
	if (data && (data.sites.length || data.topics.length)) {
		var html = '';

		html += '<div class="topics"><div class="heading">Topics</div>';
		if (data.topics.length) {
			data.topics.each(function(t) {
				html += '<div class="topic" ';
				html += 'onmouseover="' + S.MOD_STR + '.mouseNavHover(' + count + ')" ';
				html += 'onclick="' + S.MOD_STR + '.navTopic(event, \'' + t[0] + '\' , \'' + t[1] + '\')">' + t[1] + '</div>';
				count++;
			});
		} else {
			html += '<div class="none">None</div>';
		}
		html += '</div>';

		html += '<div class="sites"><div class="heading">Sites</div>';
		if (data.sites.length) {
			data.sites.each(function(s) {
				html += '<div class="site" ';
				html += 'onmouseover="' + S.MOD_STR + '.mouseNavHover(' + count + ')" ';
				html += 'onclick="' + S.MOD_STR + '.navSite(event, \'' + s + '\')">' + s + '</div>';
				count++;
			});
		} else {
			html += '<div class="none">None</div>';
		}
		html += '</div>';

		var numTopics = data.topics.length || 1;
		var numSites = data.sites.length || 1;
		var borderPaddingHeights = 10;	// "magic number" computed from CSS values
		var h = Math.min(
			S.SUGGEST_BOX_HEIGHT,
			S.SUGGEST_LINE_HEIGHT * (numSites + numTopics)
		) + borderPaddingHeights;
		ss.style.height = h + 'px';
		ss.innerHTML = parseHTML(html);

		S.selectedResult = null;
		S.show();
	} else {
		S.hide(true);
	}
}

S.navTopic = function(event, topic, displayTopic) {
	event = Event.extend(event || window.event);
	S.hide(event, true);
	event.stop();
	$(X.ID_SEARCH_UI_ACTION).value = 'option_select';
	var si = $(X.ID_SEARCH_INPUT);
	si.value = displayTopic;
	M.logUnload();
	document.location.href = parseURL(X.homeURL + '/suggest/topic/' + topic);
}

S.navSite = function(event, site) {
	event = Event.extend(event || window.event);
	S.hide(event, true);
	event.stop();
	$(X.ID_SEARCH_UI_ACTION).value = 'option_select';
	var si = $(X.ID_SEARCH_INPUT);
	si.value = site;
	M.logUnload();
	document.location.href = parseURL(X.homeURL + '/suggest/site/' + site);
}

S.mouseNavHover = function(index) {
	S.keyNavUpdate(index, true, true);
}

S.keyNavUpDown = function(event) {
    var all = _getResultsElements(),
        sel = S.selectedResult,
        newSel = sel,
        si = $(X.ID_SEARCH_INPUT),
        ss = $(S.ID_SEARCH_SUGGESTIONS),
        up = (event.keyCode === Event.KEY_UP);
    if (sel !== null) {
        up ? newSel-- : newSel++;
        newSel = (newSel + all.length) % all.length;
    } else {
        newSel = up ? all.length - 1 : 0;
    }
    S.keyNavUpdate(newSel, false, false);
}

S.keyNavTab = function(event) {
    if (!S.isActive) { return; }

    event.stop();
    var sel = S.selectedResult;

    // if no selection, jump to first topic
    if (sel === null) {
    	return S.keyNavUpdate(0, false, false);
    }

    var tlen = _getTopicResults().length;

    // else if selection is in topics, jump to first site
    if (tlen && sel < tlen) {
        // jump to first site
        var slen = _getSiteResults().length,
            newSel = 0;
        if (!slen) { return; }
        newSel = tlen;
        return S.keyNavUpdate(newSel, false, false);

    // else focus and select search input
    } else {
        var all = _getResultsElements(),
            si = $(X.ID_SEARCH_INPUT);
        all[sel].removeClassName(S.CLS_SELECTED_RESULT);
        S.selectedResult = null;
        si.focus();
        si.select();
    }
}

S.keyNavUpdate = function(selectedIndex, suppressScroll, suppressInputUpdate) {
    selectedIndex = selectedIndex || 0;
    var all = _getResultsElements(),
        sel = S.selectedResult,
        si = $(X.ID_SEARCH_INPUT),
        ss = $(S.ID_SEARCH_SUGGESTIONS);
    if (sel !== null) {
        all[sel].removeClassName(S.CLS_SELECTED_RESULT);
    } else {
        if (!S.literalSearchQuery) { S.literalSearchQuery = si.value; }
    }
    sel = S.selectedResult = selectedIndex;
    var ns = all[sel];
    ns.addClassName(S.CLS_SELECTED_RESULT);
    if (!suppressScroll) { ss.scrollTo(ns); }
    if (!suppressInputUpdate) { si.value = ns.innerHTML; }
}

S.keyNavReturn = function(event) {
    var sel = S.selectedResult;
    S.suppressNextKeyUp = true;
    if (sel === null) {
    	return;
    } else {
		event.stop();
		S.hide(event, true);
		var all = _getResultsElements();
		all[sel].onclick(event);
    }
}

S.show = function() {
    var ss = $(S.ID_SEARCH_SUGGESTIONS);
	S.reposition();
	ss.show();
	ss.absolutize();
}

S.hide = function(event, suppressClear) {
    if (!suppressClear) { S.clearSelected(); }
    else {
    	S.selectedResult = null;
    	S.literalSearchQuery = '';
    }
	$(S.ID_SEARCH_SUGGESTIONS).hide();
	S.isActive = false;
}

// Gets called when mouse activity is detected over the suggest panel.
// Clears out any keyboard state which might previously have accrued.
S.clearSelected = function() {
    if (S.literalSearchQuery) { $(X.ID_SEARCH_INPUT).value = S.literalSearchQuery; }
    S.literalSearchQuery = '';
    S.selectedResult = null;
    var all = _getResultsElements();
    for (var i = 0, n = all.length; i < n; i++) {
        var item = all[i];
        item.removeClassName(S.CLS_SELECTED_RESULT);
    }
}

S.reposition = function() {
	var si = $(X.ID_SEARCH_INPUT);
	var ss = $(S.ID_SEARCH_SUGGESTIONS);
	var borderWidths = 4;	// "magic number" computed from CSS values
	ss.style.width = (si.getWidth() - borderWidths) + 'px';
}

S.keydown = function(event) {
	if (!event) { return; }
	if (S.isActive) {
		var kc = event.keyCode;
		S.suppressNextKeyUp = true;
		switch (kc) {
		    case Event.KEY_DOWN:
		        S.keyNavUpDown(event);
		        break;
		    case Event.KEY_UP:
		        S.keyNavUpDown(event);
		        break;
		    case Event.KEY_TAB:
		        S.keyNavTab(event);
		        break;
		    case Event.KEY_ESC:
		        $(X.ID_SEARCH_INPUT).focus();
		        S.hide(event, true);
		        break;
		    case Event.KEY_RETURN:
		        S.keyNavReturn(event);
		        break;
		    default:
		        S.suppressNextKeyUp = false;
	            break;
        }
	}
}

var _getResultsElements = function() {
    return _getTopicResults().concat(_getSiteResults());
};

var _getTopicResults = function() {
    return $$('#' + S.ID_SEARCH_SUGGESTIONS + ' .topics .topic');
};

var _getSiteResults = function() {
    return $$('#' + S.ID_SEARCH_SUGGESTIONS + ' .sites .site');
};



/* Translation */

T.CLASS_UGC					= 'ugc';
T.CLASS_UGC_LANG			= T.CLASS_UGC + '-lang-';
T.CLASS_UGC_TRANS			= T.CLASS_UGC + '-trans';
T.ID_TRANSLATION_CONTROL	= 'translation_control';
T.ID_TRANSLATION_LABEL		= 'translation_label';

T.googleLoaded				= false;
T.textTranslatedMsg			= 'Text Translated to English';
T.textFromLanguage			= 'From:';

T.init = function() {

	if (!$(T.ID_TRANSLATION_LABEL)) { return; }
	if (!T.googleLoaded) {
		T.loadGoogleLanguageModule(function() {
			T.init.apply(this);
		});
		return;
	}

	// Set language and text of button
	X.log('Xmarks.language = %s', X.language);
	if (X.language !== 'en') {
		var lang = null;
		for (var l in google.language.Languages) {
			if (google.language.Languages[l] === X.language) {
				lang = l;
				break;
			}
		}

		if (lang) {
			X.languageText = lang = lang.charAt(0) + lang.substr(1).toLowerCase();
			var text = 'Translate Text to ' + lang;
			google.language.translate(text, 'en', X.language, function(result) {
				if (result && result.translation) {
					$(T.ID_TRANSLATION_LABEL).innerHTML = parseHTML(result.translation);
					$(T.ID_TRANSLATION_CONTROL).show();
				}
			});
			var transText = 'Text Translated to ' + lang;
			google.language.translate(transText, 'en', X.language, function(result) {
				if (result && result.translation) {
					T.textTranslatedMsg = result.translation;
				}
			});
			var fromText = 'From';
			google.language.translate(fromText, 'en', X.language, function(result) {
				if (result && result.translation) {
					T.textFromLanguage = result.translation;
				}
			});
		}
	}

	var tc = $(T.ID_TRANSLATION_CONTROL);
	if (tc) {
		tc.observe('click', function(e) {
			e.stop();
			T.translate();
		});
		tc.show();
	}

	T.init = function(){};
}
Event.observe(window, 'load', T.init);

T.loadGoogleLanguageModule = function(callback) {
	// Specifying a callback tells Google not to use document.write(,"gl")
	callback = callback || function() {};
	var c = function() {
		T.googleLoaded = true;
		callback.apply(this);
	};
	google.load('language', '1', { 'callback': c });
}

T.translate = function(elements) {

	// Record translation with Google Analytics
	X.googleAnalytics('/translate/');

	var ugc = elements || T.getUGCs();
	for (var i = 0, n = ugc.length; i< n; i++) {
		var f = ugc[i];
		var c = f.className;
		var lang = ((c.indexOf(T.CLASS_UGC_LANG) > -1) && c.substr(c.length - 2)) || '';
		if (lang === X.language) { continue; }

		// Closure within closure preserves values across
		// all manner of asynchronous shenanigans.
		var startTranslation = (function(elem, lang) {
			var text = elem.innerHTML;
			var translateCallback = (function(result) {
				if (result.error) { return; }

				// Don't mark unchanged items as translated.
				var trans = result.translation;
				if (!trans) { return; }

				var sl = result.detectedSourceLanguage || lang;
				if (sl && sl.substr(0,2) === X.language) { return; }

				// Google returns single-quote as &#39; -- compare apples-to-apples
				text = text.replace(/\'/g, '&#39;');
				if (text == trans) { return; }

				this.className = this.className.replace(/ugc\S*\b/, T.CLASS_UGC_TRANS);
				this.innerHTML = parseHTML(trans + ' <span class="ugc-trans-lang" dir="ltr"> <nobr>(' + T.textFromLanguage + ' <b>' + sl + '</b>)</nobr></span>');

			}).bind(elem);

		    google.language.translate(text, lang, X.language, translateCallback);
	    }).bind(f);

	    startTranslation(f, lang);
	}

	return false;
}

T.getUGCs = function(element) {
	element = element || document.body;
	var ugc = [];
	var spans = $(element).select('span[class^=' + T.CLASS_UGC + ']');
	spans.each(function(s) {
		if (s.className.indexOf(T.CLASS_UGC_TRANS) === -1) { ugc.push(s); }
	});
	return ugc;
}

T.isUGC = function(elem) {
	var c = elem.className;
	return (c && (c.indexOf(T.CLASS_UGC) > -1) && (c.indexOf(T.CLASS_UGC_TRANS) === -1));
}



/* Cookie */

K.build = function() {
	return $A(arguments).compact().join('; ');
}

K.secondsFromNow = function(seconds) {
	var d = new Date();
	d.setTime(d.getTime() + (seconds * 1000));
	return d.toGMTString();
}

K.set = function(name, value, seconds) {
	var expiry = seconds ? 'expires=' + K.secondsFromNow(seconds) : null;
	document.cookie = K.build(name + '=' + value, expiry, 'path=/');
}

K.get = function(name, defaultValue) {
	var m = new RegExp(name + '=([^;]+)').exec(document.cookie);
	return (m && m[1]) || (defaultValue || null);
}

K.unset = function(name) {
	K.set(name, '', -1);
}



/* Performance Monitoring */

M.COOKIE_REQ_TIME = 'req_time';

M.init = function() {
	if (X.jsPerfLogging) {
		Event.observe(window, 'click', M.onunload);
	}
	M.init = function(){};
}

M.logUnload = function() {
	X.Cookie.set(M.COOKIE_REQ_TIME, (new Date()).getTime());
}

M.onunload = function(event) {
	var t = event.target;
	if (t.tagName.toLowerCase() === 'a') {
		var r = t.rel;
		if (!r || (r != 'nofollow')) {
			M.logUnload();
		}
	}
}



/* Debug Stuff */

X.log = function() {
	if (window['console'] && X.__debug__) {
		// TODO: Chrome doesn't let us call apply on console.log.
		// Interpolate variable arguments manually and construct
		// a single-argument call to console.log for Chrome.
		try {
			console.log.apply(this, arguments);
		} catch(e) {
			X.log = function() {}
		}
	}
};


})();
