const express = require('express');
const router = express.Router();

const {
    allServerConnections,
    createConnection,
    getAllConnections,
    sendConnectionRequest,
    AcceptConnectionRequest,
    DeclineConnectionRequest,
    showConnectionRequests,
    showReqsAndIncomingReqs,
    showProfileViewers
} = require('../controllers/connection')

router.get('/all', allServerConnections)
router.post('/create', createConnection)

router.get('/:id', getAllConnections)
router.patch('/send/:id', sendConnectionRequest)
router.patch('/accept/:id', AcceptConnectionRequest)
router.patch('/decline/:id', DeclineConnectionRequest)
router.get('/requests', showConnectionRequests)
router.get('/connect/all', showReqsAndIncomingReqs)
router.get('/views', showProfileViewers)

module.exports = router


