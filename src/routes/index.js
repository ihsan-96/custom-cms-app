'use strict'

const express = require('express')
const router = express.Router()
const config = require(`${global.__base}config`)

const routes = {
    firstsite : require(`${global.__base}routes/firstsite`),
    secondsite : require(`${global.__base}routes/secondsite`),
    programs: require(`${global.__base}routes/programs`)
    /**
     * To add new sites
     * Add routes to new sites here
     * then add a new directory in 'routes' directory
     * add a file 'index.js' in it
     * Specify the new routes there
     * Finally, enable it in config file
     */
}

router.all('*', (req, res, next) => {
    // Some logic that should be done for all the requests
    next()
})

router.get('/_health_check_', (req, res) => {res.send('Server Healthy!')})

const enabledRoutes = config.app.routes

Object.keys(enabledRoutes).forEach(route => {
    if (enabledRoutes[route]) {
        router.use(`/${route}`, routes[route])
    }
})

module.exports = router

