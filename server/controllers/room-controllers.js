const Room = require("../models/room.js");

const User = require("../models/user.js");

exports.create_room= async function  (req, res)  {

    try {

     const room = await Room.create({
      users:req.body.users,
      group_name:req.body.group_name,
      description:req.body.description
    })
       res.send(room);
    } catch (err) {
      res.send(err);
    }
 
}
exports.update_users= async function  (req, res)  {

  try {
     console.log(req.body)
   const room = await Room.updateOne({_id: req.params.id},{$set:{
    users:req.body.users }})
    console.log(User.user)
     res.send(room);
  } catch (err) {
    res.send(err);
  }

}
exports.get_roomById= async function  (req, res)  {

  try {

   const room = await Room.findOne({_id:req.params.id})
   const users = await User.find({_id:{$in:room.users}})
     res.send( {room:room,users:users});
  } catch (err) {
    res.send(err);
  }

}
exports.getAllRoom= async function  (req, res)  {

  try {

   const room = await Room.find({})

     res.send(room);
  } catch (err) {
    res.send(err);
  }

}

