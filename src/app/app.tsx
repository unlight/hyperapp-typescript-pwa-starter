import { app } from 'hyperapp';
import * as counter from './counter/counter';

export function render() {
    return app<counter.State, counter.Actions>(counter.state, counter.actions, counter.view, document.body);
}
