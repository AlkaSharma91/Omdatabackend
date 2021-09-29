import { mongoose } from "../config/dbConfig.js";

const productSchema = mongoose.Schema({
  user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  isDeleted:{
    type:Boolean,
    default:false
    
  }
},{
  timestamps:true
});
const Product = mongoose.model("product", productSchema);
export default Product;
