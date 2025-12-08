import { pool } from "../../config/db";
import { calculateDaysDiff } from "../../utils/calculateDaysDiff";

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicleResult = await pool.query(
    "SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id = $1",
    [vehicle_id]
  );
  const vehicle = vehicleResult.rows[0];

  const daysDiff = calculateDaysDiff(
    rent_start_date as string,
    rent_end_date as string
  );
  const total_price = vehicle.daily_rent_price * daysDiff;
  const status = "active";

  const bookingResult = await pool.query(
    `INSERT INTO bookings (customer_id, vehicle_id, total_price, status, rent_start_date, rent_end_date)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      customer_id,
      vehicle_id,
      total_price,
      status,
      rent_start_date,
      rent_end_date,
    ]
  );

  return {
    rowCount: 1,
    rows: [
      {
        ...bookingResult.rows[0],
        vehicle,
      },
    ],
  };
};

const getAllBookings = async () => {
  const result = await pool.query(
    `SELECT
    *,

    vehicles.vehicle_name,
    vehicles.registration_number,

    users.name AS customer_name,
    users.email AS customer_email

    FROM bookings
    JOIN users ON bookings.customer_id=users.id
    JOIN vehicles ON bookings.vehicle_id=vehicles.id;`
  );

  const row = result.rows[0];

  return {
    id: row.id,
    customer_id: row.customer_id,
    vehicle_id: row.vehicle_id,
    rent_start_date: row.rent_start_date,
    rent_end_date: row.rent_end_date,
    total_price: row.total_price,
    status: row.status,
    customer: {
      name: row.customer_name,
      email: row.customer_email,
    },
    vehicle: {
      vehicle_name: row.vehicle_name,
      registration_number: row.registration_number,
    },
  };
};

const updateBooking = async (
  bookingId: string,
  payload: Record<string, unknown>
) => {
  const { status } = payload;

  return await pool.query(
    `
      UPDATE bookings
      SET status = $2
      WHERE id = $1 RETURNING *;
    `,
    [bookingId, status]
  );
};

export const BookingServices = {
  createBooking,
  getAllBookings,
  updateBooking,
};
