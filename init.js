const mongoose = require('mongoose');

const Chat=require("./models/chat.js");
main().then(()=>{
    console.log("connection succesfull")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
}
let chats=[{
    from:"sneha",
    to:"riya",
    message:"fuck ok you bitch",
    created_at:new Date()
},
{
    from:"eha",
    to:"prya",
    message:"you fuck you bitch",
    created_at:new Date()
},
{
    from:"nea",
    to:"priy",
    message:"also fuck you bitch",
    created_at:new Date()
},
{
    from:"ksneha",
    to:"apriya",
    message:"np fuck you bitch",
    created_at:new Date()
},




]
Chat.insertMany(chats)
