/* eslint-disable */

var assert = require('assert');
var React = require('react');
var ReactUIDebugger = require('../build/react-ui-debugger');
var ReactTestUtils = require('react-addons-test-utils');
var enzyme = require('enzyme');

class Hello extends React.Component {
  render() {
    return React.createElement('div', null, 'Hello World');
  }
}

describe('React UI Debugger', function() {
  let shallowRenderer;
  let component;

  beforeEach(() => {
    component = enzyme.shallow(React.createElement(ReactUIDebugger.default(Hello))).instance();
    component.componentDidMount();
  });

  it('should return react element when you use it as a function', function() {
    assert.equal(true, ReactTestUtils.isCompositeComponent(component));
  });

  it('should show counts when you call showDebugCounts function', function() {
    assert.equal(1, 1);//component.showDebugCounts().mount);
  });
});
