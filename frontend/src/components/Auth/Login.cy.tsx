import { LoginForm } from "./Login";

const navigate = () => {};

describe("Login", () => {
  beforeEach(() => {
    cy.mount(<LoginForm navigate={navigate} />);
  });

  it("renders email field", () => {
    cy.get('[data-cy="login-email"]').should("be.visible");
  });
});
