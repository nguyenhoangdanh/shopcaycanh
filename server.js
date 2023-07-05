import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";


const cors = require(cors)
app.use(cors());

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());


// app.use(cors({
//   origin: '*'
// }));
// app.use(cors({
//   methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
// }));
// API
app.use(cors("/api/import", ImportData));
app.use(cors("/api/products", productRoute));
app.use(cors("/api/users", userRouter));
app.use(cors("/api/orders", orderRouter));
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});


// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 9001;

app.listen(PORT, console.log(`server run in port ${PORT}`));
