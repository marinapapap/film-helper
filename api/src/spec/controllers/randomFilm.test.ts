import request from "supertest";
import { app } from "../../server";
import fetch from "jest-fetch-mock";

require("jest-fetch-mock").enableMocks();

describe("RandomFilmController", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("'Find' method returns status code 200", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        items: [{ film: "hey film" }],
      })
    );

    let response = await request(app).get("/randomFilm");
    expect(response.status).toEqual(200);
  });

  test("'Find' method returns status code 500", async () => {
    let response = await request(app).get("/randomFilm");
    expect(response.status).toEqual(500);
  });
});
