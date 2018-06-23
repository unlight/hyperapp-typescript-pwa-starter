import { Home } from './home';
import { h, app } from 'hyperapp';
import { renderToString } from '@hyperapp/render';
import * as counter from './counter/counter';

test('smoke', () => {
    expect(Home).toBeTruthy();
    expect(<Home />).toBeTruthy();
});

test('render to string 1', () => {
    let string = renderToString(<Home />);
    expect(string).toContain('<h4>Home</h4>');
});
