require("dotenv").config();
const bcrypt = require("bcryptjs");
const connection = require('../../config/config');
const jwt = require('jsonwebtoken')

const loginUser = (req, res) => {
    // const username = 
   const accessToken =  jwt.sign(req.body.mobileNumber, process.env.ACCESS_TOKEN_SECRET)
    const sqlString = "select password from user where mobileNumber='" + req.body.mobileNumber + "'";
    connection.db.query(sqlString, async (err, results, fields) => {
        if (err) {
            console.log(err);
            res.json({status:500, error: err.message });
            return;
          }
          if (!results.length) {
            res.json({status:404, message: "Invalid Mobile Number" });
            res.end();
            return;
          }
          const hashedPassword = results[0].password;
          const isValid = await bcrypt.compare(req.body.password, hashedPassword);
          if(!isValid){
            res.json({status:404, message: "Invalid Password" });
            res.end();
          }else{
            res.json({status:200, message: "Successfully Logged In", jwtToken: accessToken });
            res.end();
          }
         
    })

  

  };

  module.exports = {loginUser}


