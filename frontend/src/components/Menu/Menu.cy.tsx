import { Menu } from "./Menu";

const navigate = () => {};
const setInSession = () => {};

describe("Login", () => {
  it("renders button", () => {
    cy.mount(
      <Menu navigate={navigate} inSession={true} setInSession={setInSession} />
    );
    cy.get('[data-cy="logout-button"]').should("be.visible");
  });

  it("does not render button", () => {
    cy.mount(
      <Menu navigate={navigate} inSession={false} setInSession={setInSession} />
    );
    cy.get('[data-cy="logout-button"]').should("not.exist");
  });
});
