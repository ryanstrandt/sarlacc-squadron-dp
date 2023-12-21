import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
import store from './store'
import { Provider } from 'react-redux'

import reportWebVitals from './reportWebVitals';
// import CharacterInfo from './components/CharacterInfo';
// import DatapadFunctions from './components/DatapadFunctions';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App store={store} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
