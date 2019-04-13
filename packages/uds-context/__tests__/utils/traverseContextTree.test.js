import Context from '../../src/Context';
import traverseContextTree from '../../src/utils/traverseContextTree';

describe('traverseContextTree', () => {

  it('traverseContextTree', () => {
    const parent = new Context('parent');
    const child = new Context('child', parent);

    const res = [];
    traverseContextTree(parent, (ctx) => res.push(ctx.name));

    expect(res).toEqual(['parent','child']);
  });

});
