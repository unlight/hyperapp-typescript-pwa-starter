import { app } from 'hyperapp';
import { Counter, state, actions, view } from './counter/counter';

app<Counter.State, Counter.Actions>(state, actions, view, document.body);
