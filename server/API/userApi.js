const exp=require("express")
const userApp=exp.Router()
const User=require("./../models/userModel")
const expressAsyncHandler=require("express-async-handler")
const Book=require("../models/bookModel")
const Cart=require("../models/cartModel")
const Admin=require("../models/adminModel")

//create new User
userApp.post("/user",expressAsyncHandler(async(req,res)=>{
    const newUser=req.body;
    //find user by email
    const userInDb=await User.findOne({email:newUser.email})
    if(userInDb!=null){
        res.send({message:"User already exists",payload:userInDb})
    }
    else{
        let newUserInstance=new User(newUser);
        const newUserDocument=await newUserInstance.save();
        res.status(201).send({message:"New User created",payload:{newUserDocument}})
    }

}))

//get user
userApp.post('/getuser',expressAsyncHandler(async(req,res)=>{
    const newUser=req.body;
    //find user by email
    const userInDb=await User.findOne({email:newUser.email})
    if(userInDb!=null){
        res.send({message:"User already exists",payload:userInDb})
    }
}))

//check if user exists
userApp.post('/userexists',expressAsyncHandler(async(req,res)=>{
    const givenEmail=req.body.email;
    const userData=await User.findOne({email:givenEmail});
    if(userData!=null)
    return res.json({exists:true});
    else
    return res.json({exists:false});
}))

//check if staff exists
userApp.post('/adminexists',expressAsyncHandler(async(req,res)=>{
    const givenEmail=req.body.email;
    const userData=await Admin.findOne({email:givenEmail});
    if(userData!=null)
    return res.json({exists:true});
    else
    return res.json({exists:false});
}))

//update user
userApp.put("/update", expressAsyncHandler(async (req, res) => {
    const updatedUser = req.body;
    const userInDb=await User.findOne({email:updatedUser.email})
    if(userInDb!=null){
        const dbRes=await User.updateOne({email:updatedUser.email},{...updatedUser},{returnOriginal:false})
        const nowUpdatedUser=await User.findOne({email:updatedUser.email})
        res.status(200).send({message:"User updated",payload:nowUpdatedUser})
    }else{
        res.status(404).send({message:"Unable to find user in DB"})
    }
  }));
  

//read the library catalogue
userApp.get("/books",expressAsyncHandler(async(req,res)=>{
    const listOfBooks=await Book.find({bookAvailable:true});
    res.status(200).send({message:"reading catalogue via user",payload:listOfBooks})
}))

//read a specific book
userApp.get("/book/:bookId",expressAsyncHandler(async(req,res)=>{
    const givenBookId=req.params.bookId;
    const listOfBooks=await Book.findOne({bookAvailable:true,bookId:givenBookId});
    res.status(200).send({message:"reading specific book via user",payload:listOfBooks})
}))

//see your requests
userApp.get("/request/:rollNumber",expressAsyncHandler(async(req,res)=>{
    const givenRollNumber=req.params.rollNumber;
    const listofRequests=await Cart.find({email:givenRollNumber});
    if(listofRequests!=null){
        res.status(200).send({message:"reading requests via user",payload:listofRequests})
    }else{
        res.status(200).send({message:"No Requests at the moment"})
    }
}))

//request a book from library (basically adding to cart)
userApp.post("/request",expressAsyncHandler(async(req,res)=>{
    const newRequest=req.body;
    const reqInDb=await Cart.findOne({email:newRequest.email,bookId:newRequest.bookId})
    if(reqInDb==null){
        const newRequestInstance=new Cart(newRequest);
        const requestDocument=await newRequestInstance.save();
        res.status(200).send({message:"Request created",payload:requestDocument})
    }else{
        res.status(200).send({message:"Request already sent"})
    }
}))

//check if staff

userApp.post("/check-staff",expressAsyncHandler(async(req,res)=>{
    const {email}=req.body;
    try{
        const staffResponse=await Admin.findOne({email:email})
        if(staffResponse!=null){
            return res.json({ isStaff: true,isUser: false });
        }
        else{
            return res.json({ isStaff: false,isUser: true });
        }
    }catch{
        console.error('Error checking staff status:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}))

//check if student
userApp.post("/check-user",expressAsyncHandler(async(req,res)=>{
    const {email}=req.body;
    try{
        const userResponse=await User.findOne({email:email})
        if(userResponse!=null){
            return res.json({ isUser: true,isStaff:false });
        }
        else{
            return res.json({ isUser: false,isStaff:false });
        }
    }catch{
        console.error('Error checking user status:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}))




module.exports=userApp;