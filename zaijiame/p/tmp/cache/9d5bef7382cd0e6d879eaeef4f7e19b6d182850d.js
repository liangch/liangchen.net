// Copyright (c) 2005-2008 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)
// Contributors:
//  Justin Palmer (http://encytemedia.com/)
//  Mark Pilgrim (http://diveintomark.org/)
//  Martin Bialasinki
//
// script.aculo.us is freely distributable under the terms of an MIT-style license.
// For details, see the script.aculo.us web site: http://script.aculo.us/

// converts rgb() and #xxx to #xxxxxx format,
// returns self (or first argument) if not convertable
String.prototype.parseColor = function() {
  var color = '#';
  if (this.slice(0,4) == 'rgb(') {
    var cols = this.slice(4,this.length-1).split(',');
    var i=0; do { color += parseInt(cols[i]).toColorPart() } while (++i<3);
  } else {
    if (this.slice(0,1) == '#') {
      if (this.length==4) for(var i=1;i<4;i++) color += (this.charAt(i) + this.charAt(i)).toLowerCase();
      if (this.length==7) color = this.toLowerCase();
    }
  }
  return (color.length==7 ? color : (arguments[0] || this));
};

/*--------------------------------------------------------------------------*/

Element.collectTextNodes = function(element) {
  return $A($(element).childNodes).collect( function(node) {
    return (node.nodeType==3 ? node.nodeValue :
      (node.hasChildNodes() ? Element.collectTextNodes(node) : ''));
  }).flatten().join('');
};

Element.collectTextNodesIgnoreClass = function(element, className) {
  return $A($(element).childNodes).collect( function(node) {
    return (node.nodeType==3 ? node.nodeValue :
      ((node.hasChildNodes() && !Element.hasClassName(node,className)) ?
        Element.collectTextNodesIgnoreClass(node, className) : ''));
  }).flatten().join('');
};

Element.setContentZoom = function(element, percent) {
  element = $(element);
  element.setStyle({fontSize: (percent/100) + 'em'});
  if (Prototype.Browser.WebKit) window.scrollBy(0,0);
  return element;
};

Element.getInlineOpacity = function(element){
  return $(element).style.opacity || '';
};

Element.forceRerendering = function(element) {
  try {
    element = $(element);
    var n = document.createTextNode(' ');
    element.appendChild(n);
    element.removeChild(n);
  } catch(e) { }
};

/*--------------------------------------------------------------------------*/

var Effect = {
  _elementDoesNotExistError: {
    name: 'ElementDoesNotExistError',
    message: 'The specified DOM element does not exist, but is required for this effect to operate'
  },
  Transitions: {
    linear: Prototype.K,
    sinoidal: function(pos) {
      return (-Math.cos(pos*Math.PI)/2) + .5;
    },
    reverse: function(pos) {
      return 1-pos;
    },
    flicker: function(pos) {
      var pos = ((-Math.cos(pos*Math.PI)/4) + .75) + Math.random()/4;
      return pos > 1 ? 1 : pos;
    },
    wobble: function(pos) {
      return (-Math.cos(pos*Math.PI*(9*pos))/2) + .5;
    },
    pulse: function(pos, pulses) {
      return (-Math.cos((pos*((pulses||5)-.5)*2)*Math.PI)/2) + .5;
    },
    spring: function(pos) {
      return 1 - (Math.cos(pos * 4.5 * Math.PI) * Math.exp(-pos * 6));
    },
    none: function(pos) {
      return 0;
    },
    full: function(pos) {
      return 1;
    }
  },
  DefaultOptions: {
    duration:   1.0,   // seconds
    fps:        100,   // 100= assume 66fps max.
    sync:       false, // true for combining
    from:       0.0,
    to:         1.0,
    delay:      0.0,
    queue:      'parallel'
  },
  tagifyText: function(element) {
    var tagifyStyle = 'position:relative';
    if (Prototype.Browser.IE) tagifyStyle += ';zoom:1';

    element = $(element);
    $A(element.childNodes).each( function(child) {
      if (child.nodeType==3) {
        child.nodeValue.toArray().each( function(character) {
          element.insertBefore(
            new Element('span', {style: tagifyStyle}).update(
              character == ' ' ? String.fromCharCode(160) : character),
              child);
        });
        Element.remove(child);
      }
    });
  },
  multiple: function(element, effect) {
    var elements;
    if (((typeof element == 'object') ||
        Object.isFunction(element)) &&
       (element.length))
      elements = element;
    else
      elements = $(element).childNodes;

    var options = Object.extend({
      speed: 0.1,
      delay: 0.0
    }, arguments[2] || { });
    var masterDelay = options.delay;

    $A(elements).each( function(element, index) {
      new effect(element, Object.extend(options, { delay: index * options.speed + masterDelay }));
    });
  },
  PAIRS: {
    'slide':  ['SlideDown','SlideUp'],
    'blind':  ['BlindDown','BlindUp'],
    'appear': ['Appear','Fade']
  },
  toggle: function(element, effect) {
    element = $(element);
    effect = (effect || 'appear').toLowerCase();
    var options = Object.extend({
      queue: { position:'end', scope:(element.id || 'global'), limit: 1 }
    }, arguments[2] || { });
    Effect[element.visible() ?
      Effect.PAIRS[effect][1] : Effect.PAIRS[effect][0]](element, options);
  }
};

Effect.DefaultOptions.transition = Effect.Transitions.sinoidal;

/* ------------- core effects ------------- */

Effect.ScopedQueue = Class.create(Enumerable, {
  initialize: function() {
    this.effects  = [];
    this.interval = null;
  },
  _each: function(iterator) {
    this.effects._each(iterator);
  },
  add: function(effect) {
    var timestamp = new Date().getTime();

    var position = Object.isString(effect.options.queue) ?
      effect.options.queue : effect.options.queue.position;

    switch(position) {
      case 'front':
        // move unstarted effects after this effect
        this.effects.findAll(function(e){ return e.state=='idle' }).each( function(e) {
            e.startOn  += effect.finishOn;
            e.finishOn += effect.finishOn;
          });
        break;
      case 'with-last':
        timestamp = this.effects.pluck('startOn').max() || timestamp;
        break;
      case 'end':
        // start effect after last queued effect has finished
        timestamp = this.effects.pluck('finishOn').max() || timestamp;
        break;
    }

    effect.startOn  += timestamp;
    effect.finishOn += timestamp;

    if (!effect.options.queue.limit || (this.effects.length < effect.options.queue.limit))
      this.effects.push(effect);

    if (!this.interval)
      this.interval = setInterval(this.loop.bind(this), 15);
  },
  remove: function(effect) {
    this.effects = this.effects.reject(function(e) { return e==effect });
    if (this.effects.length == 0) {
      clearInterval(this.interval);
      this.interval = null;
    }
  },
  loop: function() {
    var timePos = new Date().getTime();
    for(var i=0, len=this.effects.length;i<len;i++)
      this.effects[i] && this.effects[i].loop(timePos);
  }
});

Effect.Queues = {
  instances: $H(),
  get: function(queueName) {
    if (!Object.isString(queueName)) return queueName;

    return this.instances.get(queueName) ||
      this.instances.set(queueName, new Effect.ScopedQueue());
  }
};
Effect.Queue = Effect.Queues.get('global');

Effect.Base = Class.create({
  position: null,
  start: function(options) {
    function codeForEvent(options,eventName){
      return (
        (options[eventName+'Internal'] ? 'this.options.'+eventName+'Internal(this);' : '') +
        (options[eventName] ? 'this.options.'+eventName+'(this);' : '')
      );
    }
    if (options && options.transition === false) options.transition = Effect.Transitions.linear;
    this.options      = Object.extend(Object.extend({ },Effect.DefaultOptions), options || { });
    this.currentFrame = 0;
    this.state        = 'idle';
    this.startOn      = this.options.delay*1000;
    this.finishOn     = this.startOn+(this.options.duration*1000);
    this.fromToDelta  = this.options.to-this.options.from;
    this.totalTime    = this.finishOn-this.startOn;
    this.totalFrames  = this.options.fps*this.options.duration;

    this.render = (function() {
      function dispatch(effect, eventName) {
        if (effect.options[eventName + 'Internal'])
          effect.options[eventName + 'Internal'](effect);
        if (effect.options[eventName])
          effect.options[eventName](effect);
      }

      return function(pos) {
        if (this.state === "idle") {
          this.state = "running";
          dispatch(this, 'beforeSetup');
          if (this.setup) this.setup();
          dispatch(this, 'afterSetup');
        }
        if (this.state === "running") {
          pos = (this.options.transition(pos) * this.fromToDelta) + this.options.from;
          this.position = pos;
          dispatch(this, 'beforeUpdate');
          if (this.update) this.update(pos);
          dispatch(this, 'afterUpdate');
        }
      };
    })();

    this.event('beforeStart');
    if (!this.options.sync)
      Effect.Queues.get(Object.isString(this.options.queue) ?
        'global' : this.options.queue.scope).add(this);
  },
  loop: function(timePos) {
    if (timePos >= this.startOn) {
      if (timePos >= this.finishOn) {
        this.render(1.0);
        this.cancel();
        this.event('beforeFinish');
        if (this.finish) this.finish();
        this.event('afterFinish');
        return;
      }
      var pos   = (timePos - this.startOn) / this.totalTime,
          frame = (pos * this.totalFrames).round();
      if (frame > this.currentFrame) {
        this.render(pos);
        this.currentFrame = frame;
      }
    }
  },
  cancel: function() {
    if (!this.options.sync)
      Effect.Queues.get(Object.isString(this.options.queue) ?
        'global' : this.options.queue.scope).remove(this);
    this.state = 'finished';
  },
  event: function(eventName) {
    if (this.options[eventName + 'Internal']) this.options[eventName + 'Internal'](this);
    if (this.options[eventName]) this.options[eventName](this);
  },
  inspect: function() {
    var data = $H();
    for(property in this)
      if (!Object.isFunction(this[property])) data.set(property, this[property]);
    return '#<Effect:' + data.inspect() + ',options:' + $H(this.options).inspect() + '>';
  }
});

Effect.Parallel = Class.create(Effect.Base, {
  initialize: function(effects) {
    this.effects = effects || [];
    this.start(arguments[1]);
  },
  update: function(position) {
    this.effects.invoke('render', position);
  },
  finish: function(position) {
    this.effects.each( function(effect) {
      effect.render(1.0);
      effect.cancel();
      effect.event('beforeFinish');
      if (effect.finish) effect.finish(position);
      effect.event('afterFinish');
    });
  }
});

Effect.Tween = Class.create(Effect.Base, {
  initialize: function(object, from, to) {
    object = Object.isString(object) ? $(object) : object;
    var args = $A(arguments), method = args.last(),
      options = args.length == 5 ? args[3] : null;
    this.method = Object.isFunction(method) ? method.bind(object) :
      Object.isFunction(object[method]) ? object[method].bind(object) :
      function(value) { object[method] = value };
    this.start(Object.extend({ from: from, to: to }, options || { }));
  },
  update: function(position) {
    this.method(position);
  }
});

Effect.Event = Class.create(Effect.Base, {
  initialize: function() {
    this.start(Object.extend({ duration: 0 }, arguments[0] || { }));
  },
  update: Prototype.emptyFunction
});

