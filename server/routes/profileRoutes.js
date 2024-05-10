const express = require('express')
const router = express.Router()
const { requireAuth } = require('../middleware/auth')
const { getPublicProfiles, getProfileById, editProfile } = require('../controllers/profileController')


router.get('/public', getPublicProfiles)
router.get('/:id', requireAuth, getProfileById)
router.put('/edit/:id', requireAuth, editProfile)


module.exports = router