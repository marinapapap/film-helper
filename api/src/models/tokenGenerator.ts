import JWT from "jsonwebtoken";

export const generateToken = (userId: number) => {
  const secret = process.env.JWT_SECRET as string;
  console.log(secret);
  const token = JWT.sign(
    { user_id: userId, iat: Math.floor(Date.now() / 1000) },
    secret
  );

  return token;
};
