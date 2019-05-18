import {
  isFunction, isObject,
  assign, assignWith,
  pick, pickBy,
  flatten
} from 'lodash';

export const isDescriptor = isObject;
export const isFeature = obj => isFunction(obj) && isFunction(obj.compose) && isDescriptor(obj.compose);
export const isComposable = obj => isDescriptor(obj) || isFeature(obj);

const compose = (...composables) => {
  const newDescriptor = composables.reduce(mergeComposable, {});
  return createFeature(newDescriptor);
};

const mergeComposable = (dstDescriptor, srcComposable) => {
  const srcDescriptor = isFeature(srcComposable) ? srcComposable.compose : srcComposable;
  if (!srcDescriptor) return dstDescriptor;

  dstDescriptor.properties = Object.assign(
    dstDescriptor.properties || {}, srcDescriptor.properties);
  dstDescriptor.methods = Object.assign(
    dstDescriptor.methods || {}, srcDescriptor.methods);
  dstDescriptor.initializers = (dstDescriptor.initializers || [])
  .concat(srcDescriptor.initializers || []);

  return dstDescriptor;
};

const createFeature = (descriptor) => {
  const Feature = createFactory(descriptor);
  Feature.compose = () => compose.apply(this, arguments);
  Object.assign(Feature.compose, descriptor);
  return Feature;
};

const createFactory = (descriptor) => {
  const Feature = (options, ...args) => {
    const instance = Object.create(descriptor.methods);
    Object.assign(instance, descriptor.properties);
    (descriptor.initializers || []).forEach(initializer => {
      initializer.call(instance, options,
        {feature: Feature, args: [options].concat(args), instance});
    });
    return instance;
  };
  return Feature;
};

export default compose;
