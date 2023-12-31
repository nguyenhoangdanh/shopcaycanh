import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import cors from "cors";

// var cors = require("cors")
// var express = require("express");
const app = express();
app.use(cors());

dotenv.config();
connectDatabase();

app.use(express.json());

// app.use(cors({
//   origin: '*'
// }));
// app.use(cors({
//   methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
// }));
// API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});


// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 9001;

app.listen(PORT, console.log(`server run in port ${PORT}`));