Effect.Opacity = Class.create(Effect.Base, {
  initialize: function(element) {
    this.element = $(element);
    if (!this.element) throw(Effect._elementDoesNotExistError);
    // make this work on IE on elements without 'layout'
    if (Prototype.Browser.IE && (!this.element.currentStyle.hasLayout))
      this.element.setStyle({zoom: 1});
    var options = Object.extend({
      from: this.element.getOpacity() || 0.0,
      to:   1.0
    }, arguments[1] || { });
    this.start(options);
  },
  update: function(position) {
    this.element.setOpacity(position);
  }
});

Effect.Move = Class.create(Effect.Base, {
  initialize: function(element) {
    this.element = $(element);
    if (!this.element) throw(Effect._elementDoesNotExistError);
    var options = Object.extend({
      x:    0,
      y:    0,
      mode: 'relative'
    }, arguments[1] || { });
    this.start(options);
  },
  setup: function() {
    this.element.makePositioned();
    this.originalLeft = parseFloat(this.element.getStyle('left') || '0');
    this.originalTop  = parseFloat(this.element.getStyle('top')  || '0');
    if (this.options.mode == 'absolute') {
      this.options.x = this.options.x - this.originalLeft;
      this.options.y = this.options.y - this.originalTop;
    }
  },
  update: function(position) {
    this.element.setStyle({
      left: (this.options.x  * position + this.originalLeft).round() + 'px',
      top:  (this.options.y  * position + this.originalTop).round()  + 'px'
    });
  }
});

// for backwards compatibility
Effect.MoveBy = function(element, toTop, toLeft) {
  return new Effect.Move(element,
    Object.extend({ x: toLeft, y: toTop }, arguments[3] || { }));
};

Effect.Scale = Class.create(Effect.Base, {
  initialize: function(element, percent) {
    this.element = $(element);
    if (!this.element) throw(Effect._elementDoesNotExistError);
    var options = Object.extend({
      scaleX: true,
      scaleY: true,
      scaleContent: true,
      scaleFromCenter: false,
      scaleMode: 'box',        // 'box' or 'contents' or { } with provided values
      scaleFrom: 100.0,
      scaleTo:   percent
    }, arguments[2] || { });
    this.start(options);
  },
  setup: function() {
    this.restoreAfterFinish = this.options.restoreAfterFinish || false;
    this.elementPositioning = this.element.getStyle('position');

    this.originalStyle = { };
    ['top','left','width','height','fontSize'].each( function(k) {
      this.originalStyle[k] = this.element.style[k];
    }.bind(this));

    this.originalTop  = this.element.offsetTop;
    this.originalLeft = this.element.offsetLeft;

    var fontSize = this.element.getStyle('font-size') || '100%';
    ['em','px','%','pt'].each( function(fontSizeType) {
      if (fontSize.indexOf(fontSizeType)>0) {
        this.fontSize     = parseFloat(fontSize);
        this.fontSizeType = fontSizeType;
      }
    }.bind(this));

    this.factor = (this.options.scaleTo - this.options.scaleFrom)/100;

    this.dims = null;
    if (this.options.scaleMode=='box')
      this.dims = [this.element.offsetHeight, this.element.offsetWidth];
    if (/^content/.test(this.options.scaleMode))
      this.dims = [this.element.scrollHeight, this.element.scrollWidth];
    if (!this.dims)
      this.dims = [this.options.scaleMode.originalHeight,
                   this.options.scaleMode.originalWidth];
  },
  update: function(position) {
    var currentScale = (this.options.scaleFrom/100.0) + (this.factor * position);
    if (this.options.scaleContent && this.fontSize)
      this.element.setStyle({fontSize: this.fontSize * currentScale + this.fontSizeType });
    this.setDimensions(this.dims[0] * currentScale, this.dims[1] * currentScale);
  },
  finish: function(position) {
    if (this.restoreAfterFinish) this.element.setStyle(this.originalStyle);
  },
  setDimensions: function(height, width) {
    var d = { };
    if (this.options.scaleX) d.width = width.round() + 'px';
    if (this.options.scaleY) d.height = height.round() + 'px';
    if (this.options.scaleFromCenter) {
      var topd  = (height - this.dims[0])/2;
      var leftd = (width  - this.dims[1])/2;
      if (this.elementPositioning == 'absolute') {
        if (this.options.scaleY) d.top = this.originalTop-topd + 'px';
        if (this.options.scaleX) d.left = this.originalLeft-leftd + 'px';
      } else {
        if (this.options.scaleY) d.top = -topd + 'px';
        if (this.options.scaleX) d.left = -leftd + 'px';
      }
    }
    this.element.setStyle(d);
  }
});

Effect.Highlight = Class.create(Effect.Base, {
  initialize: function(element) {
    this.element = $(element);
    if (!this.element) throw(Effect._elementDoesNotExistError);
    var options = Object.extend({ startcolor: '#ffff99' }, arguments[1] || { });
    this.start(options);
  },
  setup: function() {
    // Prevent executing on elements not in the layout flow
    if (this.element.getStyle('display')=='none') { this.cancel(); return; }
    // Disable background image during the effect
    this.oldStyle = { };
    if (!this.options.keepBackgroundImage) {
      this.oldStyle.backgroundImage = this.element.getStyle('background-image');
      this.element.setStyle({backgroundImage: 'none'});
    }
    if (!this.options.endcolor)
      this.options.endcolor = this.element.getStyle('background-color').parseColor('#ffffff');
    if (!this.options.restorecolor)
      this.options.restorecolor = this.element.getStyle('background-color');
    // init color calculations
    this._base  = $R(0,2).map(function(i){ return parseInt(this.options.startcolor.slice(i*2+1,i*2+3),16) }.bind(this));
    this._delta = $R(0,2).map(function(i){ return parseInt(this.options.endcolor.slice(i*2+1,i*2+3),16)-this._base[i] }.bind(this));
  },
  update: function(position) {
    this.element.setStyle({backgroundColor: $R(0,2).inject('#',function(m,v,i){
      return m+((this._base[i]+(this._delta[i]*position)).round().toColorPart()); }.bind(this)) });
  },
  finish: function() {
    this.element.setStyle(Object.extend(this.oldStyle, {
      backgroundColor: this.options.restorecolor
    }));
  }
});

Effect.ScrollTo = function(element) {
  var options = arguments[1] || { },
  scrollOffsets = document.viewport.getScrollOffsets(),
  elementOffsets = $(element).cumulativeOffset();

  if (options.offset) elementOffsets[1] += options.offset;

  return new Effect.Tween(null,
    scrollOffsets.top,
    elementOffsets[1],
    options,
    function(p){ scrollTo(scrollOffsets.left, p.round()); }
  );
};

/* ------------- combination effects ------------- */

Effect.Fade = function(element) {
  element = $(element);
  var oldOpacity = element.getInlineOpacity();
  var options = Object.extend({
    from: element.getOpacity() || 1.0,
    to:   0.0,
    afterFinishInternal: function(effect) {
      if (effect.options.to!=0) return;
      effect.element.hide().setStyle({opacity: oldOpacity});
    }
  }, arguments[1] || { });
  return new Effect.Opacity(element,options);
};

Effect.Appear = function(element) {
  element = $(element);
  var options = Object.extend({
  from: (element.getStyle('display') == 'none' ? 0.0 : element.getOpacity() || 0.0),
  to:   1.0,
  // force Safari to render floated elements properly
  afterFinishInternal: function(effect) {
    effect.element.forceRerendering();
  },
  beforeSetup: function(effect) {
    effect.element.setOpacity(effect.options.from).show();
  }}, arguments[1] || { });
  return new Effect.Opacity(element,options);
};

Effect.Puff = function(element) {
  element = $(element);
  var oldStyle = {
    opacity: element.getInlineOpacity(),
    position: element.getStyle('position'),
    top:  element.style.top,
    left: element.style.left,
    width: element.style.width,
    height: element.style.height
  };
  return new Effect.Parallel(
   [ new Effect.Scale(element, 200,
      { sync: true, scaleFromCenter: true, scaleContent: true, restoreAfterFinish: true }),
     new Effect.Opacity(element, { sync: true, to: 0.0 } ) ],
     Object.extend({ duration: 1.0,
      beforeSetupInternal: function(effect) {
        Position.absolutize(effect.effects[0].element);
      },
      afterFinishInternal: function(effect) {
         effect.effects[0].element.hide().setStyle(oldStyle); }
     }, arguments[1] || { })
   );
};

Effect.BlindUp = function(element) {
  element = $(element);
  element.makeClipping();
  return new Effect.Scale(element, 0,
    Object.extend({ scaleContent: false,
      scaleX: false,
      restoreAfterFinish: true,
      afterFinishInternal: function(effect) {
        effect.element.hide().undoClipping();
      }
    }, arguments[1] || { })
  );
};

Effect.BlindDown = function(element) {
  element = $(element);
  var elementDimensions = element.getDimensions();
  return new Effect.Scale(element, 100, Object.extend({
    scaleContent: false,
    scaleX: false,
    scaleFrom: 0,
    scaleMode: {originalHeight: elementDimensions.height, originalWidth: elementDimensions.width},
    restoreAfterFinish: true,
    afterSetup: function(effect) {
      effect.element.makeClipping().setStyle({height: '0px'}).show();
    },
    afterFinishInternal: function(effect) {
      effect.element.undoClipping();
    }
  }, arguments[1] || { }));
};

Effect.SwitchOff = function(element) {
  element = $(element);
  var oldOpacity = element.getInlineOpacity();
  return new Effect.Appear(element, Object.extend({
    duration: 0.4,
    from: 0,
    transition: Effect.Transitions.flicker,
    afterFinishInternal: function(effect) {
      new Effect.Scale(effect.element, 1, {
        duration: 0.3, scaleFromCenter: true,
        scaleX: false, scaleContent: false, restoreAfterFinish: true,
        beforeSetup: function(effect) {
          effect.element.makePositioned().makeClipping();
        },
        afterFinishInternal: function(effect) {
          effect.element.hide().undoClipping().undoPositioned().setStyle({opacity: oldOpacity});
        }
      });
    }
  }, arguments[1] || { }));
};

Effect.DropOut = function(element) {
  element = $(element);
  var oldStyle = {
    top: element.getStyle('top'),
    left: element.getStyle('left'),
    opacity: element.getInlineOpacity() };
  return new Effect.Parallel(
    [ new Effect.Move(element, {x: 0, y: 100, sync: true }),
      new Effect.Opacity(element, { sync: true, to: 0.0 }) ],
    Object.extend(
      { duration: 0.5,
        beforeSetup: function(effect) {
          effect.effects[0].element.makePositioned();
        },
        afterFinishInternal: function(effect) {
          effect.effects[0].element.hide().undoPositioned().setStyle(oldStyle);
        }
      }, arguments[1] || { }));
};

Effect.Shake = function(element) {
  element = $(element);
  var options = Object.extend({
    distance: 20,
    duration: 0.5
  }, arguments[1] || {});
  var distance = parseFloat(options.distance);
  var split = parseFloat(options.duration) / 10.0;
  var oldStyle = {
    top: element.getStyle('top'),
    left: element.getStyle('left') };
    return new Effect.Move(element,
      { x:  distance, y: 0, duration: split, afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x: -distance*2, y: 0, duration: split*2,  afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x:  distance*2, y: 0, duration: split*2,  afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x: -distance*2, y: 0, duration: split*2,  afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x:  distance*2, y: 0, duration: split*2,  afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x: -distance, y: 0, duration: split, afterFinishInternal: function(effect) {
        effect.element.undoPositioned().setStyle(oldStyle);
  }}); }}); }}); }}); }}); }});
};

