import { Menu } from "./Menu";

const navigate = () => {};
const setInSession = () => {};

describe("Menu", () => {
  it("renders button", () => {
    cy.mount(
      <Menu
        navigate={navigate}
        inSession={true}
        setInSession={setInSession}
        isHomepage={true}
      />
    );
    cy.get('[data-cy="logout-button"]').should("be.visible");
  });

  it("does not render button", () => {
    cy.mount(
      <Menu
        navigate={navigate}
        inSession={false}
        setInSession={setInSession}
        isHomepage={true}
      />
    );
    cy.get('[data-cy="logout-button"]').should("not.exist");
  });
});
