const mongoose =require("mongoose"); 
const {Schema}=mongoose;
const UserSchema=new Schema({
    name:{type:String,
        required:true
    },
    email:{type:String,
        required:true,
        unique:true
    },
    phone:{type:String,
        required:true,
        unique:true
    },
    password:{type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    }

})
module.exports=mongoose.model('user',UserSchema);