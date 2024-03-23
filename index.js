import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/connectDB.js";
import { globalErrorHandler } from "./middlerwares/error.middleware.js";
import qrCodeRoutes from "./routes/qrCode.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from 'cors'
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(cors({origin : process.env.CORS_ORIGIN, credentials : true}))
app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended : true, limit: '16kb'}))
app.use(cookieParser())

app.get("/", (req, res) => {
  res.json({ message: "server is working!" });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/qrcode', qrCodeRoutes);

app.use(globalErrorHandler);

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