Effect.SlideDown = function(element) {
  element = $(element).cleanWhitespace();
  // SlideDown need to have the content of the element wrapped in a container element with fixed height!
  var oldInnerBottom = element.down().getStyle('bottom');
  var elementDimensions = element.getDimensions();
  return new Effect.Scale(element, 100, Object.extend({
    scaleContent: false,
    scaleX: false,
    scaleFrom: window.opera ? 0 : 1,
    scaleMode: {originalHeight: elementDimensions.height, originalWidth: elementDimensions.width},
    restoreAfterFinish: true,
    afterSetup: function(effect) {
      effect.element.makePositioned();
      effect.element.down().makePositioned();
      if (window.opera) effect.element.setStyle({top: ''});
      effect.element.makeClipping().setStyle({height: '0px'}).show();
    },
    afterUpdateInternal: function(effect) {
      effect.element.down().setStyle({bottom:
        (effect.dims[0] - effect.element.clientHeight) + 'px' });
    },
    afterFinishInternal: function(effect) {
      effect.element.undoClipping().undoPositioned();
      effect.element.down().undoPositioned().setStyle({bottom: oldInnerBottom}); }
    }, arguments[1] || { })
  );
};

Effect.SlideUp = function(element) {
  element = $(element).cleanWhitespace();
  var oldInnerBottom = element.down().getStyle('bottom');
  var elementDimensions = element.getDimensions();
  return new Effect.Scale(element, window.opera ? 0 : 1,
   Object.extend({ scaleContent: false,
    scaleX: false,
    scaleMode: 'box',
    scaleFrom: 100,
    scaleMode: {originalHeight: elementDimensions.height, originalWidth: elementDimensions.width},
    restoreAfterFinish: true,
    afterSetup: function(effect) {
      effect.element.makePositioned();
      effect.element.down().makePositioned();
      if (window.opera) effect.element.setStyle({top: ''});
      effect.element.makeClipping().show();
    },
    afterUpdateInternal: function(effect) {
      effect.element.down().setStyle({bottom:
        (effect.dims[0] - effect.element.clientHeight) + 'px' });
    },
    afterFinishInternal: function(effect) {
      effect.element.hide().undoClipping().undoPositioned();
      effect.element.down().undoPositioned().setStyle({bottom: oldInnerBottom});
    }
   }, arguments[1] || { })
  );
};

// Bug in opera makes the TD containing this element expand for a instance after finish
Effect.Squish = function(element) {
  return new Effect.Scale(element, window.opera ? 1 : 0, {
    restoreAfterFinish: true,
    beforeSetup: function(effect) {
      effect.element.makeClipping();
    },
    afterFinishInternal: function(effect) {
      effect.element.hide().undoClipping();
    }
  });
};

Effect.Grow = function(element) {
  element = $(element);
  var options = Object.extend({
    direction: 'center',
    moveTransition: Effect.Transitions.sinoidal,
    scaleTransition: Effect.Transitions.sinoidal,
    opacityTransition: Effect.Transitions.full
  }, arguments[1] || { });
  var oldStyle = {
    top: element.style.top,
    left: element.style.left,
    height: element.style.height,
    width: element.style.width,
    opacity: element.getInlineOpacity() };

  var dims = element.getDimensions();
  var initialMoveX, initialMoveY;
  var moveX, moveY;

  switch (options.direction) {
    case 'top-left':
      initialMoveX = initialMoveY = moveX = moveY = 0;
      break;
    case 'top-right':
      initialMoveX = dims.width;
      initialMoveY = moveY = 0;
      moveX = -dims.width;
      break;
    case 'bottom-left':
      initialMoveX = moveX = 0;
      initialMoveY = dims.height;
      moveY = -dims.height;
      break;
    case 'bottom-right':
      initialMoveX = dims.width;
      initialMoveY = dims.height;
      moveX = -dims.width;
      moveY = -dims.height;
      break;
    case 'center':
      initialMoveX = dims.width / 2;
      initialMoveY = dims.height / 2;
      moveX = -dims.width / 2;
      moveY = -dims.height / 2;
      break;
  }

  return new Effect.Move(element, {
    x: initialMoveX,
    y: initialMoveY,
    duration: 0.01,
    beforeSetup: function(effect) {
      effect.element.hide().makeClipping().makePositioned();
    },
    afterFinishInternal: function(effect) {
      new Effect.Parallel(
        [ new Effect.Opacity(effect.element, { sync: true, to: 1.0, from: 0.0, transition: options.opacityTransition }),
          new Effect.Move(effect.element, { x: moveX, y: moveY, sync: true, transition: options.moveTransition }),
          new Effect.Scale(effect.element, 100, {
            scaleMode: { originalHeight: dims.height, originalWidth: dims.width },
            sync: true, scaleFrom: window.opera ? 1 : 0, transition: options.scaleTransition, restoreAfterFinish: true})
        ], Object.extend({
             beforeSetup: function(effect) {
               effect.effects[0].element.setStyle({height: '0px'}).show();
             },
             afterFinishInternal: function(effect) {
               effect.effects[0].element.undoClipping().undoPositioned().setStyle(oldStyle);
             }
           }, options)
      );
    }
  });
};

Effect.Shrink = function(element) {
  element = $(element);
  var options = Object.extend({
    direction: 'center',
    moveTransition: Effect.Transitions.sinoidal,
    scaleTransition: Effect.Transitions.sinoidal,
    opacityTransition: Effect.Transitions.none
  }, arguments[1] || { });
  var oldStyle = {
    top: element.style.top,
    left: element.style.left,
    height: element.style.height,
    width: element.style.width,
    opacity: element.getInlineOpacity() };

  var dims = element.getDimensions();
  var moveX, moveY;

  switch (options.direction) {
    case 'top-left':
      moveX = moveY = 0;
      break;
    case 'top-right':
      moveX = dims.width;
      moveY = 0;
      break;
    case 'bottom-left':
      moveX = 0;
      moveY = dims.height;
      break;
    case 'bottom-right':
      moveX = dims.width;
      moveY = dims.height;
      break;
    case 'center':
      moveX = dims.width / 2;
      moveY = dims.height / 2;
      break;
  }

  return new Effect.Parallel(
    [ new Effect.Opacity(element, { sync: true, to: 0.0, from: 1.0, transition: options.opacityTransition }),
      new Effect.Scale(element, window.opera ? 1 : 0, { sync: true, transition: options.scaleTransition, restoreAfterFinish: true}),
      new Effect.Move(element, { x: moveX, y: moveY, sync: true, transition: options.moveTransition })
    ], Object.extend({
         beforeStartInternal: function(effect) {
           effect.effects[0].element.makePositioned().makeClipping();
         },
         afterFinishInternal: function(effect) {
           effect.effects[0].element.hide().undoClipping().undoPositioned().setStyle(oldStyle); }
       }, options)
  );
};

Effect.Pulsate = function(element) {
  element = $(element);
  var options    = arguments[1] || { },
    oldOpacity = element.getInlineOpacity(),
    transition = options.transition || Effect.Transitions.linear,
    reverser   = function(pos){
      return 1 - transition((-Math.cos((pos*(options.pulses||5)*2)*Math.PI)/2) + .5);
    };

  return new Effect.Opacity(element,
    Object.extend(Object.extend({  duration: 2.0, from: 0,
      afterFinishInternal: function(effect) { effect.element.setStyle({opacity: oldOpacity}); }
    }, options), {transition: reverser}));
};

Effect.Fold = function(element) {
  element = $(element);
  var oldStyle = {
    top: element.style.top,
    left: element.style.left,
    width: element.style.width,
    height: element.style.height };
  element.makeClipping();
  return new Effect.Scale(element, 5, Object.extend({
    scaleContent: false,
    scaleX: false,
    afterFinishInternal: function(effect) {
    new Effect.Scale(element, 1, {
      scaleContent: false,
      scaleY: false,
      afterFinishInternal: function(effect) {
        effect.element.hide().undoClipping().setStyle(oldStyle);
      } });
  }}, arguments[1] || { }));
};

Effect.Morph = Class.create(Effect.Base, {
  initialize: function(element) {
    this.element = $(element);
    if (!this.element) throw(Effect._elementDoesNotExistError);
    var options = Object.extend({
      style: { }
    }, arguments[1] || { });

    if (!Object.isString(options.style)) this.style = $H(options.style);
    else {
      if (options.style.include(':'))
        this.style = options.style.parseStyle();
      else {
        this.element.addClassName(options.style);
        this.style = $H(this.element.getStyles());
        this.element.removeClassName(options.style);
        var css = this.element.getStyles();
        this.style = this.style.reject(function(style) {
          return style.value == css[style.key];
        });
        options.afterFinishInternal = function(effect) {
          effect.element.addClassName(effect.options.style);
          effect.transforms.each(function(transform) {
            effect.element.style[transform.style] = '';
          });
        };
      }
    }
    this.start(options);
  },

  setup: function(){
    function parseColor(color){
      if (!color || ['rgba(0, 0, 0, 0)','transparent'].include(color)) color = '#ffffff';
      color = color.parseColor();
      return $R(0,2).map(function(i){
        return parseInt( color.slice(i*2+1,i*2+3), 16 );
      });
    }
    this.transforms = this.style.map(function(pair){
      var property = pair[0], value = pair[1], unit = null;

      if (value.parseColor('#zzzzzz') != '#zzzzzz') {
        value = value.parseColor();
        unit  = 'color';
      } else if (property == 'opacity') {
        value = parseFloat(value);
        if (Prototype.Browser.IE && (!this.element.currentStyle.hasLayout))
          this.element.setStyle({zoom: 1});
      } else if (Element.CSS_LENGTH.test(value)) {
          var components = value.match(/^([\+\-]?[0-9\.]+)(.*)$/);
          value = parseFloat(components[1]);
          unit = (components.length == 3) ? components[2] : null;
      }

      var originalValue = this.element.getStyle(property);
      return {
        style: property.camelize(),
        originalValue: unit=='color' ? parseColor(originalValue) : parseFloat(originalValue || 0),
        targetValue: unit=='color' ? parseColor(value) : value,
        unit: unit
      };
    }.bind(this)).reject(function(transform){
      return (
        (transform.originalValue == transform.targetValue) ||
        (
          transform.unit != 'color' &&
          (isNaN(transform.originalValue) || isNaN(transform.targetValue))
        )
      );
    });
  },
  update: function(position) {
    var style = { }, transform, i = this.transforms.length;
    while(i--)
      style[(transform = this.transforms[i]).style] =
        transform.unit=='color' ? '#'+
          (Math.round(transform.originalValue[0]+
            (transform.targetValue[0]-transform.originalValue[0])*position)).toColorPart() +
          (Math.round(transform.originalValue[1]+
            (transform.targetValue[1]-transform.originalValue[1])*position)).toColorPart() +
          (Math.round(transform.originalValue[2]+
            (transform.targetValue[2]-transform.originalValue[2])*position)).toColorPart() :
        (transform.originalValue +
          (transform.targetValue - transform.originalValue) * position).toFixed(3) +
            (transform.unit === null ? '' : transform.unit);
    this.element.setStyle(style, true);
  }
});

Effect.Transform = Class.create({
  initialize: function(tracks){
    this.tracks  = [];
    this.options = arguments[1] || { };
    this.addTracks(tracks);
  },
  addTracks: function(tracks){
    tracks.each(function(track){
      track = $H(track);
      var data = track.values().first();
      this.tracks.push($H({
        ids:     track.keys().first(),
        effect:  Effect.Morph,
        options: { style: data }
      }));
    }.bind(this));
    return this;
  },
  play: function(){
    return new Effect.Parallel(
      this.tracks.map(function(track){
        var ids = track.get('ids'), effect = track.get('effect'), options = track.get('options');
        var elements = [$(ids) || $$(ids)].flatten();
        return elements.map(function(e){ return new effect(e, Object.extend({ sync:true }, options)) });
      }).flatten(),
      this.options
    );
  }
});

