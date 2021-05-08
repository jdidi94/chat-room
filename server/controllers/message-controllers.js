const Message = require("../models/message.js");
const Room = require("../models/room.js");
const User = require("../models/user.js");
exports.create_message= async function  (req, res)  {

    try {

     const message = await Message.create({
      send:req.body.user,
      room:req.body.room,
      message:req.body.message,
 
    })
    res.send(message);
    } catch (err) {
      res.send(err);
    }
 
}
exports.getAllMessageforOneroom= async function  (req, res)  {

    try {
 
   const message = await Message.find({room:req.params.id}).populate("send")
   

   res.send(message)
    } catch (err) {
      res.send(err);
    }
 
}