import { TextWithList, typeObj } from "../../fixtures/slate";

let lastSelection;

const updateSelection = () => {
  cy.window().then((window) => {
    const selection = window.getSelection();

    const dom = selection.anchorNode.parentNode.parentNode.getAttribute(
      "data-craft-leaf-node"
    );

    lastSelection = {
      dom,
      offset: selection.anchorOffset,
    };
  });
};

const historyAction = async (undoOrRedo) => {
  const hotkey = undoOrRedo == "undo" ? "{meta}{z}" : "{shift}{meta}{z}";
  return new Promise((resolve) => {
    cy.get("body")
      .type(hotkey)
      .then(() => {
        cy.window().then(async (window) => {
          const selection = window.getSelection();

          const dom = selection.anchorNode.parentNode.parentNode.getAttribute(
            "data-craft-leaf-node"
          );

          const newSelection = {
            dom,
            offset: selection.anchorOffset,
          };

          if (lastSelection) {
            if (lastSelection.dom === newSelection.dom) {
              if (
                (undoOrRedo === "undo" &&
                  newSelection.offset >= lastSelection.offset) ||
                (undoOrRedo === "redo" &&
                  newSelection.offset <= lastSelection.offset)
              ) {
                throw new Error();
              }
            }
          }
          lastSelection = newSelection;
          resolve();
        });
      });
  });
};

describe("typing", () => {
  before(() => {
    cy.clock();
    cy.visit("http://localhost:3003");
    cy.window().then((cy_window) => {
      window.cy_window = cy_window;
    });
  });
  it("should be able to type content correctly", () => {
    cy.tick(10000);
    typeObj(cy.get('[data-slate-editor="true"]'), TextWithList);
    updateSelection();
  });
  // describe("history", () => {
  //   it("should maintain caret on undo", async () => {
  //     await historyAction("undo");
  //     await historyAction("undo");
  //   });
  //   it("should maintain caret on redo", async () => {
  //     await historyAction("redo");
  //     await historyAction("redo");
  //   });
  // });
  describe.skip("moving", () => {
    it("should create new Slate node", () => {
      const dataTransfer = new DataTransfer();

      const d = cy.get("#connector-button").last();

      cy.get("#connector-button")
        .last()
        .trigger("mousedown", { force: true })
        .trigger("dragstart");

      cy.get('ul[data-slate-node="element"]')
        .last()
        .prev()
        .trigger("dragenter", { force: true, clientY: 250 });

      cy.get("#connector-button").last().trigger("dragend");
    });
    it("", () => {
      const d = cy.get('div[data-slate-editor="true"]').last();

      d.trigger("mousedown", { force: true })
        .trigger("dragstart", { force: true })
        .then((dom) => {
          console.log("dom", dom[0]);
        });

      cy.get('ul[data-slate-node="element"]')
        .first()
        .prev()
        .trigger("dragenter", { force: true, clientX: 20, clientY: 110 })
        .then((dom) => console.log(88, dom[0]));

      d.trigger("dragend", {
        force: true,
      });
    });
  });
});
