const mongoose = require('mongoose')

const connectDB = async() => {
    await mongoose.connect(process.env.ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log("DB Connected successfully"))
    .catch(err => {console.log(err)})

}

module.exports = connectDB
// 48wp89xCm8RKWh