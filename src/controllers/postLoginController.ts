import RegistrationModel from "../models/registrationModel.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const postLoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await RegistrationModel.findOne(
      { email },
      { _id: 0, _v: 0 }
    ).select("+password");

    if (!user) {
      return res.status(401).json("user with this email did not fined");
    }

    const result = await bcrypt.compare(password, user.password);

    if (result) {
      const signData = {
        email: user.email,
        id: user.id,
      };
      const token = jwt.sign(signData, process.env.JWT_SECRET!);
      return res.status(200).json({ ...signData, token });
    }
  } catch (error) {
    return res.status(401).json(error);
  }
};
