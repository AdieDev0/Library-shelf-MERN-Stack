import express, { response } from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
// Colors for npm start highlight colors
import colors from "colors";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome");
});

app.use("/books", booksRoute);

// NPM START
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("APP CONNECTED TO DATABASE".bgBrightGreen);
    app.listen(PORT, () => {
      console.log(`Hello World: ${PORT}`.bgBrightBlue);
    });
  })
  .catch((error) => {
    console.log(error.red);
  });
