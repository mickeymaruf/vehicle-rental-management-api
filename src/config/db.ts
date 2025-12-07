import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: config.CONN_STRING,
});

const initDB = async () => {
  const client = await pool.connect();

  // CREATING USERS TABLE
  await client.query(`CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone VARCHAR(50) NOT NULL,
        role VARCHAR(50),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )`);
};

export default initDB;
