const exp=require("express")
const app=exp();
const cors=require("cors")
const userApp=require("./API/userApi")
const adminApp=require("./API/adminApi")
require("dotenv").config()
const port=process.env.PORT || 4000;
const mongoose=require("mongoose")
//db connection
mongoose.connect(process.env.DBURL)
.then(()=>{app.listen(port,()=>{console.log(`server listening on ${port}`)});})
.catch(err=>console.log("Error in db connection",err))

app.use(cors());
app.use(exp.json());
//connect API routes
app.use('/user-api',userApp)
app.use('/admin-api',adminApp)
