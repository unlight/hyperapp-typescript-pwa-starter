function main() {
    const { render } = require('./app/app');
    render();
}

main();

if (module.hot) {
    module.hot.accept('./app/app', main);
}
