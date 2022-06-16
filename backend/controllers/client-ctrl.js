/* controllers/client-ctrl.js
* CHANGE LOG
* 1/1/2021 - Bevan Fairleigh - Created.  client-ctrl.js specifies the routes/apis and their functions
*
*
*
*
*/


const Client = require('../models/client')

//CREATE CLIENT
// must provide json client object


createClient = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a client',
        })
    }

    const client = new Client(body)

    if (!client) {
        return res.status(400).json({ success: false, error: err })
    }

    client
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: client._id,
                message: 'Client created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Client not created!',
            })
        })
}

//UPDATE CLIENT
// must provide id and json client object

updateClient = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Client.findOne({ _id: req.params.id }, (err, client) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Client not found!',
            })
        }
        client.firstname = body.firstname
        client.lastname = body.lastname
        client.dateofbirth = body.dateofbirth
        client.gender = body.gender
        client
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: client._id,
                    message: 'Client updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Client not updated!',
                })
            })
    })
}

//DELETE CLIENT
// must provide id

deleteClient = async (req, res) => {
    await Client.findOneAndDelete({ _id: req.params.id }, (err, client) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!client) {
            return res
                .status(404)
                .json({ success: false, error: `client not found` })
        }

        return res.status(200).json({ success: true, data: client })
    }).catch(err => console.log(err))
}

//FIND CLIENT
// must provide id

getClientById = async (req, res) => {
    await Client.findOne({ _id: req.params.id }, (err, client) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!client) {
            return res
                .status(404)
                .json({ success: false, error: `client not found` })
        }
        return res.status(200).json({ success: true, data: patient })
    }).catch(err => console.log(err))
}

//GET ALL CLIENTS [for dev only]
// gives list of all clients

getClients = async (req, res) => {
    await Client.find({}, (err, client) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!client.length) {
            return res
                .status(404)
                .json({ success: false, error: `client not found` })
        }
        return res.status(200).json({ success: true, data: client })
    }).catch(err => console.log(err))
}

module.exports = {
    createClient,
    updateClient,
    deleteClient,
    getClients,
    getClientById,
}