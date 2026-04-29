import mongoose, { model, Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MongoUrl = process.env.MONGO_URL;
const url = `${MongoUrl}brainly`;
console.log(MongoUrl);
export const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log("✅ MongoDB Connected!");
    } catch (e:any) {
        console.error("❌ MongoDB Error:", e.message);
        process.exit(1);
    }
};

const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String },
});

const ContentSchema = new Schema({
    link: String,
    title: String,
    tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
    type: String,
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

const LinkSchema = new Schema({
    hash: String,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
});

export const UserModel = model("User", UserSchema);
export const LinkModel = model("Link", LinkSchema);
export const ContentModel = model("Content", ContentSchema);