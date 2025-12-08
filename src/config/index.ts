import env from "dotenv";

env.config();

export default {
  PORT: process.env.PORT,
  CONN_STRING: process.env.CONN_STRING,
  JWT_SECRET: process.env.JWT_SECRET,
};
