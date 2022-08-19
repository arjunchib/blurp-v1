import { hooks } from "../store.ts";

export function Autocomplete(option: string) {
  return function (
    target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    setTimeout(() => {
      const commandName = target[Symbol.for("name")];
      const key = `${commandName};${option}`;
      hooks.autocomplete.set(key, original.bind(target));
    }, 0);
  };
}
