const express=require("express")
const User = require("../models/user-schema")
const validate = require("../middleware/validate-middleware")
const signUpSchma = require("../models/validaters")

const user=express()

user.get('/register',(req,res)=>{
    res.render("register")
})

user.post('/register',validate(signUpSchma),async(req,res)=>{
    let {username,email,password}=req.body
    let user=await User.create({username,email,password})
    res.status(201).json({success:true,user})
})

user.get('/login',(req,res)=>{
    res.render("login")
})

user.post('/login',async(req,res)=>{
    let {email,password}=req.body
    let user=await User.findOne({email})
    
    if(!user) return res.status(404).json({success:false,message:"User Not Found"})

    if(!user.email || user.password !=password) return res.status(404).json({success:false,message:"Incorrect Email or Password"})

    res.cookie("token",user.id).status(201).json({success:true,message:"User can login successfull"})
})

user.get('/user',(req,res)=>{
    res.render('user')
})

user.get('/all/user',async(req,res)=>{
    let user=await User.find()
    res.json(user)
})

user.get('/friend/:id',async(req,res)=>{
    let {token}=req.cookies
    if(token){
        let user=await User.findById(req.params.id)
        if(user.id==token) return res.status(404).json({success:false,message:"You can't send friend Request on same Account"})
        user.friendRequest.push(token)
        await user.save()
       return res.send(`You can send ${user.username} Friend Request`)
    }
   res.status(404).json({success:false,message:"Plase chack Login Your account"})
})

user.get("/profile",(req,res)=>{
    let {token}=req.cookies
    if(token){
     return res.render('account')
    }
    res.status(404).send({success:false,message:"Plase chack Login Your account"})
})
user.get("/my/account",async(req,res)=>{
    let {token}=req.cookies
        let user=await User.findById(token)
        let friend=await User.findById(user.friendRequest)
        if(friend){
            return res.json(friend)
        }
        else{
            return res.json("Empty Friend Request")
        }
})

user.get("/accepted/:id",async(req,res)=>{
    let {token}=req.cookies
    let user=await User.findById(token)
    user.friendRequest.pop(req.params.id)
    user.friends.push(req.params.id)
    await user.save()
    res.send(user)
})

user.get("/rejected/:id",async(req,res)=>{
    let {token}=req.cookies
    let user=await User.findById(token)
    user.friendRequest.pop(req.params.id)
    await user.save()
    res.send(user)
})


module.exports=user