const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:{required:true,type:String},
    email:{required:true,type:String},
    password:{required:true,type:String},
    friendRequest:[],
    friends:[]
})

const User=mongoose.model("User-friend",userSchema)

module.exports=User