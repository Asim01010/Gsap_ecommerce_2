import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import product from "./routes/productRoutes.js";
import { errorMsg } from "./middleware/errorMiddleware.js";
import router from "./routes/userRoutes.js";
import RegisterRoute from "./routes/registerRoutes.js";
import { connectDB } from "./config/connectdb.js";
import cors from "cors";
import { postRouter } from "./routes/postRoutes.js";
dotenv.config();
const app = express();
app.use(cors());
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/register", RegisterRoute);
app.use("/api/posts", postRouter);

app.use(errorMsg);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`.rainbow);
});