Element.CSS_PROPERTIES = $w(
  'backgroundColor backgroundPosition borderBottomColor borderBottomStyle ' +
  'borderBottomWidth borderLeftColor borderLeftStyle borderLeftWidth ' +
  'borderRightColor borderRightStyle borderRightWidth borderSpacing ' +
  'borderTopColor borderTopStyle borderTopWidth bottom clip color ' +
  'fontSize fontWeight height left letterSpacing lineHeight ' +
  'marginBottom marginLeft marginRight marginTop markerOffset maxHeight '+
  'maxWidth minHeight minWidth opacity outlineColor outlineOffset ' +
  'outlineWidth paddingBottom paddingLeft paddingRight paddingTop ' +
  'right textIndent top width wordSpacing zIndex');

Element.CSS_LENGTH = /^(([\+\-]?[0-9\.]+)(em|ex|px|in|cm|mm|pt|pc|\%))|0$/;

String.__parseStyleElement = document.createElement('div');
String.prototype.parseStyle = function(){
  var style, styleRules = $H();
  if (Prototype.Browser.WebKit)
    style = new Element('div',{style:this}).style;
  else {
    String.__parseStyleElement.innerHTML = parseHTML('<div style="' + this + '"></div>');
    style = String.__parseStyleElement.childNodes[0].style;
  }

  Element.CSS_PROPERTIES.each(function(property){
    if (style[property]) styleRules.set(property, style[property]);
  });

  if (Prototype.Browser.IE && this.include('opacity'))
    styleRules.set('opacity', this.match(/opacity:\s*((?:0|1)?(?:\.\d*)?)/)[1]);

  return styleRules;
};

if (document.defaultView && document.defaultView.getComputedStyle) {
  Element.getStyles = function(element) {
    var css = document.defaultView.getComputedStyle($(element), null);
    return Element.CSS_PROPERTIES.inject({ }, function(styles, property) {
      styles[property] = css[property];
      return styles;
    });
  };
} else {
  Element.getStyles = function(element) {
    element = $(element);
    var css = element.currentStyle, styles;
    styles = Element.CSS_PROPERTIES.inject({ }, function(results, property) {
      results[property] = css[property];
      return results;
    });
    if (!styles.opacity) styles.opacity = element.getOpacity();
    return styles;
  };
}

Effect.Methods = {
  morph: function(element, style) {
    element = $(element);
    new Effect.Morph(element, Object.extend({ style: style }, arguments[2] || { }));
    return element;
  },
  visualEffect: function(element, effect, options) {
    element = $(element);
    var s = effect.dasherize().camelize(), klass = s.charAt(0).toUpperCase() + s.substring(1);
    new Effect[klass](element, options);
    return element;
  },
  highlight: function(element, options) {
    element = $(element);
    new Effect.Highlight(element, options);
    return element;
  }
};

$w('fade appear grow shrink fold blindUp blindDown slideUp slideDown '+
  'pulsate shake puff squish switchOff dropOut').each(
  function(effect) {
    Effect.Methods[effect] = function(element, options){
      element = $(element);
      Effect[effect.charAt(0).toUpperCase() + effect.substring(1)](element, options);
      return element;
    };
  }
);

$w('getInlineOpacity forceRerendering setContentZoom collectTextNodes collectTextNodesIgnoreClass getStyles').each(
  function(f) { Effect.Methods[f] = Element[f]; }
);

Element.addMethods(Effect.Methods);

// protoHover
// a simple hover implementation for prototype.js
// Sasha Sklar and David Still

(function() {
	// copied from jquery
	var withinElement = function(evt, el) {
		// Check if mouse(over|out) are still within the same parent element
		var parent = evt.relatedTarget;

		// Traverse up the tree
		while (parent && parent != el) {
			try {
				parent = parent.parentNode;
			} catch (error) {
				parent = el;
			}
		}
		// Return true if we actually just moused on to a sub-element
		return parent == el;
	};

	// Extend event with mouseEnter and mouseLeave
	Object.extend(Event, {
		mouseEnter: function(element, f, options) {
			element = $(element);

			// curry the delay into f
			var fc = (options && options.enterDelay)?(function(){window.setTimeout(f, options.enterDelay);}):(f);

			if (Prototype.Browser.IE) {
				element.observe('mouseenter', fc);
			} else {
				element.hovered = false;

				element.observe('mouseover', function(evt) {
					// conditions to fire the mouseover
					// mouseover is simple, the only change to default behavior is we don't want hover fireing multiple times on one element
					if (!element.hovered) {
						// set hovered to true
						element.hovered = true;

						// fire the mouseover function
						fc(evt);
					}
				});
			}
		},
		mouseLeave: function(element, f, options) {
			element = $(element);

			// curry the delay into f
			var fc = (options && options.leaveDelay)?(function(){window.setTimeout(f, options.leaveDelay);}):(f);

			if (Prototype.Browser.IE) {
				element.observe('mouseleave', fc);
			} else {
				element.observe('mouseout', function(evt) {
					// get the element that fired the event
					// use the old syntax to maintain compatibility w/ prototype 1.5x
					var target = Event.element(evt);

					// conditions to fire the mouseout
					// if we leave the element we're observing
					if (!withinElement(evt, element)) {
						// fire the mouseover function
						fc(evt);

						// set hovered to false
						element.hovered = false;
					}
				});
			}
		}
	});


	// add method to Prototype extended element
	Element.addMethods({
		'hover': function(element, mouseEnterFunc, mouseLeaveFunc, options) {
			options = Object.extend({}, options) || {};
			Event.mouseEnter(element, mouseEnterFunc, options);
			Event.mouseLeave(element, mouseLeaveFunc, options);
		}
	});
})();



var PHover = Class.create({
	initialize: function(hover_div, position_div, options) {
		this.options = Object.extend({
			top_active_area_px: 35,
			y_offset: 0
		}, options || {} );
		
		this.hover_div = $(hover_div);
		this.position_div = $(position_div);
		this.child_divs = new Array();
		this.child_div_position = new Hash();
		this.setup();
		this.t_dim = null;
		this.t_off = null;
	},
	setup: function() {
		this.hover_div.hover(this.hoverHandler.bindAsEventListener(this), function() {});
		
	},
	mouseHandler: function(evt) {
		if (this.t_dim && this.t_off) {
			var x = Event.pointerX(evt);
			var y = Event.pointerY(evt);
			
			// console.log('xy: ' + x + ',' + y);
			if (x > this.t_off.left && x < this.t_off.left + this.t_dim.width &&
				 y > (this.t_off.top - this.options.top_active_area_px) && y < (this.t_off.top + this.t_dim.height)) {
					
			} else {
				// console.log('hiding ' + this.position_div.id + ' pos ' + x + ',' + y + ' dim ' + this.t_dim.width + 'x' + this.t_dim.height + ' offset top ' + this.t_off.top + ' left ' + this.t_off.left);
				
				this.unhoverHandler();
			}	
		}
	},
	show: function() {
		this.hoverHandler();
	},
	hoverHandler: function() {
		document.observe('mousemove', this.mouseHandler.bindAsEventListener(this));
		var dim = this.t_dim = this.hover_div.getDimensions();
		var off = this.t_off = this.hover_div.cumulativeOffset();
		
		
		var pos_dim = this.position_div.getDimensions();
		var pos_off = this.position_div.cumulativeOffset();

		// console.log('hovering position_div ' + this.position_div.id + ' dim ' + dim.width + 'x' + dim.height + ' offset top ' + off.top + ' left ' + off.left);
		
		this.child_divs.each(function(div) {
			this.position_child_div(pos_dim, pos_off, div);
			div.show();
		}.bind(this));
	},
	position_child_div: function(pos_dim, pos_off, div) {
		var new_div_style = {
				position: 'absolute', 
				top: (pos_off.top - div.getHeight() + this.options.y_offset) + 'px'
		};
		
		if (this.child_div_position.get(div.getAttribute('id')) == 'topright') {
			new_div_style.left = (pos_off.left + pos_dim.width - div.getWidth()) + 'px';
		} else {
			new_div_style.left = pos_off.left + 'px';
		}
		// console.log('child div ' + div.getAttribute('id') + ' ' + this.child_div_position.get(div.getAttribute('id')) + ' left ' + new_div_style.left + ' div width ' + div.getWidth());
		div.setStyle(new_div_style);
	},
	reposition: function(child_div) {
		var pos_dim = this.position_div.getDimensions();
		var pos_off = this.position_div.cumulativeOffset();
		this.position_child_div(pos_dim, pos_off, $(child_div))
	},
	unhoverHandler: function() {
		document.stopObserving('mousemove', this.mouseHandler.bindAsEventListener(this));
		this.t_dim = null;
		this.t_off = null;
		
		this.child_divs.each(function(div) {
			if (!div.hasClassName('phover_donothide'))
				div.hide();
		});
	},
	addChildDiv: function(child_div, position) {
		this.child_divs.push($(child_div));
		this.child_div_position.set($(child_div).id, position);
		$(child_div).hide();
		
	}
});

PHover.created_hovers = new Hash();
PHover.factory_create = function(hover_div, position_div, options) {
	if (!$(hover_div)) return;
	var existing = PHover.created_hovers.get($(hover_div).getAttribute('id'));
	if (existing) {
		return existing;
	} else {
		var new_phover = new PHover(hover_div, position_div, options);
		PHover.created_hovers.set($(hover_div).getAttribute('id'), new_phover);
		return new_phover;
	}
};

