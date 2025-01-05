import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get("/", (request, repsonse) => {
  console.log(request);
  return response.status(234).send("Welcome");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("APP CONNECTED TO DATABASE");
    app.listen(PORT, () => {
      console.log(`Hello World: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
