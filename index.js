const express=require("express");
const app=express();
const mongoose = require('mongoose');
const path=require("path")
const methodOverride=require("method-override")
app.set("views",path.join(__dirname, "views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));
const Chat=require("./models/chat.js");
main().then(()=>{
    console.log("connection succesfull")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
}
let chat1=new Chat({
    from:"neha",
    to:"priya",
    message:"fuck you bitch",
    created_at:new Date()
})
chat1.save().then((res)=>{
    console.log(res)
})
app.get("/chats",async (req,res)=>{
    let chats=await Chat.find();
    console.log(chats)
    res.render("index.ejs",{chats})
})
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
})
app.post("/chat",(req,res)=>{
    let{from, to, message}=req.body
    let newchat=new Chat({
        from:from,
        to:to,
        message:message,
        created_at:new Date()
    })
    newchat.save().then((res)=>{
         
    })
    res.redirect("/chats")  
    
})
app.get("/chats/:id/edit",async(req,res)=>{
    let{id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat})
})
app.put("/chats/:id",async (req,res)=>{
    let{id}=req.params;
    let{message:newmsg}=req.body;
    let updatedchat=await Chat.findByIdAndUpdate(id,{message:newmsg}
        ,{runValidators:true, new:true}
    );
    console.log(updatedchat)
    res.redirect("/chats")
})
app.delete("/chats/:id",async (req,res)=>{
    let{id}=req.params;
    let del=await Chat.findByIdAndDelete(id)
    res.redirect("/chats")
})
app.get("/",(req,res)=>{
    res.send("root is working")
})

app.listen(8080,()=>{
    console.log("server is listening on port 8080")
})