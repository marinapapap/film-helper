import { LoginForm } from "./Login";

const navigate = () => {};
const setGlobalSession = () => {};

describe("Login", () => {
  beforeEach(() => {
    cy.mount(<LoginForm navigate={navigate} />);
  });

  it("renders email field", () => {
    cy.get('[data-cy="login-email"]').should("be.visible");
  });

  it("renders password field", () => {
    cy.get('[data-cy="login-password"]').should("be.visible");
  });

  it("renders submit button", () => {
    cy.get('[data-cy="login-submit"]').should("be.visible");
  });
});
