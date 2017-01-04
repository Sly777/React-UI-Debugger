'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsPerf = require('react-addons-perf');

var _reactAddonsPerf2 = _interopRequireDefault(_reactAddonsPerf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setDefault = function setDefault(func) {
  return typeof func !== 'function' ? function () {} : func;
};

var getName = function getName(target) {
  return target.displayName || target.name;
};

var log = function log(target, text) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  // eslint-disable-next-line no-console
  console.log('[ReactUIDebugger] [' + getName(target) + '] ' + text + ' - (' + new Date().toJSON() + ')', args.length ? args : '');
};

var defaults = {
  MOUNT: 'mount',
  UPDATE: 'update'
};

var settings = {
  highlightStyle: {
    animationDuration: 400,
    mount: {
      web: '3px solid rgba(205, 0, 0, 1)'
    },
    update: {
      web: '3px solid rgba(0, 205, 0, 1)'
    },
    default: {
      web: '1px solid rgba(235, 235, 235, 1)'
    }
  }
};

var highlightChanges = function highlightChanges(change) {
  var targetDOM = _reactDom2.default.findDOMNode(undefined);
  if (!targetDOM) return;

  targetDOM.style.boxSizing = 'border-box';
  targetDOM.style.transition = 'outline 0s';

  window.requestAnimationFrame(function () {
    targetDOM.style.outline = settings.highlightStyle[change].web;

    window.requestAnimationFrame(function () {
      targetDOM.style.outline = settings.highlightStyle.default.web;
      targetDOM.style.transition = 'outline ' + settings.highlightStyle.animationDuration + 'ms linear';
    });
  });
};

function ReactUIDebugger() {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (typeof __DEV__ !== 'undefined' && !__DEV__ || typeof target.UIdebugActive !== 'undefined' && !target.UIdebugActive) {
    return target;
  }

  if (!target && !target.prototype) target.prototype = {};

  var original = {
    componentWillMount: setDefault(target.prototype.componentWillMount),
    componentDidMount: setDefault(target.prototype.componentDidMount),
    componentDidUpdate: setDefault(target.prototype.componentDidUpdate),
    componentWillUnmount: setDefault(target.prototype.componentWillUnmount)
  };
  target.prototype.UIdebugActive = true;

  var counts = {
    mount: 0,
    update: 0
  };

  var resetCounts = function resetCounts() {
    counts.mount = 0;
    counts.update = 0;
  };

  target.showDebugCounts = function () {
    log(target, 'component will unmount', 'UI Change Counts : ', counts);
    return counts;
  };

  target.prototype.componentWillMount = function componentWillMount() {
    resetCounts();
    _reactAddonsPerf2.default.start();
    original.componentWillMount.call(this);
  };

  target.prototype.componentDidMount = function componentDidMount() {
    original.componentDidMount.call(this);
    counts.mount += 1;
    highlightChanges.call(this, defaults.MOUNT);
    log(target, 'component did mount');
  };

  target.prototype.componentDidUpdate = function componentDidUpdate() {
    original.componentDidUpdate.call(this);
    counts.update += 1;
    highlightChanges.call(this, defaults.UPDATE);
    log(target, 'component did update');
  };

  target.prototype.componentWillUnmount = function componentWillUnmount() {
    target.showDebugCounts();
    _reactAddonsPerf2.default.stop();
    var measurements = _reactAddonsPerf2.default.getLastMeasurements();
    _reactAddonsPerf2.default.printInclusive(measurements);
    _reactAddonsPerf2.default.printWasted(measurements);
    original.componentWillUnmount.call(this);
  };

  log(target, 'active');

  return target;
}

exports.default = ReactUIDebugger;
