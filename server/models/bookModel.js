const mongoose=require("mongoose")

const bookSchema=new mongoose.Schema({
    bookId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    publication:{
        type:String,
    },
    dateOfPublication:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    bookAvailable:{
        type:String,
        default:true
    }
},{"strict":"throw"})

const Book=mongoose.model('book',bookSchema)

module.exports=Book;