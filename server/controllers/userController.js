const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')



const registerController = async (req, res) => {
    try {
        const { email, password, name, phone, photo, bio, role, isPublic } = req.body
        const user = new User({ email, password, name, phone, photo, bio, role, isPublic })
        await user.save()
        res.status(201).json({ user: user })
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        const userExists = await User.findOne({ email })

        if (!userExists || !userExists.matchPassword(password)) {
            return res.status(401).json({ error: "Invalid credentials" })
        }

        res.status(200).json(
            {
                name: userExists.name,
                email: userExists.email,
                token: generateToken(userExists._id)
            }
        )
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}


module.exports = { registerController, loginController }