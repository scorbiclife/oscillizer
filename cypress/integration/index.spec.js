// Start http-server before running tests!

describe("Oscillizer Page", () => {
  it("should successfully load", () => {
    cy.visit("/");
  });

  it("should properly update app state on valid RLE input", () => {
    cy.get("textarea").should("have.id", "input-rle-container").type(`
        x = 6, y = 6, rule = B3/S23
        3b2o$2bo2bo$o2bobo$4bo$ob2o$bo!
      `);
    cy.get("button").should("have.id", "input-rle-submitter").click();
    const expectedBoundingBox = {
      xmin: 0,
      ymin: 0,
      xmax: 5,
      ymax: 5,
    };
    const expectedSubperiods = [
      { cell: [0, 2], subperiod: 4 },
      { cell: [0, 3], subperiod: 4 },
      { cell: [0, 4], subperiod: 4 },
      { cell: [1, 2], subperiod: 4 },
      { cell: [1, 3], subperiod: 4 },
      { cell: [1, 4], subperiod: 2 },
      { cell: [1, 5], subperiod: 4 },
      { cell: [2, 1], subperiod: 1 },
      { cell: [2, 3], subperiod: 2 },
      { cell: [2, 4], subperiod: 4 },
      { cell: [2, 5], subperiod: 4 },
      { cell: [3, 0], subperiod: 1 },
      { cell: [3, 2], subperiod: 1 },
      { cell: [3, 4], subperiod: 4 },
      { cell: [3, 5], subperiod: 4 },
      { cell: [4, 0], subperiod: 1 },
      { cell: [4, 3], subperiod: 1 },
      { cell: [5, 1], subperiod: 1 },
      { cell: [5, 2], subperiod: 1 },
    ];
    const getOscInfoValue = () =>
      cy.window().its("appState").its("oscInfo").its("value");
    getOscInfoValue().its("success").should("equal", true);
    getOscInfoValue()
      .its("subperiods")
      .should("deep.members", expectedSubperiods);
    getOscInfoValue()
      .its("boundingBox")
      .should("deep.equal", expectedBoundingBox);
  });

  it("should update app state when on change in RLE selection", () => {
    cy.get("#cell-style-selector").find("input[type=radio]").first().click();
    const getCellStyleValue = () =>
      cy.window().its("appState").its("initialCellStyle").its("value");
    getCellStyleValue().should("not.equal", undefined);
  });
});
