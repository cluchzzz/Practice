import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import store from "./store";
import {RouterProvider} from "react-router-dom";
import router from "./router";
import App from './App';
import './styles/index.css'
import './styles/fonts.css'


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <Provider store={store}>
        <RouterProvider router={router}>
        <App/>
        </RouterProvider>
    </Provider>
);
