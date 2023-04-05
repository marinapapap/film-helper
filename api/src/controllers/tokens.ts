import { Request, Response } from "express";
import { generateToken } from "../models/tokenGenerator";
import User, { IUser } from "../models/user";

export const TokensController = {
  Create: async (req: Request, res: Response) => {},
};
