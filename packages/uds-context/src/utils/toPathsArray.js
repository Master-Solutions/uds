import traverseContextTree from "./traverseContextTree";

const toPathsArray = (ctx) => {
  const res = [];
  traverseContextTree(ctx, (currentCtx) => {
    res.push(currentCtx.rootPathArray());
  });
  return res;
};

export default toPathsArray;
