import React from "react";
import { Button as StyledButton } from "@adobe/react-spectrum";
import { useNode } from "@craftjs/core";

export const Button = () => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div ref={(dom) => connect(drag(dom))}>
      <StyledButton variant={"cta"}>Button</StyledButton>
    </div>
  );
};
