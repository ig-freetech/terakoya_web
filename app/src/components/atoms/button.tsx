import * as React from "react";

type BasicButtonProps = {
  text: string;
};
export const BasicButton: React.FC<BasicButtonProps> = (props) => {
  const { text } = props;
  return <button>{text}</button>;
};
