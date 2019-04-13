const traverseContextTree = (ctx, fn) => {
  fn(ctx);
  Object.values(ctx.childContexts).forEach(fn);
};

export default traverseContextTree;
