const mongoose=require("mongoose")

const cartSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    bookId:{
        type:String,
        required:true
    },
    title:{
        type:String,

    },
    author:{
        type:String,

    },
    status:{
        type:String,
        default:"pending"
    }
},{"strict":"throw"})

const Cart=mongoose.model('cart',cartSchema)

module.exports=Cart;