import ConstantValueProvider from "./providers/ConstantValueProvider";
import FactoryFnValueProvider from "./providers/FactoryFnValueProvider";

export const BindingLifeTime = {
  TRANSIENT: 'transient',
  SINGLETON: 'singleton',
};

export const BindingType = {
  CONSTANT: 'constant',
  FACTORY_FUNCTION: 'factoryFunction',
  CLASS: 'class'
};

class Binding {

  constructor(ctx, key) {
    this.ctx = ctx;
    this.key = key;
    this.type = undefined;
    this.lifeTime = BindingLifeTime.TRANSIENT;
    this.options = {};
    this._cache = undefined;
    this._cached = false;
  }

  lock() {
    this.locked = true;
    return this;
  }

  to(value) {
    this.type = BindingType.CONSTANT;
    this.options.value = value;
    return this;
  }

  toFactoryFn(factoryFn) {
    this.type = BindingType.FACTORY_FUNCTION;
    this.options.factoryFn = factoryFn;
    return this;
  }

  withLifeTime(lifeTime) {
    this.lifeTime = lifeTime;
    return this;
  }

  transient() {
    this.lifeTime = BindingLifeTime.TRANSIENT;
    return this;
  }

  singleton() {
    this.lifeTime = BindingLifeTime.SINGLETON;
    return this;
  }

  createValueOrPromiseProvider() {
    if (this.type === BindingType.CONSTANT)
      return new ConstantValueProvider(this.options.value);
    if (this.type === BindingType.FACTORY_FUNCTION)
      return new FactoryFnValueProvider(this.options.factoryFn);
    throw new Error(`Cannot instantiate value provider for binding '${this.key}'`);
  }

  // returns value or promise
  getValue() {
    if (this._cached)
      return this._cache;

    const provider = this.createValueOrPromiseProvider();
    const valueOrPromise = provider.getValue();

    if (this.lifeTime === BindingLifeTime.SINGLETON) {
      this._cache = valueOrPromise;
      this._cached = true;
    }

    return valueOrPromise;
  }


}

export default Binding;
