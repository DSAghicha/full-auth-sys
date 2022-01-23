require('dotenv').config({path: "./config.env"})

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`Server is running @ ${PORT}`))

process.on('unhandledRejection',(err) =>{
    console.error(`Logged Error: ${err}`)
    server.close(() => process.exit(1))
})
