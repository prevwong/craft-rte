import React, { useCallback } from "react";
import { useEditor } from "@craftjs/core";
import hotkey from "is-hotkey";
import EventListener from "react-event-listener";

export const EventManager = ({ children }) => {
  const { actions } = useEditor();

  const onKeyDown = useCallback(
    (e) => {
      if (hotkey("mod+z", e)) {
        // slateEditor.selection = null;
        actions.history.undo();
      } else if (hotkey("shift+mod+z", e)) {
        // slateEditor.selection = null;
        actions.history.redo();
      } else if (hotkey("esc", e)) {
        // setFocus(null);
      }
    },
    [actions.history]
  );

  return (
    <EventListener target="window" onKeyDown={onKeyDown}>
      {children}
    </EventListener>
  );
};
