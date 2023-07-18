import { NextFunction, Request, Response } from "express";
import User from "../models/user";

interface Register_body {
  data: {
    username: string;
    password: string;
  };
}

export const register = async (
  req: Request<{}, {}, Register_body>,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body.data;

  if (!username) {
    return res.status(401).send({ message: "Username not provided" });
  }
  if (!password) {
    return res.status(401).send({ message: "Password not provided" });
  }

  const new_user = await new User({ username, password }).save();

  res.send(new_user._id);
};

export const login = async (
  req: Request<{}, {}, Register_body>,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body.data;

  if (!username) {
    return res.status(401).send({ message: "Username not provided" });
  }
  if (!password) {
    return res.status(401).send({ message: "Password not provided" });
  }

  const found_user = await User.findOne({ username, password });

  if (!found_user) {
    return res.status(401).send({ message: "User not found" });
  }

  res.send(found_user._id);
};
