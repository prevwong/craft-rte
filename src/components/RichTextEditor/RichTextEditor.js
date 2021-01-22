import { Slate, Editable, useSlateNode } from "@craftjs/slate";
import React, { useCallback, useMemo } from "react";
import { createEditor } from "slate";
import { withReact } from "slate-react";
import { compose } from "redux";
import plugins from "./plugins";
import { useEditor, useNode } from "@craftjs/core";
import { ComponentHandler } from "./ComponentHandler";
import styled from "styled-components";

const Element = ({ element, render }) => {
  return render;
};

const Handler = ({ width, color }) => (
  <svg viewBox="0 0 10 10" width={width} fill={color}>
    <path d="M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z"></path>
  </svg>
);

const EditableContainer = styled.div`
  position: relative;
`;

const EditableWrapper = ({
  attributes: { ref, ...attributes },
  children,
}: any) => {
  const { id } = useNode();

  const { isElementHovered, isRTESelected, isRTEHovered } = useEditor(
    (state, query) => {
      const hoveredElement = query.getEvent("hovered").first();

      let isElementBeingHovered = false;

      if (state.nodes[id]) {
        if (hoveredElement) {
          isElementBeingHovered = query
            .node(hoveredElement)
            .ancestors()
            .includes(id);
        }
      }

      return {
        isElementHovered: isElementBeingHovered,
        isRTESelected: query.node(id).isSelected(),
        isRTEHovered: query.node(id).isHovered(),
      };
    }
  );

  return (
    <EditableContainer
      data-craft-node={id}
      {...attributes}
      ref={(dom) => {
        // eslint-disable-next-line no-param-reassign
        ref.current = dom;
      }}
    >
      <ComponentHandler
        mouseover={isElementHovered}
        selected={isRTESelected}
        hovered={isRTEHovered}
      >
        <Handler />
      </ComponentHandler>
      {children}
    </EditableContainer>
  );
};

export const RichTextEditor = () => {
  const { id } = useNode();
  const editor = useMemo(() => compose(...plugins(id))(createEditor()), []);
  const renderElement = useCallback((props) => <Element {...props} />, []);

  return (
    <Slate editor={editor}>
      <Editable as={EditableWrapper} renderElement={renderElement} />
    </Slate>
  );
};

RichTextEditor.craft = {
  isCanvas: true,
};
