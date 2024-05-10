const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const User = require('../models/userModel')


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'hello',
}

passport.use(
    new Strategy(jwtOptions, async (jwtPayload, done) => {
        try {
            const user = await User.findById(jwtPayload.id)
            if (user) {
                return done(null, user)
            }
        } catch (err) {
            return done(err, false)
        }
    })
)


const requireAuth = passport.authenticate("jwt", { session: false });

const requireAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Access denied" });
    }
    next();
};

module.exports = { passport, requireAuth, requireAdmin }