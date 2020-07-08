import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider as StoreProvider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './src/redux/reducers'
import App from './App'

const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware)

function ReduxWrapper() {
 
  return (
    <StoreProvider store={store}>
        <App />
    </StoreProvider>
  );
}


export default ReduxWrapper;
