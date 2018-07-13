import React from 'react';
import { Provider } from 'react-redux';
import SomeComponent from './some_component';

export const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <SomeComponent />
    </Provider>
  );
};
