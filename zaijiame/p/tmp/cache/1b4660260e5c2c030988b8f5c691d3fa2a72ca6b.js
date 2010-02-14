
/* Brains for Download Site */

(function() {


// Public
if (typeof Xmarks === 'undefined') { Xmarks = {}; }
Xmarks.Download = {};



// Private
var X = Xmarks;
var D = X.Download;


D.ID_SCREEN			= 'installation_screen';
D.ID_ALLOW_POINTER	= 'installation_allow_pointer';
D.ID_CHROME_PROMO	= 'chrome_promo';
D.ID_INSTALL_STEPS	= 'install_steps';

D.overlay = null;


D.init = function() {
    // Draw new topic data in place of old one.
    var cp = $(D.ID_CHROME_PROMO);
	new Effect.Morph(cp, {
		'duration': 0.45,
		'style': 'background-color: #F9FFD0; color: #000;',
		'afterFinish': function() {
			new Effect.Morph(cp, {
				'duration': 2.5,
				'style': 'background-color: #FFF; color: #AAA;'
			});
		}
	});
}
Event.observe(window, 'load', D.init);

D.downloadForFirefox = function() {
	if (!IS_FIREFOX) { return; }
	window.setTimeout(D.startDownloadForFirefox, 250);
	window.addEventListener('blur', D.hideDownloadHelper, false);
}

D.startDownloadForFirefox = function() {
	// Wash-out the document.body and point arrow to the
	// "Allow" button presented by Firefox 3.

	// TODO: Align the positioning of the "Allow" arrow to be aware of:
	//       a) Whether or not scrollbars are active
	//       b) Which client platform we're dealing with

	var d = D.overlay;
	var p = document.getElementById(D.ID_ALLOW_POINTER);

	if (!d) {
		d = D.overlay = document.createElement('div');
		d.id = D.ID_SCREEN;
		document.body.appendChild(d);

		p.style.display = 'block';
		p.innerHTML = parseHTML(document.getElementById(D.ID_INSTALL_STEPS).innerHTML);
	}
}

D.hideDownloadHelper = function() {
	var p = document.getElementById(D.ID_ALLOW_POINTER);
	p.style.display = 'none';

	// Odd race between blur event and window references.  The element deletion
	// occurs either way, but sometimes the browser complains about null
	// references.  So we ignore errors here.
	try {
		var d = document.getElementById(D.ID_SCREEN);
		d.parentNode.removeChild(d);
	} catch(e) {}
	D.overlay = null;
}


})();
