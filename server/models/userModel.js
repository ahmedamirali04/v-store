const mongoose=require("mongoose")

//define user schema

const userSchema=new mongoose.Schema({
    role:{
        type:String,
        default:"user",
    },
    name:{
        type:String,
        required:true,
    },
    rollNumber:{
        type:String,
        unique:true,
    },
    profileImageUrl:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{"strict":"throw"})

//create model for the schema
const User=mongoose.model('user',userSchema)

module.exports=User;