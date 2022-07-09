import { store, state as _state } from "../globals.ts";

export function useState<T>(key: string, initialValue: T) {
  let state = initialValue;
  store.set(key, state);
  const setState = (value: T) => {
    if (_state.mode !== "input2") return;
    state = value;
    store.set(key, value);
  };
  return [state, setState] as const;
}
