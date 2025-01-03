
export async function isAdmin(req,res,next){
    if(!req.user){
        res.status(401).json({message:"Unaurthorized"})
        return
    }
    if(req.user.role != "admin"){
        res.status(403).json({message:"Forbidden"})
        return
    }
    next()
}