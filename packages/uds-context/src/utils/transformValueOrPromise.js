import isPromise from "./isPromise";

const transformValueOrPromise = (valueOrPromise, transformFn) => {
  if (isPromise(valueOrPromise))
    return valueOrPromise.then(transformFn);
  else
    return transformFn(valueOrPromise);
};

export default transformValueOrPromise;
