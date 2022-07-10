import { RenderState } from "../structures/RenderState.ts";

export function useState<T>(key: string, initialValue: T) {
  let state = initialValue;
  const rs = RenderState.active!;
  if (rs.store.has(key)) {
    state = rs.store.get(key);
  } else {
    rs.store.set(key, state);
  }
  const setState = (value: T) => {
    if (rs.mode !== "input2" && rs.mode !== "output1") return;
    state = value;
    rs.store.set(key, value);
  };
  return [state, setState] as const;
}
