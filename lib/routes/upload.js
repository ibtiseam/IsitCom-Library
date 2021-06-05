const router = require('express').Router()
const uploadImage = require('../middleware/uploadImage')
const uploadCtrl = require('../controllers/uploadCtrl')

const uploadRapport = require('../middleware/uploadRapport')
const uploadCtrRapport = require('../controllers/uploadCtrRapport')

const auth = require('../middleware/auth')

router.post('/upload_avatar', uploadImage, auth, uploadCtrl.uploadAvatar)
router.post('/upload_rapport', uploadRapport, auth, uploadCtrRapport.uploadRapport)

module.exports = router