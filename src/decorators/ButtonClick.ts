import { hooks } from "../store.ts";

export function ButtonClick(customId: string) {
  return function (
    target: unknown,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    hooks.buttonClick.set(customId, original.bind(target));
  };
}
