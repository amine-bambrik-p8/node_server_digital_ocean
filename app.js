
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");


const app = express();

//mysql 
require('./config/config.js');
const emailController = require('./controller/emailController.js');

//cors 
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

//server strating 
app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});
//welcome routes
app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to pnv digital <br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});


//send mail routes
app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    emailController.saveMail(req, res);
    console.log('the message has been saved');
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password
    }
  });

  let mailOptions = {
    from: user.email, // sender address
    to: 'b.roubaichorfi@esi-sba.dz', // list of receivers
    subject: `Contact From ${user.name}`, // Subject line
    html: `<h1>Hi ${user.email}<br>
                  ${user.name}<br>
                  ${user.prenom}<br> 
                  ${user.message} </h1><br>
          <h4>Thanks for joining us</h4>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);


  callback(info);
}

// main().catch(console.error);
