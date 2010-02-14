

Xmarks = window['Xmarks'] || {};



(function() {


var X = Xmarks;
var L = X.Lightbox;


// Local Modules
X.py = X.py || {};

var D	= X.Drift				= X.Drift || {};

var B	= D.Buzz				= D.Buzz || {};
var F	= D.Featured			= D.Featured || {};
var RR	= D.RRIT			    = D.RRIT || {};
var H	= D.HotTopics			= D.HotTopics || {};
var K	= D.BookmarksCounter	= D.BookmarksCounter || {};
var R	= D.Review				= D.Review || {};
var S	= D.ShareThis			= D.ShareThis || {};
var ST	= S.shareTwitter		= S.shareTwitter || function(){};
var U   = D.Profile             = D.Profile || {};
var FW  = D.FollowThis          = D.FollowThis || {}

// Xmarks Constants
D.STATE_FLAG_SIMILAR		= 's';
D.STATE_FLAG_REVIEWS		= 'r';
D.STATE_FLAG_BUZZ			= 'b';
D.ID_SIMILAR				= 'similar';
D.ID_SIMILAR_TAB			= 'similar_tab';
D.ID_REVIEWS				= 'reviews';
D.ID_REVIEWS_TAB			= 'reviews_tab';
D.ID_BUZZ					= 'buzz';
D.ID_BUZZ_TAB				= 'buzz_tab';
D.ID_EDIT_SITE_REVIEW		= 'edit_site_review';
D.URL_ROOT_EDIT_AJAX		= '/review/edit/';

// Set in _common_head.html
//X.AJAX_FORMS_ENABLED
//X.USERNAME
//X.USER_IS_LOCKED


// Properties
if ((!window.Event || !window.Event.observe) && X.__debug__) {
	alert('prototype.js could not load.\n\nIs your VPN up?');
}



/* Drift */

D.init = function() {
	var rs = $(R.ID_SITE_RATING_SELECTOR);
	if (rs) { X.currentRating = $(R.ID_SITE_RATING_SELECTOR).src; }
	D.enableContributionDetails();
}
Event.observe(window, 'load', D.init);

D.checkTabLoadingState = function() {
	if (document.location.href.indexOf('#' + D.STATE_FLAG_REVIEWS) > -1) {
		D.reviewTab();
	} else if (document.location.href.indexOf('#' + D.STATE_FLAG_BUZZ) > -1) {
		D.buzzTab();
	}
}

D.similarTab = function() {

	if ($(D.ID_REVIEWS)) {
    	$(D.ID_REVIEWS).hide();
    	Element.removeClassName(D.ID_REVIEWS_TAB, 'active');
    }
	if ($(D.ID_BUZZ)) {
    	$(D.ID_BUZZ).hide();
    	Element.removeClassName(D.ID_BUZZ_TAB, 'active');
    }

    $(D.ID_SIMILAR).show();
    Element.addClassName(D.ID_SIMILAR_TAB, 'active');

	var loc = document.location;
	loc.href = parseURL(loc.protocol + '//' + loc.host +
				((loc.port && loc.host.indexOf(':') == 1) ? ':' + loc.port : '') +
				loc.pathname + '#' + D.STATE_FLAG_SIMILAR);

	X.googleAnalytics('/tab/similar');
    return false;
}

D.reviewTab = function() {

	if ($(D.ID_SIMILAR)) {
    	$(D.ID_SIMILAR).hide();
    	Element.removeClassName(D.ID_SIMILAR_TAB, 'active');
    }
	if ($(D.ID_BUZZ)) {
    	$(D.ID_BUZZ).hide();
    	Element.removeClassName(D.ID_BUZZ_TAB, 'active');
    }

    $(D.ID_REVIEWS).show();
    Element.addClassName(D.ID_REVIEWS_TAB, 'active');

	var loc = document.location;
	loc.href = parseURL(loc.protocol + '//' + loc.host +
				((loc.port && loc.host.indexOf(':') == 1) ? ':' + loc.port : '') +
				loc.pathname + '#' + D.STATE_FLAG_REVIEWS);

	X.googleAnalytics('/tab/review');
    return false;
}

D.buzzTab = function() {

	B.loadBuzz();

	if ($(D.ID_SIMILAR)) {
    	$(D.ID_SIMILAR).hide();
    	Element.removeClassName(D.ID_SIMILAR_TAB, 'active');
    }
	if ($(D.ID_REVIEWS)) {
    	$(D.ID_REVIEWS).hide();
    	Element.removeClassName(D.ID_REVIEWS_TAB, 'active');
    }

    $(D.ID_BUZZ).show();
    Element.addClassName(D.ID_BUZZ_TAB, 'active');

	var loc = document.location;
	loc.href = parseURL(loc.protocol + '//' + loc.host +
				((loc.port && loc.host.indexOf(':') == 1) ? ':' + loc.port : '') +
				loc.pathname + '#' + D.STATE_FLAG_BUZZ);

	X.googleAnalytics('/tab/buzz');
    return false;
}

D.showFullDescription = function() {
	$('short_desc').hide();
	$('full_desc').show();
	return false;
}

D.enableContributionDetails = function() {
	var contrs = $$('.contribution .show-change a');
	for (var i = 0, n = contrs.length; i < n; i++) {
		(function() {
			var c = contrs[i];
			Event.observe(c, 'click', function(event) {
				D.showContributionDetails(event, c);
			});
		})();
	}
}

D.showContributionDetails = function(event, target) {
	// Take "#" off target id.
	var showDivId = target.href.substr(target.href.lastIndexOf('#')).substr(1);

	// Show the hidden details div.
	$('c' + showDivId).toggle();
	target.parentNode.style.display = 'none';

	// Remove the anchor from the page, hence preserving the new
	// location in the location bar for users to copy/paste,
	// but without making the page jump around in disconcerting fashion.
	$(showDivId).remove();
}



/* Review */

R.ID_COMMENT_BUTTONS	= 'comment_buttons';
R.ID_COMMENT_LABEL		= 'comment_label';
R.ID_COMMENT_TEXT		= 'comment_text';
R.ID_COMMENT_TEXT_EDIT	= 'comment_text_edit';
R.ID_COMMENT_EDIT_BUF   = 'comment_edit_buffer';
R.ID_INLINE_EDIT_DELETE	= 'inline_edit_delete';
R.ID_INLINE_RATING_TEXT	= 'inline_rating_text';
R.ID_INLINE_REVIEW		= 'inline_review';
R.ID_RATING_SELECTOR	= 'rating_selector';
R.ID_REVIEW_BLOCK		= 'review_block';
R.ID_REVIEW_BUTTON		= 'review_button';
R.ID_REVIEW_CANCEL		= 'review_cancel';
R.ID_REVIEW_SAVE		= 'review_save';
R.ID_SITE_RATING		= 'site_rating';
R.ID_STARS_BAR			= 'stars_bar';
R.ID_STARS_MAP			= 'stars_map';

R.CLASS_DELETE_REVIEW_LINK	= 'delete-review-link';
R.CLASS_EDIT_REVIEW_LINK	= 'edit-review-link';

R.ID_FEEDBACK_CTRLS     = 'feedback_controls';
R.ID_FEEDBACK_THNKS     = 'feedback_thanks';

R.init = function() {
	if (X.AJAX_FORMS_ENABLED) {
		R.enableReviewForm();
	}
};
Event.observe(window, 'load', R.init);

R.submitAJAXFeedback = function(user, rid, vote) {
	var params = {user:user, reviewid:rid, vote:vote };
	new Ajax.Request('/review/vote', {
		method: 'get',
		parameters: params,
		onSuccess: function(transport, json){
			//alert(json);
			// hide buttons
			var ctrl_div = $(R.ID_FEEDBACK_CTRLS + "_" + rid);
			var tnks_div = $(R.ID_FEEDBACK_THNKS + "_" + rid);
			ctrl_div.hide();
			tnks_div.show();
		}
	});

	return true;
}

R.enableReviewForm = function() {
	var sma = $$('#' + R.ID_STARS_MAP + ' area');
	if (!sma || !sma.length) { return; }
	for (var i = 0, n = sma.length; i < n; i++) {
		// Faking "block scope" to preserve rating in closures
		(function() {
			var rating = i + 1;
			Event.observe(sma[i], 'mouseover', function() {
				R.proposeRating(rating);
			});
			Event.observe(sma[i], 'click', function() {
				R.setRating(rating);
				R.showInlineCommentForm();
			});
		})();
	}

	Event.observe(R.ID_STARS_BAR, 'mouseout', R.restoreRating);
	X.originalRating = X.currentRating = $(R.ID_RATING_SELECTOR).src;
	X.originalRatingText = X.py.defaultRatingText;

	var cb = $(R.ID_REVIEW_CANCEL);
	if (cb) { Event.observe(cb, 'click', function() {
			R.cancelRating();
			R.hideInlineCommentForm();
	})}

	var sb = $(R.ID_REVIEW_SAVE);
	if (sb) { Event.observe(sb, 'click', R.validatePost); }

	var rbs = $$('.' + R.CLASS_EDIT_REVIEW_LINK);
	var rb = $(R.ID_REVIEW_BUTTON);
	if (rb) { rbs.push(rb); }
	for (var i = 0, n = rbs.length; i < n; i++) {
		var b = rbs[i];
		(function() {
			Event.observe(b, 'click', function(event) {
				if (X.py.siteLink) {
					var editLink = D.URL_ROOT_EDIT_AJAX + X.py.siteLink;
				} else if (X.py.reviewId) {
					var editLink = D.URL_ROOT_EDIT_AJAX + '?r=' + X.py.reviewId;
				} else {
					return;
				}
				R.showInlineCommentForm();
				event.stop();
			});
		})();
	}

	var drs = $$('.' + R.CLASS_DELETE_REVIEW_LINK);
	for (var i = 0, n = drs.length; i < n; i++) {
		var d = drs[i];
		(function() {
			Event.observe(d, 'click', function(event) {
				if (!R.confirmDelete(event)) {
					event.stop();
				}
			});
		})();
	}
    var cte = $(R.ID_COMMENT_TEXT_EDIT);
    if (cte) {
        Event.observe(cte, 'change', function(event) {
            var cbuf = $(R.ID_COMMENT_EDIT_BUF);
	        var cte = event.element();
	        cbuf.innerHTML = parseHTML(cte.value);
	    });
	}
}

R.proposeRating = function(rating) {
	$(R.ID_RATING_SELECTOR).src = parseURL('/images/stars/hot/' + rating + '.gif');
	var rt = $(R.ID_INLINE_RATING_TEXT);
	X.py.defaultRatingText = rt.innerHTML;
	switch(rating) {
		case 1:
			rt.innerHTML = parseHTML('I hate it');
			break;
		case 2:
			rt.innerHTML = parseHTML('I don\'t like it');
			break;
		case 3:
			rt.innerHTML = parseHTML('I like it');
			break;
		case 4:
			rt.innerHTML = parseHTML('I really like it');
			break;
		case 5:
			rt.innerHTML = parseHTML('I love it');
			break;
		default:
			rt.innerHTML = parseHTML('Review this site: ' + rating + ' stars');
			break;
	}
}

R.restoreRating = function() {
	$(R.ID_RATING_SELECTOR).src = parseURL(X.currentRating);
	$(R.ID_INLINE_RATING_TEXT).innerHTML = parseHTML(X.py.defaultRatingText);
}

R.cancelRating = function() {
	$(R.ID_RATING_SELECTOR).src = parseURL(X.originalRating);
	$(R.ID_INLINE_RATING_TEXT).innerHTML = parseHTML(X.originalRatingText);
}

R.setRating = function(rating) {
	$(R.ID_SITE_RATING).value = rating;
	$(R.ID_RATING_SELECTOR).src =
		parseURL(X.currentRating = '/images/stars/' + rating + '.gif');

	X.py.defaultRatingText =
		(R.ID_INLINE_RATING_TEXT).innerHTML = parseHTML('Rated: ' + rating + ' stars.');
}

R.showInlineCommentForm = function() {
	var ct = $(R.ID_COMMENT_TEXT);
	if (!ct) { return; }

	top.scrollTo(0,0);
	ct.hide();

	$(R.ID_COMMENT_LABEL).show();
	$(R.ID_COMMENT_BUTTONS).show();

	var ied = $(R.ID_INLINE_EDIT_DELETE);
	if (ied) { ied.hide(); }

	var cte = $(R.ID_COMMENT_TEXT_EDIT);
	// check edit buffer first
 	var ctbuf = $(R.ID_COMMENT_EDIT_BUF);
 	if (ctbuf.innerHTML) {
 		cte.value = ctbuf.innerHTML;
 	} else {
 		cte.value = ct.innerHTML;
 	}

	cte.show();
	cte.focus();

	var rb = $(R.ID_REVIEW_BLOCK);
	rb.style.backgroundColor = '#EEF';
	rb.style.borderColor = '#DDD';
}

R.hideInlineCommentForm = function() {
	$(R.ID_COMMENT_LABEL).hide();
	$(R.ID_COMMENT_BUTTONS).hide();
	$(R.ID_COMMENT_TEXT_EDIT).hide();

	var ied = $(R.ID_INLINE_EDIT_DELETE);
	if (ied) { ied.show(); }

	$(R.ID_COMMENT_TEXT).show();

	var rb = $(R.ID_REVIEW_BLOCK);
	rb.style.backgroundColor = 'white';
	rb.style.borderColor = 'white';
}

R.validatePost = function(event) {
	var rating = Number($(R.ID_SITE_RATING).value);
	if (!rating) {
		alert('Your review must include a site rating.');
		return event.stop();
	}
}

R.confirmDelete = function(event) {
    return !!confirm('Are you sure you want to delete your review?');
}



/* Buzz */

B.ID_BUZZ_PANEL = 'buzz_panel';

B.isLoaded		= false;
B.url			= null;

B.loadBuzz = function() {
	if (!B.isLoaded && B.url) {
		X.getAjax(B.ID_BUZZ_PANEL, B.url);
		B.isLoaded = true;
	}
}



/* Share Utilities */

S.ID_CANONICAL_URL		= 'canonical_url';
S.ID_SHARE_CONTEXT		= 'share_context';
S.ID_SHARE_EMAIL_MAILTO	= 'share_email_mailto';
S.SHORTENERS_TRIM		= 'trim';
S.WINDOW_FACEBOOK		= 'facebook';
S.WINDOW_NEW			= '_blank';


/* Email */

S.shareEmail = function(url) {
	url = url || $(S.ID_SHARE_EMAIL_MAILTO).value;
	if (!url) { return false; }

	S.logShare({ 'uri': '/share/email' });
	window.setTimeout(function() {
		document.location.href = parseURL(url);
	}, 85);
	return false;
}


/* Facebook */

S.shareFacebook = function(url) {
	url = url || S.getCanonicalURL();
	if (!url) { return false; }

	S.logShare({ 'uri': '/share/facebook' });
	var t = document.title;
	var queryURL = 'http://www.facebook.com/sharer.php?' +
				'u=' + encodeURIComponent(url) +
				'&t=' + encodeURIComponent(t)
	S.openWindow(queryURL, S.WINDOW_FACEBOOK, 'scrollbars=1, width=1000, height=440');
	return false;
}


/* Twitter */

var ST = S.shareTwitter = function(url) {
	url = url || S.getCanonicalURL();
	if (!url) { return false; }

	S.logShare({ 'uri': '/share/twitter' });
	var twitterURL = ST.TWITTER_POST_URI + url;
	S.openWindow(twitterURL, S.WINDOW_TWITTER, 'scrollbars=1, width=800, height=440');
	return false;
}

S.logShare = function(args) {
	args = args || {};
	args['app'] = 'drift';
	var f = $(S.ID_SHARE_CONTEXT);
	var ca = Selector.findChildElements(f, ['input[type="hidden"]']) || [];
	for (var i = 0; ca[i]; i++) {
		var inp = ca[i];
		if (inp.id && inp.value) {
			args[inp.id] = encodeURIComponent(inp.value);
		}
	}
	if (X.username) { args['u'] = X.username; }
	X.jsLog(args);
}

ST.TRIM_QUERY_URI	= '/trim_url/';
ST.TWITTER_POST_URI	= 'http://www.twitter.com/home?status=';

ST.shortener = S.SHORTENERS_TRIM;

ST.handleTrimResponse = function(response) {
	// The fallback case, established first.
	var shortURL = ST.handleTrimResponse.lastURL;

	var rt = response && response.responseText;
	if (rt) {
		var ud = rt.evalJSON();
		var tp = ud && ud.trimpath;
		if (tp) {
			shortURL = 'http://tr.im/' + tp;
		}
	}
	var twitterURL = ST.TWITTER_POST_URI + shortURL;
	S.openWindow(twitterURL, S.WINDOW_TWITTER, 'scrollbars=1, width=800, height=440');
}
ST.handleTrimResponse.lastURL = null;

/* Share Utilities Helpers */
// Defined Later, because some reference specific objects above.

S.openWindow = function(uri, target, params) {

	var w;
	var _open = function(uri, target, params) {
		return window.open(uri, target, params,"gl");
	};
	var _failAndWarn = function() {
		alert(
			'Xmarks tried to launch a new browser window\n' +
			'to help you share this page with your friends,\n' +
			'but this action failed.  Check to see if your\n' +
			'browser is blocking popup windows from xmarks.com?'
		);
		return null;
	}

	try {
		w = _open(uri, target, params);
		w.focus();
		return w;
	} catch(e) {
		if (target == S.WINDOW_NEW) { return _failAndWarn(); }
	}
	try {
		w = _open(uri, S.WINDOW_NEW, params);
		w.focus();
		return w;
	} catch(e) {
		return _failAndWarn();
	}
}

S.getCanonicalURL = function() {
	var urlLink = $(S.ID_CANONICAL_URL);
	return (urlLink && urlLink.href) || null;
}

S.shorteners = {
	'trim': {
		'baseURI':			ST.TRIM_QUERY_URI,
		'responseHandler':	ST.handleTrimResponse
	}
}


FW.ID_ADD_ALERT_FORM = 'add_alert_form';
FW.ID_ADD_ALERT_LIGHTBOX_FORM = 'add_alert_lb_form';
FW.ID_ALERT_EXPERT_CHECKBOX = 'alert_expert_cb'
FW.ID_CONTEXT_FORM = 'follow_context';

/* Follow Topic Utilities */

FW.instr_html = '';
FW.followEmail = function() {
	var frm = $(FW.ID_ADD_ALERT_FORM);
	var frm_els = new Array();
	var has_alert = false;
	var expert = false;
	if (frm) {
		var in1 = frm['user_has_alert'];
		var in2 = frm['expert'];
		has_alert = ($F(in1).toLowerCase() == "true");
		expert = ($F(in2).toLowerCase() == "true");
	}

	if (has_alert) {
		alert("You already have this topic alert.  To modify your alert subscriptions, visit your profile page.");
		return false;
	}
	if (!expert) {
		// get page for lightbox
		var instr_url = '/user/add_alert_instructions';
		var params = {
			method:'GET',
			onSuccess: function(trans) {
				var html = trans.responseText;
				var lb_params = {};
				lb_params.html = html
				lb_params.title = "Xmarks Topic Alerts";
				L.display(lb_params);
				return false;
			},
			onFailure: function(trans, json) {
				return false;
			}
		};
		try {
			var ajax = new Ajax.Request( instr_url, params)
		}
		catch( e ) {
			alert(e);
		}
		return false;
	}
	else {
		FW.submitAlert();
		return false;
	}
}

FW.submitAlert = function() {
	// get expert info from hidden context form
	var lbfrm = $(FW.ID_ADD_ALERT_LIGHTBOX_FORM);
	var frm = $(FW.ID_ADD_ALERT_FORM);
	if (lbfrm && frm) {
        frm['expert'].value = lbfrm['alert_expert_cb'].checked;
    }

	if (frm) {
		frm.submit();
	}
	L.hideLightbox();
	return false;
}

FW.cancelAlert = function() {
	/** close light box */
	L.hideLightbox();
	return false;
}

/* Bookmarks Counter */

/*
	Hello and welcome.

	Ok, ok, we aren't actually presenting real-time updates of our
	master bookmarks corpus database.  That would be too computationally
	expensive and frankly not worth the trouble.  We're busted as charged.

	But our bookmarks counter is based upon actual data, extrapolated.
	And to come clean, our rate of growth is comfortably geometric(*)
	so if we're misrepresenting anything, it's that we're growing
	just a bit faster than our counter suggests.

	We hope you enjoy Xmarks.  If you have any ideas for making our
	products better, please don't hesitate to drop us a line on our
	forums:
	    <http://getsatisfaction.com/foxmarks>

	We also have an email address just for direct feedback:
	    <feedback@xmarks.com>

	(We read every last email we receive there, but do know that it's a
	one-way drop box and we never reply to those emails.)

	Thank you for stopping by.


	cheers,
	Xmarks Engineering

	(*) b > 1.  See: <http://tinyurl.com/pslorr> and <http://tinyurl.com/ofcu52>

*/

K.BOOKMARKS_COUNT			= 841765396;
K.BOOKMARKS_COUNT_DATE		= new Date(2009, 8, 23);
K.BOOKMARKS_DAILY_GROWTH	= 1019846;

K.TIME_BETWEEN_UPDATES		= 1021;					// ms
K.DAY_LENGTH				= 1000 * 60 * 60 * 24;	// ms

K.ID_COUNT					= 'bookmarks_count';

K.startTime = (new Date()).getTime();


K.init = function() {
	if (!$(K.ID_COUNT)) { return; }
	var n = new Date();
	var diff = n - K.BOOKMARKS_COUNT_DATE;
	K.BOOKMARKS_COUNT += Math.round((diff / K.DAY_LENGTH) * K.BOOKMARKS_DAILY_GROWTH);
	K.updateCount();
	window.setTimeout(K.updateCount, K.TIME_BETWEEN_UPDATES);
}

K.updateCount = function() {
	var numNewBookmarks = Math.round(K.BOOKMARKS_DAILY_GROWTH *
			((new Date()).getTime() - K.startTime) / K.DAY_LENGTH);
	var newCount = String(K.BOOKMARKS_COUNT + numNewBookmarks);
	var disp = '';
	while (true) {
		var c = newCount.length
		if (c > 3) {
			var chop = newCount.substr(c-3, 3);
			disp = ',' + chop + disp;
			newCount = newCount.substr(0, c-3);
		} else {
			disp = newCount + disp;
			break;
		}
	}
	$(K.ID_COUNT).innerHTML = parseHTML(disp);
	window.setTimeout(K.updateCount, K.TIME_BETWEEN_UPDATES);
}

/** reuse this code for both RRIT and Featured Sites **/
var _updateTracker = function(idx, trackerID, logpfx, pidpfx, uripfx, trackerPixID) {
	var tURL = $(trackerID);
	if (!tURL) { return; }
	X.log(logpfx + ' Update ' + idx);
	var tracker = tURL.value;
	var pid = $(pidpfx+idx).value;
	var trpix = $(trackerPixID);
	if (trpix) {
		trpix.src = parseURL(tracker + "/tracking/impressions.gif?app=drift&uri=" + uripfx + "&pid=" + pid);
	}
}


/* Recently Reviewd in Topic (RRIT) */

RR.ID_RRIT_ID = 'rrit_id';
RR.ID_RRIT_NEXT_BTN = 'rrit_next_btn';
RR.ID_RRIT_PREV_BTN = 'rrit_prev_btn';
RR.ID_NUM_RRIT_SITES = 'num_rrit_sites';
RR.ID_TRACKER_URL = 'tracker_url';
RR.ID_TRACKER_PIXEL = '_rr_trkpx';


var _updateRRITTracker = function(idx) {
	return _updateTracker(idx, RR.ID_TRACKER_URL, "Recently Reviewed:", "rrit_pid_", "/rrit_widget_shown", RR.ID_TRACKER_PIXEL);
}

RR.showSite = function(siteid) {
	siteid = parseInt(siteid);
	var sites = $$('.site-holder');
	for (var ii = 0, ln = sites.length; ii < ln; ii++ ) {
		var s = sites[ii];
		var sid = s.id;
		var tstid = null;
		if (sid.indexOf('rrit_thumb_') == 0) {
			tstid = parseInt(sid.substr(11));
		}
		else if (sid.indexOf('rrit_desc_') == 0) {
			tstid = parseInt(sid.substr(10));
		}
		if (tstid != null) {
			if (tstid == parseInt(siteid)) {
				s.show();
			}
			else {
				s.hide();
			}
		}
	}
}


RR.showPrevious = function() {
	var ln = parseInt($(RR.ID_NUM_RRIT_SITES).value);
	var sel = $(RR.ID_RRIT_ID);
	var prv = (parseInt(sel.value) + ln - 1) % ln;
	var shw = Math.abs(prv);
	RR.showSite(Math.abs(prv));
	sel.value = prv;
	_updateRRITTracker(shw)
}

RR.showNext = function() {
	var ln = parseInt($(RR.ID_NUM_RRIT_SITES).value);
	var sel = $(RR.ID_RRIT_ID);
	var nxt = (parseInt(sel.value) + 1) % ln;
	var shw = Math.abs(nxt);
	RR.showSite(shw);
	sel.value = nxt;
	_updateRRITTracker(shw)
}

RR.enableRritSites = function() {
	var pr = $(RR.ID_RRIT_PREV_BTN);
	var nx = $(RR.ID_RRIT_NEXT_BTN);
	if (pr) {
		Event.observe(pr, 'click', function(ev) { RR.showPrevious(); });
	}
	if (nx) {
		Event.observe(nx, 'click', function(ev) { RR.showNext(); });
	}
	_updateRRITTracker(0);
}

RR.init = function() {
	RR.enableRritSites();
	RR.init = function(){}; // avoid reinit
}

Event.observe(window, 'load', RR.init);

/* Featured Sites */

F.ID_FEATURED_ID = 'featured_id';
F.ID_FEATURE_NEXT_BTN = 'feature_next_btn';
F.ID_FEATURE_PREV_BTN = 'feature_prev_btn';
F.ID_NUM_FEATURED_SITES = 'num_featured_sites';
F.ID_TRACKER_URL = 'tracker_url';
F.ID_TRACKER_PIXEL = '_trkpx';


var _updateFSTracker  = function(idx) {
	return _updateTracker(idx, F.ID_TRACKER_URL, "Featured Sites:", "feature_pid_", "/featured_sites_shown", F.ID_TRACKER_PIXEL);
}

F.showSite = function(siteid) {
	siteid = parseInt(siteid);
	var sites = $$('.site-holder');
	for (var ii = 0, ln = sites.length; ii < ln; ii++ ) {
		var s = sites[ii];
		var sid = s.id;
		var tstid = null;
		if (sid.indexOf('feature_thumb_') == 0) {
			tstid = parseInt(sid.substr(14));
		}
		else if (sid.indexOf('feature_desc_') == 0) {
			tstid = parseInt(sid.substr(13));
		}
		if (tstid != null) {
			if (tstid == parseInt(siteid)) {
				s.show();
			}
			else {
				s.hide();
			}
		}
	}
}


F.showPrevious = function() {
	var ln = parseInt($(F.ID_NUM_FEATURED_SITES).value);
	var sel = $(F.ID_FEATURED_ID);
	var prv = (parseInt(sel.value) + ln - 1) % ln;
	var shw = Math.abs(prv);
	F.showSite(Math.abs(prv));
	sel.value = prv;
	_updateFSTracker(shw)
}

F.showNext = function() {
	var ln = parseInt($(F.ID_NUM_FEATURED_SITES).value);
	var sel = $(F.ID_FEATURED_ID);
	var nxt = (parseInt(sel.value) + 1) % ln;
	var shw = Math.abs(nxt);
	F.showSite(shw);
	sel.value = nxt;
	_updateFSTracker(shw)
}

F.enableFeaturedSites = function() {
	var pr = $(F.ID_FEATURE_PREV_BTN);
	var nx = $(F.ID_FEATURE_NEXT_BTN);
	if (pr) {
		Event.observe(pr, 'click', function(ev) { F.showPrevious(); });
	}
	if (nx) {
		Event.observe(nx, 'click', function(ev) { F.showNext(); });
	}
	_updateFSTracker(0);
}

F.init = function() {
	F.enableFeaturedSites();
	F.init = function(){}; // avoid reinit
}

Event.observe(window, 'load', F.init);



/* User Profile JS */

/* Constants */
U.ADDALERT_BTN_ID = 'add_alert_btn';
U.CANCELALERT_BTN_ID = 'cancel_alert_btn';
U.DELETEALERTS_BTN = 'deletealerts_btn';
U.TOGGLEALERTS_BTN = 'togglealerts_btn';
U.ALERTMANAGEMENT_FORM_ID = 'alerts_form';
U.TOPIC_TEXTBOX = 'topic_query';
U.TOPIC_PREVIEW_CONTENT = 'preview-content';
U.TOPIC_PREVIEW_TITLE = 'preview-title';
U.DEFAULT_TOPIC = "<enter a topic>";

var _updateAlertPreview = function(json, query) {
	var html = "";
	try {
		var rurls = json.topics[query].related_urls;
		var num = Math.max(rurls.length, 5);
		for (var ii = 0; ii < num; ii++ ) {
			var rurl = rurls[ii]
			var title = rurl.title;
			var uct = rurl.user_count;
			var velo = rurl.add_velocity;
			var pop = rurl.popularity;
			var score = rurl.score;
			var url = rurl.url;

			html += "<div class='alert-results'>" + title + "</div>";
		}
		if (rurls.length > 5) {
			html += "<div class='alert-results'>...</div>";
		}
	}
	catch( err ) {
		//alert("Error contacting correlator " + err)
		html="";
	}
	var disp = $(U.TOPIC_PREVIEW_CONTENT);
	if (html) {
		disp.innerHTML = parseHTML(html);
	}
	else {
		disp.innerHTML = parseHTML("<div class='alert-results'>None</div>");
	}
	disp.show();
	var title = $(U.TOPIC_PREVIEW_TITLE);
	title.innerHTML = parseHTML("<h4>Results for : " + query + "</h4>");
}

U.submitDeleteAlerts = function() {
    var frm = $(U.ALERTMANAGEMENT_FORM_ID);
	if (frm) {
		frm.submit();
	}
}

U.validateAddTopic = function() {
	var qbx = $(U.TOPIC_TEXTBOX);
	if (!qbx || !qbx.getValue() || (qbx.getValue() == U.DEFAULT_TOPIC)) {
		alert("You must enter a topic");
		return false;
	}
	return true;
}

U.clearDefaultTopic = function() {
	var qbx = $(U.TOPIC_TEXTBOX);
	if (!qbx || !qbx.value) {
	}
	else {
		val = qbx.getValue();
		if (val == U.DEFAULT_TOPIC) {
			qbx.setValue("");
		}
	}
}


U.previewAlert = function() {
	var query = '';
	var freq = 'weekly';
	var querybox = $(U.TOPIC_TEXTBOX);
	if (!querybox || !querybox.getValue()) {
	}
	else {
		query = querybox.getValue();
	}

	var disp = $(U.TOPIC_PREVIEW_CONTENT);
	var corrurl = "/topics/topic2url";
	var postparams = {}
	postparams.topic = query
	postparams.filter = "{porn:false, foreign:false}";
	postparams.frequency = freq
	var params = {
		method:'POST',
		parameters: postparams,
		onSuccess: function(trans) {
			_updateAlertPreview(trans.responseJSON, query);
			return false;
		},
		onFailure: function(trans, json) {
			alert('failure' + trans.responseText)
			return false;
		}
	};
	try {
		var ajax = new Ajax.Request(corrurl, params);
	}
	catch(err) {
		alert (err);
	}
	return false;

}

var _countAlertChecks = function(){
	var fForm = $(U.ALERTMANAGEMENT_FORM_ID);
	var nchecked = 0;
	var ntotal = 0;
	if (fForm) {
		for (var ii = 0; ii < fForm.length; ii ++ ) {
			var cb = fForm[ii];
			if (cb.type == 'checkbox') {
				ntotal ++;
				if (cb.checked) {
					nchecked ++;
				}
			}
		}
	}
	return Array(nchecked, ntotal);
}


/* alert management functions (for user_page) */
U.setAllAlertChecks = function(chk){
	var fForm = $(U.ALERTMANAGEMENT_FORM_ID);
	if (fForm) {
		for (var ii = 0; ii < fForm.length; ii ++ ) {
			var cb = fForm[ii];
			if (cb.type == 'checkbox' && cb.id != U.TOGGLEALERTS_BTN) {
				cb.checked = chk;
			}
		}
	}
	U.updateButtons()
	return false;
}

U.toggleAllAlerts = function() {
	var mastercb = $(U.TOGGLEALERTS_BTN);
	if (mastercb) {
		U.setAllAlertChecks(mastercb.checked);
	}
}

/* set delete button active only if there are checked alerts */
U.updateButtons = function(){
	var fForm = $(U.ALERTMANAGEMENT_FORM_ID);
	if (!fForm) {
		return;
	}
	var counts = _countAlertChecks();
	numchecked = counts[0];
	var btns = new Array();
	for (var ii = 0; ii < fForm.length; ii ++ ) {
		if (fForm[ii].type == 'submit' && fForm[ii].name == U.DELETEALERTS_BTN) {
			btns.push(fForm[ii]);
		}
	}
	for (var ii = 0; ii < btns.length; ii ++ ) {
		if ( numchecked > 0 ) {
			btns[ii].removeAttribute('disabled');
		}
		else {
			btns[ii].setAttribute('disabled','disabled');
		}
	}
	var mastercb = $(U.TOGGLEALERTS_BTN);
	if (mastercb) {
		mastercb.checked = (numchecked > counts[1]/2);
	}
}

Event.observe(window, 'load', U.updateButtons);



/* Hot Topics, Home Page */

H.CLS_SELECTED					= 'selected';
H.ID_FEATURED_TOPIC				= 'featured_topic';
H.ID_FEATURED_TOPICS			= 'featured_topics';
H.ID_SEARCH_TABS_INSTALL_NOW	= 'search_tabs_install_now';
H.ID_SEARCH_TABS_PROMO			= 'search_tabs_promo';

H.Data = [];

H.init = function() {
	var d = H.Data;
	var getTabClickHandler = function(i) {
		return function(event) { H.onTabClick(event, i); }
	};
	for (var i = 0, n = d.length; i < n; i++) {
		Event.observe($(d[i].id), 'click', getTabClickHandler(i));
	}

	// Change CSS constants for the default Xmarks suggester.
	var xS = X.Suggest;
	xS.SUGGEST_LINE_HEIGHT = 20;
	xS.SUGGEST_BOX_HEIGHT = 280;
	// Add "AOP" wrappers to the default Xmarks suggester's show/hide behavior.
	var oxs = xS.show,
		oxh = xS.hide;
	xS.show = function() {
		oxs.apply(window, arguments);
		$(H.ID_FEATURED_TOPICS).hide();
	}
	xS.hide = function() {
		oxh(window, arguments);
		$(H.ID_FEATURED_TOPICS).show();
	}

	// Enable entire SearchTabs region as click-target.
	var stb = $(H.ID_SEARCH_TABS_PROMO);
	stb.style.cursor = 'pointer';
	Event.observe(stb, 'click', function(event) {
		event.stop();
		var lnk = $(H.ID_SEARCH_TABS_INSTALL_NOW).parentNode;
		document.location.href = parseURL(lnk.href);
	});

	H.init = function(){};
}

H.onTabClick = function(event, index) {
	event.stop();
	H.showTab(index);
}

H.showTab = function(index) {
	var d = H.Data;

	// Unselect all topic tabs.
	for (var i = 0, n = d.length; i < n; i++) {
		$(d[i].id).removeClassName(H.CLS_SELECTED);
	}

	//  Select new topic tab
	var topic = d[index];
	var sel = $(topic.id);
	sel.addClassName(H.CLS_SELECTED);

	// Create HTML template for new topic, cloned from existing template.
	var ft = $(H.ID_FEATURED_TOPIC);
	var nt = Element.clone(ft, true);

	// Set topic title and link url
	var topicTitle = nt.getElementsByTagName('em')[0];
	topicTitle.innerHTML = parseHTML(topic.display);
	topicTitle.parentNode.href = parseURL('/topic/' + topic.uri);

	// Render sites data
    var fs = Selector.findChildElements(nt, ['.featured-site']);
    for (var i = 0, el; el = fs[i]; i++) {
    	var site = topic.sites[i];
    	var drift_url = X.homeURL + '/site/' + site.minurl;

 		// Set site title
        var tit = Selector.findChildElements(el, ['.site-title'])[0];
        tit.innerHTML = parseHTML(site.title);
        tit.href = parseURL(drift_url);

        // Set site image src and link url
        var topicThumb = el.getElementsByTagName('img')[0];
        topicThumb.src = parseURL(site.thumbnail);
        topicThumb.alt = 'Small screenshot from ' + site.minurl;
        topicThumb.parentNode.href = parseURL(drift_url);

        // Set site description
        var desc = Selector.findChildElements(el, ['.site-description'])[0];
        desc.innerHTML = parseHTML(site.description);

        // Set link to Site Info
        var silink = Selector.findChildElements(el, ['.site-info-link a'])[0];
        silink.href = parseURL('/site/' + site.minurl);
    }

    // Draw new topic data in place of old one.
	new Effect.Fade(ft, {
		'duration': 0.15,
		'afterFinish': function() {
			ft.innerHTML = parseHTML(nt.innerHTML);
			new Effect.Appear(ft, { 'duration': 0.30 });
		}
	});
}
})();
