const mongoose = require("mongoose");

const userSchema=new mongoose.Schema({
    username:{type:String},
    email:{type:String},
    password:{type:String},
    friendRequest:[],
    friends:[]
})

const User=mongoose.model("User-friend",userSchema)

module.exports = User;
