export const jsx = (
  tag: string | Function,
  props: Record<string | "children", unknown>
) => {
  console.log(tag, props);
  if (typeof tag === "function") {
    props.children = [props.children];
    return tag({ ...props });
  } else {
    return [tag, props];
  }
};

export const jsxs = (tag: string | Function, props: object) => {
  if (typeof tag === "function") {
    console.log(tag, props);
    return tag({ ...props });
  } else {
    return [tag, props];
  }
};
