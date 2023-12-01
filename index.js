const express=require("express")
const connect = require("./config/database")
const user = require("./routes/routes")
const cookie=require("cookie-parser")
const app=express()

app.use(express.json())
app.use(cookie())
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))

app.use(user)

app.listen(8090,()=>{
    console.log("connect to port 8090");
    connect()
})