import { TextWithList, ListToNormalize, typeObj } from "../../fixtures/slate";

const dataTransfer = new DataTransfer();

describe("typing", () => {
  before(() => {
    cy.clock();
    cy.visit("http://localhost:3003");
  });
  it("should be able to type content correctly", () => {
    cy.tick(10000);
    typeObj(cy.get('[data-slate-editor="true"]'), ListToNormalize, true);
  });
  describe("moving", () => {
    it("should create new Slate node", () => {
      const d = cy.get("#connector-button").last();

      cy.get("#connector-button")
        .last()
        .trigger("mousedown", { force: true, dataTransfer })
        .trigger("dragstart");

      cy.get('li[data-slate-node="element"]')
        .last()
        .prev()
        .trigger("dragenter", { force: true, clientY: 160, dataTransfer });

      cy.get("#connector-button").last().trigger("dragend");
    });
    it("", () => {
      const d = cy.get('div[data-slate-editor="true"]').last();

      d.trigger("mousedown", { force: true }).trigger("dragstart", {
        force: true,
        dataTransfer,
      });

      cy.get('ul[data-slate-node="element"]')
        .eq(1)
        .prev()
        .trigger("dragenter", {
          force: true,
          clientX: 20,
          clientY: 110,
          dataTransfer,
        });

      d.trigger("dragend", {
        force: true,
      });
    });
  });
});
