'use strict'

const express = require('express')
const router = express.Router()

const Handler = require(`${global.__base}handlers/programs/handler`)
const Formatter = require(`${global.__base}handlers/programs/formatter`)
const Responder = require(`${global.__base}handlers/io/responder`)

router.all('*', (req, res, next) => {
    // Some logic that should be done for all the requests
    next()
})

router.get('/_health_check_', (req, res) => {res.send('Server Healthy!')})

router.get('/tours', Handler.getPrograms, Formatter.formatPrograms, Responder.respond)


module.exports = router
