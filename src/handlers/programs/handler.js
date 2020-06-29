'use strict'

const programsData = require(`${global.__base}loaders/programs/loadFiles`).getData()


exports.getPrograms = (req, res, next) => {
    req.response_body = programsData.programs
    next()
}
