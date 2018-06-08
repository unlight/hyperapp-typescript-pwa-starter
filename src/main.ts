import { location } from '@hyperapp/router';

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
