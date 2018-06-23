import { h, app, ActionsType, View, ActionResult } from 'hyperapp';

export const state = {
    value: ''
};

export type State = typeof state;

export const actions = {
    setValue: (newValue: string) => (state: State) => {
        return { value: newValue };
    }
};

export type Actions = typeof actions;

export const view: View<State, Actions> = (state, actions) => {
    return <div>
        <input type="text" oninput={e => actions.setValue(e.target.value)} value={state.value}/>
        <div>You are typed: <strong>{state.value}</strong></div>
    </div>;
};
