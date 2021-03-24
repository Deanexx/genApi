const express = require("express"),
    app = express(),
    passport = require("passport"),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cors = require('cors'),
    barRouter = require('./routes/barRouter'),
    listRouter = require('./routes/listRouter'),
    globalErrorHandler = require("./controllers/errorController"),
    AppError = require("./utils/appError"),
    userRouter = require('./routes/userRoute'),
    session = require("express-session");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true // allowing setting cookies
}))

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser(process.env.SESSION_SECRET));

// Passport
app.use(passport.initialize());
app.use(passport.session());
require("./config/passportConfig")(passport)

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.use('/user', userRouter);
app.use("/barInventory", barRouter);
app.use("/list", listRouter);
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;