const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/71c98d369aa79b0b99825ecfe7a45755/' + latitude + ',' + longitude + '?lang=ko&units=si'
    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect forecast API', undefined)
        } else if(body.error) {
            callback('Unable to find loction information.', undefined)
        } else {
            callback(undefined, 
                body.daily.data[0].summary + "It is currently " + body.currently.temperature + ". There is a " + body.currently.precipProbability + "% chance of rain.")
        }
    })
}

module.exports = forecast
