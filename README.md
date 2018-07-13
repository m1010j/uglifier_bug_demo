# Uglifier Bug Demo

This repository, which is referenced [here](https://github.com/lautis/uglifier/issues/143), illustrates a bug found in versions 4.1.13 and 4.1.14 of the [uglifier](https://github.com/lautis/uglifier) gem. It is a Rails 5.2.0 app with a React 16.4.1 and Redux 4.0.0 frontend. The frontend code is transpiled using webpack 4.15.1, babel-preset-env 1.7.0 and babel-preset-react 6.24.1. If this app is pushed to Heroku using the Node.js and Ruby buildpacks, it throws the following error:

```
TypeError: l is not a function
```

See [here](https://uglifier-bug-demo.herokuapp.com/) for a live version of the app.

This repository also contains five branches that reflect fixes, each of which is sufficient on its own to avoid the error on Heroku:

## 1. [Downgrade to uglifier 4.1.12](https://github.com/m1010j/uglifier_bug_demo/tree/downgrade-uglifier)

This is the most straightforward fix for most situations.

## 2. [Use uglifier with the harmony option](https://github.com/m1010j/uglifier_bug_demo/tree/use-harmony)

Replacing `config.assets.js_compressor = :uglifier` with `config.assets.js_compressor = Uglifier.new(harmony: true)` in `config/environments/production.rb` also works.

## 3. [Don't use class syntax to define React components](https://github.com/m1010j/uglifier_bug_demo/tree/es5-component)

This is much less convenient, but avoiding ES6 class syntax when defining React components also seems to work. Note that using ES6 class syntax to define classes that don't extend `React.Component` doesn't seem to cause any issues. [Here](https://github.com/m1010j/uglifier_bug_demo/blob/es5-component/frontend/components/some_component.jsx)'s the class-less version of a React component used in this app:

```javascript
import React from 'react';

function SomeComponent(props) {
  React.Component.call(this, props);
}

SomeComponent.prototype = Object.create(React.Component.prototype);
SomeComponent.prototype.constructor = SomeComponent;

SomeComponent.prototype.render = function() {
  return <h1>Some Component</h1>;
};

export default SomeComponent;
```

## 4. [Don't use connected components](https://github.com/m1010j/uglifier_bug_demo/tree/no-container)

This will not be workable in the context of a React app that uses Redux for state management, but not using connected React components seems to work, even if those components use ES6 class syntax.

## 5. [Only use functional components](https://github.com/m1010j/uglifier_bug_demo/tree/functional-component)

This will not be workable for almost all React apps, but switching to functional components seems to work, even if those components are connected.

## Note on lodash

While experimenting with various Rails-React-Redux apps, we found that simply importing from lodash 4.17.10 sometimes causes a ReferenceError that is also resolved by downgrading to uglifier 4.1.12. However, we've been unable to consistently reproduce this behavior.

## Node on development environment

We were unable to reproduce any of this behavior in a development environment, even if the development environment is configured to use uglifier.

## Acknowledgments

These results were obtained in collaboration with [@moeroach94](https://github.com/moeroach94), [@BCrawfordScott](https://github.com/BCrawfordScott), and [@OscarAlvarez8830](https://github.com/OscarAlvarez8830).
