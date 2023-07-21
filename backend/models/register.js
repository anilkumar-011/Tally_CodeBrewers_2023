const mongoose = require("mongoose")

const registerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},
{ collection: "user" }
)

const register = mongoose.model("registeredUsers", registerSchema)
module.exports = register