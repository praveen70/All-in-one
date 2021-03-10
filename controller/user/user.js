const bcrypt = require("bcryptjs");
const connection = require('../../config/config');


module.exports = {
    createUser: async (req, res, next) => {
        const password = await bcrypt.hash(req.body.password, 10)
        const query = "insert into user values(null,'"+req.body.firstName+"', '"+req.body.lastName+"', '"+req.body.email+"', '"+password+"', '"+req.body.mobileNumber+"')"
        if (!req.body.firstName ) {
            res.json({ error: "First Name filed is Mandatory" });
            return;

        } if(!req.body.lastName){
            res.json({ error: "Last Name filed is Mandatory" });
            return;
        } 
         if(!req.body.email ){
            res.json({ error: "Email filed is Mandatory" });
            return;
        }
         if(!req.body.password){
            res.json({ error: "Password filed is Mandatory" });
            return;
        }
        if(!req.body.mobileNumber){
            res.json({ error: "Mobile Number filed is Mandatory" });
            return;
        }
        
        else {
            connection.db.query(query, (err, result) => {
                if (err) {
                    res.json({ error: err.message });
                } else {
                    res.json({ status: 200, message: "Inserted Successfully " })
                }
            });

        }
    },
};





