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

  // CREATING Vehicles TABLE
  await client.query(`CREATE TABLE IF NOT EXISTS vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(200) NOT NULL,
        type VARCHAR(50) NOT NULL,
        registration_number VARCHAR(200) UNIQUE NOT NULL,
        daily_rent_price INT NOT NULL,
        availability_status VARCHAR(50),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )`);

  // CREATING Bookings TABLE
  await client.query(`CREATE TABLE IF NOT EXISTS bookings(
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES users(id) ON DELETE CASCADE,
        vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
        rent_start_date TIMESTAMP NOT NULL,
        rent_end_date TIMESTAMP NOT NULL,
        total_price INT NOT NULL,
        status VARCHAR(50),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )`);
};

export default initDB;
