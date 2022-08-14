import { selects } from "../store.ts";

export function Select(customId: string) {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    selects.set(customId, original.bind(target));
  };
}
