const { register } = require('../controllers/auth')

const express = require('express')
const router = express.Router()



router.route('/register').post(register)

module.exports = router