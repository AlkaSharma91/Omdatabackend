import express,{json} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {mongoose,db} from './config/dbConfig.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
dotenv.config();
const app=express();
app.use(express.json());
app.use(cors());

app.use('/uploads/productsImages',express.static('uploads/productsImages'))
//app.use("/public", express.static(path.join(__dirname, 'public')));

const Port=5000;
app.get("/", (req, res) => {
  res.send("hello--------");
});

app.use("/api/users",userRoutes)
app.use("/api/products",productRoutes)
app.use("/api/cart",cartRoutes)


app.listen(Port, () => {
  console.log(`server is running on port ${Port}`);
});
