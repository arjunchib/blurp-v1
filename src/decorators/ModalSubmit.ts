import { hooks } from "../store.ts";

export function ModalSubmit(customId: string) {
  return function (
    target: unknown,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    hooks.modalSubmit.set(customId, original.bind(target));
  };
}
