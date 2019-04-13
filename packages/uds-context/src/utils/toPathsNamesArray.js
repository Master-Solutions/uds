import traverseContextTree from "./traverseContextTree";

const toPathsNamesArray = (ctx) => {
  const res = [];
  traverseContextTree(ctx, (currentCtx) => {
    res.push(currentCtx.rootPathNamesArray());
  });
  return res;
};

export default toPathsNamesArray;
