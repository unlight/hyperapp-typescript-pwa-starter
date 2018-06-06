import './app/app';

// import * as React from 'react';
// import * as ReactDOM from 'react-dom';

// function render() {
//     const { App } = require('./app/app');
//     const appElement = <App title="React App" />;
//     ReactDOM.render(appElement, document.getElementById('app'));
// }

// render();

// // Hot Module Replacement API.
// if (module.hot) {
//     module.hot.accept('./app/app', render);
// }


// import 'promise-polyfill';
// import 'isomorphic-fetch';
// import { h, render } from 'preact';
// import './style';

// let root;
// function init() {
//     let App = require('./components/app').default;
//     root = render(<App />, document.body, root);
// }

// // register ServiceWorker via OfflinePlugin, for prod only:
// if (process.env.NODE_ENV==='production') {
//     require('./pwa');
// }

// // in development, set up HMR:
// if (module.hot) {
//     //require('preact/devtools');   // turn this on if you want to enable React DevTools!
//     module.hot.accept('./components/app', () => requestAnimationFrame(init) );
// }

// init();
