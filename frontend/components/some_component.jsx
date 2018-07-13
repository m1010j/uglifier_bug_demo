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
