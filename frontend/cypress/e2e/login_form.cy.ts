describe("Login", () => {
  it("request to the host returns the correct html response body", () => {
    cy.request("/").then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.include("<title>React App</title>");
    });
  });

  it("stays on login page if user doesn't exist", () => {
    cy.visit("/");
    cy.get('[data-cy="login-email"]').type("email@email.com");
    cy.get('[data-cy="login-password"]').type("123456");
    cy.get('[data-cy="login-submit"]').click();
    cy.url().should("not.include", "/randomFilm");
  });
});
