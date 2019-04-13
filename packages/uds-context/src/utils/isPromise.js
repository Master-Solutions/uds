const isPromise = (obj) => {
  if (!obj) return false;
  if (typeof obj !== 'object' && typeof obj !== 'function') return false;
  return typeof obj.then === 'function';
};

export default isPromise;
