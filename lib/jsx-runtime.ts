export const jsx = (tag: string | Function, props: object) => {
  // console.log(tag, props);
  if (typeof tag === "function") {
    return tag({ ...props });
  } else {
    return [tag, props];
  }
};

export { jsx as jsxs };
