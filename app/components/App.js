import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <h2 id="heading">Hello ReactJS</h2>
    </Provider>
  );
};

export default App;
