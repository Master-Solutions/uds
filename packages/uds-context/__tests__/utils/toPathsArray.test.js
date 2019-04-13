import Context from '../../src/Context';
import toPathsArray from '../../src/utils/toPathsArray';

describe('toPathsArray', () => {

  it('toPathsArray', () => {
    const parent = new Context();
    const ctx = new Context(parent);

    expect(toPathsArray(parent)).toEqual([
      [parent],
      [parent, ctx]
    ]);
  });

});
