describe("Random Film", () => {
  it("makes succesful request", () => {
    cy.request("/randomFilm").then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("result");
    });
  });

  it("renders random film info when button is clicked", () => {
    cy.visit("/");
    cy.get('[data-cy="button"]').click();
    cy.get('[data-cy="fulltitle"]').should("be.visible");
    cy.get('[data-cy="image"]').should("be.visible");
    cy.get('[data-cy="crew"]').should("be.visible");
    cy.get('[data-cy="rating"]').should("be.visible");
  });
});
