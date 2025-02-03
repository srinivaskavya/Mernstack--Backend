import express from "express";
import path from "path";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";

const app = express();

dotenv.config();

//database connection logic
mongoose.connect(process.env.MONGODB_URI).then(()=>{
  console.log("connected to db");
}).catch((err)=>{
  console.log(err.message);
})

//middleware
app.use(express.json());
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
  });

//frontend to backend bind logic
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/e-home/build")));
/*app.get("*", (req, res) =>
res.sendFile(path.join(__dirname, "/e-home/build/index.html"))
);*/


//routes
app.use("/api/auth", authRoutes);
//server bind logic
const port = process.env.PORT || 4000;
app.listen(port, () => {
console.log(`serve at http://localhost:${port}`);
});
