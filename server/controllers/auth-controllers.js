const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const config = require("../models/config");

exports.hello=async function  (req, res){
  res.send("hello")
}


exports.signUp= async function (req, res)  {
    console.log("hello")
      try {
     console.log(req.body)
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const token = jwt.sign({ email: req.body.email }, config.secret, {
        expiresIn: "4h",
      });
      const user = new User({
        name: req.body.name,
        bio: req.body.bio,
        phone: req.body.phone,
        email: req.body.email,
        password: hash,
      });
      const t=  await user.save()
      console.log( 'hellllllllllllllllllllllllllllll',t)
      if (t) {
        res.send({
          user: t,
          message: "congrats",
          auth: true,
          token: token,
        });
      } else {
        res.send({
          message: "theres a problem with registration ",
          auth: false,
          token: null,
        });
      }
    } catch (err) {
      res.send(err);
    }
  }

 exports.login= async  function  (req, res)  {
   console.log(req.body)
    try {
      var { email, password } = req.body;
      const user = await User.findOne( { email: email });
      if(user){
          var result=bcrypt.compareSync(password, user.password)
          if(result){
              var token=jwt.sign({email:email},config.secret,{expiresIn:"4h"},)
              res.send({message:"success",auth:true,token:token,user:user})
          }else{
              res.send({message:"wrong password",auth:false,token:token ,user:user} )
          }
      } else {
          res.send({message:"user not found",auth:false,token:null ,user:null})
      }
    } catch (err) {
      res.send(err);
    }
  }

