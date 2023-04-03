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

  it("when button is clicked, elements are rendered and populated with correct information", () => {
    cy.intercept("GET", "/randomFilm", (req) => {
      req.reply({
        body: {
          message: "ok",
          result: {
            id: "1",
            rank: "1",
            title: "Film 1",
            fullTitle: "Film 1 (2007)",
            year: "2007",
            image: "img.jpeg",
            crew: "Director",
            imDbRating: "5.7",
            imDbRatingCount: "100",
          },
        },
      });
    }).as("getFilm");

    cy.visit("/");
    cy.get('[data-cy="button"]').click();

    cy.wait("@getFilm").then(() => {
      cy.get('[data-cy="fulltitle"]').should("contain.text", "Film 1 (2007)");
      cy.get('[data-cy="image"]').should("exist");
      cy.get('[data-cy="crew"]').should("contain.text", "Director");
      cy.get('[data-cy="rating"]').should("contain.text", "5.7");
    });
  });
});
