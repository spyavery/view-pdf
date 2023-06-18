import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import App from './App';
// import FloatingToolbarExample from './FloatingToolbarExample';
import * as serviceWorker from './serviceWorker';
// import Documents from './components/Documents';

ReactDOM.render(
    <React.StrictMode>
        <App />
        {/* <Documents /> */}
        {/* <FloatingToolbarExample /> */}
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();