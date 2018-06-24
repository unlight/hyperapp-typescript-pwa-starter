import { h } from 'hyperapp';
import { Route, Link } from '@hyperapp/router';

export function Nav() {
    return <nav class="border">
        <div class="nav-brand">
            <h3><Link to="/">HyperApp Starter</Link></h3>
        </div>
        <div class="collapsible">
            <input id="collapsible2" name="collapsible2" type="checkbox" />
            <button>
                <label for="collapsible2">
                    <div class="bar1"></div>
                    <div class="bar2"></div>
                </label>
            </button>
            <div class="collapsible-body">
                <ul class="inline">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </div>
        </div>
    </nav>;
}
