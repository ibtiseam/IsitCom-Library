const router = require('express').Router()
const rapportCtrl = require('../controllers/rapportCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.post('/uploadRap',  auth, authAdmin,rapportCtrl.uploadRap)
router.get('/rapportinfo', auth, rapportCtrl.getRapportAllInfor)
router.get('/allRapports', auth, rapportCtrl.getRapportAllInfor)
router.delete('/deleteRapport/:id', auth, authAdmin, rapportCtrl.deleteRapport)

module.exports = router