import express from "express";
import cors from "cors";
import { mainRouter } from "./routes";
const PORT = 3000;


const app = express();
app.use(express.json());


app.use("/api/v1",mainRouter);


app.listen(PORT, ()=>{
    console.log("The server is running on Port",PORT)
})
