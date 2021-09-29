import { mongoose } from "../config/dbConfig.js";

const cartSchema=mongoose.Schema({
   user:{
       type:mongoose.Schema.Types.ObjectId,
       required:true,
       ref:'User'

   } ,
   items:[
      
   ]

   

},{
    timestamps:true
})

const Cart = mongoose.model("cart", cartSchema);
export default Cart;