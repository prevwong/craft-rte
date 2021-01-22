import { withReact } from "slate-react";

import { withList } from "./withList";
import { withMarkdownShortcuts } from "./withMarkdownShortcuts";

export default function (id: any) {
  return [
    withMarkdownShortcuts,
    withList(id, {
      typeLi: "ListItem",
      typeOl: "List",
      typeP: "Typography",
      typeUl: "List",
    }),
    withReact,
  ];
}
