const mongoose = require('mongoose')


const rapportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    link: {
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Rapports", rapportSchema)