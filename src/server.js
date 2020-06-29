'use strict'

const config = require(`${global.__base}config`)
const loadProgramsFiles = require(`${global.__base}loaders/programs/loadFiles`)

let log;

class Server {

    constructor(logger) {
        this.log = logger
        log = logger
        // Add any member variables here
    }

    start () {
        const self = this
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
            },
            programs: () => {
                const loadProgramsFilesPromise = loadProgramsFiles.load(self.log)

                return Promise.all([
                    loadProgramsFilesPromise
                ])
            }
        }
        const serviceStarters = [
            // Add connection functions returning promises of common services and componenets
        ]
        const starterPromises = []

        Object.keys(enabledRoutes).forEach(route => {
            if (enabledRoutes[route]) {
                serviceStarters.push(routeSpecificStarters[route])
            }
        })

        serviceStarters.forEach(starter => {
            starterPromises.push(starter())
        })

        return Promise.all(starterPromises)
    }

    faviconHandler (req, res, next) {
        if (req.url === '/favicon.ico') {
            res.send()
        } else {
            next()
        }
    }

    prepareRequest (req, res, next) {
        req.log = log.child({
            backend: 'NodeJs'
            // you can add fields that should be there on all the logs
        })
        next()
    }

    stop () {
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
        const stopperPromises = []

        Object.keys(enabledRoutes).forEach(route => {
            if (enabledRoutes[route]) {
                serviceStoppers.push(routeSpecificStoppers[route])
            }
        })

        serviceStoppers.forEach(stopper => {
            stopperPromises.push(stopper())
        })

        return Promise.all(stopperPromises)
    }
}

module.exports = Server
