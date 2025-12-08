import express, { Request, Response } from "express";
import { UserRouter } from "./modules/user/user.router";
import initDB from "./config/db";
import { AuthRouter } from "./modules/auth/auth.router";
import { VehicleRouter } from "./modules/vehicle/vehicle.router";
import { BookingRouter } from "./modules/booking/booking.router";
const app = express();

app.use(express.json());

// db
initDB();

// routes
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/vehicles", VehicleRouter);
app.use("/api/v1/bookings", BookingRouter);

//
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
