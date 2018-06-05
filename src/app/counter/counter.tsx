import { h, app, ActionsType, View, ActionResult } from 'hyperapp';

export namespace Counter {
    export interface State {
        count: number;
        busy: boolean;
    }

    export interface Actions {
        busy(value: boolean): State;
        down(): State;
        up(value: number): State;
        upAsync(value: number): ActionResult<State>;
    }
}

export const state: Counter.State = {
    count: 0,
    busy: false,
};

export const actions: ActionsType<Counter.State, Counter.Actions> = {
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
};

export const view: View<Counter.State, Counter.Actions> = (state, actions) => {
    return <main>
        <button>{state.count}</button>
        <button disabled={state.busy} onclick={actions.down}>down</button>
        <button disabled={state.busy} onclick={e => actions.up(1)}>up</button>
        <button disabled={state.busy} onclick={e => actions.upAsync(5)}>async up</button>
    </main>;
};
