import { pool } from "../../config/db";

const getUsers = async () => {
  return await pool.query("SELECT id, name, email, phone, role FROM users");
};

const updateUser = async (userId: string, payload: Record<string, unknown>) => {
  const { name, email, phone, role } = payload;

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
  return await pool.query("DELETE FROM users WHERE id = $1", [userId]);
};

export const UserServices = {
  getUsers,
  updateUser,
  deleteUser,
};
