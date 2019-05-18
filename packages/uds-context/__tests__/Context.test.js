import Context from '../src/Context';
import Binding from "../src/Binding";

describe('Context', () => {

  describe('#constructor', () => {

    it('default', () => {
        const ctx = new Context();
        expect(ctx.parent).toBeUndefined();
        expect(ctx.name).toMatch(
          /^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        );
        expect(ctx.childContexts).toEqual({});
    });

    it('generates unique names for different instances', () => {
      const ctx1 = new Context();
      const ctx2 = new Context();
      expect(ctx1.name).not.toEqual(ctx2.name);
    });

    it('with name', () => {
      const ctx = new Context('app');
      expect(ctx.name).toBe('app');
    });

    it('with parent', () => {
      const parent = new Context();
      const ctx = new Context(parent);
      expect(ctx.parent).toBe(parent);
    });

    it('with parent and name', () => {
      const parent = new Context();
      const ctx = new Context('test', parent);
      expect(ctx.parent).toBe(parent);
      expect(ctx.name).toBe('test');
      expect(parent.childContexts[ctx.name]).toBe(ctx);
    });

  });

  describe('#setParentContext', () => {

    it('sets parent', () => {
      const parent = new Context();
      const ctx = new Context();
      ctx.setParentContext(parent);
      expect(ctx.parent).toBe(parent);
      expect(parent.childContexts[ctx.name]).toBe(ctx);
    });

    it('errors when parent has such child', () => {
      const parent = new Context();
      parent.addChildContext(new Context('test'));

      const ctx = new Context('test');
      expect(() =>  ctx.setParentContext(parent)).toThrow(/already exists/);
    });

  });

  describe('#addChildContext', () => {

    it('adds child context', () => {
      const ctx = new Context();
      const child = new Context();
      ctx.addChildContext(child);

      expect(ctx.childContexts[child.name]).toBe(child);
      expect(child.parent).toBe(ctx);
    });

    it('errors if exists', () => {
      const ctx = new Context();
      const child1 = new Context('test');
      const child2 = new Context('test');
      ctx.addChildContext(child1);
      expect(() => ctx.addChildContext(child2)).toThrow(/already exists/);
    });

  });

  it('#getChildContexts', () => {
    const parent = new Context();
    const ctx = new Context(parent);

    expect(parent.getChildContexts()).toEqual([ctx]);
  });

  it('#rootPathArray', () => {
    const parent = new Context();
    const ctx = new Context(parent);
    expect(ctx.rootPathArray()).toEqual([parent, ctx]);
  });

  it('#rootPathNamesArray', () => {
    const parent = new Context();
    const ctx = new Context(parent);
    expect(ctx.rootPathNamesArray()).toEqual([parent.name, ctx.name]);
  });

  it('#rootPath', () => {
    const parent = new Context();
    const ctx = new Context(parent);
    expect(ctx.rootPath()).toEqual(`${parent.name}.${ctx.name}`);
  });

  describe('binding', () => {

    let ctx;

    beforeEach(() => {
      ctx = new Context();
    });

    describe('#bind', () => {

      it('adds a binding into the registry', () => {
        const b = ctx.bind('foo');
        expect(ctx.contains(b.key)).toBe(true);
      });

      it('returns a binding', () => {
        const binding = ctx.bind('foo');
        expect(binding).toBeInstanceOf(Binding);
      });

      it('rejects rebinding of a locked key', () => {
        ctx.bind('foo').lock();
        expect(() => ctx.bind('foo')).toThrow("Cannot rebind key 'foo' to a locked binding");
      });

    });

    describe('#contains', () => {

      it('returns true when the key is the registry', () => {
        ctx.bind('foo');
        expect(ctx.contains('foo')).toBe(true);
      });

      it('returns false when the key is not in the registry', () => {
        expect(ctx.contains('bar')).toBe(false);
      });

      it('returns false when the key is only in the parent context', () => {
        ctx.bind('foo');
        const child = new Context(ctx);
        expect(child.contains('foo')).toBe(false);
      });

    });

    describe('#isBound', () => {

      it('returns true when the key is the registry', () => {
        ctx.bind('foo');
        expect(ctx.isBound('foo')).toBe(true);
      });

      it('returns false when the key is not in the registry', () => {
        expect(ctx.isBound('bar')).toBe(false);
      });

      it('returns true when the key is bound in the context hierarchy', () => {
        ctx.bind('foo');
        const child = new Context(ctx);
        expect(child.isBound('foo')).toBe(true);
      });

      it('returns false when the key is not bound in the context hierarchy', () => {
        ctx.bind('foo');
        const child = new Context(ctx);
        expect(child.isBound('bar')).toBe(false);
      });

    });

    describe('#unbind', () => {

      it('removes a binding', () => {
        ctx.bind('foo');
        expect(ctx.unbind('foo')).toBe(true);
        expect(ctx.contains('foo')).toBe(false);
      });

      it('returns false if the binding key does not exist', () => {
        ctx.bind('foo');
        expect(ctx.unbind('bar')).toBe(false);
      });

      it('cannot unbind a locked binding', () => {
        ctx.bind('foo').lock();
        expect(() => ctx.unbind('foo')).toThrow(`Cannot unbind key 'foo' of a locked binding`);
      });

      it('does not remove a binding from parent contexts', () => {
        ctx.bind('foo');
        const child = new Context(ctx);
        expect(child.unbind('foo')).toBe(false);
        expect(ctx.contains('foo')).toBe(true);
      });

    });

    describe('#getBinding', () => {

      it('returns the binding object registered under the given key', () => {
        const expected = ctx.bind('foo');
        const actual = ctx.getBinding('foo');
        expect(actual).toBe(expected);
      });

      it('reports an error when binding is not found', () => {
        expect(() => ctx.getBinding('unknown-key')).toThrow(/Unknown binding/);
      });

      it('returns undefined if an optional binding is not found', () => {
        const actual = ctx.getBinding('unknown-key', {optional: true});
        expect(actual).toBeUndefined();
      });

    });

    describe('#createBoundObject', () => {

      it('passes context as the first param', () => {
        const C = class {
          constructor(ctx) {
            this.ctx = ctx;
          }
        };
        const instance = ctx.createBoundObject(C);
        expect(instance.ctx).toBe(ctx);
      });

      it('passes other args', () => {
        const C = class {
          constructor(ctx, a1, a2) {
            this.ctx = ctx;
            this.a1 = a1;
            this.a2 = a2;
          }
        };
        const instance = ctx.createBoundObject(C, 1, 2);
        expect(instance.a1).toBe(1);
        expect(instance.a2).toBe(2);
      });

    });

    describe('#get', () => {

      it('returns the value immediately when the binding is sync', () => {
        ctx.bind('foo').to('bar');
        expect(ctx.get('foo')).toBe('bar');
      });

      it('returns undefined if an optional binding is not found', () => {
        expect(ctx.get('unknown-key', {optional: true})).toBeUndefined();
      });

      it('returns transient value', () => {
        let count = 0;
        ctx.bind('foo').toFactoryFn(() => count++).transient();
        expect(ctx.get('foo')).toBe(0);
        expect(ctx.get('foo')).toBe(1);
      });

      it('returns singleton value', () => {
        let count = 0;
        ctx.bind('foo').toFactoryFn(() => count++).singleton();
        expect(ctx.get('foo')).toBe(0);
        expect(ctx.get('foo')).toBe(0);
      });

    });

  });


});
