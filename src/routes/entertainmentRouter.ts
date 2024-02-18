import express from "express";
import { postRegistrationController } from "../controllers/postRegistrationController.js";
import { postLoginController } from "../controllers/postLoginController.js";

const entertainmentRouter = express.Router();
entertainmentRouter.post("/register", postRegistrationController);
entertainmentRouter.post("/login", postLoginController);

export default entertainmentRouter;
