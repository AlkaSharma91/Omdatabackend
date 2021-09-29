import Cart from "../models/cartModel.js";

export const saveCart =async(req,res) => {
    try {
        console.log("request came at save cart")
        console.log(req.user._id)
        const data=req.body;
        const cart=await Cart.find({user:req.user._id})
        if(cart){
           const deleteres= await Cart.deleteMany({user:req.user._id})
           const Mycart= await Cart.create({user:req.user._id,items:data});
           if(Mycart){
               res.status(201).send({
                   status:201,
                   cart:Mycart,
                   message:"cart saved successfully"
               })
           }else{
            res.status(500).send({
                status:500,
                message:"internal server error"
            })
               

           }
           

        }else{
           const cart= await Cart.create({user:req.user._id,items:data});
           if(cart){
            res.status(201).send({
                status:201,
                cart:cart,
                message:"cart saved successfully"
            })
        }else{
            res.status(500).send({
                status:500,
                message:"internal server error"
            })
               

           }

        }
        //const product = await Product.create({ user:req.user._id,name, price, description, image });
       
      
        

        
    } catch (error) {
        res.status(500).send({
            status:500,
            message:error
        })
        
    }


}
export const getCart =async(req,res)=>{
    try {
        const cart = await Cart.findOne({user:req.user._id}).populate('user')
        if(cart){
            res.status(200).send({
                status:200,
                cart:cart,
                message:"cart found"
            })
        }else{
            res.status(404).send({
                status:404,
                message:"cart not found"
            })

        }

        
    } catch (error) {
        res.status(500).send({
            status:500,
            message:error
        })
        
    }

}