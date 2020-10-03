const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
});

function sendConfirmation(user){
    const mailOptions = {
        from:process.env.EMAIL, // sender address
        to: user.email , // list of receivers
        subject: `[Pending Message]PNV Digital`, // Subject line
        html: `Dear ${user.name} ${user.prenom}<br/>
        Thank you for contacting our team, one of our team members will contact you shortly`
    };
    return transporter.sendMail(mailOptions);
}
function sendContact(user){
    const mailOptions = {
        from: user.email, // list of receivers
        to: process.env.EMAIL, // sender address
        subject: `[Contact From]Message from ${user.name} ${user.prenom}`, // Subject line
        html: `<b>Contact person:</b> ${user.name} ${user.prenom}<br/>
        <b>Email:</b> ${user.email}<br/>
        <b>Phone:</b> ${user.phone}<br/>
        <b>Description:</b> ${user.description}<br/>
        <b>Time:</b> ${new Date().toUTCString()}`
    };
    return transporter.sendMail(mailOptions);
}

module.exports = {sendContact,sendConfirmation,transporter};