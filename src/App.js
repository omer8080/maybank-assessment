import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import SearchInput from './components/SearchInput';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <SearchInput />
      </div>
    </Provider>
  );
}

export default App;