if (typeof PSlideGallery2 == "undefined") {

	var pgallery_stopclick = function(e) {
	    Event.stop(e);
	};
	
	var loadingDiv = new Element('div', {
		'style': 'width: 500; padding-top: 158px; padding-bottom: 159px;text-align: center; border: 1px solid #aaa;'
	});
	var loadingImage = new Image();
	loadingImage.src = parseURL('http://www.posterous.com/images/loading.gif');
	loadingImage.width = 16;
	loadingImage.height = 16;
	Element.extend(loadingImage).setAttribute('id', 'mainImage');
	Element.extend(loadingImage).setAttribute('style', 'border: none;');
	loadingDiv.appendChild(loadingImage);
	
	var PImage2 = Class.create({
		initialize: function(fields){
			this.url = fields['main'];
			this.width = fields['width'];
			this.height = fields['height'];
			
			this.largeUrl = fields['large'];
			this.largeWidth = fields['largeWidth'];
			this.largeHeight = fields['largeHeight'];
			
			this.originalUrl = fields['original'];
			this.originalWidth = fields['originalWidth'];
			this.originalHeight = fields['originalHeight'];
			this.originalSize = fields['originalSize'];
			
			if (fields['thumb'] == null) {	/* set default */
				this.thumbUrl = 'http://posterous.com/images/spacer.gif';
				this.thumbWidth = 36;
				this.thumbHeight = 36;
			} else {
				this.thumbUrl = fields['thumb'];
				this.thumbWidth = fields['thumbWidth'];
				this.thumbHeight = fields['thumbHeight'];
			}
			
			this.imageObj = Element.extend(new Image());
			this.imageObj.observe('load', this.imageLoaded.bindAsEventListener(this));
			this.imageObj.src = parseURL(this.url);
			
			if (this.width) 	this.imageObj.width = this.width;
			if (this.height) 	this.imageObj.height = this.height;
			
			this.loaded = false;
			
			Element.extend(this.imageObj).setAttribute('id', 'mainImage')
		},
		imageLoaded: function(){
			this.loaded = true;
			if (this.loadCallback != null) {
				this.loadCallback(this.imageObj, this.loadCallback_meref);
				this.loadCallback = null;
			}
		},
		getMainImage: function(callback, callingObj){
			if (this.loaded == true) {
				callback(this.imageObj, callingObj);
				//  for test of loading div only
				//			callback(loadingDiv, callingObj);
			}
			else {
				callback(loadingDiv, callingObj);
				this.loadCallback = callback;
				this.loadCallback_meref = callingObj;
			}
		}
		
	})
	

	var PSlideGallery2 = Class.create({
		initialize: function(galleryDiv, urls, options){
			this.galleryDiv = galleryDiv;
			
			this.zipFile = options['zipFile'];
			this.zipFileSize = options['zipFileSize'];
			this.showDownload = options['showDownload'];
			this.externalUrl = options['external_url'];
			
			this.imageList = new Array();
			for (var i = 0; i < urls.length; i++) {
				this.imageList.push(new PImage2(urls[i]));
			}
			this.idx = 0;
			
			if (this.imageList.length == 1 && this.imageList[0].largeWidth <= 500 && !this.externalUrl) // && this.imageList[0].largeHeight <= 500)
				return;
			this.galleryDiv.update('');	// clear nojs fallback html
			this.generateGallery();
			document.observe('keyup', this.handleKeyboard.bindAsEventListener(this));

		},

		generateGallery: function(){
		
			if (this.imageList.length > 1) {
				var controlDiv = new Element('div', {
					'style': 'margin-bottom: 3px;'
				});
			
				var leftLink = new Element('a', {
					'href': '#',
					'onclick': 'return false;',
					'style': 'vertical-align: middle;'
				});
				var leftArrow = "<img src='/images/arrowleft.gif' border=0>";
				leftLink.update(leftArrow);
				controlDiv.appendChild(leftLink);
			
				var spacer = document.createTextNode(" ")
				controlDiv.appendChild(spacer);
			
				var rightLink = new Element('a', {
					'href': '#',
					'onclick': 'return false;',
					'style': 'vertical-align: middle;'
				});
				var rightArrow = "<img src='/images/arrowright.gif' border=0>";
				rightLink.update(rightArrow);
				controlDiv.appendChild(rightLink)
			
				this.labelSpan = new Element('span');
				this.labelSpan.addClassName('galleryLabel');
				this.labelSpan.update("1 of " + this.imageList.length);
				controlDiv.appendChild(this.labelSpan);
			
				this.registerPrev(leftLink);
				this.registerNext(rightLink);
			
				this.galleryDiv.appendChild(controlDiv);			
			
			
				// set up thumbnails
				var thumbDiv = new Element('div', {
					'style': 'margin-bottom: 2px'
				});
				this.galleryDiv.appendChild(thumbDiv);
				for (var i = 0; i < this.imageList.length; i++) {
					var img = this.imageList[i];
					if (img == null) // || img.thumbUrl == null)  handle null thumb
						continue;
					var thumbLink = new Element('a', {
						'href': '#',
						'onClick': 'return false;',
						'style': 'margin-right: 5px !important;'
					});
					var thumbImg = new Element('img', {
						'src': 		img.thumbUrl,
						'width': 	img.thumbWidth,
						'height': 	img.thumbWidth
					});
					thumbLink.appendChild(thumbImg);
					thumbDiv.appendChild(thumbLink);
					img.thumbLink = thumbLink;
					this.registerThumb(i, thumbLink);
				
					if (i == 0) {
						thumbLink.addClassName('gallerySelectedImage');
					}
				
				}
			}
			this.mainLink = new Element('a', {
				'href': '#',
				'onClick': 'return false;'
			});
			this.mainLink.addClassName('posterousGalleryMainlink');
			this.mainImage = this.imageList[this.idx].imageObj;
			this.mainLink.appendChild(this.mainImage);
			this.galleryDiv.appendChild(this.mainLink);
			this.setupCommandPanel();
			
			this.registerMainImage(this.mainImage);
		},
		setupCommandPanel: function() {

			if (this.commandSpan == null) {
				this.commandSpan = new Element('span');
				this.commandSpan.addClassName('show');
				
				var div1 = new Element('div', {'style':'color: #fff; font-size: 14px;', 'id' : this.galleryDiv.id-"-click"})
				div1.update(this.externalUrl ? "Click to view link" : "Click to view large");
				
				if (this.imageList[this.idx].originalSize) {
					var div2 = new Element('div', {'style':'font-size: 14px;', 'id' : this.galleryDiv.id-"-dl1"})
					div2.addClassName('posterousGalleryLink');
					div2.update("Download full size ("+this.imageList[this.idx].originalSize+" KB)")
				}
				
				var div3 = new Element('div', {'style':'font-size: 14px;', 'id' : this.galleryDiv.id-"-dl2"})
				div3.addClassName('posterousGalleryLink');
				div3.update("Download this gallery (ZIP, " + this.zipFileSize + " KB)");
				
				this.commandDiv1 = div1;
 				this.commandDiv2 = div2; 
				this.commandDiv3 = div3; 									
				
				this.commandSpan.appendChild(div1);
				if (this.showDownload) {
					this.commandSpan.appendChild(div3);
					this.commandSpan.appendChild(div2);
					div2.observe('click',  this.clickDownloadFull.bindAsEventListener(this));						
					div3.observe('click', this.clickDownloadGallery.bindAsEventListener(this));
				}
				div1.observe('click',  this.handleClick.bindAsEventListener(this));
				
				this.mainLink.appendChild(this.commandSpan);
			}
			var isSmall = (this.imageList[this.idx].largeWidth <= 500 && this.imageList[this.idx].largeHeight <= 500 && !this.externalUrl);
			var hasZipFile = (this.zipFile != null);
			
			if (!isSmall) {
				this.commandDiv1.show(); 
				this.commandDiv2.show();
				
			} else {
				this.commandDiv1.hide(); 
				this.commandDiv2.hide();
			}
			
			if (hasZipFile) {
				this.commandDiv3.show();
			} else {
				this.commandDiv3.hide();
			}
			
			if (!this.showDownload) {
				if (isSmall) {
					this.commandSpan.removeClassName('show');
				} else {
					this.commandSpan.addClassName('show');
				}
			}
			
		},
		clickDownloadFull: function() {
			window.open(this.imageList[this.idx].originalUrl,"gl");
		},
		clickDownloadGallery: function() {
			window.open(this.zipFile,"gl");
		},
		registerThumb: function(idx, thumbLink){
			thumbLink.observe('mousedown', this.handleThumbClick.bindAsEventListener(this, idx));
			Event.observe(thumbLink, 'click', pgallery_stopclick, false);			
		},
		handleThumbClick: function(){
			var clickedIdx = $A(arguments)[1];
			this.setIndex(clickedIdx);
		},
		getCurrentPImage: function(){
			return this.imageList[this.idx];
		},
		registerMainImage: function(mainImage){
			this.mainImage.observe('mousedown', this.handleClick.bindAsEventListener(this));
		},
		unregisterMainImage: function(mainImage){
			this.mainImage.stopObserving('mousedown', this.handleClick.bindAsEventListener(this));
		},
		
		handleClick: function(evt){
			Event.stop(evt);
			if (this.externalUrl) {
				document.location.href = parseURL(this.externalUrl);
			} else {
				this.setupLargeImage();
			}
		},
		setupLargeImage: function() {
			var current = this.getCurrentPImage();
			if (current.largeUrl != null) {
				var modal = Control.Modal.open(
					"<a href='#' onClick='Control.Modal.close();return false;'><img src='" + current.largeUrl + "'" +
					" width='" +
					current.largeWidth +
					"'" +
					" height='" +
					current.largeHeight +
					"'" +
					"id='posterousGalleryExpandedImg_"+ this.galleryDiv.id +"'></a>", ,"gl"
					{ opacity: 0.6 });
			}
		},
		
		registerPrev: function(prevLink){
			prevLink.observe('mousedown', this.prevButtonClick.bindAsEventListener(this));
			Event.observe(prevLink, 'click', pgallery_stopclick, false);
		},
		
		isVisibleInViewport: function() {
			var topOffset =  $(this.galleryDiv).viewportOffset().top;
			return topOffset >= -200 && topOffset <= document.viewport.getHeight() - 200;
		},
		
		handleKeyboard: function(evt) {
			if (!this.isVisibleInViewport()) return;
			var key = evt.charCode || evt.keyCode;

			if (key == 37) this.prev();
			else if (key == 39) this.next();
			
		},
		
		
		prevButtonClick: function(){
			this.prev();
		},
		prev: function(){
			if (this.idx == 0) 
				this.setIndex(this.imageList.length - 1);
			else 
				this.setIndex(this.idx - 1);
		},
		registerNext: function(nextLink){
			nextLink.observe('mousedown', this.nextButtonClick.bindAsEventListener(this));
			Event.observe(nextLink, 'click', pgallery_stopclick, false);						
		},
		nextButtonClick: function(){
			this.next();
		},
		next: function(){
			if (this.idx == this.imageList.length - 1) 
				this.setIndex(0);
			else 
				this.setIndex(this.idx + 1);
		},
		setIndex: function(nextIndex){
		
			if (this.imageList[nextIndex].thumbUrl != null) {
				this.imageList[this.idx].thumbLink.removeClassName('gallerySelectedImage');
				this.imageList[nextIndex].thumbLink.addClassName('gallerySelectedImage');
			}
			this.idx = nextIndex;
			this.labelSpan.update((this.idx + 1) + " of " + this.imageList.length);
			this.imageList[this.idx].getMainImage(this.setMainImage, this);
			
			if (Control.Modal.current && $('posterousGalleryExpandedImg_' + this.galleryDiv.id)) {
				this.setupLargeImage();
			}
			
		},
		setMainImage: function(nextImage, me){
			if (me == null) me = this;
			if (nextImage == null) return;
			me.unregisterMainImage(me.mainImage);
			$(me.mainImage).replace(nextImage);
			me.mainImage = nextImage;
			me.registerMainImage(me.mainImage);
			me.setupCommandPanel();
		}
	
	});
	
}

/* 
 * Posterous Widget Gallery
 * 
 * Copyright 2008 posterous.com All Rights Reserved 
 * garry@posterous.com
 */

if (PWidgets == null) {

	var PWidgets = "loaded";
//	alert("this is run");
	
	Event.observe(window, 'load',
		function() { 
  		    var items = $$('div.post img');
			for (var i = 0; i < items.length; i++) {
				var img = items[i];
				if (img.width > 500) {
					new PosterousLargeExternal(img);
				}
			}
		}
	);
	
	var PosterousLargeExternal = Class.create({
		initialize: function(element){
			this.element = element;
			this.oldWidth = element.width;
			this.oldHeight = element.height;
			element.observe('click', this.handleClick.bindAsEventListener(this));
			
			var newdim = posterous_resize_image(element.width, element.height, 500);
			if (newdim != null) {
				element.width = newdim[0];
				element.height = newdim[1];
			}
			element.addClassName('pointer_cursor');	
		},
		handleClick: function() {
			var modal = Control.Modal.open(
				"<a href='#' onClick='Control.Modal.close();return false;'>"+
				"<img src='" + this.element.src + "'" +
				" width='" + this.oldWidth + "'" + " height='" + this.oldHeight + "'" + "></a>", ,"gl"
				{ opacity: 0.6 });
		}
	});
	
	
	
	function posterous_resize_image(width, height, maxWidth) {
		if (width > maxWidth) {
			return [maxWidth, maxWidth * height / width];
		} else {
			return null;
		}
	}

	var pw_stopclick = function(e) {
	    Event.stop(e);
	};

}

