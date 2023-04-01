import RandomFilm from "./RandomFilm";

const navigate = () => {};

describe("RandomFilm", () => {
  beforeEach(() => {
    cy.mount(<RandomFilm navigate={navigate} />);
  });

  it("runs", () => {});
});
