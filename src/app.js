'use strict'
global.__base = `${__dirname}/`

const express = require('express')
const bunyan = require('bunyan')
const config = require(`${global.__base}config`)
const Server = require(`${global.__base}server`)


let PORT = process.env.PORT || config.app.port || 3001
const log = bunyan.createLogger({
    name: config.app.logging.name,
    src: config.app.logging.src,
    streams: [
        {
            path: config.app.logging.path,
            level: config.app.logging.level
        }
    ]
})

const server = new Server(log)

server.start()
.then(() => {

    const routes = require(`${global.__base}routes`)
    const app = new express()

    app.use('/', routes)

    app.listen(PORT, () => {
        console.log(`Express app listening on port ${PORT}..`)
    })

}).catch(err => {

    console.log(`Error occured while starting services : `)
    console.log(err)
    process.exit(1)

})

process.on('uncaughtException', err => {
    log.error({
        error: err.stack
    }, 'Uncaught Exception Occured..!!')
})

['SIGINT', 'SIGTERM', 'SIGQUIT', 'SIGKILL']
.forEach(signal => {
    process.on(signal, () => {
        server.stop()
        .then(() => {
            log.info('Successfully closing express server!')
            process.exit(0)
        }).catch(err => {
            log.error({
                error: err
            }, 'Closing express server with errors.!!')
            process.exit(1)
        })
    })
});

