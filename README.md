# React UI Debugger

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm (scoped)](https://img.shields.io/npm/v/@thebluescreen/react-ui-debugger.svg)](https://www.npmjs.com/package/react-ui-debugger)
[![Build Status](https://travis-ci.org/Sly777/React-UI-Debugger.svg?branch=master)](https://travis-ci.org/Sly777/React-UI-Debugger)
[![Github All Releases](https://img.shields.io/github/downloads/Sly777/React-UI-Debugger/total.svg)](https://github.com/Sly777/React-UI-Debugger)

## Getting Started

To see what's going on react UI. You can use it as decorator (**@ReactUIDebugger**) or as function (**ReactUIDebugger(MyComponent)**).

![](http://i.giphy.com/l0HlP3lQR9MsSmo80.gif)

### Prerequisites

on NPM
```
npm install react-ui-debugger --save-dev
```

on Yarn
```
yarn add react-ui-debugger -D
```

### Usage

Firstly, you need to import package to your code file.

```
import ReactUIDebugger from 'react-ui-debugger'; // es6
var ReactUIDebugger = require('react-ui-debugger'); // es5 or node 4+
```

There are 2 options to use this. Firstly, if your application supports [decorator (ES7)](https://babeljs.io/docs/plugins/transform-decorators/), you can just decorate your class (or stateless component) with ReactUIDebugger.

```
import React from 'react';
import ReactUIDebugger from 'react-ui-debugger';

@ReactUIDebugger
export default class Hello extends React.Component {
  render() {
    return React.createElement('div', null, 'Hello World');
  }
}
```

or you can export your component as using argument on ReactUIDebugger function.

```
import React from 'react';
import ReactUIDebugger from 'react-ui-debugger';

class Hello extends React.Component {
  render() {
    return React.createElement('div', null, 'Hello World');
  }
}

export default ReactUIDebugger(Hello);
```

**If you have __DEV__ variable and __DEV__ is false or if you set UIdebugActive false inside of component, it will not work.**

## Built With

* [React](https://facebook.github.io/react/) - a javascript library for building user interfaces

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Sly777/React-UI-Debugger/tags).

## Authors

* **Ilker Guller** - [website](https://ilkerguller.com) / [twitter](https://twitter.com/the_bluescreen)

See also the list of [contributors](https://github.com/Sly777/React-UI-Debugger/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
