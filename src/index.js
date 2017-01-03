import ReactDOM from 'react-dom';

const setDefault = func => (typeof func !== 'function') ? () => {} : func;

const getName = target => target.displayName || target.name;

const log = (target, text, ...args) => {
  // eslint-disable-next-line no-console
  console.log(`[ReactUIDebugger] [${getName(target)}] ${text} - (${new Date().toJSON()})`, args.length ? args : '');
};

const defaults = {
  MOUNT: 'mount',
  UPDATE: 'update',
};

const settings = {
  highlightStyle: {
    animationDuration: 400,
    mount: {
      web: '3px solid rgba(205, 0, 0, 1)',
    },
    update: {
      web: '3px solid rgba(0, 205, 0, 1)',
    },
    default: {
      web: '1px solid rgba(235, 235, 235, 1)',
    },
  },
};

const highlightChanges = (change) => {
  const targetDOM = ReactDOM.findDOMNode(this);
  if (!targetDOM) return;

  targetDOM.style.boxSizing = 'border-box';
  targetDOM.style.transition = 'outline 0s';

  window.requestAnimationFrame(() => {
    targetDOM.style.outline = settings.highlightStyle[change].web;

    window.requestAnimationFrame(() => {
      targetDOM.style.outline = settings.highlightStyle.default.web;
      targetDOM.style.transition = `outline ${settings.highlightStyle.animationDuration}ms linear`;
    });
  });
};

function ReactUIDebugger(target) {
  if (
    (typeof __DEV__ !== 'undefined' && !__DEV__) ||
    (typeof target.UIdebugActive !== 'undefined' && !target.UIdebugActive)
  ) { return target; }

  if (!target.prototype) target.prototype = {};

  const original = {
    componentWillMount: setDefault(target.prototype.componentWillMount),
    componentDidMount: setDefault(target.prototype.componentDidMount),
    componentDidUpdate: setDefault(target.prototype.componentDidUpdate),
    componentWillUnmount: setDefault(target.prototype.componentWillUnmount),
  };
  target.prototype.UIdebugActive = true;

  const counts = {
    mount: 0,
    update: 0,
  };

  const resetCounts = () => {
    counts.mount = 0;
    counts.update = 0;
  };

  target.prototype.componentWillMount = function componentWillMount() {
    resetCounts();
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
    original.componentWillUnmount.call(this);
  };

  target.prototype.showDebugCounts = () => {
    log(target, 'component will unmount', 'UI Change Counts : ', counts);
    return counts;
  };

  log(target, 'active');

  return target;
}

export default ReactUIDebugger;
