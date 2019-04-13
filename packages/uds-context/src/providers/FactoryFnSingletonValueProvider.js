
class FactoryFnSingletonValueProvider {

  constructor(factoryFn) {
    this.factoryFn = factoryFn;
    this._cache = undefined;
    this._cached = false;
  }

  getValue() {
    if (this._cached)
      return this._cache;

    this._cache = this.factoryFn();
    this._cached = true;

    return this._cache;
  }

}

export default FactoryFnSingletonValueProvider;
