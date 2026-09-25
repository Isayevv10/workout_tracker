import prisma from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  async registerUser(
    username: string,
    email: string,
    password: string,
  ): Promise<any> {
    const existingUser: any = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      throw new Error("Email və ya istifadəçi adı artıq mövcuddur.");
    }

    const hash_password = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password_hash: hash_password,
      },
    });

    const jwt_token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "1h" },
    );

    return { jwt_token, newUser };
  }

  async login(email: string, password: string): Promise<any> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error("Bele istifadechi yoxdur");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new Error("Shifre yanlishdir");
    }

    const jwt_token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "1h" },
    );

    return { jwt_token, email: user.email, username: user.username };
  }
}
