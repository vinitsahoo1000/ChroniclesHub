import express,{Request,Response} from "express";
import cors from "cors";
import { mainRouter } from "./routes";
const PORT = 3000;


const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/v1",mainRouter);

app.use('/health',async(req:Request,res:Response)=>{
    console.log("server is running...")
    res.send({
        status:"OK"
    })
})

app.listen(PORT, ()=>{
    console.log("The server is running on Port",PORT)
})
