import JWT from "jsonwebtoken";

export const generateToken = (userId: string) => {
  const secret = process.env.JWT_SECRET as string;

  const token = JWT.sign(
    { user_id: userId, iat: Math.floor(Date.now() / 1000) },
    secret
  );

  return token;
};
