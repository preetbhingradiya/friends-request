const validate=(schema)=>async(req,res,next)=>{
    try {
        let parseBody=await schema.parseAsync(req.body)
        req.body=parseBody
        next()
    } catch (error) {
        let message=error.issues.map((ele)=>ele.message)
        res.status(400).json({message:message})
    }
}

module.exports=validate