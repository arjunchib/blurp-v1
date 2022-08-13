import { CommandConstructor } from "../interfaces.ts";
import { buttonClicks } from "../store.ts";

export function ButtonClick(customId: string) {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log(target);
    const original = descriptor.value;
    // const command = new (target as CommandConstructor)();
    buttonClicks.set(customId, original.bind(target));

    // descriptor.value = function (...args: unknown[]) {
    //   console.log("params: ", ...args);
    //   const result = original.call(this, ...args);
    //   console.log("result: ", result);
    //   return result;
    // };
  };
}
