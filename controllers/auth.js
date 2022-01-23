const User = require('../models/User')

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

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken()

    res.status(statusCode).json({
        success: true,
        token: token
    })
}
