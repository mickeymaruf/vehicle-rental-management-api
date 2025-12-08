import { JwtPayload } from "jsonwebtoken";
import { pool } from "../../config/db";
import { calculateDaysDiff } from "../../utils/calculateDaysDiff";

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicleResult = await pool.query(
    "SELECT * FROM vehicles WHERE id = $1",
    [vehicle_id]
  );
  const vehicle = vehicleResult.rows[0];

  if (!vehicle) throw new Error("Vehicle not found");

  if (vehicle.availability_status !== "available") {
    throw new Error("Vehicle is not available");
  }

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

  // Update vehicle availability_status of the vehicle to 'booked'
  await pool.query(
    "UPDATE vehicles SET availability_status = 'booked' WHERE id = $1",
    [vehicle_id]
  );

  return {
    rowCount: 1,
    rows: [
      {
        ...bookingResult.rows[0],
        vehicle: {
          vehicle_name: vehicle.vehicle_name,
          daily_rent_price: vehicle.daily_rent_price,
        },
      },
    ],
  };
};

const getAllBookings = async (user: JwtPayload) => {
  if (user.role === "admin") {
    const result = await pool.query(
      `SELECT
        *,
        
        vehicles.vehicle_name,
        vehicles.registration_number,
        
        users.name AS customer_name,
        users.email AS customer_email
        
        FROM bookings
        JOIN users ON bookings.customer_id=users.id
        JOIN vehicles ON bookings.vehicle_id=vehicles.id;
      `
    );

    return result.rows.map((row) => {
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
    });
  }

  const result = await pool.query(
    `SELECT
      *,
      
      vehicles.vehicle_name,
      vehicles.registration_number,
      vehicles.type,
      
      users.name AS customer_name,
      users.email AS customer_email
      
      FROM bookings
      JOIN users ON bookings.customer_id=users.id
      JOIN vehicles ON bookings.vehicle_id=vehicles.id
      WHERE customer_id = $1
    `,
    [user.id]
  );

  return result.rows.map((row) => {
    return {
      id: row.id,
      vehicle_id: row.vehicle_id,
      rent_start_date: row.rent_start_date,
      rent_end_date: row.rent_end_date,
      total_price: row.total_price,
      status: row.status,
      vehicle: {
        vehicle_name: row.vehicle_name,
        registration_number: row.registration_number,
        type: row.type,
      },
    };
  });
};

const updateBooking = async (
  bookingId: string,
  payload: Record<string, unknown>,
  user: JwtPayload
) => {
  const { status } = payload; // 'cancelled', 'returned'

  const bookingResult = await pool.query(
    `SELECT * FROM bookings WHERE id = $1;`,
    [bookingId]
  );

  if (bookingResult.rowCount === 0) throw new Error("Booking not found");

  const booking = bookingResult.rows[0];
  const dateHasPassed = new Date() > new Date(booking.rent_start_date);

  if (user.role === "customer") {
    if (status !== "cancelled") throw new Error("Customers can only cancel");

    if (dateHasPassed) throw new Error("Cannot cancel on-going booking");
  }

  if (user.role === "admin") {
    if (status !== "returned") throw new Error("Admins can only return");

    await pool.query(
      "UPDATE vehicles SET availability_status = 'available' WHERE id = $1",
      [booking.vehicle_id]
    );
  }

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
