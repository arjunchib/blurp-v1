// deno-lint-ignore-file ban-types
export const jsx = (
  tag: string | Function,
  props: Record<string | "children", unknown>
) => {
  if (typeof tag === "function") {
    return tag({ ...props });
  } else {
    return [tag, props];
  }
};

export const jsxs = (tag: string | Function, props: object) => {
  if (typeof tag === "function") {
    return tag({ ...props });
  } else {
    return [tag, props];
  }
};
