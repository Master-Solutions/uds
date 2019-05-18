import {v1 as uuidv1} from 'uuid';
import Binding from "./Binding";

class Context {

  constructor(...args) {
    let parent = undefined;
    let name = undefined;

    if (args.length > 0) {
      if (typeof args[0] === 'string') {
        name = args[0];
        if (args.length > 1 && typeof args[1] === 'object')
          parent = args[1];
      }
      if (typeof args[0] === 'object') {
        parent = args[0];
      }
    }

    this.parent = parent;
    this.name = name ? name : uuidv1();

    this.childContexts = {};

    if (this.parent)
      this.parent.addChildContext(this);

    this.registry = {};
  }

  setParentContext(parent) {
    if (this.name in parent.childContexts)
      throw new Error(`Child context '${this.name}' already exists in '${parent.name}' context`);
    parent.childContexts[this.name] = this;
    this.parent = parent;
  }

  addChildContext(ctx) {
    if (ctx.name in this.childContexts)
      throw new Error(`Child context '${ctx.name}' already exists in '${this.name}' context`);
    this.childContexts[ctx.name] = ctx;
    ctx.parent = this;
  }

  getChildContexts() {
    return Object.values(this.childContexts);
  }

  rootPathArray() {
    if (this.parent)
      return this.parent.rootPathArray().concat([this]);
    return [this];
  }

  rootPathNamesArray() {
    return this.rootPathArray().map(ctx => ctx.name);
  }

  rootPath() {
    return this.rootPathNamesArray().join('.');
  }

  bind(key) {
    return this.addBinding(new Binding(this, key))
  }

  addBinding(binding) {
    const existing = this.registry[binding.key];
    if (existing && existing.locked)
      throw new Error(`Cannot rebind key '${binding.key}' to a locked binding`);

    this.registry[binding.key] = binding;
    return binding;
  }

  contains(key) {
    return key in this.registry;
  }

  isBound(key) {
    if (this.contains(key))
      return true;
    if (this.parent)
      return this.parent.isBound(key);
    return false;
  }

  unbind(key) {
    const existing = this.registry[key];
    if (!existing)
      return false;
    if (existing.locked)
      throw new Error(`Cannot unbind key '${key}' of a locked binding`);
    delete this.registry[key];
    return true;
  }

  getBinding(key, options = {}) {
    const binding = this.registry[key];
    if (!binding) {
      if (options.optional)
        return undefined;
      throw new Error(`Unknown binding ${key}`);
    }
    return binding;
  }

  createBoundObject(c, ...rest) {
    return new c(this, ...rest);
  }

  get(key, options = {}) {
    const binding = this.getBinding(key, options);
    return binding && binding.getValue();
  }
}

export default Context;
