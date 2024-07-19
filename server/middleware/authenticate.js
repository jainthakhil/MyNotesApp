const jwt = require("jsonwebtoken");
const User = require("../model/schema").User;

const Authenticate = async (req, res, next) => {
    try{
        const token = req.cookies.jwtoken;

        if(!token){
            console.log("unauthorised: user not logged in");
            return res.status(401).send("unauthorised: user not logged in");
        }
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token":token});
        console.log("rootuser:",rootUser); // new  comment added 
        
        if(!rootUser){throw new Error('User not found')}
        

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();


    } catch(err){
        res.status(401).send("Unauthorised: No Token provided");
        console.log(err);
    }


}


module.exports = Authenticate;