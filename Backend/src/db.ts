import mongoose , {model , Schema} from "mongoose";


mongoose.connect("mongodb://localhost:27017/brainly");

const UserSchema = new Schema({
    username:{type:String, unique:true},
    password:{type:String},
})


const ContentSchema = new Schema({
    link:String,
    title:String,
    tags:[{type: mongoose.Types.ObjectId , ref:'Tag'}],
    type:String,
    userId:{type: mongoose.Types.ObjectId, ref:'User', required:true}
})
const LinkSchema = new Schema({
    hash:String,
    userId:{type:mongoose.Types.ObjectId, ref:'User', required:true ,unique:true},
})

export const UserModel = model("User",UserSchema);
export const LinkModel = model("Link",LinkSchema)
export const ContentModel = model("Content",ContentSchema)
