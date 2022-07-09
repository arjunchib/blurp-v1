import { store, state as _state } from "../globals.ts";

export function useState<T>(key: string, initialValue: T) {
  let state = initialValue;
  if (store.has(key)) {
    state = store.get(key);
  } else {
    store.set(key, state);
  }
  const setState = (value: T) => {
    if (_state.mode !== "input2" && _state.mode !== "output1") return;
    state = value;
    store.set(key, value);
  };
  return [state, setState] as const;
}
