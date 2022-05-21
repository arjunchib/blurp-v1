interface MessageProps {
  name: string;
}

export function Message(props: MessageProps) {
  return {
    content: `Hello, ${props.name}!`,
  };
}
