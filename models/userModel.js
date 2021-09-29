import { mongoose } from "../config/dbConfig.js";

const userSchema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    address:{
        type:String
    },
    phone:{
        type:Number
    },
    password:{
        type:String
    }
},{
    timestamps:true
})

const User=mongoose.model('User',userSchema);
export default User;