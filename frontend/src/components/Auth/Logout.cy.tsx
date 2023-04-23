import { Logout } from "./Logout";

const navigate = () => {};
const setInSession = () => {};

describe("Login", () => {
  it("renders button", () => {
    cy.mount(
      <Logout
        navigate={navigate}
        inSession={true}
        setInSession={setInSession}
      />
    );
    cy.get('[data-cy="logout-button"]').should("be.visible");
  });

  it("does not render button", () => {
    cy.mount(
      <Logout
        navigate={navigate}
        inSession={false}
        setInSession={setInSession}
      />
    );
    cy.get('[data-cy="logout-button"]').should("not.exist");
  });
});
