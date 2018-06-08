import { h, app, ActionsType, View, ActionResult } from 'hyperapp';

export interface State {
    value: string;
}

export const state: State = {
    value: ''
};

export interface Actions {
    setValue(newValue: string): State;
}

export const actions: ActionsType<State, Actions> = {
    setValue: (newValue: string) => state => {
        return { value: newValue };
    }
};

export const view: View<State, Actions> = (state, actions) => {
    return <div>
        <input type="text" oninput={e => actions.setValue(e.target.value)} value={state.value}/>
        <div>You are typed: <strong>{state.value}</strong></div>
    </div>;
};
