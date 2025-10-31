import express from "express";
import dotenv from "dotenv";
import usersRoutes from "./routes/usersRoutes.js";
import seriesRoutes from "./routes/seriesRoutes.js";
import { connectDB } from "./config/db.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/users", usersRoutes);
app.use("/api/series", seriesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
