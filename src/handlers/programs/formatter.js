'use strict'

const programsData = require(`${global.__base}loaders/programs/loadFiles`).getData()


exports.formatPrograms = (req, res, next) => {
    req.response_body = req.response_body || {}
    req.response_status = 200
    next(req.response_status)
}
