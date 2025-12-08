import { pool } from "../../config/db";

const createVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  return await pool.query(
    `INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
};

const getAllVehicle = async () => {
  return await pool.query("SELECT * FROM vehicles");
};

const getVehicle = async (vehicleId: string) => {
  return await pool.query("SELECT * FROM vehicles WHERE id = $1;", [vehicleId]);
};

const updateVehicle = async (
  vehicleId: string,
  payload: Record<string, unknown>
) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  return await pool.query(
    `
      UPDATE vehicles
      SET vehicle_name = $2, type = $3, registration_number = $4, daily_rent_price = $5, availability_status = $6
      WHERE id = $1 RETURNING *;
    `,
    [
      vehicleId,
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
};

const deleteVehicle = async (vehicleId: string) => {
  const bookingResult = await pool.query(
    "SELECT status FROM bookings WHERE vehicle_id = $1",
    [vehicleId]
  );

  if (bookingResult.rows[0].status === "active") {
    throw new Error("Cannot delete vehicle with active booking");
  }

  return await pool.query("DELETE FROM vehicles WHERE id = $1", [vehicleId]);
};

export const VehicleServices = {
  createVehicle,
  getAllVehicle,
  getVehicle,
  updateVehicle,
  deleteVehicle,
};
