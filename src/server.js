'use strict'

const config = require(`${global.__base}config`)

class Server {

    constructor(logger) {
        this.log = logger
        // Add any member variables here
    }

    start () {
        const enabledRoutes = config.app.routes
        const routeSpecificStarters = {
            firstsite: () => {
                return new Promise((resolve, reject) => {
                    // First site specific starters
                    resolve()
                })
            },
            secondsite: () => {
                return new Promise((resolve, reject) => {
                    // Second site specific starters
                    resolve()
                })
            }
        }
        const serviceStarters = [
            // Add connection functions returning promises of common services and componenets
        ]
        Object.keys(enabledRoutes).forEach(route => {
            if (enabledRoutes[route]) {
                serviceStarters.push(routeSpecificStarters[route])
            }
        })
        return Promise.all(serviceStarters)
    }

    faviconHandler (req, res, next) {
        if (req.url === '/favicon.ico') {
            res.send()
        } else {
            next()
        }
    }

    stop() {
        const enabledRoutes = config.app.routes
        const routeSpecificStoppers = {
            firstsite: () => {
                return new Promise((resolve, reject) => {
                    // First site specific stopper
                    resolve()
                })
            },
            secondsite: () => {
                return new Promise((resolve, reject) => {
                    // Second site specific stopper
                    resolve()
                })
            }
        }
        const serviceStoppers = [
            // Add connection functions returning promises of common services and componenets
        ]
        Object.keys(enabledRoutes).forEach(route => {
            if (enabledRoutes[route]) {
                serviceStoppers.push(routeSpecificStoppers[route])
            }
        })
        return Promise.all(serviceStoppers)
    }
}

module.exports = Server
