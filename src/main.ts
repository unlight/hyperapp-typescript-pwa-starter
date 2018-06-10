import { location } from '@hyperapp/router';
import { FastClick } from 'fastclick';

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', () => FastClick.attach(document.body), false);
}

function main() {
    const { render } = require('./app/app');
    const result = render();
    return result;
}

const app = main();
const unsubscribe = location.subscribe(app.location);

if (module.hot) {
    module.hot.accept('./app/app', main);
}

require('offline-plugin/runtime').install({
    onInstalled: function() {
        // openOfflineReady();
    },

    onUpdating: function() {

    },

    onUpdateReady: function() {
        // offlinePlugin.applyUpdate();
    },
    onUpdated: function() {
        window.location.reload();
    }
});
