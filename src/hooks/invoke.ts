import { RenderState } from "../structures/RenderState.ts";

export function onInvoke(fn: () => Promise<void>) {
  const rs = RenderState.active!;
  rs.invokeFn = fn;
}
