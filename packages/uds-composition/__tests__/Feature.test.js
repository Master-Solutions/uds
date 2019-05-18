import compose from '@stamp/compose';
import Feature from "../src/Feature";

describe('Feature', () => {

  beforeEach(() => {

  });

  describe('api composition', () => {

    it('example 1', () => {
      const App = Feature.compose({methods: {foo: () => 'bar'}});
      const app = new App();
      expect(app.foo()).toBe('bar');
    });

    it('example 2', () => {
      const Sub = Feature.compose({methods: {test: () => 'Yo!'}});

      const App = Feature.compose({
        deepProperties: {
          features: {
            sub: Sub
          }
        }
      });
      const app = new App();
      console.log(app.features);
      //expect(app.feature('sub').test()).toBe('Yo!');
    });

    // it('example 2', () => {
    //   const Sub = Feature.compose({methods: {test: () => 'Yo!'}});
    //
    //   const App = Feature.compose({
    //     deepProps: {
    //       features: {
    //         sub: Sub
    //       }
    //     }
    //   });
    //   const app = new App();
    //   console.log(app);
    //   expect(app.feature('sub').test()).toBe('Yo!');
    // });

    // it('adds method', () => {
    //   const App = compose({methods: {foo: () => 'bar'}});
    //   const app = new App();
    //   expect(app.foo()).toBe('bar');
    // });
    //
    // it('adds method', () => {
    //   const CompositeFeature = compose({
    //     props: {
    //       features: {}
    //     },
    //     methods: {
    //       feature: (name) => this.features[name],
    //       features: () => Object.keys(this.features)
    //     }
    //   });
    //   const Calculator = compose({name: 'calculator', methods: {add: (a, b) => a + b}});
    //   const Dumper = compose({name: 'dumper', methods: {dump: (obj) => console.log(JSON.stringify(obj, null, 2))}});
    //   const App = compose(Calculator, Dumper);
    //   const app = new App();
    //   console.dir(App, {depth: null});
    //   console.dir(app.constructor, {depth: null});
    //   expect(() => app.dump(app.add(1,2))).not.toThrow();
    // });

  });

});
