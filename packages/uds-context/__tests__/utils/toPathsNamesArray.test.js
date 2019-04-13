import Context from '../../src/Context';
import toPathsNamesArray from '../../src/utils/toPathsNamesArray';

describe('toPathsNamesArray', () => {

  it('toPathsNamesArray', () => {
    const parent = new Context('parent');
    const child = new Context('child', parent);

    expect(toPathsNamesArray(parent)).toEqual([
      ['parent'],
      ['parent', 'child']
    ]);
  });

});
