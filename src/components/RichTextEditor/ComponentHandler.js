import styled, { css } from "styled-components";

export const getHandlerColor = (isSelected, isHovered) => {
  if (isSelected) {
    return {
      bg: "#333",
      icon: "#fff",
    };
  }
  if (isHovered) {
    return {
      bg: "#eee",
      icon: "#ccc",
    };
  }

  return {
    bg: "transparent",
    icon: "#ccc",
  };
};

export const ComponentHandler = styled.div`
  position: absolute;
  padding: 2px 2px;
  left: -16px;
  top: -1px;
  opacity: 0;

  svg {
    position: relative;
    top: -2px;
    left: 0px;
    width: 12px;
  }
  ${(props) => {
    const { bg, icon } = getHandlerColor(props.selected, props.hovered);
    let opacity = 0;
    if (props.mouseover || props.selected || props.hovered) {
      opacity = 1;
    }

    return css`
      background: ${bg};
      svg {
        fill: ${icon};
      }
      opacity: ${opacity};
    `;
  }}
`;
