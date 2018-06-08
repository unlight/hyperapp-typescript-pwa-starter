import { h, app, ActionsType, View, ActionResult } from 'hyperapp';

export interface State {
    count: number;
    busy: boolean;
}

export const state: State = {
    count: 0,
    busy: false,
};

export interface Actions {
    busy(value: boolean): State;
    down(): State;
    up(value: number): State;
    upAsync(value: number): ActionResult<State>;
    getState(): State;
    getCount(): number;
}

export const actions: ActionsType<State, Actions> = {
    busy: (value: boolean) => state => ({ busy: value }),
    down: () => state => ({ count: state.count - 1 }),
    up: (value: number) => state => {
        return {
            count: state.count + value
        };
    },
    upAsync: (value: number) => async (state, actions) => {
        actions.busy(true);
        await new Promise((resolve) => {
            setTimeout(resolve, 500);
        });
        actions.busy(false);
        return actions.up(5);
    },
    getState: () => state => state,
    getCount: () => state => state.count,
};

export const view: View<State, Actions> = (state, actions) => {
    return <div>
        <button>{state.count}</button>
        <button disabled={state.busy} onclick={actions.down}>down</button>
        <button disabled={state.busy} onclick={e => actions.up(1)}>up</button>
        <button disabled={state.busy} onclick={e => actions.upAsync(5)}>async up</button>
    </div>;
};
