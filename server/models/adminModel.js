const mongoose=require("mongoose")

//define admin schema

const adminSchema=new mongoose.Schema({
    role:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    staffId:{
        type:String,
        required:true,
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
const Admin=mongoose.model('admin',adminSchema)

module.exports=Admin;