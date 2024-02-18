import RegistrationModel from "../models/registrationModel.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const postRegistrationController = async (
  req: Request,
  res: Response
) => {
  const { email, password, repeatPassword } = req.body;
  console.log(req.body);

  if (password !== repeatPassword) {
    return res.status(400).json({ error: "Password do not match" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new RegistrationModel({
      email,
      password: hashedPassword,
    });
    newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(401).json(error);
  }
};
