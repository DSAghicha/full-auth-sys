const { register, login, forgotpassword } = require('../controllers/auth')

const express = require('express')
const router = express.Router()



router.route('/register').post(register)
router.route('/login').post(login)
router.route('/forgotpassword').post(forgotpassword)

module.exports = router