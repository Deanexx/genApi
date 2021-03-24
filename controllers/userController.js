const catchAsync = require("../utils/catchAsync")
const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const AppError = require("../utils/appError")
const passport = require("passport")

exports.registerUser = catchAsync(async (req, res, next) => {
    const user = await userModel.findOne({ login: req.body.login });
    if(user) next(new AppError("User already exist", 401));

    const hashPassword = await bcrypt.hash(req.body.password.toString(), 10);
    const newUser = await userModel.create({ ...req.body, password: hashPassword});

    delete newUser["password"]

    res.status(200).json({
        status: "success",
        data: newUser
    })
})

exports.loginUser = catchAsync( async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if(err) throw err
        console.log(user, "userData")
        if(!user) res.send("No user exist")
        else {
            req.logIn(user, err => {
                if (err) throw err;
                res.send("Successfully Authonticated")
                console.log(req.user, "user success");
            })
        }
    })(req, res, next)
})