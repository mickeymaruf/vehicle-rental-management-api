import { Request, Response } from "express";
import { BookingServices } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await BookingServices.createBooking(req.body);

    if (result.rows.length === 0) {
      res.status(500).json({
        success: false,
        message: "Failed while creating Booking",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Booking created successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const result = await BookingServices.getAllBookings(req.user!);

    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const result = await BookingServices.updateBooking(
      req.params.bookingId!,
      req.body,
      req.user!
    );

    if (result.rowCount === 0) {
      res.status(500).json({
        success: false,
        message: "Vehicle not found!",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const BookingController = {
  createBooking,
  getAllBookings,
  updateBooking,
};
