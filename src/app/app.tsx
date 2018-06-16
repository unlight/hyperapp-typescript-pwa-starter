import { app as hyperapp, h } from 'hyperapp';
import { Link, Route, location } from '@hyperapp/router';
import { Home } from './home';

export function render() {
    const actions = {
        location: location.actions,
    };
    const state = { location: location.state };
    if (module.hot) {
        state.location.pathname = window.location.pathname;
    }
    const app = hyperapp(state, actions, () => {
        return <main>
            <div class="row flex-center">
                <div class="col sm-12">
                    <Link to="/">Home</Link> /
                / <Link to="/about">About</Link>
                    <hr />
                    <Route path="/" render={Home} />
                    <Route path="/about" render={() => <h4>About</h4>} />
                </div>
            </div>
        </main>;
    }, document.body);
    return app;
}
