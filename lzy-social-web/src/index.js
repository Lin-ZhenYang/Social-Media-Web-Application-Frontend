import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import './index.css';

import Reducer from './reducers';
import App from './App';

//const store = createStore(Reducer);

import { applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist' ;
import storage from 'redux-persist/lib/storage' ;
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = { 
    key: 'root',
    storage
};
const persistedReducer = persistReducer(persistConfig, Reducer);

const store = createStore(
    persistedReducer, 
    applyMiddleware() 
);
const  persistor = persistStore(store);

ReactDOM.render(
    <Provider store = {store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>     
    </Provider>,
    document.getElementById('root')
);



// ReactDOM.render(
//   <Provider store = {store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );