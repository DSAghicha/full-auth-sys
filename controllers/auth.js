const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')

// const crypto = require('crypto')

exports.register = async(req, res, next) => {
    const {name, email, password} = req.body
    
    try {
        const user = await User.create({
            name, email, password
        })
        sendToken(user, 201, res)
    } catch (error) {
        next(error)
    }
}

exports.login = async(req, res, next) => {
    const { email, password } = req.body

    if (!email || !password){
        return next(new ErrorResponse('Please provide email and password', 400))
    }

    try {
        const user = await User.findOne({ email }).select("+password")

        if(!user){
            return next(new ErrorResponse('User is not registered!', 401))
        }

        const isMatch = await user.matchPasswords(password)

        if(!isMatch){
            return next(new ErrorResponse('Password is incorrect!', 401))
        }

        sendToken(user, 200, res)
    } catch (error) {
        return next(new ErrorResponse(error.message, 500))
    }
}

exports.forgotpassword = async(req, res, next) => {
    const { email } = req.body

    try {
        const user = await User.findOne({ email })

        if(!user){
            return next(new ErrorResponse('Email could not ne sent', 404))
        }
        const resetToken = user.getResetPasswordToken()

        await user.save()

        const resetURL = `http://localhost:3000/passwordreset/${ resetToken }`
        const message =
        `<h1> It seems like you have forgotten your password.</h1>
        <p>
            <a href=${resetURL}>Click here</a>
            to reset your password.`

        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset",
                text: message
            })
            res.status(200).json({
                success:true,
                data: "Email Sent"
            })
        } catch (error) {
            user.getResetPasswordToken = undefined
            user.resetPasswordExpire = undefined

            await user.save()

            return next(new ErrorResponse("Email could not be sent.", 500))
        }
    } catch (error) {
        next(error)
        console.error(error);
    }
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken()

    res.status(statusCode).json({
        success: true,
        token: token
    })
}
