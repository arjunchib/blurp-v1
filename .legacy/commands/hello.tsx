// import { createCommand, useString } from "somewhere";

// const props = [
//   useString('name', {required: true})
// ]

// export default createCommand(Hello, {
//   name: 'asdasd',
//   description: 'asdasd'
//   props
// })

// function Hello(props) {
//   // const name = useString("name");

//   return {
//     content: `Hello, ${props.name}!`,
//   };
// }
export {};

console.log(<Message name="hi"></Message>);

interface Option {
  type: "string" | "integer";
  required: boolean;
}

type Options = {
  [index: string]: Option;
};

type Propify<T extends Options> = {
  [P in keyof T as T[P]["required"] extends true ? P : never]-?: Typify<T[P]>;
} & {
  [P in keyof T as T[P]["required"] extends false ? P : never]?: Typify<T[P]>;
};

type Typify<T extends Option> = T["type"] extends "string" ? string : number;

type Expand<T> = T extends unknown ? { [K in keyof T]: T[K] } : never;

interface Command<T extends Options> {
  name: string;
  description: string;
  options: T;
  resolve: (props: Expand<Propify<T>>) => void;
}

function createCommand<T extends Options>(options: Command<T>) {
  return options;
}

function Message(props: any) {
  console.log(props);
  return props.name;
}

export const Hello = createCommand({
  name: "asdasd",
  description: "asdasd",
  options: {
    name: {
      type: "string",
      required: false,
    },
  },
  resolve(props) {
    props.name;
    return <Message name="hi"></Message>;
  },
});
