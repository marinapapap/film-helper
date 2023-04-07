import { LogoutForm } from "./Logout";

const navigate = () => {};

describe("Login", () => {
  beforeEach(() => {
    cy.mount(<LogoutForm navigate={navigate} inSession={true} />);
  });

  it("renders button", () => {
    cy.get('[data-cy="logout-button"]').should("be.visible");
  });
});
