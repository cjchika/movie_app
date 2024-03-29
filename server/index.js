import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routes);

const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose.set("strictQuery", false);
mongoose
  .connect(
    process.env.MONGODB_URL ||
      "mongodb+srv://themancj:ZCYep6bIUXxmAEyd@movie-app.cv0rcgk.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Mongodb Connected Successfully");
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });

export default server;