/**
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
if(typeof deconcept=="undefined"){var deconcept=new Object();}if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){if(!document.getElementById){return;}this.DETECT_KEY=_a?_a:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(_1){this.setAttribute("swf",_1);}if(id){this.setAttribute("id",id);}if(w){this.setAttribute("width",w);}if(h){this.setAttribute("height",h);}if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(c){this.addParam("bgcolor",c);}var q=_7?_7:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var _c=(_8)?_8:window.location;this.setAttribute("xiRedirectUrl",_c);this.setAttribute("redirectUrl","");if(_9){this.setAttribute("redirectUrl",_9);}};deconcept.SWFObject.prototype={useExpressInstall:function(_d){this.xiSWFPath=!_d?"expressinstall.swf":_d;this.setAttribute("useExpressInstall",true);},setAttribute:function(_e,_f){this.attributes[_e]=_f;},getAttribute:function(_10){return this.attributes[_10];},addParam:function(_11,_12){this.params[_11]=_12;},getParams:function(){return this.params;},addVariable:function(_13,_14){this.variables[_13]=_14;},getVariable:function(_15){return this.variables[_15];},getVariables:function(){return this.variables;},getVariablePairs:function(){var _16=new Array();var key;var _18=this.getVariables();for(key in _18){_16[_16.length]=key+"="+_18[key];}return _16;},getSWFHTML:function(){var _19="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\"";_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var _1a=this.getParams();for(var key in _1a){_19+=[key]+"=\""+_1a[key]+"\" ";}var _1c=this.getVariablePairs().join("&");if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}_19+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";var _1d=this.getParams();for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}_19+="</object>";}return _19;},write:function(_20){if(this.getAttribute("useExpressInstall")){var _21=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=(typeof _20=="string")?document.getElementById(_20):_20;n.innerHTML=parseHTML(this.getSWFHTML());return true;}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(parseURL(this.getAttribute("redirectUrl")));}}return false;}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var _23=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var axo=1;var _26=3;while(axo){try{_26++;axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);_23=new deconcept.PlayerVersion([_26,0,0]);}catch(e){axo=null;}}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}}return _23;};deconcept.PlayerVersion=function(_29){this.major=_29[0]!=null?parseInt(_29[0]):0;this.minor=_29[1]!=null?parseInt(_29[1]):0;this.rev=_29[2]!=null?parseInt(_29[2]):0;};deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false;}if(this.major>fv.major){return true;}if(this.minor<fv.minor){return false;}if(this.minor>fv.minor){return true;}if(this.rev<fv.rev){return false;}return true;};deconcept.util={getRequestParameter:function(_2b){var q=document.location.search||document.location.hash;if(_2b==null){return q;}if(q){var _2d=q.substring(1).split("&");for(var i=0;i<_2d.length;i++){if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){return _2d[i].substring((_2d[i].indexOf("=")+1));}}}return "";}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var _2f=document.getElementsByTagName("OBJECT");for(var i=_2f.length-1;i>=0;i--){_2f[i].style.display="none";for(var x in _2f[i]){if(typeof _2f[i][x]=="function"){_2f[i][x]=function(){};}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(id){return document.all[id];};}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;


var PFavorite = Class.create({

	initialize: function(hoverContainer, positionContainer, postid, isFaved, options) {
		this.options = Object.extend({
			y_offset: 20
		}, options || {} );
	
		this.hoverContainer = $(hoverContainer);
		this.positionContainer = $(positionContainer);
		this.postid = postid;
		this.isFaved = isFaved;
		this.mouseoverHandler 	= this.mouseoverHandler_delegate.bindAsEventListener(this);
		this.mouseoutHandler 	= this.mouseoutHandler_delegate.bindAsEventListener(this);
		this.clickHandler 		= this.clickHandler_delegate.bindAsEventListener(this);
		this.isLoading = false;

		this.createFavPanel();
		
		this.tooltip			= PHover.factory_create(hoverContainer, positionContainer, this.options);
		this.tooltip.addChildDiv(this.favpanel, 'topright');
			// this.favpanel, {'position': 'upperright', 'marginTop': 2});
		
		this.favpanel.observe('mouseover', this.mouseoverHandler);
		this.favpanel.observe('mouseout', this.mouseoutHandler);
		this.favpanel.observe('click', this.clickHandler);
	},
	
	createFavPanel: function() {
		
		// <div id="favpanel_<%=favid%>" style="cursor: pointer; display:none; background-color: #fff; padding: 3px 3px 3px 6px; margin-top: -3px; margin-right: -3px;"></div>
		this.favpanel = new Element('div', {
													id: 'favpanel_' + this.postid, 
													style: 'display:none;'});
		this.favpanel.addClassName('fav_star');
		// this.hoverContainer.appendChild(this.favpanel);
		document.body.appendChild(this.favpanel);
		
		// <span id="addtofavs_<%=favid%>" style="font-size: 10px; color: #090; display:none;">Fav this post</span>&nbsp;<img src="/images/icons/star-empty.png" width='16' height='16' style="vertical-align:middle;" id="star_<%=favid%>"/>
		
		this.messageDiv = new Element('span', 
			{style: 'font-size: 10px; font-family: Arial, Helvetica, sans-serif; color: #090; display:none; margin-right: 4px; margin-left: 1px'});
		this.favpanel.appendChild(this.messageDiv);
		
		this.favImg = new Element('img', {src: '/images/icons/star.png', width: 16, height: 16, style: 'vertical-align:middle;'});
		this.favpanel.appendChild(this.favImg);

		this.updateView();
	},
	
	mouseoverHandler_delegate: function(evt) {
		if (!this.isLoading) {
			this.messageDiv.show();
			this.favpanel.addClassName('fav_mouseover');
		}
		this.resetFavpanelPosition();
	},
	
	mouseoutHandler_delegate: function(evt) {
		if (!this.isLoading) {
			this.messageDiv.hide();
			this.favpanel.removeClassName('fav_mouseover');
		}
		this.resetFavpanelPosition();
	},
	
	updateMessage: function() {
		if (this.isLoading) {
			this.messageDiv.innerHTML = parseHTML("Saving...");
		} else if (this.isFaved) {
			this.messageDiv.innerHTML = parseHTML("Unfavorite this");
		} else {
			this.messageDiv.innerHTML = parseHTML("Favorite this");
		}
	},
	
	updateIcon: function() {
		if (this.isLoading) {
			this.favImg.src = parseURL('/images/loading.gif');
		} else if (this.isFaved) {
			this.favImg.src = parseURL('/images/icons/star.png');
		} else {
			this.favImg.src = parseURL('/images/icons/star-hover.png');
		}
	},
	
	updateView: function() {
		this.updateMessage();
		this.updateIcon();
	},
	
	
	clickHandler_delegate: function(evt) {
		this.isLoading = true;
		this.messageDiv.show();
		this.updateView();
		
		this.favpanel.addClassName('phover_donothide');
		var me = this;
		new Ajax.Updater(this.messageDiv, '/reader/favorite', {
			parameters: { id: this.postid, add: !me.isFaved, authenticity_token: window._token},
			onLoading: function() {
				me.resetFavpanelPosition();
			},
			onComplete: function() {
				me.isFaved = !me.isFaved;
				me.isLoading = false;
				me.updateIcon();
				me.resetFavpanelPosition();	
			}
		});
	},
	
	resetFavpanelPosition: function() {
		this.tooltip.reposition(this.favpanel.getAttribute('id'));
	}
	
});


var PComment = Class.create({

	initialize: function(commentLink, postId, container) {
		this.container = $(container);
		this.postId = postId;
		this.commentLink = $(commentLink);
		
		this.linkClickHandler = this.linkClick_delegate.bindAsEventListener(this);
		
		this.commentLink.observe('click', this.linkClickHandler);
	},

	linkClick_delegate: function(evt) {

		$(this.commentLink.parentNode).hide();
		
		if (this.commentDiv == null) {
			this.createCommentDiv();
		} else {
			// this.commentDiv.show();
			Effect.SlideDown(this.commentDiv, { duration: 0.5 });
		}
		
		Event.stop(evt);
		return false;
	},
	hideCommentDiv: function() {
		Effect.SlideUp(this.commentDiv);
		Effect.SlideDown($(this.commentLink.parentNode));
	},
	createCommentDiv: function() {
		
		this.commentDiv = new Element('div', {style: "display: none; margin-bottom: 30px;"});
		this.commentDiv.addClassName('posterous_comments');		
		this.loadingDiv = new Element('div', {style: "display: none;"});
		this.loadingDiv.addClassName('comment_loading_div');
		this.loadingImg = new Element('img', {src: "/images/loading.gif"});
		
		this.loadingDiv.appendChild(this.loadingImg);
		this.container.appendChild(this.loadingDiv);
		this.container.appendChild(this.commentDiv);
		
		this.loadingDiv.show();
		
		var me = this;
		
		new Ajax.Updater(this.commentDiv, '/posts/getcomments', {
			parameters: { id: this.postId, authenticity_token: window._token },
			evalScripts: true,
			onLoading: function() {},
			onComplete: function() {
				// me.commentDiv.show();
				Effect.SlideDown(me.commentDiv, { duration: 0.5 });
				me.loadingDiv.hide();

				var all_spans = document.getElementsByTagName("span");
				var i = 0;
				for (i=0; i<all_spans.length; i++) {
			        if ( /xfbml_name_.*/.test(all_spans[i].id) ) {
				
						FB.ensureInit( function () {
							FB.XFBML.Host.addElement(new FB.XFBML.Name($(all_spans[i].id)));
							} );         
			        } else if ( /xfbml_pic_.*/.test(all_spans[i].id) ) {
			            
						FB.ensureInit( function () {
							FB.XFBML.Host.addElement(new FB.XFBML.ProfilePic($(all_spans[i].id)));
						} );
			        }
		        }

			}
		});
	}
});


/** 
 * @description		prototype.js based context menu
 * @author        Juriy Zaytsev; kangax [at] gmail [dot] com; http://thinkweb2.com/projects/prototype/
 * @version       0.6
 * @date          12/03/07
 * @requires      prototype.js 1.6
 * 
 * modified by garry@posterous.com for left click menus on split buttons
*/
if (Object.isUndefined(Proto)) { var Proto = { } }

