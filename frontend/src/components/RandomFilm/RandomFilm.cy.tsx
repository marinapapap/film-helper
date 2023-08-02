import { RandomFilm } from "./RandomFilm";

const navigate = () => {};
const setGlobalSession = () => {};

describe("RandomFilm", () => {
  beforeEach(() => {
    cy.mount(<RandomFilm navigate={navigate} />);
  });

  it("renders button", () => {
    cy.get('[data-cy="button"]').should("be.visible");
  });
});
