import React from "react";

export const Typography = ({ element, attributes, children }) => {
  const Comp = element.data.variant || "p";
  return <Comp {...attributes}>{children}</Comp>;
};

Typography.craft = {
  isCanvas: false,
};

Typography.slate = {
  toCraftNode: (slateNode) => (craftNode) => {
    craftNode.data.props.variant = slateNode.data.variant;
  },
  toSlateNode: (craftNode) => (slateNode) => {
    slateNode.data = {
      ...(craftNode.data.props.variant
        ? { variant: craftNode.data.props.variant }
        : {}),
    };
  },
};

export const List = ({ element, attributes, children }) => {
  return (
    <ul
      style={{ marginBottom: "15px" }}
      data-craft-node={element.id}
      {...attributes}
    >
      {children}
    </ul>
  );
};

List.craft = {
  isCanvas: true,
};

List.slate = {
  toSlateNode: () => (slateNode) => {
    slateNode.data = {};
  },
};

export const ListItem = ({ element, attributes, children }) => {
  return (
    <li data-craft-node={element.id} {...attributes}>
      {children}
    </li>
  );
};

ListItem.craft = {
  isCanvas: false,
};

ListItem.slate = {
  toSlateNode: () => (slateNode) => {
    slateNode.data = {};
  },
};
