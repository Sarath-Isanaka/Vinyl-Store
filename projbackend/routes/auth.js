var express = require("express");
var router = express.Router();
const {signout, signup, signin, isSignedIn} = require("../controllers/auth")
const { check, validationResult } = require('express-validator');


router.post(
    "/signup", 
    [
        check("name").isLength({min:3}).withMessage("Name should be more than 3 char"),
        check("email").isEmail().withMessage("Please provide an Email"),
        check("password").isLength({min:3}).withMessage("Password must be more than 3 char")
    ],
    signup);

router.post(
    "/signin",
    [
        check("email").isEmail().withMessage("Email is required"),
        check("password").isLength({min:1}).withMessage("Please enter password")
    ], 
    signin);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res)=>{
        res.send("A protected route")
})
module.exports = router;