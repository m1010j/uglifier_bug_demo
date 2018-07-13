import React from 'react';
import { Provider } from 'react-redux';
import SomeComponentContainer from './some_component_container';

export const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <SomeComponentContainer />
    </Provider>
  );
};
