const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const profileRoutes = require('./routes/profileRoutes')


const app = express()
dotenv.config()
connectDB()


app.use(express.json())
app.use('/api', userRoutes)
app.use('/profile', profileRoutes)

const PORT = process.env.PORT || 8080

app.listen(PORT, (req, res) => {
    console.log(`App running on PORT ${PORT}`)
})