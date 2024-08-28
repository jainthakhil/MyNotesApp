const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');
const authenticate = require("../middleware/authenticate");

require('../db/dbconn');
const User = require('../model/schema').User;

router.get("/", (req,res)=>{
    res.send("Hello from router! of your tracker sir.");
});

//registeration
router.post('/register', async(req, res)=>{
    const {name, email, password, confirmpassword } = req.body;

    if(!name || !email || !password || !confirmpassword){
        return res.status(422).json({error:"plz fill all the fields"});
    }

    try{
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "email already exist" });
        } else if(password!==confirmpassword){
            return res.status(422).json({ error: "password mismatch" });
        }
        else{
            const user = new User({ name: name, email: email, password: password, confirmpassword: confirmpassword });
            await user.save();
            res.status(201).json({ message: "User registered successfully" });    
        }
        
    } catch(err){
        console.log(err);

    }
});

//logining

router.post("/signin", async (req, res)=>{
    
    try{
        let token;
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(422).json({error: "All fields are required."});
        }
        const userExist = await User.findOne({ email: email });
        
        if(userExist){

            const isMatch = await bcrypt.compare(password, userExist.password); 
            
            //token
            
            if(isMatch){
                token = await userExist.generateAuthToken();
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 86400000),
                    // expires: new Date(Date.now() + 25892000000),
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production'
                });
                res.status(200).json({message: "user logged in successfully", name: userExist.name});
                console.log(userExist.name, " has logged in");
                console.log(token);
                
                
            }
            else{
                res.status(404).json({message: "Invalid email or password"});//wrong password
                
            }
        }

        else{ //wrong email
            res.status(404).json({error: "Invalid  email or password"});
            console.log("no user found");
            console.log(res.statusCode);
        }

    } catch(err){
        console.log(err);
    }
});

router.get('/getdata', authenticate, (req, res) => {
    res.send(req.rootUser);
 });

router.get('/logout', (req,res)=>{
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).json({ message: 'Logged out successfully' });
})

module.exports = router;