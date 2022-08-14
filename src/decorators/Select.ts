import { hooks } from "../store.ts";

export function Select(customId: string) {
  return function (
    target: unknown,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    hooks.select.set(customId, original.bind(target));
  };
}
