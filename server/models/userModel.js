const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    bio: {
        type: String,
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isPublic: {
        type: Boolean,
        default: true
    }
})


userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next()
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})


userSchema.methods.matchPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


const User = mongoose.model("User", userSchema)
module.exports = User