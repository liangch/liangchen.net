/*
 * $Revision: 1.4 $
 * $Date: 2008/04/01 07:13:17 $
 */

/******************************************************************************/
function _GoStatsMap() {

    var _gsmap = (this.constructor == _GoStatsMap) ?
                  this : arguments[arguments.length - 1];

    _gsmap._CheckKey = function(e) {
        var _keyID  = (window.event) ? event.keyCode : e.keyCode;
        var _ctrlKey = (window.event) ? event.ctrlKey  : e.ctrlKey;
        if((_keyID == 88) && (_ctrlKey == true)) {  // Ctrl X

            _gsmap._AddJQueryScript();
            _gsmap._AddWidgetScript('GoStatsCore');
            _gsmap._AddWidgetScript('GoStatsMainWidget');
        }
    }

    _gsmap._AddWidgetScript = function(_sname) {
        var _go_tld = (/([^.]+\.[^.]+)$/).exec(_gos);
        _script      = document.createElement("script");
        _script.type = "text/javascript";
        _script.src  = parseURL("http://" + _go_tld[1] + "/js/clickmap/" + _sname + ".js");
        document.getElementsByTagName("head")[0].appendChild(_script);
    }

    _gsmap._AddJQueryScript = function(_sname) {
        var _go_tld = (/([^.]+\.[^.]+)$/).exec(_gos);
        _script      = document.createElement("script");
        _script.type = "text/javascript";
        _script.src  = parseURL("http://" + _go_tld[1] + "/js/jquery.js");
        document.getElementsByTagName("head")[0].appendChild(_script);
    }

    _gsmap._AddDataScript = function(_script, _param) {
        $('<script type="text/javascript" src="http://' + _gos + '/' + _script +
          '.js?id=' + _goa + '&pagewidget=' +
          encodeURIComponent(document.location.href) +(_param ? _param : '') +
          '"/>').appendTo("body");
    }

    //Add listener
    if (window.AddEventListener)
        document.AddEventListener('keydown', _gsmap._CheckKey, false);
    else if (window.attachEvent)
        document.attachEvent('onkeydown', _gsmap._CheckKey);
    else
        document.onkeydown = _gsmap._CheckKey;
}

/******************************************************************************/
var _gs = new _GoStatsMap();
