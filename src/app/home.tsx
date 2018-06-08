import { app, h } from 'hyperapp';
import * as counter from './counter/counter';
import * as  reflector from './reflector/reflector';

export function Home() {
    let reflectorActions: reflector.Actions;
    let counterActions: counter.Actions;
    return <div>
        <h4>Home</h4>
        <div>Counter:</div>
        <div oncreate={element => {
            counterActions = app(counter.state, counter.actions, counter.view, element);
        }}></div>
        <div>Reflector:</div>
        <div oncreate={element => {
            reflectorActions = app(reflector.state, reflector.actions, reflector.view, element);
        }}></div>
        <button onclick={e => reflectorActions.setValue(String(counterActions.getCount()))}>set counter value to reflector</button>
    </div>;
}
