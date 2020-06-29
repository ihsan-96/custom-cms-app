'use strict'

exports.respond = (err, req, res, next) => {

    if (err) {
        req.log.error({
            error: JSON.stringify(err),
            url: req.url,
            query: req.query
        }, 'error while responding')
    }

    let response
    const body = req.response_body || {}
    const meta = req.response_meta || {}
    const status = req.response_status || 500
    const error_message = req.response_error_message || ''
    const message = req.response_message
    const internal_code = req.internal_code || status

    if (status >= 400) {
        response = {
            error: error_message,
            status: {
                result: 'failure',
                message
            },
            code: status,
            internal_code,
            body
        }
    } else if (req.raw_response) {
        response = req.raw_response
    } else {
        response = {
            error: null,
            status: {
                result: 'success',
                message
            },
            code: status,
            meta,
            body
        }
    }

    res.status(status).send(response)

}
