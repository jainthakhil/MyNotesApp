const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    confirmpassword:{
        type: String,
        required: true
    },
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ],
    notes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
});

const postSchema = new mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


//for hashing
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.confirmpassword = await bcrypt.hash(this.confirmpassword, 12);
    }
    next();
});

//generating token
userSchema.methods.generateAuthToken = async function(){
    try{
        let myToken = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:myToken});
        await this.save();
        console.log("Token generated successfully:", myToken);
        return myToken;

    } catch(err){
        throw new Error('Token generation failed');
        console.log("Error generating token:",err);

    }

}



const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);
module.exports = {User,Post};
// module.exports = Post;