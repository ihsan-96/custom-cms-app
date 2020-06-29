'use strict'

const express = require('express')
const router = express.Router()

const v1 = require(`${global.__base}routes/secondsite/v1`)

router.all('*', (req, res, next) => {
    // Some logic that should be done for all the requests
    next()
})

router.get('/_health_check_', (req, res) => {res.send('Server Healthy!')})

router.use('/v1', v1)

module.exports = router
