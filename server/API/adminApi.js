const exp=require("express")
const adminApp=exp.Router()
const expressAsyncHandler=require("express-async-handler")
const Book=require("../models/bookModel")
const Cart=require("../models/cartModel")
const Admin=require('../models/adminModel')

//read all books in lib
adminApp.get("/books",expressAsyncHandler(async(req,res)=>{
    const listOfBooks=await Book.find();
    res.status(200).send({message:"reading catalogue via admin",payload:listOfBooks})
}))

//read specific book
adminApp.get("/book/:bookId",expressAsyncHandler(async(req,res)=>{
    const givenBookId=req.params.bookId;
    const listOfBooks=await Book.findOne({bookId:givenBookId});
    res.status(200).send({message:"reading specific book via admin",payload:listOfBooks})
}))

//add a book on shelf
adminApp.post("/book",expressAsyncHandler(async(req,res)=>{
    const newBook=req.body;
    console.log(newBook);
    const bookInDb=await Book.findOne({title:newBook.bookId})
    if(bookInDb!=null){
        res.status(200).send({message:"Book already in library",payload:bookInDb})
    }else{
        const newBookInstance=new Book(newBook);
        const newBookDocument=await newBookInstance.save();
        res.status(201).send({message:"New Book added to library",payload:{newBookDocument}})
    }
}))

//update book on shelf
adminApp.put("/book/:bookId",expressAsyncHandler(async(req,res)=>{
    const givenBookId=req.params.bookId;
    const newBook=req.body;
    console.log(newBook);
    const bookInDb=await Book.findOne({bookId:givenBookId})
    if(bookInDb!=null){
        //const dbRes=await Book.findByIdAndUpdate(newBook.bookId,{...newBook},{returnOriginal:false})
        const dbRes=await Book.updateOne({bookId:givenBookId},{...newBook},{returnOriginal:false})
        const updatedBook=await Book.findOne({bookId:givenBookId})
        res.status(200).send({message:"Book updated",payload:updatedBook})
    }else{
        res.status(404).send({message:"Book doesn't exist, please create it before updating it"})
    }
}))

//delete book on shelf
adminApp.put("/deleteBook/:bookId",expressAsyncHandler(async(req,res)=>{
    const givenBookId=req.params.bookId;
    const newBook={"bookAvailable":false}
    const bookInDb=await Book.findOne({bookId:givenBookId})
    if(bookInDb!=null){
        const dbRes=await Book.updateOne({bookId:givenBookId},{...newBook},{returnOriginal:false})
        const updatedBook=await Book.findOne({bookId:givenBookId})
        res.status(200).send({message:"Book deleted",payload:updatedBook})
    }else{
        res.status(404).send({message:"Book doesn't exist, nothing to delete"})
    }
}))


//see requests of all students
adminApp.get("/requests",expressAsyncHandler(async(req,res)=>{
    const listofRequests=await Cart.find();
    if(listofRequests!=null){
        res.status(200).send({message:"reading requests via admin",payload:listofRequests})
    }else{
        res.status(200).send({message:"No Requests at the moment"})
    }
}))

//update requests
adminApp.put("/updateRequest",expressAsyncHandler(async(req,res)=>{
    const updatedRequest=req.body;
    const dbRes=await Cart.updateOne({bookId:updatedRequest.bookId,email:updatedRequest.email},{...updatedRequest},{returnOriginal:false})
    const updatedBook=await Cart.findOne({bookId:updatedRequest.bookId,email:updatedRequest.email})
    res.status(200).send({message:"Book updated",payload:updatedBook})
}))

//delete req
adminApp.delete('/deleteRequest',expressAsyncHandler(async(req,res)=>{
    const updatedRequest=req.body;
    const dbRes=await Cart.deleteOne({bookId:updatedRequest.bookId,email:updatedRequest.email})
    res.status(200).send({message:"Deleted Request",payload:{dbRes}})
}))

//see requests of specific student
adminApp.get("/request/:rollNumber",expressAsyncHandler(async(req,res)=>{
    const givenRollNumber=req.params.rollNumber;
    const listofRequests=await Cart.find({rollNumber:givenRollNumber});
    if(listofRequests!=null){
        res.status(200).send({message:"reading requests via admin",payload:listofRequests})
    }else{
        res.status(200).send({message:"No Requests at the moment"})
    }
}))


//create new Staff
adminApp.post("/staff",expressAsyncHandler(async(req,res)=>{
    const newStaff=req.body;
    //find user by rollNumber
    const staffInDb=await Admin.findOne({staffId:newStaff.staffId})
    if(staffInDb!=null){
        res.send({message:"Staff already exists",payload:staffInDb})
    }
    else{
        let newStaffInstance=new Admin(newStaff);
        const newStaffDocument=await newStaffInstance.save();
        res.status(201).send({message:"New Staff created",payload:{newStaffDocument}})
    }

}))

//get admin
adminApp.post('/getadmin',expressAsyncHandler(async(req,res)=>{
    const newAdmin=req.body;
    //find user by email
    const adminInDb=await Admin.findOne({email:newAdmin.email})
    if(adminInDb!=null){
        res.send({message:"Admin already exists",payload:adminInDb})
    }else{
        res.send({message:"admin doesn't exist"})
    }
}))

module.exports=adminApp;