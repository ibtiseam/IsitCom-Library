const Rapports = require('../models/rapportModel')
const fetch = require('node-fetch')


const rapportCtrl = {
    uploadRap: async (req, res) => {
        try {
            const {title, link} = req.body
            
                const newRapport = new Rapports({
                   title,link
                })
    
                await newRapport.save()

            res.json({ msg: "upload success ." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })

        }
       
    },
    //----------------------------------
    getRapportInfor: async (req, res) => {
        try {
            const rapport = await Users.findById(req.rapport.id).select()

            res.json(rapport)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getRapportAllInfor: async (req, res) => {
        try {

            const rapports = await Rapports.find().select()
            res.json(rapports)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteRapport: async (req, res) => {
        try {
            await Rapports.findByIdAndDelete(req.params.id)

            res.json({msg: "Deleted Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = rapportCtrl