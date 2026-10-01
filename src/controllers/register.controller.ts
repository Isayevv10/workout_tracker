import express from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export const register = async (req: express.Request, res: express.Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Username, email, and password are required",
    });
  }

  const { jwt_token, newUser } = await authService.registerUser(
    username,
    email,
    password,
  );

  return res.status(201).json({
    message: "İstifadəçi uğurla qeydiyyatdan keçdi!",
    userId: newUser.id,
    token: jwt_token,
    email: newUser.email,
    username: newUser.username,
  });
};

export const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  const {
    jwt_token,
    email: user_email,
    username,
  } = await authService.login(email, password);

  return res.status(200).json({
    message: "Daxil oldunuz ugurla",
    token: jwt_token,
    email: user_email,
    username,
  });
};
