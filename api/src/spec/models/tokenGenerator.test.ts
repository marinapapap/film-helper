import JWT from "jsonwebtoken";
import { generateToken } from "../../models/tokenGenerator";

describe("TokenController", () => {
  describe("jsonwebtoken", () => {
    test("returns a token containing user_id", () => {
      const user_id = 1;
      const token = generateToken(user_id);
      const payload: any = JWT.verify(token, process.env.JWT_SECRET as string);
      expect(payload.user_id).toEqual(user_id);
    });
  });
});
