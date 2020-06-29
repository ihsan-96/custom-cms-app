'use strict'

const fs = require('fs')

class fileData {

    constructor() {
        this.log = console
        this.data = {}
    }

    load (logger) {
        this.log = logger
        const programs = new Promise((resolve, reject) => {
            try {
                this.data.programs = JSON.parse(fs.readFileSync(`${global.__base}data/programs/data/programs.json`))
                resolve()
            } catch(e) {
                reject(e)
            }
        })

        return Promise.all([
            programs
        ])
    }

    getData() {
        return this.data
    }

}

module.exports = new fileData()