Proto.Menu = Class.create({
	initialize: function() {
		var e = Prototype.emptyFunction;
		this.ie = Prototype.Browser.IE;
		this.options = Object.extend({
			selector: '.contextmenu',
			className: 'protoMenu',
			pageOffset: 25,
			fade: false,
			zIndex: 100,
			beforeShow: e,
			beforeHide: e,
			beforeSelect: e,
			position: 'mouse_click',		// can be mouse_click or relative
			location: null,					// needed if set to relative, should be a DOM element to use for location
			click: 'right',					// by default, right click
			width: null,					// if null, then don't set width on the div
			menuAlign: 'left'				// can align right if location set and position is relative
			// iconCSS: null					// if not null, set an icon for the menu item using that css, e.g. url(images/email.png) 2px 50% no-repeat
		}, arguments[0] || { });
	
		this.shim = new Element('iframe', {
			style: 'position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);display:none',
			src: 'javascript:false;',
			frameborder: 0
		});
		
		this.options.fade = this.options.fade && !Object.isUndefined(Effect);
		this.container = new Element('div', {className: this.options.className, style: 'display:none'});
		if (this.options.width != null) {
			this.container.setStyle({ width: this.options.width + 'px'});
		}
		var list = new Element('ul');
		this.options.menuItems.each(function(item) {
			var aLink = '';
			if (!item.separator) {
				aLink = Object.extend(new Element('a', {
						href: ((!item.href || item.method == 'post' || item.method == 'put' || item.method == 'delete') ? '#': item.href),
						title: item.name,
						className: (item.className || '') + (item.disabled ? ' disabled' : ' enabled')
					}), { _method: item.method, _params: item.params, _confirm: item.confirm, _href: item.href, _callback: item.callback });
				aLink.observe('click', this.onClick.bind(this));
				aLink.observe('contextmenu', Event.stop);
				aLink.update(item.name);
				if (item.icon) {
					aLink.setStyle({ 
						backgroundImage: 'url(' + item.icon + ')',
						backgroundPosition: '8px 50%',
						backgroundRepeat: 'no-repeat'
					});
				}
			}
			list.insert(new Element('li', {className: item.separator ? 'separator' : ''}).insert(aLink));
			
		}.bind(this));
		
		$(document.body).insert(this.container.insert(list).observe('contextmenu', Event.stop));
		if (this.ie) { $(document.body).insert(this.shim) }
		
		if (this.options.click == 'right') {   // if right clicking causes it to pop up, treat it like a context menu
			document.observe('click', function(e) {
				if (this.container.visible() && (!e.isRightClick())) {
					this.options.beforeHide(e);
					if (this.ie) this.shim.hide();
					this.container.hide();
				}
			}.bind(this));
	
			$$(this.options.selector).invoke('observe', Prototype.Browser.Opera ? 'click' : 'contextmenu', function(e){
				if (Prototype.Browser.Opera && !e.ctrlKey) {
					return;
				}
				this.show(e);
			}.bind(this));
			
		} else {		// else left click 
			document.observe('click', function(e) {
				if (this.container.visible()) {
					this.options.beforeHide(e);
					if (this.ie) this.shim.hide();
					this.container.hide();
				}
			}.bind(this));
	
			$$(this.options.selector).invoke('observe', 'click', function(e){ 
				this.container.visible() ? this.container.hide() : this.show(e); 
				e.stop();
			}.bind(this));
		}
	},
	is_form_post: function(item) {
		return ;
	},
	show: function(e) {
		e.stop();
		this.options.beforeShow(e);
		var x = Event.pointer(e).x, y = Event.pointer(e).y, elDim = this.container.getDimensions();
		
		if (this.options.position == 'relative') {
			var elemOffset = this.options.location.cumulativeOffset();
			if (this.options.menuAlign == 'left') {
				x = elemOffset[0];
				y = elemOffset[1] + this.options.location.getHeight() - 2;
			} else {
				x = elemOffset[0] + this.options.location.getWidth() - elDim.width;
				y = elemOffset[1] + this.options.location.getHeight() - 2;
			}
		}
		
		var vpDim = document.viewport.getDimensions(),
			vpOff = document.viewport.getScrollOffsets(),
			elOff = {
				left: ((x + elDim.width + this.options.pageOffset) > vpDim.width 
					? (vpDim.width - elDim.width - this.options.pageOffset) : x) + 'px',
				top: ((y - vpOff.top + elDim.height) > vpDim.height && (y - vpOff.top) > elDim.height 
					? (y - elDim.height) : y) + 'px'
			};
		
		this.container.setStyle(elOff).setStyle({zIndex: this.options.zIndex});
		if (this.ie) { 
			this.shim.setStyle(Object.extend(Object.extend(elDim, elOff), {zIndex: this.options.zIndex - 1})).show();
		}
		this.options.fade ? Effect.Appear(this.container, {duration: 0.25}) : this.container.show();
		this.event = e;

	},
	onClick: function(e) {
		var hide_after = false;
		if (e.target._href && (!e.target._method || e.target._method == 'get')) {	// normal href
			return true;
		} else if (e.target._method == 'delete') {					// post
			if (confirm('Are you sure?')) { 
				var f = document.createElement('form'); f.style.display = 'none'; e.target.appendChild(f); f.method = 'POST'; f.action = parseURL(e.target._href);
				
				var m = document.createElement('input'); m.setAttribute('type', 'hidden'); 
				m.setAttribute('name', '_method'); m.setAttribute('value', 'delete'); 
				f.appendChild(m);
				
				m = document.createElement('input'); m.setAttribute('type', 'hidden'); 
				m.setAttribute('name', 'authenticity_token'); m.setAttribute('value', window._token); 
				f.appendChild(m);
				
				$H(e.target._params).each(function(pair) {
					m = document.createElement('input'); m.setAttribute('type', 'hidden'); 
					m.setAttribute('name', pair.key); m.setAttribute('value', pair.value); 
					f.appendChild(m);
				});
			
				f.submit(); 
				e.stop();
				return false;
			} else {
				hide_after = true;
			}
		}
		
		// callback
		e.stop();			
		if ((hide_after || e.target._callback) && !e.target.hasClassName('disabled')) {
			this.options.beforeSelect(e);
			if (this.ie) this.shim.hide();
			this.container.hide();
			e.target._callback(this.event);
		}
		return true;
	}
})


var PTwitterComment = Class.create({

	initialize: function(twitterCheckbox, commentBox, twitterBox, twitterDiv, twitterUsername, twitterShorturl, showLink) {
		this.twitterCheckbox = $(twitterCheckbox);
		this.commentBox = $(commentBox);		
		this.twitterBox = $(twitterBox);				
		this.twitterDiv = $(twitterDiv);		
		this.twitterUsername = twitterUsername;
		this.twitterShorturl = twitterShorturl;		
		this.linkOutput = true;
		this.showLink = showLink;
		this.setup();
		this.updateAll();
	},
	updateAll: function() {
		this.updateTwitterBox();
		this.updateCheckbox();
	},
	setup: function() {
		this.twitterCheckbox.observe('click', this.updateCheckbox.bindAsEventListener(this));
		this.twitterBox.observe('change', function() { this.linkOutput = false; }.bindAsEventListener(this));
		this.twitterBox.observe('keyup', this.updateTwitterCount.bindAsEventListener(this));
		this.commentBox.observe('keyup', this.updateTwitterBox.bindAsEventListener(this));
		
		this.numLeft = new Element('div', {style: 'font-size: 10px; color: #090; line-height: 12px;'});
		this.twitterDiv.appendChild(this.numLeft);
		this.twitterBoxExpander = new Texpand(this.twitterBox);
	},
	getCommentBoxValue: function() {
		return this.commentBox.value.gsub(/\n/, '');
	},
	specialTruncate: function(value, len) {
		if (value.length > len) {
			value = value.substring(0, len-3).replace(/[ \.]\w+$/, '');
			value += "...";
		}
		return value;
	},
	updateTwitterBox: function() {
		if (!this.linkOutput) return;
		var prefix = (this.twitterUsername) ? this.twitterUsername + " " : ""
		var suffix = (this.twitterShorturl) ? " " + this.twitterShorturl : "";
		var remaining = 140 - (prefix.length);
		var commentBoxValue = this.getCommentBoxValue();
		
		if (remaining >= commentBoxValue.length && this.twitterUsername && !this.showLink) {
			// this will always show @poster blah blah blah
			// if there's no twitter user for the poster then we always show post.ly otherwise no context
			this.twitterBox.value = prefix + commentBoxValue;
		} else if (commentBoxValue.length > 0) {
				this.twitterBox.value = prefix + this.specialTruncate(commentBoxValue, remaining - suffix.length) + suffix;
		}
		this.updateTwitterCount();
		this.twitterBoxExpander._autoExpand();
	},
	updateTwitterCount: function() {
		var remaining = 140 - this.twitterBox.value.length;
		if (remaining >= 0) {
			this.numLeft.innerHTML =  parseHTML(remaining + " characters left");
		} else {
			this.numLeft.innerHTML =  parseHTML((-1 * remaining) + " characters over the 140 character limit");
		}
	},
	updateCheckbox: function() {
		(this.twitterCheckbox.checked) ? this.twitterDiv.show() : this.twitterDiv.hide();
	}
	
});


var retweet_modal_window = null;

// Element.observe(window,'load', function() {
// 	if (window.url_to_ids == undefined) fetch_retweet_counts();
// });

function client_retweet_update( json_response ) {
	
	retweets = json_response["tweetcounts"];
	for (i=0; i< retweets.length; i++) {
		url = retweets[i].url;
		count = retweets[i].tweetcount;
		post_id = url_to_ids[url];
		
		count_id = 'num_tweets_' + post_id;
		parent_id = 'retweet_count_' + post_id;
		label_id = 'retweet_count_label_' + post_id;					
		
		// console.log("count_id = " + count_id + " parent_id = " + parent_id + " label_id = " + label_id + " count = " + count);
		if ($(count_id))	$(count_id).update(count);					
		if (count == 0) {
			if ($(parent_id)) $(parent_id).hide();
		} else if (count == 1) {
			if ($(label_id)) $(label_id).update('mention');
		}
	}
}

function fetch_retweet_counts() {
	
	var post_ids = [];
	span_elems = $$("span[id]")
	for (i=0; i<span_elems.length; i++) {
		match_results = span_elems[i].id.match(/num_tweets_(\d+)/)
		if (!(match_results === null) && (match_results.length == 2)) {
			post_ids.push(match_results[1])
		}
	}

	if (post_ids.length != 0) {
		new Ajax.Request('/posts/backtype_connect', {
			method: 'get',
			parameters: {post_ids: post_ids.join(",")},
			onSuccess: function(transport) {

				response = eval( parseJS('(' + transport.responseText + ')'))
				for (i=0; i<response.length; i++){
					count_id = 'num_tweets_' + response[i].post_id;
					parent_id = 'retweet_count_' + response[i].post_id;
					label_id = 'retweet_count_label_' + response[i].post_id;					
					
					count = response[i].count;
					if ($(count_id))	$(count_id).update(count);					
					if (count == 0) {
						if ($(parent_id)) $(parent_id).hide();
					} else if (count == 1) {
						if ($(label_id)) $(label_id).update('mention');
					}
				}
			}
		});
	}
}

function retweet_init_oauth_and_redirect(auth_url) {
	retweet_modal_window.location.href = parseURL(auth_url);
	new PeriodicalExecuter(function(pe) {
		if (retweet_modal_window.closed) {
			submit_retweet('twitter_retweet_box');			
			pe.stop();
		}
	},0.25);
}

var PRetweet = Class.create({
	initialize: function(box_elem_id, char_count_elem_id) {
		this.retweet_box = $(box_elem_id);
		this.charcount_box = $(char_count_elem_id);
		this.retweet_box.observe('keyup', this.updateTwitterCount.bindAsEventListener(this));
		this.updateTwitterCount();
	}, 
	
	updateTwitterCount: function() {		
		var char_count = this.retweet_box.value.length;
		var remaining = 140 - char_count;
		var text = "";
		
		if (remaining < 0) {
			this.charcount_box.style.color = '#FF0000';
			text = (-1*remaining) + " characters over the 140 character limit";
		} else {
			this.charcount_box.style.color = '#009900';
			text = remaining + " characters left";
		}
		
		this.charcount_box.innerHTML = parseHTML(text);
	}
});

