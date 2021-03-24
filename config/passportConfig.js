const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;


module.exports = function (passport) {
    passport.use(
        new LocalStrategy((username, password, done) => {
            console.log(1)
            userModel.findOne({ username: username }, function(err, user) {
                if (err) { return done(err) }
                if (!user) {
                    return done(null, false, {message: 'Incorrect username.'});
                }
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) throw err;
                    if(result) done(null, user)
                })
                return done(null, false);
            });
        })
    )

    passport.serializeUser((user, cb) => {
        cb(null, user.id)
    })

    passport.deserializeUser((id, cb) => {
        userModel.findOne({_id: id}, (err, user) => {
            cb(err, user)
        })
    })
}