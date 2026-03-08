import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import path from "path";
import { fileURLToPath } from "url";

// app configuration
const app = express();
const port = process.env.PORT || 3000;

// Directory paths for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//middlewares
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Serve admin from /admin
app.use("/admin", express.static(path.join(__dirname, "../admin/dist")));

app.get("*", (req, res) => {
  if (req.path.startsWith("/admin")) {
    res.sendFile(path.join(__dirname, "../admin/dist/index.html"));
  } else if (req.path.startsWith("/api")) {
    res.status(404).json({ message: "API endpoint not found" });
  } else {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  }
});

app.listen(port, () => {
  console.log(`Server Started on port: ${port}`);
});
