import express from 'express';
import jwt from 'jsonwebtoken';
import { ContentModel, LinkModel, UserModel } from './db.js';
import mongoose from 'mongoose';
import { JWT_PASSWORD } from './config.js'; 
import { UserMiddleware } from './middleware.js';
import { random } from './utils.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());


app.post("/api/v1/signup",async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    
   try{await UserModel.create({
        username:username,
        password:password
    })
    res.json({
        message:"User signed up"
    })
}catch(err){
    res.status(411).json({
        message:"User alreay exists",
        error:err
    })
}
})
app.post("/api/v1/signin",async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const ExistingUser = await UserModel.findOne({username,password});
    if(ExistingUser){
        const token = jwt.sign({
            id:ExistingUser._id
        },JWT_PASSWORD)
        res.json({
            token
        })
    }else{
        res.status(403).json({
            "message":"Incorrect Credentials"
        })
    }
})
app.post("/api/v1/content",UserMiddleware,async(req,res)=>{
    const link = req.body.link;
    const title = req.body.title;
    try{
        ContentModel.create({
        link:link,
        title:title,
        //@ts-ignore
        userId:req.userId,
        tags:[],
        type:req.body.type  
    })
    res.json({
        message:"Content added"
    })
    }catch(err){
    res.status(500).json({
        message:"Error adding content",
        error:err
    })
}
})
app.get("/api/v1/content", UserMiddleware , async(req,res)=>{
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId:userId
    }).populate("userId","username");
    res.json({
        content
    })
})
app.delete("/api/v1/content",UserMiddleware,async(req,res)=>{

    const contentId = req.params.id;
    await ContentModel.deleteMany({
        _id:contentId,
        //@ts-ignore
        userId:req.userId
    })
    res.json({
        message:"Content Has been deleted"
    })

})
app.post("/api/v1/brain/share",UserMiddleware,async (req,res)=>{
    const share = req.body.share;
    if(share){
        const existingLink = await LinkModel.findOne({
            //@ts-ignore
            userId:req.userId
        })
        if(existingLink){
            res.json({
                hash:existingLink.hash
            })
            return;
        }
        const hash = random(10);
        await LinkModel.create({
            //@ts-ignore
            userId:req.userId,
            hash:hash
    })
        res.json({
            hash
        })
    }else{
        await LinkModel.deleteOne({
            //@ts-ignore    
            userId:req.userId
        })
        res.json({
            message:"Share link removed"
        })
    }
})
app.get("/api/v1/brain/:shareLink",async(req,res)=>{
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash:hash
    });
    console.log(link);
    if(!link){
        res.status(411).json({
            message:"Link not found"
        })
        return;
    }
    //userId
    const content = await ContentModel.findOne({
        userId:link.userId
    })
    const user = await UserModel.findOne({
        _id : link.userId
    })
    if(!user){
        res.status(411).json({
            message:"User not found"
        })
        return;
    }
    res.json({
        username:user.username,
        content:content
    })
});

app.listen(8000,()=>{
    console.log("Server started on port 8000");
});
