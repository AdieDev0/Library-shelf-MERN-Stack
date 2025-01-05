import express from "express";
import { PORT } from "./config.js";
const app = express();

app.get('/', (request, repsonse)=>{
    console.log(request)
    return response.status(234).send('Welcome')
})

app.listen(PORT, () => {
  console.log(`Hello World: ${PORT}`);
});