var submit_retweet = function (text_box) {
	var retweet = $(text_box).value;
	
	new Ajax.Request('/posts/retweet', {
		method: 'post',
		parameters: {twitter_body: retweet, authenticity_token: $('retweet_authenticity_token').value},
		onSuccess: function(transport) {
			Control.Modal.close();
		}
	});
};


// Texpand v0.1
// Unobtrusively resize textarea's as content is added.
//
// Copyright (c) 2008, Gianni Chiappetta - gianni[at]runlevel6[dot]org
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// Texpand Class
//------------------------------------------------------------------------------
var Texpand = Class.create();
Texpand.prototype = {
  initialize: function(el) {
    // INIT
    var obj = this;
    this.element = $(el);
    this.increment = 14;
    
    // Requirements
    if (this.element.tagName.toLowerCase() != 'textarea') throw('Texpand: can only be initialized with a <textarea> but got <'+this.element.tagName.toLowerCase()+'>');
    if (typeof Prototype=='undefined' || (parseFloat(Prototype.Version.split(".")[0] + "." + Prototype.Version.split(".")[1]) < 1.6)) throw('Texpand: requires Prototype 1.6.0+');
    if (typeof Effect=='undefined') throw('Textpand: requires Script.aculo.us, specifically Effects');
    
    // Setup Textarea & mimic
    this.element.insert({after: '<div id="texpand-mimic-'+this.element.identify()+'"></div>'});
    this.mimic = this.element.next();
    this.mimic.update(this.element.value);
    
    // Fix IE default font size, based on a 10px em unit
    if (Prototype.Browser.IE) {
      var fontSize = this.element.getStyle('fontSize');
      if (fontSize.search(/em/) >= 0) {
        var pixelSize = parseFloat(fontSize.replace(/em/, ''))*10;
        this.element.setStyle({fontSize: pixelSize+'px'});
      }
    }
    
    // Duplicate style
    var style = {};
    var properties = $w('borderBottomColor borderBottomStyle borderBottomWidth borderTopColor borderTopStyle borderTopWidth borderRightColor borderRightStyle borderRightWidth borderLeftColor borderLeftStyle borderLeftWidth fontSize fontFamily fontWeight letterSpacing lineHeight marginTop marginRight marginBottom marginLeft paddingTop paddingRight paddingBottom paddingLeft textAlign textIndent width wordSpacing');
    properties.each(function(property){
      style[property] = obj.element.getStyle(property);
    });
    this.mimic.setStyle(style);
    this.mimic.setStyle({display: 'none', position: 'absolute', left: '-9999px', top: '-9999px'});
        
    // Listen
    this.element.observe("keyup", obj._autoExpand.bind(obj));
	
	this._autoExpand(null);
    return this.element;
  },
  
  // Auto expand height if required
  _autoExpand: function(ev) {
    this.mimic.update(this.element.value.replace(/\n/gm, '<br />'));
    
    var mimicCurrentHeight    = this.mimic.getHeight();
    var elementCurrentHeight  = this.element.getHeight();
    var differenceHeight      = elementCurrentHeight-mimicCurrentHeight;
    var targetHeight          = elementCurrentHeight + (this.increment - differenceHeight);
    
    if (differenceHeight < this.increment) {
      // Clear queue
      var queue = Effect.Queues.get('texpand'+this.element.identify());
      queue.each(function(effect) { effect.cancel(); });
      
      // Expand
      this.element.morph('height: '+targetHeight+'px;', { duration: 0.1, queue: { position: 'end', scope: 'texpand'+this.element.identify(), limit: 2 } });
    }
  }
};



var PosterousHeader = Class.create({
	initialize: function(headerDiv, options) {
		this.options = Object.extend({
			imgClear: 				'/images/header/default-clear-right.png',
			imgColored: 			'/images/header/yellow-arrow.png',
			imgArrow: 				'/images/header/yellow-arrow.png',
			imgExpanded: 			'/images/header/yellow-expanded.png',

			imgClearLeft: 			'/images/header/default-clear-left.png',
			imgColoredLeft: 		'/images/header/yellow-arrow-left.png',
			imgArrowLeft: 			'/images/header/yellow-arrow-left.png',
			imgExpandedLeft: 		'/images/header/yellow-expanded-left.png',

			clearDefault: 			true,
			top_active_area_px: 	100,
			hide_offset_px: 		50,
			direction: 				'right'
		}, options || {} );
		
		this.headerDiv = $(headerDiv);
		this.viewstate = '';  // hidden, arrow, and expanded are the 3 states
		this.setup();
	},
	setup: function() {
		if ($('posterousbar_nojs')) $('posterousbar_nojs').hide();
		this.headerDiv.show();

		if (this.options.clearDefault) {
			var bgcolor = this.getParentBackgroundColor(this.headerDiv.up());
			if (this.getColorSum(bgcolor) > 384) {
				this.headerDiv.addClassName('posterousHeaderLight');				
			} else {
				this.headerDiv.addClassName('posterousHeaderDark');								
			}
		} else { 
			this.headerDiv.addClassName('posterousHeaderLight');
		}
		
		if (this.options.direction == 'left') this.headerDiv.addClassName('posterousHeaderLeft');
		
		this.headerDiv.addClassName('posterousHeader');
		var contents = this.headerDiv.innerHTML;
		this.headerDiv.innerHTML = parseHTML('');
		
		if (this.options.direction == 'right') {
			this.defaultImg = new Element('img', 
						{src: (this.options.clearDefault ? this.options.imgClear : this.options.imgColored) }).addClassName('posterousHeaderImageRight'); 
			this.defaultArrowImg = new Element('img', {src: this.options.imgArrow, style: 'display: none;'}).addClassName('posterousHeaderImageRight');
			this.defaultExpandedImg = new Element('img', {src: this.options.imgExpanded, style: 'display: none;'}).addClassName('posterousHeaderImageRight');
		} else {
			this.defaultImg = new Element('img', 
						{src: (this.options.clearDefault ? this.options.imgClearLeft : this.options.imgColoredLeft) }).addClassName('posterousHeaderImageLeft');    
			this.defaultArrowImg = new Element('img', {src: this.options.imgArrowLeft, style: 'display: none;'}).addClassName('posterousHeaderImageLeft');
			this.defaultExpandedImg = new Element('img', {src: this.options.imgExpandedLeft, style: 'display: none;'}).addClassName('posterousHeaderImageLeft');
		}
		
		var posterousLink = new Element('a', {href: 'http://posterous.com/'});
		posterousLink.appendChild(this.defaultImg);
		posterousLink.appendChild(this.defaultArrowImg);
		posterousLink.appendChild(this.defaultExpandedImg); 
		this.posterousImg = this.defaultImg;		
		this.headerDiv.appendChild(posterousLink);
		
		this.expandedDiv = new Element('div', { id: this.headerDiv.id + 'expanded_content', style: 'display: none;'}).update('Hello world!');
		this.expandedDiv.innerHTML = parseHTML(contents);
		this.expandedDiv.addClassName(
				(	this.options.direction == 'right' ? 
						(this.options.clearDefault ? 'posterousHeaderExpandedDivRight' : 'posterousHeaderExpandedDivRightOpaque') : 
						(this.options.clearDefault ? 'posterousHeaderExpandedDivLeft' : 'posterousHeaderExpandedDivLeftOpaque')
				)
		);
		this.headerDiv.appendChild(this.expandedDiv);
		
		this.setState('hidden');
				
		document.observe('mousemove', this.mouseHandler.bindAsEventListener(this));
	},
	getParentBackgroundColor: function(elem) {
		if (elem.getStyle == null) return 'transparent';
		var bgcolor = elem.getStyle('background-color');
		if (bgcolor && bgcolor != 'transparent' && bgcolor != 'rgba(0, 0, 0, 0)') {
			return bgcolor;
		} 
		if (!elem.up()) return 'transparent';
		return this.getParentBackgroundColor(elem.up())
	},
	
	getColorSum: function(color_str) {
		var sum = 0;
		if (Prototype.Browser.IE) {
			color_str = color_str.gsub(/^#/, '');
			color_str = color_str.gsub(/^([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/, '#{1}#{1}#{2}#{2}#{3}#{3}');
			color_str = color_str.gsub(/^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/, function(match) {
				return parseInt(match[1], 16) + " " + parseInt(match[2], 16) + ' ' + parseInt(match[3], 16);
			});
		}
		color_str.scan(/\d+/, function(num) { sum = sum + parseInt(num) });		
		return sum;
	},
	
	mouseHandler: function(evt) {
		var x = Event.pointerX(evt);
		var y = Event.pointerY(evt);
		this.getCurrentPositions();
		
		if ((this.viewstate == 'expanded' && this.isInExpandedArea(x, y)) || (this.isInActivationArea(x, y))) {
			this.setState('expanded');
		} else if (this.viewstate != 'expanded' && this.isInTeaserArea(x, y)) {
			this.setState('arrow');
		} else {
			this.setState('hidden');
		}
	},
	setState: function(newState) {
		if (this.viewstate == newState) return;
		// this.posterousImg.hide();
		if (newState == 'expanded') {
			this.defaultImg.hide(); this.defaultArrowImg.hide();
			this.posterousImg = this.defaultExpandedImg;
			
			if (Prototype.Browser.IE) {
				this.expandedDiv.show();
			} else { 
				this.sliding = true;		
				Effect.Appear(this.expandedDiv, Object.extend({
					duration: 0.15,
					afterFinish: function() { this.sliding = false }.bindAsEventListener(this)
				}));
			}
			
			this.posterousImg.show();			
		} else if (newState == 'arrow' && this.viewstate != 'expanded' && !this.sliding) {
			this.defaultImg.hide(); this.defaultExpandedImg.hide();
			this.posterousImg = this.defaultArrowImg;
			this.posterousImg.show();		
		} else {
			this.posterousImg = this.defaultImg;
			
			if (Prototype.Browser.IE) {
				this.defaultArrowImg.hide(); this.defaultExpandedImg.hide(); this.posterousImg.show(); this.expandedDiv.hide();				
			} else {
				this.sliding = true;
				Effect.Fade(this.expandedDiv, Object.extend({
					duration: 0.1, 
					afterFinish: function() {
						this.defaultArrowImg.hide(); 
						this.defaultExpandedImg.hide();				
						this.posterousImg.show();
						this.sliding = false;
					}.bindAsEventListener(this)}));
			}
		}
		this.viewstate = newState;
	},
	isInActivationArea: function(x, y) {
		return ( y < (this.e_off.top + this.e_dim.height + 5));
	},
	isInExpandedArea: function(x, y) {
		return (y < (this.t_off.top + this.t_dim.height +  this.options.hide_offset_px));			
	},
	isInTeaserArea: function(x, y) {
		return  (y < (this.t_off.top + this.t_dim.height + this.options.top_active_area_px));
	},
	getCurrentPositions: function() {
		// element position
		this.e_dim = this.posterousImg.getDimensions();
		this.e_off = this.posterousImg.cumulativeOffset();
		// overall header div position
		this.t_dim = this.headerDiv.getDimensions();
		this.t_off = this.headerDiv.cumulativeOffset();
	}
});



document.observe('dom:loaded', function() {
	if ($('posterous_modal_flash')) {
		setTimeout("Effect.Appear($('posterous_modal_flash'))", 2000);
		$('posterous_modal_flash').observe('click', function() { Effect.Fade($('posterous_modal_flash'), {duration: 0.5}); });
	}
})