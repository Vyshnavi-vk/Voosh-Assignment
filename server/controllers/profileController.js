const User = require('../models/userModel')

const getPublicProfiles = async (req, res) => {
    try {
        const users = await User.find({ isPublic: true }, "name photo bio isPublic")
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}



const getProfileById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id, "name photo bio isPublic")

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        if (req.user.role !== 'admin' && !user.isPublic) {
            return res.status(403).json({ error: "Access denied" })
        }

        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
}

const editProfile = async (req, res) => {
    try {
        const { id } = req.params
        const { name, photo, bio, phone, email, password, isPublic } = req.body;
        const updatedData = {};

        if (name) updatedData.name = name;
        if (photo) updatedData.photo = photo;
        if (bio) updatedData.bio = bio;
        if (phone) updatedData.phone = phone;
        if (email) updatedData.email = email;
        if (isPublic !== undefined) updatedData.isPublic = isPublic;

        if (password) {
            updatedData.password = bcrypt.hashSync(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
            new: true,
        });

        res.json(updatedUser);
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

module.exports = { getPublicProfiles, getProfileById, editProfile }