const email = require("./email.js");

function setup(app){
    
    app.use("/sendmail",email);
    app.use("*",(req,res)=>{
        return res.status(404).json({
            message:"Not Found",
        });
    });
}

module.exports = setup;