import express from "express";
import { login, logout, register } from "../controllers/auth.controllers.js";
import { verifyJwt } from "../middlerwares/auth.middleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", verifyJwt, logout);

export default router;
