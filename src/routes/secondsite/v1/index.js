'use strict'

const express = require('express')
const router = express.Router()

router.all('*', (req, res, next) => {
    // Some logic that should be done for all the requests
    next()
})

router.get('/_health_check_', (req, res) => {res.send('Server Healthy!')})


module.exports = router
