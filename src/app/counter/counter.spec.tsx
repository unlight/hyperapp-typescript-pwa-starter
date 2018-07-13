import { h, app } from 'hyperapp';
import { renderToString } from '@hyperapp/render';
import * as counter from './counter';

test('counter logic', () => {
    expect(counter.actions.up(1)(counter.state)).toMatchObject({ count: 1 } as counter.State);
});

test('counter async logic', async () => {
    const actions = app(counter.state, counter.actions, counter.view, null);
    expect(actions.getState()).toEqual({ count: 0, busy: false });
    const upAsync = actions.upAsync(5);
    expect(actions.getState()).toEqual({ count: 0, busy: true });
    await upAsync;
    expect(actions.getState()).toMatchObject({ count: 5, busy: false });
});
