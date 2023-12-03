const {z}=require("zod")

const signUpSchma=z.object({
    username:z.string({required_error:"Name is required"}).min(3,{message:"Username must be more than 3 character"}),
    email:z.string({required_error:"Name is required"}).email({message:"Invalid Email Adress"}),
    password:z.string({required_error:"Name is required"}).min(3,{message:"Password must be more than 3 character"})
})

module.exports=signUpSchma