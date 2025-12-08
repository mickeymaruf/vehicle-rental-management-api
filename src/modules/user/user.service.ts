import { JwtPayload } from "jsonwebtoken";
import { pool } from "../../config/db";

const getUsers = async () => {
  return await pool.query("SELECT id, name, email, phone, role FROM users");
};

const updateUser = async (
  userId: string,
  payload: Record<string, unknown>,
  user: JwtPayload
) => {
  const { name, email, phone, role } = payload;

  if (user.role === "customer" && userId != user.id)
    throw new Error("Forbidden access");

  return await pool.query(
    `
      UPDATE users
      SET name = $2, email = $3, phone = $4, role = $5
      WHERE id = $1 RETURNING id, name, email, phone, role;
    `,
    [userId, name, email, phone, role]
  );
};

const deleteUser = async (userId: string) => {
  const bookingResult = await pool.query(
    "SELECT status FROM bookings WHERE customer_id = $1",
    [userId]
  );

  if (bookingResult.rows[0].status === "active") {
    throw new Error("Cannot delete user with active booking");
  }

  return await pool.query("DELETE FROM users WHERE id = $1", [userId]);
};

export const UserServices = {
  getUsers,
  updateUser,
  deleteUser,
};
