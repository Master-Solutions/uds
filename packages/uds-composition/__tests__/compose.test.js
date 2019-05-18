import compose from '../src/compose';

describe('compose', () => {

  it('empty', () => {
    const App = compose();
    expect(App.compose).toBeDefined();
  });

});
