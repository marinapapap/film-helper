import JWT from "jsonwebtoken";
import { User } from "./models/user";

const getUserIdFromToken = (token: string) => {
  const payload = JWT.verify(token, process.env.JWT_SECRET as string) as {
    user_id: string;
  };
  return payload.user_id;
};

const findUserById = (userId: string) => {
  return User.findOne({ _id: userId });
};

export { getUserIdFromToken, findUserById };
