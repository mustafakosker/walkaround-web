import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Page from './page/Page';

const App = () => {
  return (
    <Provider store={store}>
      <Page />
    </Provider>
  );
};

export default App;
