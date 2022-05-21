export const jsx = (
  tag: string | Function,
  props: object,
  ...children: any[]
) => {
  if (typeof tag === "function") {
    return tag({ ...props, children });
  } else {
    return [tag, props, children];
  }
};
