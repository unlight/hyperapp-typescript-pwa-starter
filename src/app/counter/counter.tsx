import { h, app, ActionsType, View, ActionResult } from 'hyperapp';

export const state = {
    count: 0,
    busy: false,
};

export type State = typeof state;

export const actions = {
    busy: (value: boolean) => (state: State) => ({ busy: value }),
    down: () => (state: State) => ({ count: state.count - 1 }),
    up: (value: number) => (state: State) => {
        return {
            count: state.count + value
        };
    },
    upAsync: (value: number) => async (state: State, actions: Actions) => {
        actions.busy(true);
        await new Promise((resolve) => {
            setTimeout(resolve, 500);
        });
        actions.busy(false);
        return actions.up(5);
    },
    getState: () => (state: State) => state,
    getCount: () => (state: State) => state.count,
};

export type Actions = typeof actions;

export const view: View<State, Actions> = (state, actions) => {
    return <div>
        <button>{state.count}</button>
        <button disabled={state.busy} onclick={actions.down}>down</button>
        <button disabled={state.busy} onclick={e => actions.up(1)}>up</button>
        <button disabled={state.busy} onclick={e => actions.upAsync(5)}>async up</button>
    </div>;
};
