import { modalSubmits } from "../store.ts";

export function ModalSubmit(customId: string) {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    modalSubmits.set(customId, original.bind(target));
  };
}
