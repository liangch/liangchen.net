
Xmarks = window['Xmarks'] || {};


(function() {



var X = Xmarks;

var C = X.Common = X.Common || {};
var B = C.Button = C.Button || {};
var L = X.Lightbox = X.Lightbox || {};



/* Xmarks */

X.__debug__ = (document.location.href.indexOf('staging') > -1);
X.isArray = function(obj) { return !!(obj instanceof Array); }

X.getAjax = function(target, url, handler) {
	handler = handler || function(){};
	new Ajax.Updater(target, url, {
		method: 'get',
		onComplete: function(response) {
			if (!X.ajaxResponseRedirect(response)) {
				handler(response);
			}
		}
	});
	return false;
}

X.ajaxResponseRedirect = function(response) {
	var loc = response.getHeader('Location');
    if (loc) {
		top.document.location.href = parseURL(loc);
		return true;
	}
	return false;
}



/* Common */

C.ID_SITE_INFO_FORM		= 'get_site_info_form';
C.ID_SEARCH_INPUT		= 'search_input';
C.SEARCH_INPUT_DEFAULT_TEXT = 'Enter a site address (eg. nytimes.com, lifehacker.com)';

C.init = function() {
	if (Prototype.Browser.IE) { B.fixIEButtons(); }
	C.initSearchFormHandlers();
}
Event.observe(window, 'load', C.init);

C.seedDefaultSearchInputText = function() {
	var inp = $(C.ID_SEARCH_INPUT);
	if (inp.value == '') {
		inp.value = C.SEARCH_INPUT_DEFAULT_TEXT;
	}
}

C.initSearchFormHandlers = function() {
	var frm = $(C.ID_SITE_INFO_FORM);
	var inp = $(C.ID_SEARCH_INPUT);
	if (frm && inp) {
		Event.observe(inp, 'focus', function(event) {
			if (inp.value == C.SEARCH_INPUT_DEFAULT_TEXT) {
				inp.value = '';
			}
		});
		Event.observe(inp, 'blur', function(event) {
			if (inp.value == '') {
				inp.value = C.SEARCH_INPUT_DEFAULT_TEXT;
			}
		});
		Event.observe(frm, 'submit', function(event) {
			if ((inp.value.search(/\S/) == -1) ||
			   (inp.value == C.SEARCH_INPUT_DEFAULT_TEXT)) {
				Event.stop(event);
			}
		});
	}
}

var _stop = function(event) {
	event.stop();
}



/* Button */

B.CLASS_XMARKS_BUTTON = '.xmarks-button';

// The <button> element in IE exhibits non-standard behaviors.  When wrapped
// in a link <a>, the link does not work for navigation as expected.  Fix
// this behavior by navigating via script.
B.fixIEButtons = function() {
	var buttons = $$(B.CLASS_XMARKS_BUTTON);
	for (var b = 0, n = buttons.length; b < n; b++) {
		(function() {
			var button = buttons[b];
			var parent = button.parentNode;
			if (parent.tagName.toLowerCase() == 'a') {
				if (parent.className.toLowerCase().indexOf('plain') > -1) {
					Event.observe(parent, 'click', function() {
						top.location.href = parseURL(parent.href);
					});
				}
			}
		})()
	}
}



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

	if (X.__debug__) { Event.observe($(L.lightboxShadow), 'click', L.hideLightbox); };

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
}

})();
