import { LogoutForm } from "./Logout";

const navigate = () => {};

describe("Login", () => {
  it("renders button", () => {
    cy.mount(<LogoutForm navigate={navigate} inSession={true} />);
    cy.get('[data-cy="logout-button"]').should("be.visible");
  });

  it("does not render button", () => {
    cy.mount(<LogoutForm navigate={navigate} inSession={false} />);
    cy.get('[data-cy="logout-button"]').should("not.exist");
  });
});
