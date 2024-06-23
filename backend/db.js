const mongoose =require("mongoose");
const { number } = require("zod");

mongoose.connect("mongodb+srv://gauravpadda:$PwdCluster0$06@cluster0.hb7ezaq.mongodb.net/paytm")
const userschema=new mongoose.Schema({
    username:{
        type: String,
        required: true,
        lowercase:true,
        minLength:3,
        maxLength:30,
        unique:true,
        trim:true
    },
    password: {
        type:String,
        required:true,
        minLength:6,
        trim:true
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
})
const bankSchema=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    balance:{
        type:Number,
        required:true,
        
    }

})
const user=mongoose.model("User",userschema);
const bank=mongoose.model("Bank",bankSchema);

module.exports={user,bank}