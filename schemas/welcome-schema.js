const mongoose = require('mongoose')

const requireString = {
    type: String,
    required: true
}

const welcomeSchema = mongoose.Schema({
    _id: requireString,
    channelID: requireString,
    text: requireString
})

module.exports = mongoose.model('welcome-channels', welcomeSchema)