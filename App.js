import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider as StoreProvider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './src/redux/reducers'
import AppWrapped from './AppWrapped'

const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware)

function App() {
 
  return (
    <StoreProvider store={store}>
        <AppWrapped />
    </StoreProvider>
  );
}


export default App;
