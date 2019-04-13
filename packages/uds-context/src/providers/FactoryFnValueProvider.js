
class FactoryFnValueProvider {

  constructor(factoryFn) {
    this.factoryFn = factoryFn;
  }

  getValue() {
    return this.factoryFn();
  }

}

export default FactoryFnValueProvider;
