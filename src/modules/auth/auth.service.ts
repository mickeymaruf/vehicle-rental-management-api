import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

const createUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  // password encryption
  const hashedPassword = await bcrypt.hash((password as string).toString(), 10);

  return await pool.query(
    `INSERT INTO users (name, email, password, phone, role)
    VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role`,
    [name, email, hashedPassword, phone, role]
  );
};

const loginUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  const user = result.rows[0];

  if (!user) {
    return null;
  }

  const matched = await bcrypt.compare(password.toString(), user.password);
  if (!matched) {
    return false;
  }

  // initiate jwt token
  const token = jwt.sign(
    { name: user.name, email: user.email, role: user.role },
    config.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  delete user.password;
  return { token, user: user };
};

export const AuthServices = {
  createUser,
  loginUser,
};
