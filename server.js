import express,{json} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {mongoose,db} from './config/dbConfig.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import {Server} from 'socket.io';
import http from 'http';
// const { Server } = require("socket.io");
// const io = new Server(server);
dotenv.config();
const app=express();
const server = http.createServer(app);
export const io=new Server(server);

app.use(express.json());
app.use(cors());

app.use('/uploads/productsImages',express.static('uploads/productsImages'))


const Port=5000;
app.get("/", (req, res) => {
  res.send("hello--------");
});

app.use("/api/users",userRoutes)
app.use("/api/products",productRoutes)
app.use("/api/cart",cartRoutes)

export let clients =[];
export let mySocket;
io.on('connection', (socket) => {
  console.log('a user connected');
 // io.emit("welcome","welcome user");
 
  socket.on('storeClientInfo', function (data) {
      console.log('dghfdshfsdghf',data)
      const mydata=JSON.parse(data);
      let clientInfo = new Object();
      clientInfo.customId = mydata.customId.id;
      clientInfo.clientId = socket.id;
      clients.push(clientInfo);
      console.log("clients",clients);
       console.log("clients are",clients)
          let client= clients.find((client)=>client.customId==mydata.customId.id)
          io.to(client.clientId).emit("event", mydata.customId.name);
          console.log("client is",client);
    

});
  

});





io.on("disconnect", () => {
    console.log("Client disconnected");
   
  });


server.listen(Port, () => {
  console.log(`server is running on port ${Port}`);
});
