const express = require("express");
const {
    sendConfirmation,
    sendContact
} = require("../services/email");
const emailRepo = require("../repository/email");

const router = express.Router({
    mergeParams: true,
});

router.post("/",async (req, res, next) => {
    const user = req.body;
    let contactInfo;
    let confirmationInfo;
    try {
        contactInfo = await sendContact(user);
        await emailRepo.create(user);
    	console.log("Hello");
        confirmationInfo = await sendConfirmation(user);
    } catch (error) {
        return next(error);
    }
    let message = {
        message: "The message was sent successfully",
    };
    message = process.env.NODE_ENV !== 'production' ? {...message,contactInfo,confirmationInfo}:message;
    return res.status(200).json(message);
});

module.exports = router;